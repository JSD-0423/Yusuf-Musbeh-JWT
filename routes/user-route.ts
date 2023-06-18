import { Router } from "express";
import { postSignup } from "../controllers/user-controller";

const router = Router();
router.post("/signup", postSignup);
export { router };
