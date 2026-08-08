import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { IconBox } from "@/components/ui/IconBox";
import { ROUTES } from "@/constants/routes";
import { isValidEmail } from "@/utils/validators";
import { authService } from "@/services/auth.service";
import { useToast } from "@/hooks/useToast";
import { AuthShell } from "./AuthShell";

export function ForgotPasswordPage() {
  const { pushToast } = useToast();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Enter a valid email");
      return;
    }
    setError("");
    await authService.requestPasswordReset(email);
    setSent(true);
    pushToast("Password reset link sent (simulated)");
  }

  return (
    <AuthShell
      title="Reset your password"
      sub="Enter your email and we'll simulate sending a reset link."
      footer={
        <Link to={ROUTES.login} className="underline-link">
          <ArrowLeft size={12} className="inline" /> Back to sign in
        </Link>
      }
    >
      {sent ? (
        <div className="text-center py-2.5">
          <IconBox icon={<Check size={20} />} tone="sage" size={46} className="mx-auto mb-3.5" />
          <p className="text-sm">If an account exists for {email}, a reset link has been sent.</p>
        </div>
      ) : (
        <form onSubmit={submit} className="grid gap-4">
          <Input label="Email" type="email" value={email} error={error} onChange={(e) => setEmail(e.target.value)} />
          <Button block>Send reset link</Button>
        </form>
      )}
    </AuthShell>
  );
}
