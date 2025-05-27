"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, Clock, Users, Heart, ChefHat, Sparkles } from "lucide-react"
import Link from "next/link"

export default function RecommendationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<string[]>(["smart"])
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")

  const filterOptions = [
    { id: "smart", name: "Smart Picks", icon: Sparkles, color: "bg-purple-100 text-purple-700" },
    { id: "quick", name: "Quick Meals", icon: Clock, color: "bg-blue-100 text-blue-700" },
    { id: "healthy", name: "Healthy", icon: Heart, color: "bg-green-100 text-green-700" },
    { id: "family", name: "Home-style", icon: Users, color: "bg-orange-100 text-orange-700" },
  ]

  const recommendations = [
    {
      id: 1,
      name: "Garlic Broccoli",
      image: "/placeholder.svg?height=120&width=200",
      time: "10分钟",
      difficulty: "简单",
      servings: 2,
      rating: 4.6,
      tags: ["Light", "Healthy", "Quick"],
      matchRate: 95,
      reason: "Based on your broccoli and garlic",
      calories: 85,
      isNew: false,
    },
    {
      id: 2,
      name: "Pan-fried Chicken Breast",
      image: "/placeholder.svg?height=120&width=200",
      time: "15分钟",
      difficulty: "简单",
      servings: 2,
      rating: 4.8,
      tags: ["High Protein", "Fat Loss"],
      matchRate: 92,
      reason: "Fits your muscle gain goal",
      calories: 165,
      isNew: true,
    },
    {
      id: 3,
      name: "Tomato Egg Soup",
      image: "/placeholder.svg?height=120&width=200",
      time: "12分钟",
      difficulty: "简单",
      servings: 3,
      rating: 4.5,
      tags: ["Soup", "Nutritious", "Home-style"],
      matchRate: 88,
      reason: "Uses your tomatoes and eggs",
      calories: 95,
      isNew: false,
    },
    {
      id: 4,
      name: "Steamed Scallops with Garlic Vermicelli",
      image: "/placeholder.svg?height=120&width=200",
      time: "20分钟",
      difficulty: "中等",
      servings: 2,
      rating: 4.9,
      tags: ["Seafood", "Steamed", "Refined"],
      matchRate: 75,
      reason: "Try new flavors",
      calories: 120,
      isNew: true,
    },
    {
      id: 5,
      name: "Green Pepper Potato Strips",
      image: "/placeholder.svg?height=120&width=200",
      time: "8分钟",
      difficulty: "简单",
      servings: 2,
      rating: 4.3,
      tags: ["Vegetarian", "Goes with rice", "Economical"],
      matchRate: 85,
      reason: "Simple home-style dish",
      calories: 110,
      isNew: false,
    },
  ]

  const toggleFilter = (filterId: string) => {
    setSelectedFilters((prev) => (prev.includes(filterId) ? prev.filter((id) => id !== filterId) : [...prev, filterId]))
  }

  const filteredRecommendations = recommendations.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
              <h1 className="text-xl font-semibold text-green-800">Smart Recommendations</h1>
              <p className="text-sm text-green-600">Curated recipes for you</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 pb-20">
        {/* Search Bar */}
        <div className="py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-green-200 focus:border-green-400"
            />
          </div>
        </div>

        {/* Filter Chips */}
        <div className="py-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {filterOptions.map((filter) => (
              <Button
                key={filter.id}
                variant={selectedFilters.includes(filter.id) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleFilter(filter.id)}
                className={`whitespace-nowrap flex items-center gap-1 ${
                  selectedFilters.includes(filter.id)
                    ? "bg-green-600 hover:bg-green-700"
                    : "border-green-200 text-green-700 hover:bg-green-50"
                }`}
              >
                <filter.icon className="h-3 w-3" />
                {filter.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Smart Recommendation Banner */}
        <Card className="mb-6 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              <span className="font-medium text-purple-800">AI Smart Recommendations</span>
            </div>
            <p className="text-sm text-purple-700 mb-3">
              Recipes recommended based on your ingredient inventory, taste preferences, and health goals
            </p>
            <div className="flex gap-2">
              <Badge variant="outline" className="border-purple-200 text-purple-700 text-xs">
                Ingredient Match 95%
              </Badge>
              <Badge variant="outline" className="border-purple-200 text-purple-700 text-xs">
                Taste Similarity 88%
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations List */}
        <div className="space-y-4">
          {filteredRecommendations.map((recipe, index) => (
            <Card key={recipe.id} className="border-green-100 hover:shadow-md transition-all">
              <CardContent className="p-0">
                <div className="flex">
                  <div className="relative">
                    <img
                      src={recipe.image || "/placeholder.svg"}
                      alt={recipe.name}
                      className="w-24 h-24 object-cover rounded-l-lg"
                    />
                    {recipe.isNew && (
                      <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1">New</Badge>
                    )}
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-gray-800 mb-1">{recipe.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <Clock className="h-3 w-3" />
                          <span>{recipe.time}</span>
                          <span>•</span>
                          <Users className="h-3 w-3" />
                          <span>{recipe.servings} servings</span>
                          <span>•</span>
                          <span>{recipe.calories} cal</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-green-600">{recipe.matchRate}%</div>
                        <div className="text-xs text-gray-500">Match</div>
                      </div>
                    </div>

                    <p className="text-xs text-purple-600 mb-2">{recipe.reason}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        {recipe.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs border-green-200 text-green-700">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${
                                i < Math.floor(recipe.rating) ? "bg-yellow-400" : "bg-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-1">{recipe.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRecommendations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <ChefHat className="h-12 w-12 mx-auto" />
            </div>
            <p className="text-gray-500">No recommended recipes</p>
            <p className="text-sm text-gray-400 mb-4">Try adjusting filters or adding more ingredients</p>
            <Button className="bg-green-600 hover:bg-green-700">
              <Sparkles className="h-4 w-4 mr-2" />
              Refresh Recommendations
            </Button>
          </div>
        )}

        {/* Load More */}
        {filteredRecommendations.length > 0 && (
          <div className="py-6 text-center">
            <Button variant="outline" className="border-green-200 text-green-700">
              Load More Recommendations
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
