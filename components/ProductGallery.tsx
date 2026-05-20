"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import type { ProductImage } from "@/lib/product";

export function ProductGallery({ images }: { images: ProductImage[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  function move(direction: -1 | 1) {
    setActiveIndex((index) => (index + direction + images.length) % images.length);
  }

  return (
    <div className="space-y-4">
      <div className="relative mx-auto aspect-[4/3] max-h-[520px] w-full overflow-hidden rounded-[2rem] border border-rosegold-100 bg-white shadow-soft">
        <Image
          src={activeImage.src}
          alt={activeImage.alt}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-contain p-5"
        />
        <div className="absolute inset-x-4 top-1/2 flex -translate-y-1/2 justify-between">
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full bg-white/90 text-rosegold-800 shadow-lg"
            aria-label="Previous product image"
            onClick={() => move(-1)}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full bg-white/90 text-rosegold-800 shadow-lg"
            aria-label="Next product image"
            onClick={() => move(1)}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            aria-label={`View product image ${index + 1}`}
            className={`relative aspect-square overflow-hidden rounded-2xl border bg-white transition ${
              activeIndex === index ? "border-rosegold-500 ring-4 ring-rosegold-100" : "border-rosegold-100"
            }`}
            onClick={() => setActiveIndex(index)}
          >
            <Image src={image.src} alt={image.alt} fill sizes="120px" className="object-contain p-1.5" />
          </button>
        ))}
      </div>
    </div>
  );
}
