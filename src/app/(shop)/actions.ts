"use server";

import { createCart, getCart } from "@/lib/cart";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function incrementProductQuantity(productId: number) {
  const cart = (await getCart()) ?? (await createCart());

  const itemsInCart = cart.items.find((item) => item.productId === productId);

  if (itemsInCart) {
    await prisma.cart.update({
      where: {
        id: cart.id,
      },
      data: {
        items: {
          update: {
            where: {
              id: itemsInCart.id,
            },
            data: {
              quantity: {
                increment: 1,
              },
            },
          },
        },
      },
    });
  } else {
    await prisma.cart.update({
      where: {
        id: cart.id,
      },
      data: {
        items: {
          create: {
            productId,
            quantity: 1,
          },
        },
      },
    });
  }

  revalidatePath("/");
}
