import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ComparisonTable from '../components/ComparisonTable'
import CourseHeader from '../components/CourseHeader'
import ExecutablePythonBlock from '../components/ExecutablePythonBlock'
import IdeaCard from '../components/IdeaCard'
import KeyIdea from '../components/KeyIdea'
import MathBlock from '../components/MathBlock'
import MathText from '../components/MathText'
import PlotViewer from '../components/PlotViewer'

const contextNotes = [
  {
    title: 'Приведенная стоимость',
    text: 'Приведенная стоимость показывает, сколько будущий поток стоит в текущем моменте при выбранной ставке дисконтирования.',
  },
  {
    title: 'Будущая стоимость',
    text: 'Будущая стоимость переводит поток в капитал на конце горизонта и помогает оценивать накопительный эффект денежных поступлений и платежных схем.',
  },
]

const pvContributionRows = [
  { year: 0, pv: -18.0 },
  { year: 1, pv: 4.29 },
  { year: 2, pv: 4.30 },
  { year: 3, pv: 4.34 },
  { year: 4, pv: 5.21 },
]

const miniAnalysisCode = `import pandas as pd

rate = 0.12
cash_flows = [-18.0, 4.8, 5.4, 6.1, 8.2]

project = pd.DataFrame(
    {
        "year": list(range(len(cash_flows))),
        "cash_flow_mln": cash_flows,
    }
)

project["discount_factor"] = 1 / (1 + rate) ** project["year"]
project["present_value_mln"] = project["cash_flow_mln"] * project["discount_factor"]

horizon = project["year"].max()
project["future_value_at_horizon_mln"] = (
    project["cash_flow_mln"] * (1 + rate) ** (horizon - project["year"])
)

pv_total = project["present_value_mln"].sum()
fv_total = project["future_value_at_horizon_mln"].sum()

print(project.round(3))
print()
print("Итоговая приведенная стоимость:", round(pv_total, 3))
print("Итоговая будущая стоимость к концу горизонта:", round(fv_total, 3))`

const functionCode = `def present_value(cash_flows, rate):
    return sum(cf / (1 + rate) ** year for year, cf in enumerate(cash_flows))


def future_value_to_horizon(cash_flows, rate):
    horizon = len(cash_flows) - 1
    return sum(
        cf * (1 + rate) ** (horizon - year)
        for year, cf in enumerate(cash_flows)
    )


def annuity_payment(principal, rate, periods):
    return principal * rate / (1 - (1 + rate) ** (-periods))


cash_flows = [-18.0, 4.8, 5.4, 6.1, 8.2]

print("PV:", round(present_value(cash_flows, 0.12), 3))
print("FV:", round(future_value_to_horizon(cash_flows, 0.12), 3))
print("Аннуитет:", round(annuity_payment(12_000_000, 0.14, 4), 2))`

function PVContributionChart() {
  const maxAbs = Math.max(...pvContributionRows.map((row) => Math.abs(row.pv)))
  const zeroY = 120

  return (
    <svg
      viewBox="0 0 540 240"
      className="h-full w-full"
      role="img"
      aria-label="Вклад отдельных потоков в приведенную стоимость"
    >
      <line x1="40" y1={zeroY} x2="510" y2={zeroY} stroke="#64748b" strokeWidth="2" />
      {pvContributionRows.map((row, index) => {
        const x = 64 + index * 90
        const barHeight = (Math.abs(row.pv) / maxAbs) * 86
        const y = row.pv >= 0 ? zeroY - barHeight : zeroY

        return (
          <g key={row.year}>
            <rect
              x={x}
              y={y}
              width="44"
              height={barHeight}
              rx="10"
              fill={row.pv >= 0 ? '#2563eb' : '#e11d48'}
              opacity="0.92"
            />
            <text x={x + 22} y="198" textAnchor="middle" fontSize="12" fill="#334155">
              t={row.year}
            </text>
            <text
              x={x + 22}
              y={row.pv >= 0 ? y - 10 : y + barHeight + 18}
              textAnchor="middle"
              fontSize="12"
              fill="#0f172a"
            >
              {row.pv.toFixed(2)}
            </text>
          </g>
        )
      })}
      <text x="10" y="28" fontSize="12" fill="#475569">
        млн руб.
      </text>
    </svg>
  )
}

