import { getAllOrders } from "@/actions/orders"
import { OrdersTable } from "@/components/admin/orders-table"

export default async function OrdersPage() {
  const orders = await getAllOrders()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-muted-foreground">Manage customer orders and fulfillment</p>
      </div>

      <OrdersTable orders={orders} />
    </div>
  )
}
