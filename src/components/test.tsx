import { useEffect, useState } from 'react'

/**
 * 1er ejercicio
 * Componente “Hola mundo”: comience con lo básico.
 * Cree un componente React simple que represente “¡Hola mundo!”
 */
export function Greet() {
  return <p>Hello World</p>
}

/**
 * 2do ejercicio
 * Aplicación de contador: cree una aplicación de contador con botones
 * para incrementar y disminuir el conteo.
 */
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

/**
 * 3er ejercicio
 * Entrada en tiempo real: crea un formulario que captura la entrada
 * del usuario y la muestra en tiempo real a medida que el usuario escribe.
 */
export function InputForm() {
  const [value, setValue] = useState('')
  return (
    <>
      <input type='text' value={value} onChange={(e) => setValue(e.target.value)} />
      <span>{value}</span>
    </>
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

/**
 * 7to ejercicio
 * Aplicación de calculadora: cree una aplicación de calculadora sencilla
 * con operaciones aritméticas básicas.
 */
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

/** 8tvo ejercicio:
 * Temporizador: crea un temporizador que cuente regresivamente a partir de un tiempo específico. */
export function Timer() {
  const [timer, setTimer] = useState(0) // sirve para capturar el input
  const [startTimer, setStartTimer] = useState(timer) // con este estado controlamos el tiempo
  const [isRunning, setIsRunning] = useState(false) // controlar el estado del temporizador
  const [idInterval, setIdInterval] = useState<number | null>(null) // para detener el temporizador

  const minutes = Math.floor(startTimer / 60)
  const seconds = startTimer % 60

  // crear otro estado
  const handleClick = () => {
    if (timer <= 0) return
    setStartTimer(timer)

    // activar bucle que reste cada segundo -1 a startTimer
    if (!isRunning) {
      setIsRunning(true)
      const idInterval = setInterval(() => {
        setStartTimer((prev) => {
          if (prev === 1) clearInterval(idInterval) // detener bucle
          return prev - 1
        })
      }, 1000)
      setIdInterval(idInterval)
    }
  }

  const handleReset = () => {
    setTimer(0)
    setStartTimer(0)
    setIsRunning(false)
    if (idInterval) clearInterval(idInterval)
  }

  useEffect(() => {
    if (startTimer === 0 && isRunning) {
      alert('Se acabo el tiempo')
      setIsRunning(false)
    }

    return () => {
      if (idInterval) clearInterval(idInterval)
    }
  }, [startTimer, isRunning, idInterval])

  return (
    <div>
      <input
        value={timer}
        onChange={(e) => setTimer(Number(e.target.value))}
        placeholder='Tiempo en segundos'
        type='number'
      />
      <button onClick={handleClick}>Comenzar</button>
      <button
        onClick={() => {
          if (isRunning) setStartTimer(startTimer + 5)
          else setTimer(timer + 5)
        }}
      >
        + 5 segundos
      </button>
      <button onClick={handleReset}>reset</button>
      <br />
      <br />
      <label>Temporizador</label>
      <br />
      <span>
        {minutes >= 10 ? minutes : `0${minutes}`}:
        {seconds >= 10 ? seconds : `0${seconds}`}
      </span>
    </div>
  )
}
