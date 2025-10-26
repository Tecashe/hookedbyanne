"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Download, RotateCcw, X } from "lucide-react"
import Image from "next/image"
import type { Product } from "@prisma/client"
import { Slider } from "@/components/ui/slider"

interface VirtualTryOnProps {
  products: Product[]
}

export function VirtualTryOn({ products }: VirtualTryOnProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [overlayScale, setOverlayScale] = useState(1)
  const [overlayPosition, setOverlayPosition] = useState({ x: 50, y: 30 })
  const [isDragging, setIsDragging] = useState(false)

  // Filter products suitable for try-on (accessories, clothing)
  const tryOnProducts = products.filter((p) =>
    ["accessories", "clothing", "hats", "scarves"].includes(p.category.toLowerCase()),
  )

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
    } catch (error) {
      console.error("Error accessing camera:", error)
      alert("Unable to access camera. Please check permissions.")
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
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
        ctx.drawImage(video, 0, 0)

        // Draw overlay if product selected
        if (selectedProduct) {
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
        } else {
          setCapturedImage(canvas.toDataURL("image/png"))
        }
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
  }

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedProduct || capturedImage) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setOverlayPosition({ x, y })
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
      <div className="space-y-4">
        <Card>
          <CardContent className="p-6">
            <div className="relative aspect-video overflow-hidden rounded-lg bg-muted" onClick={handleCanvasClick}>
              {!isCameraActive && !capturedImage && (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <Camera className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
                    <p className="mb-4 text-muted-foreground">Start your camera to begin trying on items</p>
                    <Button onClick={startCamera}>
                      <Camera className="mr-2 h-4 w-4" />
                      Start Camera
                    </Button>
                  </div>
                </div>
              )}

              {isCameraActive && !capturedImage && (
                <>
                  <video ref={videoRef} autoPlay playsInline muted className="h-full w-full object-cover" />
                  {selectedProduct && (
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
                </>
              )}

              {capturedImage && (
                <Image src={capturedImage || "/placeholder.svg"} alt="Captured photo" fill className="object-cover" />
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
                    <span className="text-sm text-muted-foreground">{Math.round(overlayScale * 100)}%</span>
                  </div>
                  <Slider
                    value={[overlayScale]}
                    onValueChange={([value]) => setOverlayScale(value)}
                    min={0.5}
                    max={2}
                    step={0.1}
                  />
                </div>
                <p className="text-sm text-muted-foreground">Click on the video to reposition the item</p>
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
              <Button className="mt-3 w-full bg-transparent" variant="outline" asChild>
                <a href={`/products/${selectedProduct.id}`}>View Product</a>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
