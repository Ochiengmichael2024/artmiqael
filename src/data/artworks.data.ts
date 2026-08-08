import type { Artwork, ArtworkOrientation, ArtworkSize, ArtworkStyle, Availability, CategorySlug } from "@/types";
import { findArtist } from "@/data/artists.data";

const STYLE_PHRASE: Record<ArtworkStyle, string> = {
  Abstract: "leans into gesture and colour relationships over recognisable subject",
  Figurative: "studies the human form with a restrained, considered hand",
  Minimal: "reduces the scene to essential shape, tone and negative space",
  Nature: "is built from long observation of light, weather and landscape",
};

type RawArtwork = [
  title: string,
  artistId: string,
  category: CategorySlug,
  style: ArtworkStyle,
  orientation: ArtworkOrientation,
  price: number,
  size: ArtworkSize,
  availability: Availability,
  rating: number,
  reviewCount: number,
  edition: string,
  dims: string,
  medium: string,
  seed: string,
];

const RAW_ARTWORKS: RawArtwork[] = [
  ["After the Rain", "nina-larsson", "original-paintings", "Nature", "Landscape", 740, "statement", "ready", 4.9, 12, "Original", "80 × 120 cm", "Oil on canvas", "after-the-rain"],
  ["The Long Sunday", "dayo-femi", "limited-editions", "Figurative", "Portrait", 610, "statement", "ready", 4.8, 12, "Limited edition — A1", "70 × 100 cm", "Charcoal on paper", "the-long-sunday"],
  ["Near the Coast", "sonia-leal", "limited-editions", "Abstract", "Portrait", 560, "medium", "ready", 4.7, 12, "Limited edition — A2", "60 × 90 cm", "Ink on paper", "near-the-coast"],
  ["Viridian Light", "akello-moyo", "limited-editions", "Abstract", "Portrait", 420, "medium", "made", 4.9, 12, "Limited edition — A2", "60 × 80 cm", "Archival print", "viridian-light"],
  ["Beneath the Bloom", "owen-biko", "limited-editions", "Nature", "Landscape", 390, "medium", "ready", 4.8, 12, "A1 edition", "50 × 70 cm", "Giclée print", "beneath-the-bloom"],
  ["Untitled Composition", "ola-iwobi", "original-paintings", "Abstract", "Square", 350, "medium", "ready", 4.6, 9, "Original", "50 × 70 cm", "Acrylic on canvas", "untitled-composition"],
  ["Rooms Within", "sam-kalu", "original-paintings", "Figurative", "Square", 300, "medium", "made", 4.7, 14, "Original", "50 × 50 cm", "Oil on board", "rooms-within"],
  ["Field Notes No. 4", "mira-adisa", "canvas-prints", "Minimal", "Portrait", 285, "small", "ready", 4.9, 22, "A2 edition", "40 × 55 cm", "Canvas print", "field-notes-4"],
  ["Low Tide", "priya-nandan", "original-paintings", "Nature", "Landscape", 890, "statement", "ready", 4.8, 8, "Original", "90 × 130 cm", "Oil on canvas", "low-tide"],
  ["Quiet Interior", "theo-marchetti", "original-paintings", "Minimal", "Square", 460, "medium", "made", 4.5, 6, "Original", "60 × 60 cm", "Gouache on paper", "quiet-interior"],
  ["Marble & Ash", "nina-larsson", "limited-editions", "Abstract", "Portrait", 275, "small", "ready", 4.6, 11, "A3 edition", "35 × 50 cm", "Archival print", "marble-ash"],
  ["Coastal Fog", "dayo-femi", "canvas-prints", "Nature", "Landscape", 240, "small", "ready", 4.4, 5, "Canvas print", "40 × 60 cm", "Canvas print", "coastal-fog"],
  ["Figure in Grey", "sonia-leal", "original-paintings", "Figurative", "Portrait", 980, "statement", "made", 4.9, 10, "Original", "100 × 140 cm", "Oil on canvas", "figure-in-grey"],
  ["Wildflower Study", "akello-moyo", "canvas-prints", "Nature", "Square", 195, "small", "ready", 4.7, 18, "Canvas print", "40 × 40 cm", "Canvas print", "wildflower-study"],
  ["Monolith", "owen-biko", "murals", "Abstract", "Landscape", 1450, "statement", "made", 5.0, 3, "Custom mural", "200 × 300 cm", "Mural, acrylic", "monolith"],
  ["Soft Geometry", "ola-iwobi", "original-paintings", "Minimal", "Square", 520, "medium", "ready", 4.6, 7, "Original", "60 × 60 cm", "Acrylic on canvas", "soft-geometry"],
  ["Portrait of a Stranger", "sam-kalu", "original-paintings", "Figurative", "Portrait", 720, "statement", "made", 4.8, 9, "Original", "80 × 110 cm", "Oil on canvas", "portrait-of-a-stranger"],
  ["Northern Light", "mira-adisa", "limited-editions", "Nature", "Landscape", 480, "medium", "ready", 4.7, 13, "A1 edition", "70 × 90 cm", "Giclée print", "northern-light"],
  ["Static Bloom", "priya-nandan", "limited-editions", "Abstract", "Square", 330, "medium", "ready", 4.5, 6, "A2 edition", "50 × 50 cm", "Archival print", "static-bloom"],
  ["The Long Wait", "theo-marchetti", "original-paintings", "Figurative", "Portrait", 640, "statement", "made", 4.6, 4, "Original", "75 × 100 cm", "Oil on canvas", "the-long-wait"],
  ["Terrace Light", "nina-larsson", "canvas-prints", "Minimal", "Landscape", 210, "small", "ready", 4.8, 16, "Canvas print", "40 × 55 cm", "Canvas print", "terrace-light"],
  ["Ash & Ember", "dayo-femi", "limited-editions", "Abstract", "Portrait", 505, "medium", "ready", 4.9, 12, "A1 edition", "60 × 85 cm", "Archival print", "ash-ember"],
  ["Garden at Dusk", "sonia-leal", "original-paintings", "Nature", "Landscape", 690, "statement", "made", 4.7, 8, "Original", "80 × 120 cm", "Oil on canvas", "garden-at-dusk"],
  ["Study in Grey No. 2", "akello-moyo", "canvas-prints", "Minimal", "Square", 165, "small", "ready", 4.5, 20, "Canvas print", "35 × 35 cm", "Canvas print", "study-grey-2"],
];

