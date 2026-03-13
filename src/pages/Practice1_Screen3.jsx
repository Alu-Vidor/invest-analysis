import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AlertBox from '../components/AlertBox'
import CodeBlock from '../components/CodeBlock'
import ComparisonTable from '../components/ComparisonTable'
import CourseHeader from '../components/CourseHeader'
import DatasetCard from '../components/DatasetCard'
import IdeaCard from '../components/IdeaCard'
import KeyIdea from '../components/KeyIdea'
import MathText from '../components/MathText'
import PlotViewer from '../components/PlotViewer'
import TaskBlock from '../components/TaskBlock'

const contextNotes = [
  {
    title: 'Что меняет цифровая экономика',
    text: 'Инвестиционный анализ получает доступ не только к отчетности, но и к цифровому следу бизнеса: трафику, конверсии, платежам, удержанию клиентов и операционным метрикам.',
  },
  {
    title: 'Главный риск',
    text: 'Большой объем данных сам по себе не повышает качество вывода. Ошибки в идентификации объекта, источнике или единицах измерения могут сделать анализ ложным.',
  },
]

const digitalCode = `import pandas as pd
from io import StringIO

raw_csv = StringIO(
    """date,visitors,conversion_rate,revenue_thousand_rub
2026-03-01,5400,0.031,168
2026-03-02,5600,0.029,162
2026-03-03,5900,0.034,185
2026-03-04,6100,0.036,201
"""
)

df = pd.read_csv(raw_csv, parse_dates=["date"])
df["buyers"] = (df["visitors"] * df["conversion_rate"]).round().astype(int)

print(df)
print()
print("Средняя конверсия:", round(df["conversion_rate"].mean(), 4))`

const mergeCode = `market = pd.DataFrame(
    {
        "date": pd.to_datetime(["2026-03-01", "2026-03-02", "2026-03-03", "2026-03-04"]),
        "price": [101.2, 102.8, 101.9, 104.1],
    }
)

merged = df.merge(market, on="date", how="left")
print(merged[["date", "visitors", "revenue_thousand_rub", "price"]])`

const days = [
  { date: '01.03', visitors: 5400, revenue: 168 },
  { date: '02.03', visitors: 5600, revenue: 162 },
  { date: '03.03', visitors: 5900, revenue: 185 },
  { date: '04.03', visitors: 6100, revenue: 201 },
]

function DigitalTracePlot() {
  const maxVisitors = Math.max(...days.map((day) => day.visitors))
  const maxRevenue = Math.max(...days.map((day) => day.revenue))

  const visitorPoints = days
    .map((day, index) => {
      const x = 60 + index * 130
      const y = 160 - (day.visitors / maxVisitors) * 90
      return `${x},${y}`
    })
    .join(' ')

  const revenuePoints = days
    .map((day, index) => {
      const x = 60 + index * 130
      const y = 180 - (day.revenue / maxRevenue) * 90
      return `${x},${y}`
    })
    .join(' ')

  return (
    <svg viewBox="0 0 520 220" className="h-full w-full" role="img" aria-label="Цифровой след бизнеса">
      <line x1="40" y1="180" x2="490" y2="180" stroke="#64748b" strokeWidth="2" />
      <polyline points={visitorPoints} fill="none" stroke="#2563eb" strokeWidth="3" />
      <polyline points={revenuePoints} fill="none" stroke="#059669" strokeWidth="3" />
      {days.map((day, index) => {
        const x = 60 + index * 130
        const visitorY = 160 - (day.visitors / maxVisitors) * 90
        const revenueY = 180 - (day.revenue / maxRevenue) * 90

        return (
          <g key={day.date}>
            <circle cx={x} cy={visitorY} r="5" fill="#2563eb" />
            <circle cx={x} cy={revenueY} r="5" fill="#059669" />
            <text x={x} y="200" textAnchor="middle" fontSize="12" fill="#334155">
              {day.date}
            </text>
          </g>
        )
      })}
      <text x="360" y="34" fontSize="12" fill="#2563eb">
        visitors
      </text>
      <text x="360" y="54" fontSize="12" fill="#059669">
        revenue
      </text>
    </svg>
  )
}

