"use client";

import { Play } from "lucide-react";
import { useRef, useState } from "react";

type Reel = {
  title: string;
  src: string;
};

function PhoneReel({ reel }: { reel: Reel }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [started, setStarted] = useState(false);

  function handlePlay() {
    setStarted(true);
    void videoRef.current?.play();
  }

  return (
    <div className="mx-auto w-full max-w-[280px] rounded-[2.2rem] border-[10px] border-ink bg-ink p-2 shadow-soft">
      <div className="relative aspect-[9/16] overflow-hidden rounded-[1.55rem] bg-black">
        <video
          ref={videoRef}
          src={reel.src}
          controls={started}
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
        {!started && (
          <button
            type="button"
            onClick={handlePlay}
            className="absolute inset-0 grid place-items-center bg-black/20 text-white"
            aria-label={`Play ${reel.title}`}
          >
            <span className="grid h-16 w-16 place-items-center rounded-full bg-white/92 text-rosegold-700 shadow-lg">
              <Play size={28} fill="currentColor" />
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

export function ReelsSection({ reels }: { reels: Reel[] }) {
  if (!reels.length) {
    return null;
  }

  return (
    <section className="py-16 sm:py-20" id="reels">
      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-rosegold-600">Style in motion</p>
          <h2 className="mt-3 font-serif text-4xl font-bold text-ink sm:text-5xl">See the combos up close</h2>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {reels.slice(0, 3).map((reel) => (
            <PhoneReel key={reel.src} reel={reel} />
          ))}
        </div>
      </div>
    </section>
  );
}
