import { getOrders } from "@/actions/orders"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Package } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function OrdersPage() {
  const orders = await getOrders()

  const statusColors = {
    PENDING: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    PROCESSING: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    SHIPPED: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    DELIVERED: "bg-green-500/10 text-green-500 border-green-500/20",
    CANCELLED: "bg-red-500/10 text-red-500 border-red-500/20",
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">My Orders</h1>
        <p className="text-muted-foreground">View and track your order history</p>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Package className="mb-4 h-16 w-16 text-muted-foreground" />
            <p className="mb-2 text-lg font-medium">No orders yet</p>
            <p className="mb-4 text-muted-foreground">Start shopping to see your orders here</p>
            <Button asChild>
              <Link href="/products">Browse Products</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link key={order.id} href={`/dashboard/orders/${order.id}`}>
              <Card className="transition-shadow hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold">{order.orderNumber}</p>
                        <p className="text-sm text-muted-foreground">
                          Placed on {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {order.items.slice(0, 3).map((item) => (
                          <Badge key={item.id} variant="secondary">
                            {item.product.name} × {item.quantity}
                          </Badge>
                        ))}
                        {order.items.length > 3 && <Badge variant="secondary">+{order.items.length - 3} more</Badge>}
                      </div>

                      {order.pointsEarned > 0 && (
                        <p className="text-sm text-green-600">Earned {order.pointsEarned} points</p>
                      )}
                    </div>

                    <div className="text-right">
                      <Badge className={statusColors[order.status as keyof typeof statusColors]}>{order.status}</Badge>
                      <p className="mt-2 text-lg font-bold">${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
