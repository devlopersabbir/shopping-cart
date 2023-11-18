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

export async function mergeAnonymousCartIntoUserCart(userId: number) {
  const localCartIt = cookies().get("localCartId")?.value;
  const localCart = localCartIt
    ? await prisma.cart.findUnique({
        where: { id: parseInt(localCartIt, 10) },
        include: {
          items: true,
        },
      })
    : null;

  if (!localCart) return;

  const userCart = await prisma.cart.findFirst({
    where: {
      userId,
    },
    include: {
      items: true,
    },
  });

  await prisma.$transaction(async (tx) => {
    if (userCart) {
      const mergedCartItems = mergeCartItems(localCart.items, userCart.items);

      // delete user cart items
      await tx.cartItem.deleteMany({
        where: {
          cartId: userCart.id,
        },
      });

      // insert merge cart items into user cart
      await tx.cart.update({
        where: { id: userCart.id },
        data: {
          items: {
            createMany: {
              data: mergedCartItems.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
            },
          },
        },
      });
    } else {
      // create use cart  with local cart
      await tx.cart.create({
        data: {
          userId,
          items: {
            createMany: {
              data: localCart.items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
            },
          },
        },
      });
    }

    // delete the local cart from  database
    await tx.cart.delete({
      where: {
        id: localCart.id,
      },
    });

    // delete the cookie

    cookies().set("localCartId", "");
  });
}

export function mergeCartItems(...cartItems: CartItem[][]) {
  return cartItems.reduce((acc, items) => {
    items.forEach((item) => {
      const existingItem = acc.find((i) => i.productId === item.productId);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        acc.push(item);
      }
    });
    return acc;
  }, [] as CartItem[]);
}
