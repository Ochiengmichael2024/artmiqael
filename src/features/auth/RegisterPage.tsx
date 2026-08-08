import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";
import { isRequired, isValidEmail, isValidPassword } from "@/utils/validators";
import { useAuth } from "@/hooks/useAuth";
import { AuthShell } from "./AuthShell";

export function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!isRequired(form.name)) errs.name = "Required";
    if (!isValidEmail(form.email)) errs.email = "Enter a valid email";
    if (!isValidPassword(form.password)) errs.password = "At least 6 characters";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    await login(form.email, form.name);
    setLoading(false);
    navigate(ROUTES.account);
  }

  return (
    <AuthShell
      title="Create your account"
      sub="Join to save wishlists, track orders and speed through checkout."
      footer={
        <>
          Already have an account?{" "}
          <Link to={ROUTES.login} className="underline-link">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={submit} className="grid gap-4">
        <Input label="Full name" value={form.name} error={errors.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <Input label="Email" type="email" value={form.email} error={errors.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <Input
          label="Password"
          type="password"
          value={form.password}
          error={errors.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <Button block disabled={loading}>
          {loading ? "Creating account…" : "Create account"}
        </Button>
      </form>
    </AuthShell>
  );
}
