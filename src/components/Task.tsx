import { useState } from 'react'
import { Trash } from 'phosphor-react'

import styles from './Task.module.css'

interface TaskProps {
  description: string
  isDone?: boolean
}

export function Task({ description }: TaskProps) {
  const [isDone, setIsDone] = useState(false)

  return (
    <div className={styles.task}>
      <input className={styles.checkbox} type="checkbox" name="done" />

      <p className={styles.description}>{description}</p>

      <button className={styles.trash} title="Deletar tarefa">
        <Trash size={14} />
      </button>
    </div>
  )
}
