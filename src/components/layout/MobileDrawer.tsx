import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { PRIMARY_NAV, MOBILE_EXTRA_NAV } from "@/constants/navigation";
import { ROUTES } from "@/constants/routes";
import { IconButton } from "@/components/ui/IconButton";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

export function MobileDrawer({ onClose }: { onClose: () => void }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function go(to: string) {
    navigate(to);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[160] flex">
      <div className="absolute inset-0 bg-ink/50" onClick={onClose} />
      <div className="animate-fade-up relative w-[300px] max-w-[85vw] h-full bg-surface-raised p-6 flex flex-col overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <span className="font-serif text-xl">ARTMIQAEL</span>
          <IconButton aria-label="Close menu" onClick={onClose}>
            <X size={16} />
          </IconButton>
        </div>
        <div className="flex flex-col gap-1">
          {[...PRIMARY_NAV, ...MOBILE_EXTRA_NAV].map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              onClick={onClose}
              className={({ isActive }) =>
                `text-left bg-transparent border-0 border-b border-line py-3 px-1 text-base ${
                  isActive ? "text-[#8C5A2B]" : "text-ink"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
        <div className="mt-auto flex flex-col gap-2.5 pt-6">
          <Button block onClick={() => go(isAuthenticated ? ROUTES.account : ROUTES.login)}>
            {isAuthenticated ? "My account" : "Sign in"}
          </Button>
          <Button variant="secondary" block onClick={() => go(ROUTES.shop)}>
            Browse art
          </Button>
        </div>
      </div>
    </div>
  );
}
