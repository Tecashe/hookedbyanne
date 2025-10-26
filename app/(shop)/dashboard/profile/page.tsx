import { getCurrentUser } from "@/lib/clerk"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserProfile } from "@clerk/nextjs"

export default async function ProfilePage() {
  const user = await getCurrentUser()

  if (!user) {
    return null
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your account information and preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent>
          <UserProfile
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none",
              },
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}
