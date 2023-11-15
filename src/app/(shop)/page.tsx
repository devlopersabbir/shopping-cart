import { buttonVariants } from "@/components/ui/button";
import prisma from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "./_components/product-card";
import Pagination from "../_components/pagination";

type PageProps = {
  searchParams: {
    page: string;
  };
};

export default async function HomePage({
  searchParams: { page = "1" },
}: PageProps) {
  const currentPage = parseInt(page);
  const pageSize = 6;
  const heroItemCount = 1;

  const totalItemCount = await prisma.product.count();
  const totalPages = Math.ceil((totalItemCount - heroItemCount) / pageSize);

  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip:
      (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
    take: pageSize + (currentPage === 1 ? heroItemCount : 0),
  });

  if (!products.length) return <h1>Product not avaiable</h1>;

  const featureProduct = products[0];

  return (
    <section>
      {currentPage === 1 && (
        <figure className="flex flex-col  md:flex-row items-center gap-4">
          <Image
            src={featureProduct.image}
            alt={featureProduct.name}
            width={500}
            height={500}
            className="rounded-md shadow-md"
          />
          <div className="space-y-4">
            <h1 className="text-2xl font-semibod tracking-tight">
              {featureProduct.name}
            </h1>
            <p className="text-muted-foreground">
              {featureProduct.description.slice(0, 300)}...
            </p>
            <Link
              href={`/products/${featureProduct.id}`}
              className={buttonVariants()}
            >
              Cheak It Out
            </Link>
          </div>
        </figure>
      )}
      <h1 className="my-4 font-semibold text-2xl">Best selling products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {(currentPage === 1 ? products.splice(1) : products).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {totalItemCount > pageSize ? (
        <div className="my-5 flex justify-center w-full">
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      ) : null}
    </section>
  );
}
