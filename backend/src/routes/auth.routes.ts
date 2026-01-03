import { Router } from "express";
import { asyncHandler } from "../utils/async.handler";
import { createManyUsers, signIn, signUp } from "../controller/auth.controller";
import { feildValidator } from "../middleware/fieldValidator/validator";
import { UserSchema } from "../types/schema";
const authRouter = Router();

authRouter.post("/sign-up", feildValidator(UserSchema), asyncHandler(signUp));
authRouter.post("/sign-in", asyncHandler(signIn));
authRouter.post("/create-many", asyncHandler(createManyUsers))

export default authRouter