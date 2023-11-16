import { buttonVariants } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import PageHeading from "../_components/page-heading";
import { Suspense } from "react";
import ProductsTable from "./_components/products-table";
import { Skeleton } from "@/components/ui/skeleton";

export default async function ProductPage() {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
      <PageHeading
        title="Products"
        description="Manage you products"
        toolbar={
          <Link className={buttonVariants()} href="/admin/products/new">
            <PlusIcon className="h-4 w-4 mr-2" />
            Create a Product
          </Link>
        }
      />

      <Suspense
        fallback={
          <div className="space-y-4">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        }
      >
        <ProductsTable />
      </Suspense>
    </div>
  );
}
