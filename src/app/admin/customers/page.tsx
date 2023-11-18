import React, { Suspense } from "react";
import PageHeading from "../_components/page-heading";
import { Skeleton } from "@/components/ui/skeleton";
import CustomerTable from "./_components/customer-table";

const CustomerPage = () => {
  return (
    <div>
      <PageHeading title="Customers" description="Manage customers" />
      <Suspense
        fallback={
          <div className="space-y-4">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        }
      >
        <CustomerTable />
      </Suspense>
    </div>
  );
};

export default CustomerPage;
