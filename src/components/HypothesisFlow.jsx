import { ArrowRight } from 'lucide-react'
import MathText from './MathText'

const steps = [
  {
    title: '1. Задаём статус-кво',
    text: 'Формулируем $H_0$: что считаем нормальным состоянием мира.',
    tone: 'border-slate-200 bg-slate-50/80 dark:border-slate-700 dark:bg-slate-900/70',
  },
  {
    title: '2. Определяем сигнал',
    text: 'Формулируем $H_1$: какое отклонение будет для нас содержательным.',
    tone: 'border-amber-200 bg-amber-50/80 dark:border-amber-900/50 dark:bg-amber-950/20',
  },
  {
    title: '3. Считаем статистику',
    text: 'Переходим от слов к числу: строим статистику теста $T(X)$.',
    tone: 'border-indigo-200 bg-indigo-50/80 dark:border-indigo-900/50 dark:bg-indigo-950/20',
  },
]

function HypothesisFlow() {
  return (
    <div className="grid gap-3 lg:grid-cols-[repeat(3,minmax(0,1fr))] lg:items-center">
      {steps.map((step, index) => (
        <div key={step.title} className="contents">
          <article className={`rounded-[1.5rem] border p-5 shadow-soft ${step.tone}`}>
            <h4 className="text-base font-semibold text-slate-900 dark:text-white">{step.title}</h4>
            <MathText
              as="p"
              text={step.text}
              className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200"
            />
          </article>

          {index < steps.length - 1 ? (
            <div className="hidden justify-center lg:flex">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-soft dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                <ArrowRight size={18} />
              </div>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  )
}

export default HypothesisFlow
