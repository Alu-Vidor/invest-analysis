import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ComparisonTable from '../components/ComparisonTable'
import CourseHeader from '../components/CourseHeader'
import ExecutablePythonBlock from '../components/ExecutablePythonBlock'
import HandbookDetails from '../components/HandbookDetails'
import IdeaCard from '../components/IdeaCard'
import KeyIdea from '../components/KeyIdea'
import MathBlock from '../components/MathBlock'
import MathText from '../components/MathText'
import PlotViewer from '../components/PlotViewer'
import SourceNote from '../components/SourceNote'
import ThinkQuestion from '../components/ThinkQuestion'
import {
  freddieMortgageRatesJan042024,
  interestOnlyMortgageBenchmarkJan042024,
  mortgageBenchmarksJan042024,
  mortgagePrincipalUsd,
} from '../data/practice2RealData'

const contextNotes = [
  {
    title: 'Аннуитет',
    text: 'Аннуитетом называют последовательность равных платежей через равные промежутки времени. В финансах это базовая модель для кредитов, аренды и многих сервисных контрактов.',
  },
  {
    title: 'Платежная схема',
    text: 'Даже при одной и той же сумме долга и ставке форма распределения платежей во времени влияет на нагрузку, текущую стоимость и итоговую сумму процентов.',
  },
]

const annuityCode = `principal = 400_000
rates = {
    "30Y_FRM": 0.0662,
    "15Y_FRM": 0.0589,
}

for label, annual_rate in rates.items():
    monthly_rate = annual_rate / 12
    months = 360 if label == "30Y_FRM" else 180
    payment = principal * monthly_rate / (1 - (1 + monthly_rate) ** (-months))
    print(label, round(payment, 2))`

const utilityCode = `principal = 400_000
annual_rate = 0.0662
monthly_rate = annual_rate / 12
months = 360
payment = principal * monthly_rate / (1 - (1 + monthly_rate) ** (-months))

balance = principal
for month in range(1, 4):
    interest = balance * monthly_rate
    principal_part = payment - interest
    balance -= principal_part
    print(month, round(payment, 2), round(interest, 2), round(balance, 2))`

function MortgagePaymentChart() {
  const monthlyValues = [
    mortgageBenchmarksJan042024[0].paymentUsd,
    mortgageBenchmarksJan042024[1].paymentUsd,
    interestOnlyMortgageBenchmarkJan042024.monthlyInterestUsd,
  ]
  const maxValue = Math.max(...monthlyValues)

  const bars = [
    {
      label: '30-летняя FRM',
      value: mortgageBenchmarksJan042024[0].paymentUsd,
      color: '#2563eb',
    },
    {
      label: '15-летняя FRM',
      value: mortgageBenchmarksJan042024[1].paymentUsd,
      color: '#0f766e',
    },
    {
      label: 'Interest-only',
      value: interestOnlyMortgageBenchmarkJan042024.monthlyInterestUsd,
      color: '#f97316',
    },
  ]

  return (
    <svg
      viewBox="0 0 620 260"
      className="h-full w-full"
      role="img"
      aria-label="Сравнение ежемесячных платежей по разным схемам финансирования"
    >
      <line x1="60" y1="205" x2="570" y2="205" stroke="#64748b" strokeWidth="2" />
      {bars.map((bar, index) => {
        const x = 110 + index * 150
        const height = (bar.value / maxValue) * 130
        const y = 205 - height

        return (
          <g key={bar.label}>
            <rect x={x} y={y} width="54" height={height} rx="12" fill={bar.color} opacity="0.92" />
            <text x={x + 27} y={y - 10} textAnchor="middle" fontSize="12" fill="#0f172a">
              {bar.value.toFixed(0)}
            </text>
            <text x={x + 27} y="226" textAnchor="middle" fontSize="11" fill="#334155">
              {index === 0 ? '30Y' : index === 1 ? '15Y' : 'IO'}
            </text>
          </g>
        )
      })}
      <text x="12" y="26" fontSize="12" fill="#475569">
        USD в месяц
      </text>
    </svg>
  )
}

