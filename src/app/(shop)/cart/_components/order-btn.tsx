"use client";
import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { placeOrder } from "../acitons";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type TOrderButton = {
  cartId: number;
  action: (cartId: number) => Promise<void>;
};
const OrderButton = ({ cartId, action }: TOrderButton) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      isLoading={isPending}
      onClick={() => {
        startTransition(async () => {
          try {
            await action(cartId);
            router.push("/success");
          } catch (err: any) {
            toast.error("You are not logged in!");
            router.push("/auth/sign-in");
          }
        });
      }}
    >
      Place Order
    </Button>
  );
};

export default OrderButton;
