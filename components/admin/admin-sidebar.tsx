"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Package, ShoppingCart, Users, ImageIcon, Tag } from "lucide-react"
import { UserButton } from "@clerk/nextjs"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { name: "Coupons", href: "/admin/coupons", icon: Tag },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r bg-card">
      <div className="flex h-full flex-col">
        <div className="border-b p-6">
          <h1 className="text-2xl font-bold text-primary">HookedByAnn</h1>
          <p className="text-sm text-muted-foreground">Admin Dashboard</p>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="border-t p-4">
          <div className="flex items-center gap-3">
            <UserButton afterSignOutUrl="/" />
            <div className="flex-1">
              <p className="text-sm font-medium">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
