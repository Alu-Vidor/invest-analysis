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
import {
  treasuryFiveYearProxyRateJan022024,
  treasuryFiveYearSemiannualRateJan022024,
  treasuryNotePriceProxyUsd,
  treasuryNoteSchedule2028,
  treasuryNoteValuationRows2028,
} from '../data/practice2RealData'

const contextNotes = [
  {
    title: 'Наращение',
    text: 'Наращение переводит более ранние платежи в стоимость на более позднюю дату. В задачах инвестора это удобно, когда важно понять, какой капитал сформируется к концу горизонта.',
  },
  {
    title: 'Дисконтирование',
    text: 'Дисконтирование переносит будущие денежные потоки на текущую дату. Именно так аналитик получает цену потока и сравнивает ее с исходными вложениями или рыночной ценой инструмента.',
  },
]

const valuationCode = `import pandas as pd

semiannual_rate = 0.0393 / 2
cash_flows = [212.5, 212.5, 212.5, 212.5, 212.5, 212.5, 212.5, 10212.5]

note = pd.DataFrame(
    {
        "period": list(range(1, 9)),
        "cash_flow_usd": cash_flows,
    }
)

note["discount_factor"] = 1 / (1 + semiannual_rate) ** note["period"]
note["present_value_usd"] = note["cash_flow_usd"] * note["discount_factor"]
note["accumulation_factor"] = (1 + semiannual_rate) ** (8 - note["period"])
note["future_value_at_maturity_usd"] = (
    note["cash_flow_usd"] * note["accumulation_factor"]
)

print(note.round(4))
print()
print("Price proxy:", round(note["present_value_usd"].sum(), 2))
print("Future value at maturity:", round(note["future_value_at_maturity_usd"].sum(), 2))`

const utilityCode = `semiannual_rate = 0.0393 / 2
cash_flows = [212.5, 212.5, 212.5, 212.5, 212.5, 212.5, 212.5, 10212.5]
horizon = len(cash_flows)

future_value = sum(
    cf * (1 + semiannual_rate) ** (horizon - period)
    for period, cf in enumerate(cash_flows, start=1)
)

print("Future value:", round(future_value, 2))`

