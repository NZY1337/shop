import { Request, Response } from "express";
import {
  AddressSchemaValidator,
  UpdateUserSchemaValidator,
} from "../schema/users";
import { prismaClient } from "..";
import { Address } from "@prisma/client";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";

export const addAddress = async (req: Request, res: Response) => {
  AddressSchemaValidator.parse(req.body);

  const address = await prismaClient.address.create({
    data: {
      ...req.body,
      userId: req?.user?.id, // from middleware
    },
  });

  res.status(200).json({ address });
};

export const deleteAddress = async (req: Request, res: Response) => {
  const deletedAddress = await prismaClient.address.delete({
    where: {
      id: +req.params.id,
    },
  });

  res
    .status(200)
    .json({ message: "Address deleted successfully", deletedAddress });
};

export const listAddress = async (req: Request, res: Response) => {
  const addresses = await prismaClient.address.findMany({
    where: {
      userId: req?.user?.id,
    },
  });

  res.status(200).json({ addresses });
};

export const updateAddress = async (req: Request, res: Response) => {
  let product = req.body;

  const updateAddress = await prismaClient.address.update({
    where: {
      id: +req.params.id,
    },
    data: product,
  });

  res.status(200).json({ address: updateAddress });
};

export const updateUser = async (req: Request, res: Response) => {
  /*
        . the user has a drop drown (for ex) with addresses and he can switch between the addresses
        . every single address has its id that belongs to the current user
        . we make the check to be sure if the address is for the current user
    */

  const validatedData = UpdateUserSchemaValidator.parse(req.body); // returns an object

  if (validatedData.defaultShippingAddress) {
    // check if the shipping address exists
    const shippingAddress: Address =
      await prismaClient.address.findFirstOrThrow({
        where: {
          id: validatedData.defaultShippingAddress,
        },
      });

    // to test this: change the Address's userId that belongs to the current user to another userId - from prisma studio
    if (shippingAddress.userId !== req?.user?.id) {
      throw new BadRequestException(
        "Invalid shipping address",
        ErrorCode.NOT_FOUND,
        null
      );
    }
  }

  if (validatedData.defaultBillingAddress) {
    const defaultBillingAddress: Address =
      await prismaClient.address.findFirstOrThrow({
        where: {
          id: validatedData.defaultBillingAddress,
        },
      });

    if (defaultBillingAddress.userId !== req?.user?.id) {
      throw new BadRequestException(
        "Invalid billing address",
        ErrorCode.NOT_FOUND,
        null
      );
    }
  }

  const updatedUser = await prismaClient.user.update({
    where: {
      id: req?.user?.id,
    },
    data: validatedData,
  });

  res.status(200).json({ updatedUser });
};
