"use server";

import { productSchema } from "@/validator/schema";
import { ProductSchemaType } from "./_components/product-form";
import prisma from "@/lib/db";

export default async function createProduct(data: ProductSchemaType) {
  const { success } = productSchema.safeParse(data);
  if (!success) throw new Error("Invalid data");

  await prisma.product.create({
    data: {
      ...data,
      price: parseInt(data.price, 10),
    },
  });
}
