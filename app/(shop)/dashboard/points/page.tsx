import { getCurrentUser } from "@/lib/clerk"
import { prisma } from "@/lib/db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, TrendingUp, TrendingDown, Info } from "lucide-react"
import { POINTS_CONFIG, calculatePointsValue } from "@/lib/points"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default async function PointsPage() {
  const user = await getCurrentUser()

  if (!user) {
    return null
  }

  const pointsHistory = await prisma.pointsHistory.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  })

  const totalEarned = pointsHistory.filter((p) => p.type === "EARNED").reduce((sum, p) => sum + p.points, 0)

  const totalRedeemed = pointsHistory
    .filter((p) => p.type === "REDEEMED")
    .reduce((sum, p) => sum + Math.abs(p.points), 0)

  const pointsValue = calculatePointsValue(user.points)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Points & Rewards</h1>
        <p className="text-muted-foreground">Earn points with every purchase and redeem them for discounts</p>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Earn {POINTS_CONFIG.EARN_RATE} points for every $1 spent. Redeem {POINTS_CONFIG.REDEEM_RATE} points for $1 off
          your order (minimum {POINTS_CONFIG.MIN_REDEEM} points required).
        </AlertDescription>
      </Alert>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Current Points</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{user.points}</div>
            <p className="text-sm text-muted-foreground">Worth ${pointsValue.toFixed(2)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalEarned}</div>
            <p className="text-sm text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Redeemed</CardTitle>
            <TrendingDown className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalRedeemed}</div>
            <p className="text-sm text-muted-foreground">All time</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Points History</CardTitle>
        </CardHeader>
        <CardContent>
          {pointsHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Star className="mb-4 h-12 w-12 text-muted-foreground" />
              <p className="mb-2 text-lg font-medium">No points history yet</p>
              <p className="text-muted-foreground">Start shopping to earn reward points</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pointsHistory.map((history) => (
                <div key={history.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    {history.type === "EARNED" ? (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
                        <TrendingUp className="h-5 w-5 text-green-500" />
                      </div>
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10">
                        <TrendingDown className="h-5 w-5 text-orange-500" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{history.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(history.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Badge
                    className={
                      history.type === "EARNED"
                        ? "bg-green-500/10 text-green-500 border-green-500/20"
                        : "bg-orange-500/10 text-orange-500 border-orange-500/20"
                    }
                  >
                    {history.points > 0 ? "+" : ""}
                    {history.points} pts
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
