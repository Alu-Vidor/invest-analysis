import { ListChecks } from 'lucide-react'
import MathText from './MathText'

function renderContent(content) {
  if (Array.isArray(content)) {
    return (
      <ul className="space-y-2">
        {content.map((item) => (
          <li key={item} className="flex items-start gap-2 text-slate-700 dark:text-slate-200">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
            <MathText text={item} />
          </li>
        ))}
      </ul>
    )
  }

  return <MathText as="p" text={content} className="text-base leading-relaxed text-slate-700 dark:text-slate-200" />
}

function TaskBlock({ title, items }) {
  return (
    <section className="rounded-[1.75rem] border border-violet-200 bg-gradient-to-br from-violet-50 via-white to-indigo-50 p-6 shadow-soft dark:border-violet-900/50 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/20">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-2xl bg-violet-100 p-3 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">
          <ListChecks size={20} />
        </div>
        <MathText as="h3" text={title} className="text-lg font-semibold text-slate-900 dark:text-white" />
      </div>

      <ol className="space-y-4">
        {items.map((item, index) => (
          <li
            key={item.title}
            className="rounded-2xl border border-white/70 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-900/70"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
                {index + 1}
              </div>

              <div className="min-w-0 flex-1 space-y-3">
                <MathText as="h4" text={item.title} className="text-base font-semibold text-slate-900 dark:text-white" />
                {renderContent(item.content)}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default TaskBlock
