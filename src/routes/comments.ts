import { Router } from "express";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";
import { addComment, getCommentsByProductId } from "../controllers/comments";

const commentsRouter: Router = Router();

commentsRouter.post("/", [authMiddleware], errorHandler(addComment));
commentsRouter.get("/:id", errorHandler(getCommentsByProductId));

export default commentsRouter;
