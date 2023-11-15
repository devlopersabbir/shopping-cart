"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { productSchema } from "@/validator/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import createProduct from "../actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export type ProductSchemaType = z.infer<typeof productSchema>;

export default function ProductForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<ProductSchemaType>({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      image: "",
    },
    resolver: zodResolver(productSchema),
  });

  const onSubmit = (values: ProductSchemaType) => {
    startTransition(async () => {
      try {
        await createProduct(values);
        form.reset();
        router.back();
      } catch (error) {
        toast.error("Something went wrong");
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Product Name <span className="text-sm text-rose-500">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Image URL <span className="text-sm text-rose-500">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Price <span className="text-sm text-rose-500">*</span>
              </FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Descripton</FormLabel>
              <FormControl>
                <Textarea className="min-h-[150px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex col-span-2 items-center gap-x-2">
          <Link href="." className={buttonVariants({ variant: "outline" })}>
            <ArrowLeft className="mr-2" />
            Back
          </Link>
          <Button type="submit" disabled={isPending} isLoading={isPending}>
            Create a Product
          </Button>
        </div>
      </form>
    </Form>
  );
}
