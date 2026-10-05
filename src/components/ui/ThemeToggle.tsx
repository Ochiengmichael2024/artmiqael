import React from "react";
import { Moon, Sun } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import { useTheme } from "@/hooks/useTheme";
import { cx } from "@/utils/cx";

export function ThemeToggle({ className }: { className?: string }) {
  const { toggleTheme, isDark } = useTheme();

  return (
    <IconButton
      type="button"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      onClick={toggleTheme}
      className={cx("bg-surface-raised text-ink hover:border-accent", className)}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </IconButton>
  );
}
