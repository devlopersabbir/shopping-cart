import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
type PaginationBarProps = {
  currentPage: number;
  totalPages: number;
};
export default function Pagination({
  currentPage,
  totalPages,
}: PaginationBarProps) {
  const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 10));
  const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 9));

  const numberedPageItems: JSX.Element[] = [];

  for (let page = minPage; page <= maxPage; page++) {
    numberedPageItems.push(
      <Link
        key={page}
        className={cn(
          buttonVariants({
            variant: currentPage === page ? "default" : "ghost",
          }),
          currentPage === page ? "pointer-events-none" : "pointer-events-auto"
        )}
        href={`?page=${page}`}
      >
        {page}
      </Link>
    );
  }

  return (
    <>
      <ul className="hidden sm:flex items-center">{numberedPageItems}</ul>
      <ul className="flex items-center space-x-4 sm:hidden">
        {currentPage > 1 && (
          <Link
            href={`?page=${currentPage - 1}`}
            className={buttonVariants({ variant: "ghost", size: "icon" })}
          >
            <ArrowLeftIcon />
          </Link>
        )}
        <Button disabled size="sm">
          Page: {currentPage}
        </Button>
        {currentPage < totalPages && (
          <Link
            href={`?page=${currentPage + 1}`}
            className={buttonVariants({ variant: "ghost", size: "icon" })}
          >
            <ArrowRightIcon />
          </Link>
        )}
      </ul>
    </>
  );
}
