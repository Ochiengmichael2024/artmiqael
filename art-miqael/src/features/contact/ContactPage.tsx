import React, { useState } from "react";
import { Mail, Phone, MapPin, Check, ArrowRight } from "lucide-react";
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
import { isRequired, isValidEmail } from "@/utils/validators";
import { useToast } from "@/hooks/useToast";
import { Link } from "react-router-dom";

const TOPICS = ["General", "Order support", "Commission enquiry", "Press", "Selling on Art Miqael"];

export function ContactPage() {
  const { pushToast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", topic: "General", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!isRequired(form.name)) errs.name = "Required";
    if (!isValidEmail(form.email)) errs.email = "Enter a valid email";
    if (!isRequired(form.message)) errs.message = "Tell us a little more";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSent(true);
    pushToast("Message sent — we'll reply within 2 business days");
  }

  return (
    <Container className="pt-7 pb-16">
      <Breadcrumbs items={[{ label: "Home", to: ROUTES.home }, { label: "Contact" }]} />
      <SectionHeader eyebrow="Get in touch" title="Contact us" sub="Questions about an order, a piece, or becoming a partner artist — we read everything." />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <Card raised className="p-6.5">
          {sent ? (
            <div className="text-center py-5">
              <IconBox icon={<Check size={20} />} tone="sage" size={46} className="mx-auto mb-3.5" />
              <p className="text-sm">Thanks, {form.name.split(" ")[0]} — your message has been sent.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="grid gap-4">
              <Input label="Your name" value={form.name} error={errors.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <Input label="Email" type="email" value={form.email} error={errors.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <Select label="Topic" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}>
                {TOPICS.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </Select>
              <TextArea label="Message" rows={5} error={errors.message} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              <Button block>Send message</Button>
            </form>
          )}
        </Card>
        <div className="grid gap-4 content-start">
          <Card className="p-5 flex gap-3.5">
            <IconBox icon={<Mail size={17} />} size={36} />
            <div>
              <strong className="text-sm">Email</strong>
              <p className="text-[13px] text-ink-soft">hello@artmiqael.example</p>
            </div>
          </Card>
          <Card className="p-5 flex gap-3.5">
            <IconBox icon={<Phone size={17} />} size={36} />
            <div>
              <strong className="text-sm">Phone</strong>
              <p className="text-[13px] text-ink-soft">Mon–Fri, 9am–5pm</p>
            </div>
          </Card>
          <Card className="p-5 flex gap-3.5">
            <IconBox icon={<MapPin size={17} />} size={36} />
            <div>
              <strong className="text-sm">Studio</strong>
              <p className="text-[13px] text-ink-soft">By appointment only</p>
            </div>
          </Card>
          <Link to={ROUTES.faqs} className="underline-link">
            Looking for quick answers? Visit our FAQs <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </Container>
  );
}
