import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";
import { isValidEmail, isValidPassword } from "@/utils/validators";
import { useAuth } from "@/hooks/useAuth";
import { AuthShell } from "./AuthShell";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!isValidEmail(form.email)) errs.email = "Enter a valid email";
    if (!isValidPassword(form.password)) errs.password = "At least 6 characters";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    await login(form.email);
    setLoading(false);
    navigate(ROUTES.account);
  }

  return (
    <AuthShell
      title="Welcome back"
      sub="Sign in to track orders, manage your wishlist and saved addresses."
      footer={
        <>
          New here?{" "}
          <Link to={ROUTES.register} className="underline-link">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={submit} className="grid gap-4">
        <Input label="Email" type="email" value={form.email} error={errors.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <div>
          <Input
            label="Password"
            type="password"
            value={form.password}
            error={errors.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <div className="text-right mt-1.5">
            <Link to={ROUTES.forgotPassword} className="underline-link">
              Forgot password?
            </Link>
          </div>
        </div>
        <Button block disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </Button>
        <Button type="button" variant="secondary" block onClick={() => navigate(ROUTES.home)}>
          Continue as guest
        </Button>
      </form>
    </AuthShell>
  );
}
