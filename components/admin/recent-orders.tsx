import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

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

export function RecentOrders({ orders }: { orders: Order[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/admin/orders/${order.id}`}
              className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted"
            >
              <div className="space-y-1">
                <p className="font-medium">{order.orderNumber}</p>
                <p className="text-sm text-muted-foreground">
                  {order.user.firstName} {order.user.lastName} • {order.items.length}{" "}
                  {order.items.length === 1 ? "item" : "items"}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Badge className={statusColors[order.status as keyof typeof statusColors]}>{order.status}</Badge>
                <p className="font-semibold">${order.total.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
