import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ShoppingCart } from "@/lib/cart";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";

export default function ShoppingCartComp({
  cart,
}: {
  cart: ShoppingCart | null;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative">
          <ShoppingCartIcon className="cursor-pointer" />
          <Badge className="absolute -right-5 -top-4">{cart?.size ?? 0}</Badge>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <h5 className="text-lg font-medium">Items: {cart?.size ?? 0}</h5>
            <p className="text-sm leading-none text-muted-foreground">
              Subtotal: ${cart?.subtotal?.toFixed(2) || 0}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/cart" className={buttonVariants()}>
              View Cart
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