export const ARTWORKS: Artwork[] = RAW_ARTWORKS.map((row, i) => {
  const [title, artistId, category, style, orientation, price, size, availability, rating, reviewCount, edition, dims, medium, seed] = row;
  const artist = findArtist(artistId)!;
  return {
    id: `a${i + 1}`,
    title,
    artistId,
    artistName: artist.name,
    category,
    style,
    orientation,
    price,
    size,
    availability,
    rating,
    reviewCount,
    edition,
    dims,
    medium,
    seed,
    img: `https://picsum.photos/seed/${seed}/900/1100`,
    imgAlt: `https://picsum.photos/seed/${seed}-alt/900/1100`,
    imgDetail: `https://picsum.photos/seed/${seed}-detail/900/1100`,
    description: `${title} ${STYLE_PHRASE[style]}. Rendered in ${medium.toLowerCase()}, it carries ${artist.name.split(" ")[0]}'s ongoing interest in ${style.toLowerCase()} composition, sized for ${size === "statement" ? "a wall that can hold real presence" : size === "small" ? "an intimate, close-up hang" : "a considered spot in any room"}.`,
    tags: [style.toLowerCase(), orientation.toLowerCase(), category],
  };
});

export function findArtwork(id: string): Artwork | undefined {
  return ARTWORKS.find((a) => a.id === id);
}

export function priceBandKeyOf(price: number, bands: { key: string; test: (p: number) => boolean }[]): string | undefined {
  return bands.find((b) => b.test(price))?.key;
}
