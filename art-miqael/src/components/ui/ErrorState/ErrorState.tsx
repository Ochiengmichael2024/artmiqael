import React, { type ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";

export interface ErrorStateProps {
  title: string;
  body?: string;
  action?: ReactNode;
}

export function ErrorState({ title, body = "It may have moved or the link may be out of date.", action }: ErrorStateProps) {
  return <EmptyState icon={AlertCircle} title={title} body={body} action={action} />;
}
