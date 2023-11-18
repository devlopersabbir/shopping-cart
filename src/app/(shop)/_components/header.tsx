import { Icons } from "@/components/icons";
import Link from "next/link";
import ShoppingCartComp from "./shopping-cart";
import UserNav from "./user-nav";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getAuthSesssion } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export default async function ShopHeader() {
  const session = await getAuthSesssion();
  return (
    <header className="border-b shadow fixed top-0 w-full bg-background z-10">
      <div className="max-w-5xl mx-auto flex h-14 items-center px-4">
        <Link href="/" className="text-sm font-medium flex items-center gap-2">
          <Icons.logo className="h-6 w-6" />
          <h1 className="text-2xl">Shopping Cart</h1>
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <Suspense fallback={<Skeleton className="h-8 w-8 rounded-full" />}>
            <ShoppingCartComp />
          </Suspense>
          <Suspense fallback={<Skeleton className="h-8 w-8 rounded-full" />}>
            {!session?.user ? (
              <Link href="/auth/sign-in">
                <Button className="ml-2">Login</Button>
              </Link>
            ) : (
              <UserNav />
            )}
          </Suspense>
        </div>
      </div>
    </header>
  );
}
