import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ContextNote from './ContextNote'
import Sidebar from './Sidebar'
import ThemeToggle from './ThemeToggle'

const defaultContext = {
  title: 'Пояснение к слайду',
  text: 'Прокручивайте центральную колонку: заметки справа будут меняться по активному блоку.',
}

function getInitialTheme() {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark' || saved === 'light') {
    return saved
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function LayoutContent({ practices, currentPracticeId, children }) {
  const [context, setContext] = useState(defaultContext)
  const [contextNotes, setContextNotes] = useState([])
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const shellApi = useMemo(
    () => ({
      setContext,
      setContextNotes,
    }),
    [],
  )

  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full max-w-[1800px] px-4 py-6 lg:px-6">
        <header className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-indigo-600 dark:text-indigo-400">
                Математическая статистика • 3 курс
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Интерактивный учебник и лабораторный практикум
              </h1>
            </div>
            <ThemeToggle
              theme={theme}
              onToggle={() => setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))}
            />
          </div>
        </header>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(220px,clamp(220px,18vw,340px))_minmax(0,1fr)_minmax(240px,clamp(240px,20vw,360px))]">
          <aside className="lg:sticky lg:top-6">
            <Sidebar
              key={currentPracticeId}
              practices={practices}
              currentPracticeId={currentPracticeId}
            />
          </aside>

          <main className="space-y-4">{typeof children === 'function' ? children(shellApi) : children}</main>

          <aside className="space-y-4 lg:sticky lg:top-6">
            {contextNotes.length > 0 ? (
              contextNotes.map((note) => (
                <ContextNote key={note.title} title={note.title} text={note.text} />
              ))
            ) : (
              <ContextNote title={context.title} text={context.text} />
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}

function Layout({ practices, currentPracticeId, children }) {
  const location = useLocation()

  return (
    <LayoutContent
      key={location.pathname}
      practices={practices}
      currentPracticeId={currentPracticeId}
    >
      {children}
    </LayoutContent>
  )
}

export default Layout
