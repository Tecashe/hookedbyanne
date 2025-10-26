// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { seedGalleryAndProducts } from "@/actions/seed"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { CheckCircle2, Info } from "lucide-react"

// export default function SetupPage() {
//   return (
//     <div className="container mx-auto py-8 px-4">
//       <Card>
//         <CardHeader>
//           <CardTitle>Initial Setup</CardTitle>
//           <CardDescription>Seed your database with 25 gallery images and 8 featured products</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <form action={seedGalleryAndProducts}>
//             <Button type="submit" size="lg">
//               Seed Gallery Images & Products
//             </Button>
//           </form>

//           <Alert>
//             <Info className="h-4 w-4" />
//             <AlertDescription>
//               This will add 25 beautiful crochet gallery images organized by category (blankets, accessories, clothing,
//               home decor) and 8 new arrival products to your store.
//             </AlertDescription>
//           </Alert>

//           <Alert>
//             <CheckCircle2 className="h-4 w-4" />
//             <AlertDescription>
//               <strong>Where to find your images after seeding:</strong>
//               <ul className="mt-2 ml-4 list-disc space-y-1">
//                 <li>
//                   <strong>Homepage:</strong> Gallery sections with different layouts (grid, slider, masonry, carousel)
//                 </li>
//                 <li>
//                   <strong>Gallery Page:</strong> Visit{" "}
//                   <code className="text-xs bg-muted px-1 py-0.5 rounded">/gallery</code> to see all images with tabs
//                 </li>
//                 <li>
//                   <strong>Admin Dashboard:</strong> Manage images at{" "}
//                   <code className="text-xs bg-muted px-1 py-0.5 rounded">/admin/gallery</code>
//                 </li>
//                 <li>
//                   <strong>Products:</strong> View new arrivals on homepage and at{" "}
//                   <code className="text-xs bg-muted px-1 py-0.5 rounded">/products</code>
//                 </li>
//               </ul>
//             </AlertDescription>
//           </Alert>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }


"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { seedGalleryAndProducts } from "@/actions/seed"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, Info, AlertCircle, Loader2 } from "lucide-react"

export default function SetupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleSeed = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      const formData = new FormData()
      const response = await seedGalleryAndProducts(formData)
      setResult(response)
    } catch (error) {
      setResult({
        success: false,
        message: error instanceof Error ? error.message : "An error occurred",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Initial Setup</CardTitle>
          <CardDescription>Seed your database with 25 gallery images and 8 featured products</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleSeed} size="lg" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Seeding...
              </>
            ) : (
              "Seed Gallery Images & Products"
            )}
          </Button>

          {result && (
            <Alert variant={result.success ? "default" : "destructive"}>
              {result.success ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <AlertDescription>{result.message}</AlertDescription>
            </Alert>
          )}

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              This will add 25 beautiful crochet gallery images organized by category (blankets, accessories, clothing,
              home decor) and 8 new arrival products to your store.
            </AlertDescription>
          </Alert>

          <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>
              <strong>Where to find your images after seeding:</strong>
              <ul className="mt-2 ml-4 list-disc space-y-1">
                <li>
                  <strong>Homepage:</strong> Gallery sections with different layouts (grid, slider, masonry, carousel)
                </li>
                <li>
                  <strong>Gallery Page:</strong> Visit{" "}
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">/gallery</code> to see all images with tabs
                </li>
                <li>
                  <strong>Admin Dashboard:</strong> Manage images at{" "}
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">/admin/gallery</code>
                </li>
                <li>
                  <strong>Products:</strong> View new arrivals on homepage and at{" "}
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">/products</code>
                </li>
              </ul>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}
