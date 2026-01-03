import { Router } from "express";
import { adminAuthValidation } from "../middleware/auth/adminAuthValidation";
import { feildValidator } from "../middleware/fieldValidator/validator";
import { asyncHandler } from "../utils/async.handler";
import { createCollege, createManyColleges, getAllColleges } from "../controller/college.controller";
import { CollegeSchema } from "../types/schema";
const collegeRouter = Router();

collegeRouter.post("/create", feildValidator(CollegeSchema), asyncHandler(createCollege))
collegeRouter.post("/create-many", asyncHandler(createManyColleges));
collegeRouter.get("/all", asyncHandler(getAllColleges));

export default collegeRouter