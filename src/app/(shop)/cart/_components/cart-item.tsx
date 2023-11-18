"use client";
import { CartItemWithProduct } from "@/lib/cart";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useTransition } from "react";
import toast from "react-hot-toast";

type Props = {
  item: CartItemWithProduct;
  setProductQuantity: (productId: number, quantity: number) => Promise<void>;
};

export default function CartItem({ item, setProductQuantity }: Props) {
  const [isPending, startTransition] = useTransition();

  const { product } = item;
  const { quantity } = item;

  const quantityOptions: JSX.Element[] = [];

  for (let i = 0; i < 50; i++) {
    quantityOptions.push(
      <option value={i + 1} key={i}>
        {i + 1}
      </option>
    );
  }

  return (
    <li className="flex gap-4 items-center">
      <Image
        src={product.image}
        width={100}
        height={100}
        alt={product.name}
        className="rounded-lg"
      />
      <div className="flex w-full flex-col flex-auto  items-center gap-4 md:flex-row ">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <h4 className="text-md text-muted-foreground">
          ${product.price.toFixed(2)}
        </h4>

        {isPending ? (
          <Loader2 className="animate-spin h-5 w-5" />
        ) : (
          <select
            className="px-2 py-2 rounded-md bg-muted"
            defaultValue={quantity.toString()}
            onChange={(e) => {
              const newQuantity = parseInt(e.target.value);
              startTransition(async () => {
                try {
                  await setProductQuantity(product.id, newQuantity);
                } catch (error) {
                  toast.error("Out of stock");
                }
              });
            }}
          >
            <option value={0}>Remove</option>
            {quantityOptions}
          </select>
        )}
        <h4 className="text-md">Total: ${product.price * quantity}</h4>
      </div>
    </li>
  );
}
