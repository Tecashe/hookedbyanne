// "use client"

// import type React from "react"

// import { useState, useRef, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Camera, Download, RotateCcw, X } from "lucide-react"
// import Image from "next/image"
// import type { Product } from "@prisma/client"
// import { Slider } from "@/components/ui/slider"

// interface VirtualTryOnProps {
//   products: Product[]
// }

// export function VirtualTryOn({ products }: VirtualTryOnProps) {
//   const videoRef = useRef<HTMLVideoElement>(null)
//   const canvasRef = useRef<HTMLCanvasElement>(null)
//   const [stream, setStream] = useState<MediaStream | null>(null)
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
//   const [isCameraActive, setIsCameraActive] = useState(false)
//   const [capturedImage, setCapturedImage] = useState<string | null>(null)
//   const [overlayScale, setOverlayScale] = useState(1)
//   const [overlayPosition, setOverlayPosition] = useState({ x: 50, y: 30 })
//   const [isDragging, setIsDragging] = useState(false)

//   // Filter products suitable for try-on (accessories, clothing)
//   const tryOnProducts = products.filter((p) =>
//     ["accessories", "clothing", "hats", "scarves"].includes(p.category.toLowerCase()),
//   )

//   const startCamera = async () => {
//     try {
//       const mediaStream = await navigator.mediaDevices.getUserMedia({
//         video: { facingMode: "user", width: 1280, height: 720 },
//         audio: false,
//       })
//       setStream(mediaStream)
//       if (videoRef.current) {
//         videoRef.current.srcObject = mediaStream
//       }
//       setIsCameraActive(true)
//       setCapturedImage(null)
//     } catch (error) {
//       console.error("Error accessing camera:", error)
//       alert("Unable to access camera. Please check permissions.")
//     }
//   }

//   const stopCamera = () => {
//     if (stream) {
//       stream.getTracks().forEach((track) => track.stop())
//       setStream(null)
//     }
//     setIsCameraActive(false)
//   }

//   const capturePhoto = () => {
//     if (canvasRef.current && videoRef.current) {
//       const canvas = canvasRef.current
//       const video = videoRef.current
//       canvas.width = video.videoWidth
//       canvas.height = video.videoHeight
//       const ctx = canvas.getContext("2d")
//       if (ctx) {
//         ctx.drawImage(video, 0, 0)

//         // Draw overlay if product selected
//         if (selectedProduct) {
//           const img = new window.Image()
//           img.crossOrigin = "anonymous"
//           img.src = selectedProduct.images[0] || "/placeholder.svg"
//           img.onload = () => {
//             const overlayWidth = (canvas.width * overlayScale) / 3
//             const overlayHeight = (canvas.height * overlayScale) / 3
//             const x = (canvas.width * overlayPosition.x) / 100 - overlayWidth / 2
//             const y = (canvas.height * overlayPosition.y) / 100 - overlayHeight / 2
//             ctx.drawImage(img, x, y, overlayWidth, overlayHeight)
//             setCapturedImage(canvas.toDataURL("image/png"))
//           }
//         } else {
//           setCapturedImage(canvas.toDataURL("image/png"))
//         }
//       }
//     }
//   }

//   const downloadPhoto = () => {
//     if (capturedImage) {
//       const link = document.createElement("a")
//       link.download = `hookedbyann-tryon-${Date.now()}.png`
//       link.href = capturedImage
//       link.click()
//     }
//   }

//   const resetTryOn = () => {
//     setCapturedImage(null)
//     setSelectedProduct(null)
//     setOverlayScale(1)
//     setOverlayPosition({ x: 50, y: 30 })
//   }

//   useEffect(() => {
//     return () => {
//       stopCamera()
//     }
//   }, [])

//   const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (!selectedProduct || capturedImage) return
//     const rect = e.currentTarget.getBoundingClientRect()
//     const x = ((e.clientX - rect.left) / rect.width) * 100
//     const y = ((e.clientY - rect.top) / rect.height) * 100
//     setOverlayPosition({ x, y })
//   }

//   return (
//     <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
//       <div className="space-y-4">
//         <Card>
//           <CardContent className="p-6">
//             <div className="relative aspect-video overflow-hidden rounded-lg bg-muted" onClick={handleCanvasClick}>
//               {!isCameraActive && !capturedImage && (
//                 <div className="flex h-full items-center justify-center">
//                   <div className="text-center">
//                     <Camera className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
//                     <p className="mb-4 text-muted-foreground">Start your camera to begin trying on items</p>
//                     <Button onClick={startCamera}>
//                       <Camera className="mr-2 h-4 w-4" />
//                       Start Camera
//                     </Button>
//                   </div>
//                 </div>
//               )}

