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
  const orders = await prisma.order.findMany();
  return (
    <h1>order </h1>
    // <Table>
    //   <TableCaption>A list of your order</TableCaption>
    //   <TableHeader>
    //     <TableRow>
    //       <TableHead className="w-[100px]">ID</TableHead>
    //       <TableHead>Product Title</TableHead>
    //       <TableHead>Customer Name</TableHead>
    //       <TableHead>Shipping Address</TableHead>
    //       <TableHead className="text-right">Status</TableHead>
    //     </TableRow>
    //   </TableHeader>
    //   <TableBody>
    //     {orders.length < 1 ? (
    //       <p>No order in database</p>
    //     ) : (
    //       orders.map((order) => (
    //         <TableRow key={order.id}>
    //           <TableCell className="font-medium">
    //             <Link href={`/admin/order/${order.id}`}>{order.id}</Link>
    //           </TableCell>
    //           {/* TODO: Show product title */}
    //           <TableCell>product title</TableCell>
    //           <TableCell className="font-medium">{order.customerId}</TableCell>
    //           <TableCell className="font-medium">
    //             {order.shippingAddress?.slice(0, 20)}
    //           </TableCell>
    //           <TableCell
    //             className={`text-right ${
    //               order.status === "PROCECCING"
    //                 ? "text-yellow-600"
    //                 : order.status === "COMPLETED"
    //                 ? "bg-green-600"
    //                 : order.status === "CANCELED"
    //                 ? "text-red-600"
    //                 : "text-blue-600"
    //             }`}
    //           >
    //             <Select>
    //               <SelectContent>
    //                 <SelectGroup>
    //                   <SelectLabel>Fruits</SelectLabel>
    //                   <SelectItem value="apple">Apple</SelectItem>
    //                   <SelectItem value="banana">Banana</SelectItem>
    //                   <SelectItem value="blueberry">Blueberry</SelectItem>
    //                   <SelectItem value="grapes">Grapes</SelectItem>
    //                   <SelectItem value="pineapple">Pineapple</SelectItem>
    //                 </SelectGroup>
    //               </SelectContent>
    //               {/* <SelectContent>
    //                 <SelectGroup>
    //                   <SelectLabel>{order.status}</SelectLabel>
    //                   <SelectItem value="COMPLETED">COMPLETED</SelectItem>
    //                   <SelectItem value="COMPLETED">COMPLETED</SelectItem>
    //                   <SelectItem value="COMPLETED">COMPLETED</SelectItem>
    //                 </SelectGroup>
    //               </SelectContent> */}
    //             </Select>
    //           </TableCell>
    //         </TableRow>
    //       ))
    //     )}
    //   </TableBody>
    // </Table>
  );
}
