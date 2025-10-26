// "use server"

// import { prisma } from "@/lib/db"
// import { requireAuth, requireAdmin } from "@/lib/clerk"
// import { generateOrderNumber } from "@/lib/order-number"
// import { calculatePointsEarned } from "@/lib/points"
// import { revalidatePath } from "next/cache"

// export async function createOrder(data: {
//   items: { productId: string; quantity: number; price: number }[]
//   subtotal: number
//   discount: number
//   shipping: number
//   tax: number
//   total: number
//   couponCode?: string
//   pointsRedeemed?: number
//   shippingInfo: {
//     name: string
//     email: string
//     phone?: string
//     address: string
//     city: string
//     state: string
//     zip: string
//     country: string
//   }
//   stripePaymentId?: string
// }) {
//   const user = await requireAuth()

//   const pointsEarned = calculatePointsEarned(data.total)
//   const orderNumber = generateOrderNumber()

//   const order = await prisma.order.create({
//     data: {
//       userId: user.id,
//       orderNumber,
//       status: "PENDING",
//       subtotal: data.subtotal,
//       discount: data.discount,
//       shipping: data.shipping,
//       tax: data.tax,
//       total: data.total,
//       couponCode: data.couponCode,
//       pointsEarned,
//       pointsRedeemed: data.pointsRedeemed || 0,
//       shippingName: data.shippingInfo.name,
//       shippingEmail: data.shippingInfo.email,
//       shippingPhone: data.shippingInfo.phone,
//       shippingAddress: data.shippingInfo.address,
//       shippingCity: data.shippingInfo.city,
//       shippingState: data.shippingInfo.state,
//       shippingZip: data.shippingInfo.zip,
//       shippingCountry: data.shippingInfo.country,
//       stripePaymentId: data.stripePaymentId,
//       items: {
//         create: data.items.map((item) => ({
//           productId: item.productId,
//           quantity: item.quantity,
//           price: item.price,
//         })),
//       },
//     },
//     include: {
//       items: {
//         include: {
//           product: true,
//         },
//       },
//     },
//   })

//   // Update user points
//   await prisma.user.update({
//     where: { id: user.id },
//     data: {
//       points: {
//         increment: pointsEarned - (data.pointsRedeemed || 0),
//       },
//     },
//   })

//   // Add points history
//   if (pointsEarned > 0) {
//     await prisma.pointsHistory.create({
//       data: {
//         userId: user.id,
//         points: pointsEarned,
//         type: "EARNED",
//         description: `Earned from order ${orderNumber}`,
//         orderId: order.id,
//       },
//     })
//   }

//   if (data.pointsRedeemed && data.pointsRedeemed > 0) {
//     await prisma.pointsHistory.create({
//       data: {
//         userId: user.id,
//         points: -data.pointsRedeemed,
//         type: "REDEEMED",
//         description: `Redeemed for order ${orderNumber}`,
//         orderId: order.id,
//       },
//     })
//   }

//   // Update product stock
//   for (const item of data.items) {
//     await prisma.product.update({
//       where: { id: item.productId },
//       data: {
//         stock: {
//           decrement: item.quantity,
//         },
//       },
//     })
//   }

//   // Update coupon usage if applicable
//   if (data.couponCode) {
//     await prisma.coupon.updateMany({
//       where: { code: data.couponCode },
//       data: {
//         usageCount: {
//           increment: 1,
//         },
//       },
//     })
//   }

//   revalidatePath("/dashboard/orders")
//   return { success: true, order }
// }

// export async function getOrders() {
//   const user = await requireAuth()

//   return await prisma.order.findMany({
//     where: { userId: user.id },
//     include: {
//       items: {
//         include: {
//           product: true,
//         },
//       },
//     },
//     orderBy: { createdAt: "desc" },
//   })
// }

// export async function getOrder(id: string) {
//   const user = await requireAuth()

//   return await prisma.order.findFirst({
//     where: {
//       id,
//       userId: user.id,
//     },
//     include: {
//       items: {
//         include: {
//           product: true,
//         },
//       },
//     },
//   })
// }

// export async function getAllOrders() {
//   await requireAdmin()

//   return await prisma.order.findMany({
//     include: {
//       user: {
//         select: {
//           firstName: true,
//           lastName: true,
//           email: true,
//         },
//       },
//       items: {
//         include: {
//           product: true,
//         },
//       },
//     },
//     orderBy: { createdAt: "desc" },
//   })
// }

// export async function updateOrderStatus(
//   orderId: string,
//   status: string,
//   trackingInfo?: {
//     trackingNumber?: string
//     carrier?: string
//     estimatedDelivery?: Date
//   },
// ) {
//   await requireAdmin()

//   await prisma.order.update({
//     where: { id: orderId },
//     data: {
//       status: status as any,
//       trackingNumber: trackingInfo?.trackingNumber,
//       carrier: trackingInfo?.carrier,
//       estimatedDelivery: trackingInfo?.estimatedDelivery,
//     },
//   })

//   revalidatePath("/admin/orders")
//   return { success: true }
// }
"use server"

