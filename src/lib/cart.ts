import { Cart, CartItem, Prisma } from "@prisma/client";

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
