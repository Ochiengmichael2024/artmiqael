import React, { useState } from "react";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { Button } from "@/components/ui/Button";
import { IconBox } from "@/components/ui/IconBox";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ROUTES } from "@/constants/routes";
import { isRequired, isValidEmail } from "@/utils/validators";
import { useToast } from "@/hooks/useToast";

const BENEFITS: [string, string, string][] = [
  ["01", "You keep the majority of every sale", "Artists retain 80% of the sale price on every original and edition."],
  ["02", "We handle logistics", "Packaging, shipping and customer support are on us once a piece sells."],
  ["03", "Full control over pricing", "You set your own prices and editions — we never discount your work without asking."],
];

export function SellPage() {
  const { pushToast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", portfolio: "", statement: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!isRequired(form.name)) errs.name = "Required";
    if (!isValidEmail(form.email)) errs.email = "Enter a valid email";
    if (!isRequired(form.portfolio)) errs.portfolio = "Add a link to your work";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSent(true);
    pushToast("Application submitted");
  }

  return (
    <Container className="pt-7 pb-16">
      <Breadcrumbs items={[{ label: "Home", to: ROUTES.home }, { label: "Sell on Art Miqael" }]} />
      <SectionHeader
        eyebrow="Become an artist"
        title="Sell your work on Art Miqael"
        sub="We onboard a small number of studios each season. Apply below and our curatorial team will follow up."
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {sent ? (
          <Card raised className="p-9 text-center">
            <IconBox icon={<Check size={22} />} tone="sage" size={50} className="mx-auto mb-4" />
            <h3 className="heading-serif text-[22px] mb-2">Application received</h3>
            <p className="text-sm text-ink-soft">Our curatorial team reviews applications weekly and replies within 10 business days.</p>
          </Card>
        ) : (
          <form onSubmit={submit} className="card-raised p-7 grid gap-4">
            <Input label="Full name" value={form.name} error={errors.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input label="Email" type="email" value={form.email} error={errors.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <Input
              label="Portfolio or Instagram link"
              value={form.portfolio}
              error={errors.portfolio}
              onChange={(e) => setForm({ ...form, portfolio: e.target.value })}
            />
            <TextArea label="Artist statement (optional)" rows={4} value={form.statement} onChange={(e) => setForm({ ...form, statement: e.target.value })} />
            <Button block>Submit application</Button>
          </form>
        )}
        <div className="grid gap-4 content-start">
          {BENEFITS.map(([n, t, b]) => (
            <Card key={n} className="p-5">
              <div className="font-mono text-[11px] text-ink-faint mb-2.5">{n}</div>
              <div className="font-bold text-[14.5px] mb-1.5">{t}</div>
              <div className="text-[13px] text-ink-soft leading-relaxed">{b}</div>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
}
