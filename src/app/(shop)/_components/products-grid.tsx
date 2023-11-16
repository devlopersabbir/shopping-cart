import prisma from "@/lib/db";
import ProductCard from "./product-card";
import Pagination from "@/app/_components/pagination";

type Props = {
  page: string;
};

export default async function ProductGrid({ page }: Props) {
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

  return (
    <>
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
    </>
  );
}
