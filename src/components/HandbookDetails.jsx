import { ChevronDown } from 'lucide-react'

function HandbookDetails({ title, children }) {
  return (
    <details className="group rounded-2xl border border-slate-200 bg-slate-50/80 p-5 shadow-soft open:bg-white dark:border-slate-700 dark:bg-slate-900/70 dark:open:bg-slate-900">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-slate-900 marker:hidden dark:text-white">
        <span>{title}</span>
        <ChevronDown
          size={18}
          className="shrink-0 text-slate-500 transition-transform duration-200 group-open:rotate-180 dark:text-slate-400"
        />
      </summary>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
        {children}
      </div>
    </details>
  )
}

export default HandbookDetails
