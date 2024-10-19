import { useEffect, useState } from 'react'

// 1er ejercicio
export function Greet() {
  return <p>Hello World</p>
}

// 2do ejercicio
export function CountApp() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  )
}

// 3er ejercicio
export function InputForm() {
  const [value, setValue] = useState('')
  return (
    <input type='text' value={value} onChange={(e) => setValue(e.target.value)} />
  )
}

/**
 * 4to ejercicio
 * Componente de lista: construye un componente para mostrar una lista de elementos.
 */
export function List({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

/**
 * 5to ejercicio
 * Implementa un componente de interruptor de palanca básico
 * que cambia su estado cuando se hace clic.
 */
export function Toggle() {
  const [on, setOn] = useState(false)
  return (
    <button
      style={{ backgroundColor: on ? 'green' : 'red' }}
      onClick={() => setOn(!on)}
    >
      {on ? 'ON' : 'OFF'}
    </button>
  )
}

/**
 * 6to ejercicio
 * Obtención de datos de API: desarrolle un componente que obtenga
 * datos de una API y los muestre en la página.
 */
export function Api() {
  interface Post {
    userId: number
    id: number
    title: string
    body: string
  }
  const [post, setPost] = useState<null | Post>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1')
      const post = await response.json()
      setPost(post)
      setLoading(false)
    })()
  }, [])

  return <div>{loading ? <p>Loading...</p> : JSON.stringify(post)}</div>
}

export function Calculator() {
  const [firstNumber, setFirstNumber] = useState(0)
  const [secondNumber, setSecondNumber] = useState(0)
  const [result, setResult] = useState(0)
  const [selectedOperation, setSelectedOperation] = useState<string | null>(null)

  const operations = ['+', '-', '/', '*']

  return (
    <div>
      <input
        value={firstNumber}
        onChange={(e) => {
          const value = Number(e.target.value)
          // firstNumber => 2
          setFirstNumber(value) // set a firstNumber value => 22 pero al siguiente render
          // firstNumber => 2

          if (selectedOperation) {
            setResult(eval(`${value} ${selectedOperation} ${secondNumber}`))
          }
        }}
        type='number'
      />
      <input
        value={secondNumber}
        onChange={(e) => {
          const value = Number(e.target.value)
          setSecondNumber(value)
          if (selectedOperation) {
            setResult(eval(`${firstNumber} ${selectedOperation} ${value}`))
          }
        }}
        type='number'
      />
      <input type='text' disabled value={result} />
      {operations.map((operation, index) => (
        <ButtonOperation
          key={index}
          onClick={(operation) => {
            setSelectedOperation(operation)
            setResult(eval(`${firstNumber} ${operation} ${secondNumber}`))
          }}
          operation={operation}
          active={selectedOperation === operation}
        />
      ))}
    </div>
  )
}

function ButtonOperation({
  operation,
  active,
  onClick
}: {
  operation: string
  active: boolean
  onClick: (operation: string) => void
}) {
  return (
    <button
      onClick={() => onClick(operation)}
      style={{ backgroundColor: active ? 'green' : 'transparent' }}
    >
      {operation}
    </button>
  )
}
