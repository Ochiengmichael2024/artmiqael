import type { Artist } from "@/types";

export const ARTISTS: Artist[] = [
  { id: "nina-larsson", name: "Nina Larsson", location: "Gothenburg, SE", specialty: "Landscape & nature", bio: "Nina works between the Swedish coast and her studio in Gothenburg, building quiet, atmospheric scenes in oil and archival print.", works: 4, seed: "artist-nina" },
  { id: "dayo-femi", name: "Dayo Femi", location: "Lagos, NG", specialty: "Figurative drawing", bio: "Dayo's charcoal and archival works examine memory and portraiture, often built up from layered, unfinished gestures.", works: 3, seed: "artist-dayo" },
  { id: "sonia-leal", name: "Sonia Leal", location: "Porto, PT", specialty: "Abstract & oil", bio: "Sonia trained as a printmaker before moving into large-scale oil painting, carrying the same ink-and-water instinct into canvas.", works: 3, seed: "artist-sonia" },
  { id: "akello-moyo", name: "Akello Moyo", location: "Nairobi, KE", specialty: "Abstract & prints", bio: "Akello's practice moves fluidly between ink, print and digital study, chasing texture over subject.", works: 3, seed: "artist-akello" },
  { id: "owen-biko", name: "Owen Biko", location: "Cape Town, ZA", specialty: "Landscape & murals", bio: "Owen's work scales from intimate paper studies to full architectural murals, always rooted in horizon lines and weather.", works: 2, seed: "artist-owen" },
  { id: "ola-iwobi", name: "Ola Iwobi", location: "Accra, GH", specialty: "Minimal & abstract", bio: "Ola pares composition down to essential shape and colour relationships, working mostly in acrylic on canvas.", works: 2, seed: "artist-ola" },
  { id: "sam-kalu", name: "Sam Kalu", location: "Abuja, NG", specialty: "Figurative oil", bio: "Sam paints domestic interiors and portraits with a restrained, almost monochrome palette.", works: 2, seed: "artist-sam" },
  { id: "mira-adisa", name: "Mira Adisa", location: "Mombasa, KE", specialty: "Botanical & prints", bio: "Mira documents plant life in fine detail, translating field sketches into limited archival editions.", works: 2, seed: "artist-mira" },
  { id: "priya-nandan", name: "Priya Nandan", location: "Mumbai, IN", specialty: "Landscape oil", bio: "Priya's coastal paintings are built from memory rather than photographs, favouring mood over accuracy.", works: 2, seed: "artist-priya" },
  { id: "theo-marchetti", name: "Theo Marchetti", location: "Turin, IT", specialty: "Minimal figurative", bio: "Theo works slowly, in gouache and oil, returning to the same handful of quiet domestic subjects.", works: 2, seed: "artist-theo" },
];

export function findArtist(id: string): Artist | undefined {
  return ARTISTS.find((a) => a.id === id);
}
