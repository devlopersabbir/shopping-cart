import PageHeading from "@/app/admin/_components/page-heading";
import { buttonVariants } from "@/components/ui/button";
import { getCart } from "@/lib/cart";
import Link from "next/link";
import CartItem from "./_components/cart-item";
import { placeOrder, setProductQuantity } from "./acitons";
import OrderButton from "./_components/order-btn";

export default async function CartPage() {
  const cart = await getCart();

  return (
    <div>
      <PageHeading
        title="Shopping Cart"
        description="Manage you shopping cart"
      />
      <ul className="space-y-4 mt-5">
        {!cart ? (
          <div className="mt-4">
            <Link href="/" className={buttonVariants()}>
              Go to shopping
            </Link>
          </div>
        ) : (
          cart?.items?.map((item) => (
            <CartItem
              setProductQuantity={setProductQuantity}
              item={item}
              key={item.id}
            />
          ))
        )}
      </ul>
      {cart ? (
        <div className="mt-5 space-y-2">
          <h5 className="text-xl font-semibold">
            Total: ${cart?.subtotal?.toFixed(2) || 0}
          </h5>
          <div className="space-x-4">
            <Link href="/" className={buttonVariants({ variant: "outline" })}>
              Go to shopping
            </Link>
            <OrderButton cartId={cart.id} action={placeOrder} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
