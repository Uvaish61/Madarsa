export function toAmount(price: string): number {
  return +price.replace(/[^\d]/g, "");
}

export function formatINR(n: number): string {
  return `₹${n.toLocaleString("en-IN")}`;
}
