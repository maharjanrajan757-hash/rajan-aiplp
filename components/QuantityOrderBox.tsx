"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useMemo, useState } from "react";
import { checkoutUrlForItems, defaultOffer, formatMoney, product } from "@/lib/product";

type QuantityMap = Record<string, number>;

export function QuantityOrderBox() {
  const [quantities, setQuantities] = useState<QuantityMap>({
    [defaultOffer.id]: 1
  });
  const cartItems = useMemo(
    () =>
      product.offers.map((offer) => ({
        id: offer.id,
        name: offer.name,
        quantity: quantities[offer.id] || 0,
        price: offer.price
      })),
    [quantities]
  );
  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0),
    [cartItems]
  );
  const totalQuantity = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );
  const checkoutHref = checkoutUrlForItems(cartItems);

  function updateQuantity(offerId: string, direction: -1 | 1) {
    setQuantities((current) => ({
      ...current,
      [offerId]: Math.max(0, (current[offerId] || 0) + direction)
    }));
  }

  return (
    <div className="rounded-[2rem] border border-rosegold-100 bg-white p-5 shadow-soft sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-rosegold-100 pb-5">
        <div>
          <p className="text-sm font-semibold uppercase text-rosegold-600">Build your combo order</p>
          <h3 className="mt-1 text-2xl font-bold text-ink">Select quantities for each offer</h3>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-stone-500">Order total</p>
          <p className="text-3xl font-black text-rosegold-700">{formatMoney(total || defaultOffer.price)}</p>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <div className="grid gap-3">
          {product.offers.map((offer) => {
            const quantity = quantities[offer.id] || 0;
            const isSelected = quantity > 0;
            return (
              <div
                key={offer.id}
                className={`w-full rounded-3xl border p-4 transition ${
                  isSelected
                    ? "border-rosegold-500 bg-rosegold-50 ring-4 ring-rosegold-100"
                    : "border-rosegold-100 bg-white hover:border-rosegold-300"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-black text-ink">{offer.label}</p>
                      {offer.badge && (
                        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-rosegold-700">
                          {offer.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm leading-6 text-stone-600">{offer.description}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-xs text-stone-500 line-through">{formatMoney(offer.regularPrice)}</p>
                    <p className="font-black text-rosegold-700">{formatMoney(offer.price)}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-rosegold-100 pt-4">
                  <div>
                    <p className="text-xs font-bold uppercase text-stone-500">Quantity</p>
                    <p className="text-sm font-semibold text-ink">
                      {quantity > 0 ? `${quantity} selected` : "Add this combo"}
                    </p>
                  </div>
                  <div className="flex h-11 items-center rounded-full border border-rosegold-200 bg-white">
                    <button
                      type="button"
                      aria-label={`Decrease ${offer.name} quantity`}
                      className="grid h-11 w-11 place-items-center text-rosegold-800 disabled:opacity-40"
                      onClick={() => updateQuantity(offer.id, -1)}
                      disabled={quantity <= 0}
                    >
                      <Minus size={17} />
                    </button>
                    <span className="min-w-10 text-center text-lg font-black">{quantity}</span>
                    <button
                      type="button"
                      aria-label={`Increase ${offer.name} quantity`}
                      className="grid h-11 w-11 place-items-center text-rosegold-800"
                      onClick={() => updateQuantity(offer.id, 1)}
                    >
                      <Plus size={17} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-3xl bg-champagne p-4">
          {cartItems
            .filter((item) => item.quantity > 0)
            .map((item) => (
              <div key={item.id} className="flex justify-between gap-4 text-sm text-stone-700">
                <span>{item.name} x{item.quantity}</span>
                <span className="text-right font-semibold">{formatMoney(item.price * item.quantity)}</span>
              </div>
            ))}
          {totalQuantity === 0 && (
            <div className="flex justify-between gap-4 text-sm text-stone-700">
              <span>{defaultOffer.name} x1</span>
              <span className="text-right font-semibold">{formatMoney(defaultOffer.price)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm text-stone-700">
            <span>Delivery fee</span>
            <span className="font-semibold">Free</span>
          </div>
          <div className="mt-3 flex justify-between text-lg font-black text-ink">
            <span>Total</span>
            <span>{formatMoney(total)}</span>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Link href={checkoutHref} className="btn-primary">
            <ShoppingBag size={18} />
            Purchase Now
          </Link>
          <Link href={checkoutHref} className="btn-secondary">
            Order Now
          </Link>
        </div>
      </div>
    </div>
  );
}