import { prisma } from "@/lib/db"
import { requireAuth, requireAdmin } from "@/lib/clerk"
import { generateOrderNumber } from "@/lib/order-number"
import { calculatePointsEarned } from "@/lib/points"
import { sendOrderConfirmationEmail, sendOrderStatusUpdateEmail } from "@/lib/email"
import { revalidatePath } from "next/cache"

export async function createOrder(data: {
  items: { productId: string; quantity: number; price: number; variantId?: string }[]
  subtotal: number
  discount: number
  shipping: number
  tax: number
  total: number
  couponCode?: string
  pointsRedeemed?: number
  shippingInfo: {
    name: string
    email: string
    phone?: string
    address: string
    city: string
    state: string
    zip: string
    country: string
  }
  stripePaymentId?: string
}) {
  const user = await requireAuth()

  const pointsEarned = calculatePointsEarned(data.total)
  const orderNumber = generateOrderNumber()

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      orderNumber,
      status: "PENDING",
      subtotal: data.subtotal,
      discount: data.discount,
      shipping: data.shipping,
      tax: data.tax,
      total: data.total,
      couponCode: data.couponCode,
      pointsEarned,
      pointsRedeemed: data.pointsRedeemed || 0,
      shippingName: data.shippingInfo.name,
      shippingEmail: data.shippingInfo.email,
      shippingPhone: data.shippingInfo.phone,
      shippingAddress: data.shippingInfo.address,
      shippingCity: data.shippingInfo.city,
      shippingState: data.shippingInfo.state,
      shippingZip: data.shippingInfo.zip,
      shippingCountry: data.shippingInfo.country,
      stripePaymentId: data.stripePaymentId,
      items: {
        create: data.items.map((item) => ({
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
    include: {
      items: {
        include: {
          product: true,
          variant: true,
        },
      },
    },
  })

  // Update user points
  await prisma.user.update({
    where: { id: user.id },
    data: {
      points: {
        increment: pointsEarned - (data.pointsRedeemed || 0),
      },
    },
  })

  // Add points history
  if (pointsEarned > 0) {
    await prisma.pointsHistory.create({
      data: {
        userId: user.id,
        points: pointsEarned,
        type: "EARNED",
        description: `Earned from order ${orderNumber}`,
        orderId: order.id,
      },
    })
  }

  if (data.pointsRedeemed && data.pointsRedeemed > 0) {
    await prisma.pointsHistory.create({
      data: {
        userId: user.id,
        points: -data.pointsRedeemed,
        type: "REDEEMED",
        description: `Redeemed for order ${orderNumber}`,
        orderId: order.id,
      },
    })
  }

  // Update product stock
  for (const item of data.items) {
    if (item.variantId) {
      await prisma.productVariant.update({
        where: { id: item.variantId },
        data: { stock: { decrement: item.quantity } },
      })
    } else {
      await prisma.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      })
    }
  }

  // Update coupon usage if applicable
  if (data.couponCode) {
    await prisma.coupon.updateMany({
      where: { code: data.couponCode },
      data: {
        usageCount: {
          increment: 1,
        },
      },
    })
  }

  const trackingUrl = `${process.env.NEXT_PUBLIC_APP_URL || "https://hookedbyannie.com"}/dashboard/orders/${order.id}`

  await sendOrderConfirmationEmail({
    to: data.shippingInfo.email,
    orderNumber,
    customerName: data.shippingInfo.name,
    items: order.items.map((item) => ({
      name: item.product.name,
      quantity: item.quantity,
      price: item.price,
    })),
    total: data.total,
    trackingUrl,
  })

  revalidatePath("/dashboard/orders")
  return { success: true, order }
}

export async function getOrders() {
  const user = await requireAuth()

  return await prisma.order.findMany({
    where: { userId: user.id },
    include: {
      items: {
        include: {
          product: true,
          variant: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  })
}

export async function getOrder(id: string) {
  const user = await requireAuth()

  return await prisma.order.findFirst({
    where: {
      id,
      userId: user.id,
    },
    include: {
      items: {
        include: {
          product: true,
          variant: true,
        },
      },
    },
  })
}

export async function getAllOrders() {
  await requireAdmin()

  return await prisma.order.findMany({
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
          variant: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  })
}

export async function updateOrderStatus(
  orderId: string,
  status: string,
  trackingInfo?: {
    trackingNumber?: string
    carrier?: string
    estimatedDelivery?: Date
  },
) {
  await requireAdmin()

  const order = await prisma.order.update({
    where: { id: orderId },
    data: {
      status: status as any,
      trackingNumber: trackingInfo?.trackingNumber,
      carrier: trackingInfo?.carrier,
      estimatedDelivery: trackingInfo?.estimatedDelivery,
    },
    include: {
      user: true,
    },
  })

  const trackingUrl = `${process.env.NEXT_PUBLIC_APP_URL || "https://hookedbyannie.com"}/dashboard/orders/${orderId}`

  await sendOrderStatusUpdateEmail({
    to: order.shippingEmail,
    orderNumber: order.orderNumber,
    customerName: order.shippingName,
    status,
    trackingNumber: trackingInfo?.trackingNumber,
    carrier: trackingInfo?.carrier,
    trackingUrl,
  })

  revalidatePath("/admin/orders")
  return { success: true }
}
