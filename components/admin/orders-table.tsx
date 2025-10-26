"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

type Order = {
  id: string
  orderNumber: string
  status: string
  total: number
  createdAt: Date
  user: {
    firstName: string | null
    lastName: string | null
    email: string
  }
  items: Array<{
    quantity: number
    product: {
      name: string
    }
  }>
}

const statusColors = {
  PENDING: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  PROCESSING: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  SHIPPED: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  DELIVERED: "bg-green-500/10 text-green-500 border-green-500/20",
  CANCELLED: "bg-red-500/10 text-red-500 border-red-500/20",
}

export function OrdersTable({ orders }: { orders: Order[] }) {
  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order Number</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.orderNumber}</TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">
                    {order.user.firstName} {order.user.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">{order.user.email}</p>
                </div>
              </TableCell>
              <TableCell>{order.items.length} items</TableCell>
              <TableCell>${order.total.toFixed(2)}</TableCell>
              <TableCell>
                <Badge className={statusColors[order.status as keyof typeof statusColors]}>{order.status}</Badge>
              </TableCell>
              <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/admin/orders/${order.id}`}>
                    <Eye className="h-4 w-4" />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
