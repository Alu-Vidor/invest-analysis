import { ShieldCheck } from 'lucide-react'
import { isValidElement } from 'react'
import MathText from './MathText'

function KeyIdea({ title = 'Ключевая идея', children }) {
  const content =
    typeof children === 'string' || typeof children === 'number' ? (
      <MathText text={String(children)} className="text-sm leading-relaxed text-slate-700 dark:text-slate-200" />
    ) : isValidElement(children) ? (
      <div className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">{children}</div>
    ) : (
      children
    )

  return (
    <aside className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 shadow-soft dark:border-emerald-900 dark:bg-emerald-950/30">
      <div className="flex items-start gap-3 border-l-4 border-emerald-500 pl-3 dark:border-emerald-400">
        <ShieldCheck
          size={20}
          className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-300"
          aria-hidden="true"
        />
        <div className="space-y-2">
          <MathText
            as="h3"
            text={title}
            className="text-sm font-semibold uppercase tracking-[0.08em] text-emerald-700 dark:text-emerald-300"
          />
          {content}
        </div>
      </div>
    </aside>
  )
}

export default KeyIdea
