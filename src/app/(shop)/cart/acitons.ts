"use server";

import { getAuthSesssion } from "@/lib/auth";
import { createCart, getCart } from "@/lib/cart";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

export async function placeOrder(cartId: number) {
  const session = await getAuthSesssion();
  if (!session?.user) return redirect("/auth/sign-in");

  await prisma.$transaction(async (tx) => {
    if (!session?.user) return redirect("/auth/sign-in");
    // create new order
    await tx.order.create({
      data: {
        cartId,
        customerId: session.user.id,
      },
    });
    // updated cart when order placed
    // we should update letter (that's not good way😁)
    await tx.cart.updateMany({
      where: {
        userId: session.user.id,
      },
      data: {
        userId: null,
      },
    });
    revalidatePath("/cart");
  });
}
