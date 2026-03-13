import { CheckCircle2, XCircle } from 'lucide-react'
import MathText from './MathText'

function MatrixCell({ type, title, text }) {
  const isSuccess = type === 'success'
  const Icon = isSuccess ? CheckCircle2 : XCircle
  const toneStyles = isSuccess
    ? 'border-emerald-200 bg-emerald-50/80 dark:border-emerald-900/50 dark:bg-emerald-950/20'
    : 'border-rose-200 bg-rose-50/80 dark:border-rose-900/50 dark:bg-rose-950/20'
  const iconStyles = isSuccess
    ? 'text-emerald-600 dark:text-emerald-300'
    : 'text-rose-600 dark:text-rose-300'

  return (
    <div className={`rounded-2xl border p-4 shadow-soft ${toneStyles}`}>
      <div className="flex items-start gap-3">
        <Icon size={20} className={`mt-0.5 shrink-0 ${iconStyles}`} />
        <div className="space-y-2">
          <MathText as="h4" text={title} className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-900 dark:text-white" />
          <MathText as="p" text={text} className="text-sm leading-relaxed text-slate-700 dark:text-slate-200" />
        </div>
      </div>
    </div>
  )
}

function ConfusionMatrix({ columns, rows, cells }) {
  return (
    <section className="space-y-4 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">
          <MathText text="Наше решение (Вердикт теста)" />
        </p>
        <p className="text-sm font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">
          <MathText text="Реальность (Истина)" />
        </p>
      </div>

      <div className="grid gap-3 lg:grid-cols-[220px_repeat(2,minmax(0,1fr))]">
        <div className="hidden lg:block" />
        {columns.map((column) => (
          <div
            key={column.title}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/80"
          >
            <MathText as="p" text={column.title} className="text-sm font-semibold text-slate-900 dark:text-white" />
            <MathText as="p" text={column.subtitle} className="mt-1 text-sm text-slate-600 dark:text-slate-300" />
          </div>
        ))}

        {rows.map((row, rowIndex) => (
          <div key={row.title} className="contents">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/80">
              <MathText as="p" text={row.title} className="text-sm font-semibold text-slate-900 dark:text-white" />
              <MathText as="p" text={row.subtitle} className="mt-1 text-sm text-slate-600 dark:text-slate-300" />
            </div>

            {cells[rowIndex].map((cell) => (
              <MatrixCell key={cell.title} {...cell} />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

export default ConfusionMatrix
