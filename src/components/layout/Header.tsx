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

      <div className="container-page flex items-center gap-5 py-4 border-b border-line">
        <IconButton aria-label="Open menu" className="border border-line lg:hidden" onClick={() => setMobileOpen(true)}>
          <Menu size={17} />
        </IconButton>
        <Link to={ROUTES.home} className="font-serif text-[22px] font-semibold tracking-wide text-ink">
          ARTMIQAEL
        </Link>
        <nav className="hidden lg:flex gap-6 ml-2">
          {PRIMARY_NAV.map((l) => (
            <Link key={l.label} to={l.to} className="text-sm font-medium text-ink hover:text-accent">
              {l.label}
            </Link>
          ))}
        </nav>

        <div ref={searchRef} className="relative flex-1 max-w-[460px] ml-auto">
          <div className="flex items-center gap-2 bg-surface-raised border border-line-strong rounded-full px-3.5 py-2.5">
            <Search size={15} className="text-ink-faint shrink-0" />
            <input
              value={query}
              onFocus={() => setSearchOpen(true)}
              onChange={(e) => {
                setQuery(e.target.value);
                setSearchOpen(true);
              }}
              onKeyDown={(e) => e.key === "Enter" && runSearch()}
              placeholder="Search works, artists and collections"
              aria-label="Search"
              className="border-0 outline-none bg-transparent flex-1 text-[13.5px]"
            />
          </div>
          {searchOpen && (
            <div className="card-raised absolute top-[calc(100%+8px)] left-0 right-0 z-40 p-3.5 max-h-[380px] overflow-auto">
              {query.trim() === "" ? (
                recentSearches.length > 0 ? (
                  <>
                    <div className="font-mono text-[10.5px] text-ink-faint mb-2">RECENT SEARCHES</div>
                    {recentSearches.map((r) => (
                      <button
                        key={r}
                        onClick={() => runSearch(r)}
                        className="block w-full text-left bg-transparent border-0 py-1.5 px-1 text-[13.5px]"
                      >
                        {r}
                      </button>
                    ))}
                  </>
                ) : (
                  <div className="text-[13px] text-ink-soft p-1.5">Start typing to search artworks, artists and styles.</div>
                )
              ) : (
                <>
                  {suggestions.artworks.length === 0 && suggestions.artists.length === 0 && (
                    <div className="text-[13px] text-ink-soft p-1.5">No quick matches — press Enter to search all works.</div>
                  )}
                  {suggestions.artists.length > 0 && (
                    <>
                      <div className="font-mono text-[10.5px] text-ink-faint my-2">ARTISTS</div>
                      {suggestions.artists.map((a) => (
                        <Link
                          key={a.id}
                          to={ROUTES.artistDetail(a.id)}
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center gap-2.5 py-1.5 px-1"
                        >
                          <img src={`https://picsum.photos/seed/${a.seed}/60/60`} alt="" className="w-[26px] h-[26px] rounded-full object-cover" />
                          <span className="text-[13.5px]">{a.name}</span>
                        </Link>
                      ))}
                    </>
                  )}
                  {suggestions.artworks.length > 0 && (
                    <>
                      <div className="font-mono text-[10.5px] text-ink-faint my-2">ARTWORKS</div>
                      {suggestions.artworks.map((a) => (
                        <Link
                          key={a.id}
                          to={ROUTES.product(a.id)}
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center gap-2.5 py-1.5 px-1"
                        >
                          <img src={a.img} alt="" className="w-[30px] h-[36px] rounded-md object-cover bg-line" />
                          <span className="text-[13.5px]">
                            {a.title} <span className="text-ink-faint">— {a.artistName}</span>
                          </span>
                        </Link>
                      ))}
                    </>
                  )}
                  <button onClick={() => runSearch()} className="underline-link mt-2.5">
                    See all results for &quot;{query}&quot;
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <IconButton aria-label={`Wishlist (${wishlist.length})`} className="relative" onClick={() => navigate(ROUTES.wishlist)}>
            <Heart size={16} />
            {wishlist.length > 0 && <CountDot n={wishlist.length} />}
          </IconButton>
          <IconButton aria-label={`Cart (${cartCount})`} className="relative" onClick={() => navigate(ROUTES.cart)}>
            <ShoppingBag size={16} />
            {cartCount > 0 && <CountDot n={cartCount} />}
          </IconButton>
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
