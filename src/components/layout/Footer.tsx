import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Mail } from "lucide-react";
import { FOOTER_COLUMNS } from "@/constants/navigation";
import { ROUTES } from "@/constants/routes";
import { IconButton } from "@/components/ui/IconButton";

export function Footer() {
  return (
    <footer className="border-t border-line mt-20">
      <div className="container-page py-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        <div className="col-span-2">
          <div className="font-serif text-[22px] mb-3">ARTMIQAEL</div>
          <p className="text-[13px] text-ink-soft leading-relaxed max-w-[260px] mb-4">
            Original works and considered editions, selected for the spaces you call your own.
          </p>
          <div className="flex gap-2">
            <IconButton aria-label="Instagram" onClick={() => window.open("https://instagram.com", "_blank")}>
              <Instagram size={15} />
            </IconButton>
            <Link to={ROUTES.contact} className="icon-btn" aria-label="Email us">
              <Mail size={15} />
            </Link>
          </div>
        </div>
        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title}>
            <div className="font-mono text-[11px] text-ink-faint mb-3.5">{col.title.toUpperCase()}</div>
            <div className="flex flex-col gap-2.5">
              {col.links.map((l) => (
                <Link key={l.label} to={l.to} className="text-left text-[13.5px] text-ink-soft hover:text-ink">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="container-page py-4 border-t border-line flex justify-between flex-wrap gap-2">
        <span className="font-mono text-[10.5px] text-ink-faint">© 2026 ART MIQAEL. ALL RIGHTS RESERVED.</span>
        <span className="font-mono text-[10.5px] text-ink-faint">A DEMONSTRATION STOREFRONT — NO REAL PAYMENTS ARE PROCESSED.</span>
      </div>
    </footer>
  );
}
