import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Plus, Minus, Trash2, Receipt, History, UtensilsCrossed,
  ChevronLeft, X, Check, Coffee, Waves
} from "lucide-react";

/* ---------------------------------------------------------
   BILEZ — Application de prise de commandes
   Couleurs de marque : bleu marine (#163A4F), vert palmier
   (#4FA98C), sable (#F6F1E4), accent coucher de soleil (#E0793F)
--------------------------------------------------------- */

const FONT_LINK_ID = "bilez-fonts";
function useFonts() {
  useEffect(() => {
    if (document.getElementById(FONT_LINK_ID)) return;
    const link = document.createElement("link");
    link.id = FONT_LINK_ID;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Work+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap";
    document.head.appendChild(link);
  }, []);
}

const TABLES = Array.from({ length: 40 }, (_, i) => i + 1);

const WAITERS = [
  { id: 1, name: "Abdou", initial: "A", color: "#4FA98C" },
  { id: 2, name: "Moez", initial: "M", color: "#E0793F" },
  { id: 3, name: "Wassim", initial: "W", color: "#5B7FDB" },
  { id: 4, name: "Wissem", initial: "Wi", color: "#D6558C" },
];

/* Menu structure: main categories can either hold `items` directly
   (flat category) or `subcategories` (each with its own `items`),
   mirroring the printed Bilez menu (breakfast / starters & brik /
   main dishes / snacks / drinks & desserts). */
const MENU = [
  {
    id: "breakfast",
    label: "Petit-déjeuner",
    items: [
      { id: "b1", name: "Petit-déjeuner normal", price: 20 },
      { id: "b2", name: "Petit-déjeuner Bilez", price: 28 },
    ],
  },
  {
    id: "entrees-brik",
    label: "Entrées & Brik",
    subcategories: [
      {
        id: "entrees",
        label: "Entrées",
        items: [
          { id: "en1", name: "Salade verte", price: 6 },
          { id: "en2", name: "Salade grillée", price: 8 },
          { id: "en3", name: "Frites", price: 4, variable: true, range: "4–7" },
          { id: "en4", name: "Poulpe grillé", price: 15 },
          { id: "en5", name: "Entrées de poisson", price: 10 },
          { id: "en6", name: "Poisson grillé (1kg)", price: 9 },
        ],
      },
      {
        id: "brik",
        label: "Brik & Tastira",
        items: [
          { id: "br1", name: "Brik", price: 8 },
          { id: "br2", name: "Brik thon", price: 12 },
          { id: "br3", name: "Brik fruits de mer", price: 14 },
          { id: "br4", name: "Tastira", price: 6 },
        ],
      },
    ],
  },
  {
    id: "plats",
    label: "Plats principaux",
    items: [
      { id: "p1", name: "Couscous poisson", price: 30 },
      { id: "p2", name: "Couscous poulpe", price: 35 },
      { id: "p3", name: "Couscous poulet", price: 30 },
      { id: "p4", name: "Spaghetti fruits de mer", price: 30, variable: true, range: "30–45" },
      { id: "p5", name: "Fruits de mer grillés", price: 45, variable: true, range: "45–75" },
      { id: "p6", name: "Escalope", price: 20 },
      { id: "p7", name: "Menu enfant", price: 15 },
    ],
  },
  {
    id: "snacks",
    label: "Snacks — Mlawi, Panini & Crêpes",
    subcategories: [
      {
        id: "mlawi",
        label: "Mlawi",
        items: [
          { id: "m1", name: "Salami", price: 6 },
          { id: "m2", name: "Fromage", price: 6.5 },
          { id: "m3", name: "Thon", price: 7 },
          { id: "m4", name: "Omelette", price: 6 },
          { id: "m5", name: "Escalope", price: 9 },
          { id: "m6", name: "Mlawi Bilez", price: 13 },
        ],
      },
      {
        id: "panini",
        label: "Panini",
        items: [
          { id: "pa1", name: "Salami", price: 4 },
          { id: "pa2", name: "Thon", price: 5 },
          { id: "pa3", name: "Panini Bilez", price: 6 },
        ],
      },
      {
        id: "crepesalee",
        label: "Crêpe salée",
        items: [
          { id: "cs1", name: "Salami", price: 6 },
          { id: "cs2", name: "Thon", price: 7 },
          { id: "cs3", name: "Fromage", price: 9 },
          { id: "cs4", name: "Crêpe Bilez", price: 13 },
        ],
      },
      {
        id: "crepesucree",
        label: "Crêpe sucrée",
        items: [
          { id: "cd1", name: "Chocolat", price: 6 },
          { id: "cd2", name: "Fruits secs", price: 9 },
        ],
      },
    ],
  },
  {
    id: "boissons",
    label: "Boissons — Café, Thé & Jus",
    subcategories: [
      {
        id: "chaud",
        label: "Café & Thé",
        items: [
          { id: "c1", name: "Expresso", price: 3 },
          { id: "c2", name: "Allongé", price: 3 },
          { id: "c3", name: "Américain", price: 3 },
          { id: "c4", name: "Nescafé", price: 4 },
          { id: "c5", name: "Café direct", price: 4 },
          { id: "c6", name: "Café glacé", price: 9 },
          { id: "c7", name: "Café Bilez", price: 6 },
          { id: "t1", name: "Thé vert", price: 2.5 },
          { id: "t2", name: "Thé à la menthe", price: 3 },
        ],
      },
      {
        id: "froid",
        label: "Jus, Eau & Glaces",
        items: [
          { id: "j1", name: "Citron", price: 5 },
          { id: "j2", name: "Citron glacé", price: 7 },
          { id: "j3", name: "Mangue", price: 6 },
          { id: "j4", name: "Mangue glacé", price: 8 },
          { id: "j5", name: "Ananas", price: 6 },
          { id: "j6", name: "Ananas glacé", price: 8 },
          { id: "j7", name: "Mojito bleu", price: 9 },
          { id: "e1", name: "Petite eau (0.5L)", price: 1 },
          { id: "e2", name: "Eau 1.5L", price: 3 },
          { id: "g1", name: "1 boule", price: 3 },
          { id: "g2", name: "2 boules", price: 6 },
          { id: "g3", name: "3 boules", price: 8 },
        ],
      },
    ],
  },
];

