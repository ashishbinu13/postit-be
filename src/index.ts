import * as dotenv from "dotenv";
import express, {
  Application,
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import cors from "cors";
import morgan from "morgan";
import createHttpError from "http-errors";
import { userRouter } from "./users/user.router";
import { postsRouter } from "./posts/posts.router";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT = parseInt(process.env.PORT as string, 10);

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/users", userRouter);
app.use("/api/posts", postsRouter);

// error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new createHttpError.NotFound());
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({ status: err.status || 500, message: err.message });
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port: http://localhost:${PORT}`);
});
