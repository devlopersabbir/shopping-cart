import { Cart, CartItem, Prisma } from "@prisma/client";
import { getAuthSesssion } from "./auth";
import { cookies } from "next/dist/client/components/headers";
import prisma from "./db";

export type CartWithProduct = Prisma.CartGetPayload<{
  include: {
    items: {
      include: {
        product: true;
      };
    };
  };
}>;

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: {
    product: true;
  };
}>;

export type ShoppingCart = CartWithProduct & {
  size: number;
  subtotal: number;
};

export async function getCart(): Promise<ShoppingCart | null> {
  const session = await getAuthSesssion();

  let cart: CartWithProduct | null = null;

  if (session?.user) {
    cart = await prisma.cart.findFirst({
      where: {
        userId: session.user.id,
      },
      include: {
        items: {
          include: {
            product: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
  } else {
    const localCartIt = cookies().get("localCartId")?.value;
    cart = localCartIt
      ? await prisma.cart.findUnique({
          where: { id: parseInt(localCartIt, 10) },
          include: {
            items: {
              include: {
                product: true,
              },
              orderBy: {
                createdAt: "desc",
              },
            },
          },
        })
      : null;
  }

  if (!cart) {
    return null;
  }

  return {
    ...cart,
    size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
    subtotal: cart.items.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0
    ),
  };
}

export async function createCart(): Promise<ShoppingCart> {
  let newCart: Cart;
  const session = await getAuthSesssion();

  if (session?.user) {
    newCart = await prisma.cart.create({
      data: {
        userId: session.user.id,
      },
    });
  } else {
    newCart = await prisma.cart.create({
      data: {},
    });
    // TODO needs to encryption + secure settings in real production app
    cookies().set("localCartId", String(newCart.id));
  }

  return {
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0,
  };
}
