import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { NavLink } from 'react-router-dom'

function Sidebar({ practices, currentPracticeId }) {
  const [openPracticeId, setOpenPracticeId] = useState(currentPracticeId || 'practice-1')

  return (
    <nav className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft dark:border-slate-700 dark:bg-slate-900">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
        Навигация курса
      </h2>
      <ul className="space-y-2">
        {practices.map((practice) => {
          const isOpen = openPracticeId === practice.id

          return (
            <li
              key={practice.id}
              className="rounded-xl border border-slate-200 bg-surface dark:border-slate-700 dark:bg-slate-800/60"
            >
              <button
                type="button"
                onClick={() => setOpenPracticeId(isOpen ? '' : practice.id)}
                className="flex w-full items-center justify-between px-3 py-2 text-left text-sm font-medium text-slate-800 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-700"
              >
                <span>{practice.title}</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isOpen && (
                <div className="space-y-3 border-t border-slate-200 px-3 py-3 dark:border-slate-700">
                  {practice.categories.map((category) => (
                    <section key={`${practice.id}-${category.id}`} className="space-y-1">
                      <h3 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">
                        {category.title}
                      </h3>
                      <ul className="space-y-1">
                        {category.screens.map((screen) => (
                          <li key={screen.id}>
                            <NavLink
                              to={screen.route}
                              className={({ isActive }) =>
                                `block rounded-md px-2 py-1.5 text-sm transition-colors ${
                                  isActive
                                    ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300'
                                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700'
                                }`
                              }
                            >
                              {screen.number}. {screen.title}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Sidebar
