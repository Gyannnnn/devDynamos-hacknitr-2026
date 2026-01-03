import { email, z } from 'zod';

export const CollegeSchema = z.object({
    name: z.string(),
});


export const UserSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    avatar: z.string().optional(),
    collegeId: z.string(),
    location: z.string(),
    fieldOfExpertise: z.enum(["WEB_DEVELOPEMENT",
        "ANDROID_DEVELOPMENT",
        "IOS_DEVELOPMENT",
        "OPERATING_SYSTEM",
        "CYBER_SECURITY",
        "COMPILER_DESIGN",
        "COMPUTER_NETWORK",
        "THEORY_OF_COMPUTATION",
        "AIML"]).optional(),
    description: z.string().optional(),
    about: z.string().optional(),
    role: z.string(),
    instagram: z.string().optional(),
    linkedIn: z.string().optional(),
    materialLinks: z.array(z.string())
})



