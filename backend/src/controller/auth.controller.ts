import prisma from "../utils/prisma/prisma.client";
import { Request, Response } from "express";
import { createFailedError, createSuccess, notFoundError, sendError, sendSuccess, updateFailed, updateSuccess } from "../utils/response.handler"

import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'




export const signUp = async (req: Request, res: Response) => {
    const { name,
        email,
        password,
        avatar,
        collegeId,
        location,
        fieldOfExpertise,
        description,
        about,
        materialLinks,
        role
    } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);


    const isUserExist = await prisma.user.findFirst({
        where: {
            email
        }
    });
    if (isUserExist) return sendError(res, "User already exists");

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            avatar,
            role,
            collegeId,
            location,
            fieldOfExpertise,
            description,
            about,
            materialLinks,

        }
    });
    const token = jwt.sign({ email: user.email, name: user.name, role: user.role }, process.env.JWT_SECRET!, {
        expiresIn: "30days"
    });


    if (!user) return createFailedError(res, "Failed to cerate user");
    createSuccess(res, { user, token: token }, "User created successfully");

}



export const createManyUsers = async (req: Request, res: Response) => {
    const users = req.body;

    if (!Array.isArray(users) || users.length === 0) {
        return sendError(res, "Request body must be a non-empty array");
    }


    const formattedUsers = users
        .map((user) => {
            if (!user.email || !user.password || !user.name || !user.collegeId) {
                return null;
            }

            return {
                name: user.name,
                email: user.email,
                password: bcrypt.hashSync(user.password, 10),
                avatar: user.avatar,
                role: user.role,
                collegeId: user.collegeId,
                location: user.location,
                fieldOfExpertise: user.fieldOfExpertise,
                description: user.description,
                about: user.about,
                materialLinks: user.materialLinks ?? [],
            };
        })
        .filter(Boolean) as any[];

    if (formattedUsers.length === 0) {
        return sendError(res, "No valid users to create");
    }

    const result = await prisma.user.createMany({
        data: formattedUsers,
        skipDuplicates: true,
    });

    if (!result) {
        return createFailedError(res, "Failed to create users");
    }

    return createSuccess(
        res,
        { insertedCount: result.count },
        "Users created successfully"
    );
}



export const signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if(!email?.trim() || !password?.trim()) return sendError(res,"All fields are required")
    console.log(req.body)
    const user = await prisma.user.findFirst({
        where: {
            email
        }
    });

    if (!user) return notFoundError(res, "User not found try signup");
    const isPassowrdVerified = bcrypt.compareSync(password, user.password);
    if (!isPassowrdVerified) return sendError(res, "Wrong password");
    const token = jwt.sign({ email: user.email, name: user.name, role: user.role }, process.env.JWT_SECRET!, {
        expiresIn: "30days"
    });

    sendSuccess(res, "User signedin successfully", { user, token: token });


}