import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ArtworkGrid } from "@/components/common/ArtworkCard";
import { findArtwork, ARTWORKS } from "@/data/artworks.data";
import { findArtist } from "@/data/artists.data";
import { reviewsFor } from "@/data/reviews.data";
import { categoryLabel } from "@/data/categories.data";
import { ROUTES } from "@/constants/routes";
import { Gallery } from "./Gallery";
import { BuyBox } from "./BuyBox";
import { ProductTabs } from "./ProductTabs";

export function ProductPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const artwork = findArtwork(id);

  if (!artwork) {
    return (
      <Container className="pt-16">
        <EmptyState
          icon={AlertCircle}
          title="We couldn't find that piece"
          body="It may have sold or the link may be out of date."
          action={<Button onClick={() => navigate(ROUTES.shop)}>Back to shop</Button>}
        />
      </Container>
    );
  }

  const artist = findArtist(artwork.artistId)!;
  const reviews = reviewsFor(artwork.id);
  const related = ARTWORKS.filter((a) => a.id !== artwork.id && (a.category === artwork.category || a.style === artwork.style)).slice(0, 4);
  const fbt = ARTWORKS.filter((a) => a.id !== artwork.id && a.artistId === artwork.artistId).slice(0, 3);

  return (
    <Container className="pt-6">
      <Breadcrumbs
        items={[
          { label: "Home", to: ROUTES.home },
          { label: "Shop", to: ROUTES.shop },
          { label: categoryLabel(artwork.category) ?? "Shop", to: `${ROUTES.shop}?category=${artwork.category}` },
          { label: artwork.title },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 mt-6">
        <Gallery artwork={artwork} />
        <BuyBox artwork={artwork} artist={artist} />
      </div>

      <div className="mt-14">
        <ProductTabs artwork={artwork} artist={artist} reviews={reviews} />
      </div>

      {fbt.length > 0 && (
        <section className="mt-10">
          <SectionHeader eyebrow={artwork.artistName} title="Frequently bought together" />
          <ArtworkGrid artworks={fbt} />
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-14 mb-16">
          <SectionHeader eyebrow="You may also like" title="Similar artworks" />
          <ArtworkGrid artworks={related} />
        </section>
      )}
    </Container>
  );
}
