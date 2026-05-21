import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { ArrowLeft, CheckCircle2, Headphones, LockKeyhole, PackageCheck, PhoneCall, ShieldCheck, Truck } from "lucide-react";
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
        <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="relative overflow-hidden rounded-[2rem] bg-ink p-6 text-white shadow-soft lg:p-8">
            <div className="relative h-20 w-52 rounded-3xl bg-white/95 p-3">
              <Image
                src="/images/products/Final_Logo_plp.png"
                alt={`${product.brandName} logo`}
                fill
                priority
                sizes="208px"
                className="object-contain p-2"
              />
            </div>
            <h1 className="mt-8 font-serif text-4xl font-black leading-tight">Secure Cash On Delivery checkout</h1>
            <p className="mt-4 leading-7 text-white/75">
              Fill in your details and place your order. Our sales representative will call you soon to confirm delivery.
            </p>

            <div className="mt-8 grid gap-3">
              {[
                { icon: PackageCheck, title: "Place your order", text: "Submit your name, phone, email, and exact location." },
                { icon: PhoneCall, title: "We confirm by call", text: "Our team contacts you before dispatching the order." },
                { icon: Truck, title: "Pay on delivery", text: "Receive your combo first, then pay in cash." }
              ].map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="flex gap-4 rounded-3xl border border-white/10 bg-white/[0.07] p-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-rosegold-500/20 text-rosegold-100">
                      <Icon size={21} />
                    </div>
                    <div>
                      <p className="font-bold">{step.title}</p>
                      <p className="mt-1 text-sm leading-6 text-white/65">{step.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 rounded-3xl bg-white/10 p-5">
              <div className="flex items-center gap-3 font-bold">
                <LockKeyhole size={20} />
                Your details are handled securely
              </div>
              <p className="mt-3 text-sm leading-6 text-white/70">
                No online payment is required. You pay only when your order arrives.
              </p>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {[
                { icon: ShieldCheck, text: "COD available" },
                { icon: Headphones, text: "Friendly support" },
                { icon: CheckCircle2, text: "Free delivery" },
                { icon: Truck, text: "Fast dispatch" }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.text} className="flex items-center gap-2 rounded-2xl bg-white/[0.07] px-4 py-3 text-sm font-bold text-white/85">
                    <Icon size={17} className="text-rosegold-200" />
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
