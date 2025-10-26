import { getCoupons } from "@/actions/coupons"
import { CouponsManager } from "@/components/admin/coupons-manager"

export default async function CouponsPage() {
  const coupons = await getCoupons()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Coupons</h1>
        <p className="text-muted-foreground">Create and manage discount coupons</p>
      </div>

      <CouponsManager coupons={coupons} />
    </div>
  )
}
