import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { formatMoney, product } from "@/lib/product";

type ThankYouSearchParams = Promise<{
  product?: string;
  quantity?: string;
  total?: string;
}>;

export default async function ThankYouPage({
  searchParams
}: {
  searchParams: ThankYouSearchParams;
}) {
  const params = await searchParams;
  const orderedProduct = params.product || product.name;
  const quantity = Number(params.quantity) || 1;
  const total = Number(params.total) || product.offerPrice * quantity;

  return (
    <main className="grid min-h-screen place-items-center px-4 py-12">
      <ThankYouCard orderedProduct={orderedProduct} quantity={quantity} total={total} />
    </main>
  );
}

function ThankYouCard({
  orderedProduct,
  quantity,
  total
}: {
  orderedProduct: string;
  quantity: number;
  total: number;
}) {
  return (
    <section className="w-full max-w-2xl rounded-[2.5rem] border border-rosegold-100 bg-white p-6 text-center shadow-soft sm:p-10">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-rosegold-100 text-rosegold-700">
        <CheckCircle2 size={34} />
      </div>
      <h1 className="mt-6 font-serif text-4xl font-black text-ink sm:text-5xl">Thank you for your order!</h1>
      <p className="mt-4 text-lg leading-8 text-stone-700">
        Our sales representative will call you soon to confirm your order.
      </p>
      <div className="mt-8 rounded-3xl bg-champagne p-5 text-left">
        <SummaryRow label="Product ordered" value={orderedProduct} />
        <SummaryRow label="Quantity" value={String(quantity)} />
        <SummaryRow label="Total price" value={formatMoney(total)} />
        <SummaryRow label="Payment method" value="Cash On Delivery" />
      </div>
      <Link href="/" className="btn-primary mt-8">
        Back to Home
      </Link>
    </section>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-rosegold-100 py-3 last:border-0">
      <span className="text-sm font-bold uppercase text-stone-500">{label}</span>
      <span className="text-right font-bold text-ink">{value}</span>
    </div>
  );
}
