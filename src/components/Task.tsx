import { useState } from 'react'
import { Trash } from 'phosphor-react'

import styles from './Task.module.css'

interface TaskProps {
  description: string
  isDone?: boolean
}

export function Task({ description }: TaskProps) {
  const [isDone, setIsDone] = useState(false)

  function handleDoneChange() {
    setIsDone((state) => !state)
  }

  return (
    <div className={`${styles.task} ${isDone && styles.taskDone}`}>
      <input
        className={styles.checkbox}
        name="done"
        aria-label="Completar tarefa"
        type="checkbox"
        checked={isDone}
        onChange={handleDoneChange}
      />

      <p
        className={`${styles.description} ${isDone && styles.descriptionDone}`}
      >
        {description}
      </p>

      <button className={styles.trash} type="button" title="Deletar tarefa">
        <Trash size={16} />
      </button>
    </div>
  )
}
