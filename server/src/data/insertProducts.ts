import * as fs from "fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function insertProducts() {
  try {
    const data = fs.readFileSync("./src/data/products.json", "utf8");
    const products = JSON.parse(data);

    for (const product of products) {
      await prisma.product.create({
        data: {
          name: product.name,
          description: product.description,
          price: product.price,
          tags: product.tags,
          createdAt: new Date(product.createdAt),
          updatedAt: new Date(product.updatedAt),
        },
      });
    }
    console.log("Products inserted successfully!");
  } catch (error) {
    console.error("Error inserting products:", error);
  } finally {
    await prisma.$disconnect();
  }
}

insertProducts();
