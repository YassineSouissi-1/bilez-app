import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Plus, Minus, Trash2, Receipt, History, UtensilsCrossed,
  ChevronLeft, ChevronUp, X, Check, Coffee, Salad, Sandwich, CupSoda,
  Pencil, Wallet, ArrowDownRight
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

const LOGO_DATA_URI =
  "data:image/png;base64,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";

const TABLES = Array.from({ length: 80 }, (_, i) => i + 1);

const WAITERS = [
  { id: 1, name: "Abdou", initial: "A", color: "#4FA98C" },
  { id: 2, name: "Moez", initial: "M", color: "#E0793F" },
  { id: 3, name: "Ahmed", initial: "Ah", color: "#5B7FDB" },
  { id: 4, name: "Wissem", initial: "Wi", color: "#D6558C" },
  { id: 5, name: "Caisse", initial: "C", color: "#B08D2E" },
];

/* Menu structure: main categories can either hold `items` directly
   (flat category) or `subcategories` (each with its own `items`),
   mirroring the printed Bilez menu (breakfast / starters & brik /
   main dishes / snacks / drinks & desserts).
   This is only the starting point — the live menu used by the app is
   kept in state and persisted to localStorage so items can be added
   or removed from the UI. */
const DEFAULT_MENU = [
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
          { id: "e3", name: "Boisson gazeuse", price: 4, variable: true, range: "4–5" },
          { id: "g1", name: "1 boule", price: 3 },
          { id: "g2", name: "2 boules", price: 6 },
          { id: "g3", name: "3 boules", price: 8 },
          { id: "g4", name: "Glace en pot", price: 2.5 },
          { id: "g5", name: "Glace bâtonnet", price: 2.5 },
          { id: "g6", name: "Cornet simple", price: 4 },
          { id: "g7", name: "Grand cornet", price: 5 },
        ],
      },
    ],
  },
];

const CATEGORY_ICONS = {
  breakfast: Coffee,
  "entrees-brik": Salad,
  plats: UtensilsCrossed,
  snacks: Sandwich,
  boissons: CupSoda,
};

const ORDERS_KEY = "bilez_orders_v1";
const WAITERS_KEY = "bilez_table_waiters_v1";
const MENU_KEY = "bilez_menu_v1";
const EXPENSES_KEY = "bilez_expenses_v1";

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
function MenuItemButton({ item, onClick, editMode, onDelete }) {
  return (
    <div className="relative">
      <button
        onClick={editMode ? undefined : onClick}
        disabled={editMode}
        className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-3 rounded-2xl px-3 py-2.5 sm:px-4 sm:py-4 bg-white text-left transition-all active:scale-[0.97] hover:shadow-md"
        style={{
          border: editMode ? "1px dashed #E0793F88" : "1px solid #E4DCC7",
          boxShadow: "0 1px 3px rgba(22,58,79,0.05)",
        }}
      >
        <span className="text-[13px] sm:text-base font-medium leading-snug pr-4" style={{ color: "#1F2A24" }}>
          {item.name}
        </span>
        <span className="font-mono text-xs sm:text-sm font-semibold shrink-0" style={{ color: "#E0793F" }}>
          {item.variable ? `${item.range} DT` : money(item.price)}
        </span>
      </button>
      {editMode && (
        <button
          onClick={onDelete}
          className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full flex items-center justify-center text-white shadow"
          style={{ background: "#C1571E" }}
          title="Supprimer cet article"
        >
          <X size={13} strokeWidth={3} />
        </button>
      )}
    </div>
  );
}

/* ---------- Small dashed tile to add a new menu item to a
   category (or subcategory), opens AddMenuItemModal ---------- */
function AddMenuItemTile({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-1.5 rounded-2xl px-3 py-2.5 sm:px-4 sm:py-4 text-[13px] sm:text-base font-medium transition-all active:scale-[0.97] hover:bg-white"
      style={{ border: "1px dashed #4FA98C99", color: "#3E8F76" }}
    >
      <Plus size={15} /> Ajouter un article
    </button>
  );
}

/* ---------- Modal to add a new menu item to a specific
   category / subcategory, with a name and a price ---------- */
