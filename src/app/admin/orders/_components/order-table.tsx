import * as React from "react";
import prisma from "@/lib/db";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";
import Link from "next/link";

export default async function OrderTable() {
  const orders = await prisma.order.findMany({
    include: {
      customer: true,
      cart: {
        include: {
          items: true,
        },
      },
    },
  });
  console.log(orders);
  return (
    <Table>
      <TableCaption>A list of your order</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Items</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.length < 1 ? (
          <p>No order in database</p>
        ) : (
          orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">
                <Link href={`/admin/order/${order.id}`}>{order.id}</Link>
              </TableCell>
              {/* TODO: Show product title */}
              <TableCell>{order.customer.name}</TableCell>
              <TableCell className="font-medium">
                {order.cart.items.length}
              </TableCell>
              <TableCell className={`text-right`}>{order.status}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
