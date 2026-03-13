import { useState } from 'react'
import { ChevronDown, ChevronUp, PlayCircle } from 'lucide-react'
import CodeBlock from './CodeBlock'
import PythonPlayground from './PythonPlayground'

function ExecutablePythonBlock({
  code,
  title,
  packages = [],
  playgroundCode,
  playgroundTitle,
  playgroundDescription,
  note,
  defaultOpen = false,
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <section className="space-y-3">
      <CodeBlock code={code} title={title} />

      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="inline-flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2.5 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100 dark:border-indigo-900/60 dark:bg-indigo-950/30 dark:text-indigo-200 dark:hover:bg-indigo-950/50"
      >
        <PlayCircle size={16} />
        {isOpen ? 'Скрыть интерактивный запуск' : 'Открыть интерактивный запуск'}
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {isOpen ? (
        <PythonPlayground
          title={playgroundTitle ?? `Запуск: ${title}`}
          description={playgroundDescription}
          starterCode={playgroundCode ?? code}
          packages={packages}
          note={note}
        />
      ) : null}
    </section>
  )
}

export default ExecutablePythonBlock
