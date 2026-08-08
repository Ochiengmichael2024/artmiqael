import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArtworkGrid } from "@/components/common/ArtworkCard";
import { ARTWORKS } from "@/data/artworks.data";
import { ROUTES } from "@/constants/routes";
import { Hero } from "./Hero";
import { WayInSection } from "./WayInSection";
import { CommissionCta } from "./CommissionCta";

export function HomePage() {
  const featured = ARTWORKS.slice(0, 4);
  const editorsPicks = ARTWORKS.filter((a) => a.rating >= 4.8).slice(0, 4);

  return (
    <div className="animate-fade-up">
      <Container className="pt-10">
        <Hero />
      </Container>

      <Container className="mt-14">
        <SectionHeader
          eyebrow="Curated for you"
          title="Featured works"
          action={
            <Link to={ROUTES.shop} className="underline-link">
              View all <ArrowRight size={12} />
            </Link>
          }
        />
        <ArtworkGrid artworks={featured} />
      </Container>

      <Container className="mt-16">
        <WayInSection />
      </Container>

      <Container className="mt-16">
        <SectionHeader eyebrow="Highly rated" title="Editors' picks" sub="The pieces our collectors return to review, again and again." />
        <ArtworkGrid artworks={editorsPicks} />
      </Container>

      <Container className="my-20">
        <CommissionCta />
      </Container>
    </div>
  );
}
