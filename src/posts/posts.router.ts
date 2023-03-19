import express, { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import createHttpError from "http-errors";

import * as PostsService from "./posts.service";

export const postsRouter = express.Router();

// GET: List of all users
postsRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const posts = await PostsService.listAllPosts();
      return res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  }
);

// GET: get user
postsRouter.get(
  "/:postId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postId = req.params.postId;
      const post = await PostsService.getPost(postId);
      return res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  }
);
