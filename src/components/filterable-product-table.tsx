import { Product } from "../models/product";
import ProductTable from "./product-table";
import SearchBar from "./search-bar";

interface FilterableProductTableProps {
  products: Product[];
}
export default function FilterableProductTable({
  products,
}: FilterableProductTableProps) {
  return (
    <div>
      <SearchBar />
      <ProductTable products={products} />
    </div>
  );
}
