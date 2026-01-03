import prisma from "../utils/prisma/prisma.client";
import { Request, Response } from "express";
import { createFailedError, createSuccess, notFoundError, sendError, sendSuccess, updateFailed, updateSuccess } from "../utils/response.handler"




export const createCollege = async (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name?.trim()) {
        return sendError(res, "All fields are required");
    }

    const college = await prisma.college.create({
        data: req.body
    });

    if (!college) return sendError(res, "Failed to create college");
    sendSuccess(res, "College created", college);

}

export const createManyColleges = async (req: Request, res: Response) => {
    const colleges = req.body;

    // 1️⃣ Validate array
    if (!Array.isArray(colleges) || colleges.length === 0) {
        return sendError(res, "Request body must be a non-empty array");
    }

    // 2️⃣ Validate & clean data
    const formattedColleges = colleges
        .map((item) => ({
            name: item?.name?.trim(),
        }))
        .filter((item) => item.name);

    if (formattedColleges.length === 0) {
        return sendError(res, "Valid college names are required");
    }

    // 3️⃣ Insert many (skip duplicates)
    const result = await prisma.college.createMany({
        data: formattedColleges,
        skipDuplicates: true,
    });

    if (!result) {
        return sendError(res, "Failed to create colleges");
    }

    return sendSuccess(res, "Colleges created successfully", {
        insertedCount: result.count,
    });
}


export const getAllColleges = async(req: Request, res: Response)=>{
    const colleges = await prisma.college.findMany();
    if(!colleges || colleges.length === 0) return sendError(res,"Colleges not found");
    sendSuccess(res,"Collges fetched", colleges)
}