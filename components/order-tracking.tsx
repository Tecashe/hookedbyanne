import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Package, Truck, CheckCircle, Clock } from "lucide-react"

type OrderStatus = "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED"

const statusSteps = [
  { status: "PENDING", label: "Order Placed", icon: Clock },
  { status: "PROCESSING", label: "Processing", icon: Package },
  { status: "SHIPPED", label: "Shipped", icon: Truck },
  { status: "DELIVERED", label: "Delivered", icon: CheckCircle },
]

export function OrderTracking({ status }: { status: OrderStatus }) {
  const currentStepIndex = statusSteps.findIndex((step) => step.status === status)

  if (status === "CANCELLED") {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <Badge variant="destructive" className="mb-2">
              Order Cancelled
            </Badge>
            <p className="text-sm text-muted-foreground">This order has been cancelled</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="relative">
          <div className="absolute left-6 top-8 h-[calc(100%-4rem)] w-0.5 bg-border" />

          <div className="space-y-8">
            {statusSteps.map((step, index) => {
              const isCompleted = index <= currentStepIndex
              const isCurrent = index === currentStepIndex
              const Icon = step.icon

              return (
                <div key={step.status} className="relative flex items-center gap-4">
                  <div
                    className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 ${
                      isCompleted
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="flex-1">
                    <p className={`font-medium ${isCurrent ? "text-primary" : ""}`}>{step.label}</p>
                    {isCurrent && <p className="text-sm text-muted-foreground">Current status</p>}
                  </div>

                  {isCompleted && (
                    <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Completed</Badge>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
