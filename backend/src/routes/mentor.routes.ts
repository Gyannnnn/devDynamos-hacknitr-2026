import { Router } from "express";

import { asyncHandler } from "../utils/async.handler";

import { getAllMentors, getMentorById, getMessages, sendMessage } from "../controller/mentor.controller";




const mentorRouter = Router();


mentorRouter.get("/get-by-id/:id", asyncHandler(getMentorById));
mentorRouter.get("/all", asyncHandler(getAllMentors));
mentorRouter.post("/sendmessage", asyncHandler(sendMessage));
mentorRouter.get("/getMessages/:conversationId", asyncHandler(getMessages))




export default mentorRouter;