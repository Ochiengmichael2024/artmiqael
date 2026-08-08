import { ARTISTS, findArtist } from "@/data/artists.data";
import type { Artist } from "@/types";

function resolveAfter<T>(value: T, ms = 0): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export const artistService = {
  async list(): Promise<Artist[]> {
    return resolveAfter(ARTISTS);
  },
  async getById(id: string): Promise<Artist | undefined> {
    return resolveAfter(findArtist(id));
  },
};
