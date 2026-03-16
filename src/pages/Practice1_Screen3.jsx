import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ExecutablePythonBlock from '../components/ExecutablePythonBlock'
import ComparisonTable from '../components/ComparisonTable'
import CourseHeader from '../components/CourseHeader'
import IdeaCard from '../components/IdeaCard'
import HandbookDetails from '../components/HandbookDetails'
import KeyIdea from '../components/KeyIdea'
import PlotViewer from '../components/PlotViewer'
import SourceNote from '../components/SourceNote'
import ThinkQuestion from '../components/ThinkQuestion'
import { tencentSegmentsQ32024, tencentTrend } from '../data/practice1RealData'

const contextNotes = [
  {
    title: 'Инвестиционный анализ в цифровую эпоху',
    text: 'В цифровой экономике структура выручки и темпы роста сервисных сегментов важнее, чем владение физическими активами.',
  },
  {
    title: 'Сегментный анализ',
    text: 'Разложение выручки на компоненты (игры, финтех, реклама) позволяет понять, какой из "двигателей" компании работает эффективнее.',
  },
]

const digitalEconomyCards = [
  {
    title: 'Масштабируемость',
    text: 'Цифровые продукты имеют низкие предельные издержки. Продажа миллионной копии игры Tencent стоит почти столько же, сколько первой.',
  },
  {
    title: 'Сетевые эффекты',
    text: 'Ценность экосистемы WeChat растет с каждым новым пользователем, создавая защитный ров вокруг бизнеса.',
  },
  {
    title: 'Данные как актив',
    text: 'Способность монетизировать поведение пользователей через рекламу и платежи становится ключевым фактором оценки.',
  },
  {
    title: 'Регуляторные риски',
    text: 'Влияние государства на цифровую среду в Китае — критический фактор, который аналитик обязан учитывать в оценке.',
  },
]

const segmentCode = `import pandas as pd

# Данные по сегментам Tencent (Q3 2024, млрд CNY)
data = {
    "segment": ["VAS", "FinTech", "Marketing", "Others"],
    "revenue": [82.7, 53.1, 30.0, 1.4],
    "last_year": [75.7, 52.0, 25.7, 1.3]
}

df = pd.DataFrame(data)
df["share"] = df["revenue"] / df["revenue"].sum()
df["growth"] = df["revenue"] / df["last_year"] - 1

print("Анализ сегментов Tencent:")
print(df[["segment", "revenue", "share", "growth"]].round(3))
print()
print("Доля Marketing Services в росте:", 
      round((df.iloc[2]["revenue"] - df.iloc[2]["last_year"]) / 
            (df["revenue"].sum() - df["last_year"].sum()), 2))`

function ServicesShareChart() {
  const chartHeight = 160
  const chartWidth = 500
  const maxVal = Math.max(...tencentTrend.map((d) => d.total))

  return (
    <svg viewBox={`0 0 ${chartWidth + 60} ${chartHeight + 40}`} className="h-full w-full">
      <line x1="40" y1={chartHeight} x2={chartWidth + 40} y2={chartHeight} stroke="#cbd5e1" strokeWidth="1" />
      <line x1="40" y1="10" x2="40" y2={chartHeight} stroke="#cbd5e1" strokeWidth="1" />

      {tencentTrend.map((d, i) => {
        const x = 60 + i * 130
        const totalH = (d.total / maxVal) * (chartHeight - 20)
        const vasH = (d.vas / maxVal) * (chartHeight - 20)

        return (
          <g key={d.quarter}>
            {/* Total Revenue bar */}
            <rect
              x={x}
              y={chartHeight - totalH}
              width="60"
              height={totalH}
              fill="#e2e8f0"
              rx="4"
              className="dark:fill-slate-700"
            />
            {/* VAS segment bar */}
            <rect
              x={x}
              y={chartHeight - vasH}
              width="60"
              height={vasH}
              fill="#4f46e5"
              rx="4"
              opacity="0.8"
            />
            <text x={x + 30} y={chartHeight + 20} textAnchor="middle" fontSize="12" fill="#64748b">
              {d.quarter}
            </text>
            <text x={x + 30} y={chartHeight - totalH - 5} textAnchor="middle" fontSize="11" fill="#475569">
              {d.total}
            </text>
          </g>
        )
      })}
      <text x="10" y="30" fontSize="10" fill="#94a3b8" transform="rotate(-90, 10, 30)">
        млрд CNY
      </text>
    </svg>
  )
}

