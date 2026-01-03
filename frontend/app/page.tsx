"use client"

import { useState } from "react"
import { MentorCard } from "@/components/mentor-card"
import { mentors, allLocations, allFields, type Location, type FieldOfGuidance } from "@/lib/data"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function HomePage() {
  const [selectedLocation, setSelectedLocation] = useState<string>("all")
  const [selectedField, setSelectedField] = useState<string>("all")

  const filteredMentors = mentors.filter((mentor) => {
    const locationMatch = selectedLocation === "all" || mentor.location === selectedLocation
    const fieldMatch = selectedField === "all" || mentor.field === selectedField
    return locationMatch && fieldMatch
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Your Mentor</h1>
        <p className="text-muted-foreground">
          Connect with experienced mentors from your college community
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            {allLocations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedField} onValueChange={setSelectedField}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by Field" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Fields</SelectItem>
            {allFields.map((field) => (
              <SelectItem key={field} value={field}>
                {field}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredMentors.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No mentors found matching your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      )}
    </div>
  )
}
