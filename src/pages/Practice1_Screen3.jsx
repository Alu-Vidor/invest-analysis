import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AlertBox from '../components/AlertBox'
import CodeBlock from '../components/CodeBlock'
import ComparisonTable from '../components/ComparisonTable'
import CourseHeader from '../components/CourseHeader'
import IdeaCard from '../components/IdeaCard'
import KeyIdea from '../components/KeyIdea'
import MathText from '../components/MathText'
import PlotViewer from '../components/PlotViewer'

const contextNotes = [
  {
    title: 'Цифровая экономика',
    text: 'Это среда, в которой существенная часть стоимости создается через цифровые платформы, сервисы, данные и сетевые эффекты.',
  },
  {
    title: 'Сегментная отчетность',
    text: 'Публичные компании нередко раскрывают выручку по направлениям бизнеса. Для аналитика это важный источник понимания структуры роста.',
  },
]

const appleServices = [
  { quarter: 'Q1 FY24', total: 119.58, services: 23.12 },
  { quarter: 'Q2 FY24', total: 90.75, services: 23.87 },
  { quarter: 'Q3 FY24', total: 85.78, services: 24.21 },
  { quarter: 'Q4 FY24', total: 94.93, services: 24.97 },
]

const servicesCode = `import pandas as pd

apple_segments = pd.DataFrame(
    {
        "quarter": ["Q1 FY24", "Q2 FY24", "Q3 FY24", "Q4 FY24"],
        "total_revenue_billion_usd": [119.58, 90.75, 85.78, 94.93],
        "services_revenue_billion_usd": [23.12, 23.87, 24.21, 24.97],
    }
)

apple_segments["services_share"] = (
    apple_segments["services_revenue_billion_usd"] / apple_segments["total_revenue_billion_usd"]
).round(3)

print(apple_segments)`

function ServicesShareChart() {
  return (
    <svg viewBox="0 0 520 240" className="h-full w-full" role="img" aria-label="Доля сервисной выручки Apple в 2024 финансовом году">
      <line x1="50" y1="190" x2="490" y2="190" stroke="#64748b" strokeWidth="2" />
      {appleServices.map((item, index) => {
        const share = item.services / item.total
        const x = 70 + index * 105
        const totalHeight = (item.total / 120) * 130
        const servicesHeight = share * totalHeight
        const y = 190 - totalHeight
        const servicesY = 190 - servicesHeight

        return (
          <g key={item.quarter}>
            <rect x={x} y={y} width="50" height={totalHeight} rx="12" fill="#cbd5e1" />
            <rect x={x} y={servicesY} width="50" height={servicesHeight} rx="12" fill="#2563eb" />
            <text x={x + 25} y="208" textAnchor="middle" fontSize="12" fill="#334155">
              {item.quarter.replace(' FY24', '')}
            </text>
            <text x={x + 25} y={servicesY - 8} textAnchor="middle" fontSize="12" fill="#0f172a">
              {(share * 100).toFixed(1)}%
            </text>
          </g>
        )
      })}
      <text x="370" y="34" fontSize="12" fill="#2563eb">
        services
      </text>
      <text x="370" y="52" fontSize="12" fill="#64748b">
        total revenue
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
        text: 'Цифровая экономика меняет структуру бизнеса и делает данные о сегментах, сервисах и платформах важной частью инвестиционного анализа.',
      })
    }
  }, [setContext, setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 1 · Основы инвестиционного анализа"
        title="Инвестиционный анализ в цифровой экономике"
        subtitle="Показываем, как цифровые сегменты бизнеса становятся самостоятельным объектом оценки и почему структура выручки важна не меньше ее общего объема."
      />

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="content-block">
          <MathText
            as="p"
            text="В цифровой экономике стоимость компании все чаще создается не только физическими активами, но и платформами, сервисами, данными и экосистемными эффектами. Поэтому инвестиционный анализ должен учитывать не только общий объем выручки, но и ее внутреннюю структуру."
            className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
        </section>

        <IdeaCard title="Что такое сервисная выручка">
          <p>
            Это выручка, которую компания получает не от продажи устройства как товара, а от
            цифровых сервисов: подписок, облачных услуг, платформенных комиссий и контента.
          </p>
        </IdeaCard>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">Цифровой сегмент</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            Часть бизнеса, основанная на цифровых сервисах, программных продуктах, платформенной
            инфраструктуре или данных пользователей.
          </p>
        </article>
        <article className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">Сегментный анализ</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            Анализ компании через отдельные направления ее бизнеса. Он позволяет понять, какие
            компоненты формируют устойчивость роста и где сосредоточена ценность.
          </p>
        </article>
      </section>

      <section className="content-block">
        <h3 className="section-title">Реальный пример: Apple, 2024 финансовый год</h3>
        <MathText
          as="p"
          text="Apple публично раскрывает выручку сегмента Services. Для инвестиционного анализа это важно: цифровые сервисы имеют отличную структуру маржинальности и устойчивости по сравнению с продажей устройств."
          className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
      </section>

      <ComparisonTable
        columns={appleServices.map((item) => item.quarter)}
        rows={[
          {
            label: 'Общая выручка, млрд USD',
            values: appleServices.map((item) => item.total.toFixed(2)),
          },
          {
            label: 'Выручка Services, млрд USD',
            values: appleServices.map((item) => item.services.toFixed(2)),
            highlight: true,
          },
          {
            label: 'Доля Services',
            values: appleServices.map((item) => `${((item.services / item.total) * 100).toFixed(1)}%`),
          },
        ]}
      />

      <PlotViewer
        title="Доля Services в квартальной выручке Apple"
        caption="На графике видно, что цифровой сегмент Services стабильно занимает значимую долю выручки компании. Для аналитика это сигнал, что структура бизнеса и качество источников дохода не менее важны, чем общий масштаб продаж."
      >
        <ServicesShareChart />
      </PlotViewer>

      <section className="grid gap-4 lg:grid-cols-2">
        <section className="content-block">
          <h3 className="section-title">Python: считаем долю цифрового сегмента</h3>
          <div className="mt-4">
            <CodeBlock code={servicesCode} title="Python: анализ сегментной выручки" />
          </div>
        </section>

        <AlertBox title="Что дает такой анализ">
          Общая выручка говорит о масштабе бизнеса, но сегментная структура показывает качество и
          устойчивость роста. Для цифровой экономики это особенно важно, потому что платформенные и
          сервисные доходы могут вести себя иначе, чем продажи физических товаров.
        </AlertBox>
      </section>

      <KeyIdea title="Ключевой вывод">
        В цифровой экономике аналитик оценивает не только размер бизнеса, но и архитектуру его
        доходов. Сегментная структура становится важной частью инвестиционного вывода.
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
