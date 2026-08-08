export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function generateOrderId(): string {
  return generateId().toUpperCase();
}