function Practice2_Screen5({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 2 · Платежные схемы и Python"
        title="Расчеты приведенной и будущей стоимости в Python"
        subtitle="Завершаем практику полной вычислительной связкой: формируем таблицу потока, считаем PV и FV, а затем превращаем формулы в повторно используемые функции."
      />

      <section className="content-block space-y-4">
        <MathText
          as="p"
          text="На этом этапе теория и код должны полностью совпасть по логике. Если формула задает перевод потока во времени, то в Python этот перевод должен быть прозрачен: видны исходные данные, коэффициенты, промежуточные столбцы и итоговое значение."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <div className="grid gap-4 lg:grid-cols-2">
          <MathBlock formula={String.raw`PV = \sum_{t=0}^{n} \frac{CF_t}{(1+r)^t}`} />
          <MathBlock formula={String.raw`FV_T = \sum_{t=0}^{n} CF_t (1+r)^{T-t}`} />
        </div>
        <MathText
          as="p"
          text="Именно такой формат вычисления нужен будущему финансовому аналитику: сначала собрать модель потока, затем проверить вклад каждого периода и только после этого переходить к итоговому выводу о проекте."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
      </section>

      <ComparisonTable
        columns={pvContributionRows.map((row) => `Год ${row.year}`)}
        rows={[
          {
            label: 'Вклад в PV, млн руб.',
            values: pvContributionRows.map((row) => row.pv.toFixed(2)),
            highlight: true,
          },
        ]}
      />

      <PlotViewer
        title="Как периоды влияют на приведенную стоимость"
        caption="Даже после дисконтирования самые поздние положительные потоки могут давать значимый вклад в стоимость проекта, но этот вклад уже меньше их номинального размера."
      >
        <PVContributionChart />
      </PlotViewer>

      <section className="content-block space-y-4">
        <h3 className="section-title">Python: полный расчет PV и FV проекта</h3>
        <MathText
          as="p"
          text="Ниже одна таблица решает сразу две задачи: рассчитывает приведенную стоимость всех платежей и переводит тот же поток в капитал на конец горизонта. Такой формат особенно полезен для преподавания, потому что студент видит всю цепочку от формулы до числового результата."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <ExecutablePythonBlock
          code={miniAnalysisCode}
          title="Python: расчет приведенной и будущей стоимости"
          packages={['pandas']}
          defaultOpen
          note="Это основной рабочий блок практики: можно менять ставку, поток или горизонт и сразу смотреть, как меняются PV и FV."
        />
      </section>

      <section className="space-y-4">
        <section className="content-block space-y-4">
          <h3 className="section-title">Повторно используемые функции</h3>
          <MathText
            as="p"
            text="Когда логика расчета уже проверена на таблице, ее удобно оформить в функции. Это делает код пригодным для реальных задач: сравнения проектов, сценарного анализа и автоматизации расчетов."
            className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
          <ExecutablePythonBlock
            code={functionCode}
            title="Python: функции present_value(), future_value_to_horizon(), annuity_payment()"
            note="Здесь расчет уже оформлен в компактный инструмент, который можно применять к другим потокам и схемам финансирования."
          />
        </section>

        <IdeaCard title="Практический смысл расчета">
          <p>
            Формула не существует отдельно от данных и кода. Если проект описан как поток, то PV и
            FV — это не абстрактные символы, а вычислимые характеристики, на основе которых
            принимают решения о вложении капитала.
          </p>
        </IdeaCard>

        <KeyIdea title="Итог практики 2">
          Денежные потоки и дисконтирование образуют математический каркас инвестиционного анализа.
          После этой практики студент должен уметь читать поток по периодам, переводить его во
          времени и реализовывать эти операции в Python без разрыва между теорией и расчетом.
        </KeyIdea>
      </section>

      <nav className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/practice/2/screen/4"
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Назад
        </Link>
        <Link
          to="/practice/3/screen/1"
          className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          К практике 3
        </Link>
      </nav>
    </article>
  )
}

export default Practice2_Screen5
