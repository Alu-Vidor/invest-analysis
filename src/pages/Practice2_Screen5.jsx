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
  mortgageBenchmarksJan042024,
  mortgagePrincipalUsd,
  treasuryNoteFutureValueAtMaturityUsd,
  treasuryNotePriceProxyUsd,
  treasuryNoteValuationRows2028,
} from '../data/practice2RealData'

const contextNotes = [
  {
    title: 'PV',
    text: 'Приведенная стоимость отвечает на вопрос, сколько поток стоит сегодня при заданной норме доходности или ставке дисконтирования.',
  },
  {
    title: 'FV',
    text: 'Будущая стоимость показывает, каким станет поток на выбранную дату в будущем, если промежуточные суммы могут быть реинвестированы под заданную ставку.',
  },
]

const miniAnalysisCode = `import pandas as pd


def present_value_stream(cash_flows, rate, start_period=1):
    return sum(
        cf / (1 + rate) ** period
        for period, cf in enumerate(cash_flows, start=start_period)
    )


def future_value_stream(cash_flows, rate, horizon):
    return sum(
        cf * (1 + rate) ** (horizon - period)
        for period, cf in enumerate(cash_flows, start=1)
    )


def annuity_payment(principal, periodic_rate, periods):
    return principal * periodic_rate / (1 - (1 + periodic_rate) ** (-periods))


bond_cash_flows = [212.5, 212.5, 212.5, 212.5, 212.5, 212.5, 212.5, 10212.5]
semiannual_rate = 0.0393 / 2

bond_price = present_value_stream(bond_cash_flows, semiannual_rate)
bond_fv = future_value_stream(bond_cash_flows, semiannual_rate, horizon=8)

mortgage_30y = annuity_payment(400_000, 0.0662 / 12, 360)
mortgage_15y = annuity_payment(400_000, 0.0589 / 12, 180)

summary = pd.DataFrame(
    {
        "metric": [
            "Treasury note price proxy",
            "Treasury note future value at maturity",
            "30Y mortgage monthly payment",
            "15Y mortgage monthly payment",
        ],
        "value_usd": [bond_price, bond_fv, mortgage_30y, mortgage_15y],
    }
)

print(summary.round(2))`

const functionCode = `def present_value_stream(cash_flows, rate, start_period=1):
    return sum(
        cf / (1 + rate) ** period
        for period, cf in enumerate(cash_flows, start=start_period)
    )


def future_value_stream(cash_flows, rate, horizon):
    return sum(
        cf * (1 + rate) ** (horizon - period)
        for period, cf in enumerate(cash_flows, start=1)
    )


def annuity_payment(principal, periodic_rate, periods):
    return principal * periodic_rate / (1 - (1 + periodic_rate) ** (-periods))


cash_flows = [212.5, 212.5, 212.5, 212.5, 212.5, 212.5, 212.5, 10212.5]

print("PV:", round(present_value_stream(cash_flows, 0.0393 / 2), 2))
print("FV:", round(future_value_stream(cash_flows, 0.0393 / 2, 8), 2))
print("30Y payment:", round(annuity_payment(400_000, 0.0662 / 12, 360), 2))`

const couponPvTotal = treasuryNoteValuationRows2028.reduce(
  (total, row) => total + row.couponUsd * row.discountFactor,
  0
)
const principalPv =
  treasuryNoteValuationRows2028[treasuryNoteValuationRows2028.length - 1].principalUsd *
  treasuryNoteValuationRows2028[treasuryNoteValuationRows2028.length - 1].discountFactor

