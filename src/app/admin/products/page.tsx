import { buttonVariants } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import PageHeading from "../_components/page-heading";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import prisma from "@/lib/db";

export default async function ProductPage() {
  const products = await prisma.product.findMany();

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

      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length < 1 ? (
            <p>No product in database</p>
          ) : (
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.id}</TableCell>
                <TableCell>
                  <Link href={`/admin/products/edit/${product.id}`}>
                    {product.name}
                  </Link>
                </TableCell>
                <TableCell className="text-right">
                  ${product.price.toFixed(2)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
