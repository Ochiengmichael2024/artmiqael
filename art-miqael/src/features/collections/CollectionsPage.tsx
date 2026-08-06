import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArtworkGrid } from "@/components/common/ArtworkCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ARTWORKS } from "@/data/artworks.data";
import { ROUTES } from "@/constants/routes";

const COLLECTIONS = [
  { title: "New artists", desc: "Fresh voices added to the marketplace this season.", items: ARTWORKS.slice(-6) },
  { title: "Abstract art", desc: "Colour and gesture over recognisable subject.", items: ARTWORKS.filter((a) => a.style === "Abstract").slice(0, 6) },
  { title: "Art under $500", desc: "Considered pieces that don't require a gallery budget.", items: ARTWORKS.filter((a) => a.price < 500).slice(0, 6) },
  { title: "Large scale", desc: "Statement pieces built to anchor a room.", items: ARTWORKS.filter((a) => a.size === "statement").slice(0, 6) },
];

export function CollectionsPage() {
  return (
    <Container className="pt-7 pb-16">
      <Breadcrumbs items={[{ label: "Home", to: ROUTES.home }, { label: "Collections" }]} />
      <SectionHeader eyebrow="Curated edits" title="Collections" sub="Ways into the catalogue, built around mood, scale and budget." />
      {COLLECTIONS.map((c) => (
        <section key={c.title} className="mb-13">
          <SectionHeader
            title={c.title}
            sub={c.desc}
            action={
              <Link to={ROUTES.shop} className="underline-link">
                View all <ArrowRight size={12} />
              </Link>
            }
          />
          <ArtworkGrid artworks={c.items} />
        </section>
      ))}
    </Container>
  );
}
