"use client"

import { useEffect, useState } from "react"
import axios from "axios"
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
import { recommendMentors, type StudentProfile, type MentorProfile, type Level, type LearningStyle } from "@/lib/recommender"
import { Star, Users, MapPin, Zap } from "lucide-react"
import Link from "next/link"

/* ---------------- TYPES ---------------- */

type ApiMentor = {
  id: string
  name: string
  avatar: string
  location: string
  fieldOfExpertise: string
  description: string
  about: string
}

type ApiResponse = {
  success: boolean
  message: string
  data: ApiMentor[]
}

/* ---------------- COMPONENT ---------------- */

export default function FindMentorPage() {
  const [studentProfile, setStudentProfile] = useState<StudentProfile>({
    goals: [""],
    level: "beginner",
    interests: [""],
    learningStyle: "mixed",
  })

  const [mentors, setMentors] = useState<ApiMentor[]>([])
  const [recommendations, setRecommendations] =
    useState<ReturnType<typeof recommendMentors> | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(true)

  /* ---------------- FETCH MENTORS ---------------- */

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await axios.get<ApiResponse>(
          "http://localhost:8080/api/v1/mentor/all"
        )
        if (res.data.success) {
          setMentors(res.data.data)
        }
      } catch (err) {
        console.error("Failed to fetch mentors", err)
      } finally {
        setLoading(false)
      }
    }

    fetchMentors()
  }, [])

  /* ---------------- MAP TO AI FORMAT ---------------- */

  const mentorProfiles: MentorProfile[] = mentors.map((m) => ({
    id: m.id,
    name: m.name,
    expertise: [m.fieldOfExpertise],
    experienceLevel: "advanced", // later derive from followers / years
    teachingStyle: "mixed",
    rating: 4.5, // placeholder until rating exists in DB
  }))

  /* ---------------- FORM HANDLERS ---------------- */

  const handleGoalChange = (i: number, v: string) => {
    const updated = [...studentProfile.goals]
    updated[i] = v
    setStudentProfile({ ...studentProfile, goals: updated })
  }

  const handleInterestChange = (i: number, v: string) => {
    const updated = [...studentProfile.interests]
    updated[i] = v
    setStudentProfile({ ...studentProfile, interests: updated })
  }

  const addGoal = () =>
    setStudentProfile({ ...studentProfile, goals: [...studentProfile.goals, ""] })

  const addInterest = () =>
    setStudentProfile({
      ...studentProfile,
      interests: [...studentProfile.interests, ""],
    })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const results = recommendMentors(studentProfile, mentorProfiles, 3)
    setRecommendations(results)
    setSubmitted(true)
  }

  /* ---------------- UI ---------------- */

  if (loading) {
    return <div className="text-center py-20">Loading mentors...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold flex items-center justify-center gap-2">
          <Zap className="h-8 w-8 text-blue-600" />
          Find the Right Mentor Using AI
        </h1>
        <p className="text-lg text-gray-600">
          Personalized mentor recommendations based on your goals
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* FORM */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>Tell us what you want to learn</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Label>Level</Label>
              <Select
                value={studentProfile.level}
                onValueChange={(v) =>
                  setStudentProfile({ ...studentProfile, level: v as Level })
                }
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>

              <Label>Learning Style</Label>
              <Select
                value={studentProfile.learningStyle}
                onValueChange={(v) =>
                  setStudentProfile({
                    ...studentProfile,
                    learningStyle: v as LearningStyle,
                  })
                }
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="visual">Visual</SelectItem>
                  <SelectItem value="auditory">Auditory</SelectItem>
                  <SelectItem value="reading">Reading</SelectItem>
                  <SelectItem value="kinesthetic">Kinesthetic</SelectItem>
                  <SelectItem value="mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>

              {studentProfile.goals.map((g, i) => (
                <Input
                  key={i}
                  placeholder="Learning goal"
                  value={g}
                  onChange={(e) => handleGoalChange(i, e.target.value)}
                />
              ))}
              <Button type="button" variant="outline" onClick={addGoal}>
                + Add Goal
              </Button>

              {studentProfile.interests.map((g, i) => (
                <Input
                  key={i}
                  placeholder="Interest"
                  value={g}
                  onChange={(e) => handleInterestChange(i, e.target.value)}
                />
              ))}
              <Button type="button" variant="outline" onClick={addInterest}>
                + Add Interest
              </Button>

              <Button type="submit" className="w-full">
                Find Mentors
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* RESULTS */}
        <div className="lg:col-span-2 space-y-4">
          {submitted && recommendations?.map((r) => {
            const mentor = mentors.find((m) => m.id === r.mentor.id)
            if (!mentor) return null

            return (
              <Card key={mentor.id}>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold">{mentor.name}</h3>
                  <p className="text-sm text-gray-600">
                    {mentor.fieldOfExpertise} • {mentor.location}
                  </p>

                  <p className="mt-2 text-sm">{mentor.description}</p>

                  <div className="mt-3 text-sm text-blue-600 font-semibold">
                    Match Score: {r.matchPercentage}%
                  </div>

                  <Button className="w-full mt-4">
                    {/* Connect with {mentor.name.split(" ")[0]} */}
                   <Link href={`/mentors/${mentor.id}`}>
                   View Details
                   </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
