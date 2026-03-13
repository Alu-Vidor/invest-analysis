import { CheckCircle2, XCircle } from 'lucide-react'
import MathText from './MathText'

function RuleCard({ tone = 'success', title, text, verdict }) {
  const isSuccess = tone === 'success'
  const Icon = isSuccess ? CheckCircle2 : XCircle
  const shellStyles = isSuccess
    ? 'border-emerald-300 bg-emerald-50/90 dark:border-emerald-900/50 dark:bg-emerald-950/30'
    : 'border-rose-300 bg-rose-50/90 dark:border-rose-900/50 dark:bg-rose-950/30'
  const iconStyles = isSuccess
    ? 'text-emerald-600 dark:text-emerald-300'
    : 'text-rose-600 dark:text-rose-300'

  return (
    <article className={`rounded-[1.75rem] border p-6 shadow-soft ${shellStyles}`}>
      <div className="flex items-start gap-3">
        <Icon size={22} className={`mt-0.5 shrink-0 ${iconStyles}`} />
        <div className="space-y-3">
          <MathText as="h3" text={title} className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white" />
          <MathText as="p" text={text} className="text-base leading-relaxed text-slate-700 dark:text-slate-200" />
          <MathText
            as="p"
            text={verdict}
            className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-900 dark:text-white"
          />
        </div>
      </div>
    </article>
  )
}

export default RuleCard
