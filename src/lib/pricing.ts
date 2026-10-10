export const FREE_SHIPPING_THRESHOLD = 500;
export const SHIPPING_FEE = 15;
export const TAX_RATE = 0.08;

export interface OrderSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

export function getOrderSummary(subtotal: number): OrderSummary {
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const tax = round2(subtotal * TAX_RATE);
  return { subtotal, shipping, tax, total: round2(subtotal + shipping + tax) };
}

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export const formatPrice = (n: number) => currency.format(n);