function Practice1_Screen3({ setContext, setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
    if (setContext) {
      setContext({
        title: 'Инвестиционный анализ в цифровой экономике',
        text: 'Цифровая среда добавляет новые источники данных, но одновременно требует большей дисциплины в их интерпретации.',
      })
    }
  }, [setContext, setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 1 · Основы инвестиционного анализа"
        title="Инвестиционный анализ в цифровой экономике"
        subtitle="Показываем, как операционные и поведенческие данные входят в инвестиционное решение и почему цифровой след бизнеса становится частью финансовой аргументации."
      />

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="content-block">
          <MathText
            as="p"
            text="В цифровой экономике аналитик работает уже не только с итоговым денежным потоком $CF_t$, но и с факторами, которые этот поток формируют: трафиком, конверсией, удержанием клиентов, частотой покупок. Это меняет профессию: инвестиционный вывод строится на более богатой базе данных."
            className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
        </section>

        <IdeaCard title="Интерактивный вопрос">
          <p>
            Если выручка платформы растет, означает ли это автоматически рост инвестиционной
            привлекательности?
          </p>
          <p className="mt-3">
            Нет. Нужно понять, устойчив ли рост, какой ценой он достигнут и превращается ли в
            денежный поток после учета затрат и риска.
          </p>
        </IdeaCard>
      </section>

      <DatasetCard
        title="Мини-датасет цифрового сервиса"
        text="Ниже фрагмент реального для учебных целей формата: дневной трафик, конверсия и выручка. Такой набор уже позволяет обсуждать связь между операционными метриками и финансовым результатом."
        code={digitalCode}
        codeTitle="Python: читаем цифровой след из CSV"
      />

      <ComparisonTable
        columns={days.map((day) => day.date)}
        rows={[
          { label: 'Посетители', values: days.map((day) => day.visitors) },
          { label: 'Выручка, тыс. руб.', values: days.map((day) => day.revenue), highlight: true },
          {
            label: 'Наблюдение аналитика',
            values: ['База', 'Просадка конверсии', 'Восстановление', 'Ускорение роста'],
          },
        ]}
      />

      <PlotViewer
        title="Операционный и финансовый след"
        caption="Линии не доказывают причинность, но задают содержательный вопрос: синхронен ли рост цифровой активности и выручки. Это уже полноценная аналитическая постановка задачи."
      >
        <DigitalTracePlot />
      </PlotViewer>

      <TaskBlock
        title="Как обсуждать это со студентами"
        items={[
          {
            title: 'Сначала читаем бизнес-сюжет',
            content:
              'Что означает рост посетителей: повышение спроса, усиление маркетинга или краткосрочный всплеск активности?',
          },
          {
            title: 'Потом связываем метрики',
            content:
              'Какие показатели выступают ранними индикаторами будущего денежного потока, а какие уже отражают финансовый результат?',
          },
          {
            title: 'Только затем делаем вывод',
            content:
              'Можно ли использовать наблюдаемую динамику как аргумент в пользу инвестиционной привлекательности проекта?',
          },
        ]}
      />

      <section className="grid gap-4 lg:grid-cols-2">
        <section className="content-block">
          <h3 className="section-title">Python: соединяем источники данных</h3>
          <MathText
            as="p"
            text="Следующий шаг - объединить операционные метрики с рыночными данными. В учебной логике это важно: студент видит, что инвестиционный анализ в цифровой среде почти всегда требует слияния нескольких источников."
            className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
          <div className="mt-4">
            <CodeBlock code={mergeCode} title="Python: объединяем операционные и рыночные данные" />
          </div>
        </section>

        <AlertBox title="Что может пойти не так">
          Ошибка в дате, единицах измерения или ключе объединения мгновенно искажает вывод.
          Поэтому цифровая экономика требует не только большего объема данных, но и большей
          дисциплины в их подготовке.
        </AlertBox>
      </section>

      <KeyIdea title="Что меняется в профессии">
        Инвестиционный аналитик цифровой экономики должен уметь видеть за финансовым итогом его
        операционные драйверы. Это делает анализ глубже, но одновременно повышает требования к
        качеству данных, интерпретации и технической грамотности.
      </KeyIdea>

      <nav className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/practice/1/screen/2"
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Назад
        </Link>
        <Link
          to="/practice/1/screen/4"
          className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Далее: 4. Python как инструмент
        </Link>
      </nav>
    </article>
  )
}

export default Practice1_Screen3
