import { Router } from "express";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";
import { addAddress, deleteAddress, listAddress, updateAddress, updateUser } from "../controllers/users";

const usersRouter: Router = Router();

usersRouter.post('/address', [authMiddleware], errorHandler(addAddress));
usersRouter.delete('/address/:id', [authMiddleware], errorHandler(deleteAddress));
usersRouter.get('/address', [authMiddleware], errorHandler(listAddress));
usersRouter.put('/address/:id', [authMiddleware], errorHandler(updateAddress));
usersRouter.put('/', [authMiddleware], errorHandler(updateUser));
  
export default usersRouter;