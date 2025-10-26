// import { CartItems } from "@/components/cart-items"

// export default function CartPage() {
//   return (
//     <div className="container py-8">
//       <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>
//       <CartItems />
//     </div>
//   )
// }
import { CartItems } from "@/components/cart-items"

export default function CartPage() {
  return (
    <div className="container py-6 md:py-8">
      <h1 className="mb-6 md:mb-8 text-2xl md:text-3xl font-bold">Shopping Cart</h1>
      <CartItems />
    </div>
  )
}
