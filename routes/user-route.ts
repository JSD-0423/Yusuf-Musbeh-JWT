import { Router } from "express";
import {
  getRent,
  postLogin,
  postRent,
  postSignup,
} from "../controllers/user-controller";

const publicRouter = Router();
const protectedRouter = Router();
publicRouter.post("/signup", postSignup);
publicRouter.post("/login", postLogin);
protectedRouter.post("/rent/:bookId", postRent);
protectedRouter.get("/rent", getRent);
export { publicRouter, protectedRouter };
