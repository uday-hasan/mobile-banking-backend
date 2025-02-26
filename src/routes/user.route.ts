import { Router } from "express";
import USER from "../models/user.model";
import { getUser, getUsers } from "../controller/user.controller";
import authorization from "../middleware/authorization.middleware";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", authorization, getUser);

export default userRouter;
