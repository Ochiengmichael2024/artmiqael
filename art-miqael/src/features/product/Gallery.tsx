import React, { useState, useEffect } from "react";
import type { Artwork } from "@/types";
import { cx } from "@/utils/cx";

export function Gallery({ artwork }: { artwork: Artwork }) {
  const images = [artwork.img, artwork.imgAlt, artwork.imgDetail];
  const [active, setActive] = useState(0);

  useEffect(() => setActive(0), [artwork.id]);

  return (
    <div>
      <div className="rounded-lg overflow-hidden bg-line aspect-[4/5] mb-3 cursor-zoom-in">
        <img
          src={images[active]}
          alt={artwork.title}
          className="w-full h-full object-cover transition-transform duration-300"
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - r.left) / r.width) * 100;
            const y = ((e.clientY - r.top) / r.height) * 100;
            e.currentTarget.style.transformOrigin = `${x}% ${y}%`;
            e.currentTarget.style.transform = "scale(1.6)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        />
      </div>
      <div className="flex gap-2.5">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={cx("w-[68px] h-[68px] rounded-[10px] overflow-hidden p-0 bg-line", i === active ? "border-2 border-ink" : "border border-line")}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
