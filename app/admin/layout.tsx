// import type React from "react"
// import { requireAdmin } from "@/lib/clerk"
// import { redirect } from "next/navigation"
// import { AdminSidebar } from "@/components/admin/admin-sidebar"

// export default async function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   try {
//     await requireAdmin()
//   } catch {
//     redirect("/sign-in")
//   }

//   return (
//     <div className="flex min-h-screen">
//       <AdminSidebar />
//       <main className="flex-1 bg-muted/30">
//         <div className="container py-8">{children}</div>
//       </main>
//     </div>
//   )
// }

// import type React from "react"
// import { requireAdmin } from "@/lib/clerk"
// import { redirect } from "next/navigation"
// import { AdminSidebar } from "@/components/admin/admin-sidebar"

// export default async function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   try {
//     await requireAdmin()
//   } catch {
//     redirect("/sign-in")
//   }

//   return (
//     <div className="flex min-h-screen">
//       <AdminSidebar />
//       <main className="flex-1 bg-muted/30 ml-16 lg:ml-64 transition-all duration-300">
//         <div className="container py-6 lg:py-8">{children}</div>
//       </main>
//     </div>
//   )
// }


import type React from "react"
import { requireAdmin } from "@/lib/clerk"
import { redirect } from "next/navigation"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminGreeting } from "@/components/admin/admin-greeting"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  try {
    await requireAdmin()
  } catch {
    redirect("/sign-in")
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-muted/30 ml-16 lg:ml-64 transition-all duration-300">
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container py-4">
            <AdminGreeting />
          </div>
        </div>
        <div className="container py-6 lg:py-8">{children}</div>
      </main>
    </div>
  )
}
