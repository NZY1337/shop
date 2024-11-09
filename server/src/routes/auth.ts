import { Router } from "express";

import {
  signUp,
  signIn,
  getUser,
  validateUserEmail,
  forgotPassword,
  resetPassword,
  logout,
  refreshToken,
} from "../controllers/auth";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";

const authRouter: Router = Router();

authRouter.post("/signUp", errorHandler(signUp));
authRouter.post("/signIn", errorHandler(signIn));
authRouter.post("/forgot-password", errorHandler(forgotPassword));
authRouter.post("/reset-password", errorHandler(resetPassword));
authRouter.post("/validate", errorHandler(validateUserEmail));
authRouter.delete("/logout", errorHandler(logout));
authRouter.get("/user", [authMiddleware], errorHandler(getUser));
authRouter.post("/refresh-token", errorHandler(refreshToken));

export default authRouter;
