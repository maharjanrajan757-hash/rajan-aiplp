import { formatMoney, product } from "@/lib/product";

export function OfferPreviewVideos() {
  const previews = product.offers.map((offer, index) => ({
    offer,
    reel: product.reels[index % product.reels.length]
  }));

  return (
    <div className="rounded-[2rem] border border-rosegold-100 bg-rosegold-50 p-4 shadow-sm">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-bold uppercase text-rosegold-700">Combo previews</p>
          <h3 className="mt-1 text-2xl font-black text-ink">See each offer before ordering</h3>
        </div>
        <p className="text-sm font-semibold text-stone-600">Tap a video to play</p>
      </div>

      <div className="mt-5 grid gap-3">
        {previews.map(({ offer, reel }) => (
          <article key={offer.id} className="grid grid-cols-[118px_1fr] overflow-hidden rounded-3xl border border-rosegold-100 bg-white shadow-sm sm:grid-cols-[140px_1fr]">
            <div className="h-full min-h-[150px] bg-ink">
              <video
                src={reel.src}
                controls
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0 p-4">
              <div className="flex min-w-0 items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-black leading-tight text-ink">{offer.name}</p>
                  {offer.badge && <p className="mt-1 text-xs font-bold text-rosegold-700">{offer.badge}</p>}
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-xs text-stone-500 line-through">{formatMoney(offer.regularPrice)}</p>
                  <p className="whitespace-nowrap text-lg font-black text-rosegold-700">{formatMoney(offer.price)}</p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-stone-600">{offer.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
