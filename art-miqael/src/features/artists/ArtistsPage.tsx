import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ARTISTS } from "@/data/artists.data";
import { ROUTES } from "@/constants/routes";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export function ArtistsPage() {
  return (
    <Container className="pt-7 pb-16">
      <Breadcrumbs items={[{ label: "Home", to: ROUTES.home }, { label: "Artists" }]} />
      <SectionHeader
        eyebrow="Meet the makers"
        title="Artists shaping the now."
        sub="Follow studios, discover new voices, and collect directly from remarkable practices around the world."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5.5">
        {ARTISTS.map((a) => (
          <Link key={a.id} to={ROUTES.artistDetail(a.id)} className="card p-5.5 block border border-line">
            <img src={`https://picsum.photos/seed/${a.seed}/120/120`} alt="" className="w-14 h-14 rounded-full object-cover mb-3.5" />
            <div className="font-serif text-[19px] mb-1">{a.name}</div>
            <div className="text-[12.5px] text-ink-soft mb-2.5">
              {a.location} · {a.specialty}
            </div>
            <span className="underline-link">
              View works <ArrowRight size={12} />
            </span>
          </Link>
        ))}
      </div>
    </Container>
  );
}
