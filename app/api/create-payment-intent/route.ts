import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { requireAuth } from "@/lib/clerk"

export async function POST(req: Request) {
  try {
    const user = await requireAuth()
    const { amount, orderId } = await req.json()

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: "usd",
      metadata: {
        userId: user.id,
        orderId: orderId || "",
      },
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error("Payment intent error:", error)
    return NextResponse.json({ error: "Failed to create payment intent" }, { status: 500 })
  }
}
