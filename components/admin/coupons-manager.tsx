"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { createCoupon, toggleCoupon } from "@/actions/coupons"
import { Switch } from "@/components/ui/switch"

type Coupon = {
  id: string
  code: string
  description: string | null
  discountType: string
  discountValue: number
  minPurchase: number | null
  maxDiscount: number | null
  expiresAt: Date | null
  usageLimit: number | null
  usageCount: number
  isActive: boolean
}

export function CouponsManager({ coupons }: { coupons: Coupon[] }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [code, setCode] = useState("")
  const [description, setDescription] = useState("")
  const [discountType, setDiscountType] = useState<"PERCENTAGE" | "FIXED">("PERCENTAGE")
  const [discountValue, setDiscountValue] = useState("")
  const [minPurchase, setMinPurchase] = useState("")
  const [maxDiscount, setMaxDiscount] = useState("")
  const [expiresAt, setExpiresAt] = useState("")
  const [usageLimit, setUsageLimit] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await createCoupon({
        code,
        description: description || undefined,
        discountType,
        discountValue: Number.parseFloat(discountValue),
        minPurchase: minPurchase ? Number.parseFloat(minPurchase) : undefined,
        maxDiscount: maxDiscount ? Number.parseFloat(maxDiscount) : undefined,
        expiresAt: expiresAt ? new Date(expiresAt) : undefined,
        usageLimit: usageLimit ? Number.parseInt(usageLimit) : undefined,
      })

      // Reset form
      setCode("")
      setDescription("")
      setDiscountValue("")
      setMinPurchase("")
      setMaxDiscount("")
      setExpiresAt("")
      setUsageLimit("")

      router.refresh()
    } catch (error) {
      console.error("Failed to create coupon:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggle = async (id: string) => {
    try {
      await toggleCoupon(id)
      router.refresh()
    } catch (error) {
      console.error("Failed to toggle coupon:", error)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Coupon</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="code">Coupon Code</Label>
                <Input
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="SAVE20"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="discountType">Discount Type</Label>
                <Select value={discountType} onValueChange={(value: "PERCENTAGE" | "FIXED") => setDiscountType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PERCENTAGE">Percentage</SelectItem>
                    <SelectItem value="FIXED">Fixed Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="20% off your order"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="discountValue">Discount Value {discountType === "PERCENTAGE" ? "(%)" : "($)"}</Label>
                <Input
                  id="discountValue"
                  type="number"
                  step="0.01"
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value)}
                  placeholder={discountType === "PERCENTAGE" ? "20" : "10.00"}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="minPurchase">Min Purchase ($)</Label>
                <Input
                  id="minPurchase"
                  type="number"
                  step="0.01"
                  value={minPurchase}
                  onChange={(e) => setMinPurchase(e.target.value)}
                  placeholder="50.00"
                />
              </div>

              {discountType === "PERCENTAGE" && (
                <div className="space-y-2">
                  <Label htmlFor="maxDiscount">Max Discount ($)</Label>
                  <Input
                    id="maxDiscount"
                    type="number"
                    step="0.01"
                    value={maxDiscount}
                    onChange={(e) => setMaxDiscount(e.target.value)}
                    placeholder="100.00"
                  />
                </div>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="expiresAt">Expiration Date</Label>
                <Input id="expiresAt" type="date" value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="usageLimit">Usage Limit</Label>
                <Input
                  id="usageLimit"
                  type="number"
                  value={usageLimit}
                  onChange={(e) => setUsageLimit(e.target.value)}
                  placeholder="100"
                />
              </div>
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Coupon"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Coupons</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Active</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{coupon.code}</p>
                      {coupon.description && <p className="text-sm text-muted-foreground">{coupon.description}</p>}
                    </div>
                  </TableCell>
                  <TableCell>
                    {coupon.discountType === "PERCENTAGE"
                      ? `${coupon.discountValue}%`
                      : `$${coupon.discountValue.toFixed(2)}`}
                  </TableCell>
                  <TableCell>
                    {coupon.usageCount}
                    {coupon.usageLimit ? ` / ${coupon.usageLimit}` : ""}
                  </TableCell>
                  <TableCell>
                    {coupon.expiresAt ? new Date(coupon.expiresAt).toLocaleDateString() : "No expiration"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={coupon.isActive ? "default" : "secondary"}
                      className={coupon.isActive ? "bg-green-500/10 text-green-500 border-green-500/20" : ""}
                    >
                      {coupon.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Switch checked={coupon.isActive} onCheckedChange={() => handleToggle(coupon.id)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
