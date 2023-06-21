import { Router } from "express";
import {
  getRent,
  postLogin,
  postRent,
  postSignup,
} from "../controllers/user-controller";
import { postSignupValidation } from "../validations/post-signup-validation";
import { checkSchema } from "express-validator";
import { handleError } from "../middlewares/error-middleware";
import { postLoginValidation } from "../validations/post-login-validation";
const publicRouter = Router();
const protectedRouter = Router();
publicRouter.post(
  "/signup",
  checkSchema(postSignupValidation),
  handleError,
  postSignup
);
publicRouter.post(
  "/login",
  checkSchema(postLoginValidation),
  handleError,
  postLogin
);
protectedRouter.post("/rent/:bookId", postRent);
protectedRouter.get("/rent", getRent);
export { publicRouter, protectedRouter };
