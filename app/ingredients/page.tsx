"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Plus,
  Search,
  Camera,
  Mic,
  QrCode,
  AlertTriangle,
  Calendar,
  Trash2,
  Refrigerator,
} from "lucide-react"
import Link from "next/link"

export default function IngredientsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "All", count: 12 },
    { id: "vegetables", name: "Vegetables", count: 5 },
    { id: "meat", name: "Meat", count: 3 },
    { id: "dairy", name: "Dairy", count: 2 },
    { id: "seasoning", name: "Seasoning", count: 2 },
  ]

  const ingredients = [
    {
      id: 1,
      name: "Eggs",
      category: "dairy",
      quantity: "6 pieces",
      expiryDays: 3,
      image: "/placeholder.svg?height=60&width=60",
      status: "warning",
    },
    {
      id: 2,
      name: "Broccoli",
      category: "vegetables",
      quantity: "1 head",
      expiryDays: 2,
      image: "/placeholder.svg?height=60&width=60",
      status: "urgent",
    },
    {
      id: 3,
      name: "Chicken Breast",
      category: "meat",
      quantity: "500g",
      expiryDays: 5,
      image: "/placeholder.svg?height=60&width=60",
      status: "fresh",
    },
    {
      id: 4,
      name: "Tomatoes",
      category: "vegetables",
      quantity: "3 pieces",
      expiryDays: 4,
      image: "/placeholder.svg?height=60&width=60",
      status: "fresh",
    },
    {
      id: 5,
      name: "Garlic",
      category: "seasoning",
      quantity: "1 bulb",
      expiryDays: 10,
      image: "/placeholder.svg?height=60&width=60",
      status: "fresh",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "urgent":
        return "bg-red-100 text-red-700 border-red-200"
      case "warning":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      default:
        return "bg-green-100 text-green-700 border-green-200"
    }
  }

  const getStatusText = (days: number) => {
    if (days <= 1) return "Expires today"
    if (days <= 3) return `${days} days to expire`
    return `${days} days left`
  }

  const filteredIngredients = ingredients.filter((ingredient) => {
    const matchesSearch = ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || ingredient.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const urgentIngredients = ingredients.filter((item) => item.expiryDays <= 2)

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-green-700">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-green-800">My Ingredients</h1>
              <p className="text-sm text-green-600">Manage your ingredient inventory</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 pb-20">
        {/* Urgent Alert */}
        {urgentIngredients.length > 0 && (
          <div className="py-4">
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <span className="font-medium text-red-800">Expiry Alert</span>
                </div>
                <p className="text-sm text-red-700 mb-3">
                  {urgentIngredients.length} ingredients expiring soon, use them first
                </p>
                <Button size="sm" className="bg-red-600 hover:bg-red-700">
                  View Quick-Use Recipes
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Search Bar */}
        <div className="py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-green-200 focus:border-green-400"
            />
          </div>
        </div>

        {/* Add Ingredients Actions */}
        <div className="py-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Add Ingredients</h3>
          <div className="grid grid-cols-4 gap-2">
            {[
              { icon: Plus, label: "Manual Add", color: "bg-green-100 text-green-700" },
              { icon: Camera, label: "Photo Recognition", color: "bg-blue-100 text-blue-700" },
              { icon: Mic, label: "Voice Input", color: "bg-purple-100 text-purple-700" },
              { icon: QrCode, label: "Scan Barcode", color: "bg-orange-100 text-orange-700" },
            ].map((action, index) => (
              <Button key={index} variant="ghost" className={`h-auto p-3 flex flex-col gap-1 ${action.color}`}>
                <action.icon className="h-5 w-5" />
                <span className="text-xs">{action.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="py-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={`whitespace-nowrap ${
                  selectedCategory === category.id
                    ? "bg-green-600 hover:bg-green-700"
                    : "border-green-200 text-green-700 hover:bg-green-50"
                }`}
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>
        </div>

        {/* Ingredients List */}
        <div className="space-y-3">
          {filteredIngredients.map((ingredient) => (
            <Card key={ingredient.id} className="border-green-100">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <img
                    src={ingredient.image || "/placeholder.svg"}
                    alt={ingredient.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-gray-800">{ingredient.name}</h3>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{ingredient.quantity}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={`text-xs ${getStatusColor(ingredient.status)}`}>
                        <Calendar className="h-3 w-3 mr-1" />
                        {getStatusText(ingredient.expiryDays)}
                      </Badge>
                      <Button variant="ghost" size="sm" className="text-green-600 text-xs">
                        Suggest Recipes
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredIngredients.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Refrigerator className="h-12 w-12 mx-auto" />
            </div>
            <p className="text-gray-500">No ingredients</p>
            <p className="text-sm text-gray-400 mb-4">Add ingredients to start your cooking journey</p>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Add your first ingredient
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
