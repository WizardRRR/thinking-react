import FilterableProductTable from './components/filterable-product-table'
import {
  Api,
  Calculator,
  CountApp,
  Greet,
  InputForm,
  List,
  Timer,
  TodoList,
  Toggle
} from './components/test'
import PRODUCTS from './data.json'

export default function App() {
  return (
    <>
      <p>Products</p>
      <FilterableProductTable products={PRODUCTS} />
      <p>#1</p>
      <Greet />
      <p>#2</p>
      <CountApp />
      <p>#3</p>
      <InputForm />
      <p>#4</p>
      <List items={['element1', 'element2', 'element3']} />
      <p>#5</p>
      <Toggle />
      <p>#6</p>
      <Api />
      <p>#7</p>
      <Calculator />
      <p>#8</p>
      <Timer />
      <p>#9</p>
      <TodoList />
    </>
  )
}
