import { Router } from "express";
import { errorHandler } from "../error-handler";
import { createOrder, cancelOrder, getOrderById, listOrders } from "../controllers/orders";
import authMiddleware from "../middlewares/auth";

const orderRouter: Router = Router();
    
orderRouter.post('/', [authMiddleware], errorHandler(createOrder));
orderRouter.get('/', [authMiddleware], errorHandler(listOrders));
orderRouter.get('/:id/cancel', [authMiddleware], errorHandler(cancelOrder));
orderRouter.get('/:id', [authMiddleware], errorHandler(getOrderById));

export default orderRouter;