function BondValuationChart() {
  const maxValue = Math.max(...treasuryNoteValuationRows2028.map((row) => row.cashFlowUsd))

  return (
    <svg
      viewBox="0 0 640 270"
      className="h-full w-full"
      role="img"
      aria-label="Сравнение номинальных и приведенных значений платежей по казначейской ноте"
    >
      <line x1="48" y1="210" x2="600" y2="210" stroke="#64748b" strokeWidth="2" />
      {treasuryNoteValuationRows2028.map((row, index) => {
        const baseX = 68 + index * 66
        const nominalHeight = (row.cashFlowUsd / maxValue) * 145
        const pvHeight = (row.presentValueUsd / maxValue) * 145

        return (
          <g key={row.period}>
            <rect
              x={baseX}
              y={210 - nominalHeight}
              width="16"
              height={nominalHeight}
              rx="6"
              fill="#cbd5e1"
            />
            <rect
              x={baseX + 22}
              y={210 - pvHeight}
              width="16"
              height={pvHeight}
              rx="6"
              fill="#2563eb"
            />
            <text x={baseX + 19} y="232" textAnchor="middle" fontSize="11" fill="#334155">
              {row.period}
            </text>
          </g>
        )
      })}
      <text x="400" y="30" fontSize="12" fill="#64748b">
        номинальный поток
      </text>
      <text x="400" y="48" fontSize="12" fill="#2563eb">
        приведенное значение
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
        subtitle="Применяем формулы к реальному потоку купонной ноты: оцениваем ее стоимость на дату 2 января 2024 года и одновременно смотрим, какой капитал сформируется к моменту погашения при реинвестировании купонов."
      />

      <section className="content-block space-y-4">
        <MathText
          as="p"
          text="Если поток состоит из нескольких платежей, каждая сумма переносится во времени отдельно. Для купонной ноты с полугодовыми выплатами удобнее работать с периодической ставкой $i = \\frac{y}{2}$, где $y$ - годовая рыночная доходность по близкому сроку."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <MathBlock formula={String.raw`PV_0 = \sum_{k=1}^{n} \frac{CF_k}{(1+i)^k}`} />
        <MathBlock formula={String.raw`FV_n = \sum_{k=1}^{n} CF_k (1+i)^{n-k}`} />
        <MathText
          as="p"
          text={`В примере используем доходность 5-летних Treasury ${(
            treasuryFiveYearProxyRateJan022024 * 100
          ).toFixed(2)}% годовых на 2 января 2024 года как рыночный ориентир для четырехлетней ноты. Тогда полугодовая ставка составляет ${(
            treasuryFiveYearSemiannualRateJan022024 * 100
          ).toFixed(3)}%.`}
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
      </section>

      <IdeaCard title="Почему здесь важна согласованность периода">
        <p>
          Нельзя дисконтировать полугодовой поток годовой ставкой без приведения к единому шагу. Если платежи идут
          раз в полгода, то и ставка в формуле должна быть полугодовой. Это простое правило часто игнорируют в
          черновых расчетах, но именно оно отделяет корректную финансовую математику от приблизительных оценок.
        </p>
      </IdeaCard>

      <ComparisonTable
        columns={treasuryNoteValuationRows2028.map((row) => `k=${row.period}`)}
        rows={[
          {
            label: 'Дата платежа',
            values: treasuryNoteSchedule2028.map((row) => row.date),
          },
          {
            label: 'Номинальный поток, USD',
            values: treasuryNoteValuationRows2028.map((row) => row.cashFlowUsd.toFixed(2)),
          },
          {
            label: 'Коэффициент дисконтирования',
            values: treasuryNoteValuationRows2028.map((row) => row.discountFactor.toFixed(4)),
          },
          {
            label: 'Приведенное значение, USD',
            values: treasuryNoteValuationRows2028.map((row) => row.presentValueUsd.toFixed(2)),
            highlight: true,
          },
        ]}
      />

      <PlotViewer
        title="Как номинальные платежи превращаются в стоимость"
        caption="Серые столбцы показывают исходные суммы, синие - их приведенные значения. Последний платеж остается самым крупным вкладом в цену бумаги, но после дисконтирования он уже существенно меньше своего номинала."
      >
        <BondValuationChart />
      </PlotViewer>

      <section className="content-block space-y-4">
        <h3 className="section-title">Интерпретация результата</h3>
        <MathText
          as="p"
          text={`Сумма приведенных значений дает расчетную цену потока около ${treasuryNotePriceProxyUsd.toFixed(
            2
          )} USD за номинал 10 000 USD. Цена оказывается выше номинала, потому что купонная ставка 4.25% немного выше используемой рыночной доходности 3.93%.`}
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <MathText
          as="p"
          text="Это важный профессиональный вывод: цена актива определяется не только календарем платежей, но и сравнением внутренних условий контракта с текущей рыночной нормой доходности. Именно отсюда возникает премия к номиналу или дисконт."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
      </section>

      <section className="content-block space-y-4">
        <h3 className="section-title">Python: полный расчет PV и FV по реальной ноте</h3>
        <MathText
          as="p"
          text="В коде ниже одна таблица одновременно решает две задачи: вычисляет цену потока на дату оценки и наращивает те же платежи к моменту погашения. Такой формат особенно полезен в преподавании, потому что все промежуточные коэффициенты остаются видимыми."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <ExecutablePythonBlock
          code={valuationCode}
          title="Python: дисконтирование и наращение купонной ноты"
          packages={['pandas']}
          note="Если изменить рыночную доходность, вы сразу увидите, как меняется и цена бумаги, и будущая стоимость потока при реинвестировании. Это хороший способ почувствовать связь между ставкой и оценкой."
        />
      </section>

      <section className="content-block space-y-4">
        <h3 className="section-title">Полезная функция Python для потоков</h3>
        <MathText
          as="p"
          text="Генераторные выражения внутри `sum()` позволяют компактно записывать финансовые формулы почти в том же виде, что и в математике. Это делает код не просто коротким, а концептуально прозрачным: студент видит прямое соответствие между суммой по периодам и программной реализацией."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <ExecutablePythonBlock
          code={utilityCode}
          title="Python: sum() и генераторное выражение"
          note="Здесь наращение всего потока записано одной суммой по периодам. Такой прием потом легко переносится на аннуитеты, кредиты и проектные платежные схемы."
        />
      </section>

      <KeyIdea title="Ключевой вывод">
        Наращение и дисконтирование - это две зеркальные операции перевода потока во времени. Выбор зависит не от
        формулы как таковой, а от вопроса аналитика: нужна стоимость потока сегодня или итоговый капитал на
        выбранную дату в будущем.
      </KeyIdea>

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
