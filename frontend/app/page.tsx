"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { MentorCard } from "@/components/mentor-card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Zap } from "lucide-react";

type Mentor = {
  id: string;
  name: string;
  avatar: string;
  location: string;
  fieldOfExpertise: string;
  about: string;
  description: string;
  materialLinks?: string[];
  linkedIn?: string | null;
  instagram?: string | null;
};

type ApiResponse = {
  success: boolean;
  message: string;
  data: Mentor[];
};

export default function HomePage() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedField, setSelectedField] = useState("all");

  // 🔹 Fetch mentors from API
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true);
        const res = await axios.get<ApiResponse>(
          "http://localhost:8080/api/v1/mentor/all"
        );
        if (res.data.success) {
          setMentors(res.data.data);
        } else {
          setError(res.data.message);
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  // 🔹 Dynamic filters
  const allLocations = useMemo(
    () => Array.from(new Set(mentors.map((m) => m.location))),
    [mentors]
  );

  const allFields = useMemo(
    () => Array.from(new Set(mentors.map((m) => m.fieldOfExpertise))),
    [mentors]
  );

  const filteredMentors = mentors.filter((mentor) => {
    const locationMatch =
      selectedLocation === "all" || mentor.location === selectedLocation;
    const fieldMatch =
      selectedField === "all" ||
      mentor.fieldOfExpertise === selectedField;

    return locationMatch && fieldMatch;
  });

  if (loading) {
    return <div className="text-center py-12">Loading mentors...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">{error}</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Your Mentor</h1>
        <p className="text-muted-foreground">
          Connect with experienced mentors from your college community
        </p>
      </div>

      {/* 🔮 AI Recommendation Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-1">
            <Zap className="h-5 w-5 text-blue-600" />
            Find Your Perfect Mentor Match
          </h2>
          <p className="text-sm text-gray-600">
            Use AI to discover mentors that match your goals and learning style
          </p>
        </div>
        <Link href="/find-mentor">
          <Button>Get AI Recommendations</Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger className="w-full sm:w-52">
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
          <SelectTrigger className="w-full sm:w-52">
            <SelectValue placeholder="Filter by Field" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Fields</SelectItem>
            {allFields.map((field) => (
              <SelectItem key={field} value={field}>
                {field.replaceAll("_", " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Mentor Grid */}
      {filteredMentors.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No mentors found matching your filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      )}
    </div>
  );
}
