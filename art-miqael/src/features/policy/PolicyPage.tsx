import React from "react";
import { useParams } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { POLICY_CONTENT } from "@/data/faq.data";
import { ROUTES } from "@/constants/routes";

export function PolicyPage() {
  const { type = "privacy" } = useParams();
  const content = POLICY_CONTENT[type] ?? POLICY_CONTENT.privacy;

  return (
    <Container className="pt-7 pb-16 max-w-[720px]">
      <Breadcrumbs items={[{ label: "Home", to: ROUTES.home }, { label: content.title }]} />
      <h1 className="heading-serif text-[32px] mt-5 mb-6">{content.title}</h1>
      {content.body.map((p, i) => (
        <p key={i} className="text-[14.5px] leading-[1.85] text-ink-soft mb-4">
          {p}
        </p>
      ))}
      <p className="font-mono text-[11px] text-ink-faint mt-7">LAST UPDATED JULY 2026</p>
    </Container>
  );
}
