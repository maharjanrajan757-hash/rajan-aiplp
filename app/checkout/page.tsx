import Link from "next/link";
import { Suspense } from "react";
import { ArrowLeft, LockKeyhole } from "lucide-react";
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
        <div className="mt-8 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="rounded-[2rem] bg-ink p-6 text-white shadow-soft lg:p-8">
            <p className="font-serif text-3xl font-black">{product.brandName}</p>
            <h1 className="mt-8 font-serif text-4xl font-black">Secure Cash On Delivery checkout</h1>
            <p className="mt-4 leading-7 text-white/75">
              Fill in your details and place your order. Our sales representative will call you soon to confirm delivery.
            </p>
            <div className="mt-8 rounded-3xl bg-white/10 p-5">
              <div className="flex items-center gap-3 font-bold">
                <LockKeyhole size={20} />
                Your details are handled securely
              </div>
              <p className="mt-3 text-sm leading-6 text-white/70">
                No online payment is required. You pay only when your order arrives.
              </p>
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
