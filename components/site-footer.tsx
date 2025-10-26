import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold text-primary">HookedByAnn</h3>
            <p className="text-sm text-muted-foreground">
              Handmade crochet creations crafted with love and care. Each piece is unique and made to order.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-foreground">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?filter=new" className="text-muted-foreground hover:text-foreground">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/products?filter=featured" className="text-muted-foreground hover:text-foreground">
                  Featured
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Customer Care</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/dashboard/orders" className="text-muted-foreground hover:text-foreground">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="text-muted-foreground hover:text-foreground">
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">About</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-muted-foreground hover:text-foreground">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} HookedByAnn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
