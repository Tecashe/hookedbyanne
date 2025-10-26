"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"
import { createReview } from "@/actions/reviews"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import Image from "next/image"

type Review = {
  id: string
  rating: number
  comment: string | null
  createdAt: Date
  user: {
    firstName: string | null
    lastName: string | null
    imageUrl: string | null
  }
}

export function ProductReviews({ productId, reviews }: { productId: string; reviews: Review[] }) {
  const { isSignedIn } = useAuth()
  const router = useRouter()
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isSignedIn) {
      router.push("/sign-in")
      return
    }

    setLoading(true)
    try {
      await createReview(productId, rating, comment)
      setComment("")
      setRating(5)
      router.refresh()
    } catch (error) {
      console.error("Review error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-16 space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        <p className="text-muted-foreground">Share your thoughts with other customers</p>
      </div>

      {isSignedIn && (
        <Card>
          <CardHeader>
            <CardTitle>Write a Review</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Rating</label>
                <div className="flex gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setRating(i + 1)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star className={`h-8 w-8 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted"}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="comment" className="mb-2 block text-sm font-medium">
                  Comment (optional)
                </label>
                <Textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience with this product..."
                  rows={4}
                />
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit Review"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
                  {review.user.imageUrl ? (
                    <Image src={review.user.imageUrl || "/placeholder.svg"} alt="User" fill className="object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-lg font-medium">
                      {review.user.firstName?.[0] || "U"}
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="mb-2 flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {review.user.firstName} {review.user.lastName}
                      </p>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {review.comment && <p className="text-muted-foreground">{review.comment}</p>}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
