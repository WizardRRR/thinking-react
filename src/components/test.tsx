import { FormEvent, useEffect, useRef, useState } from 'react'

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
  }, [startTimer, isRunning])

  useEffect(() => {
    return () => {
      if (idInterval) clearInterval(idInterval)
    }
  }, [idInterval])

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

/** 9no ejercicio:Lista de tareas pendientes:
 * desarrollar una aplicación de lista de tareas pendientes con funciones
 * para agregar y eliminar tareas. */
interface Task {
  id: number
  name: string
}
export function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [idEdit, setIdEdit] = useState(0)
  const [editValue, setEditValue] = useState('')

  const refInput = useRef<HTMLInputElement | null>(null)

  // CREATE
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault() // para evitar recargar la pagina porque evitamos el comportamiento por defecto

    const taskName = (e.currentTarget.task as HTMLInputElement).value.trim() // limpiar el input después de capturarlo
    if (!taskName) return alert('No sea imbécil tiene que ingresar una tarea') // early return si no hay valor

    // creando la tarea
    const task: Task = {
      id: new Date().getTime(),
      name: taskName
    }

    ;(e.target as HTMLFormElement).reset() // limpiando el formulario
    setTasks([...tasks, task]) // agregando la tarea al estado
    refInput.current?.focus()
  }

  // DELETE
  const handleClickDelete = (id: number) => {
    const newTasks = tasks.filter((task) => task.id !== id)
    setTasks(newTasks)
  }

  const handleClickEdit = (task: Task) => {
    setIdEdit(task.id)
    setEditValue(task.name)
  }

  // UPDATE
  const handleClickUpdate = () => {
    const newName = editValue.trim()
    if (!newName) return alert('No sea imbécil tiene que editar una tarea')

    const newTasks = tasks.map((task) => {
      if (task.id === idEdit) return { ...task, name: newName }
      return task
    })
    setTasks(newTasks)

    setEditValue('')
    setIdEdit(0)
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor='task'>Registrar tarea pendiente</label>
        <input ref={refInput} id='task' type='text' />
        <button type='submit'>Registrar</button>
      </form>
      <div>
        {/* READ */}
        {tasks.map((task) => (
          <div key={task.id}>
            <strong>
              <span style={{ fontSize: '.7rem' }}>ID: {task.id}</span>
            </strong>
            <br />
            {idEdit === task.id ? (
              <input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
            ) : (
              <span>{task.name}</span>
            )}
            <br />
            {idEdit === task.id ? (
              <>
                <button onClick={() => setIdEdit(0)}>Cancelar</button>
                <button onClick={handleClickUpdate}>Guardar</button>
              </>
            ) : (
              <button onClick={() => handleClickEdit(task)}>Editar</button>
            )}
            <button onClick={() => handleClickDelete(task.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </>
  )
}

/**
 * ejercicio 10:
 * Fondo dinámico: crea un componente que cambia su color de fondo cuando se hace clic.
 */

export function DynamicBackground() {
  const [currentColor, setCurrentColor] = useState<keyof typeof colors>('red')
  const colors = {
    red: '#f00',
    blue: '#00f',
    green: '#0f0',
    yellow: '#ff0',
    black: '#000',
    gray: '#ccc',
    orange: '#ffa500',
    purple: '#800080',
    pink: '#ffc0cb',
    brown: '#a52a2a'
  }

  const handleClick = () => {
    const keysColor = Object.keys(colors) as (keyof typeof colors)[]
    const randomKey = keysColor[Math.floor(Math.random() * keysColor.length)]
    setCurrentColor(randomKey)
  }

  return (
    <div
      onClick={handleClick}
      style={{
        backgroundColor: colors[currentColor],
        width: '200px',
        height: '200px',
        cursor: 'pointer',
        display: 'grid',
        placeItems: 'center',
        color: 'white'
      }}
    >
      {currentColor}
    </div>
  )
}

export function RefExample() {
  const [countDefault, setCountDefault] = useState(0)
  const count = useRef(0)
  let i = 0
  return (
    <>
      <div onClick={() => (count.current = count.current + 100)}>
        {count.current}
      </div>
      <div onClick={() => setCountDefault(countDefault + 1)}>{countDefault}</div>
      <div onClick={() => i++}>{i}</div>
    </>
  )
}

/**
 * 12 Generador de citas aleatorias:
 * crea un componente que muestre una cita aleatoria cada vez que se renderiza.
 */
const quotes = [
  'Comience el día con un plan de acción',
  'Establezca objetivos claros y alcanzables',
  'Dé prioridad a tus prioridades actuales',
  'Reúne y analiza tus recursos disponibles',
  'Cumple tus metas y objetivos',
  'Mantén un hábito de crecimiento personal',
  'Recuerda que el éxito viene de la simplicidad',
  'Celebre tus logros y agradecimientos',
  'Busca inspiración en otros',
  'Dé el primer paso en tu camino al éxito',
  'Cada día es una oportunidad para aprender y mejorar',
  'No te des por vencido, te des por superar',
  'La perseverancia es el camino hacia el éxito',
  'El fracaso es la oportunidad para comenzar de nuevo de cero',
  'El fracaso es la mejor oportunidad para crecer',
  'La mejor forma de predecir el futuro es crearlo',
  'El fracaso es una oportunidad para comenzar de nuevo de cero'
]
/** esto retorna una cita aleatoria */
const getRandomQuote = () => quotes[Math.floor(Math.random() * quotes.length)]

export function RandomQuote() {
  const [quote, setQuote] = useState(getRandomQuote())
  return (
    <div>
      <h3>Cita Aleatoria</h3>
      <p>{quote}</p>
      <button onClick={() => setQuote(getRandomQuote())}>Generar otra cita!</button>
    </div>
  )
}

/**
 * 13 - Cargador de archivos:
 * desarrollar un componente de carga de archivos que permita a los usuarios cargar imágenes.
 */

interface FileUploaderProps {
  onFile: (file: File) => void
}
export function ImageUploader({ onFile }: FileUploaderProps) {
  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      alert('Solo se permiten archivos de imagen')
      e.target.value = ''
      return
    }
    onFile(file)
  }

  return (
    <div>
      <input accept='image/*' onChange={onChangeFile} type='file' />
    </div>
  )
}
