import { Product } from '../models/product'
import ProductCategoryRow from './product-category-row'
import ProductRow from './product-row'

interface ProductTableProps {
  products: Product[]
  filterText: string
  inStockOnly: boolean
}

export default function ProductTable({
  products,
  filterText,
  inStockOnly
}: ProductTableProps) {
  const rows: React.ReactNode[] = []
  let lastCategory: null | string = null

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) return
    if (inStockOnly && !product.stocked) return
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow category={product.category} key={product.category} />
      )
    }
    rows.push(<ProductRow product={product} key={product.name} />)
    lastCategory = product.category
  })

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}
