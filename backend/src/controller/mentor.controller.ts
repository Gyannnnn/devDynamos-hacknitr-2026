import prisma from "../utils/prisma/prisma.client";
import { Request, Response } from "express";
import { createFailedError, createSuccess, notFoundError, sendError, sendSuccess, updateFailed, updateSuccess } from "../utils/response.handler"




export const getMentorById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id?.trim()) return sendError(res, "All fields are required");

    const mentor = await prisma.user.findFirst({
        where: {
            id
        }
    });
    if (!mentor) return notFoundError(res, "Mentor not found");
    sendSuccess(res, "Mentor details fetched successfully", mentor)
}


export const getAllMentors = async (req: Request, res: Response) => {
    const mentors = await prisma.user.findMany({
        where: {
            role: "Mentor"
        }
    });
    if (!mentors) return notFoundError(res, "No mentors found");
    sendSuccess(res, "Mentors found", mentors);
}

export const sendMessage = async (req: Request, res: Response) => {
    const { conversationId, content, menteeId, date, mentorId } = req.body;
    if (!conversationId?.trim() || !menteeId?.trim() || !date?.trim()) return sendError(res, "All fields are required");

    const message = await prisma.message.create({
        data: {
            conversationId,
            content,
            senderId: menteeId,
            receiverId: mentorId,
        },
    });
    sendSuccess(res, "Message sent", message)
}


export const getMessages = async (req: Request, res: Response) => {
  const { conversationId } = req.params;

  if(!conversationId?.trim()) return sendError(res,"All fields are required");
  const messages = await prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" },
    include: {
      sender: {
        select: { id: true, name: true }
      }
    }
  });

  sendSuccess(res, "Messages fetched", messages);
};

