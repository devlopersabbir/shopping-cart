import PageHeading from "@/app/admin/_components/page-heading";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";

const Checkout = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-20 gap-7">
      <h1 className="text-3xl font-semibold text-green-600">
        Your order placed successfully!
      </h1>
      <Link href="/" className={buttonVariants()}>
        Go to shopping
      </Link>
    </div>
  );
};

export default Checkout;
