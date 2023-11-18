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
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function CustomerTable() {
  const customers = await prisma.user.findMany();

  return (
    <Table>
      <TableCaption>A list of your Customer</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-right">Image</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.length < 1 ? (
          <p>No Cusomer in database</p>
        ) : (
          customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell className="font-medium">{customer.id}</TableCell>
              <TableCell>
                <Link href={`/admin/customers/edit/${customer.name}`}>
                  {customer.name}
                </Link>
              </TableCell>
              <TableCell className="font-medium">{customer.role}</TableCell>
              <TableCell className="font-medium">{customer.email}</TableCell>
              <TableCell className="text-right">
                {customer.name ? (
                  <Avatar className="h-8 w-8">
                    {customer.image ? (
                      <AvatarImage src={customer.image} alt={customer.name} />
                    ) : null}
                    <AvatarFallback>
                      {customer.name
                        .split(" ")
                        .map((n, i) => (i < 2 ? n.split("")[0] : null))}
                    </AvatarFallback>
                  </Avatar>
                ) : null}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
