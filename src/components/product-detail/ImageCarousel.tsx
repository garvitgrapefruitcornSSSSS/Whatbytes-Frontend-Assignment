"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

export default function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const count = images.length;
  const go = (delta: number) => setIndex((i) => (i + delta + count) % count);

  return (
    <div
      className="flex flex-col gap-3"
      role="region"
      aria-roledescription="carousel"
      aria-label={`${alt} images`}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
    >
      <div className="group relative aspect-square overflow-hidden rounded-lg bg-white">
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={`${alt} – image ${i + 1} of ${count}`}
            fill
            loading={i === 0 ? "eager" : "lazy"}
            sizes="(min-width: 1024px) 560px, 100vw"
            className={`object-cover transition-opacity duration-300 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={i !== index}
          />
        ))}

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="absolute top-1/2 left-3 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy shadow transition hover:bg-white sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next image"
              className="absolute top-1/2 right-3 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy shadow transition hover:bg-white sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
            >
              <ChevronRight className="size-5" />
            </button>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {images.map((src, i) => (
                <span
                  key={src}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-5 bg-white" : "w-1.5 bg-white/60"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === index}
              className={`relative aspect-square overflow-hidden rounded-md bg-white ring-2 transition ${
                i === index ? "ring-brand-600" : "ring-transparent hover:ring-brand-500/40"
              }`}
            >
              <Image src={src} alt="" fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