//               {isCameraActive && !capturedImage && (
//                 <>
//                   <video ref={videoRef} autoPlay playsInline muted className="h-full w-full object-cover" />
//                   {selectedProduct && (
//                     <div
//                       className="pointer-events-none absolute"
//                       style={{
//                         left: `${overlayPosition.x}%`,
//                         top: `${overlayPosition.y}%`,
//                         transform: `translate(-50%, -50%) scale(${overlayScale})`,
//                         width: "33%",
//                         aspectRatio: "1",
//                       }}
//                     >
//                       <Image
//                         src={selectedProduct.images[0] || "/placeholder.svg"}
//                         alt={selectedProduct.name}
//                         fill
//                         className="object-contain opacity-80"
//                       />
//                     </div>
//                   )}
//                 </>
//               )}

//               {capturedImage && (
//                 <Image src={capturedImage || "/placeholder.svg"} alt="Captured photo" fill className="object-cover" />
//               )}

//               <canvas ref={canvasRef} className="hidden" />
//             </div>

//             <div className="mt-4 flex flex-wrap gap-2">
//               {!capturedImage && isCameraActive && (
//                 <>
//                   <Button onClick={capturePhoto} disabled={!selectedProduct}>
//                     <Camera className="mr-2 h-4 w-4" />
//                     Capture Photo
//                   </Button>
//                   <Button variant="outline" onClick={stopCamera}>
//                     <X className="mr-2 h-4 w-4" />
//                     Stop Camera
//                   </Button>
//                 </>
//               )}

//               {capturedImage && (
//                 <>
//                   <Button onClick={downloadPhoto}>
//                     <Download className="mr-2 h-4 w-4" />
//                     Download Photo
//                   </Button>
//                   <Button variant="outline" onClick={resetTryOn}>
//                     <RotateCcw className="mr-2 h-4 w-4" />
//                     Try Again
//                   </Button>
//                   <Button variant="outline" onClick={startCamera}>
//                     <Camera className="mr-2 h-4 w-4" />
//                     Take Another
//                   </Button>
//                 </>
//               )}
//             </div>
//           </CardContent>
//         </Card>

//         {selectedProduct && isCameraActive && !capturedImage && (
//           <Card>
//             <CardContent className="p-6">
//               <h3 className="mb-4 font-semibold">Adjust Overlay</h3>
//               <div className="space-y-4">
//                 <div>
//                   <div className="mb-2 flex items-center justify-between">
//                     <label className="text-sm font-medium">Size</label>
//                     <span className="text-sm text-muted-foreground">{Math.round(overlayScale * 100)}%</span>
//                   </div>
//                   <Slider
//                     value={[overlayScale]}
//                     onValueChange={([value]) => setOverlayScale(value)}
//                     min={0.5}
//                     max={2}
//                     step={0.1}
//                   />
//                 </div>
//                 <p className="text-sm text-muted-foreground">Click on the video to reposition the item</p>
//               </div>
//             </CardContent>
//           </Card>
//         )}
//       </div>

