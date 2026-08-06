import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MessageCircle, User } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { ArtworkGrid } from "@/components/common/ArtworkCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { findArtist } from "@/data/artists.data";
import { ARTWORKS } from "@/data/artworks.data";
import { ROUTES } from "@/constants/routes";
import { useUI } from "@/hooks/useUI";

export function ArtistDetailPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { openContactArtist } = useUI();
  const artist = findArtist(id);

  if (!artist) {
    return (
      <Container className="pt-10">
        <EmptyState icon={User} title="Artist not found" body="" action={<Button onClick={() => navigate(ROUTES.artists)}>Back to artists</Button>} />
      </Container>
    );
  }

  const works = ARTWORKS.filter((a) => a.artistId === artist.id);

  return (
    <Container className="pt-7 pb-16">
      <Breadcrumbs items={[{ label: "Home", to: ROUTES.home }, { label: "Artists", to: ROUTES.artists }, { label: artist.name }]} />
      <Card className="p-8 flex gap-6 items-center my-5 flex-wrap">
        <img src={`https://picsum.photos/seed/${artist.seed}/200/200`} alt="" className="w-24 h-24 rounded-full object-cover shrink-0" />
        <div className="flex-1 min-w-[220px]">
          <h1 className="heading-serif text-[30px] mb-1.5">{artist.name}</h1>
          <div className="text-[13.5px] text-ink-soft mb-2.5">
            {artist.location} · {artist.specialty} · {works.length} works
          </div>
          <p className="text-sm text-ink-soft leading-relaxed max-w-[540px]">{artist.bio}</p>
        </div>
        <Button onClick={() => openContactArtist(artist)}>
          <MessageCircle size={15} /> Contact
        </Button>
      </Card>
      <SectionHeader title="Available works" />
      {works.length === 0 ? <p className="text-ink-soft">No current works — check back soon.</p> : <ArtworkGrid artworks={works} />}
    </Container>
  );
}
