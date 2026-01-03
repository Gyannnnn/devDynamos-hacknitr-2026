"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star, ExternalLink, MapPin } from "lucide-react";
import { ChatDialog } from "@/components/chat-dialog";
import FollowButton from "@/components/follow-button";
import { ScheduleDialog } from "@/components/schedule-dialog";

type Mentor = {
  id: string;
  name: string;
  avatar: string | null;
  location: string;
  fieldOfExpertise: string;
  description: string;
  about: string;
  materialLinks: string[];
};

interface MentorApiResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    password: string;
    avatar: string;
    collegeId: string;
    location: string;
    fieldOfExpertise: string;
    description: string;
    about: string;
    role: string;
    instagram: string | null;
    linkedIn: string | null;
    materialLinks: string[];
  };
}

export default function MentorDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const res = await axios.get<MentorApiResponse>(
          `http://localhost:8080/api/v1/mentor/get-by-id/${id}`
        );

        if (!res.data.success) {
          throw new Error(res.data.message);
        }

        // ✅ Map API response to frontend Mentor type
        const apiMentor = res.data.data;
        const mappedMentor: Mentor = {
          id: apiMentor.id,
          name: apiMentor.name,
          avatar: apiMentor.avatar ?? null,
          location: apiMentor.location,
          fieldOfExpertise: apiMentor.fieldOfExpertise,
          description: apiMentor.description,
          about: apiMentor.about,
          materialLinks: apiMentor.materialLinks ?? [],
        };

        setMentor(mappedMentor);
      } catch (err: any) {
        setError(err.message || "Failed to fetch mentor");
      } finally {
        setLoading(false);
      }
    };

    fetchMentor();
  }, [id]);

  /* ---------------- UI STATES ---------------- */

  if (loading) {
    return <p className="text-center py-12">Loading mentor details...</p>;
  }

  if (error || !mentor) {
    return (
      <p className="text-center text-red-500 py-12">
        {error || "Mentor not found"}
      </p>
    );
  }

  /* ---------------- PAGE ---------------- */

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start gap-6 mb-6">
          {mentor.avatar ? (
            <img
              src={mentor.avatar}
              alt={mentor.name}
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center text-2xl font-bold">
              {mentor.name.charAt(0)}
            </div>
          )}

          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{mentor.name}</h1>
            <p className="text-lg text-muted-foreground mb-2">
              {mentor.fieldOfExpertise.replaceAll("_", " ")}
            </p>

            <div className="flex items-center gap-4 text-sm">
              {/* Dummy rating for now */}
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">4.8</span>
              </div>

              <span className="text-muted-foreground flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {mentor.location}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <FollowButton />
          <ChatDialog mentor={mentor} />
          <ScheduleDialog mentor={mentor} />
        </div>
      </div>

      {/* About */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{mentor.about}</p>
        </CardContent>
      </Card>

      {/* Description */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm whitespace-pre-line">{mentor.description}</p>
        </CardContent>
      </Card>

      {/* Study Materials */}
      {mentor.materialLinks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Study Materials</CardTitle>
            <CardDescription>Resources shared by {mentor.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mentor.materialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 border rounded-md hover:bg-accent transition-colors"
                >
                  <span className="text-sm truncate">{link}</span>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
