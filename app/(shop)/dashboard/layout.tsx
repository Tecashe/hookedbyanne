import type React from "react"
import { requireAuth } from "@/lib/clerk"
import { redirect } from "next/navigation"
import { DashboardNav } from "@/components/dashboard-nav"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  try {
    await requireAuth()
  } catch {
    redirect("/sign-in")
  }

  return (
    <div className="container py-8">
      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <DashboardNav />
        <main>{children}</main>
      </div>
    </div>
  )
}
