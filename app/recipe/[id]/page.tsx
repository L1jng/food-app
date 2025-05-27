"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Clock,
  Users,
  Heart,
  Share2,
  Play,
  Pause,
  RotateCcw,
  Check,
  ShoppingCart,
  Volume2,
} from "lucide-react"
import Link from "next/link"

export default function RecipeDetailPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [isFavorited, setIsFavorited] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const recipe = {
    id: 1,
    name: "Tomato Egg Noodles",
    image: "/placeholder.svg?height=200&width=400",
    time: "15 mins",
    difficulty: "Easy",
    servings: 2,
    rating: 4.8,
    tags: ["Quick", "Nutritious", "Home-style"],
    description: "Classic home-style noodles with sweet and sour tomatoes and tender eggs, simple yet delicious.",
    ingredients: [
      { name: "Noodles", amount: "200g", available: true },
      { name: "Eggs", amount: "2 pieces", available: true },
      { name: "Tomatoes", amount: "2 pieces", available: true },
      { name: "Green Onions", amount: "1 stalk", available: false },
      { name: "Soy Sauce", amount: "1 tbsp", available: true },
      { name: "Salt", amount: "to taste", available: true },
      { name: "Sugar", amount: "1 tsp", available: true },
      { name: "Cooking Oil", amount: "as needed", available: true },
    ],
    steps: [
      {
        id: 1,
        title: "Prepare Ingredients",
        description: "Cut tomatoes into chunks, beat eggs, and chop green onions",
        time: 3,
        image: "/placeholder.svg?height=120&width=200",
      },
      {
        id: 2,
        title: "Scramble Eggs",
        description: "Heat oil in pan, pour in beaten eggs and scramble until half-cooked, set aside",
        time: 2,
        image: "/placeholder.svg?height=120&width=200",
      },
      {
        id: 3,
        title: "Cook Tomatoes",
        description: "Add a little oil to pan, stir-fry tomato chunks until juicy, season with salt and sugar",
        time: 4,
        image: "/placeholder.svg?height=120&width=200",
      },
      {
        id: 4,
        title: "Cook Noodles",
        description: "Boil water in another pot, cook noodles until 80% done",
        time: 5,
        image: "/placeholder.svg?height=120&width=200",
      },
      {
        id: 5,
        title: "Combine & Stir-fry",
        description: "Add noodles to tomato pan, add scrambled eggs and soy sauce, stir-fry until well combined",
        time: 1,
        image: "/placeholder.svg?height=120&width=200",
      },
    ],
  }

  const availableIngredients = recipe.ingredients.filter((ing) => ing.available).length
  const totalIngredients = recipe.ingredients.length
  const matchRate = Math.round((availableIngredients / totalIngredients) * 100)

  const toggleStepComplete = (stepIndex: number) => {
    if (completedSteps.includes(stepIndex)) {
      setCompletedSteps(completedSteps.filter((i) => i !== stepIndex))
    } else {
      setCompletedSteps([...completedSteps, stepIndex])
    }
  }

  const missingIngredients = recipe.ingredients.filter((ing) => !ing.available)

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-green-700">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className={isFavorited ? "text-red-500" : "text-gray-500"}
                onClick={() => setIsFavorited(!isFavorited)}
              >
                <Heart className={`h-5 w-5 ${isFavorited ? "fill-current" : ""}`} />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-500">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto pb-20">
        {/* Recipe Image */}
        <div className="relative">
          <img src={recipe.image || "/placeholder.svg"} alt={recipe.name} className="w-full h-48 object-cover" />
          <div className="absolute top-4 right-4">
            <Badge className="bg-green-600 text-white">{matchRate}% Match</Badge>
          </div>
        </div>

        <div className="px-4">
          {/* Recipe Info */}
          <div className="py-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{recipe.name}</h1>
            <p className="text-gray-600 mb-4">{recipe.description}</p>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>{recipe.time}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Users className="h-4 w-4" />
                <span>{recipe.servings} servings</span>
              </div>
              <div className="text-sm text-gray-600">Difficulty: {recipe.difficulty}</div>
            </div>

            <div className="flex gap-2 mb-4">
              {recipe.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="border-green-200 text-green-700">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Missing Ingredients Alert */}
          {missingIngredients.length > 0 && (
            <Card className="mb-6 border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <h3 className="font-medium text-orange-800 mb-2">Missing Ingredients</h3>
                <div className="space-y-1 mb-3">
                  {missingIngredients.map((ing, index) => (
                    <div key={index} className="text-sm text-orange-700">
                      • {ing.name} {ing.amount}
                    </div>
                  ))}
                </div>
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Shopping List
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Ingredients */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Ingredients List</h2>
            <Card className="border-green-100">
              <CardContent className="p-4">
                <div className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${ingredient.available ? "bg-green-500" : "bg-gray-300"}`}
                        />
                        <span className={`${ingredient.available ? "text-gray-800" : "text-gray-400"}`}>
                          {ingredient.name}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">{ingredient.amount}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Cooking Steps */}
          <section className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Cooking Steps</h2>
              <Button variant="outline" size="sm" className="border-green-200 text-green-700">
                <Volume2 className="h-4 w-4 mr-2" />
                Voice Guide
              </Button>
            </div>

            <div className="space-y-4">
              {recipe.steps.map((step, index) => (
                <Card
                  key={step.id}
                  className={`border-green-100 transition-all ${
                    currentStep === index ? "ring-2 ring-green-200 bg-green-50" : ""
                  } ${completedSteps.includes(index) ? "opacity-75" : ""}`}
                >
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            completedSteps.includes(index)
                              ? "bg-green-600 text-white"
                              : currentStep === index
                                ? "bg-green-100 text-green-700 border-2 border-green-300"
                                : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {completedSteps.includes(index) ? <Check className="h-4 w-4" /> : index + 1}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-gray-800">{step.title}</h3>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">{step.time} mins</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleStepComplete(index)}
                              className={completedSteps.includes(index) ? "text-green-600" : "text-gray-400"}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{step.description}</p>
                        <img
                          src={step.image || "/placeholder.svg"}
                          alt={step.title}
                          className="w-full h-24 object-cover rounded-md"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Cooking Timer */}
          <Card className="border-green-100 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-green-800">Cooking Timer</h3>
                <div className="text-2xl font-mono text-green-700">
                  {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, "0")}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="border-green-300 text-green-700"
                >
                  {isTimerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTimerSeconds(0)}
                  className="border-green-300 text-green-700"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <div className="flex gap-1">
                  {[5, 10, 15].map((minutes) => (
                    <Button
                      key={minutes}
                      variant="outline"
                      size="sm"
                      onClick={() => setTimerSeconds(minutes * 60)}
                      className="border-green-300 text-green-700 text-xs"
                    >
                      {minutes}min
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
