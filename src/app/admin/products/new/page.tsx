import PageHeading from "../../_components/page-heading";
import ProductForm from "../_components/product-form";

export default function NewProductPage() {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
      <PageHeading title="New Product" description="Create a new product" />
      <ProductForm />
    </div>
  );
}
