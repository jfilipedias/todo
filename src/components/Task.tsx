import { useState } from 'react'
import { Trash } from 'phosphor-react'

import styles from './Task.module.css'

interface TaskProps {
  id: string
  description: string
  onChangeStatus: (taskId: string, isDone: boolean) => void
  onDelete: (taskId: string) => void
}

export function Task({ id, description, onChangeStatus, onDelete }: TaskProps) {
  const [isDone, setIsDone] = useState(false)

  function handleStatusChange() {
    onChangeStatus(id, !isDone)
    setIsDone(!isDone)
  }

  function handleDeleteTask() {
    onDelete(id)
  }

  return (
    <div className={`${styles.task} ${isDone && styles.taskDone}`}>
      <div className={styles.taskContent}>
        <input
          className={styles.checkbox}
          name="done"
          aria-label="Completar tarefa"
          type="checkbox"
          checked={isDone}
          onChange={handleStatusChange}
        />

        <p
          className={`${styles.description} ${
            isDone && styles.descriptionDone
          }`}
        >
          {description}
        </p>
      </div>

      <button
        className={styles.trash}
        type="button"
        title="Deletar tarefa"
        onClick={handleDeleteTask}
      >
        <Trash size={16} />
      </button>
    </div>
  )
}
