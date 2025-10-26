"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { sendBulkNewsletter } from "@/actions/email"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Send } from "lucide-react"

export function NewsletterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [sendToAll, setSendToAll] = useState(false)
  const { toast } = useToast()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    formData.append("sendToAll", sendToAll.toString())

    try {
      const result = await sendBulkNewsletter(formData)

      if (result.success) {
        toast({
          title: "Newsletter sent!",
          description: result.message,
        })
        e.currentTarget.reset()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send newsletter. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="subject">Subject Line</Label>
        <Input id="subject" name="subject" placeholder="New arrivals just for you!" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="previewText">Preview Text</Label>
        <Input id="previewText" name="previewText" placeholder="Check out our latest handmade crochet items..." />
        <p className="text-xs text-muted-foreground">This appears in the email preview before opening</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Email Content (HTML supported)</Label>
        <Textarea
          id="content"
          name="content"
          placeholder="<h2>New Arrivals!</h2><p>We're excited to share our latest handmade crochet creations...</p>"
          rows={10}
          required
        />
        <p className="text-xs text-muted-foreground">You can use HTML tags for formatting</p>
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="sendToAll" checked={sendToAll} onCheckedChange={setSendToAll} />
        <Label htmlFor="sendToAll">Send to all users (including admins)</Label>
      </div>

      <Button type="submit" disabled={isLoading} size="lg">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="mr-2 h-5 w-5" />
            Send Newsletter
          </>
        )}
      </Button>
    </form>
  )
}