//       <div className="space-y-4">
//         <Card>
//           <CardContent className="p-4">
//             <h3 className="mb-4 font-semibold">Select Item to Try On</h3>
//             <div className="space-y-2 max-h-[600px] overflow-y-auto">
//               {tryOnProducts.map((product) => (
//                 <button
//                   key={product.id}
//                   onClick={() => setSelectedProduct(product)}
//                   className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors hover:bg-muted ${
//                     selectedProduct?.id === product.id ? "border-primary bg-primary/5" : ""
//                   }`}
//                 >
//                   <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
//                     <Image
//                       src={product.images[0] || "/placeholder.svg"}
//                       alt={product.name}
//                       fill
//                       className="object-cover"
//                     />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="font-medium text-sm truncate">{product.name}</p>
//                     <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
//                     <Badge variant="secondary" className="mt-1 text-xs">
//                       {product.category}
//                     </Badge>
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         {selectedProduct && (
//           <Card>
//             <CardContent className="p-4">
//               <h3 className="mb-2 font-semibold">Selected Item</h3>
//               <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
//                 <Image
//                   src={selectedProduct.images[0] || "/placeholder.svg"}
//                   alt={selectedProduct.name}
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//               <div className="mt-3">
//                 <p className="font-medium">{selectedProduct.name}</p>
//                 <p className="text-lg font-bold text-primary">${selectedProduct.price.toFixed(2)}</p>
//               </div>
//               <Button className="mt-3 w-full bg-transparent" variant="outline" asChild>
//                 <a href={`/products/${selectedProduct.id}`}>View Product</a>
//               </Button>
//             </CardContent>
//           </Card>
//         )}
//       </div>
//     </div>
//   )
// }

"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, Download, RotateCcw, X, Sparkles } from "lucide-react"
import Image from "next/image"
import { Slider } from "@/components/ui/slider"

// Mock Product type - replace with your actual Prisma type
interface Product {
  id: string
  name: string
  price: number
  images: string[]
  category: string
}

interface VirtualTryOnProps {
  products: Product[]
}

export function VirtualTryOnEnhanced({ products }: VirtualTryOnProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number | undefined>(undefined)
  
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [overlayScale, setOverlayScale] = useState(1)
  const [overlayPosition, setOverlayPosition] = useState({ x: 50, y: 30 })
  const [tryOnMode, setTryOnMode] = useState<"simple" | "ar">("simple")
  const [faceMesh, setFaceMesh] = useState<any>(null)
  const [isARLoaded, setIsARLoaded] = useState(false)
  const [productImage, setProductImage] = useState<HTMLImageElement | null>(null)

  const tryOnProducts = products.filter((p) =>
    ["accessories", "clothing", "hats", "scarves", "headwear"].some(cat => 
      p.category.toLowerCase().includes(cat)
    )
  )

  // Load MediaPipe FaceMesh for AR mode
  useEffect(() => {
    if (tryOnMode === "ar" && !faceMesh) {
      loadFaceMesh()
    }
  }, [tryOnMode])

  const loadFaceMesh = async () => {
    try {
      // Dynamically import MediaPipe
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js'
      script.async = true
      
      script.onload = () => {
        const script2 = document.createElement('script')
        script2.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js'
        script2.async = true
        
        script2.onload = () => {
          initializeFaceMesh()
        }
        
        document.body.appendChild(script2)
      }
      
      document.body.appendChild(script)
    } catch (error) {
      console.error("Error loading FaceMesh:", error)
    }
  }

  const initializeFaceMesh = () => {
    try {
      // @ts-ignore - MediaPipe global
      const FaceMesh = window.FaceMesh
      
      const mesh = new FaceMesh({
        locateFile: (file: string) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
        }
      })

      mesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
      })

      mesh.onResults(onFaceMeshResults)
      setFaceMesh(mesh)
      setIsARLoaded(true)
    } catch (error) {
      console.error("Error initializing FaceMesh:", error)
    }
  }

  const onFaceMeshResults = (results: any) => {
    if (!overlayCanvasRef.current || !selectedProduct || !productImage) return

    const canvas = overlayCanvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
      const landmarks = results.multiFaceLandmarks[0]
      
      // Get key face points for positioning
      // Landmark indices: 10 = forehead center, 234 = left temple, 454 = right temple
      const forehead = landmarks[10]
      const leftTemple = landmarks[234]
      const rightTemple = landmarks[454]
      const chin = landmarks[152]
      
      // Calculate head width and position
      const headWidth = Math.abs(rightTemple.x - leftTemple.x) * canvas.width
      const headHeight = Math.abs(chin.y - forehead.y) * canvas.height
      
      // Position based on product category
      let drawX, drawY, drawWidth, drawHeight
      
      if (selectedProduct.category.toLowerCase().includes('hat')) {
        // Position on top of head
        drawWidth = headWidth * 1.4 * overlayScale
        drawHeight = drawWidth // Keep aspect ratio
        drawX = forehead.x * canvas.width - drawWidth / 2
        drawY = forehead.y * canvas.height - drawHeight * 0.8
      } else if (selectedProduct.category.toLowerCase().includes('scarf')) {
        // Position around neck
        const neckY = landmarks[152].y * canvas.height // Chin
        drawWidth = headWidth * 1.6 * overlayScale
        drawHeight = drawWidth * 0.6
        drawX = forehead.x * canvas.width - drawWidth / 2
        drawY = neckY + 20
      } else {
        // Default: centered on face
        drawWidth = headWidth * 1.2 * overlayScale
        drawHeight = drawWidth
        drawX = forehead.x * canvas.width - drawWidth / 2
        drawY = forehead.y * canvas.height - drawHeight / 2
      }
      
      // Draw with transparency
      ctx.globalAlpha = 0.85
      ctx.drawImage(productImage, drawX, drawY, drawWidth, drawHeight)
      ctx.globalAlpha = 1.0
    }
  }

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 1280, height: 720 },
        audio: false,
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
      setIsCameraActive(true)
      setCapturedImage(null)

      // Start AR tracking if in AR mode
      if (tryOnMode === "ar" && faceMesh && videoRef.current) {
        startARTracking()
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      alert("Unable to access camera. Please check permissions.")
    }
  }

  const startARTracking = async () => {
    if (!faceMesh || !videoRef.current) return

    // @ts-ignore - MediaPipe Camera
    const camera = new window.Camera(videoRef.current, {
      onFrame: async () => {
        if (videoRef.current) {
          await faceMesh.send({ image: videoRef.current })
        }
      },
      width: 1280,
      height: 720
    })
    camera.start()
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    setIsCameraActive(false)
  }

  const capturePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext("2d")
      if (ctx) {
        // Draw video frame
        ctx.drawImage(video, 0, 0)

        // Draw overlay from AR canvas or simple overlay
        if (tryOnMode === "ar" && overlayCanvasRef.current) {
          ctx.drawImage(overlayCanvasRef.current, 0, 0)
        } else if (selectedProduct) {
          // Simple mode overlay
          const img = new window.Image()
          img.crossOrigin = "anonymous"
          img.src = selectedProduct.images[0] || "/placeholder.svg"
          img.onload = () => {
            const overlayWidth = (canvas.width * overlayScale) / 3
            const overlayHeight = (canvas.height * overlayScale) / 3
            const x = (canvas.width * overlayPosition.x) / 100 - overlayWidth / 2
            const y = (canvas.height * overlayPosition.y) / 100 - overlayHeight / 2
            ctx.drawImage(img, x, y, overlayWidth, overlayHeight)
            setCapturedImage(canvas.toDataURL("image/png"))
          }
          return
        }
        setCapturedImage(canvas.toDataURL("image/png"))
      }
    }
  }

  const downloadPhoto = () => {
    if (capturedImage) {
      const link = document.createElement("a")
      link.download = `hookedbyann-tryon-${Date.now()}.png`
      link.href = capturedImage
      link.click()
    }
  }

  const resetTryOn = () => {
    setCapturedImage(null)
    setSelectedProduct(null)
    setOverlayScale(1)
    setOverlayPosition({ x: 50, y: 30 })
    setProductImage(null)
  }

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedProduct || capturedImage || tryOnMode === "ar") return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setOverlayPosition({ x, y })
  }

  // Load product image when selected
  useEffect(() => {
    if (selectedProduct && selectedProduct.images[0]) {
      const img = new window.Image()
      img.crossOrigin = "anonymous"
      img.src = selectedProduct.images[0]
      img.onload = () => setProductImage(img)
    }
  }, [selectedProduct])

  // Setup overlay canvas dimensions
  useEffect(() => {
    if (overlayCanvasRef.current && videoRef.current && isCameraActive) {
      const updateCanvasSize = () => {
        if (overlayCanvasRef.current && videoRef.current) {
          overlayCanvasRef.current.width = videoRef.current.videoWidth
          overlayCanvasRef.current.height = videoRef.current.videoHeight
        }
      }
      
      if (videoRef.current.readyState >= 2) {
        updateCanvasSize()
      } else {
        videoRef.current.addEventListener('loadedmetadata', updateCanvasSize)
      }
    }
  }, [isCameraActive])

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
      <div className="space-y-4">
        <Card>
          <CardContent className="p-6">
            <Tabs value={tryOnMode} onValueChange={(v) => setTryOnMode(v as "simple" | "ar")}>
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="simple">Simple Mode</TabsTrigger>
                <TabsTrigger value="ar">
                  <Sparkles className="mr-2 h-4 w-4" />
                  AR Mode {!isARLoaded && "(Loading...)"}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="simple" className="mt-0">
                <p className="text-sm text-muted-foreground mb-4">
                  Position the item manually by clicking on the video
                </p>
              </TabsContent>

              <TabsContent value="ar" className="mt-0">
                <p className="text-sm text-muted-foreground mb-4">
                  AI-powered face tracking for realistic try-on experience
                </p>
              </TabsContent>
            </Tabs>

            <div className="relative aspect-video overflow-hidden rounded-lg bg-muted" onClick={handleCanvasClick}>
              {!isCameraActive && !capturedImage && (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <Camera className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
                    <p className="mb-4 text-muted-foreground">
                      Start your camera to begin trying on items
                    </p>
                    <Button onClick={startCamera} disabled={tryOnMode === "ar" && !isARLoaded}>
                      <Camera className="mr-2 h-4 w-4" />
                      {tryOnMode === "ar" && !isARLoaded ? "Loading AR..." : "Start Camera"}
                    </Button>
                  </div>
                </div>
              )}

              {isCameraActive && !capturedImage && (
                <div className="relative h-full w-full">
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    muted 
                    className="h-full w-full object-cover scale-x-[-1]"
                  />
                  
                  {/* AR Overlay Canvas */}
                  {tryOnMode === "ar" && (
                    <canvas
                      ref={overlayCanvasRef}
                      className="absolute top-0 left-0 h-full w-full scale-x-[-1] pointer-events-none"
                    />
                  )}
                  
                  {/* Simple Mode Overlay */}
                  {tryOnMode === "simple" && selectedProduct && (
                    <div
                      className="pointer-events-none absolute"
                      style={{
                        left: `${overlayPosition.x}%`,
                        top: `${overlayPosition.y}%`,
                        transform: `translate(-50%, -50%) scale(${overlayScale})`,
                        width: "33%",
                        aspectRatio: "1",
                      }}
                    >
                      <Image
                        src={selectedProduct.images[0] || "/placeholder.svg"}
                        alt={selectedProduct.name}
                        fill
                        className="object-contain opacity-80"
                      />
                    </div>
                  )}
                </div>
              )}

              {capturedImage && (
                <Image 
                  src={capturedImage} 
                  alt="Captured photo" 
                  fill 
                  className="object-cover" 
                />
              )}

              <canvas ref={canvasRef} className="hidden" />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {!capturedImage && isCameraActive && (
                <>
                  <Button onClick={capturePhoto} disabled={!selectedProduct}>
                    <Camera className="mr-2 h-4 w-4" />
                    Capture Photo
                  </Button>
                  <Button variant="outline" onClick={stopCamera}>
                    <X className="mr-2 h-4 w-4" />
                    Stop Camera
                  </Button>
                </>
              )}

              {capturedImage && (
                <>
                  <Button onClick={downloadPhoto}>
                    <Download className="mr-2 h-4 w-4" />
                    Download Photo
                  </Button>
                  <Button variant="outline" onClick={resetTryOn}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Try Again
                  </Button>
                  <Button variant="outline" onClick={startCamera}>
                    <Camera className="mr-2 h-4 w-4" />
                    Take Another
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {selectedProduct && isCameraActive && !capturedImage && (
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 font-semibold">Adjust Overlay</h3>
              <div className="space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-medium">Size</label>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(overlayScale * 100)}%
                    </span>
                  </div>
                  <Slider
                    value={[overlayScale]}
                    onValueChange={([value]) => setOverlayScale(value)}
                    min={0.5}
                    max={2}
                    step={0.1}
                  />
                </div>
                {tryOnMode === "simple" && (
                  <p className="text-sm text-muted-foreground">
                    Click on the video to reposition the item
                  </p>
                )}
                {tryOnMode === "ar" && (
                  <p className="text-sm text-muted-foreground">
                    Item will automatically track your face
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="space-y-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="mb-4 font-semibold">Select Item to Try On</h3>
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {tryOnProducts.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No try-on items available. Add products with categories like "hats", "scarves", or "accessories".
                </p>
              )}
              {tryOnProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors hover:bg-muted ${
                    selectedProduct?.id === product.id ? "border-primary bg-primary/5" : ""
                  }`}
                >
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                    <Image
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{product.name}</p>
                    <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                    <Badge variant="secondary" className="mt-1 text-xs">
                      {product.category}
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {selectedProduct && (
          <Card>
            <CardContent className="p-4">
              <h3 className="mb-2 font-semibold">Selected Item</h3>
              <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                <Image
                  src={selectedProduct.images[0] || "/placeholder.svg"}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-3">
                <p className="font-medium">{selectedProduct.name}</p>
                <p className="text-lg font-bold text-primary">${selectedProduct.price.toFixed(2)}</p>
              </div>
              <Button className="mt-3 w-full" variant="outline" asChild>
                <a href={`/products/${selectedProduct.id}`}>View Product</a>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}