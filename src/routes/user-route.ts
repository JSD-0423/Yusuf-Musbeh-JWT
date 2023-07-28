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
const router = Router();

router.post(
  "/signup",
  checkSchema(postSignupValidation),
  handleError,
  postSignup
);
router.post("/login", checkSchema(postLoginValidation), handleError, postLogin);
router.use(passport.authenticate("jwt", { session: false }));
router.post(
  "/rent/:bookId",
  checkSchema(postRentValidation),
  handleError,
  postRent
);
router.get("/rent", getRent);
export { router };
