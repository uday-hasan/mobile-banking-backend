import { NextFunction, Request, Response } from "express";
import USER from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/env";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const values = req.body;
    const { email, nid, mobile, pin } = values;
    const isExist = await USER.findOne({
      $or: [{ email }, { nid }, { mobile }],
    });

    if (isExist) {
      res
        .status(400)
        .json({ message: "Email, NID, or Mobile already exists." });
      return;
    }
    if (pin.length < 5 || pin.length > 5) {
      res.status(400).json({ message: "Pin must be 5 digits long." });
      return;
    }
    const hashedPin = await bcrypt.hash(pin, await bcrypt.genSalt(11));
    const newUser = await new USER({ ...values, pin: hashedPin }).save();
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: "10min",
    });
    res.status(201).json({
      message: "User registered successfully",
      data: { token, user: newUser },
    });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { accessor, pin } = req.body;
    const user = await USER.findOne({
      $or: [{ email: accessor }, { mobile: accessor }],
    });
    if (!user) {
      const error: any = new Error("No user found");
      error.statusCode = 404;
      throw error;
    }
    const isMatch = await bcrypt.compare(pin, user.pin);
    if (!isMatch) {
      const error: any = new Error("Invalid Credentials");
      error.statusCode = 404;
      throw error;
    }
    const isSessionActive = user.activeSession;
    if (isSessionActive) {
      const error: any = new Error(
        "A session is active already. Please signout and then signin to continue"
      );
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "10min",
    });
    user.activeSession = token;
    const updated = await user.save();
    res.status(200).json({
      message: "User logged in successfully",
      data: { token, user: updated },
    });
  } catch (error) {
    next(error);
  }
};
