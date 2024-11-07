import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";

// we have to call next because we are not wrapping the middleware inside errorHandler HOC
const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (user?.role == "ADMIN") {
    next();
  } else {
    next(
      new UnauthorizedException("You're not an ADMIN", ErrorCode.UNAUTHORIZED)
    );
  }
};

export default adminMiddleware;
