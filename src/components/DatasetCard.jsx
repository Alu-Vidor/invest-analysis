import { Database } from 'lucide-react'
import CodeBlock from './CodeBlock'
import MathText from './MathText'

function DatasetCard({ title, text, code, codeTitle = 'Код загрузки датасета' }) {
  return (
    <section className="rounded-[1.75rem] border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6 shadow-soft dark:border-emerald-900/50 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/20">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
          <Database size={20} />
        </div>

        <div className="min-w-0 flex-1 space-y-4">
          <div className="space-y-2">
            <MathText as="h3" text={title} className="text-lg font-semibold text-slate-900 dark:text-white" />
            <MathText as="p" text={text} className="text-base leading-relaxed text-slate-700 dark:text-slate-200" />
          </div>

          <div className="max-w-3xl">
            <CodeBlock code={code} title={codeTitle} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default DatasetCard
