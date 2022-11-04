import { FormEvent, useState } from 'react'
import { PlusCircle } from 'phosphor-react'

import logo from './assets/logo.svg'
import styles from './App.module.css'
import { Task } from './components/Task'

import './global.css'

interface Task {
  description: string
  isDone?: boolean
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      description:
        'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.',
      isDone: true,
    },
    {
      description:
        'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.',
    },
  ])

  const tasksCompletedAmount = tasks.filter((tasks) => tasks.isDone).length
  const tasksCompletedStatus =
    tasksCompletedAmount > 0
      ? `${tasksCompletedAmount} de ${tasks.length}`
      : '0'

  function handleCreateTask(event: FormEvent) {
    event.preventDefault()
  }

  return (
    <>
      <header className={styles.header}>
        <img
          src={logo}
          alt="A logo do app todo. Um foguete azul indo ao infinito e além."
        />
      </header>

      <main className={styles.main}>
        <form className={styles.newTask} onSubmit={handleCreateTask}>
          <input type="text" placeholder="Adicione uma nova tarefa" />

          <button type="submit">
            Criar <PlusCircle size={16} weight="bold" />
          </button>
        </form>

        <div className={styles.taskInfo}>
          <div className={styles.created}>
            Tarefas criadas{' '}
            <span className={styles.counter}>{tasks.length}</span>
          </div>
          <div className={styles.done}>
            Concluídas{' '}
            <span className={styles.counter}>{tasksCompletedStatus}</span>
          </div>
        </div>

        <div className={styles.taskList}>
          {tasks.map((task) => (
            <Task key={task.description} description={task.description} />
          ))}
        </div>
      </main>
    </>
  )
}

export default App
