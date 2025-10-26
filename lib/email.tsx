import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendOrderConfirmationEmail({
  to,
  orderNumber,
  customerName,
  items,
  total,
  trackingUrl,
}: {
  to: string
  orderNumber: string
  customerName: string
  items: Array<{ name: string; quantity: number; price: number }>
  total: number
  trackingUrl: string
}) {
  try {
    await resend.emails.send({
      from: "HookedByAnn <orders@hookedbyannie.com>",
      to,
      subject: `Order Confirmation - ${orderNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #d4a574 0%, #c89b6d 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #fff; padding: 30px; border: 1px solid #e5e5e5; }
              .order-details { background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; }
              .item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e5e5; }
              .total { font-size: 20px; font-weight: bold; margin-top: 20px; padding-top: 20px; border-top: 2px solid #d4a574; }
              .button { display: inline-block; background: #d4a574; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
              .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Thank You for Your Order!</h1>
                <p>Order #${orderNumber}</p>
              </div>
              <div class="content">
                <p>Hi ${customerName},</p>
                <p>We've received your order and we're getting it ready. You'll receive a shipping confirmation email with tracking information once your items are on their way.</p>
                
                <div class="order-details">
                  <h2>Order Details</h2>
                  ${items
                    .map(
                      (item) => `
                    <div class="item">
                      <span>${item.name} x ${item.quantity}</span>
                      <span>$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  `,
                    )
                    .join("")}
                  <div class="total">
                    <span>Total:</span>
                    <span>$${total.toFixed(2)}</span>
                  </div>
                </div>

                <a href="${trackingUrl}" class="button">Track Your Order</a>

                <p>If you have any questions, please don't hesitate to contact us.</p>
                <p>Thank you for supporting handmade!</p>
                <p>With love,<br>Ann from HookedByAnn</p>
              </div>
              <div class="footer">
                <p>© ${new Date().getFullYear()} HookedByAnn. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    })
    return { success: true }
  } catch (error) {
    console.error("Failed to send order confirmation email:", error)
    return { success: false, error }
  }
}

export async function sendOrderStatusUpdateEmail({
  to,
  orderNumber,
  customerName,
  status,
  trackingNumber,
  carrier,
  trackingUrl,
}: {
  to: string
  orderNumber: string
  customerName: string
  status: string
  trackingNumber?: string
  carrier?: string
  trackingUrl: string
}) {
  const statusMessages = {
    PROCESSING: "Your order is being prepared",
    SHIPPED: "Your order has been shipped",
    DELIVERED: "Your order has been delivered",
    CANCELLED: "Your order has been cancelled",
  }

  const message = statusMessages[status as keyof typeof statusMessages] || "Your order status has been updated"

  try {
    await resend.emails.send({
      from: "HookedByAnn <orders@hookedbyannie.com>",
      to,
      subject: `Order Update - ${orderNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #d4a574 0%, #c89b6d 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #fff; padding: 30px; border: 1px solid #e5e5e5; }
              .status-box { background: #f0f9ff; border-left: 4px solid #d4a574; padding: 20px; margin: 20px 0; border-radius: 4px; }
              .tracking-info { background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; }
              .button { display: inline-block; background: #d4a574; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
              .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Order Status Update</h1>
                <p>Order #${orderNumber}</p>
              </div>
              <div class="content">
                <p>Hi ${customerName},</p>
                
                <div class="status-box">
                  <h2>${message}</h2>
                  <p>Status: <strong>${status}</strong></p>
                </div>

                ${
                  trackingNumber
                    ? `
                  <div class="tracking-info">
                    <h3>Tracking Information</h3>
                    <p><strong>Carrier:</strong> ${carrier || "N/A"}</p>
                    <p><strong>Tracking Number:</strong> ${trackingNumber}</p>
                  </div>
                `
                    : ""
                }

                <a href="${trackingUrl}" class="button">Track Your Order</a>

                <p>Thank you for your patience!</p>
                <p>With love,<br>Ann from HookedByAnn</p>
              </div>
              <div class="footer">
                <p>© ${new Date().getFullYear()} HookedByAnn. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    })
    return { success: true }
  } catch (error) {
    console.error("Failed to send order status update email:", error)
    return { success: false, error }
  }
}

export async function sendNewsletterEmail({
  to,
  subject,
  content,
  previewText,
}: {
  to: string[]
  subject: string
  content: string
  previewText?: string
}) {
  try {
    await resend.emails.send({
      from: "HookedByAnn <newsletter@hookedbyannie.com>",
      to,
      subject,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #d4a574 0%, #c89b6d 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #fff; padding: 30px; border: 1px solid #e5e5e5; }
              .button { display: inline-block; background: #d4a574; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
              .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
              img { max-width: 100%; height: auto; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>HookedByAnn</h1>
                ${previewText ? `<p>${previewText}</p>` : ""}
              </div>
              <div class="content">
                ${content}
                
                <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://hookedbyannie.com"}" class="button">Shop Now</a>
                
                <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e5; font-size: 12px; color: #666;">
                  You're receiving this email because you signed up for updates from HookedByAnn.
                  <a href="${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe" style="color: #d4a574;">Unsubscribe</a>
                </p>
              </div>
              <div class="footer">
                <p>© ${new Date().getFullYear()} HookedByAnn. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    })
    return { success: true }
  } catch (error) {
    console.error("Failed to send newsletter email:", error)
    return { success: false, error }
  }
}
