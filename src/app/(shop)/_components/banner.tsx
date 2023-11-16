import Image from "next/image";
import AddToCartButton from "./addto-cart-button";
import prisma from "@/lib/db";
import { incrementProductQuantity } from "../actions";
import { sleep } from "@/lib/utils";

export default async function HeroBanner() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 1,
  });
  if (products.length > 1) return null;

  const featureProduct = products[0];
  return (
    <figure className="flex flex-col  md:flex-row items-center gap-4">
      <Image
        src={featureProduct.image}
        alt={featureProduct.name}
        width={500}
        height={500}
        className="rounded-md shadow-md"
      />
      <div className="space-y-4">
        <h1 className="text-2xl font-semibod tracking-tight">
          {featureProduct.name}
        </h1>
        <p className="text-muted-foreground">
          {featureProduct.description.slice(0, 300)}...
        </p>
        <AddToCartButton
          incrementProductQuantity={incrementProductQuantity}
          productId={featureProduct.id}
        />
      </div>
    </figure>
  );
}
