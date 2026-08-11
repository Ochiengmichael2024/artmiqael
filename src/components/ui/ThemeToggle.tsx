import React from "react";
import { Moon, Sun } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { toggleTheme, isDark } = useTheme();

  return (
    <IconButton
      type="button"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      onClick={toggleTheme}
      className="bg-surface-raised text-ink hover:border-accent"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </IconButton>
  );
}
