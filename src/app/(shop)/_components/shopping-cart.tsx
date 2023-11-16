import { Badge } from "@/components/ui/badge";
import { getCart } from "@/lib/cart";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";

export default async function ShoppingCartComp() {
  const cart = await getCart();
  return (
    <Link href="/cart" className="relative">
      <ShoppingCartIcon className="cursor-pointer" />
      <Badge className="absolute -right-5 -top-4">{cart?.size ?? 0}</Badge>
    </Link>
  );
}
