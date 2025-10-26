"use client"

import { Button } from "@/components/ui/button"
import { Camera } from "lucide-react"
import { useRouter } from "next/navigation"

interface TryOnButtonProps {
  productId: string
}

export function TryOnButton({ productId }: TryOnButtonProps) {
  const router = useRouter()

  return (
    <Button variant="outline" onClick={() => router.push(`/try-on?product=${productId}`)}>
      <Camera className="mr-2 h-4 w-4" />
      Try On
    </Button>
  )
}
