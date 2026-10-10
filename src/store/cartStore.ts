/**
 * Tiny external store for the cart, persisted to localStorage.
 * Consumed through `useSyncExternalStore` in CartProvider, which keeps
 * server and first client render identical (empty cart) and avoids hydration mismatches.
 */

export interface CartLine {
  productId: number;
  quantity: number;
}

export const STORAGE_KEY = "whatbytes-cart";
export const MAX_QUANTITY = 99;

const EMPTY: CartLine[] = [];
let lines: CartLine[] | null = null;
const listeners = new Set<() => void>();

function readStorage(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY;
    return parsed.filter(
      (l): l is CartLine =>
        typeof l?.productId === "number" &&
        Number.isInteger(l?.quantity) &&
        l.quantity > 0,
    );
  } catch {
    return EMPTY;
  }
}

function emit() {
  listeners.forEach((l) => l());
}

function setLines(next: CartLine[]) {
  lines = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage full or blocked (private mode): keep the in-memory cart.
  }
  emit();
}

const clampQty = (q: number) => Math.max(1, Math.min(MAX_QUANTITY, Math.floor(q)));

export const cartStore = {
  getSnapshot(): CartLine[] {
    if (lines === null) lines = readStorage();
    return lines;
  },

  getServerSnapshot(): CartLine[] {
    return EMPTY;
  },

  subscribe(listener: () => void) {
    listeners.add(listener);
    // Keep multiple tabs in sync.
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      lines = readStorage();
      listener();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  },

  add(productId: number, quantity = 1) {
    const current = cartStore.getSnapshot();
    const existing = current.find((l) => l.productId === productId);
    setLines(
      existing
        ? current.map((l) =>
            l.productId === productId ? { ...l, quantity: clampQty(l.quantity + quantity) } : l,
          )
        : [...current, { productId, quantity: clampQty(quantity) }],
    );
  },

  setQuantity(productId: number, quantity: number) {
    if (quantity < 1) return cartStore.remove(productId);
    setLines(
      cartStore
        .getSnapshot()
        .map((l) => (l.productId === productId ? { ...l, quantity: clampQty(quantity) } : l)),
    );
  },

  remove(productId: number) {
    setLines(cartStore.getSnapshot().filter((l) => l.productId !== productId));
  },

  clear() {
    setLines(EMPTY);
  },
};
