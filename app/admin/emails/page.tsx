import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NewsletterForm } from "@/components/admin/newsletter-form"

export default async function EmailsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Email Marketing</h1>
        <p className="text-muted-foreground">Send newsletters and promotional emails to your customers</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Subscribers</CardTitle>
            <CardDescription>Active email subscribers</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Emails Sent</CardTitle>
            <CardDescription>This month</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Open Rate</CardTitle>
            <CardDescription>Average open rate</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Send Newsletter</CardTitle>
          <CardDescription>Create and send a newsletter to all your customers</CardDescription>
        </CardHeader>
        <CardContent>
          <NewsletterForm />
        </CardContent>
      </Card>
    </div>
  )
}
