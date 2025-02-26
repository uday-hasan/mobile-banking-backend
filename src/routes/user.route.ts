import { Router } from "express";
import USER from "../models/user.model";

const userRouter = Router();

userRouter.post("/sign-up", async (req, res) => {
  const { email, mobile, nid } = req.body;
  const isExist = await USER.find({ email, mobile, nid });
  if (isExist) {
    console.log(isExist);
  }
  res.json({ message: "User signed up successfully" });
});

export default userRouter;
