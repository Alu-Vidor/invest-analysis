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
    title: 'Временная стоимость денег',
    text: 'Одинаковая денежная сумма в разные моменты времени неравноценна: деньги сегодня можно вложить, а деньги завтра еще только нужно дождаться.',
  },
  {
    title: 'Ставка дисконтирования',
    text: 'Ставка отражает альтернативную доходность капитала и служит коэффициентом перевода будущих сумм в стоимость на текущий момент.',
  },
]

const factorRows = [
  { year: 1, factor: 0.8929, future: 1.12 },
  { year: 2, factor: 0.7972, future: 1.2544 },
  { year: 3, factor: 0.7118, future: 1.4049 },
  { year: 4, factor: 0.6355, future: 1.5735 },
]

const factorCode = `principal = 1_000_000
rate = 0.12
years = [1, 2, 3, 4]

for year in years:
    future_value = principal * (1 + rate) ** year
    discount_factor = 1 / (1 + rate) ** year
    print(year, round(future_value, 2), round(discount_factor, 4))`

const utilityCode = `amounts = [4.8, 5.4, 6.1, 8.2]
rate = 0.12

discounted = [round(value / (1 + rate) ** year, 3) for year, value in enumerate(amounts, start=1)]

print(discounted)
print("Сумма приведенных потоков:", round(sum(discounted), 3))`

function TimeValueChart() {
  const futurePoints = factorRows
    .map((row, index) => {
      const x = 70 + index * 110
      const y = 180 - (row.future / 1.6) * 110
      return `${x},${y}`
    })
    .join(' ')

  const discountPoints = factorRows
    .map((row, index) => {
      const x = 70 + index * 110
      const y = 180 - row.factor * 110
      return `${x},${y}`
    })
    .join(' ')

  return (
    <svg
      viewBox="0 0 540 240"
      className="h-full w-full"
      role="img"
      aria-label="Рост будущей стоимости и снижение коэффициента дисконтирования"
    >
      <line x1="45" y1="185" x2="505" y2="185" stroke="#64748b" strokeWidth="2" />
      <polyline points={futurePoints} fill="none" stroke="#2563eb" strokeWidth="3" />
      <polyline points={discountPoints} fill="none" stroke="#f97316" strokeWidth="3" />
      {factorRows.map((row, index) => {
        const x = 70 + index * 110
        const futureY = 180 - (row.future / 1.6) * 110
        const discountY = 180 - row.factor * 110

        return (
          <g key={row.year}>
            <circle cx={x} cy={futureY} r="4" fill="#2563eb" />
            <circle cx={x} cy={discountY} r="4" fill="#f97316" />
            <text x={x} y="205" textAnchor="middle" fontSize="12" fill="#334155">
              {row.year}
            </text>
          </g>
        )
      })}
      <text x="350" y="36" fontSize="12" fill="#2563eb">
        коэффициент наращения
      </text>
      <text x="350" y="54" fontSize="12" fill="#f97316">
        коэффициент дисконтирования
      </text>
    </svg>
  )
}

function Practice2_Screen2({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 2 · Денежные потоки и дисконтирование"
        title="Временная стоимость денег"
        subtitle="Вводим фундаментальный принцип инвестиционного анализа: одна и та же сумма имеет разную ценность в зависимости от момента времени."
      />

      <section className="content-block space-y-4">
        <MathText
          as="p"
          text="Если капитал можно вложить под ставку $r$, то деньги сегодня и деньги в будущем нельзя считать эквивалентными без специального пересчета. Именно это и выражает принцип временной стоимости денег."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <MathText
          as="p"
          text="Наращение отвечает на вопрос, во что превратится текущая сумма через $t$ периодов. Дисконтирование отвечает на обратный вопрос: сколько стоит будущая сумма в момент времени $0$."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <div className="grid gap-4 lg:grid-cols-2">
          <MathBlock formula={String.raw`FV_t = PV \cdot (1+r)^t`} />
          <MathBlock formula={String.raw`PV = \frac{FV_t}{(1+r)^t}`} />
        </div>
        <MathText
          as="p"
          text="Коэффициент $(1+r)^t$ называют коэффициентом наращения, а величину $(1+r)^{-t}$ — коэффициентом дисконтирования. Чем больше ставка и чем дальше будущий платеж, тем меньше его текущая ценность."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
      </section>

      <section className="grid items-start gap-4 md:grid-cols-2">
        <IdeaCard title="Экономический смысл ставки">
          <p>
            Ставка $r$ — это не только банковский процент. В инвестиционном анализе она отражает
            альтернативную доходность капитала: если деньги не вложить в проект, их можно
            использовать в другой возможности с сопоставимым риском.
          </p>
        </IdeaCard>

        <IdeaCard title="Почему будущий рубль дешевле текущего">
          <p>
            Будущая сумма уступает текущей по двум причинам: ее нельзя использовать немедленно, и
            ее получение сопровождается неопределенностью. Поэтому дисконтирование одновременно
            учитывает фактор времени и цену ожидания.
          </p>
        </IdeaCard>
      </section>

      <ComparisonTable
        columns={factorRows.map((row) => `Год ${row.year}`)}
        rows={[
          {
            label: 'Коэффициент наращения при 12%',
            values: factorRows.map((row) => row.future.toFixed(4)),
          },
          {
            label: 'Коэффициент дисконтирования при 12%',
            values: factorRows.map((row) => row.factor.toFixed(4)),
            highlight: true,
          },
        ]}
      />

      <PlotViewer
        title="Как меняются коэффициенты во времени"
        caption="Коэффициент наращения растет с увеличением горизонта, а коэффициент дисконтирования убывает. Именно поэтому удаленные во времени денежные поступления имеют меньший вклад в текущую стоимость проекта."
      >
        <TimeValueChart />
      </PlotViewer>

      <section className="content-block space-y-4">
        <h3 className="section-title">Python: считаем будущую стоимость и коэффициенты</h3>
        <MathText
          as="p"
          text="Ниже один и тот же капитал в 1 млн руб. переводится в будущую стоимость на горизонтах от одного до четырех лет. Одновременно выводится и коэффициент дисконтирования для каждого периода."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <ExecutablePythonBlock
          code={factorCode}
          title="Python: временная стоимость денег по периодам"
          note="Измените ставку или горизонт и посмотрите, как быстро меняются коэффициенты при более дорогом капитале."
        />
      </section>

      <section className="space-y-4">
        <section className="content-block space-y-4">
          <h3 className="section-title">Связь с проектным анализом</h3>
          <MathText
            as="p"
            text="Если проект приносит 4.8, 5.4, 6.1 и 8.2 млн руб. в будущие годы, то сравнивать эти поступления с первоначальными вложениями напрямую нельзя. Сначала каждый поток нужно привести к сопоставимому моменту времени."
            className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
          <ExecutablePythonBlock
            code={utilityCode}
            title="Python: первые приведенные значения потоков"
            note="Этот фрагмент показывает, как список будущих платежей переводится в приведенные значения еще до расчета NPV."
          />
        </section>

        <KeyIdea title="Ключевой вывод">
          Временная стоимость денег — это не дополнительная техника, а центральный принцип
          инвестиционного анализа. Без нее денежные потоки разных лет нельзя корректно складывать,
          сравнивать и интерпретировать.
        </KeyIdea>
      </section>

      <nav className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/practice/2/screen/1"
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Назад
        </Link>
        <Link
          to="/practice/2/screen/3"
          className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Далее: 3. Операции наращения и дисконтирования
        </Link>
      </nav>
    </article>
  )
}

export default Practice2_Screen2
