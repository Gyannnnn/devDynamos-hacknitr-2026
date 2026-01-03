"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChatDialog } from "@/components/chat-dialog"

/* ---------------- TYPES ---------------- */

type StudentRequest = {
  id: string
  name: string
  email: string
  collegeName: string
  fieldRequested: string
}

type Mentor = {
  id: string
  name: string
  email: string
  avatar: string
  location: string
  fieldOfExpertise: string
  description: string
  about: string
}

type ApiResponse = {
  success: boolean
  message: string
  data: Mentor[]
}

/* ---------------- DUMMY STUDENT DATA ---------------- */

const studentsRequesting: StudentRequest[] = [
  {
    id: "stu-1",
    name: "Rahul Sharma",
    email: "rahul.sharma@gmail.com",
    collegeName: "VSSUT Burla",
    fieldRequested: "WEB_DEVELOPEMENT",
  },
  {
    id: "stu-2",
    name: "Ananya Patel",
    email: "ananya.patel@gmail.com",
    collegeName: "IIT Bhubaneswar",
    fieldRequested: "AIML",
  },
  {
    id: "stu-3",
    name: "Sourav Das",
    email: "sourav.das@gmail.com",
    collegeName: "NIT Rourkela",
    fieldRequested: "OPERATING_SYSTEM",
  },
]

/* ---------------- COMPONENT ---------------- */

export default function DashboardPage() {
  const [mentors, setMentors] = useState<Mentor[]>([])
  const [loading, setLoading] = useState(true)

  /* -------- FETCH MENTORS -------- */

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

  if (loading) {
    return <div className="text-center py-20">Loading dashboard...</div>
  }

  // Use first mentor as logged-in mentor (temporary)
  const currentMentor = mentors[0]

  if (!currentMentor) {
    return (
      <div className="text-center py-20 text-red-500">
        No mentor found
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Mentor Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your incoming student requests
        </p>
      </div>

      {studentsRequesting.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              No student requests at the moment.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {studentsRequesting.map((student) => (
            <Card key={student.id}>
              <CardHeader>
                <CardTitle>{student.name}</CardTitle>
                <CardDescription>
                  {student.collegeName} • Requesting guidance in{" "}
                  {student.fieldRequested.replaceAll("_", " ")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">
                      {student.email}
                    </p>
                  </div>

                  {/* Chat Dialog */}
                  <ChatDialog mentor={currentMentor} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
