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
    title: 'Наращение',
    text: 'Операция наращения переводит текущий или более ранний поток в стоимость на выбранный будущий момент времени.',
  },
  {
    title: 'Дисконтирование',
    text: 'Операция дисконтирования переводит будущий поток в эквивалентную стоимость на текущий момент или на любой более ранний момент времени.',
  },
]

const projectRows = [
  { year: 0, cashFlow: -18.0, factor: 1.0, pv: -18.0, fv4: -28.33 },
  { year: 1, cashFlow: 4.8, factor: 0.8929, pv: 4.29, fv4: 6.74 },
  { year: 2, cashFlow: 5.4, factor: 0.7972, pv: 4.3, fv4: 6.77 },
  { year: 3, cashFlow: 6.1, factor: 0.7118, pv: 4.34, fv4: 6.83 },
  { year: 4, cashFlow: 8.2, factor: 0.6355, pv: 5.21, fv4: 8.2 },
]

const pvCode = `import pandas as pd

rate = 0.12
project = pd.DataFrame(
    {
        "year": [0, 1, 2, 3, 4],
        "cash_flow_mln": [-18.0, 4.8, 5.4, 6.1, 8.2],
    }
)

project["discount_factor"] = 1 / (1 + rate) ** project["year"]
project["present_value_mln"] = project["cash_flow_mln"] * project["discount_factor"]
project["future_value_at_t4_mln"] = project["cash_flow_mln"] * (1 + rate) ** (4 - project["year"])

print(project.round(3))
print()
print("Сумма приведенных значений:", round(project["present_value_mln"].sum(), 3))`

const utilityCode = `rate = 0.12
cash_flows = [-18.0, 4.8, 5.4, 6.1, 8.2]
horizon = len(cash_flows) - 1

fv_at_horizon = sum(
    cf * (1 + rate) ** (horizon - year)
    for year, cf in enumerate(cash_flows)
)

print("Будущая стоимость потока к концу горизонта:", round(fv_at_horizon, 3))`

function PresentValueChart() {
  const maxAbs = Math.max(...projectRows.map((row) => Math.abs(row.cashFlow)))

  return (
    <svg
      viewBox="0 0 540 240"
      className="h-full w-full"
      role="img"
      aria-label="Сравнение номинальных и приведенных потоков"
    >
      <line x1="40" y1="185" x2="510" y2="185" stroke="#64748b" strokeWidth="2" />
      {projectRows.map((row, index) => {
        const x = 58 + index * 88
        const nominalHeight = (Math.abs(row.cashFlow) / maxAbs) * 86
        const pvHeight = (Math.abs(row.pv) / maxAbs) * 86
        const nominalY = row.cashFlow >= 0 ? 185 - nominalHeight : 185
        const pvY = row.pv >= 0 ? 185 - pvHeight : 185

        return (
          <g key={row.year}>
            <rect x={x} y={nominalY} width="20" height={nominalHeight} rx="6" fill="#cbd5e1" />
            <rect x={x + 24} y={pvY} width="20" height={pvHeight} rx="6" fill="#2563eb" />
            <text x={x + 22} y="208" textAnchor="middle" fontSize="12" fill="#334155">
              t={row.year}
            </text>
          </g>
        )
      })}
      <text x="350" y="34" fontSize="12" fill="#64748b">
        номинальный поток
      </text>
      <text x="350" y="52" fontSize="12" fill="#2563eb">
        приведенный поток
      </text>
    </svg>
  )
}

