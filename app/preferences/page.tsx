"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, User, Heart, Target, AlertCircle, Utensils } from "lucide-react"
import Link from "next/link"

export default function PreferencesPage() {
  const [preferences, setPreferences] = useState({
    spiceLevel: [2],
    cookingTime: [30],
    healthGoal: "balanced",
    familySize: 2,
    dietaryRestrictions: ["vegetarian"],
    cuisineTypes: ["chinese", "western"],
    notifications: {
      expiry: true,
      recommendations: true,
      cooking: false,
    },
  })

  const spiceLevels = ["No Spice", "Mild", "Medium", "Hot", "Extra Hot"]
  const healthGoals = [
    { id: "weight_loss", name: "Weight Loss", icon: "🔥", color: "bg-red-100 text-red-700" },
    { id: "muscle_gain", name: "Muscle Gain", icon: "💪", color: "bg-blue-100 text-blue-700" },
    { id: "balanced", name: "Balanced Nutrition", icon: "⚖️", color: "bg-green-100 text-green-700" },
    { id: "digestive", name: "Digestive Health", icon: "🫖", color: "bg-yellow-100 text-yellow-700" },
  ]

  const dietaryRestrictions = [
    { id: "vegetarian", name: "Vegetarian", icon: "🥬" },
    { id: "vegan", name: "Vegan", icon: "🌱" },
    { id: "gluten_free", name: "Gluten-Free", icon: "🌾" },
    { id: "dairy_free", name: "Dairy-Free", icon: "🥛" },
    { id: "nut_free", name: "Nut-Free", icon: "🥜" },
    { id: "low_sodium", name: "Low Sodium", icon: "🧂" },
  ]

  const cuisineTypes = [
    { id: "chinese", name: "Chinese", icon: "🥢" },
    { id: "western", name: "Western", icon: "🍽️" },
    { id: "japanese", name: "Japanese", icon: "🍱" },
    { id: "korean", name: "Korean", icon: "🍲" },
    { id: "thai", name: "Thai", icon: "🌶️" },
    { id: "italian", name: "Italian", icon: "🍝" },
  ]

  const toggleDietaryRestriction = (id: string) => {
    setPreferences((prev) => ({
      ...prev,
      dietaryRestrictions: prev.dietaryRestrictions.includes(id)
        ? prev.dietaryRestrictions.filter((item) => item !== id)
        : [...prev.dietaryRestrictions, id],
    }))
  }

  const toggleCuisineType = (id: string) => {
    setPreferences((prev) => ({
      ...prev,
      cuisineTypes: prev.cuisineTypes.includes(id)
        ? prev.cuisineTypes.filter((item) => item !== id)
        : [...prev.cuisineTypes, id],
    }))
  }

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
              <h1 className="text-xl font-semibold text-green-800">My Preferences</h1>
              <p className="text-sm text-green-600">Personalize your cooking experience</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 pb-20">
        {/* Basic Info */}
        <section className="py-6">
          <Card className="border-green-100">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="h-5 w-5 text-green-600" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Family Size</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5, 6].map((size) => (
                    <Button
                      key={size}
                      variant={preferences.familySize === size ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreferences((prev) => ({ ...prev, familySize: size }))}
                      className={
                        preferences.familySize === size
                          ? "bg-green-600 hover:bg-green-700"
                          : "border-green-200 text-green-700"
                      }
                    >
                      {size} people
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Available Cooking Time: {preferences.cookingTime[0]} minutes
                </label>
                <Slider
                  value={preferences.cookingTime}
                  onValueChange={(value) => setPreferences((prev) => ({ ...prev, cookingTime: value }))}
                  max={120}
                  min={10}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>10 minutes</span>
                  <span>120 minutes</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Spice Preference: {spiceLevels[preferences.spiceLevel[0]]}
                </label>
                <Slider
                  value={preferences.spiceLevel}
                  onValueChange={(value) => setPreferences((prev) => ({ ...prev, spiceLevel: value }))}
                  max={4}
                  min={0}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>No Spice</span>
                  <span>Extra Hot</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Health Goals */}
        <section className="py-6">
          <Card className="border-green-100">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-5 w-5 text-green-600" />
                Health Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {healthGoals.map((goal) => (
                  <Button
                    key={goal.id}
                    variant={preferences.healthGoal === goal.id ? "default" : "outline"}
                    className={`h-auto p-3 flex flex-col gap-1 ${
                      preferences.healthGoal === goal.id
                        ? "bg-green-600 hover:bg-green-700"
                        : "border-green-200 text-green-700 hover:bg-green-50"
                    }`}
                    onClick={() => setPreferences((prev) => ({ ...prev, healthGoal: goal.id }))}
                  >
                    <span className="text-lg">{goal.icon}</span>
                    <span className="text-sm">{goal.name}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Dietary Restrictions */}
        <section className="py-6">
          <Card className="border-green-100">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertCircle className="h-5 w-5 text-green-600" />
                Dietary Restrictions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {dietaryRestrictions.map((restriction) => (
                  <Button
                    key={restriction.id}
                    variant={preferences.dietaryRestrictions.includes(restriction.id) ? "default" : "outline"}
                    className={`h-auto p-3 flex flex-col gap-1 ${
                      preferences.dietaryRestrictions.includes(restriction.id)
                        ? "bg-green-600 hover:bg-green-700"
                        : "border-green-200 text-green-700 hover:bg-green-50"
                    }`}
                    onClick={() => toggleDietaryRestriction(restriction.id)}
                  >
                    <span className="text-lg">{restriction.icon}</span>
                    <span className="text-sm">{restriction.name}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Cuisine Preferences */}
        <section className="py-6">
          <Card className="border-green-100">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Utensils className="h-5 w-5 text-green-600" />
                Cuisine Preferences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                {cuisineTypes.map((cuisine) => (
                  <Button
                    key={cuisine.id}
                    variant={preferences.cuisineTypes.includes(cuisine.id) ? "default" : "outline"}
                    className={`h-auto p-3 flex flex-col gap-1 ${
                      preferences.cuisineTypes.includes(cuisine.id)
                        ? "bg-green-600 hover:bg-green-700"
                        : "border-green-200 text-green-700 hover:bg-green-50"
                    }`}
                    onClick={() => toggleCuisineType(cuisine.id)}
                  >
                    <span className="text-lg">{cuisine.icon}</span>
                    <span className="text-sm">{cuisine.name}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Notifications */}
        <section className="py-6">
          <Card className="border-green-100">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Heart className="h-5 w-5 text-green-600" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Ingredient Expiry Alerts</p>
                  <p className="text-sm text-gray-600">Notify me when ingredients are about to expire</p>
                </div>
                <Switch
                  checked={preferences.notifications.expiry}
                  onCheckedChange={(checked) =>
                    setPreferences((prev) => ({
                      ...prev,
                      notifications: { ...prev.notifications, expiry: checked },
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Daily Recommendations</p>
                  <p className="text-sm text-gray-600">Daily personalized recipe suggestions</p>
                </div>
                <Switch
                  checked={preferences.notifications.recommendations}
                  onCheckedChange={(checked) =>
                    setPreferences((prev) => ({
                      ...prev,
                      notifications: { ...prev.notifications, recommendations: checked },
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Cooking Reminders</p>
                  <p className="text-sm text-gray-600">Timer alerts during cooking</p>
                </div>
                <Switch
                  checked={preferences.notifications.cooking}
                  onCheckedChange={(checked) =>
                    setPreferences((prev) => ({
                      ...prev,
                      notifications: { ...prev.notifications, cooking: checked },
                    }))
                  }
                />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Save Button */}
        <div className="py-6">
          <Button className="w-full bg-green-600 hover:bg-green-700 h-12">Save Preferences</Button>
        </div>
      </div>
    </div>
  )
}
