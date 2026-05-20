import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Gift, Heart, PackageCheck, PhoneCall, Sparkles, Truck } from "lucide-react";
import { ProductGallery } from "@/components/ProductGallery";
import { QuantityOrderBox } from "@/components/QuantityOrderBox";
import { OfferPreviewVideos } from "@/components/OfferPreviewVideos";
import { checkoutUrl, formatMoney, product } from "@/lib/product";

const iconMap = [Sparkles, Heart, Gift, PackageCheck, Truck, PhoneCall];

export default function HomePage() {
  return (
    <main>
      <header className="section-shell py-5">
        <nav className="flex items-center justify-between">
          <Link href="/" className="relative block h-20 w-52 sm:h-24 sm:w-64 lg:h-28 lg:w-72" aria-label={`${product.brandName} home`}>
            <Image
              src="/images/products/Final_Logo_plp.png"
              alt={`${product.brandName} logo`}
              fill
              priority
              sizes="176px"
              className="object-contain object-left"
            />
          </Link>
          <Link href={checkoutUrl()} className="btn-primary px-5 py-2.5">
            Order Now
          </Link>
        </nav>
      </header>

      <section className="section-shell pb-16 pt-6 sm:pb-20 lg:pt-12">
        <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <p className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-rosegold-700 shadow-sm">
              Cash On Delivery available across Nepal
            </p>
            <h1 className="mt-6 font-serif text-5xl font-black leading-[1.02] text-ink sm:text-6xl lg:text-7xl">
              {product.headline}
            </h1>
            <p className="mt-5 max-w-2xl text-xl font-semibold text-rosegold-800">{product.subheadline}</p>
            <p className="mt-4 max-w-2xl text-base leading-8 text-stone-700">{product.shortDescription}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={checkoutUrl()} className="btn-primary">
                <Sparkles size={18} />
                Purchase Now
              </Link>
              <Link href="#showcase" className="btn-secondary">
                View Combo
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {product.trustItems.map((item) => (
                <div key={item} className="rounded-2xl border border-rosegold-100 bg-white px-4 py-3 text-sm font-bold text-ink shadow-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="relative mx-auto aspect-square max-h-[520px] max-w-[520px] overflow-hidden rounded-[2.5rem] border border-rosegold-100 bg-white shadow-soft">
              <Image
                src={product.heroImage.src}
                alt={product.heroImage.alt}
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-contain p-5"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="showcase" className="bg-white py-16 sm:py-20">
        <div className="section-shell">
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div className="space-y-6 lg:sticky lg:top-6">
              <ProductGallery images={product.images} />
              <OfferPreviewVideos />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-rosegold-600">Multiple combo offers</p>
              <h2 className="mt-3 font-serif text-4xl font-black text-ink sm:text-5xl">{product.name}</h2>
              <p className="mt-4 text-lg leading-8 text-stone-700">
                Create multiple stylish looks with one curated combo set. Perfect for everyday styling, gifting, parties, and quick confidence-boosting outfit upgrades.
              </p>
              <div className="mt-5 rounded-3xl border border-rosegold-100 bg-rosegold-50 p-4">
                <p className="text-sm font-bold uppercase text-rosegold-700">Price options</p>
                <p className="mt-1 text-sm leading-6 text-stone-700">
                  Budget from {formatMoney(799)}, Standard only {formatMoney(product.offerPrice)}, and Premium from {formatMoney(2999)}. Standard combo regular price {formatMoney(product.regularPrice)} - save 40% today.
                </p>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {product.benefits.slice(0, 6).map((benefit) => (
                  <div key={benefit} className="flex gap-3 rounded-2xl bg-rosegold-50 p-4">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-rosegold-600" size={20} />
                    <p className="text-sm font-semibold text-ink">{benefit}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <QuantityOrderBox />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="section-shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-rosegold-600">Why buy this combo</p>
            <h2 className="mt-3 font-serif text-4xl font-black text-ink sm:text-5xl">Style more outfits without buying more outfits</h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {product.benefits.slice(0, 9).map((benefit, index) => {
              const Icon = iconMap[index % iconMap.length];
              return (
                <div
                  key={benefit}
                  className="group cursor-pointer rounded-[1.5rem] border border-rosegold-100 bg-white p-6 shadow-sm transition duration-300 ease-out hover:-translate-y-2 hover:border-rosegold-300 hover:shadow-glow"
                >
                  <Icon className="text-rosegold-600" size={26} />
                  <p className="mt-4 text-lg font-bold text-ink">{benefit}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <Link href={checkoutUrl()} className="btn-primary">
              Buy Standard Combo - {formatMoney(product.offerPrice)}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="section-shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-rosegold-600">Customer love</p>
            <h2 className="mt-2 font-serif text-3xl font-black text-ink sm:text-4xl">What customers are saying</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {product.testimonials.slice(0, 3).map((testimonial) => (
              <article
                key={testimonial.name}
                className="rounded-[1.5rem] border border-rosegold-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-rosegold-300 hover:shadow-glow"
              >
                <p className="text-sm font-black text-rosegold-600">5.0/5</p>
                <p className="mt-3 text-sm leading-6 text-stone-700">"{testimonial.quote}"</p>
                <p className="mt-4 font-bold text-ink">- {testimonial.name}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="section-shell max-w-3xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-rosegold-600">Questions</p>
            <h2 className="mt-2 font-serif text-3xl font-black text-ink sm:text-4xl">Frequently asked questions</h2>
          </div>
          <div className="mt-8 space-y-2.5">
            {product.faqs.map((faq) => (
              <details key={faq.question} className="group rounded-2xl border border-rosegold-100 bg-rosegold-50 px-4 py-3 shadow-sm">
                <summary className="cursor-pointer list-none text-base font-bold text-ink marker:hidden">
                  {faq.question}
                </summary>
                <p className="mt-2 text-sm leading-6 text-stone-700">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-16 sm:py-20">
        <div className="rounded-[2.5rem] bg-ink px-6 py-12 text-center text-white shadow-soft sm:px-10">
          <p className="font-bold uppercase tracking-[0.2em] text-rosegold-200">Limited stock available</p>
          <h2 className="mx-auto mt-4 max-w-3xl font-serif text-4xl font-black sm:text-5xl">
            Grab your StyleNest combo before today&apos;s offer ends
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/78">
            Order now with Cash On Delivery. Our sales representative will call you soon to confirm your order.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={checkoutUrl()} className="btn-primary">
              Purchase Now
            </Link>
            <Link href={checkoutUrl()} className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-ink">
              Order Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
