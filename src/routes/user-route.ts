import { Router } from "express";
import {
  getRent,
  postLogin,
  postRent,
  postSignup,
} from "../controllers/user-controller";
import { postSignupValidation } from "../validations/post-signup-validation";
import { checkSchema } from "express-validator";
const publicRouter = Router();
const protectedRouter = Router();
publicRouter.post("/signup", checkSchema(postSignupValidation), postSignup);
publicRouter.post("/login", postLogin);
protectedRouter.post("/rent/:bookId", postRent);
protectedRouter.get("/rent", getRent);
export { publicRouter, protectedRouter };
