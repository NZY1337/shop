import { Request, Response } from "express";
import {
  CartSchemaValidator,
  ChangeQuantitySchemaValidator,
} from "../validation/cart";
import { Product, CartItem } from "@prisma/client";
import { prismaClient } from "..";

export const addItemToCart = async (req: Request, res: Response) => {
  const validatedCart = CartSchemaValidator.parse(req.body);

  // find product that you want to add
  const product: Product = await prismaClient.product.findFirstOrThrow({
    where: { id: validatedCart.productId },
  });

  // check if the product is already added or not
  const existingCartItem = await prismaClient.cartItem.findFirst({
    where: {
      userId: req?.user?.id,
      productId: validatedCart.productId,
    },
  });

  let cartItemToBeAdded: CartItem;

  if (existingCartItem) {
    // Update quantity if product already exists in cart
    cartItemToBeAdded = await prismaClient.cartItem.update({
      where: { id: existingCartItem.id },
      data: { quantity: existingCartItem.quantity + 1 },
    });
  } else {
    // Add new item to cart if it doesn't exist
    cartItemToBeAdded = await prismaClient.cartItem.create({
      data: {
        userId: req?.user?.id as number,
        productId: product.id,
        quantity: validatedCart.quantity,
      },
    });
  }

  res.status(200).send({ cartItem: cartItemToBeAdded });
};

export const changeItemQuantity = async (req: Request, res: Response) => {
  const validatedData = ChangeQuantitySchemaValidator.parse(req.body);

  const cartItem = await prismaClient.cartItem.findFirstOrThrow({
    where: { id: +req.params.id, userId: req?.user?.id },
  });

  if (validatedData.quantity <= 0) {
    await prismaClient.cartItem.delete({ where: { id: cartItem.id } });
    return res.status(200).send({ message: "Item removed from cart" });
  }

  await prismaClient.cartItem.update({
    where: { id: cartItem.id },
    data: {
      quantity: validatedData.quantity,
    },
  });

  res.status(200).send({ message: "Item updated" });
};

export const deleteItemFromCart = async (req: Request, res: Response) => {
  // first check if user is deleting its own cart items
  const cartItem = await prismaClient.cartItem.findFirstOrThrow({
    where: {
      id: +req.params.id,
      userId: req?.user?.id,
    },
  });

  await prismaClient.cartItem.delete({
    where: { id: cartItem.id },
  });

  res.status(200).send({ message: "Item removed from cart" });
};

export const getCart = async (req: Request, res: Response) => {
  const cart = await prismaClient.cartItem.findMany({
    where: {
      userId: req?.user?.id,
    },
    include: {
      product: true, // include the relation
    },
  });

  res.status(200).send({ cart });
};
