"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export function BackButton({ href, label = "Back" }: { href?: string; label?: string }) {
  const router = useRouter()

  const handleBack = () => {
    if (href) {
      router.push(href)
    } else {
      router.back()
    }
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleBack} className="gap-2">
      <ArrowLeft className="h-4 w-4" />
      {label}
    </Button>
  )
}
