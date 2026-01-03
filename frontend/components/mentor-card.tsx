"use client"

import Link from "next/link"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Mentor } from "@/lib/data"

interface MentorCardProps {
  mentor: Mentor
}

function getBadgeClasses(field: string) {
  const base = "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium hover:scale-105";
  switch (field) {
    case "Web Development":
      return `${base} bg-blue-100 text-blue-800`;
    case "Android Development":
      return `${base} bg-green-100 text-green-800`;
    case "Operating Systems":
      return `${base} bg-purple-100 text-purple-800`;
    case "AI/ML":
      return `${base} bg-indigo-100 text-indigo-800`;
    case "Academics":
      return `${base} bg-yellow-100 text-yellow-800`;
    case "Soft Skills":
      return `${base} bg-pink-100 text-pink-800`;
    case "Data Structures":
      return `${base} bg-emerald-100 text-emerald-800`;
    case "System Design":
      return `${base} bg-rose-100 text-rose-800`;
    default:
      return `${base} bg-gray-100 text-gray-800`;
  }
}

export function MentorCard({ mentor }: MentorCardProps) {
  const [following, setFollowing] = useState(false)

  return (
    <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader>
        <div className="flex items-center gap-3">
          {mentor.avatar ? (
            // show provided avatar image
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={mentor.avatar}
              alt={`${mentor.name} avatar`}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            // fallback: initials avatar
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
              <span className={getBadgeClasses(mentor.field)}>{mentor.field}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {mentor.description}
        </p>
        <div className="flex items-center justify-between text-sm mb-4">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{mentor.rating}</span>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Button variant="secondary" size="sm" onClick={() => setFollowing((s) => !s)}>
              {following ? "Following" : "Follow"}
            </Button>
            <div className="text-xs text-muted-foreground">{mentor.followers} followers</div>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
          <MapPin className="h-3 w-3" />
          <span>{mentor.location}</span>
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

