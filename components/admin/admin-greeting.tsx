"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

const greetings = [
  { spanish: "Buenos días", english: "Good morning", title: "Mrs. Cashe" },
  { spanish: "Buenos días", english: "Good morning", title: "Ladyluck" },
  { spanish: "Buenos días", english: "Good morning", title: "Señora Cashe" },
  { spanish: "Buenas tardes", english: "Good afternoon", title: "Mrs. Cashe" },
  { spanish: "Buenas tardes", english: "Good afternoon", title: "Ladyluck" },
  { spanish: "Buenas tardes", english: "Good afternoon", title: "Señora Cashe" },
  { spanish: "Buenas noches", english: "Good evening", title: "Mrs. Cashe" },
  { spanish: "Buenas noches", english: "Good evening", title: "Ladyluck" },
  { spanish: "Buenas noches", english: "Good evening", title: "Señora Cashe" },
]

export function AdminGreeting() {
  const [greeting, setGreeting] = useState(greetings[0])

  useEffect(() => {
    const hour = new Date().getHours()
    let timeGreetings = greetings

    if (hour >= 5 && hour < 12) {
      // Morning: Buenos días
      timeGreetings = greetings.filter((g) => g.spanish === "Buenos días")
    } else if (hour >= 12 && hour < 19) {
      // Afternoon: Buenas tardes
      timeGreetings = greetings.filter((g) => g.spanish === "Buenas tardes")
    } else {
      // Evening/Night: Buenas noches
      timeGreetings = greetings.filter((g) => g.spanish === "Buenas noches")
    }

    // Pick a random title from the time-appropriate greetings
    const randomGreeting = timeGreetings[Math.floor(Math.random() * timeGreetings.length)]
    setGreeting(randomGreeting)
  }, [])

  return (
    <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20">
      <CardContent className="p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">
              {greeting.spanish}, {greeting.title}!
            </h2>
            <p className="text-sm text-muted-foreground">{greeting.english}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
