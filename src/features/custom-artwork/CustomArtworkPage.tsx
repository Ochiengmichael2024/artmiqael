import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { IconBox } from "@/components/ui/IconBox";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ROUTES } from "@/constants/routes";
import { STYLES } from "@/constants/filters";
import type { ArtworkStyle } from "@/types";
import { isRequired, isValidEmail } from "@/utils/validators";
import { useToast } from "@/hooks/useToast";

const BUDGETS = ["Under $300", "$300 – $600", "$600 – $1,000", "$1,000 – $3,000", "Over $3,000"];

interface CommissionForm {
  name: string;
  email: string;
  budget: string;
  dimensions: string;
  style: ArtworkStyle;
  brief: string;
}

export function CustomArtworkPage() {
  const navigate = useNavigate();
  const { pushToast } = useToast();
  const [form, setForm] = useState<CommissionForm>({ name: "", email: "", budget: "$300 – $600", dimensions: "", style: STYLES[0], brief: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!isRequired(form.name)) errs.name = "Required";
    if (!isValidEmail(form.email)) errs.email = "Enter a valid email";
    if (!isRequired(form.brief)) errs.brief = "Tell us about the space and idea";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSent(true);
    pushToast("Commission request sent");
  }

  return (
    <Container className="pt-7 pb-16">
      <Breadcrumbs items={[{ label: "Home", to: ROUTES.home }, { label: "Custom artwork" }]} />
      <SectionHeader eyebrow="Made for your space" title="Commission an original" sub="Tell us about your wall, budget and taste — we'll match you with an available artist." />
      {sent ? (
        <Card raised className="p-9 text-center max-w-[520px]">
          <IconBox icon={<Check size={22} />} tone="sage" size={50} className="mx-auto mb-4" />
          <h3 className="heading-serif text-[22px] mb-2">Request received</h3>
          <p className="text-sm text-ink-soft mb-5">An artist matching your brief will follow up by email within 2 business days with a sketch concept and quote.</p>
          <Button onClick={() => navigate(ROUTES.shop)}>Browse existing work meanwhile</Button>
        </Card>
      ) : (
        <form onSubmit={submit} className="card-raised p-7 max-w-[620px] grid gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Your name" value={form.name} error={errors.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input label="Email" type="email" value={form.email} error={errors.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select label="Budget" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })}>
              {BUDGETS.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </Select>
            <Input label="Wall dimensions" placeholder="e.g. 120 × 90 cm" value={form.dimensions} onChange={(e) => setForm({ ...form, dimensions: e.target.value })} />
          </div>
          <Select label="Preferred style" value={form.style} onChange={(e) => setForm({ ...form, style: e.target.value as ArtworkStyle })}>
            {STYLES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </Select>
          <TextArea
            label="Tell us about the space and idea"
            rows={5}
            error={errors.brief}
            value={form.brief}
            onChange={(e) => setForm({ ...form, brief: e.target.value })}
            placeholder="Room, light, existing furniture, colours you love or want to avoid…"
          />
          <Button block>Send commission request</Button>
        </form>
      )}
    </Container>
  );
}
