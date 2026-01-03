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

export default function SignUpPage() {
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
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formData.name);

    try {
      await Signup({
        name: formData.name,
        email: formData.email,

        password: "dummy-password",

        collegeId: formData.collegeName,

        location: role === "mentor" ? formData.location : "",
        fieldOfExpertise: role === "mentor" ? formData.fields[0] ?? "" : "",

        description: role === "mentor" ? formData.description : "",
        about: role === "mentor" ? formData.bio : "",

        role, // "student" | "mentor"

        instagram: "",
        linkedIn: "",

        materialLinks: role === "mentor" ? formData.studyMaterials : [],
      });

      alert("Account created successfully!");
      router.push("/");
    } catch (error) {
      console.error("Signup failed", error);
      alert("Signup failed. Check console.");
    }
  };

  const addStudyMaterial = () => {
    setFormData({
      ...formData,
      studyMaterials: [...formData.studyMaterials, ""],
    });
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
          <Tabs
            value={role}
            onValueChange={(v) => setRole(v as "student" | "mentor")}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="mentor">Mentor</TabsTrigger>
            </TabsList>

            <TabsContent value="student">
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="college">College Name</Label>
                  <Input
                    id="college"
                    required
                    value={formData.collegeName}
                    onChange={(e) =>
                      setFormData({ ...formData, collegeName: e.target.value })
                    }
                  />
                </div>
                <Button type="submit" className="w-full">
                  Sign Up as Student
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="mentor">
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="mentor-name">Name</Label>
                  <Input
                    id="mentor-name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mentor-email">Email</Label>
                  <Input
                    id="mentor-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mentor-college">College / University</Label>
                  <Input
                    id="mentor-college"
                    required
                    value={formData.collegeName}
                    onChange={(e) =>
                      setFormData({ ...formData, collegeName: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    required
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="field">Field of Expertise</Label>
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
                      <SelectValue placeholder="Select field" />
                    </SelectTrigger>
                    <SelectContent>
                      {FIELD_OF_EXPERTISE.map((field) => (
                        <SelectItem key={field} value={field}>
                          {field.replaceAll("_", " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Short Description</Label>
                  <Input
                    id="description"
                    required
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">About / Bio</Label>
                  <textarea
                    id="bio"
                    required
                    className="w-full min-h-25 px-3 py-2 text-sm border rounded-md"
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Study Material Links</Label>
                  {formData.studyMaterials.map((material, index) => (
                    <Input
                      key={index}
                      placeholder="Enter study material URL"
                      value={material}
                      onChange={(e) =>
                        updateStudyMaterial(index, e.target.value)
                      }
                    />
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addStudyMaterial}
                    className="w-full"
                  >
                    Add Another Link
                  </Button>
                </div>
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
