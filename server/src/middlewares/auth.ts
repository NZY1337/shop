import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";
import { JWT_SECRET } from "../secrets";
import * as jwt from "jsonwebtoken";
import { prismaClient } from "..";
import { User } from "@prisma/client";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 1. extract token from header
  const token = req.cookies.token; // Access token from cookies

  // 2. if !token throw an error of unauthorized
  if (!token) {
    next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
  }

  try {
    // 3. if token, verify token and extract the payload
    const payload = jwt.verify(token, JWT_SECRET) as any;

    // const tokenLifespan = 60; // 1 minute in seconds
    const tokenLifespan = 86400; // 1 day in seconds
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    // Check if the token is expiring soon based on the 'iat' claim
    const isExpiringSoon = payload.iat + tokenLifespan - currentTime < 600; // 10 minutes (600 seconds)

    if (isExpiringSoon) {
      res.set("X-Session-Warning", "Your session will expire soon");
    }

    // 4. get the user from the payload
    const user: User | null = await prismaClient.user.findFirst({
      where: {
        id: payload?.userId, // 'userId' from singIn controller
      },
    });

    if (!user)
      next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));

    // 5. to attatch the user to the current request object
    req.user = user as any;
    next();
  } catch (error) {
    next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
  }
};

export default authMiddleware;
