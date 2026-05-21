import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { ArrowLeft, LockKeyhole, PackageCheck, PhoneCall, ShieldCheck, Truck } from "lucide-react";
import { CheckoutForm } from "@/components/CheckoutForm";
import { product } from "@/lib/product";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen py-8 sm:py-12">
      <div className="section-shell max-w-5xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-rosegold-700">
          <ArrowLeft size={18} />
          Back to product
        </Link>
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="relative self-start overflow-hidden rounded-[2rem] bg-ink p-5 text-white shadow-soft lg:sticky lg:top-6 lg:p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="relative h-16 w-44 rounded-3xl bg-white/95 p-3">
                <Image
                  src="/images/products/Final_Logo_plp.png"
                  alt={`${product.brandName} logo`}
                  fill
                  priority
                  sizes="176px"
                  className="object-contain p-2"
                />
              </div>
              <div className="rounded-full bg-rosegold-600 px-3 py-1.5 text-xs font-black uppercase text-white">
                COD
              </div>
            </div>

            <h1 className="mt-6 font-serif text-3xl font-black leading-tight sm:text-4xl">Secure Cash On Delivery checkout</h1>
            <p className="mt-4 leading-7 text-white/75">
              Fill in your details and place your order. Our sales representative will call you soon to confirm delivery.
            </p>

            <div className="mt-6 grid gap-3">
              {[
                { icon: PackageCheck, title: "Place your order", text: "Submit your name, phone, email, and exact location." },
                { icon: PhoneCall, title: "We confirm by call", text: "Our team contacts you before dispatching the order." },
                { icon: Truck, title: "Pay on delivery", text: "Receive your combo first, then pay in cash." }
              ].map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="flex gap-3 rounded-3xl border border-white/10 bg-white/[0.07] p-3.5">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-rosegold-500/20 text-rosegold-100">
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="font-bold">{step.title}</p>
                      <p className="mt-1 text-sm leading-6 text-white/65">{step.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 space-y-3">
              {[
                { icon: ShieldCheck, text: "Your private details stay server-side" },
                { icon: PackageCheck, text: "We call before confirming delivery" },
                { icon: LockKeyhole, text: "No online payment required" }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.text}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-base font-semibold text-white shadow-sm"
                  >
                    <Icon size={20} className="shrink-0 text-rosegold-200" />
                    {item.text}
                  </div>
                );
              })}
            </div>
          </aside>
          <Suspense fallback={<div className="rounded-[2rem] bg-white p-8 shadow-soft">Loading checkout...</div>}>
            <CheckoutForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
