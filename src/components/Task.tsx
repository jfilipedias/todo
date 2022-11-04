import { useState } from 'react'
import { Trash } from 'phosphor-react'

import styles from './Task.module.css'

interface TaskProps {
  id: string
  description: string
  onChangeTaskStatus: (taskId: string, isDone: boolean) => void
}

export function Task({ id, description, onChangeTaskStatus }: TaskProps) {
  const [isDone, setIsDone] = useState(false)

  function handleDoneChange() {
    onChangeTaskStatus(id, !isDone)
    setIsDone(!isDone)
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
          onChange={handleDoneChange}
        />

        <p
          className={`${styles.description} ${
            isDone && styles.descriptionDone
          }`}
        >
          {description}
        </p>
      </div>

      <button className={styles.trash} type="button" title="Deletar tarefa">
        <Trash size={16} />
      </button>
    </div>
  )
}
