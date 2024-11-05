import { Router } from "express";
import { errorHandler } from "../error-handler";
import {
  addItemToCart,
  deleteItemFromCart,
  changeItemQuantity,
  getCart,
} from "../controllers/cart";
import authMiddleware from "../middlewares/auth";

const cartRouter: Router = Router();

cartRouter.post("/", [authMiddleware], errorHandler(addItemToCart));
cartRouter.delete("/:id", [authMiddleware], errorHandler(deleteItemFromCart));
cartRouter.put("/:id", [authMiddleware], errorHandler(changeItemQuantity));
cartRouter.get("/", [authMiddleware], errorHandler(getCart));

export default cartRouter;
