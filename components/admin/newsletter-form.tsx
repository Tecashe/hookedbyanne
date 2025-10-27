// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Switch } from "@/components/ui/switch"
// import { sendBulkNewsletter } from "@/actions/email"
// import { useToast } from "@/hooks/use-toast"
// import { Loader2, Send } from "lucide-react"

// export function NewsletterForm() {
//   const [isLoading, setIsLoading] = useState(false)
//   const [sendToAll, setSendToAll] = useState(false)
//   const { toast } = useToast()

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault()
//     setIsLoading(true)

//     const formData = new FormData(e.currentTarget)
//     formData.append("sendToAll", sendToAll.toString())

//     try {
//       const result = await sendBulkNewsletter(formData)

//       if (result.success) {
//         toast({
//           title: "Newsletter sent!",
//           description: result.message,
//         })
//         e.currentTarget.reset()
//       }
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to send newsletter. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="space-y-2">
//         <Label htmlFor="subject">Subject Line</Label>
//         <Input id="subject" name="subject" placeholder="New arrivals just for you!" required />
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="previewText">Preview Text</Label>
//         <Input id="previewText" name="previewText" placeholder="Check out our latest handmade crochet items..." />
//         <p className="text-xs text-muted-foreground">This appears in the email preview before opening</p>
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="content">Email Content (HTML supported)</Label>
//         <Textarea
//           id="content"
//           name="content"
//           placeholder="<h2>New Arrivals!</h2><p>We're excited to share our latest handmade crochet creations...</p>"
//           rows={10}
//           required
//         />
//         <p className="text-xs text-muted-foreground">You can use HTML tags for formatting</p>
//       </div>

//       <div className="flex items-center space-x-2">
//         <Switch id="sendToAll" checked={sendToAll} onCheckedChange={setSendToAll} />
//         <Label htmlFor="sendToAll">Send to all users (including admins)</Label>
//       </div>

//       <Button type="submit" disabled={isLoading} size="lg">
//         {isLoading ? (
//           <>
//             <Loader2 className="mr-2 h-5 w-5 animate-spin" />
//             Sending...
//           </>
//         ) : (
//           <>
//             <Send className="mr-2 h-5 w-5" />
//             Send Newsletter
//           </>
//         )}
//       </Button>
//     </form>
//   )
// }

"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { sendBulkNewsletter, scheduleNewsletter } from "@/actions/email"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Send, Clock } from "lucide-react"
import { RichTextEditor } from "./rich-text-editor"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function NewsletterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [sendToAll, setSendToAll] = useState(false)
  const [content, setContent] = useState("")
  const { toast } = useToast()

  async function handleSendNow(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    formData.append("sendToAll", sendToAll.toString())
    formData.append("content", content)

    try {
      const result = await sendBulkNewsletter(formData)

      if (result.success) {
        toast({
          title: "Newsletter sent!",
          description: result.message,
        })
        e.currentTarget.reset()
        setContent("")
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

  async function handleSchedule(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    formData.append("content", content)

    try {
      const result = await scheduleNewsletter(formData)

      if (result.success) {
        toast({
          title: "Newsletter scheduled!",
          description: result.message,
        })
        e.currentTarget.reset()
        setContent("")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule newsletter. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Tabs defaultValue="send" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="send">Send Now</TabsTrigger>
        <TabsTrigger value="schedule">Schedule</TabsTrigger>
      </TabsList>

      <TabsContent value="send">
        <form onSubmit={handleSendNow} className="space-y-6">
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
            <Label>Email Content</Label>
            <RichTextEditor
              content={content}
              onChange={setContent}
              placeholder="Write your newsletter content here..."
            />
            <p className="text-xs text-muted-foreground">
              Use the toolbar to format your email with headings, lists, links, and images
            </p>
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
                Send Newsletter Now
              </>
            )}
          </Button>
        </form>
      </TabsContent>

      <TabsContent value="schedule">
        <form onSubmit={handleSchedule} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="subject-schedule">Subject Line</Label>
            <Input id="subject-schedule" name="subject" placeholder="New arrivals just for you!" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="previewText-schedule">Preview Text</Label>
            <Input
              id="previewText-schedule"
              name="previewText"
              placeholder="Check out our latest handmade crochet items..."
            />
          </div>

          <div className="space-y-2">
            <Label>Email Content</Label>
            <RichTextEditor
              content={content}
              onChange={setContent}
              placeholder="Write your newsletter content here..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="scheduledFor">Schedule For</Label>
            <Input id="scheduledFor" name="scheduledFor" type="datetime-local" required />
            <p className="text-xs text-muted-foreground">The newsletter will be sent automatically at this time</p>
          </div>

          <Button type="submit" disabled={isLoading} size="lg">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Scheduling...
              </>
            ) : (
              <>
                <Clock className="mr-2 h-5 w-5" />
                Schedule Newsletter
              </>
            )}
          </Button>
        </form>
      </TabsContent>
    </Tabs>
  )
}
