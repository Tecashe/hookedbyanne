"use client"

import type React from "react"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react"

export function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get("search") || "")

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/products?${params.toString()}`)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    handleFilterChange("search", search)
  }

  const clearFilters = () => {
    setSearch("")
    router.push("/products")
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 font-semibold">Search</h3>
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </form>
      </div>

      <div>
        <h3 className="mb-4 font-semibold">Filter</h3>
        <RadioGroup
          value={searchParams.get("filter") || ""}
          onValueChange={(value) => handleFilterChange("filter", value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="" id="all" />
            <Label htmlFor="all">All Products</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="new" id="new" />
            <Label htmlFor="new">New Arrivals</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="featured" id="featured" />
            <Label htmlFor="featured">Featured</Label>
          </div>
        </RadioGroup>
      </div>

      <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
        Clear Filters
      </Button>
    </div>
  )
}
