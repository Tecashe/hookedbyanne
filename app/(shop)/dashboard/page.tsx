import { getCurrentUser } from "@/lib/clerk"
import { prisma } from "@/lib/db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Heart, Star, Package } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    return null
  }

  const [orders, wishlistCount, recentOrders] = await Promise.all([
    prisma.order.count({ where: { userId: user.id } }),
    prisma.wishlistItem.count({ where: { userId: user.id } }),
    prisma.order.findMany({
      where: { userId: user.id },
      take: 5,
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
  ])

  const stats = [
    {
      title: "Total Orders",
      value: orders.toString(),
      icon: ShoppingBag,
      href: "/dashboard/orders",
    },
    {
      title: "Wishlist Items",
      value: wishlistCount.toString(),
      icon: Heart,
      href: "/wishlist",
    },
    {
      title: "Reward Points",
      value: user.points.toString(),
      icon: Star,
      href: "/dashboard/points",
    },
  ]

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
        <h1 className="text-3xl font-bold">Welcome back, {user.firstName || "there"}!</h1>
        <p className="text-muted-foreground">Manage your orders, wishlist, and rewards</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="transition-shadow hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {recentOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Package className="mb-4 h-12 w-12 text-muted-foreground" />
              <p className="mb-2 text-lg font-medium">No orders yet</p>
              <p className="mb-4 text-muted-foreground">Start shopping to see your orders here</p>
              <Button asChild>
                <Link href="/products">Browse Products</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <Link
                  key={order.id}
                  href={`/dashboard/orders/${order.id}`}
                  className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{order.orderNumber}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.items.length} {order.items.length === 1 ? "item" : "items"} •{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className={statusColors[order.status as keyof typeof statusColors]}>{order.status}</Badge>
                    <p className="font-semibold">${order.total.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
