import { NextRequest, NextResponse } from "next/server";
import { appendOrderToSheet } from "@/lib/google-sheets";
import { sendOrderEmails } from "@/lib/email";
import { createOrderRecord } from "@/lib/order-types";
import { validateOrderInput } from "@/lib/order-validation";

export async function POST(request: NextRequest) {
  try {
    const allowedOrigin = process.env.FRONTEND_URL;
    const requestOrigin = request.headers.get("origin");

    if (allowedOrigin && requestOrigin && requestOrigin !== allowedOrigin) {
      return NextResponse.json({ success: false, error: "Order requests are not allowed from this origin." }, { status: 403 });
    }

    const body = await request.json();
    const validation = validateOrderInput(body);

    if (!validation.ok) {
      return NextResponse.json({ success: false, error: validation.error }, { status: 400 });
    }

    const order = createOrderRecord(validation.data);

    await appendOrderToSheet(order);
    await sendOrderEmails(order);

    return NextResponse.json({
      success: true,
      orderId: order.orderId
    });
  } catch (error) {
    console.error("Order submission failed", error);
    const message = error instanceof Error ? error.message : "Unable to submit order. Please try again.";

    return NextResponse.json(
      {
        success: false,
        error: message
      },
      { status: 500 }
    );
  }
}
