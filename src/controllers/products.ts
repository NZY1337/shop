import { Request, Response } from "express";
import { prismaClient } from "..";
import { ProductSchemaValidator } from "../schema/users";

export const createProduct = async (req: Request, res: Response) => {
    ProductSchemaValidator.parse(req.body);
    const product = await prismaClient.product.create({
        data: {
            ...req.body,
            tags: req.body.tags.join(', ')
        }
    })

    res.status(200).json({ product })
}

export const updateProduct = async(req: Request, res: Response) => {
    ProductSchemaValidator.parse(req.body);
    let product = req.body;

    if (product.tags) product.tags = product.tags.join(', ');
    
    const updatedProduct = await prismaClient.product.update({
        where: {
            id: +req.params.id
        },
        data: product
    });

    res.status(200).json({ updatedProduct });
}

export const deleteProduct = async(req: Request, res: Response) => {
    const deletedProduct = await prismaClient.product.delete({
        where: {
            id: +req.params.id, // Use the product ID to identify the record
        },
    });

    res.status(200).json({ message: 'Product deleted successfully', deletedProduct });
}

export const listProducts = async(req: Request, res: Response) => {
    const skip = req.query.skip ? +req.query.skip : 0;
    const count = await prismaClient.product.count();
    const products = await prismaClient.product.findMany({ skip, take: 5 })

    res.status(200).json({ count, products })
}

export const getProductById = async(req: Request, res: Response) => {
    const product = await prismaClient.product.findFirstOrThrow({ // triggers the prisma exception: PrismaClientKnownRequestError
        where: {
            id: +req.params.id
        }
    });

    // if (product) throw new BadRequestException('hello World', ErrorCode.PRODUCT_NOT_FOUND, null)

    res.status(200).send({ product })
}