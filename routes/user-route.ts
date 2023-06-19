import { Router } from "express";
import {
  postLogin,
  postRent,
  postSignup,
} from "../controllers/user-controller";

const publicRouter = Router();
const protectedRouter = Router();
publicRouter.post("/signup", postSignup);
publicRouter.post("/login", postLogin);
protectedRouter.post("/rent", postRent);
export { publicRouter, protectedRouter };
