import { ZodObject, ZodArray, ZodTypeAny } from "zod";
import { Request, Response, NextFunction } from "express";
import { sendError } from "../../utils/response.handler"


export const feildValidator =
  (schema: ZodObject<any> | ZodArray<ZodTypeAny>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return sendError(
        res,
        "Validation failed",
        JSON.stringify(result.error.format()), 
        400
      );
    }


    req.body = result.data;
    next();
  };
