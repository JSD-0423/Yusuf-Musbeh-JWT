import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
export async function handleError(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response
      .status(400)
      .json({ statusCode: 400, errors: errors.array() });
  }
  next();
}
