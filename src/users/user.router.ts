import express, { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import createHttpError from "http-errors";

import * as UserService from "./user.service";

export const userRouter = express.Router();

// GET: List of all users
userRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await UserService.listUsers();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

// GET: get user
userRouter.get(
  "/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId;
      const user = await UserService.getUser(userId);
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

// GET: login
userRouter.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, password } = req.body;
      const isRegisted = await UserService.getUser(userId);
      if (!isRegisted) {
        throw createHttpError.BadGateway("userID not registered");
      }
      const user = await UserService.checkUserExists(userId, password);
      if (!user) {
        throw createHttpError.BadGateway("Invalid username/password");
      }
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);
