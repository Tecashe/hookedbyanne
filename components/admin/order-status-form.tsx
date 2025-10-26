"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { updateOrderStatus } from "@/actions/orders"

type Order = {
  id: string
  status: string
  trackingNumber: string | null
  carrier: string | null
  estimatedDelivery: Date | null
}

export function OrderStatusForm({ order }: { order: Order }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(order.status)
  const [trackingNumber, setTrackingNumber] = useState(order.trackingNumber || "")
  const [carrier, setCarrier] = useState(order.carrier || "")
  const [estimatedDelivery, setEstimatedDelivery] = useState(
    order.estimatedDelivery ? new Date(order.estimatedDelivery).toISOString().split("T")[0] : "",
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await updateOrderStatus(order.id, status, {
        trackingNumber: trackingNumber || undefined,
        carrier: carrier || undefined,
        estimatedDelivery: estimatedDelivery ? new Date(estimatedDelivery) : undefined,
      })
      router.refresh()
    } catch (error) {
      console.error("Failed to update order:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Order Status</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="status">Order Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="PROCESSING">Processing</SelectItem>
                <SelectItem value="SHIPPED">Shipped</SelectItem>
                <SelectItem value="DELIVERED">Delivered</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(status === "SHIPPED" || status === "DELIVERED") && (
            <>
              <div className="space-y-2">
                <Label htmlFor="trackingNumber">Tracking Number</Label>
                <Input
                  id="trackingNumber"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="1Z999AA10123456784"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="carrier">Carrier</Label>
                <Input
                  id="carrier"
                  value={carrier}
                  onChange={(e) => setCarrier(e.target.value)}
                  placeholder="UPS, FedEx, USPS, etc."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimatedDelivery">Estimated Delivery</Label>
                <Input
                  id="estimatedDelivery"
                  type="date"
                  value={estimatedDelivery}
                  onChange={(e) => setEstimatedDelivery(e.target.value)}
                />
              </div>
            </>
          )}

          <Button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Order"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