function Practice2_Screen3({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 2 · Денежные потоки и дисконтирование"
        title="Операции наращения и дисконтирования"
        subtitle="Учимся переводить отдельные платежи и целые потоки к единой точке времени, чтобы сравнение инвестиционных альтернатив стало математически корректным."
      />

      <section className="content-block space-y-4">
        <MathText
          as="p"
          text="Если денежный поток состоит из нескольких платежей, то каждый из них можно перенести либо в начальный момент времени, либо в конец горизонта. Эти операции симметричны и используют одну и ту же ставку, но отвечают на разные аналитические вопросы."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <div className="grid gap-4 lg:grid-cols-2">
          <MathBlock formula={String.raw`PV = \sum_{t=0}^{n} \frac{CF_t}{(1+r)^t}`} />
          <MathBlock formula={String.raw`FV_T = \sum_{t=0}^{n} CF_t (1+r)^{T-t}`} />
        </div>
        <MathText
          as="p"
          text="Формула приведенной стоимости отвечает на вопрос, сколько поток стоит сегодня. Формула будущей стоимости отвечает на вопрос, во что превратится весь поток к выбранному моменту $T$, если каждый платеж можно реинвестировать под ставку $r$."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
      </section>

      <section className="grid items-start gap-4 md:grid-cols-2">
        <IdeaCard title="Когда используют приведенную стоимость">
          <p>
            Приведенная стоимость нужна тогда, когда проект сравнивают с первоначальными
            вложениями, бюджетом инвестора или альтернативной возможностью вложить деньги уже
            сегодня.
          </p>
        </IdeaCard>

        <IdeaCard title="Когда используют будущую стоимость">
          <p>
            Будущая стоимость полезна, если нужно понять итоговый капитал на конце горизонта:
            например, сколько средств проект или платежный план сформирует через несколько лет.
          </p>
        </IdeaCard>
      </section>

      <ComparisonTable
        columns={projectRows.map((row) => `Год ${row.year}`)}
        rows={[
          {
            label: 'Чистый поток, млн руб.',
            values: projectRows.map((row) => row.cashFlow.toFixed(2)),
          },
          {
            label: 'Коэффициент дисконтирования',
            values: projectRows.map((row) => row.factor.toFixed(4)),
          },
          {
            label: 'Приведенное значение, млн руб.',
            values: projectRows.map((row) => row.pv.toFixed(2)),
            highlight: true,
          },
        ]}
      />

      <PlotViewer
        title="Номинальные и приведенные значения потока"
        caption="Положительные будущие потоки после дисконтирования становятся меньше, поскольку их ценность переносится в текущий момент. Это и есть количественное выражение временной стоимости денег."
      >
        <PresentValueChart />
      </PlotViewer>

      <section className="content-block space-y-4">
        <h3 className="section-title">Python: считаем приведенную и будущую стоимость</h3>
        <MathText
          as="p"
          text="Ниже один и тот же проект одновременно переводится в приведенные значения и в стоимость на конец горизонта. Такой расчет позволяет увидеть, что операция зависит не только от суммы потока, но и от того, в каком именно году он возникает."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <ExecutablePythonBlock
          code={pvCode}
          title="Python: дисконтирование и наращение потока"
          packages={['pandas']}
          note="Попробуйте изменить ставку и сравнить, как при более дорогом капитале уменьшается приведенная стоимость поздних поступлений."
        />
      </section>

      <section className="space-y-4">
        <section className="content-block space-y-4">
          <h3 className="section-title">Отдельная операция наращения</h3>
          <MathText
            as="p"
            text="Если задача формулируется как накопление капитала к концу горизонта, удобно сразу работать с будущей стоимостью всего потока. Это частый вопрос в задачах резервирования, накопления и финансового планирования."
            className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
          <ExecutablePythonBlock
            code={utilityCode}
            title="Python: будущая стоимость всего потока"
            note="Фрагмент полезен для задач, где аналитика интересует итоговый капитал в конце горизонта, а не стоимость проекта на старте."
          />
        </section>

        <KeyIdea title="Ключевой вывод">
          Наращение и дисконтирование — это две стороны одной и той же операции перевода денег во
          времени. Выбор между ними определяется не формулой, а постановкой управленческого
          вопроса: сравниваем стоимость сегодня или капитал на конце горизонта.
        </KeyIdea>
      </section>

      <nav className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/practice/2/screen/2"
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Назад
        </Link>
        <Link
          to="/practice/2/screen/4"
          className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Далее: 4. Аннуитеты и типовые платежные схемы
        </Link>
      </nav>
    </article>
  )
}

export default Practice2_Screen3
