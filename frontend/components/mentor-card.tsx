"use client"

import Link from "next/link"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, ExternalLink, Linkedin, Instagram, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Mentor } from "@/lib/data"

interface MentorCardProps {
  mentor: Mentor
}

function formatField(field: string) {
  return field.replaceAll("_", " ").toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
}

function getBadgeClasses(field: string) {
  const base =
    "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium hover:scale-105"

  switch (field) {
    case "WEB DEVELOPEMENT":
      return `${base} bg-blue-100 text-blue-800`
    case "AIML":
      return `${base} bg-indigo-100 text-indigo-800`
    case "OPERATING SYSTEM":
      return `${base} bg-purple-100 text-purple-800`
    default:
      return `${base} bg-gray-100 text-gray-800`
  }
}

export function MentorCard({ mentor }: MentorCardProps) {
  const [following, setFollowing] = useState(false)

  const readableField = formatField(mentor.fieldOfExpertise)

  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center gap-3">
          {mentor.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={mentor.avatar}
              alt={`${mentor.name} avatar`}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-700">
              {mentor.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </div>
          )}

          <div>
            <CardTitle className="text-lg">{mentor.name}</CardTitle>
            <div className="mt-1">
              <span className={getBadgeClasses(readableField)}>
                {readableField}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {mentor.about || mentor.description}
        </p>

        {/* Social Links */}
        {(mentor.linkedIn || mentor.instagram) && (
          <div className="flex items-center gap-2 mb-3">
            {mentor.linkedIn && (
              <a
                href={mentor.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Linkedin className="h-4 w-4" />
              </a>
            )}
            {mentor.instagram && (
              <a
                href={mentor.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Instagram className="h-4 w-4" />
              </a>
            )}
          </div>
        )}

        {/* Material Links Preview */}
        {mentor.materialLinks && mentor.materialLinks.length > 0 && (
          <div className="mb-3">
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
              <BookOpen className="h-3 w-3" />
              <span>Resources ({mentor.materialLinks.length})</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {mentor.materialLinks.slice(0, 2).map((link, idx) => {
                let displayText = link
                try {
                  const url = new URL(link)
                  displayText = url.hostname.replace("www.", "")
                } catch {
                  // If not a valid URL, show truncated link
                  displayText = link.length > 20 ? link.substring(0, 20) + "..." : link
                }
                return (
                  <a
                    key={idx}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline truncate max-w-[120px] flex items-center gap-1"
                    onClick={(e) => e.stopPropagation()}
                    title={link}
                  >
                    <ExternalLink className="h-3 w-3" />
                    <span className="truncate">{displayText}</span>
                  </a>
                )
              })}
              {mentor.materialLinks.length > 2 && (
                <span className="text-xs text-muted-foreground">
                  +{mentor.materialLinks.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              setFollowing((s) => !s)
            }}
          >
            {following ? "Following" : "Follow"}
          </Button>

          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{mentor.location}</span>
          </div>         
        </div>

        <div className="pt-2 border-t">
          <Button asChild size="sm" className="w-full">
            <Link href={`/mentors/${mentor.id}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