function Practice1_Screen3({ setContext, setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
    if (setContext) {
      setContext({
        title: 'Инвестиционный анализ в цифровую эпоху',
        text: 'В цифровой экономике инвестор анализирует не только масштаб бизнеса, но и структуру выручки, повторяемость доходов и роль сервисных сегментов.',
      })
    }
  }, [setContext, setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 1 · Основы инвестиционного анализа"
        title="Инвестиционный анализ в условиях цифровой экономики"
        subtitle="Разбираем, как меняется подход к оценке на примере Tencent и её многогранной цифровой экосистемы."
      />

      <section className="content-block space-y-4">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
          В классической экономике ценность компании определялась заводами, запасами и сырьем. В 
          цифровую эпоху фокус сместился на <strong>экосистемы</strong>, <strong>сервисы</strong> и{' '}
          <strong>платформенные решения</strong>. Пример китайского гиганта <strong>Tencent</strong> наглядно
          показывает: даже крупная компания может стать сервисной площадкой для миллионов пользователей.
        </p>
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
          Для аналитика это означает, что анализ общей выручки — лишь верхушка айсберга. Мы должны 
          уметь делать <strong>сегментный анализ</strong>: выделять ключевые драйверы роста (например, 
          рекламу или финтех) и оценивать их вклад в итоговый результат.
        </p>
      </section>

      <section className="grid items-start gap-4 md:grid-cols-2">
        {digitalEconomyCards.map((card) => (
          <article
            key={card.title}
            className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900"
          >
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">{card.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              {card.text}
            </p>
          </article>
        ))}
      </section>

      <section className="content-block">
        <h3 className="section-title">Сегментный анализ Tencent</h3>
        <p className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200">
          Ниже представлена структура выручки Tencent за Q3 2024. Обратите внимание, что сегмент 
          Marketing Services (бывшая онлайн-реклама) растет быстрее остальных (+17% г/г), 
          становясь новым мощным драйвером наряду с игровым бизнесом (VAS).
        </p>
      </section>

      <SourceNote>
        Данные: финансовый отчет <strong>Tencent Holdings Ltd</strong> за Q3 2024. 
        Суммы указаны в миллиардах китайских юаней (RMB/CNY).
      </SourceNote>

      <ComparisonTable
        columns={tencentSegmentsQ32024.map((s) => s.segment)}
        rows={[
          {
            label: 'Выручка (млрд CNY)',
            values: tencentSegmentsQ32024.map((s) => s.revenueBillionCny.toFixed(1)),
            highlight: true,
          },
          {
            label: 'Доля в выручке',
            values: tencentSegmentsQ32024.map((s) => `${(s.share * 100).toFixed(0)}%`),
          },
        ]}
      />

      <PlotViewer
        title="Динамика выручки и доля сервисов (VAS)"
        caption="Синим цветом выделен сегмент Value-Added Services (игры и соцсети). Видно, что при росте общей выручки Tencent сохраняет стабильную и высокую долю доходов от цифрового контента."
      >
        <ServicesShareChart />
      </PlotViewer>

      <section className="space-y-4">
        <ThinkQuestion question="Почему рост рекламных сервисов (Marketing Services) может быть важнее для оценки компании, чем рост стабильных доходов от подписки?">
          <p>
            Рекламные доходы часто имеют более высокую маржинальность при масштабировании, так как 
            используют уже созданный трафик платформы. Успех WeChat Video Accounts в Китае — это пример того, как 
            монетизация внимания пользователей создает добавочную стоимость без огромных новых затрат.
          </p>
          <p>
            Для аналитика это сигнал о повышении эффективности всей экосистемы.
          </p>
        </ThinkQuestion>

        <IdeaCard title="Экосистемный подход в Python">
          <p>
            Используя библиотеку `pandas`, мы можем мгновенно рассчитывать вклад каждого сегмента в 
            общий прирост выручки. Это позволяет не просто видеть «общую цифру», а понимать 
            качественную структуру роста.
          </p>
        </IdeaCard>

        <section className="content-block">
          <h3 className="section-title">Python: сегментный анализ в коде</h3>
          <div className="mt-4">
            <ExecutablePythonBlock
              code={segmentCode}
              title="Python: расчет вклада сегментов и темпов роста"
              packages={['pandas']}
              note="В этом примере мы рассчитываем, какую часть общего роста обеспечил сегмент рекламы (Marketing Services). Попробуйте изменить данные за прошлый год, чтобы увидеть чувствительность результата."
            />
          </div>
        </section>
      </section>

      <HandbookDetails title="Подробнее: Регуляторный фактор в Китае">
        <p>
          При анализе китайских техгигантов (Tencent, Alibaba, Meituan) риск-фактор включает 
          регуляторную среду. Ограничения на игровое время для несовершеннолетних или антимонопольные 
          меры напрямую влияют на потоки CF_t, которые мы обсуждали на первом экране.
        </p>
        <p>
          Инвестиционное решение по Tencent требует совмещения количественного сегментного анализа 
          с качественной оценкой политических рисков.
        </p>
      </HandbookDetails>

      <KeyIdea title="Ключевой вывод">
        В цифровой экономике инвестиционный анализ превращается в анализ экосистем. Мы ценим 
        не активы, а потоки, генерируемые пользователями, и способность компании монетизировать 
        их внимание через разные сегменты.
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
