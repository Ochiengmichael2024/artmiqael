import type { Category } from "@/types";

export const CATEGORIES: Category[] = [
  { slug: "original-paintings", label: "Original paintings", blurb: "One-of-one works, signed and ready to hang." },
  { slug: "limited-editions", label: "Limited editions", blurb: "Small-run archival prints, numbered and signed." },
  { slug: "canvas-prints", label: "Canvas prints", blurb: "Open-edition prints on museum-grade canvas." },
  { slug: "murals", label: "Murals", blurb: "Large-scale, made-to-order wall works." },
  { slug: "custom-artwork", label: "Custom artwork", blurb: "Commission a piece built for your space." },
];

export function categoryLabel(slug: string): string | undefined {
  return CATEGORIES.find((c) => c.slug === slug)?.label;
}
