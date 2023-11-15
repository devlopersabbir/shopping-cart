import { PropsWithChildren } from "react";
import ShopHeader from "./_components/header";

export default function ShopLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <ShopHeader />
      <main className="max-w-5xl mx-auto px-4 mt-14 py-4">{children}</main>
    </div>
  );
}
