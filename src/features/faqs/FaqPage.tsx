import React from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Accordion, type AccordionItem } from "@/components/ui/Accordion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQ_GROUPS } from "@/data/faq.data";
import { ROUTES } from "@/constants/routes";
import { slugify } from "@/utils/slugify";

export function FaqPage() {
  const navigate = useNavigate();

  return (
    <Container className="pt-7 pb-16 max-w-[780px]">
      <Breadcrumbs items={[{ label: "Home", to: ROUTES.home }, { label: "FAQs" }]} />
      <SectionHeader eyebrow="Help & care" title="Frequently asked questions" />
      {FAQ_GROUPS.map((g) => {
        const items: AccordionItem[] = g.items.map(([q, a], i) => ({ key: `${slugify(g.group)}-${i}`, question: q, answer: a }));
        return (
          <div key={g.group} className="mb-8">
            <div className="font-mono text-[11.5px] text-accent mb-3">{g.group.toUpperCase()}</div>
            <Accordion items={items} defaultOpenKey={g.group === FAQ_GROUPS[0].group ? items[0]?.key : null} />
          </div>
        );
      })}
      <Card className="p-6 text-center mt-5">
        <p className="text-sm mb-3.5">Still have a question?</p>
        <Button onClick={() => navigate(ROUTES.contact)}>Contact support</Button>
      </Card>
    </Container>
  );
}
