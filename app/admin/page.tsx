import { prisma } from "@/lib/db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ShoppingCart, Users, DollarSign } from "lucide-react"
import { RecentOrders } from "@/components/admin/recent-orders"

export default async function AdminDashboard() {
  const [productsCount, ordersCount, customersCount, orders] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count({ where: { role: "CUSTOMER" } }),
    prisma.order.findMany({
      take: 10,
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
  ])

  const totalRevenue = await prisma.order.aggregate({
    _sum: {
      total: true,
    },
    where: {
      status: {
        in: ["PROCESSING", "SHIPPED", "DELIVERED"],
      },
    },
  })

  const stats = [
    {
      title: "Total Revenue",
      value: `$${(totalRevenue._sum.total || 0).toFixed(2)}`,
      icon: DollarSign,
      description: "From completed orders",
    },
    {
      title: "Products",
      value: productsCount.toString(),
      icon: Package,
      description: "Total products in store",
    },
    {
      title: "Orders",
      value: ordersCount.toString(),
      icon: ShoppingCart,
      description: "Total orders placed",
    },
    {
      title: "Customers",
      value: customersCount.toString(),
      icon: Users,
      description: "Registered customers",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to your admin dashboard</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <RecentOrders orders={orders} />
    </div>
  )
}
