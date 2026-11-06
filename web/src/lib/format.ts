export function formatPrice(value: string | number): string {
  const price = typeof value === "number" ? value : Number(value);

  if (!Number.isFinite(price)) {
    return "—";
  }

  return `$${price.toFixed(2)}`;
}
