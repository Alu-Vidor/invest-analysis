import { MessageSquareText } from 'lucide-react'
import { isValidElement } from 'react'
import MathText from './MathText'

function ContextNote({ title, text }) {
  const content =
    typeof text === 'string' || typeof text === 'number' ? (
      <MathText as="p" text={String(text)} className="text-sm leading-relaxed text-slate-600 dark:text-slate-300" />
    ) : isValidElement(text) ? (
      <div className="space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{text}</div>
    ) : null

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-3 flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
        <MessageSquareText size={16} />
        <MathText as="h3" text={title} className="text-sm font-semibold uppercase tracking-[0.08em]" />
      </div>
      {content}
    </article>
  )
}

export default ContextNote
