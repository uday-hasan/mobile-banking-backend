import { NextFunction, Request, Response } from "express";
import USER from "../models/user.model";

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await USER.find({});
    res.status(200).json({ success: "Fetched Users", data: { user: users } });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await USER.findById(req.params.id);
    res.status(200).json({ success: "Fetched User", data: { user: users } });
  } catch (error) {
    next(error);
  }
};

export { getUsers, getUser };
