import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
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

      <div className="container-page flex flex-wrap items-center gap-4 py-4 border-b border-line">
        <IconButton aria-label="Open menu" className="border border-line lg:hidden" onClick={() => setMobileOpen(true)}>
          <Menu size={17} />
        </IconButton>
        <Link to={ROUTES.home} className="font-serif text-[22px] font-semibold tracking-wide text-ink">
          ARTMIQAEL
        </Link>
        <nav className="hidden lg:flex gap-6 lg:ml-2">
          {PRIMARY_NAV.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              className={({ isActive }) =>
                `text-sm font-medium ${isActive ? "text-[#8C5A2B]" : "text-ink hover:text-accent"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div ref={searchRef} className="relative flex-1 min-w-0 max-w-full lg:max-w-[460px] ml-auto">
          <div className="flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-2 shadow-sm">
            <Search size={15} className="text-muted flex-shrink-0" />
            <input
              type="search"
              value={query}
              onFocus={() => setSearchOpen(true)}
              onChange={(e) => {
                setQuery(e.target.value);
                setSearchOpen(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  runSearch();
                }
              }}
              placeholder="Search artworks, artists, styles"
              aria-label="Search artworks and artists"
              className="w-full bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none"
            />
            <Button type="button" variant="secondary" size="sm" onClick={() => runSearch()} className="whitespace-nowrap">
              Search
            </Button>
          </div>

          {searchOpen && (query.trim() || recentSearches.length > 0) && (
            <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-20 rounded-2xl border border-line bg-surface p-2 shadow-xl">
              {query.trim() ? (
                <>
                  {suggestions.artworks.length === 0 && suggestions.artists.length === 0 ? (
                    <div className="px-3 py-2 text-sm text-muted">No matches found</div>
                  ) : (
                    <div className="space-y-1">
                      {suggestions.artworks.map((artwork) => (
                        <button
                          key={artwork.id}
                          type="button"
                          onClick={() => runSearch(artwork.title)}
                          className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-ink hover:bg-muted/10"
                        >
                          <span>{artwork.title}</span>
                          <span className="text-xs text-muted">Artwork</span>
                        </button>
                      ))}
                      {suggestions.artists.map((artist) => (
                        <button
                          key={artist.id}
                          type="button"
                          onClick={() => runSearch(artist.name)}
                          className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-ink hover:bg-muted/10"
                        >
                          <span>{artist.name}</span>
                          <span className="text-xs text-muted">Artist</span>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-1">
                  {recentSearches.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => runSearch(term)}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-ink hover:bg-muted/10"
                    >
                      <span>{term}</span>
                      <span className="text-xs text-muted">Recent</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
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
