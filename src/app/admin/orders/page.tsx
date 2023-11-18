import React, { Suspense } from "react";
import PageHeading from "../_components/page-heading";
import { Skeleton } from "@/components/ui/skeleton";
import OrderTable from "./_components/order-table";

const page = () => {
  return (
    <div>
      <PageHeading title="Order" description="Your all orders" />
      <Suspense
        fallback={
          <div className="space-y-4">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        }
      >
        <OrderTable />
      </Suspense>
    </div>
  );
};

export default page;
