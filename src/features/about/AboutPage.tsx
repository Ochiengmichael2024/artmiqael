import React from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ROUTES } from "@/constants/routes";

const STATS: [string, string][] = [
  ["144+", "works currently listed"],
  ["10", "represented studios"],
  ["48hrs", "average artist response time"],
];

export function AboutPage() {
  const navigate = useNavigate();
  return (
    <Container className="pt-7 pb-16">
      <Breadcrumbs items={[{ label: "Home", to: ROUTES.home }, { label: "About" }]} />
      <Card className="p-9 sm:p-12 my-5">
        <div className="eyebrow mb-3.5">OUR STORY</div>
        <h1 className="heading-serif text-[clamp(30px,4.5vw,46px)] max-w-[640px] mb-4.5">Art, delivered with intention.</h1>
        <p className="max-w-[560px] text-ink-soft text-[15px] leading-relaxed">
          Art Miqael started as a small studio directory and grew into a considered marketplace: original paintings, small-run editions and
          commissions from artists we've met, vetted and stayed in touch with. Every piece is hand-checked before it ships, and every artist
          keeps the majority of the sale.
        </p>
      </Card>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14">
        {STATS.map(([n, l]) => (
          <Card key={l} className="p-6.5">
            <div className="heading-serif text-[40px] mb-1.5">{n}</div>
            <div className="text-[13.5px] text-ink-soft">{l}</div>
          </Card>
        ))}
      </div>
      <div className="flex gap-3 flex-wrap">
        <Button onClick={() => navigate(ROUTES.shop)}>Browse art</Button>
        <Button variant="secondary" onClick={() => navigate(ROUTES.artists)}>
          Meet the artists
        </Button>
        <Button variant="secondary" onClick={() => navigate(ROUTES.contact)}>
          Get in touch
        </Button>
      </div>
    </Container>
  );
}
