"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"
import { Mentor } from "@/lib/data"

interface MentorCardProps {
  mentor: Mentor
}

export function MentorCard({ mentor }: MentorCardProps) {
  return (
    <Link href={`/mentors/${mentor.id}`}>
      <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader>
          <CardTitle className="text-lg">{mentor.name}</CardTitle>
          <CardDescription>{mentor.field}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {mentor.description}
          </p>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{mentor.rating}</span>
            </div>
            <div className="text-muted-foreground">
              {mentor.followers} followers
            </div>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            📍 {mentor.location}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

