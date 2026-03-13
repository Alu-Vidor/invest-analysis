import { AlertTriangle } from 'lucide-react'
import MathText from './MathText'

function AlertBox({ title, children }) {
  return (
    <section className="rounded-[1.5rem] border border-amber-200 bg-amber-50/80 p-5 shadow-soft dark:border-amber-900/50 dark:bg-amber-950/20">
      <div className="flex items-start gap-3">
        <AlertTriangle size={20} className="mt-0.5 shrink-0 text-amber-700 dark:text-amber-300" />
        <div className="space-y-2">
          <MathText
            as="h3"
            text={title}
            className="text-sm font-semibold uppercase tracking-[0.08em] text-amber-800 dark:text-amber-200"
          />
          <div className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">{children}</div>
        </div>
      </div>
    </section>
  )
}

export default AlertBox
