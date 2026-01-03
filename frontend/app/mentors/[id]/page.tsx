"use client"

import { use } from "react"
import { mentors } from "@/lib/data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, ExternalLink, MapPin } from "lucide-react"
import { ChatDialog } from "@/components/chat-dialog"
import FollowButton from "@/components/follow-button"
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
              <span className="text-muted-foreground flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{mentor.location}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full">
          <div className="w-full sm:w-auto">
            <FollowButton />
          </div>

          <div className="w-full sm:w-auto">
            <ChatDialog mentor={mentor} />
          </div>

          <div className="w-full sm:w-auto">
            <ScheduleDialog mentor={mentor} />
          </div>
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
                    aria-label="LinkedIn"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.026-3.036-1.849-3.036-1.85 0-2.133 1.445-2.133 2.94v5.665H9.356V9h3.414v1.561h.049c.476-.9 1.637-1.849 3.369-1.849 3.602 0 4.267 2.371 4.267 5.456v6.284zM5.337 7.433a2.062 2.062 0 1 1 0-4.123 2.062 2.062 0 0 1 0 4.123zM7.114 20.452H3.56V9h3.554v11.452z" />
                    </svg>
                    
                  </a>
                )}
                {mentor.socialLinks.github && (
                  <a
                    href={mentor.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                    aria-label="GitHub"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 .297a12 12 0 0 0-3.797 23.401c.6.111.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.085 1.84 1.238 1.84 1.238 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.76-1.605-2.665-.304-5.466-1.333-5.466-5.93 0-1.31.468-2.381 1.236-3.221-.124-.303-.536-1.524.118-3.176 0 0 1.008-.322 3.301 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.046.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.656 1.652.244 2.873.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.805 5.623-5.476 5.921.43.372.813 1.102.813 2.222 0 1.606-.014 2.901-.014 3.293 0 .319.216.694.825.576A12 12 0 0 0 12 .297z" />
                    </svg>
                    
                  </a>
                )}
                {mentor.socialLinks.twitter && (
                  <a
                    href={mentor.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                    aria-label="Twitter"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.608 1.794-1.574 2.163-2.723-.95.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.723 0-4.932 2.208-4.932 4.93 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.697 4.374 3.946 4.827-.413.112-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.376 4.6 3.416-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.403 4.768 2.223 7.557 2.223 9.054 0 14.002-7.496 14.002-13.986 0-.209 0-.423-.015-.637.962-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
                    </svg>
                    
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

