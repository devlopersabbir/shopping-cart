"use client";

import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import toast from "react-hot-toast";

type Props = {
  productId: number;
  incrementProductQuantity: (productId: number) => Promise<void>;
};
export default function AddToCartButton({
  productId,
  incrementProductQuantity,
}: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      isLoading={isPending}
      onClick={() => {
        startTransition(async () => {
          try {
            await incrementProductQuantity(productId);
            toast.success("Product added to your shopping cart!");
          } catch (error) {
            toast.error("Something went wrong!");
          }
        });
      }}
    >
      Add to cart
    </Button>
  );
}
