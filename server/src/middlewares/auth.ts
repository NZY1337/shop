import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";
import { JWT_SECRET } from "../secrets";
import * as jwt from "jsonwebtoken";
import { prismaClient } from "..";
import { User } from "@prisma/client";
import { generateToken } from "../utils";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token; // Access token from cookies
  const refreshToken = req.cookies.refreshToken; // Refresh token from cookies

  if (!token) {
    next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;

    const tokenLifespan = 60; // 1 minute in seconds
    // const tokenLifespan = 86400; // 1 day in seconds
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    // Check if the token is expiring soon based on the 'iat' claim
    const isExpiringSoon = payload.iat + tokenLifespan - currentTime; // 10 minutes (600 seconds)

    const user: User | null = await prismaClient.user.findFirst({
      where: {
        id: payload?.userId,
      },
    });

    if (!user) {
      return next(
        new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED)
      );
    }

    req.user = { ...user, isExpiringSoon } as User;
    next();
  } catch (error) {
    if (refreshToken) {
      try {
        const refreshPayload = jwt.verify(refreshToken, JWT_SECRET) as any;
        const user: User | null = await prismaClient.user.findFirst({
          where: {
            id: refreshPayload?.userId,
          },
        });

        if (!user?.id) {
          return next(
            new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED)
          );
        }

        const { token, options } = generateToken(user.id);
        res.cookie("token", token, options);

        req.user = user;
        next();
      } catch (refreshError) {
        next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
      }
    } else {
      next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
    }
  }
};

export default authMiddleware;
