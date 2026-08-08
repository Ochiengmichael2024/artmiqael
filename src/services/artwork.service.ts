import { ARTWORKS, findArtwork } from "@/data/artworks.data";
import { reviewsFor } from "@/data/reviews.data";
import type { Artwork, Review, ShopFilters } from "@/types";
import { PRICE_BANDS } from "@/constants/filters";
import type { SortKey } from "@/constants/filters";

/** Simulates network latency so components exercise real loading states. */
function resolveAfter<T>(value: T, ms = 0): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export const artworkService = {
  async list(): Promise<Artwork[]> {
    return resolveAfter(ARTWORKS);
  },

  async getById(id: string): Promise<Artwork | undefined> {
    return resolveAfter(findArtwork(id));
  },

  async search(query: string): Promise<Artwork[]> {
    const q = query.trim().toLowerCase();
    if (!q) return resolveAfter([]);
    return resolveAfter(
      ARTWORKS.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.artistName.toLowerCase().includes(q) ||
          a.style.toLowerCase().includes(q) ||
          a.category.includes(q) ||
          a.medium.toLowerCase().includes(q)
      )
    );
  },

  async filterAndSort(filters: ShopFilters, sort: SortKey, search: string): Promise<Artwork[]> {
    let list = ARTWORKS.slice();

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.artistName.toLowerCase().includes(q) ||
          a.style.toLowerCase().includes(q) ||
          a.category.includes(q) ||
          a.medium.toLowerCase().includes(q)
      );
    }
    if (filters.category.length) list = list.filter((a) => filters.category.includes(a.category));
    if (filters.style.length) list = list.filter((a) => filters.style.includes(a.style));
    if (filters.orientation.length) list = list.filter((a) => filters.orientation.includes(a.orientation));
    if (filters.size.length) list = list.filter((a) => filters.size.includes(a.size));
    if (filters.price.length) {
      list = list.filter((a) => {
        const band = PRICE_BANDS.find((b) => b.test(a.price));
        return band ? filters.price.includes(band.key) : false;
      });
    }
    if (filters.availability.length) list = list.filter((a) => filters.availability.includes(a.availability));

    switch (sort) {
      case "newest":
        list = list.slice().reverse();
        break;
      case "price-asc":
        list = list.slice().sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = list.slice().sort((a, b) => b.price - a.price);
        break;
      case "popularity":
        list = list.slice().sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
        break;
      default:
        break;
    }
    return resolveAfter(list);
  },

  async related(artwork: Artwork, limit = 4): Promise<Artwork[]> {
    return resolveAfter(
      ARTWORKS.filter((a) => a.id !== artwork.id && (a.category === artwork.category || a.style === artwork.style)).slice(0, limit)
    );
  },

  async byArtist(artistId: string, excludeId?: string): Promise<Artwork[]> {
    return resolveAfter(ARTWORKS.filter((a) => a.artistId === artistId && a.id !== excludeId));
  },

  async reviews(artworkId: string): Promise<Review[]> {
    return resolveAfter(reviewsFor(artworkId));
  },
};
