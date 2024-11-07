import { Request, Response } from "express";
import { prismaClient } from "..";
import { Address, CartItem, Order, Product } from "@prisma/client";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";

export const createOrder = async (req: Request, res: Response) => {
  return await prismaClient.$transaction(async (tx) => {
    const cartItems: (CartItem & { product: Product })[] =
      await tx.cartItem.findMany({
        where: {
          userId: req?.user?.id,
        },
        include: {
          product: true,
        },
      });

    if (cartItems.length === 0)
      return res.status(200).json({ message: "cart is empty" });

    const price = cartItems.reduce((prev, curr) => {
      return prev + curr.quantity * +curr.product.price;
    }, 0);

    // this is important - error 500
    const address: Address & { formattedAddress: string } =
      await tx.address.findFirstOrThrow({
        where: {
          id: req?.user?.defaultShippingAddress!,
        },
      });

    const order: Order = await tx.order.create({
      data: {
        userId: req?.user?.id as number,
        netAmount: price,
        address: address?.formattedAddress,
        products: {
          create: cartItems.map((cart) => {
            return {
              productId: cart.productId,
              quantity: cart.quantity,
            };
          }),
        },
      },
    });

    await tx.orderEvent.create({
      data: {
        orderId: order.id,
        // status: "PENDING" - default
      },
    });

    await tx.cartItem.deleteMany({
      where: {
        userId: req?.user?.id,
      },
    });

    return res.status(200).json({ order });
  });
};

export const listOrders = async (req: Request, res: Response) => {
  const orders: Order[] = await prismaClient.order.findMany({
    where: {
      userId: req?.user?.id,
    },
  });

  res.status(200).json({ orders });
};

export const cancelOrder = async (req: Request, res: Response) => {
  const orderId = +req.params.id;
  const userId = req?.user?.id; // Assuming req.user contains the authenticated user's information.

  // First, fetch the order to check if it belongs to the logged-in user
  const order = await prismaClient.order.findUnique({
    where: {
      id: orderId,
    },
  });

  if (!order) {
    throw new NotFoundException("Order not found", ErrorCode.NOT_FOUND);
  }

  // Check if the order belongs to the logged-in user
  if (order.userId !== userId)
    throw new NotFoundException(
      "You can only cancel your own order",
      ErrorCode.NOT_FOUND
    );

  // Proceed with cancellation if the user owns the order
  return await prismaClient.$transaction(async (tx) => {
    const updatedOrder = await tx.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: "CANCELLED",
      },
    });

    await tx.orderEvent.create({
      data: {
        orderId: updatedOrder.id,
        status: "CANCELLED",
      },
    });

    res.status(200).json({ order: updatedOrder });
  });
};

export const getOrderById = async (req: Request, res: Response) => {
  const order = await prismaClient.order.findFirstOrThrow({
    where: {
      id: +req.params.id,
    },
    include: {
      products: true,
      events: true,
    },
  });

  res.status(200).json({ order });
};
