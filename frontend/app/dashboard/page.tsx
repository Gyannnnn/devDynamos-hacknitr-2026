"use client"

import { useState } from "react"
import { studentsRequesting } from "@/lib/data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChatDialog } from "@/components/chat-dialog"
import { mentors } from "@/lib/data"

// Create a dummy mentor for the dashboard
const currentMentor = mentors[0]

export default function DashboardPage() {
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
            <p className="text-muted-foreground">No student requests at the moment.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {studentsRequesting.map((student) => (
            <Card key={student.id}>
              <CardHeader>
                <CardTitle>{student.name}</CardTitle>
                <CardDescription>
                  {student.collegeName} • Requesting guidance in {student.fieldRequested}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">{student.email}</p>
                  </div>
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