function BondPriceCompositionChart() {
  const maxValue = Math.max(couponPvTotal, principalPv)

  return (
    <svg
      viewBox="0 0 620 220"
      className="h-full w-full"
      role="img"
      aria-label="Структура цены казначейской ноты по компонентам"
    >
      <line x1="70" y1="175" x2="560" y2="175" stroke="#64748b" strokeWidth="2" />
      {[
        { x: 170, label: 'Купоны', value: couponPvTotal, color: '#2563eb' },
        { x: 360, label: 'Номинал', value: principalPv, color: '#0f766e' },
      ].map((bar) => {
        const height = (bar.value / maxValue) * 105

        return (
          <g key={bar.label}>
            <rect x={bar.x} y={175 - height} width="72" height={height} rx="14" fill={bar.color} />
            <text x={bar.x + 36} y={175 - height - 10} textAnchor="middle" fontSize="12" fill="#0f172a">
              {bar.value.toFixed(2)}
            </text>
            <text x={bar.x + 36} y="198" textAnchor="middle" fontSize="12" fill="#334155">
              {bar.label}
            </text>
          </g>
        )
      })}
      <text x="12" y="26" fontSize="12" fill="#475569">
        вклад в цену, USD
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
        subtitle="Завершаем практику общей вычислительной логикой: одни и те же функции применяем к реальной купонной ноте и к ипотечным платежам, чтобы показать универсальность финансовой математики."
      />

      <section className="content-block space-y-4">
        <MathText
          as="p"
          text="Общая формула приведенной стоимости для произвольного потока задается суммой дисконтированных платежей. Формула аннуитета - это не отдельный мир, а частный случай той же логики, когда все $CF_t$ равны между собой."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <MathBlock formula={String.raw`PV = \sum_{t=1}^{n} \frac{CF_t}{(1+r)^t}`} />
        <MathBlock formula={String.raw`PV_{ann} = A \cdot \frac{1-(1+i)^{-n}}{i}`} />
        <MathText
          as="p"
          text="Для будущей стоимости симметрия сохраняется: каждый платеж можно перенести вперед к одному горизонту, а затем сложить. Поэтому хороший код не должен быть привязан только к одной учебной задаче; он должен уметь работать и с облигацией, и с кредитом, и с проектным потоком."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
      </section>

      <IdeaCard title="Что особенно важно увидеть на этом экране">
        <p>
          Python здесь играет не роль декоративного приложения к теории, а роль инструмента формализации. Как
          только поток задан числами и периодами, один и тот же набор функций начинает работать для разных
          профессиональных объектов: рыночной бумаги, кредита, инвестиционного проекта.
        </p>
      </IdeaCard>

      <ComparisonTable
        columns={['Казначейская нота', 'Ипотека 30 лет', 'Ипотека 15 лет']}
        rows={[
          {
            label: 'Рыночная ставка',
            values: ['3.93% / 2', '6.62% / 12', '5.89% / 12'],
          },
          {
            label: 'Основной расчет',
            values: [
              `PV = ${treasuryNotePriceProxyUsd.toFixed(2)} USD`,
              `A = ${mortgageBenchmarksJan042024[0].paymentUsd.toFixed(2)} USD`,
              `A = ${mortgageBenchmarksJan042024[1].paymentUsd.toFixed(2)} USD`,
            ],
            highlight: true,
          },
          {
            label: 'Дополнительный вывод',
            values: [
              `FV = ${treasuryNoteFutureValueAtMaturityUsd.toFixed(2)} USD`,
              `Principal = ${mortgagePrincipalUsd.toLocaleString('en-US')} USD`,
              `Principal = ${mortgagePrincipalUsd.toLocaleString('en-US')} USD`,
            ],
          },
        ]}
      />

      <PlotViewer
        title="Из чего складывается цена реальной купонной ноты"
        caption="Цена ноты - это сумма приведенных стоимостей всех купонов и приведенной стоимости возврата номинала. На длинных бумагах вклад номинала часто оказывается доминирующим, хотя с точки зрения денежных поступлений купоны тоже значимы."
      >
        <BondPriceCompositionChart />
      </PlotViewer>

      <section className="content-block space-y-4">
        <h3 className="section-title">Python: единый расчет для реальных данных</h3>
        <MathText
          as="p"
          text="В одном блоке ниже объединены два типа задач. Сначала вычисляется цена и будущая стоимость потока реальной Treasury note, затем по той же логике считается аннуитетный платеж для ипотечных ставок Freddie Mac. Это хороший образец того, как строится библиотека функций финансового аналитика."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <ExecutablePythonBlock
          code={miniAnalysisCode}
          title="Python: объединяем оценку ноты и аннуитет"
          packages={['pandas']}
          defaultOpen
          note="Попробуйте менять ставку по ноте или ипотеке и наблюдать, как один и тот же код реагирует на разные финансовые сценарии. Это и есть практическая ценность математической формализации."
        />
      </section>

      <section className="content-block space-y-4">
        <h3 className="section-title">Полезные функции Python для дальнейшей работы</h3>
        <MathText
          as="p"
          text="Функции `present_value_stream()`, `future_value_stream()` и `annuity_payment()` стоит сохранить как базовый набор финансовых примитивов. Когда такие элементы уже готовы и проверены, аналитик может сосредоточиться на выборе данных, постановке гипотез и интерпретации результатов."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <ExecutablePythonBlock
          code={functionCode}
          title="Python: reusable financial functions"
          note="Этот блок полезен как заготовка для последующих практик: функции уже можно применять к другим облигациям, кредитам и проектным потокам."
        />
      </section>

      <KeyIdea title="Итог практики 2">
        Денежный поток, временная стоимость денег, дисконтирование, наращение и аннуитеты образуют единую
        математическую систему. Если студент научился переводить реальные рыночные данные в эту систему и
        воспроизводить расчеты в Python, он уже делает первый шаг к профессиональному инвестиционному анализу на
        основе данных.
      </KeyIdea>

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
