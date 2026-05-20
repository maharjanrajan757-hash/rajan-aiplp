"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import { CartItem, defaultOffer, formatMoney, product } from "@/lib/product";

type FormState = {
  name: string;
  phone: string;
  email: string;
  location: string;
};

export function CheckoutForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    location: ""
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const quantity = Math.max(1, Number(searchParams.get("quantity")) || 1);
  const productName = searchParams.get("product") || product.name;
  const pricePerPiece = Number(searchParams.get("price")) || product.offerPrice;
  const orderItems = useMemo(() => parseOrderItems(searchParams.get("items")), [searchParams]);
  const totalPrice = useMemo(
    () =>
      orderItems.length
        ? orderItems.reduce((sum, item) => sum + item.quantity * item.price, 0)
        : pricePerPiece * quantity,
    [orderItems, pricePerPiece, quantity]
  );
  const totalQuantity = useMemo(
    () => (orderItems.length ? orderItems.reduce((sum, item) => sum + item.quantity, 0) : quantity),
    [orderItems, quantity]
  );
  const submittedProductName = useMemo(
    () =>
      orderItems.length
        ? orderItems.map((item) => `${item.name} x${item.quantity} (${formatMoney(item.price * item.quantity)})`).join(", ")
        : productName,
    [orderItems, productName]
  );
  const submittedPricePerPiece = orderItems.length === 1 ? orderItems[0].price : totalPrice;

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    setError("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          productName: submittedProductName,
          quantity: totalQuantity,
          pricePerPiece: submittedPricePerPiece,
          totalPrice
        })
      });

      const data = (await response.json()) as { success?: boolean; error?: string; orderId?: string };

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Order submission failed. Please try again.");
      }

      const params = new URLSearchParams({
        orderId: data.orderId || "",
        product: submittedProductName,
        quantity: String(totalQuantity),
        total: String(totalPrice)
      });

      router.push(`/thank-you?${params.toString()}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Order submission failed. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={submitOrder} className="rounded-[2rem] border border-rosegold-100 bg-white p-5 shadow-soft sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label>
          <span className="field-label">Full Name</span>
          <input
            className="field-input"
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            autoComplete="name"
            required
          />
        </label>
        <label>
          <span className="field-label">Phone Number</span>
          <input
            className="field-input"
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            autoComplete="tel"
            required
          />
        </label>
        <label className="sm:col-span-2">
          <span className="field-label">Email Address</span>
          <input
            className="field-input"
            type="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            autoComplete="email"
            required
          />
        </label>
        <label className="sm:col-span-2">
          <span className="field-label">Exact Location</span>
          <textarea
            className="field-input min-h-28 resize-none"
            value={form.location}
            placeholder="Kindly share your exact location"
            onChange={(event) => updateField("location", event.target.value)}
            required
          />
        </label>
      </div>

      <div className="mt-6 rounded-3xl bg-champagne p-5">
        {orderItems.length > 0 ? (
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase text-stone-500">Order Summary</p>
            {orderItems.map((item) => (
              <div key={item.id} className="flex items-start justify-between gap-4 rounded-2xl bg-white/60 p-3">
                <div>
                  <p className="font-bold text-ink">{item.name}</p>
                  <p className="text-sm text-stone-600">
                    {item.quantity} x {formatMoney(item.price)}
                  </p>
                </div>
                <p className="shrink-0 font-black text-rosegold-700">{formatMoney(item.quantity * item.price)}</p>
              </div>
            ))}
            <div className="grid gap-4 border-t border-rosegold-100 pt-4 sm:grid-cols-2">
              <ReadOnly label="Total Quantity" value={String(totalQuantity)} />
              <ReadOnly label="Total Price" value={formatMoney(totalPrice)} />
            </div>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            <ReadOnly label="Product Name" value={productName} />
            <ReadOnly label="Quantity" value={String(quantity)} />
            <ReadOnly label="Price Per Piece" value={formatMoney(pricePerPiece)} />
            <ReadOnly label="Total Price" value={formatMoney(totalPrice)} />
          </div>
        )}
        <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-rosegold-800">
          <ShieldCheck size={18} />
          Payment Method: Cash On Delivery
        </div>
      </div>

      {error && (
        <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      <button type="submit" disabled={submitting} className="btn-primary mt-6 w-full">
        {submitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Submitting Order...
          </>
        ) : (
          "Order Now"
        )}
      </button>
    </form>
  );
}

function parseOrderItems(rawItems: string | null): CartItem[] {
  if (!rawItems) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawItems) as CartItem[];
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map((item) => ({
        id: String(item.id || defaultOffer.id),
        name: String(item.name || defaultOffer.name),
        quantity: Math.max(0, Number(item.quantity) || 0),
        price: Math.max(0, Number(item.price) || 0)
      }))
      .filter((item) => item.quantity > 0 && item.price > 0);
  } catch {
    return [];
  }
}

function ReadOnly({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase text-stone-500">{label}</p>
      <p className="mt-1 font-bold text-ink">{value}</p>
    </div>
  );
}
