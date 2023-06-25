import { Router } from "express";
import passport from "passport";
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
import { postRentValidation } from "../validations/post-rent-validation";
const publicRouter = Router();

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
publicRouter.use(passport.authenticate("jwt", { session: false }));
publicRouter.post(
  "/rent/:bookId",
  checkSchema(postRentValidation),
  handleError,
  postRent
);
publicRouter.get("/rent", getRent);
export { publicRouter };
