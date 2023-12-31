import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./addto-cart-button";
import { incrementProductQuantity } from "../actions";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card
      className="rounded-lg overflow-hidden col-span-2 md:col-span-1 relative h-fit shadow-xl border-none"
      key={product.id}
    >
      <Link href={`/products/${product.id}`}>
        <Image
          src={product.image}
          priority
          alt={product.name}
          height={200}
          width={350}
        />
      </Link>
      <CardHeader>
        <Link href={`/products/${product.id}`}>
          <CardTitle>{product.name}</CardTitle>
        </Link>
        {Date.now() - new Date(product.createdAt).getTime() <
        1000 * 60 * 60 * 24 * 7 ? (
          <Badge className="w-fit">New</Badge>
        ) : null}
        <CardDescription>
          {product.description.slice(0, 200)}...
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
        <AddToCartButton
          incrementProductQuantity={incrementProductQuantity}
          productId={product.id}
        />
      </CardFooter>
    </Card>
  );
}
