import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/env";
import USER, { IUser } from "../models/user.model";

interface IRequest extends Request {
  user: IUser;
}

const authorization = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      const error: any = new Error("Unauthorized/no token");
      error.statusCode = 401;
      throw error;
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === "object" && "userId" in decoded) {
      const user = await USER.findById(decoded.userId);
      if (!user) {
        const error: any = new Error("Unauthorized/ No user found");
        error.statusCode = 401;
        throw error;
      }
      req.user = user;
      next();
    } else {
      const error: any = new Error("Unauthorized/ Invalid token");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

export default authorization;
