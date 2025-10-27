// import { prisma } from "@/lib/db"
// import { notFound } from "next/navigation"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { OrderStatusForm } from "@/components/admin/order-status-form"
// import Image from "next/image"

// export default async function OrderDetailPage({
//   params,
// }: {
//   params: Promise<{ id: string }>
// }) {
//   const { id } = await params
//   const order = await prisma.order.findUnique({
//     where: { id },
//     include: {
//       user: true,
//       items: {
//         include: {
//           product: true,
//         },
//       },
//     },
//   })

//   if (!order) {
//     notFound()
//   }

//   const statusColors = {
//     PENDING: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
//     PROCESSING: "bg-blue-500/10 text-blue-500 border-blue-500/20",
//     SHIPPED: "bg-purple-500/10 text-purple-500 border-purple-500/20",
//     DELIVERED: "bg-green-500/10 text-green-500 border-green-500/20",
//     CANCELLED: "bg-red-500/10 text-red-500 border-red-500/20",
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold">Order {order.orderNumber}</h1>
//           <p className="text-muted-foreground">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
//         </div>
//         <Badge className={statusColors[order.status as keyof typeof statusColors]}>{order.status}</Badge>
//       </div>

//       <div className="grid gap-6 lg:grid-cols-3">
//         <div className="lg:col-span-2 space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Order Items</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {order.items.map((item) => (
//                   <div key={item.id} className="flex gap-4">
//                     <div className="relative h-20 w-20 overflow-hidden rounded-lg">
//                       <Image
//                         src={item.product.images[0] || "/placeholder.svg"}
//                         alt={item.product.name}
//                         fill
//                         className="object-cover"
//                       />
//                     </div>
//                     <div className="flex-1">
//                       <p className="font-medium">{item.product.name}</p>
//                       <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
//                     </div>
//                     <p className="font-medium">${item.price.toFixed(2)}</p>
//                   </div>
//                 ))}
//               </div>

//               <div className="mt-6 space-y-2 border-t pt-4">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-muted-foreground">Subtotal</span>
//                   <span>${order.subtotal.toFixed(2)}</span>
//                 </div>
//                 {order.discount > 0 && (
//                   <div className="flex justify-between text-sm">
//                     <span className="text-muted-foreground">Discount</span>
//                     <span className="text-green-600">-${order.discount.toFixed(2)}</span>
//                   </div>
//                 )}
//                 <div className="flex justify-between text-sm">
//                   <span className="text-muted-foreground">Shipping</span>
//                   <span>${order.shipping.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-muted-foreground">Tax</span>
//                   <span>${order.tax.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between border-t pt-2 font-bold">
//                   <span>Total</span>
//                   <span>${order.total.toFixed(2)}</span>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <OrderStatusForm order={order} />
//         </div>

//         <div className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Customer</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-2">
//               <div>
//                 <p className="font-medium">
//                   {order.user.firstName} {order.user.lastName}
//                 </p>
//                 <p className="text-sm text-muted-foreground">{order.user.email}</p>
//               </div>
//               <div className="pt-2">
//                 <p className="text-sm font-medium">Points</p>
//                 <p className="text-sm text-muted-foreground">Current: {order.user.points} points</p>
//                 {order.pointsEarned > 0 && (
//                   <p className="text-sm text-green-600">Earned: +{order.pointsEarned} points</p>
//                 )}
//                 {order.pointsRedeemed > 0 && (
//                   <p className="text-sm text-orange-600">Redeemed: -{order.pointsRedeemed} points</p>
//                 )}
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Shipping Address</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-1 text-sm">
//               <p className="font-medium">{order.shippingName}</p>
//               <p>{order.shippingAddress}</p>
//               <p>
//                 {order.shippingCity}, {order.shippingState} {order.shippingZip}
//               </p>
//               <p>{order.shippingCountry}</p>
//               {order.shippingPhone && <p className="pt-2">{order.shippingPhone}</p>}
//               <p className="pt-2 text-muted-foreground">{order.shippingEmail}</p>
//             </CardContent>
//           </Card>

//           {order.trackingNumber && (
//             <Card>
//               <CardHeader>
//                 <CardTitle>Tracking</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-2 text-sm">
//                 <div>
//                   <p className="font-medium">Tracking Number</p>
//                   <p className="text-muted-foreground">{order.trackingNumber}</p>
//                 </div>
//                 {order.carrier && (
//                   <div>
//                     <p className="font-medium">Carrier</p>
//                     <p className="text-muted-foreground">{order.carrier}</p>
//                   </div>
//                 )}
//                 {order.estimatedDelivery && (
//                   <div>
//                     <p className="font-medium">Estimated Delivery</p>
//                     <p className="text-muted-foreground">{new Date(order.estimatedDelivery).toLocaleDateString()}</p>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }


import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { OrderStatusForm } from "@/components/admin/order-status-form"
import Image from "next/image"
import { BackButton } from "@/components/back-button"

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      user: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  })

  if (!order) {
    notFound()
  }

  const statusColors = {
    PENDING: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    PROCESSING: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    SHIPPED: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    DELIVERED: "bg-green-500/10 text-green-500 border-green-500/20",
    CANCELLED: "bg-red-500/10 text-red-500 border-red-500/20",
  }

  return (
    <div className="space-y-6">
      <BackButton href="/admin/orders" label="Back to Orders" />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Order {order.orderNumber}</h1>
          <p className="text-muted-foreground">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
        <Badge className={statusColors[order.status as keyof typeof statusColors]}>{order.status}</Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative h-20 w-20 overflow-hidden rounded-lg">
                      <Image
                        src={item.product.images[0] || "/placeholder.svg"}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${item.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-2 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Discount</span>
                    <span className="text-green-600">-${order.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>${order.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t pt-2 font-bold">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <OrderStatusForm order={order} />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="font-medium">
                  {order.user.firstName} {order.user.lastName}
                </p>
                <p className="text-sm text-muted-foreground">{order.user.email}</p>
              </div>
              <div className="pt-2">
                <p className="text-sm font-medium">Points</p>
                <p className="text-sm text-muted-foreground">Current: {order.user.points} points</p>
                {order.pointsEarned > 0 && (
                  <p className="text-sm text-green-600">Earned: +{order.pointsEarned} points</p>
                )}
                {order.pointsRedeemed > 0 && (
                  <p className="text-sm text-orange-600">Redeemed: -{order.pointsRedeemed} points</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              <p className="font-medium">{order.shippingName}</p>
              <p>{order.shippingAddress}</p>
              <p>
                {order.shippingCity}, {order.shippingState} {order.shippingZip}
              </p>
              <p>{order.shippingCountry}</p>
              {order.shippingPhone && <p className="pt-2">{order.shippingPhone}</p>}
              <p className="pt-2 text-muted-foreground">{order.shippingEmail}</p>
            </CardContent>
          </Card>

          {order.trackingNumber && (
            <Card>
              <CardHeader>
                <CardTitle>Tracking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div>
                  <p className="font-medium">Tracking Number</p>
                  <p className="text-muted-foreground">{order.trackingNumber}</p>
                </div>
                {order.carrier && (
                  <div>
                    <p className="font-medium">Carrier</p>
                    <p className="text-muted-foreground">{order.carrier}</p>
                  </div>
                )}
                {order.estimatedDelivery && (
                  <div>
                    <p className="font-medium">Estimated Delivery</p>
                    <p className="text-muted-foreground">{new Date(order.estimatedDelivery).toLocaleDateString()}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
