import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ROUTES } from "@/constants/routes";

const WAY_IN_CARDS = [
  { n: "01", category: "original-paintings", label: "Original paintings", body: "One-of-one works, signed and ready to hang." },
  { n: "02", category: "limited-editions", label: "Limited editions", body: "Small-run archival prints, numbered and signed." },
  { n: "03", category: "canvas-prints", label: "Art for interiors", body: "Open-edition prints sized for real rooms." },
];

export function WayInSection() {
  const navigate = useNavigate();
  return (
    <section>
      <div className="eyebrow mb-3.5">EXPLORE BY WAY IN</div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {WAY_IN_CARDS.map((c) => (
          <Card key={c.n} className="p-7">
            <div className="font-mono text-[11px] text-ink-faint mb-8">{c.n}</div>
            <div className="heading-serif text-2xl mb-2.5">{c.label}</div>
            <p className="text-[13.5px] text-ink-soft mb-4 leading-relaxed">{c.body}</p>
            <button className="underline-link" onClick={() => navigate(`${ROUTES.shop}?category=${c.category}`)}>
              Explore <ArrowRight size={12} />
            </button>
          </Card>
        ))}
      </div>
    </section>
  );
}
