import FilterableProductTable from "./components/filterable-product-table";
import PRODUCTS from "./data.json";

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