function AddMenuItemModal({ target, onClose, onAdd }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const canSubmit = name.trim().length > 0 && price !== "" && !isNaN(parseFloat(price)) && parseFloat(price) >= 0;

  function submit() {
    if (!canSubmit) return;
    onAdd(target, { name: name.trim(), price: Math.round(parseFloat(price) * 100) / 100 });
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-4"
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
              Nouvel article
            </h3>
            <p className="text-xs opacity-60 mt-0.5">{target.label}</p>
          </div>
          <button onClick={onClose} className="opacity-50 hover:opacity-100">
            <X size={18} />
          </button>
        </div>

        <label className="block text-sm font-medium mb-1.5">Nom de l'article</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="ex. Citronnade"
          autoFocus
          className="w-full mb-4 px-3 py-2.5 rounded-xl text-sm"
          style={{ border: "1px solid #E4DCC7" }}
        />

        <label className="block text-sm font-medium mb-1.5">Prix (DT)</label>
        <input
          type="number"
          step="0.5"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="0.00"
          className="w-full mb-5 px-3 py-2.5 rounded-xl text-sm font-mono"
          style={{ border: "1px solid #E4DCC7" }}
        />

        <button
          onClick={submit}
          disabled={!canSubmit}
          className="w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-40"
          style={{ background: "#163A4F", color: "#F6F1E4" }}
        >
          <Plus size={16} /> Ajouter au menu
        </button>
      </div>
    </div>
  );
}

function WaiterPicker({ onPick, activeId }) {
  return (
    <div className="flex gap-2.5 flex-wrap">
      {WAITERS.map((w) => {
        const isAssigned = activeId === w.id;
        return (
          <button
            key={w.id}
            onClick={() => onPick(w.id)}
            className="flex items-center gap-2 pl-2 pr-4 py-2 rounded-full text-sm font-semibold transition-all"
            style={{
              background: isAssigned ? w.color : "#F6F1E4",
              color: isAssigned ? "#fff" : "#163A4F",
            }}
          >
            <span
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
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
  );
}

function WaiterStep({ selectedTable, tableWaiters, assignWaiter }) {
  const assigned = WAITERS.find((w) => w.id === tableWaiters[selectedTable]);
  const [manualOpen, setManualOpen] = useState(false);

  // Collapse back to the compact view whenever the selected table changes
  useEffect(() => {
    setManualOpen(false);
  }, [selectedTable]);

  const open = !assigned || manualOpen;

  function handlePick(waiterId) {
    assignWaiter(selectedTable, waiterId);
    setManualOpen(false); // auto-close the picker once a choice is made
  }

  return (
    <div
      className="px-5 py-4 border-b flex flex-col gap-3 transition-colors"
      style={{
        borderColor: "#F1ECDE",
        background: assigned ? "transparent" : "#FBEFE6",
      }}
    >
      <span
        className="text-sm font-bold shrink-0"
        style={{ color: assigned ? "#163A4F" : "#C1571E" }}
      >
        {assigned ? "Serveur" : "Étape 1 — serveur"}
      </span>

      {open ? (
        <WaiterPicker onPick={handlePick} activeId={assigned?.id} />
      ) : (
        <button
          onClick={() => setManualOpen(true)}
          className="flex items-center gap-2 pl-2 pr-4 py-2 rounded-full text-sm font-semibold w-fit"
          style={{ background: assigned.color, color: "#fff" }}
        >
          <span
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: "rgba(255,255,255,0.3)", color: "#fff" }}
          >
            {assigned.initial}
          </span>
          {assigned.name}
          <span className="opacity-70 text-xs ml-0.5">changer</span>
        </button>
      )}
    </div>
  );
}

function DiscountControl({ value, onChange, onClear }) {
  const [type, setType] = useState(value?.type || "amount");
  const [amount, setAmount] = useState(value?.amount ?? "");

  useEffect(() => {
    setType(value?.type || "amount");
    setAmount(value?.amount ?? "");
  }, [value]);

  function apply(nextType, rawAmount) {
    const num = parseFloat(rawAmount);
    if (rawAmount === "" || isNaN(num) || num <= 0) {
      onClear();
      return;
    }
    onChange({ type: nextType, amount: num });
  }

  return (
    <div className="flex items-center gap-2 mb-2 flex-wrap">
      <span className="text-xs opacity-60 shrink-0">Remise</span>
      <div className="flex rounded-lg overflow-hidden shrink-0" style={{ border: "1px solid #E4DCC7" }}>
        <button
          onClick={() => {
            setType("percent");
            apply("percent", amount);
          }}
          className="px-2 py-1 text-xs font-medium"
          style={{
            background: type === "percent" ? "#163A4F" : "#fff",
            color: type === "percent" ? "#fff" : "#163A4F",
          }}
        >
          %
        </button>
        <button
          onClick={() => {
            setType("amount");
            apply("amount", amount);
          }}
          className="px-2 py-1 text-xs font-medium"
          style={{
            background: type === "amount" ? "#163A4F" : "#fff",
            color: type === "amount" ? "#fff" : "#163A4F",
          }}
        >
          DT
        </button>
      </div>
      <input
        type="number"
        min="0"
        step="0.5"
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value);
          apply(type, e.target.value);
        }}
        placeholder="0"
        className="w-16 px-2 py-1 rounded-lg text-sm font-mono"
        style={{ border: "1px solid #E4DCC7" }}
      />
      {value && (
        <button onClick={onClear} className="text-xs opacity-50 hover:opacity-100 underline shrink-0">
          retirer
        </button>
      )}
    </div>
  );
}

