"use server";

import { createCart, getCart } from "@/lib/cart";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function setProductQuantity(productId: number, quantity: number) {
  const cart = (await getCart()) ?? (await createCart());
  const itemsInCart = cart.items.find((item) => item.productId === productId);

  if (itemsInCart) {
    if (quantity === 0) {
      await prisma.cart.update({
        where: {
          id: cart.id,
        },
        data: {
          items: {
            delete: {
              id: itemsInCart.id,
            },
          },
        },
      });
    } else {
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            update: {
              where: {
                id: itemsInCart.id,
              },
              data: {
                quantity,
              },
            },
          },
        },
      });
    }
  } else {
    if (quantity > 0) {
      await prisma.cart.update({
        where: {
          id: cart.id,
        },
        data: {
          items: {
            create: {
              productId,
              quantity,
            },
          },
        },
      });
    }
  }

  revalidatePath("/cart");
}
