import { Request, Response } from "express";
import { CommentSchemaValidator } from "../validation/comments";
import { Comment } from "@prisma/client";
import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";

export const addComment = async (req: Request, res: Response) => {
  const validatedComment = CommentSchemaValidator.parse(req.body);

  const comment: Comment = await prismaClient.comment.create({
    data: {
      userId: req?.user?.id as number,
      content: validatedComment.content,
      productId: validatedComment.productId,
    },
  });

  res.status(200).send({ comment });
};

export const deleteCommentById = async (req: Request, res: Response) => {
  const commentId = +req.params.id;

  const comment = await prismaClient.comment.findUniqueOrThrow({
    where: {
      id: commentId,
    },
  });

  // if the current user is not the owner of the comment, throw an error
  if (comment.userId !== req?.user?.id) {
    throw new NotFoundException("Comment not found", ErrorCode.NOT_FOUND);
  }

  await prismaClient.comment.delete({
    where: {
      id: commentId,
    },
  });

  res.status(200).send({ message: "Comment deleted" });
};

// tis function will return all comments for a specific product and also return the user who wrote the comment
// the query will be like this:
// SELECT "content", "userId" FROM "comments" JOIN "users" ON "comments"."userId" = "users"."id" WHERE "comments"."productId" = 20;
export const getCommentsByProductId = async (req: Request, res: Response) => {
  const productId = +req.params.id;

  const comments = await prismaClient.comment.findMany({
    where: {
      productId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  res.status(200).send({ comments });
};
