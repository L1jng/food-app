"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ChefHat, Refrigerator, Heart, Settings, Search, Plus } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("home")

  const todayRecommendations = [
    {
      id: 1,
      name: "Tomato Egg Noodles",
      image: "/placeholder.svg?height=120&width=200",
      time: "15 mins",
      difficulty: "Easy",
      tags: ["Quick", "Nutritious"],
      matchRate: 95,
    },
    {
      id: 2,
      name: "Garlic Broccoli",
      image: "/placeholder.svg?height=120&width=200",
      time: "10 mins",
      difficulty: "Easy",
      tags: ["Light", "Healthy"],
      matchRate: 88,
    },
    {
      id: 3,
      name: "Braised Pork Ribs",
      image: "/placeholder.svg?height=120&width=200",
      time: "45 mins",
      difficulty: "Medium",
      tags: ["Home-style", "Goes with rice"],
      matchRate: 82,
    },
  ]

  const quickActions = [
    { icon: Refrigerator, label: "My Ingredients", count: 12, href: "/ingredients" },
    { icon: Clock, label: "15-min Quick", count: 24, href: "/quick-recipes" },
    { icon: Heart, label: "My Favorites", count: 8, href: "/favorites" },
    { icon: Settings, label: "Taste Preferences", href: "/preferences" },
  ]

  const inspirationCategories = [
    { name: "Breakfast Ideas", image: "/placeholder.svg?height=80&width=80", count: 32 },
    { name: "Lunch Box Recipes", image: "/placeholder.svg?height=80&width=80", count: 28 },
    { name: "Family Dinner", image: "/placeholder.svg?height=80&width=80", count: 45 },
    { name: "Holiday Specials", image: "/placeholder.svg?height=80&width=80", count: 18 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-green-800">Today's Recipes</h1>
              <p className="text-sm text-green-600">Inspiration for every meal</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-green-700">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-green-700">
                <Plus className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 pb-20">
        {/* Today's Recommendations Banner */}
        <section className="py-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Today's Recommendations</h2>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              Based on your ingredients
            </Badge>
          </div>

          <div className="space-y-3">
            {todayRecommendations.map((recipe, index) => (
              <Card key={recipe.id} className="overflow-hidden border-green-100 hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="flex">
                    <img
                      src={recipe.image || "/placeholder.svg"}
                      alt={recipe.name}
                      className="w-20 h-20 object-cover"
                    />
                    <div className="flex-1 p-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-gray-800 mb-1">{recipe.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                            <Clock className="h-3 w-3" />
                            <span>{recipe.time}</span>
                            <span>•</span>
                            <span>{recipe.difficulty}</span>
                          </div>
                          <div className="flex gap-1">
                            {recipe.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs border-green-200 text-green-700">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-green-600">{recipe.matchRate}%</div>
                          <div className="text-xs text-gray-500">Match</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Access</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <Card className="border-green-100 hover:shadow-md transition-all hover:scale-105">
                  <CardContent className="p-4 text-center">
                    <action.icon className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-medium text-gray-800 mb-1">{action.label}</h3>
                    {action.count && <p className="text-sm text-green-600">{action.count} items</p>}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Inspiration Categories */}
        <section className="py-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recipe Inspiration</h2>
          <div className="grid grid-cols-2 gap-3">
            {inspirationCategories.map((category, index) => (
              <Card key={index} className="border-green-100 hover:shadow-md transition-all hover:scale-105">
                <CardContent className="p-3">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-20 object-cover rounded-md mb-2"
                  />
                  <h3 className="font-medium text-gray-800 text-sm">{category.name}</h3>
                  <p className="text-xs text-green-600">{category.count} recipes</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-green-100">
        <div className="max-w-md mx-auto px-4">
          <div className="flex justify-around py-2">
            {[
              { id: "home", icon: ChefHat, label: "Home", href: "/" },
              { id: "ingredients", icon: Refrigerator, label: "Ingredients", href: "/ingredients" },
              { id: "recipes", icon: Search, label: "Recommendations", href: "/recommendations" },
              { id: "profile", icon: Settings, label: "Profile", href: "/profile" },
            ].map((item) => (
              <Link key={item.id} href={item.href}>
                <button
                  className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                    activeTab === item.id ? "text-green-600 bg-green-50" : "text-gray-500 hover:text-green-600"
                  }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <item.icon className="h-5 w-5 mb-1" />
                  <span className="text-xs">{item.label}</span>
                </button>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  )
}
