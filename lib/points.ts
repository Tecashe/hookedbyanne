export const POINTS_CONFIG = {
  EARN_RATE: 10, // 10 points per $1 spent
  REDEEM_RATE: 100, // 100 points = $1 discount
  MIN_REDEEM: 500, // Minimum 500 points to redeem
}

export function calculatePointsEarned(amount: number): number {
  return Math.floor(amount * POINTS_CONFIG.EARN_RATE)
}

export function calculatePointsValue(points: number): number {
  return points / POINTS_CONFIG.REDEEM_RATE
}

export function canRedeemPoints(points: number): boolean {
  return points >= POINTS_CONFIG.MIN_REDEEM
}
