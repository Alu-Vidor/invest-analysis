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
    title: 'Аннуитет',
    text: 'Аннуитетом называют последовательность равных платежей через равные интервалы времени. В инвестиционном анализе он возникает в кредитах, аренде, подписках и сервисных контрактах.',
  },
  {
    title: 'Платежная схема',
    text: 'Даже при одинаковой сумме долга и ставке разные схемы платежей по-разному распределяют нагрузку во времени и поэтому создают разную текущую стоимость.',
  },
]

const scheduleRows = [
  { year: 1, annuity: 4.12, equalPrincipal: 4.68, bullet: 1.68 },
  { year: 2, annuity: 4.12, equalPrincipal: 4.26, bullet: 1.68 },
  { year: 3, annuity: 4.12, equalPrincipal: 3.84, bullet: 1.68 },
  { year: 4, annuity: 4.12, equalPrincipal: 3.42, bullet: 13.68 },
]

const annuityCode = `principal = 12_000_000
rate = 0.14
periods = 4

annuity_payment = principal * rate / (1 - (1 + rate) ** (-periods))

print("Аннуитетный платеж:", round(annuity_payment, 2))`

const utilityCode = `principal = 12_000_000
rate = 0.14
periods = 4

principal_part = principal / periods
remaining = principal

for year in range(1, periods + 1):
    interest = remaining * rate
    payment = principal_part + interest
    print(year, round(payment, 2), round(remaining, 2))
    remaining -= principal_part`

function PaymentSchemeChart() {
  const maxValue = Math.max(...scheduleRows.flatMap((row) => [row.annuity, row.equalPrincipal, row.bullet]))

  return (
    <svg
      viewBox="0 0 560 250"
      className="h-full w-full"
      role="img"
      aria-label="Сравнение типовых платежных схем"
    >
      <line x1="45" y1="195" x2="525" y2="195" stroke="#64748b" strokeWidth="2" />
      {scheduleRows.map((row, index) => {
        const baseX = 70 + index * 110
        const annuityHeight = (row.annuity / maxValue) * 120
        const equalHeight = (row.equalPrincipal / maxValue) * 120
        const bulletHeight = (row.bullet / maxValue) * 120

        return (
          <g key={row.year}>
            <rect x={baseX} y={195 - annuityHeight} width="18" height={annuityHeight} rx="6" fill="#2563eb" />
            <rect x={baseX + 24} y={195 - equalHeight} width="18" height={equalHeight} rx="6" fill="#0f766e" />
            <rect x={baseX + 48} y={195 - bulletHeight} width="18" height={bulletHeight} rx="6" fill="#f97316" />
            <text x={baseX + 32} y="217" textAnchor="middle" fontSize="12" fill="#334155">
              {row.year}
            </text>
          </g>
        )
      })}
      <text x="332" y="32" fontSize="12" fill="#2563eb">
        аннуитет
      </text>
      <text x="332" y="50" fontSize="12" fill="#0f766e">
        равный основной долг
      </text>
      <text x="332" y="68" fontSize="12" fill="#f97316">
        bullet
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
        subtitle="Разбираем равные платежи, неравные схемы погашения и их финансовый смысл для инвестора, заемщика и аналитика."
      />

      <section className="content-block space-y-4">
        <MathText
          as="p"
          text="Аннуитетная схема возникает там, где платежи равны по величине и распределены через одинаковые интервалы времени. Она удобна для планирования денежной нагрузки, потому что создает устойчивый график выплат."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <MathText
          as="p"
          text="Если аннуитетный платеж равен $A$, ставка периода равна $r$, а число платежей равно $n$, то приведенная стоимость обычного аннуитета записывается следующей формулой."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <div className="grid gap-4 lg:grid-cols-2">
          <MathBlock formula={String.raw`PV_{ann} = A \cdot \frac{1-(1+r)^{-n}}{r}`} />
          <MathBlock formula={String.raw`FV_{ann} = A \cdot \frac{(1+r)^n-1}{r}`} />
        </div>
        <MathText
          as="p"
          text="Однако аннуитет — не единственная схема. В практике финансирования встречаются также равномерное погашение основного долга и схема bullet, при которой до конца срока платятся только проценты, а основная сумма возвращается в финале."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
      </section>

      <section className="grid items-start gap-4 md:grid-cols-2">
        <IdeaCard title="Аннуитет постнумерандо и пренумерандо">
          <p>
            Если платежи совершаются в конце периода, говорят об обычном аннуитете
            (постнумерандо). Если платежи происходят в начале периода, стоимость такой схемы выше,
            поскольку каждый платеж дисконтируется на один период меньше.
          </p>
        </IdeaCard>

        <IdeaCard title="Почему схемы нельзя сравнивать только по сумме">
          <p>
            Одинаковая общая сумма выплат не означает одинаковой финансовой нагрузки. Важен профиль
            платежей: ранние выплаты тяжелее для заемщика и ценнее для кредитора, чем поздние.
          </p>
        </IdeaCard>
      </section>

      <ComparisonTable
        columns={scheduleRows.map((row) => `Год ${row.year}`)}
        rows={[
          {
            label: 'Аннуитетный платеж, млн руб.',
            values: scheduleRows.map((row) => row.annuity.toFixed(2)),
          },
          {
            label: 'Равный основной долг, млн руб.',
            values: scheduleRows.map((row) => row.equalPrincipal.toFixed(2)),
          },
          {
            label: 'Bullet-платеж, млн руб.',
            values: scheduleRows.map((row) => row.bullet.toFixed(2)),
            highlight: true,
          },
        ]}
      />

      <PlotViewer
        title="Профиль типовых платежных схем"
        caption="Аннуитет дает ровный платежный профиль, схема с равным основным долгом снижает нагрузку по мере погашения, а bullet переносит основной платеж на конец срока."
      >
        <PaymentSchemeChart />
      </PlotViewer>

      <section className="content-block space-y-4">
        <h3 className="section-title">Python: рассчитываем аннуитетный платеж</h3>
        <MathText
          as="p"
          text="Пусть сумма кредита составляет 12 млн руб., ставка 14% в год, срок — 4 года. Аннуитетная формула позволяет сразу получить постоянный годовой платеж."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <ExecutablePythonBlock
          code={annuityCode}
          title="Python: формула аннуитетного платежа"
          note="Измените ставку или срок и сравните, как быстро меняется размер равного платежа."
        />
      </section>

      <section className="space-y-4">
        <section className="content-block space-y-4">
          <h3 className="section-title">Равномерное погашение основного долга</h3>
          <MathText
            as="p"
            text="При этой схеме основная сумма долга уменьшается одинаковыми долями, а процентная часть снижается по мере сокращения остатка. Поэтому общий платеж сначала выше, чем у аннуитета, но затем постепенно уменьшается."
            className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
          <ExecutablePythonBlock
            code={utilityCode}
            title="Python: график платежей при равном основном долге"
            note="Этот расчет полезен для сравнения схем финансирования проекта и оценки денежной нагрузки по годам."
          />
        </section>

        <KeyIdea title="Ключевой вывод">
          Платежная схема — это тоже денежный поток. Поэтому кредит, аренда, лизинг или подписка
          анализируются теми же инструментами времени и стоимости, что и инвестиционный проект.
        </KeyIdea>
      </section>

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
