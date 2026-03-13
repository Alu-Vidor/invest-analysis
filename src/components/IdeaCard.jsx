import { Lightbulb } from 'lucide-react'

function IdeaCard({ title = 'Ключевая идея', children }) {
  return (
    <aside className="rounded-2xl border border-sky-200 bg-sky-50 p-5 shadow-soft dark:border-sky-900 dark:bg-sky-950/40">
      <div className="mb-2 flex items-center gap-2 text-sky-700 dark:text-sky-300">
        <Lightbulb size={18} />
        <h3 className="text-sm font-semibold uppercase tracking-[0.08em]">{title}</h3>
      </div>
      <div className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">{children}</div>
    </aside>
  )
}

export default IdeaCard
