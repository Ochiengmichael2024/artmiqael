import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Heart, ShoppingBag, User, Menu } from "lucide-react";
import { PRIMARY_NAV } from "@/constants/navigation";
import { ROUTES } from "@/constants/routes";
import { IconButton } from "@/components/ui/IconButton";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { useSearchSuggestions } from "@/hooks/useSearchSuggestions";
import { MobileDrawer } from "@/components/layout/MobileDrawer";

function CountDot({ n }: { n: number }) {
  return (
    <span
      aria-hidden="true"
      className="absolute -top-1 -right-1 bg-ink text-surface text-[9.5px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
    >
      {n > 9 ? "9+" : n}
    </span>
  );
}

export function Header() {
  const navigate = useNavigate();
  const { cart, wishlist, recentSearches, addRecentSearch } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const suggestions = useSearchSuggestions(query);
  const cartCount = cart.reduce((s, c) => s + c.qty, 0);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function runSearch(term?: string) {
    const value = (term ?? query).trim();
    if (!value) return;
    addRecentSearch(value);
    setSearchOpen(false);
    setMobileOpen(false);
    navigate(`${ROUTES.shop}?search=${encodeURIComponent(value)}`);
  }

  const showSuggestions = searchOpen && query.trim().length > 0 && suggestions.length > 0;

  return (
    <header className="sticky top-0 z-[100] bg-bg">
      <div className="bg-black text-[#EFEAE0]">
        <div className="container-page flex justify-between items-center py-2 text-[11px]">
          <span className="font-mono tracking-[0.12em]">ART, DELIVERED WITH INTENTION</span>
          <span className="font-mono tracking-[0.1em] hidden sm:inline">Originals · Limited editions · Custom commissions</span>
          <Link to={ROUTES.faqs} className="font-mono tracking-[0.1em] text-accent-soft">
            Help &amp; care
          </Link>
        </div>
      </div>

      <div className="container-page flex flex-wrap items-center gap-4 py-4 border-b border-line">
        <IconButton aria-label="Open menu" className="border border-line lg:hidden" onClick={() => setMobileOpen(true)}>
          <Menu size={17} />
        </IconButton>
        <Link to={ROUTES.home} className="font-serif text-[22px] font-semibold tracking-wide text-ink">
          ARTMIQAEL
        </Link>
        <nav className="hidden lg:flex gap-6 lg:ml-2">
          {PRIMARY_NAV.map((l) => (
            <Link key={l.label} to={l.to} className="text-sm font-medium text-ink hover:text-accent">
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Merged search + wishlist + cart pill */}
        <div ref={searchRef} className="relative flex-1 min-w-0 max-w-full lg:max-w-[420px] ml-auto">
          <div className="flex items-center gap-1.5 rounded-full p-1.5" style={{ backgroundColor: "var(--accent)" }}>
            <div className="relative flex-1 min-w-0">
              <Search
                size={14}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint"
                aria-hidden="true"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                onKeyDown={(e) => e.key === "Enter" && runSearch()}
                placeholder="Type R..."
                aria-label="Search artworks"
                className="w-full min-w-0 bg-surface-raised rounded-full pl-9 pr-4 py-2 text-sm text-ink placeholder:text-ink-faint outline-none"
              />
            </div>

            <IconButton
              aria-label={`Wishlist (${wishlist.length})`}
              className="relative shrink-0 border-transparent"
              onClick={() => navigate(ROUTES.wishlist)}
            >
              <Heart size={16} />
              {wishlist.length > 0 && <CountDot n={wishlist.length} />}
            </IconButton>
            <IconButton
              aria-label={`Cart (${cartCount})`}
              className="relative shrink-0 border-transparent"
              onClick={() => navigate(ROUTES.cart)}
            >
              <ShoppingBag size={16} />
              {cartCount > 0 && <CountDot n={cartCount} />}
            </IconButton>
          </div>

          {showSuggestions && (
            <div
              className="absolute right-0 top-full mt-2 w-full sm:w-72 max-w-[90vw] rounded-2xl bg-surface-raised shadow-lg overflow-hidden z-50"
              role="listbox"
              aria-label="Search suggestions"
            >
              {suggestions.map((s) => (
                <div
                  key={s}
                  role="option"
                  className="p-2.5 text-sm cursor-pointer hover:bg-line/40"
                  onClick={() => runSearch(s)}
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <ThemeToggle />
          <Button variant="secondary" size="sm" onClick={() => navigate(isAuthenticated ? ROUTES.account : ROUTES.login)}>
            <User size={14} /> {isAuthenticated && user ? user.name.split(" ")[0] : "Account"}
          </Button>
        </div>
      </div>

      {mobileOpen && <MobileDrawer onClose={() => setMobileOpen(false)} />}
    </header>
  );
}