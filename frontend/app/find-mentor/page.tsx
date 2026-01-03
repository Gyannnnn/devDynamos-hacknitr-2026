"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { mentors } from "@/lib/data"
import { recommendMentors, type StudentProfile, type MentorProfile, type Level, type LearningStyle } from "@/lib/recommender"
import { Star, Users, MapPin, Zap } from "lucide-react"

export default function FindMentorPage() {
  const [studentProfile, setStudentProfile] = useState<StudentProfile>({
    goals: [""],
    level: "beginner",
    interests: [""],
    learningStyle: "mixed",
  })

  const [recommendations, setRecommendations] = useState<ReturnType<typeof recommendMentors> | null>(null)
  const [submitted, setSubmitted] = useState(false)

  // Convert existing mentors to MentorProfile format
  const mentorProfiles: MentorProfile[] = mentors.map((m) => ({
    id: m.id,
    name: m.name,
    expertise: [m.field],
    experienceLevel: m.followers > 1000 ? "advanced" : m.followers > 500 ? "intermediate" : "beginner",
    teachingStyle: "mixed",
    rating: m.rating,
  }))

  const handleGoalChange = (index: number, value: string) => {
    const updated = [...studentProfile.goals]
    updated[index] = value
    setStudentProfile({ ...studentProfile, goals: updated })
  }

  const handleInterestChange = (index: number, value: string) => {
    const updated = [...studentProfile.interests]
    updated[index] = value
    setStudentProfile({ ...studentProfile, interests: updated })
  }

  const addGoal = () => {
    setStudentProfile({
      ...studentProfile,
      goals: [...studentProfile.goals, ""],
    })
  }

  const addInterest = () => {
    setStudentProfile({
      ...studentProfile,
      interests: [...studentProfile.interests, ""],
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const results = recommendMentors(studentProfile, mentorProfiles, 3)
    setRecommendations(results)
    setSubmitted(true)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3 flex items-center justify-center gap-2">
          <Zap className="h-8 w-8 text-blue-600" />
          Find the Right Mentor Using AI
        </h1>
        <p className="text-lg text-gray-600">
          Connect with experienced mentors for guidance in your academic journey
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>Tell us about your learning goals</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Level */}
                <div className="space-y-2">
                  <Label htmlFor="level">Current Level</Label>
                  <Select
                    value={studentProfile.level}
                    onValueChange={(v) =>
                      setStudentProfile({ ...studentProfile, level: v as Level })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Learning Style */}
                <div className="space-y-2">
                  <Label htmlFor="learning-style">Learning Style</Label>
                  <Select
                    value={studentProfile.learningStyle || "mixed"}
                    onValueChange={(v) =>
                      setStudentProfile({ ...studentProfile, learningStyle: v as LearningStyle })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="visual">Visual</SelectItem>
                      <SelectItem value="auditory">Auditory</SelectItem>
                      <SelectItem value="reading">Reading/Writing</SelectItem>
                      <SelectItem value="kinesthetic">Kinesthetic</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Goals */}
                <div className="space-y-2">
                  <Label>Learning Goals</Label>
                  {studentProfile.goals.map((goal, index) => (
                    <Input
                      key={index}
                      placeholder="e.g., Learn React, Build projects"
                      value={goal}
                      onChange={(e) => handleGoalChange(index, e.target.value)}
                    />
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addGoal}
                    className="w-full"
                  >
                    + Add Goal
                  </Button>
                </div>

                {/* Interests */}
                <div className="space-y-2">
                  <Label>Interests</Label>
                  {studentProfile.interests.map((interest, index) => (
                    <Input
                      key={index}
                      placeholder="e.g., Web Development, AI/ML"
                      value={interest}
                      onChange={(e) => handleInterestChange(index, e.target.value)}
                    />
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addInterest}
                    className="w-full"
                  >
                    + Add Interest
                  </Button>
                </div>

                <Button type="submit" className="w-full">
                  Find Mentors
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2">
          {submitted && recommendations ? (
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-2">
                  <Zap className="h-5 w-5 text-blue-600" />
                  AI Matched Mentors for You
                </h2>
                <p className="text-sm text-gray-600">
                  Matched based on your goals & learning style
                </p>
              </div>

              {recommendations.length > 0 ? (
                recommendations.map((result, idx) => {
                  const mentor = mentors.find((m) => m.id === result.mentor.id)
                  if (!mentor) return null

                  return (
                    <Card key={result.mentor.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-4">
                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                              {mentor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-bold">{mentor.name}</h3>
                              <p className="text-sm text-gray-600">{mentor.field}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold text-blue-600">
                              {result.matchPercentage}%
                            </div>
                            <div className="text-xs text-gray-500">Match Score</div>
                          </div>
                        </div>

                        {/* Rating and followers */}
                        <div className="flex items-center gap-4 mb-3 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="font-semibold">{mentor.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-gray-500" />
                            <span>{mentor.followers}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span>{mentor.location}</span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-gray-700 mb-3">{mentor.description}</p>

                        {/* Match breakdown */}
                        <div className="bg-gray-50 rounded p-3 mb-4">
                          <p className="text-xs font-semibold text-gray-600 mb-2">Match Breakdown</p>
                          <p className="text-xs text-gray-700">{result.explanation}</p>
                        </div>

                        <Button className="w-full">Connect with {mentor.name.split(" ")[0]}</Button>
                      </CardContent>
                    </Card>
                  )
                })
              ) : (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <p className="text-gray-600">
                      No mentors found matching your criteria. Try adjusting your goals or interests.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <Card className="bg-gray-50">
              <CardContent className="pt-12 pb-12 text-center">
                <Zap className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Fill in your profile and click "Find Mentors" to see recommendations</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
