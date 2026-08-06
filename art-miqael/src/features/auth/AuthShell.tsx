import React, { type ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";

export interface AuthShellProps {
  title: string;
  sub?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthShell({ title, sub, children, footer }: AuthShellProps) {
  return (
    <Container className="pt-12 pb-16 flex justify-center">
      <Card raised className="w-full max-w-[420px] p-8">
        <h1 className="heading-serif text-[28px] mb-2">{title}</h1>
        {sub && <p className="text-[13.5px] text-ink-soft mb-6">{sub}</p>}
        {children}
        {footer && <div className="mt-5 text-center text-[13px]">{footer}</div>}
      </Card>
    </Container>
  );
}
