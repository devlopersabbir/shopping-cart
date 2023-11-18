import PageHeading from "@/app/admin/_components/page-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const Checkout = () => {
  return (
    <div>
      <PageHeading title="Checkout" />
      <div className="flex justify-between w-full border-2 my-5">
        <div className="leftSide  w-[65%] p-4">
          <h1 className="font-semibold">Shipping Details</h1>
          <form>
            <label htmlFor="address">Address</label>
            <Input type="text" placeholder="Enter your address" />
          </form>
        </div>
        <div className="rightSide  w-[35%] dark:bg-zinc-800 bg-gray-300 p-4 rounded-md shadow-lg dark:text-white text-gray-900 flex flex-col gap-5">
          <h1 className="text-2xl font-semibold">Your Order</h1>
          <div className="details border-b-2">
            <p>Order details/address</p>
            <p>Order details/address</p>
            <p>Order details/address</p>
            <p>Order details/address</p>
          </div>
          <div className="amount border-b-2">
            <h1>Total Ammount</h1>
            <p className="font-semibold text-xl">$223</p>
          </div>
          <Button className="w-full">Place Order</Button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
