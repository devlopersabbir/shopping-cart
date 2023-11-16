import HeroBanner from "./_components/banner";
import { Suspense } from "react";
import ProductGrid from "./_components/products-grid";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type PageProps = {
  searchParams: {
    page: string;
  };
};

export default async function HomePage({
  searchParams: { page = "1" },
}: PageProps) {
  const currentPage = parseInt(page);
  return (
    <section className="w-full">
      {currentPage === 1 && (
        <Suspense
          fallback={
            <div className="flex w-full flex-col  md:flex-row items-center gap-4">
              <Skeleton className="rounded-md w-full h-[400px] shadow-md" />
              <div className="space-y-4 w-full">
                <Skeleton className="h-8 w-24" />

                <Skeleton className="h-5 w-12" />

                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            </div>
          }
        >
          <HeroBanner />
        </Suspense>
      )}
      <h1 className="my-4 font-semibold text-2xl">Best selling products</h1>
      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <Card
                className="rounded-lg overflow-hidden col-span-2 md:col-span-1 relative h-fit shadow-xl border-none"
                key={i}
              >
                <Skeleton className="w-full h-80" />
                <CardHeader className="space-y-4">
                  <Skeleton className="h-5 w-1/2" />
                  <Skeleton className="h-5 w-12" />

                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <Skeleton className="h-4 w-14" />
                  <Skeleton className="h-8 w-24" />
                </CardFooter>
              </Card>
            ))}
          </div>
        }
      >
        <ProductGrid page={page} />
      </Suspense>
    </section>
  );
}
