// Dummy data for the mentorship platform

export type FieldOfGuidance = 
  | "Web Development"
  | "Android Development"
  | "Operating Systems"
  | "AI/ML"
  | "Academics"
  | "Soft Skills"
  | "Data Structures"
  | "System Design";

export type Location = 
  | "VSSUT Burla"
  | "NIT Rourkela"
  | "IIT Delhi"
  | "NIT Warangal"
  | "IIIT Hyderabad"
  | "BITS Pilani";

export interface StudyMaterial {
  title: string;
  url: string;
  type: "Google Docs" | "YouTube" | "PDF" | "GitHub";
}

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
}

export interface Mentor {
  id: string;
  name: string;
  field: FieldOfGuidance;
  description: string;
  rating: number;
  followers: number;
  location: Location;
  about: string;
  bio: string;
  socialLinks: SocialLinks;
  studyMaterials: StudyMaterial[];
  avatar?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  collegeName: string;
  fieldRequested: FieldOfGuidance;
}

// Dummy mentors data
export const mentors: Mentor[] = [
  {
    id: "1",
    name: "Dr. Rajesh Kumar",
    field: "Web Development",
    description: "Experienced full-stack developer with 10+ years in React, Node.js, and modern web technologies.",
    rating: 4.8,
    followers: 1250,
    location: "NIT Rourkela",
    about: "Professor of Computer Science",
    bio: "I've been teaching web development for over a decade. My focus is on helping students build real-world projects and understand modern frameworks. I believe in hands-on learning and practical experience.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/rajesh-kumar",
      github: "https://github.com/rajesh-kumar",
      twitter: "https://twitter.com/rajesh_kumar"
    },
    studyMaterials: [
      { title: "React Fundamentals Guide", url: "https://docs.google.com/document/d/123", type: "Google Docs" },
      { title: "Node.js Tutorial Series", url: "https://youtube.com/watch?v=abc123", type: "YouTube" },
      { title: "Full Stack Project Ideas", url: "https://github.com/rajesh/projects", type: "GitHub" }
    ]
  },
  {
    id: "2",
    name: "Prof. Priya Sharma",
    field: "AI/ML",
    description: "Machine Learning researcher specializing in deep learning and neural networks.",
    rating: 4.9,
    followers: 2100,
    location: "IIT Delhi",
    about: "Associate Professor, AI Research Lab",
    bio: "I'm passionate about making AI accessible to students. My research focuses on deep learning applications in computer vision. I mentor students on ML projects and research papers.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/priya-sharma",
      github: "https://github.com/priya-sharma"
    },
    studyMaterials: [
      { title: "ML Basics for Beginners", url: "https://docs.google.com/document/d/456", type: "Google Docs" },
      { title: "Deep Learning Course", url: "https://youtube.com/watch?v=def456", type: "YouTube" },
      { title: "ML Project Repository", url: "https://github.com/priya/ml-projects", type: "GitHub" }
    ]
  },
  {
    id: "3",
    name: "Amit Singh",
    field: "Android Development",
    description: "Senior Android developer and open-source contributor. Expert in Kotlin and Jetpack Compose.",
    rating: 4.7,
    followers: 890,
    location: "NIT Warangal",
    about: "Final Year Student, Android Developer",
    bio: "I'm a final year student who has been building Android apps for 3 years. I love helping juniors get started with Android development and contribute to open source.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/amit-singh",
      github: "https://github.com/amit-singh",
      twitter: "https://twitter.com/amit_singh"
    },
    studyMaterials: [
      { title: "Kotlin Basics", url: "https://docs.google.com/document/d/789", type: "Google Docs" },
      { title: "Jetpack Compose Tutorial", url: "https://youtube.com/watch?v=ghi789", type: "YouTube" },
      { title: "Android Projects", url: "https://github.com/amit/android-apps", type: "GitHub" }
    ]
  },
  {
    id: "4",
    name: "Dr. Anjali Verma",
    field: "Operating Systems",
    description: "OS researcher with expertise in kernel development and distributed systems.",
    rating: 4.6,
    followers: 650,
    location: "IIIT Hyderabad",
    about: "Assistant Professor, Systems Lab",
    bio: "I teach operating systems and help students understand low-level system programming. My research includes kernel optimization and distributed computing.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/anjali-verma",
      github: "https://github.com/anjali-verma"
    },
    studyMaterials: [
      { title: "OS Concepts Explained", url: "https://docs.google.com/document/d/321", type: "Google Docs" },
      { title: "Kernel Programming Guide", url: "https://youtube.com/watch?v=jkl321", type: "YouTube" }
    ]
  },
  {
    id: "5",
    name: "Rohit Patel",
    field: "Data Structures",
    description: "Competitive programmer and DSA mentor. Helps students prepare for technical interviews.",
    rating: 4.8,
    followers: 1500,
    location: "BITS Pilani",
    about: "Senior Student, Competitive Programmer",
    bio: "I've been doing competitive programming for 4 years and have helped many students crack coding interviews. I focus on problem-solving approaches and algorithm optimization.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/rohit-patel",
      github: "https://github.com/rohit-patel"
    },
    studyMaterials: [
      { title: "DSA Problem Set", url: "https://docs.google.com/document/d/654", type: "Google Docs" },
      { title: "Interview Prep Guide", url: "https://youtube.com/watch?v=mno654", type: "YouTube" },
      { title: "Practice Problems", url: "https://github.com/rohit/dsa", type: "GitHub" }
    ]
  },
  {
    id: "6",
    name: "Prof. Vikram Mehta",
    field: "Soft Skills",
    description: "Career counselor and communication skills trainer. Helps students with presentations and interviews.",
    rating: 4.5,
    followers: 720,
    location: "VSSUT Burla",
    about: "Professor, Department of Humanities",
    bio: "I help students develop essential soft skills for their careers. From public speaking to interview preparation, I guide students to become confident professionals.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/vikram-mehta"
    },
    studyMaterials: [
      { title: "Communication Skills Guide", url: "https://docs.google.com/document/d/987", type: "Google Docs" },
      { title: "Interview Tips", url: "https://youtube.com/watch?v=pqr987", type: "YouTube" }
    ]
  }
];

// Dummy students requesting guidance
export const studentsRequesting: Student[] = [
  {
    id: "s1",
    name: "Karan Mehta",
    email: "karan@example.com",
    collegeName: "NIT Rourkela",
    fieldRequested: "Web Development"
  },
  {
    id: "s2",
    name: "Sneha Reddy",
    email: "sneha@example.com",
    collegeName: "IIT Delhi",
    fieldRequested: "AI/ML"
  },
  {
    id: "s3",
    name: "Arjun Desai",
    email: "arjun@example.com",
    collegeName: "BITS Pilani",
    fieldRequested: "Android Development"
  }
];

// Get unique locations and fields for filters
export const allLocations: Location[] = Array.from(new Set(mentors.map(m => m.location)));
export const allFields: FieldOfGuidance[] = Array.from(new Set(mentors.map(m => m.field)));

