import { ChangeEvent, FormEvent, useState } from 'react'
import cuid from 'cuid'
import { PlusCircle } from 'phosphor-react'

import logo from './assets/logo.svg'
import styles from './App.module.css'
import { Task } from './components/Task'

import './global.css'

interface Task {
  id: string
  description: string
  isDone?: boolean
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskDescription, setNewTaskDescription] = useState('')

  const tasksCompletedAmount = tasks.filter((tasks) => tasks.isDone).length
  const tasksCompletedStatus =
    tasksCompletedAmount > 0
      ? `${tasksCompletedAmount} de ${tasks.length}`
      : '0'

  function handleCreateTask(event: FormEvent) {
    event.preventDefault()

    const newTask = { id: cuid(), description: newTaskDescription } as Task
    setTasks([newTask, ...tasks])
    setNewTaskDescription('')
  }

  function handleChangeTaskDescription(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskDescription(event.target.value)
  }

  function updateTaskStatus(taskId: string, isDone: boolean) {
    const taskToUpdate = tasks.find((task) => task.id === taskId) as Task

    const updatedTask = {
      id: taskToUpdate.id,
      description: taskToUpdate.description,
      isDone,
    }

    const tasksWithoutUpdatedOne = tasks.filter((task) => task.id !== taskId)

    const updatedTasks = [...tasksWithoutUpdatedOne, updatedTask]

    const sortedUpdatedTasks = updatedTasks.sort(
      (taskA, taskB) => Number(taskA.isDone) - Number(taskB.isDone)
    )

    setTasks(sortedUpdatedTasks)
  }

  function deleteTask(taskId: string) {
    const tasksWithoutDeletedOne = tasks.filter((task) => task.id !== taskId)

    setTasks(tasksWithoutDeletedOne)
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
          <input
            name="task"
            type="text"
            placeholder="Adicione uma nova tarefa"
            value={newTaskDescription}
            onChange={handleChangeTaskDescription}
          />

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
            <Task
              key={task.id}
              id={task.id}
              description={task.description}
              onChangeStatus={updateTaskStatus}
              onDelete={deleteTask}
            />
          ))}
        </div>
      </main>
    </>
  )
}

export default App
