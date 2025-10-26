"use client"

import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { addToWishlist, removeFromWishlist, isInWishlist } from "@/actions/wishlist"
import { useState, useEffect } from "react"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export function WishlistButton({ productId }: { productId: string }) {
  const { isSignedIn } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [inWishlist, setInWishlist] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isSignedIn) {
      isInWishlist(productId).then(setInWishlist)
    }
  }, [productId, isSignedIn])

  const handleClick = async () => {
    if (!isSignedIn) {
      router.push("/sign-in")
      return
    }

    setLoading(true)
    try {
      if (inWishlist) {
        await removeFromWishlist(productId)
        setInWishlist(false)
        toast({
          title: "Removed from wishlist",
          description: "Item has been removed from your wishlist.",
        })
      } else {
        await addToWishlist(productId)
        setInWishlist(true)
        toast({
          title: "Added to wishlist",
          description: "Item has been added to your wishlist.",
        })
      }
    } catch (error) {
      console.error("Wishlist error:", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={handleClick}
      disabled={loading}
      className={inWishlist ? "text-red-500 border-red-500" : ""}
    >
      <Heart className={`mr-2 h-5 w-5 ${inWishlist ? "fill-current" : ""}`} />
      {inWishlist ? "In Wishlist" : "Add to Wishlist"}
    </Button>
  )
}
