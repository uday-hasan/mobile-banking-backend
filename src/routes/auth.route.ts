import { signIn, signUp } from "../controller/auth.controller";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/sign-up", signUp);
authRouter.post("/sign-in", signIn);
authRouter.post("/sign-out", (req, res) => {});

export default authRouter;