function CartLines({ cart, updateQty, removeLine, waiterMissing }) {
  if (waiterMissing) {
    return (
      <p className="text-sm py-6 text-center opacity-60 leading-relaxed">
        Choisis le serveur ci-dessus pour pouvoir
        <br />
        ajouter des articles à cette table.
      </p>
    );
  }
  if (cart.length === 0) {
    return (
      <p className="text-sm py-6 text-center opacity-50">
        Le panier est vide. Touche un article du menu pour l'ajouter.
      </p>
    );
  }
  return cart.map((line, idx) => (
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
  ));
}

export default function App() {
  useFonts();

  const [view, setView] = useState("order"); // 'order' | 'history'
  const [selectedTable, setSelectedTable] = useState(null);
  const [menu, setMenu] = useState(DEFAULT_MENU);
  const [editMenuMode, setEditMenuMode] = useState(false);
  const [addItemTarget, setAddItemTarget] = useState(null); // {categoryId, subcategoryId?, label}
  const [activeCategory, setActiveCategory] = useState(DEFAULT_MENU[0].id);
  const [cartsByTable, setCartsByTable] = useState({}); // { [table]: [{itemId,name,price,qty}] }
  const cart = selectedTable ? cartsByTable[selectedTable] || [] : [];
  const [modalItem, setModalItem] = useState(null); // item being configured
  const [orders, setOrders] = useState([]);
  const [expenses, setExpenses] = useState([]); // sorties de caisse: [{id,label,amount,createdAt}]
  const [tableWaiters, setTableWaiters] = useState({}); // { [table]: waiterId }
  const [discountsByTable, setDiscountsByTable] = useState({}); // { [table]: {type:'percent'|'amount', amount:number} }
  const discount = selectedTable ? discountsByTable[selectedTable] || null : null;
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [mobileCartOpen, setMobileCartOpen] = useState(false);
  const [historyDate, setHistoryDate] = useState(() => new Date().toISOString().slice(0, 10));

  // load persisted orders + waiter assignments + menu + expenses
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
    }
    try {
      const rawM = localStorage.getItem(MENU_KEY);
      if (rawM) {
        const parsedMenu = JSON.parse(rawM);
        setMenu(parsedMenu);
        if (parsedMenu[0]) setActiveCategory(parsedMenu[0].id);
      }
    } catch (e) {
      // fall back to the default menu
    }
    try {
      const rawE = localStorage.getItem(EXPENSES_KEY);
      if (rawE) setExpenses(JSON.parse(rawE));
    } catch (e) {
      // no expenses yet
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

  const persistMenu = useCallback((next) => {
    setMenu(next);
    try {
      localStorage.setItem(MENU_KEY, JSON.stringify(next));
    } catch (e) {
      showToast("Erreur de sauvegarde — réessaie.");
    }
  }, [showToast]);

  const persistExpenses = useCallback((next) => {
    setExpenses(next);
    try {
      localStorage.setItem(EXPENSES_KEY, JSON.stringify(next));
    } catch (e) {
      showToast("Erreur de sauvegarde — réessaie.");
    }
  }, [showToast]);

  // Add a new menu item to a category, or to one of its subcategories
  function addMenuItem(target, { name, price }) {
    const newItem = { id: `it_${Date.now()}`, name, price };
    const next = menu.map((c) => {
      if (c.id !== target.categoryId) return c;
      if (target.subcategoryId) {
        return {
          ...c,
          subcategories: c.subcategories.map((sub) =>
            sub.id === target.subcategoryId ? { ...sub, items: [...sub.items, newItem] } : sub
          ),
        };
      }
      return { ...c, items: [...(c.items || []), newItem] };
    });
    persistMenu(next);
    setAddItemTarget(null);
    showToast(`"${name}" ajouté au menu.`);
  }

  // Remove a menu item from a category, or from one of its subcategories
  function removeMenuItem(categoryId, subcategoryId, itemId, itemName) {
    if (!window.confirm(`Supprimer "${itemName}" du menu ?`)) return;
    const next = menu.map((c) => {
      if (c.id !== categoryId) return c;
      if (subcategoryId) {
        return {
          ...c,
          subcategories: c.subcategories.map((sub) =>
            sub.id === subcategoryId ? { ...sub, items: sub.items.filter((it) => it.id !== itemId) } : sub
          ),
        };
      }
      return { ...c, items: (c.items || []).filter((it) => it.id !== itemId) };
    });
    persistMenu(next);
    showToast("Article supprimé du menu.");
  }

  // Sorties de caisse — cash taken out of the register (waiter tip,
  // small purchase like ice, etc.)
  function addExpense(label, amount) {
    const expense = {
      id: `${Date.now()}`,
      label,
      amount,
      createdAt: new Date().toISOString(),
    };
    persistExpenses([expense, ...expenses]);
    showToast("Sortie de caisse enregistrée.");
  }

  function deleteExpense(id) {
    persistExpenses(expenses.filter((e) => e.id !== id));
  }

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

  const discountAmount = useMemo(() => {
    if (!discount) return 0;
    if (discount.type === "percent") return cartTotal * (discount.amount / 100);
    return Math.min(discount.amount, cartTotal);
  }, [discount, cartTotal]);
  const finalTotal = Math.max(0, cartTotal - discountAmount);

  function setTableDiscount(table, d) {
    setDiscountsByTable((prev) => ({ ...prev, [table]: d }));
  }
  function clearTableDiscount(table) {
    setDiscountsByTable((prev) => {
      const next = { ...prev };
      delete next[table];
      return next;
    });
  }

  function openModal(item) {
    if (!selectedTable) {
      showToast("Choisis une table d'abord.");
      return;
    }
    if (!tableWaiters[selectedTable]) {
      showToast("Choisis d'abord le serveur de cette table.");
      setMobileCartOpen(true);
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
      subtotal: cartTotal,
      discount: discount || null,
      discountAmount,
      total: finalTotal,
      waiterId: tableWaiters[selectedTable] || null,
      createdAt: new Date().toISOString(),
    };
    await persistOrders([order, ...orders]);
    setCartsByTable((prev) => {
      const next = { ...prev };
      delete next[selectedTable];
      return next;
    });
    clearTableDiscount(selectedTable);
    if (tableWaiters[selectedTable]) {
      const nextW = { ...tableWaiters };
      delete nextW[selectedTable];
      persistTableWaiters(nextW);
    }
    setSelectedTable(null);
    setMobileCartOpen(false);
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

  const dayExpenses = useMemo(
    () => expenses.filter((e) => e.createdAt.slice(0, 10) === historyDate),
    [expenses, historyDate]
  );
  const dayExpensesTotal = useMemo(
    () => dayExpenses.reduce((s, e) => s + e.amount, 0),
    [dayExpenses]
  );

  const category = menu.find((c) => c.id === activeCategory);

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
        className="sticky top-0 z-30 px-3 sm:px-6 py-2 sm:py-3 flex items-center justify-between relative"
        style={{
          background: "#163A4F",
          color: "#F6F1E4",
        }}
      >
        <div className="flex items-center gap-2.5">
          <img
            src={LOGO_DATA_URI}
            alt="Bilez"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full shrink-0"
            style={{ boxShadow: "0 0 0 2px rgba(79,169,140,0.55)" }}
          />
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
            className="px-3.5 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 transition-all"
            style={{
              background: view === "order" ? "#4FA98C" : "transparent",
              color: view === "order" ? "#0E2431" : "#F6F1E4",
              boxShadow: view === "order" ? "0 2px 8px rgba(79,169,140,0.45)" : "none",
            }}
          >
            <UtensilsCrossed size={15} /> Commander
          </button>
          <button
            onClick={() => setView("history")}
            className="px-3.5 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 transition-all"
            style={{
              background: view === "history" ? "#4FA98C" : "transparent",
              color: view === "history" ? "#0E2431" : "#F6F1E4",
              boxShadow: view === "history" ? "0 2px 8px rgba(79,169,140,0.45)" : "none",
            }}
          >
            <History size={15} /> Historique
          </button>
        </nav>
        <svg
          viewBox="0 0 80 10"
          preserveAspectRatio="none"
          className="absolute left-0 right-0 bottom-0 translate-y-full w-full h-[9px] block pointer-events-none"
        >
          <defs>
            <pattern id="scallop" width="10" height="10" patternUnits="userSpaceOnUse">
              <rect width="10" height="10" fill="#163A4F" />
              <path d="M0 0a5 5 0 0 0 10 0Z" fill="#EFF7F3" />
            </pattern>
          </defs>
          <rect width="80" height="10" fill="url(#scallop)" />
        </svg>
      </header>

      {toast && (
        <div
          className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full shadow-lg text-sm font-medium flex items-center gap-2"
          style={{ background: "#163A4F", color: "#fff", boxShadow: "0 6px 18px rgba(22,58,79,0.35)" }}
        >
          <span
            className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "#4FA98C" }}
          >
            <Check size={12} strokeWidth={3} style={{ color: "#0E2431" }} />
          </span>
          {toast}
        </div>
      )}

      {view === "order" ? (
        <>
        <main className="max-w-[1440px] mx-auto px-3 sm:px-8 py-4 sm:py-6 pb-20 lg:pb-8 grid lg:grid-cols-[minmax(0,1fr)_380px] gap-5 lg:gap-8">
          <div className="min-w-0">
            {/* Table picker */}
            <section className="mb-4 sm:mb-6">
              <div className="flex items-baseline justify-between mb-2">
                <h2 className="font-display text-lg sm:text-xl" style={{ color: "#163A4F" }}>
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
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mt-2 sm:mt-3 mb-1">
                <span className="text-[11px] sm:text-xs opacity-50">Serveurs :</span>
                {WAITERS.map((w) => (
                  <span key={w.id} className="flex items-center gap-1.5 text-[11px] sm:text-xs font-medium" style={{ color: "#163A4F" }}>
                    <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full" style={{ background: w.color }} />
                    {w.name}
                  </span>
                ))}
              </div>

              <div className="mt-2 grid grid-cols-8 sm:flex sm:flex-wrap gap-1.5 sm:gap-3 max-w-3xl">
                {TABLES.map((t) => {
                  const active = selectedTable === t;
                  const hasDraft = (cartsByTable[t] || []).length > 0;
                  const waiter = WAITERS.find((w) => w.id === tableWaiters[t]);
                  return (
                    <button
                      key={t}
                      onClick={() => setSelectedTable(t)}
                      className="relative w-9 h-9 sm:w-16 sm:h-16 shrink-0 rounded-full flex items-center justify-center font-mono text-[11px] sm:text-base font-semibold transition-all"
                      style={{
                        background: active ? "#163A4F" : "#FFFFFF",
                        color: active ? "#F6F1E4" : "#163A4F",
                        border: `${active ? 2 : 1.5}px solid ${active ? "#163A4F" : waiter ? waiter.color : "#4FA98C55"}`,
                        boxShadow: active ? "0 3px 10px #163A4F44" : "none",
                        transform: active ? "scale(1.06)" : "scale(1)",
                      }}
                    >
                      {t}
                      {hasDraft && (
                        <span
                          className="absolute top-0 right-0 sm:top-0.5 sm:right-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                          style={{ background: "#E0793F" }}
                        />
                      )}
                      {waiter && (
                        <span
                          className="absolute -bottom-1 sm:-bottom-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-[7px] sm:text-[10px] font-bold text-white"
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

            {/* Category tabs — wraps to as many rows as needed so every
                category is visible at once, no horizontal scrolling */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
              {menu.map((c) => {
                const Icon = CATEGORY_ICONS[c.id];
                const isActive = activeCategory === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setActiveCategory(c.id)}
                    className="px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-sm font-medium border flex items-center gap-1.5 transition-all"
                    style={{
                      background: isActive ? "#4FA98C" : "#fff",
                      color: isActive ? "#0E2431" : "#163A4F",
                      borderColor: isActive ? "#4FA98C" : "#E4DCC7",
                      boxShadow: isActive ? "0 2px 8px rgba(79,169,140,0.35)" : "none",
                    }}
                  >
                    {Icon && <Icon size={13} className="sm:hidden" />}
                    {Icon && <Icon size={15} className="hidden sm:block" />}
                    {c.label}
                  </button>
                );
              })}
              <button
                onClick={() => setEditMenuMode((v) => !v)}
                className="ml-auto px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-sm font-medium border flex items-center gap-1.5 transition-all shrink-0"
                style={{
                  background: editMenuMode ? "#163A4F" : "#fff",
                  color: editMenuMode ? "#F6F1E4" : "#163A4F",
                  borderColor: editMenuMode ? "#163A4F" : "#E4DCC7",
                }}
              >
                {editMenuMode ? <Check size={14} /> : <Pencil size={13} />}
                <span className="hidden sm:inline">{editMenuMode ? "Terminer" : "Modifier le menu"}</span>
              </button>
            </div>

            {/* Items — subcategories stack one under the other so the
                whole section is visible at once, like the printed menu */}
            {category.subcategories ? (
              <div className="space-y-4 sm:space-y-7">
                {category.subcategories.map((sub) => (
                  <section key={sub.id}>
                    <div className="flex items-center gap-2.5 mb-2 sm:mb-3">
                      <h3 className="font-display text-sm sm:text-base" style={{ color: "#163A4F" }}>
                        {sub.label}
                      </h3>
                      <div className="flex-1">
                        <FrondDivider tone="#4FA98C" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-3">
                      {sub.items.map((item) => (
                        <MenuItemButton
                          key={item.id}
                          item={item}
                          editMode={editMenuMode}
                          onClick={() => openModal(item)}
                          onDelete={() => removeMenuItem(category.id, sub.id, item.id, item.name)}
                        />
                      ))}
                      {editMenuMode && (
                        <AddMenuItemTile
                          onClick={() =>
                            setAddItemTarget({ categoryId: category.id, subcategoryId: sub.id, label: `${category.label} — ${sub.label}` })
                          }
                        />
                      )}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-3">
                {category.items.map((item) => (
                  <MenuItemButton
                    key={item.id}
                    item={item}
                    editMode={editMenuMode}
                    onClick={() => openModal(item)}
                    onDelete={() => removeMenuItem(category.id, null, item.id, item.name)}
                  />
                ))}
                {editMenuMode && (
                  <AddMenuItemTile
                    onClick={() => setAddItemTarget({ categoryId: category.id, subcategoryId: null, label: category.label })}
                  />
                )}
              </div>
            )}
          </div>

          {/* Cart — desktop sidebar only; mobile uses the fixed bottom bar below */}
          <aside
            className="hidden lg:block lg:sticky lg:top-20 h-fit rounded-2xl bg-white overflow-hidden z-20"
            style={{ border: "1px solid #E4DCC7", boxShadow: "0 4px 20px rgba(22,58,79,0.06)" }}
          >
            <div className="px-4 py-3 flex items-center justify-between" style={{ background: "#163A4F" }}>
              <div className="flex items-center gap-2 text-[#F6F1E4]">
                <Receipt size={16} />
                <span className="font-display text-base">
                  {selectedTable ? `Table ${selectedTable}` : "Choisis une table"}
                </span>
              </div>
              <span className="font-mono text-xs text-[#F6F1E4]/70">{cartCount} art.</span>
            </div>

            {selectedTable && (
              <WaiterStep selectedTable={selectedTable} tableWaiters={tableWaiters} assignWaiter={assignWaiter} />
            )}

            <div className="max-h-[35vh] lg:max-h-[42vh] overflow-y-auto px-4 py-3 divide-y" style={{ borderColor: "#F1ECDE" }}>
              <CartLines
                cart={cart}
                updateQty={updateQty}
                removeLine={removeLine}
                waiterMissing={!!selectedTable && !tableWaiters[selectedTable]}
              />
            </div>

            <div className="px-4 py-3 border-t" style={{ borderColor: "#F1ECDE" }}>
              {selectedTable && cart.length > 0 && (
                <DiscountControl
                  value={discount}
                  onChange={(d) => setTableDiscount(selectedTable, d)}
                  onClear={() => clearTableDiscount(selectedTable)}
                />
              )}
              {discount && (
                <>
                  <div className="flex items-baseline justify-between text-xs opacity-60 mb-1">
                    <span>Sous-total</span>
                    <span className="font-mono">{money(cartTotal)}</span>
                  </div>
                  <div className="flex items-baseline justify-between text-xs mb-1" style={{ color: "#C1571E" }}>
                    <span>Remise {discount.type === "percent" ? `(${discount.amount}%)` : ""}</span>
                    <span className="font-mono">-{money(discountAmount)}</span>
                  </div>
                </>
              )}
              <div className="flex items-baseline justify-between mb-3">
                <span className="text-sm font-medium">Total</span>
                <span className="font-mono text-xl font-semibold" style={{ color: "#E0793F" }}>
                  {money(finalTotal)}
                </span>
              </div>
              <button
                onClick={checkout}
                className="w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98] hover:brightness-105"
                style={{
                  background: "linear-gradient(135deg, #5DBE9E 0%, #4FA98C 55%, #3E8F76 100%)",
                  color: "#0E2431",
                  boxShadow: "0 4px 14px rgba(79,169,140,0.4)",
                }}
              >
                <Check size={17} /> Encaisser la commande
              </button>
            </div>
          </aside>
        </main>

        {/* Mobile cart bar + drawer — keeps checkout reachable without
            scrolling past the whole menu on a phone */}
        <div className="lg:hidden">
          {mobileCartOpen && (
            <div
              className="fixed inset-0 z-40"
              style={{ background: "rgba(22,58,79,0.35)" }}
              onClick={() => setMobileCartOpen(false)}
            />
          )}
          <div
            className="fixed inset-x-0 bottom-0 z-50 rounded-t-2xl bg-white overflow-hidden transition-transform"
            style={{
              border: "1px solid #E4DCC7",
              boxShadow: "0 -4px 20px rgba(22,58,79,0.12)",
              maxHeight: mobileCartOpen ? "80vh" : "0px",
            }}
          >
            <button
              onClick={() => setMobileCartOpen(false)}
              className="w-full px-4 py-2.5 flex items-center justify-between"
              style={{ background: "#163A4F" }}
            >
              <span className="flex items-center gap-2 text-[#F6F1E4]">
                <Receipt size={15} />
                <span className="font-display text-sm">
                  {selectedTable ? `Table ${selectedTable}` : "Choisis une table"}
                </span>
              </span>
              <ChevronUp size={16} className="text-[#F6F1E4]" style={{ transform: "rotate(180deg)" }} />
            </button>

            {selectedTable && (
              <WaiterStep selectedTable={selectedTable} tableWaiters={tableWaiters} assignWaiter={assignWaiter} />
            )}

            <div className="max-h-[42vh] overflow-y-auto px-4 py-2 divide-y" style={{ borderColor: "#F1ECDE" }}>
              <CartLines
                cart={cart}
                updateQty={updateQty}
                removeLine={removeLine}
                waiterMissing={!!selectedTable && !tableWaiters[selectedTable]}
              />
            </div>

            <div className="px-4 py-3 border-t" style={{ borderColor: "#F1ECDE" }}>
              {selectedTable && cart.length > 0 && (
                <DiscountControl
                  value={discount}
                  onChange={(d) => setTableDiscount(selectedTable, d)}
                  onClear={() => clearTableDiscount(selectedTable)}
                />
              )}
              {discount && (
                <>
                  <div className="flex items-baseline justify-between text-xs opacity-60 mb-1">
                    <span>Sous-total</span>
                    <span className="font-mono">{money(cartTotal)}</span>
                  </div>
                  <div className="flex items-baseline justify-between text-xs mb-1" style={{ color: "#C1571E" }}>
                    <span>Remise {discount.type === "percent" ? `(${discount.amount}%)` : ""}</span>
                    <span className="font-mono">-{money(discountAmount)}</span>
                  </div>
                </>
              )}
              <div className="flex items-baseline justify-between mb-3">
                <span className="text-sm font-medium">Total</span>
                <span className="font-mono text-xl font-semibold" style={{ color: "#E0793F" }}>
                  {money(finalTotal)}
                </span>
              </div>
              <button
                onClick={checkout}
                className="w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98] hover:brightness-105"
                style={{
                  background: "linear-gradient(135deg, #5DBE9E 0%, #4FA98C 55%, #3E8F76 100%)",
                  color: "#0E2431",
                  boxShadow: "0 4px 14px rgba(79,169,140,0.4)",
                }}
              >
                <Check size={17} /> Encaisser la commande
              </button>
            </div>
          </div>

          {/* Slim always-visible bar — tap to open the drawer above */}
          <button
            onClick={() => setMobileCartOpen((v) => !v)}
            className="fixed inset-x-0 bottom-0 z-30 px-4 py-2.5 flex items-center justify-between"
            style={{
              background: "#163A4F",
              boxShadow: "0 -2px 12px rgba(22,58,79,0.2)",
              display: mobileCartOpen ? "none" : "flex",
            }}
          >
            <span className="flex items-center gap-2 text-[#F6F1E4]">
              <Receipt size={16} />
              <span className="font-display text-sm">
                {selectedTable ? `Table ${selectedTable}` : "Choisis une table"}
              </span>
              <span className="font-mono text-xs text-[#F6F1E4]/70">· {cartCount} art.</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="font-mono text-sm font-semibold text-[#F6F1E4]">{money(finalTotal)}</span>
              <ChevronUp size={16} className="text-[#F6F1E4]" />
            </span>
          </button>
        </div>
        </>
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
          dayExpenses={dayExpenses}
          dayExpensesTotal={dayExpensesTotal}
          onAddExpense={addExpense}
          onDeleteExpense={deleteExpense}
        />
      )}

      {/* Add-item modal */}
      {modalItem && (
        <ItemModal item={modalItem} onClose={() => setModalItem(null)} onAdd={addToCart} />
      )}

      {/* Add-menu-item modal */}
      {addItemTarget && (
        <AddMenuItemModal target={addItemTarget} onClose={() => setAddItemTarget(null)} onAdd={addMenuItem} />
      )}
    </div>
  );
}

function ItemModal({ item, onClose, onAdd }) {
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(item.price);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-4"
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
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPrice((p) => Math.max(0, Math.round((p - 1) * 100) / 100))}
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{ background: "#F6F1E4" }}
            >
              <Minus size={14} />
            </button>
            <input
              type="number"
              step="0.5"
              min="0"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
              className="font-mono text-base w-16 text-center px-1 py-1 rounded-lg"
              style={{ border: "1px solid #E4DCC7" }}
            />
            <button
              onClick={() => setPrice((p) => Math.round((p + 1) * 100) / 100)}
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{ background: "#F6F1E4" }}
            >
              <Plus size={14} />
            </button>
          </div>
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

function HistoryView({
  orders, dayOrders, dayTotal, topItems, waiterTotals, historyDate, setHistoryDate, onDelete, loading,
  dayExpenses, dayExpensesTotal, onAddExpense, onDeleteExpense,
}) {
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

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-6">
        <StatCard label="Chiffre d'affaires" value={money(dayTotal)} accent="#E0793F" />
        <StatCard label="Commandes" value={dayOrders.length} accent="#4FA98C" />
        <StatCard
          label="Panier moyen"
          value={dayOrders.length ? money(dayTotal / dayOrders.length) : money(0)}
          accent="#163A4F"
        />
        <StatCard label="Caisse nette" value={money(dayTotal - dayExpensesTotal)} accent="#163A4F" />
      </div>

      <ExpensesSection
        dayExpenses={dayExpenses}
        dayExpensesTotal={dayExpensesTotal}
        onAdd={onAddExpense}
        onDelete={onDeleteExpense}
      />

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
                  {o.discount && (
                    <span
                      className="text-xs font-medium px-1.5 py-0.5 rounded"
                      style={{ background: "#FBEFE6", color: "#C1571E" }}
                    >
                      -{o.discount.type === "percent" ? `${o.discount.amount}%` : money(o.discount.amount)}
                    </span>
                  )}
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

/* ---------- Sorties de caisse — cash taken out of the register:
   tips handed to a waiter, a small purchase (ice, bread...), etc. ---------- */
function ExpensesSection({ dayExpenses, dayExpensesTotal, onAdd, onDelete }) {
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");

  const canSubmit = label.trim().length > 0 && amount !== "" && !isNaN(parseFloat(amount)) && parseFloat(amount) > 0;

  function submit() {
    if (!canSubmit) return;
    onAdd(label.trim(), Math.round(parseFloat(amount) * 100) / 100);
    setLabel("");
    setAmount("");
  }

  return (
    <div className="mb-6 rounded-2xl bg-white p-4" style={{ border: "1px solid #E4DCC7" }}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold flex items-center gap-2" style={{ color: "#163A4F" }}>
          <Wallet size={15} /> Sorties de caisse
        </h3>
        <span className="font-mono text-sm font-semibold" style={{ color: "#C1571E" }}>
          -{money(dayExpensesTotal)}
        </span>
      </div>

      {/* Quick-add form: motif + montant */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Motif — ex. pourboire serveur, glace..."
          className="flex-1 min-w-[160px] px-3 py-2 rounded-xl text-sm"
          style={{ border: "1px solid #E4DCC7" }}
        />
        <input
          type="number"
          step="0.5"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Montant DT"
          className="w-28 px-3 py-2 rounded-xl text-sm font-mono"
          style={{ border: "1px solid #E4DCC7" }}
        />
        <button
          onClick={submit}
          disabled={!canSubmit}
          className="px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5 disabled:opacity-40"
          style={{ background: "#163A4F", color: "#F6F1E4" }}
        >
          <ArrowDownRight size={14} /> Sortir
        </button>
      </div>

      {dayExpenses.length === 0 ? (
        <p className="text-sm opacity-50 text-center py-2">Aucune sortie de caisse pour cette date.</p>
      ) : (
        <div className="space-y-2">
          {dayExpenses.map((e) => (
            <div key={e.id} className="flex items-center justify-between text-sm py-1.5 border-b last:border-b-0" style={{ borderColor: "#F1ECDE" }}>
              <div className="min-w-0">
                <div className="font-medium truncate">{e.label}</div>
                <div className="text-xs opacity-50">
                  {new Date(e.createdAt).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="font-mono font-semibold" style={{ color: "#C1571E" }}>
                  -{money(e.amount)}
                </span>
                <button onClick={() => onDelete(e.id)} className="opacity-40 hover:opacity-100">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
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