const ORDERS_KEY = "bilez_orders_v1";
const WAITERS_KEY = "bilez_table_waiters_v1";

function money(n) {
  return `${n.toFixed(2)} DT`;
}

/* ---------- Palm-frond divider, the signature element ---------- */
function FrondDivider({ tone = "#4FA98C" }) {
  return (
    <svg viewBox="0 0 200 14" className="w-full h-3" preserveAspectRatio="none">
      <path
        d="M0 7 Q 10 0, 20 7 T 40 7 T 60 7 T 80 7 T 100 7 T 120 7 T 140 7 T 160 7 T 180 7 T 200 7"
        fill="none"
        stroke={tone}
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

/* ---------- Single menu item card, used for both flat categories
   and items nested inside a subcategory ---------- */
function MenuItemButton({ item, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between gap-3 rounded-xl px-4 py-4 bg-white text-left transition-transform active:scale-[0.98]"
      style={{ border: "1px solid #E4DCC7" }}
    >
      <span className="text-base font-medium" style={{ color: "#1F2A24" }}>
        {item.name}
      </span>
      <span className="font-mono text-sm shrink-0" style={{ color: "#E0793F" }}>
        {item.variable ? `${item.range} DT` : money(item.price)}
      </span>
    </button>
  );
}

export default function App() {
  useFonts();

  const [view, setView] = useState("order"); // 'order' | 'history'
  const [selectedTable, setSelectedTable] = useState(null);
  const [activeCategory, setActiveCategory] = useState(MENU[0].id);
  const [cartsByTable, setCartsByTable] = useState({}); // { [table]: [{itemId,name,price,qty}] }
  const cart = selectedTable ? cartsByTable[selectedTable] || [] : [];
  const [modalItem, setModalItem] = useState(null); // item being configured
  const [orders, setOrders] = useState([]);
  const [tableWaiters, setTableWaiters] = useState({}); // { [table]: waiterId }
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [historyDate, setHistoryDate] = useState(() => new Date().toISOString().slice(0, 10));

  // load persisted orders + waiter assignments
  useEffect(() => {
    try {
      const raw = localStorage.getItem(ORDERS_KEY);
      if (raw) setOrders(JSON.parse(raw));
    } catch (e) {
      // no orders yet
    }
    try {
      const rawW = localStorage.getItem(WAITERS_KEY);
      if (rawW) setTableWaiters(JSON.parse(rawW));
    } catch (e) {
      // no assignments yet
    } finally {
      setLoading(false);
    }
  }, []);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  }, []);

  const persistOrders = useCallback((next) => {
    setOrders(next);
    try {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(next));
    } catch (e) {
      showToast("Erreur de sauvegarde — réessaie.");
    }
  }, [showToast]);

  const persistTableWaiters = useCallback((next) => {
    setTableWaiters(next);
    try {
      localStorage.setItem(WAITERS_KEY, JSON.stringify(next));
    } catch (e) {
      showToast("Erreur de sauvegarde — réessaie.");
    }
  }, [showToast]);

  function assignWaiter(table, waiterId) {
    const next = { ...tableWaiters };
    if (next[table] === waiterId) {
      delete next[table]; // tap the same waiter again to unassign
    } else {
      next[table] = waiterId;
    }
    persistTableWaiters(next);
  }

  // Keep table state honest: a waiter badge should never linger on a
  // table that has no draft order. We skip the table currently being
  // edited, so picking a waiter before adding the first item still works.
  useEffect(() => {
    const staleTables = Object.keys(tableWaiters).filter((tKey) => {
      const t = Number(tKey);
      if (t === selectedTable) return false;
      return (cartsByTable[t] || []).length === 0;
    });
    if (staleTables.length > 0) {
      const next = { ...tableWaiters };
      staleTables.forEach((tKey) => delete next[tKey]);
      persistTableWaiters(next);
    }
  }, [cartsByTable, tableWaiters, selectedTable, persistTableWaiters]);

  const cartTotal = useMemo(
    () => cart.reduce((sum, l) => sum + l.price * l.qty, 0),
    [cart]
  );
  const cartCount = useMemo(() => cart.reduce((s, l) => s + l.qty, 0), [cart]);

  function openModal(item) {
    if (!selectedTable) {
      showToast("Choisis une table d'abord.");
      return;
    }
    setModalItem({ ...item, qty: 1, price: item.price });
  }

  // helper: update the array stored for the currently selected table
  function updateCurrentCart(updater) {
    if (!selectedTable) return;
    setCartsByTable((prev) => {
      const current = prev[selectedTable] || [];
      return { ...prev, [selectedTable]: updater(current) };
    });
  }

  function addToCart(line) {
    updateCurrentCart((prev) => {
      const existing = prev.find(
        (l) => l.itemId === line.itemId && l.price === line.price
      );
      if (existing) {
        return prev.map((l) =>
          l === existing ? { ...l, qty: l.qty + line.qty } : l
        );
      }
      return [...prev, line];
    });
    setModalItem(null);
  }

  function updateQty(idx, delta) {
    updateCurrentCart((prev) => {
      const next = [...prev];
      const q = next[idx].qty + delta;
      if (q <= 0) {
        next.splice(idx, 1);
      } else {
        next[idx] = { ...next[idx], qty: q };
      }
      return next;
    });
  }

  function removeLine(idx) {
    updateCurrentCart((prev) => prev.filter((_, i) => i !== idx));
  }

  async function checkout() {
    if (!selectedTable) {
      showToast("Choisis une table d'abord.");
      return;
    }
    if (cart.length === 0) {
      showToast("Le panier est vide.");
      return;
    }
    const order = {
      id: `${Date.now()}`,
      table: selectedTable,
      lines: cart,
      total: cartTotal,
      waiterId: tableWaiters[selectedTable] || null,
      createdAt: new Date().toISOString(),
    };
    await persistOrders([order, ...orders]);
    setCartsByTable((prev) => {
      const next = { ...prev };
      delete next[selectedTable];
      return next;
    });
    if (tableWaiters[selectedTable]) {
      const nextW = { ...tableWaiters };
      delete nextW[selectedTable];
      persistTableWaiters(nextW);
    }
    setSelectedTable(null);
    showToast(`Commande enregistrée — Table ${order.table}`);
  }

  async function deleteOrder(id) {
    await persistOrders(orders.filter((o) => o.id !== id));
  }

  const dayOrders = useMemo(
    () => orders.filter((o) => o.createdAt.slice(0, 10) === historyDate),
    [orders, historyDate]
  );
  const dayTotal = useMemo(
    () => dayOrders.reduce((s, o) => s + o.total, 0),
    [dayOrders]
  );
  const topItems = useMemo(() => {
    const counts = {};
    dayOrders.forEach((o) =>
      o.lines.forEach((l) => {
        counts[l.name] = (counts[l.name] || 0) + l.qty;
      })
    );
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [dayOrders]);

  const waiterTotals = useMemo(() => {
    const totals = {};
    dayOrders.forEach((o) => {
      const key = o.waiterId || "none";
      totals[key] = (totals[key] || 0) + o.total;
    });
    return WAITERS.map((w) => ({ ...w, total: totals[w.id] || 0 })).filter((w) => w.total > 0);
  }, [dayOrders]);

  const category = MENU.find((c) => c.id === activeCategory);

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden"
      style={{
        background:
          "radial-gradient(1200px 500px at 50% -10%, #EFF7F3 0%, #F6F1E4 55%)",
        fontFamily: "'Work Sans', sans-serif",
        color: "#1F2A24",
      }}
    >
      <style>{`
        html, body, #root { margin: 0; padding: 0; width: 100%; max-width: none; text-align: left; overflow-x: hidden; }
        body { display: block; place-items: initial; min-width: 0; }
        #root { display: block; }
        .font-display { font-family: 'Fraunces', serif; }
        .font-mono { font-family: 'IBM Plex Mono', monospace; }
        ::selection { background: #4FA98C33; }
        button { -webkit-tap-highlight-color: transparent; }
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; animation: none !important; }
        }
      `}</style>

      {/* Header */}
      <header
        className="sticky top-0 z-30 px-4 sm:px-6 py-3 flex items-center justify-between"
        style={{ background: "#163A4F", color: "#F6F1E4" }}
      >
        <div className="flex items-center gap-2.5">
          <Waves size={22} strokeWidth={2} style={{ color: "#4FA98C" }} />
          <div>
            <div className="font-display text-lg leading-none" style={{ fontWeight: 600 }}>
              Bilez
            </div>
            <div className="text-[10px] tracking-wide opacity-70 leading-none mt-0.5">
              منتزه · Commandes
            </div>
          </div>
        </div>
        <nav className="flex gap-1 bg-white/10 rounded-full p-1">
          <button
            onClick={() => setView("order")}
            className="px-3.5 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 transition-colors"
            style={{
              background: view === "order" ? "#4FA98C" : "transparent",
              color: view === "order" ? "#0E2431" : "#F6F1E4",
            }}
          >
            <UtensilsCrossed size={15} /> Commander
          </button>
          <button
            onClick={() => setView("history")}
            className="px-3.5 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 transition-colors"
            style={{
              background: view === "history" ? "#4FA98C" : "transparent",
              color: view === "history" ? "#0E2431" : "#F6F1E4",
            }}
          >
            <History size={15} /> Historique
          </button>
        </nav>
      </header>

      {toast && (
        <div
          className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg shadow-lg text-sm font-medium"
          style={{ background: "#163A4F", color: "#fff" }}
        >
          {toast}
        </div>
      )}

      {view === "order" ? (
        <main className="max-w-[1440px] mx-auto px-4 sm:px-8 py-6 pb-40 lg:pb-8 grid lg:grid-cols-[minmax(0,1fr)_380px] gap-8">
          <div className="min-w-0">
            {/* Table picker */}
            <section className="mb-6">
              <div className="flex items-baseline justify-between mb-2">
                <h2 className="font-display text-xl" style={{ color: "#163A4F" }}>
                  Terrasse — choisis la table
                </h2>
                {selectedTable && (
                  <button
                    onClick={() => setSelectedTable(null)}
                    className="text-xs underline opacity-60 hover:opacity-100"
                  >
                    Effacer
                  </button>
                )}
              </div>
              <FrondDivider />

              {/* Waiter legend */}
              <div className="flex flex-wrap items-center gap-3 mt-3 mb-1">
                <span className="text-xs opacity-50">Serveurs :</span>
                {WAITERS.map((w) => (
                  <span key={w.id} className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "#163A4F" }}>
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: w.color }} />
                    {w.name}
                  </span>
                ))}
              </div>

              <div className="mt-2 flex flex-wrap gap-3 max-w-3xl">
                {TABLES.map((t) => {
                  const active = selectedTable === t;
                  const hasDraft = (cartsByTable[t] || []).length > 0;
                  const waiter = WAITERS.find((w) => w.id === tableWaiters[t]);
                  return (
                    <button
                      key={t}
                      onClick={() => setSelectedTable(t)}
                      className="relative w-16 h-16 shrink-0 rounded-full flex items-center justify-center font-mono text-base font-semibold transition-all"
                      style={{
                        background: active ? "#163A4F" : "#FFFFFF",
                        color: active ? "#F6F1E4" : "#163A4F",
                        border: `2px solid ${active ? "#163A4F" : waiter ? waiter.color : "#4FA98C55"}`,
                        boxShadow: active ? "0 3px 10px #163A4F44" : "none",
                        transform: active ? "scale(1.06)" : "scale(1)",
                      }}
                    >
                      {t}
                      {hasDraft && (
                        <span
                          className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full"
                          style={{ background: "#E0793F" }}
                        />
                      )}
                      {waiter && (
                        <span
                          className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                          style={{ background: waiter.color, border: "1.5px solid #F6F1E4" }}
                        >
                          {waiter.initial}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Category tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-4 -mx-1 px-1">
              {MENU.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  className="shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-colors"
                  style={{
                    background: activeCategory === c.id ? "#4FA98C" : "#fff",
                    color: activeCategory === c.id ? "#0E2431" : "#163A4F",
                    borderColor: activeCategory === c.id ? "#4FA98C" : "#E4DCC7",
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Items — subcategories stack one under the other so the
                whole section is visible at once, like the printed menu */}
            {category.subcategories ? (
              <div className="space-y-7">
                {category.subcategories.map((sub) => (
                  <section key={sub.id}>
                    <div className="flex items-center gap-2.5 mb-3">
                      <h3 className="font-display text-base" style={{ color: "#163A4F" }}>
                        {sub.label}
                      </h3>
                      <div className="flex-1">
                        <FrondDivider tone="#4FA98C" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
                      {sub.items.map((item) => (
                        <MenuItemButton key={item.id} item={item} onClick={() => openModal(item)} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {category.items.map((item) => (
                  <MenuItemButton key={item.id} item={item} onClick={() => openModal(item)} />
                ))}
              </div>
            )}
          </div>

          {/* Cart — desktop sidebar / mobile fixed bottom sheet */}
          <aside
            className="static lg:sticky lg:top-20 h-fit rounded-2xl bg-white overflow-hidden z-20"
            style={{ border: "1px solid #E4DCC7", boxShadow: "0 4px 20px rgba(22,58,79,0.06)" }}
          >
            <div className="px-4 py-3 flex items-center justify-between" style={{ background: "#163A4F" }}>
              <div className="flex items-center gap-2 text-[#F6F1E4]">
                <Receipt size={16} />
                <span className="font-display text-base">
                  {selectedTable ? `Table ${selectedTable}` : "Aucune table"}
                </span>
              </div>
              <span className="font-mono text-xs text-[#F6F1E4]/70">{cartCount} art.</span>
            </div>

            {selectedTable && (
              <div className="px-4 py-3 flex items-center gap-2 border-b" style={{ borderColor: "#F1ECDE" }}>
                <span className="text-xs opacity-60 shrink-0">Serveur</span>
                <div className="flex gap-1.5 flex-wrap">
                  {WAITERS.map((w) => {
                    const isAssigned = tableWaiters[selectedTable] === w.id;
                    return (
                      <button
                        key={w.id}
                        onClick={() => assignWaiter(selectedTable, w.id)}
                        className="flex items-center gap-1 pl-1.5 pr-2.5 py-1 rounded-full text-xs font-medium transition-all"
                        style={{
                          background: isAssigned ? w.color : "#F6F1E4",
                          color: isAssigned ? "#fff" : "#163A4F",
                        }}
                      >
                        <span
                          className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                          style={{
                            background: isAssigned ? "rgba(255,255,255,0.3)" : w.color,
                            color: "#fff",
                          }}
                        >
                          {w.initial}
                        </span>
                        {w.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="max-h-[35vh] lg:max-h-[42vh] overflow-y-auto px-4 py-3 divide-y" style={{ borderColor: "#F1ECDE" }}>
              {cart.length === 0 ? (
                <p className="text-sm py-6 text-center opacity-50">
                  Le panier est vide. Touche un article du menu pour l'ajouter.
                </p>
              ) : (
                cart.map((line, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2.5 gap-2">
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">{line.name}</div>
                      <div className="font-mono text-xs opacity-60">{money(line.price)} / unité</div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => updateQty(idx, -1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ background: "#F6F1E4" }}
                      >
                        <Minus size={12} />
                      </button>
                      <span className="font-mono text-sm w-4 text-center">{line.qty}</span>
                      <button
                        onClick={() => updateQty(idx, 1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ background: "#F6F1E4" }}
                      >
                        <Plus size={12} />
                      </button>
                      <button onClick={() => removeLine(idx)} className="w-6 h-6 flex items-center justify-center opacity-40 hover:opacity-100">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="px-4 py-3 border-t" style={{ borderColor: "#F1ECDE" }}>
              <div className="flex items-baseline justify-between mb-3">
                <span className="text-sm font-medium">Total</span>
                <span className="font-mono text-xl font-semibold" style={{ color: "#E0793F" }}>
                  {money(cartTotal)}
                </span>
              </div>
              <button
                onClick={checkout}
                className="w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
                style={{ background: "#4FA98C", color: "#0E2431" }}
              >
                <Check size={17} /> Encaisser la commande
              </button>
            </div>
          </aside>
        </main>
      ) : (
        <HistoryView
          orders={orders}
          dayOrders={dayOrders}
          dayTotal={dayTotal}
          topItems={topItems}
          waiterTotals={waiterTotals}
          historyDate={historyDate}
          setHistoryDate={setHistoryDate}
          onDelete={deleteOrder}
          loading={loading}
        />
      )}

      {/* Add-item modal */}
      {modalItem && (
        <ItemModal item={modalItem} onClose={() => setModalItem(null)} onAdd={addToCart} />
      )}
    </div>
  );
}

function ItemModal({ item, onClose, onAdd }) {
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(item.price);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-4"
      style={{ background: "rgba(22,58,79,0.45)" }}
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-sm rounded-2xl bg-white p-5"
        style={{ border: "1px solid #E4DCC7" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-display text-lg" style={{ color: "#163A4F" }}>
              {item.name}
            </h3>
            {item.variable && (
              <p className="text-xs opacity-60 mt-0.5">Prix variable — fourchette {item.range} DT</p>
            )}
          </div>
          <button onClick={onClose} className="opacity-50 hover:opacity-100">
            <X size={18} />
          </button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium">Quantité</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "#F6F1E4" }}
            >
              <Minus size={14} />
            </button>
            <span className="font-mono text-base w-5 text-center">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "#F6F1E4" }}
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-5">
          <span className="text-sm font-medium">Prix unitaire (DT)</span>
          <input
            type="number"
            step="0.5"
            min="0"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
            className="w-24 text-right font-mono text-base px-2 py-1.5 rounded-lg"
            style={{ border: "1px solid #E4DCC7" }}
          />
        </div>

        <button
          onClick={() =>
            onAdd({ itemId: item.id, name: item.name, price, qty })
          }
          className="w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
          style={{ background: "#163A4F", color: "#F6F1E4" }}
        >
          <Plus size={16} /> Ajouter au panier — {money(price * qty)}
        </button>
      </div>
    </div>
  );
}

function HistoryView({ orders, dayOrders, dayTotal, topItems, waiterTotals, historyDate, setHistoryDate, onDelete, loading }) {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-5">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <h2 className="font-display text-xl" style={{ color: "#163A4F" }}>
          Ventes du jour
        </h2>
        <input
          type="date"
          value={historyDate}
          onChange={(e) => setHistoryDate(e.target.value)}
          className="px-3 py-1.5 rounded-lg text-sm font-mono bg-white"
          style={{ border: "1px solid #E4DCC7" }}
        />
      </div>

      <div className="grid sm:grid-cols-3 gap-3 mb-6">
        <StatCard label="Chiffre d'affaires" value={money(dayTotal)} accent="#E0793F" />
        <StatCard label="Commandes" value={dayOrders.length} accent="#4FA98C" />
        <StatCard
          label="Panier moyen"
          value={dayOrders.length ? money(dayTotal / dayOrders.length) : money(0)}
          accent="#163A4F"
        />
      </div>

      {waiterTotals.length > 0 && (
        <div className="mb-6 rounded-2xl bg-white p-4" style={{ border: "1px solid #E4DCC7" }}>
          <h3 className="text-sm font-semibold mb-3" style={{ color: "#163A4F" }}>
            Ventes par serveur
          </h3>
          <div className="space-y-2">
            {waiterTotals.map((w) => (
              <div key={w.id} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ background: w.color }}
                  >
                    {w.initial}
                  </span>
                  {w.name}
                </span>
                <span className="font-mono opacity-70">{money(w.total)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {topItems.length > 0 && (
        <div className="mb-6 rounded-2xl bg-white p-4" style={{ border: "1px solid #E4DCC7" }}>
          <h3 className="text-sm font-semibold mb-3" style={{ color: "#163A4F" }}>
            Articles les plus vendus
          </h3>
          <div className="space-y-2">
            {topItems.map(([name, qty]) => (
              <div key={name} className="flex items-center justify-between text-sm">
                <span>{name}</span>
                <span className="font-mono opacity-70">{qty}×</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <h3 className="text-sm font-semibold mb-3" style={{ color: "#163A4F" }}>
        Commandes de la journée
      </h3>
      {loading ? (
        <p className="text-sm opacity-50">Chargement…</p>
      ) : dayOrders.length === 0 ? (
        <p className="text-sm opacity-50 py-8 text-center">Aucune commande pour cette date.</p>
      ) : (
        <div className="space-y-3">
          {dayOrders.map((o) => (
            <div key={o.id} className="rounded-xl bg-white p-4" style={{ border: "1px solid #E4DCC7" }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs px-2 py-0.5 rounded-full" style={{ background: "#F6F1E4", color: "#163A4F" }}>
                    Table {o.table}
                  </span>
                  {o.waiterId && (() => {
                    const w = WAITERS.find((x) => x.id === o.waiterId);
                    return w ? (
                      <span className="flex items-center gap-1 text-xs font-medium" style={{ color: w.color }}>
                        <span className="w-2 h-2 rounded-full" style={{ background: w.color }} />
                        {w.name}
                      </span>
                    ) : null;
                  })()}
                  <span className="text-xs opacity-50">
                    {new Date(o.createdAt).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-semibold" style={{ color: "#E0793F" }}>
                    {money(o.total)}
                  </span>
                  <button onClick={() => onDelete(o.id)} className="opacity-40 hover:opacity-100">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
              <p className="text-xs opacity-60 leading-relaxed">
                {o.lines.map((l) => `${l.qty}× ${l.name}`).join(" · ")}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

function StatCard({ label, value, accent }) {
  return (
    <div className="rounded-2xl bg-white p-4" style={{ border: "1px solid #E4DCC7" }}>
      <div className="text-xs opacity-60 mb-1">{label}</div>
      <div className="font-display text-2xl" style={{ color: accent }}>
        {value}
      </div>
    </div>
  );
}