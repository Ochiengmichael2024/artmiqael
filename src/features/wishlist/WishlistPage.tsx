import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ArtworkGrid } from "@/components/common/ArtworkCard";
import { ROUTES } from "@/constants/routes";
import { useWishlist } from "@/hooks/useWishlist";

export function WishlistPage() {
  const navigate = useNavigate();
  const { items } = useWishlist();

  if (items.length === 0) {
    return (
      <Container className="pt-10">
        <EmptyState
          icon={Heart}
          title="Nothing saved yet"
          body="Tap the heart on any piece to keep track of it here."
          action={<Button onClick={() => navigate(ROUTES.shop)}>Browse art</Button>}
        />
      </Container>
    );
  }

  return (
    <Container className="pt-7 pb-16">
      <Breadcrumbs items={[{ label: "Home", to: ROUTES.home }, { label: "Wishlist" }]} />
      <SectionHeader title="Your wishlist" sub={`${items.length} saved work${items.length === 1 ? "" : "s"}`} />
      <ArtworkGrid artworks={items} />
    </Container>
  );
}
