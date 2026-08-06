import React, { type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { IconBox } from "@/components/ui/IconBox";

export interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  body: string;
  action?: ReactNode;
}

export function EmptyState({ icon: Icon, title, body, action }: EmptyStateProps) {
  return (
    <div className="animate-fade-up text-center py-20 px-5 max-w-[420px] mx-auto">
      <IconBox icon={<Icon size={22} />} size={56} className="mx-auto mb-5" />
      <h3 className="heading-serif text-[22px] mb-2">{title}</h3>
      <p className="text-ink-soft text-sm leading-relaxed mb-5">{body}</p>
      {action}
    </div>
  );
}