function Practice2_Screen4({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 2 · Платежные схемы и Python"
        title="Аннуитеты и типовые платежные схемы"
        subtitle="Переходим от единичных потоков к регулярным платежам. В качестве реальной базы берем средние ставки Freddie Mac по ипотеке на 4 января 2024 года и показываем, как форма платежей меняет финансовую нагрузку."
      />

      <section className="content-block space-y-4">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
          В повседневной финансовой жизни мы редко встречаем одиночный платеж. Гораздо чаще
          приходится анализировать регулярные списания по кредиту, аренде или сервисному контракту.
          Здесь на сцену выходит <strong>аннуитет</strong> (англ. <em>annuity</em>).
        </p>
        <MathText
          as="p"
          text="Аннуитет возникает тогда, когда заемщик или инвестор совершает равные платежи через равные промежутки времени. Для обычного аннуитета с платежом $A$, периодической ставкой $i$ и числом периодов $n$ приведенная стоимость записывается формулой"
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <MathBlock formula={String.raw`PV_{ann} = A \cdot \frac{1 - (1+i)^{-n}}{i}`} />
        <MathText
          as="p"
          text="Если известна текущая сумма кредита или обязательства, из этой формулы получается выражение для самого платежа:"
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <MathBlock formula={String.raw`A = PV \cdot \frac{i}{1 - (1+i)^{-n}}`} />
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
          Здесь <strong>A</strong> — регулярный платеж, <strong>PV</strong> — сумма кредита или
          приведенная стоимость обязательства, <strong>i</strong> — ставка за один период,
          <strong>n</strong> — число периодов. В ипотеке период обычно месячный, поэтому и ставка,
          и срок переводятся в месяцы.
        </p>
        <MathText
          as="p"
          text="Для ипотечных расчетов важно помнить, что ставка и число периодов берутся в месячном шаге: $i = \\frac{r}{12}$, $n = 12 \\cdot T$, где $T$ - срок в годах."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
      </section>

      <IdeaCard title="Реальные рыночные ориентиры">
        <p>
          По данным Freddie Mac PMMS на 4 января 2024 года средняя ставка по 30-летней фиксированной ипотеке
          составила {freddieMortgageRatesJan042024[0].annualRatePct.toFixed(2)}%, а по 15-летней -{' '}
          {freddieMortgageRatesJan042024[1].annualRatePct.toFixed(2)}%. Ниже сравниваем эти режимы для суммы{' '}
          {mortgagePrincipalUsd.toLocaleString('en-US')} USD.
        </p>
      </IdeaCard>

      <SourceNote>
        Реальные рыночные ориентиры: средние ипотечные ставки <strong>Freddie Mac PMMS</strong> на{' '}
        <strong>4 января 2024 года</strong> для 30-летней и 15-летней фиксированной ипотеки.
      </SourceNote>

      <ComparisonTable
        columns={[
          mortgageBenchmarksJan042024[0].product,
          mortgageBenchmarksJan042024[1].product,
          interestOnlyMortgageBenchmarkJan042024.product,
        ]}
        rows={[
          {
            label: 'Годовая ставка, %',
            values: [
              mortgageBenchmarksJan042024[0].annualRatePct.toFixed(2),
              mortgageBenchmarksJan042024[1].annualRatePct.toFixed(2),
              interestOnlyMortgageBenchmarkJan042024.annualRatePct.toFixed(2),
            ],
          },
          {
            label: 'Срок, месяцев',
            values: [
              String(mortgageBenchmarksJan042024[0].months),
              String(mortgageBenchmarksJan042024[1].months),
              String(interestOnlyMortgageBenchmarkJan042024.months),
            ],
          },
          {
            label: 'Ежемесячный платеж, USD',
            values: [
              mortgageBenchmarksJan042024[0].paymentUsd.toFixed(2),
              mortgageBenchmarksJan042024[1].paymentUsd.toFixed(2),
              interestOnlyMortgageBenchmarkJan042024.monthlyInterestUsd.toFixed(2),
            ],
            highlight: true,
          },
          {
            label: 'Финальный платеж, USD',
            values: [
              '0.00',
              '0.00',
              interestOnlyMortgageBenchmarkJan042024.balloonPaymentUsd.toFixed(2),
            ],
          },
        ]}
      />

      <PlotViewer
        title="Как схема меняет ежемесячную нагрузку"
        caption="15-летняя ипотека требует более высокого регулярного платежа, потому что основной долг гасится быстрее. Interest-only выглядит легче по текущему платежу, но переносит возврат капитала в крупный финальный платеж."
      >
        <MortgagePaymentChart />
      </PlotViewer>

      <ThinkQuestion question="Почему схема interest-only выглядит комфортнее по ежемесячному платежу, но при этом может быть рискованнее для заемщика?">
        <p>
          Потому что низкий текущий платеж достигается за счет переноса возврата основного долга в
          будущее. В течение срока заемщик почти не сокращает тело кредита, а в конце сталкивается
          с крупным финальным платежом.
        </p>
        <p>
          То есть краткосрочная ликвидность улучшается, но риск рефинансирования и риск большого
          единовременного платежа становятся выше.
        </p>
      </ThinkQuestion>

      <section className="content-block space-y-4">
        <h3 className="section-title">Финансовый смысл сравнения схем</h3>
        <MathText
          as="p"
          text="Одинаковая сумма долга не означает одинаковую стоимость обслуживания. В 15-летней ипотеке общий платеж выше в месяц, зато суммарная переплата по процентам ниже. В interest-only схеме регулярная нагрузка меньше, но долговой риск в конце срока заметно выше из-за крупного balloon payment."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <MathText
          as="p"
          text="Для инвестиционного аналитика это не второстепенная деталь. Структура финансирования влияет на ликвидность проекта, доступность обслуживания долга и устойчивость денежного потока в разные годы."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
      </section>

      <HandbookDetails title="Подробнее про экономику аннуитета">
        <p>
          В аннуитетном платеже сумма постоянна, но его внутренняя структура меняется по времени:
          в начале большая часть платежа уходит на проценты, а ближе к концу — на погашение
          основного долга.
        </p>
        <p>
          Именно поэтому одинаковый ежемесячный платеж не означает одинаковую долговую нагрузку по
          смыслу. Для аналитика важно видеть не только сумму, но и внутреннее распределение платежа.
        </p>
      </HandbookDetails>

      <section className="content-block space-y-4">
        <h3 className="section-title">Python: считаем аннуитет по реальным ставкам</h3>
        <MathText
          as="p"
          text="В коде ниже одна и та же формула применяется к двум реальным ипотечным ставкам. Это важный прием: аналитик описывает правило один раз, а затем подает в него разные сценарии или продукты."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <ExecutablePythonBlock
          code={annuityCode}
          title="Python: ежемесячный аннуитетный платеж"
          note="Измените срок или ставку и сравните, как чувствительно меняется ежемесячный платеж. Именно так обычно тестируют долговую нагрузку заемщика или проекта."
        />
      </section>

      <section className="content-block space-y-4">
        <h3 className="section-title">Полезные функции Python для амортизационного графика</h3>
        <MathText
          as="p"
          text="Цикл `for` и функция `range()` позволяют пошагово пройти по периодам кредита, а `round()` делает вывод читаемым. Такой код полезен не только в учебной задаче: он лежит в основе построения графиков платежей, графиков остатков и проверки covenant-нагрузки."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <ExecutablePythonBlock
          code={utilityCode}
          title="Python: первые месяцы амортизации"
          note="Фрагмент показывает, как регулярный платеж раскладывается на процентную и основную часть долга. Это одна из самых полезных интерпретаций аннуитета в прикладной работе."
        />
      </section>

      <KeyIdea title="Ключевой вывод">
        Аннуитет - это частный, но очень важный тип денежного потока. Для аналитика важно не только уметь
        вычислить равный платеж, но и понимать, как выбранная схема меняет риск, ликвидность и распределение
        нагрузки по времени.
      </KeyIdea>

      <nav className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/practice/2/screen/3"
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Назад
        </Link>
        <Link
          to="/practice/2/screen/5"
          className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Далее: 5. Расчеты приведенной и будущей стоимости в Python
        </Link>
      </nav>
    </article>
  )
}

export default Practice2_Screen4
