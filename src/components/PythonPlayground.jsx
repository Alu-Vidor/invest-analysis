import { useEffect, useRef, useState } from 'react'
import { LoaderCircle, Play, RotateCcw, TerminalSquare } from 'lucide-react'

let sharedWorker = null
let workerInitialized = false
let sharedRuntimeState = 'loading'
let subscriberId = 0
let globalRequestId = 0
const subscribers = new Map()

function notifySubscribers(message) {
  for (const callback of subscribers.values()) {
    callback(message)
  }
}

function ensureSharedWorker() {
  if (sharedWorker) {
    return sharedWorker
  }

  sharedWorker = new Worker(new URL('../workers/pythonRunner.worker.js', import.meta.url), {
    type: 'module',
  })

  sharedWorker.onmessage = (event) => {
    const message = event.data

    if (message.type === 'ready') {
      sharedRuntimeState = 'ready'
    }

    if (message.type === 'error' && message.requestId == null) {
      sharedRuntimeState = 'error'
    }

    notifySubscribers(message)
  }

  return sharedWorker
}

function initializeSharedWorker() {
  const worker = ensureSharedWorker()

  if (!workerInitialized) {
    worker.postMessage({ type: 'init' })
    workerInitialized = true
  }

  return worker
}

function getNextRequestId() {
  globalRequestId += 1
  return globalRequestId
}

function PythonPlayground({
  title = 'Интерактивный Python-блок',
  description,
  starterCode,
  packages = [],
  note,
}) {
  const requestIdRef = useRef(0)
  const [code, setCode] = useState(starterCode)
  const [runtimeState, setRuntimeState] = useState(sharedRuntimeState)
  const [runState, setRunState] = useState('idle')
  const [statusMessage, setStatusMessage] = useState(
    sharedRuntimeState === 'ready'
      ? 'Среда Python готова к запуску.'
      : 'Готовим интерпретатор Python...',
  )
  const [stdout, setStdout] = useState('')
  const [stderr, setStderr] = useState('')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const currentSubscriberId = subscriberId + 1
    subscriberId = currentSubscriberId

    const handleMessage = (message) => {
      if (message.type === 'ready') {
        setRuntimeState('ready')
        setStatusMessage('Среда Python готова к запуску.')
        return
      }

      if (message.type === 'status') {
        if (message.requestId && message.requestId !== requestIdRef.current) {
          return
        }

        setStatusMessage(message.message)
        return
      }

      if (message.type === 'error' && message.requestId == null) {
        setRuntimeState('error')
        setRunState('idle')
        setError(message.error)
        setStatusMessage('Не удалось подготовить среду Python.')
        return
      }

      if (message.requestId !== requestIdRef.current) {
        return
      }

      if (message.type === 'result') {
        setRunState('idle')
        setError('')
        setStdout(message.stdout)
        setStderr(message.stderr)
        setResult(message.result)
        setStatusMessage('Выполнение завершено.')
        return
      }

      if (message.type === 'error') {
        setRunState('idle')
        setError(message.error)
        setStdout(message.stdout)
        setStderr(message.stderr)
        setResult('')
        setStatusMessage('Во время выполнения возникла ошибка.')
      }
    }

    subscribers.set(currentSubscriberId, handleMessage)
    initializeSharedWorker()

    return () => {
      subscribers.delete(currentSubscriberId)
    }
  }, [])

  const handleRun = () => {
    if (runState === 'running') {
      return
    }

    const worker = initializeSharedWorker()
    const nextRequestId = getNextRequestId()

    requestIdRef.current = nextRequestId
    setRunState('running')
    setError('')
    setStdout('')
    setStderr('')
    setResult('')

    worker.postMessage({
      type: 'run',
      requestId: nextRequestId,
      code,
      packages,
    })
  }

  const handleReset = () => {
    setCode(starterCode)
    setError('')
    setStdout('')
    setStderr('')
    setResult('')
    setStatusMessage(
      runtimeState === 'ready'
        ? 'Код сброшен к исходному примеру.'
        : 'Код сброшен. Среда Python еще загружается.',
    )
  }

  const isBusy = runtimeState === 'loading' || runState === 'running'

  return (
    <section className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900">
      <header className="flex flex-col gap-3 border-b border-slate-200 pb-4 dark:border-slate-700">
        <div className="flex items-start gap-3">
          <div className="mt-1 rounded-xl bg-indigo-100 p-2 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
            <TerminalSquare size={18} />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
            {description ? (
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {description}
              </p>
            ) : null}
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-300">
          {statusMessage}
        </div>
        {note ? (
          <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">{note}</p>
        ) : null}
      </header>

      <div className="mt-5 space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Код Python
          </span>
          <textarea
            value={code}
            onChange={(event) => setCode(event.target.value)}
            spellCheck={false}
            className="min-h-[24rem] w-full rounded-2xl border border-slate-300 bg-slate-950 p-4 font-mono text-sm leading-6 text-slate-100 shadow-inner outline-none transition focus:border-indigo-500 dark:border-slate-700"
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleRun}
            disabled={isBusy}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isBusy ? <LoaderCircle size={16} className="animate-spin" /> : <Play size={16} />}
            {runState === 'running' ? 'Выполняется...' : 'Запустить код'}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <RotateCcw size={16} />
            Сбросить пример
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950/60">
          <h4 className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-700 dark:text-slate-200">
            stdout
          </h4>
          <pre className="mt-3 min-h-[10rem] whitespace-pre-wrap break-words font-mono text-sm leading-6 text-slate-700 dark:text-slate-200">
            {stdout || 'После запуска здесь появится текстовый вывод print().'}
          </pre>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950/60">
          <h4 className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-700 dark:text-slate-200">
            Результат и ошибки
          </h4>
          <div className="mt-3 space-y-3 font-mono text-sm leading-6">
            {result ? (
              <pre className="whitespace-pre-wrap break-words text-emerald-700 dark:text-emerald-300">
                {result}
              </pre>
            ) : null}
            {stderr ? (
              <pre className="whitespace-pre-wrap break-words text-amber-700 dark:text-amber-300">
                {stderr}
              </pre>
            ) : null}
            {error ? (
              <pre className="whitespace-pre-wrap break-words text-rose-700 dark:text-rose-300">
                {error}
              </pre>
            ) : null}
            {!result && !stderr && !error ? (
              <p className="font-sans text-sm text-slate-500 dark:text-slate-400">
                Если код вернет значение или вызовет исключение, оно появится здесь.
              </p>
            ) : null}
          </div>
        </section>
      </div>
    </section>
  )
}

export default PythonPlayground
