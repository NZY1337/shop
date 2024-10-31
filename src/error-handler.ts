import { Request, Response, NextFunction } from "express";
import { ErrorCode, HttpException } from "./exceptions/root";
import { InternalException } from "./exceptions/internal-exception";
import { Prisma } from "@prisma/client";
import { NotFoundException } from "./exceptions/not-found";
import { ZodError } from "zod";
import { BadRequestException } from "./exceptions/bad-request";

// HOC
export const errorHandler = (method: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await method(req, res, next);
            
        } catch(error: any) {
            let exception: HttpException;

            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                const modelName = error?.meta?.modelName || "Resource"; // Product, User, Comment, etc...
                exception = new NotFoundException(`${modelName} not found`, ErrorCode.NOT_FOUND);

            } else if (error instanceof HttpException) {
                exception = error

            } else if (error instanceof ZodError) {
                exception = new BadRequestException('Unprocessed Entity', ErrorCode.UNPROCESSABLE_ENTITY, error);

            } else {
                exception = new InternalException('Something went wrong!', error, ErrorCode.INTERNAL_EXCEPTION);
            }
            
            next(exception);
        }
    }
}