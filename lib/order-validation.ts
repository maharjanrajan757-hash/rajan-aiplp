export type OrderInput = {
  name: string;
  phone: string;
  email: string;
  location: string;
  productName: string;
  quantity: number;
  pricePerPiece: number;
  totalPrice: number;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateOrderInput(raw: unknown): { ok: true; data: OrderInput } | { ok: false; error: string } {
  if (!raw || typeof raw !== "object") {
    return { ok: false, error: "Invalid order data." };
  }

  const data = raw as Partial<OrderInput>;
  const name = String(data.name || "").trim();
  const phone = String(data.phone || "").trim();
  const email = String(data.email || "").trim();
  const location = String(data.location || "").trim();
  const productName = String(data.productName || "").trim();
  const quantity = Number(data.quantity);
  const pricePerPiece = Number(data.pricePerPiece);
  const totalPrice = Number(data.totalPrice);

  if (!name) return { ok: false, error: "Name is required." };
  if (!phone) return { ok: false, error: "Phone number is required." };
  if (!emailPattern.test(email)) return { ok: false, error: "Please enter a valid email address." };
  if (!location) return { ok: false, error: "Exact location is required." };
  if (!productName) return { ok: false, error: "Product name is required." };
  if (!Number.isInteger(quantity) || quantity < 1) return { ok: false, error: "Quantity must be at least 1." };
  if (!Number.isFinite(pricePerPiece) || pricePerPiece <= 0) return { ok: false, error: "Price per piece must be valid." };
  if (!Number.isFinite(totalPrice) || totalPrice <= 0) return { ok: false, error: "Total price must be valid." };

  return {
    ok: true,
    data: {
      name,
      phone,
      email,
      location,
      productName,
      quantity,
      pricePerPiece,
      totalPrice
    }
  };
}
