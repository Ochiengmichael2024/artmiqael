import React from "react";
import { Truck, PackageCheck, ShieldCheck } from "lucide-react";
import type { Artwork, Artist, Review } from "@/types";
import { Tabs } from "@/components/ui/Tabs";
import { StarRating } from "@/components/ui/StarRating";
import { IconBox } from "@/components/ui/IconBox";

export function ProductTabs({ artwork, artist, reviews }: { artwork: Artwork; artist: Artist; reviews: Review[] }) {
  return (
    <Tabs
      defaultKey="description"
      items={[
        {
          key: "description",
          label: "Description",
          content: (
            <div>
              <p className="text-[14.5px] leading-[1.8] text-ink-soft mb-4">{artwork.description}</p>
              <p className="text-[14.5px] leading-[1.8] text-ink-soft">{artist.bio}</p>
            </div>
          ),
        },
        {
          key: "shipping",
          label: "Shipping & materials",
          content: (
            <div className="grid gap-4">
              <div className="flex gap-3">
                <IconBox size={36} icon={<Truck size={17} />} />
                <div>
                  <strong className="text-sm">Dimensions &amp; materials</strong>
                  <p className="text-[13.5px] text-ink-soft mt-1">
                    {artwork.dims}, {artwork.medium}. Ships rolled or stretched depending on size — full packaging details are confirmed at checkout.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <IconBox size={36} icon={<PackageCheck size={17} />} />
                <div>
                  <strong className="text-sm">Availability</strong>
                  <p className="text-[13.5px] text-ink-soft mt-1">
                    {artwork.availability === "ready" ? "In stock and ready to ship within 2 business days." : "Made to order — allow 3–5 weeks before dispatch."}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <IconBox size={36} icon={<ShieldCheck size={17} />} />
                <div>
                  <strong className="text-sm">Authenticity</strong>
                  <p className="text-[13.5px] text-ink-soft mt-1">Ships with a signed certificate of authenticity from {artist.name}.</p>
                </div>
              </div>
            </div>
          ),
        },
        {
          key: "reviews",
          label: `Reviews (${reviews.length})`,
          content: (
            <div className="grid gap-4">
              {reviews.map((r, i) => (
                <div key={i} className={i < reviews.length - 1 ? "pb-4 border-b border-line" : ""}>
                  <div className="flex justify-between mb-1.5">
                    <strong className="text-[13.5px]">{r.name}</strong>
                    <StarRating rating={5} size={12} />
                  </div>
                  <p className="text-[13.5px] text-ink-soft leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>
          ),
        },
      ]}
    />
  );
}
