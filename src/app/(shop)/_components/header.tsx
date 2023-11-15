import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import ShoppingCartComp from "./shopping-cart";
import { getAuthSesssion } from "@/lib/auth";
import { UserNav } from "./user-nav";

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
          <ShoppingCartComp cart={null} />
          {session?.user ? (
            <UserNav user={session.user} />
          ) : (
            <Link
              href="/auth/sign-up"
              className={buttonVariants({
                size: "sm",
              })}
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
