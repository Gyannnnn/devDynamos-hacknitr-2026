"use client"

import { use } from "react"
import { mentors } from "@/lib/data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, ExternalLink } from "lucide-react"
import { ChatDialog } from "@/components/chat-dialog"
import { ScheduleDialog } from "@/components/schedule-dialog"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function MentorDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const mentor = mentors.find((m) => m.id === id)

  if (!mentor) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Mentor Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The mentor you're looking for doesn't exist.
        </p>
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-start gap-6 mb-6">
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center text-2xl font-bold">
            {mentor.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{mentor.name}</h1>
            <p className="text-lg text-muted-foreground mb-2">{mentor.field}</p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{mentor.rating}</span>
              </div>
              <span className="text-muted-foreground">{mentor.followers} followers</span>
              <span className="text-muted-foreground">📍 {mentor.location}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <ChatDialog mentor={mentor} />
          <ScheduleDialog mentor={mentor} />
        </div>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">{mentor.about}</p>
            <p className="text-sm">{mentor.bio}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{mentor.description}</p>
          </CardContent>
        </Card>

        {mentor.socialLinks && (
          <Card>
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                {mentor.socialLinks.linkedin && (
                  <a
                    href={mentor.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    LinkedIn
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                {mentor.socialLinks.github && (
                  <a
                    href={mentor.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    GitHub
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                {mentor.socialLinks.twitter && (
                  <a
                    href={mentor.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    Twitter
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Study Materials</CardTitle>
            <CardDescription>Resources shared by {mentor.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mentor.studyMaterials.map((material, index) => (
                <a
                  key={index}
                  href={material.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 border rounded-md hover:bg-accent transition-colors"
                >
                  <div>
                    <p className="font-medium text-sm">{material.title}</p>
                    <p className="text-xs text-muted-foreground">{material.type}</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

