"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/hooks/use-cart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { validateCoupon } from "@/actions/coupons"
import { createOrder } from "@/actions/orders"
import { getCurrentUser } from "@/lib/clerk"
import { POINTS_CONFIG, calculatePointsValue, canRedeemPoints } from "@/lib/points"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info, Tag, CreditCard } from "lucide-react"
import Image from "next/image"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

function PaymentForm({
  clientSecret,
  orderId,
  onSuccess,
}: {
  clientSecret: string
  orderId: string
  onSuccess: () => void
}) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setLoading(true)
    setError("")

    const { error: submitError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/dashboard/orders/${orderId}`,
      },
      redirect: "if_required",
    })

    if (submitError) {
      setError(submitError.message || "Payment failed")
      setLoading(false)
    } else {
      onSuccess()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" className="w-full" size="lg" disabled={!stripe || loading}>
        {loading ? "Processing..." : "Pay Now"}
      </Button>
    </form>
  )
}

export function CheckoutForm() {
  const router = useRouter()
  const { items, getTotal, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [step, setStep] = useState<"shipping" | "payment">("shipping")
  const [clientSecret, setClientSecret] = useState("")
  const [orderId, setOrderId] = useState("")

  // Form state
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zip, setZip] = useState("")
  const [country, setCountry] = useState("United States")

  // Coupon state
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null)
  const [couponError, setCouponError] = useState("")

  // Points state
  const [usePoints, setUsePoints] = useState(false)
  const [pointsToRedeem, setPointsToRedeem] = useState(0)

  const subtotal = getTotal()
  const shipping = subtotal > 50 ? 0 : 9.99
  const discount = appliedCoupon?.discount || 0
  const pointsDiscount = usePoints ? calculatePointsValue(pointsToRedeem) : 0
  const tax = (subtotal - discount - pointsDiscount + shipping) * 0.08
  const total = Math.max(0, subtotal - discount - pointsDiscount + shipping + tax)

  useEffect(() => {
    getCurrentUser().then(setUser)
  }, [])

  useEffect(() => {
    if (user) {
      setName(`${user.firstName || ""} ${user.lastName || ""}`.trim())
      setEmail(user.email)
    }
  }, [user])

  const handleApplyCoupon = async () => {
    setCouponError("")
    setAppliedCoupon(null)

    if (!couponCode.trim()) return

    const result = await validateCoupon(couponCode, subtotal)

    if (result.valid) {
      setAppliedCoupon(result)
    } else {
      setCouponError(result.error || "Invalid coupon")
    }
  }

  const handlePointsChange = (checked: boolean) => {
    setUsePoints(checked)
    if (checked && user) {
      const maxPoints = Math.min(user.points, Math.floor((subtotal - discount) * POINTS_CONFIG.REDEEM_RATE))
      setPointsToRedeem(maxPoints)
    } else {
      setPointsToRedeem(0)
    }
  }

  const handleShippingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await createOrder({
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
        subtotal,
        discount: discount + pointsDiscount,
        shipping,
        tax,
        total,
        couponCode: appliedCoupon?.coupon?.code,
        pointsRedeemed: pointsToRedeem,
        shippingInfo: {
          name,
          email,
          phone,
          address,
          city,
          state,
          zip,
          country,
        },
      })

      if (result.success) {
        setOrderId(result.order.id)

        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: total,
            orderId: result.order.id,
          }),
        })

        const data = await response.json()
        setClientSecret(data.clientSecret)
        setStep("payment")
      }
    } catch (error) {
      console.error("Checkout error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handlePaymentSuccess = () => {
    clearCart()
    router.push(`/dashboard/orders/${orderId}`)
  }

  if (items.length === 0) {
    router.push("/cart")
    return null
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        {step === "shipping" ? (
          <form onSubmit={handleShippingSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone (optional)</Label>
                    <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" value={state} onChange={(e) => setState(e.target.value)} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" value={zip} onChange={(e) => setZip(e.target.value)} required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" value={country} onChange={(e) => setCountry(e.target.value)} required />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Discounts & Rewards</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="coupon">Coupon Code</Label>
                  <div className="flex gap-2">
                    <Input
                      id="coupon"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="Enter coupon code"
                    />
                    <Button type="button" variant="outline" onClick={handleApplyCoupon}>
                      <Tag className="mr-2 h-4 w-4" />
                      Apply
                    </Button>
                  </div>
                  {couponError && <p className="text-sm text-destructive">{couponError}</p>}
                  {appliedCoupon && (
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        Coupon applied: {appliedCoupon.coupon.description || appliedCoupon.coupon.code}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                {user && canRedeemPoints(user.points) && (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="usePoints" checked={usePoints} onCheckedChange={handlePointsChange} />
                      <Label htmlFor="usePoints" className="cursor-pointer">
                        Use {user.points} reward points (${calculatePointsValue(user.points).toFixed(2)} off)
                      </Label>
                    </div>
                    {usePoints && (
                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertDescription>
                          Redeeming {pointsToRedeem} points for ${pointsDiscount.toFixed(2)} off
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "Processing..." : "Continue to Payment"}
            </Button>
          </form>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              {clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <PaymentForm clientSecret={clientSecret} orderId={orderId} onSuccess={handlePaymentSuccess} />
                </Elements>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-3">
                  <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium line-clamp-2">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ${item.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Coupon Discount</span>
                  <span className="text-green-600">-${discount.toFixed(2)}</span>
                </div>
              )}
              {pointsDiscount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Points Discount</span>
                  <span className="text-orange-600">-${pointsDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
              </div>
              {shipping > 0 && <p className="text-xs text-muted-foreground">Free shipping on orders over $50</p>}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {user && (
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  You'll earn {Math.floor(total * POINTS_CONFIG.EARN_RATE)} reward points from this order!
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
