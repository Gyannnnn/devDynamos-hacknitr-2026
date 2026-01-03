"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Signup } from "../api/actions/signup";

const FIELD_OF_EXPERTISE = [
  "WEB_DEVELOPEMENT",
  "AIML",
  "OPERATING_SYSTEM",
  "ANDROID_DEVELOPEMENT",
  "DATA_STRUCTURES",
  "SYSTEM_DESIGN",
  "SOFT_SKILLS",
  "ACADEMICS",
] as const;

type FieldOfExpertise = (typeof FIELD_OF_EXPERTISE)[number];

export default function SignUpPage() {
  const router = useRouter();
  const [role, setRole] = useState<"student" | "mentor">("student");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    collegeName: "",
    location: "",
    fields: [] as FieldOfExpertise[],
    description: "",
    bio: "",
    studyMaterials: [""],
    socialLinks: {
      github: "",
      instagram: "",
      linkedin: "",
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await Signup({
        name: formData.name,
        email: formData.email,
        password: "dummy-password",
        collegeId: formData.collegeName,

        location: role === "mentor" ? formData.location : "",
        fieldOfExpertise:
          role === "mentor" ? formData.fields[0] ?? "" : "",

        description: role === "mentor" ? formData.description : "",
        about: role === "mentor" ? formData.bio : "",
        role,

        instagram: formData.socialLinks.instagram,
        linkedIn: formData.socialLinks.linkedin,

        materialLinks:
          role === "mentor" ? formData.studyMaterials : [],
      });

      alert("Account created successfully!");
      router.push("/");
    } catch (error) {
      console.error("Signup failed", error);
      alert("Signup failed. Check console.");
    }
  };

  const addStudyMaterial = () => {
    setFormData((prev) => ({
      ...prev,
      studyMaterials: [...prev.studyMaterials, ""],
    }));
  };

  const updateStudyMaterial = (index: number, value: string) => {
    const updated = [...formData.studyMaterials];
    updated[index] = value;
    setFormData({ ...formData, studyMaterials: updated });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Create an account to connect with mentors or students
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs value={role} onValueChange={(v) => setRole(v as any)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="mentor">Mentor</TabsTrigger>
            </TabsList>

            {/* STUDENT */}
            <TabsContent value="student">
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <Input
                  placeholder="Name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <Input
                  type="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <Input
                  placeholder="College Name"
                  required
                  value={formData.collegeName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      collegeName: e.target.value,
                    })
                  }
                />
                <Button type="submit" className="w-full">
                  Sign Up as Student
                </Button>
              </form>
            </TabsContent>

            {/* MENTOR */}
            <TabsContent value="mentor">
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <Input
                  placeholder="Name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <Input
                  type="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <Input
                  placeholder="College / University"
                  required
                  value={formData.collegeName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      collegeName: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Location"
                  required
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                />

                <Select
                  value={formData.fields[0] || ""}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      fields: [value as FieldOfExpertise],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Field of Expertise" />
                  </SelectTrigger>
                  <SelectContent>
                    {FIELD_OF_EXPERTISE.map((field) => (
                      <SelectItem key={field} value={field}>
                        {field.replaceAll("_", " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  placeholder="Short Description"
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                />

                <textarea
                  className="w-full min-h-[100px] border rounded-md p-2"
                  placeholder="About / Bio"
                  required
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                />

                {formData.studyMaterials.map((material, i) => (
                  <Input
                    key={i}
                    placeholder="Study material link"
                    value={material}
                    onChange={(e) =>
                      updateStudyMaterial(i, e.target.value)
                    }
                  />
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={addStudyMaterial}
                >
                  Add another link
                </Button>

                <Button type="submit" className="w-full">
                  Sign Up as Mentor
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
