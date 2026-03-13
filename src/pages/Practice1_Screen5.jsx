import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AlertBox from '../components/AlertBox'
import CodeBlock from '../components/CodeBlock'
import ComparisonTable from '../components/ComparisonTable'
import CourseHeader from '../components/CourseHeader'
import DatasetCard from '../components/DatasetCard'
import IdeaCard from '../components/IdeaCard'
import KeyIdea from '../components/KeyIdea'
import MathBlock from '../components/MathBlock'
import MathText from '../components/MathText'
import PlotViewer from '../components/PlotViewer'
import TaskBlock from '../components/TaskBlock'

const contextNotes = [
  {
    title: 'Финальная цель',
    text: 'На этом экране студент должен увидеть полный, но компактный цикл: данные, формула, код, таблица сравнения и вывод для принятия решения.',
  },
  {
    title: 'Что важно в выводе',
    text: 'Рекомендация должна быть условной: не «проект лучший вообще», а «лучший при данном горизонте, риске и ограничениях инвестора».',
  },
]

const integratedCode = `import pandas as pd

projects = pd.DataFrame(
    {
        "project": ["A", "B", "C"],
        "purchase_price": [100, 100, 100],
        "expected_price_next_year": [112, 118, 126],
        "risk_score": [2.4, 5.3, 8.1],
        "liquidity_days": [3, 20, 120],
        "horizon_years": [1, 2, 4],
    }
)

projects["expected_return"] = (
    projects["expected_price_next_year"] - projects["purchase_price"]
) / projects["purchase_price"]

candidate_set = projects.query("horizon_years <= 2").copy()
candidate_set["score"] = candidate_set["expected_return"] / candidate_set["risk_score"]

recommended = candidate_set.sort_values("score", ascending=False).iloc[0]

print(candidate_set[["project", "expected_return", "risk_score", "score"]].round(4))
print()
print("Рекомендуемый проект:", recommended["project"])`

const interpretationRows = [
  { name: 'A', return: 0.12, risk: 2.4, horizon: 1, score: 0.05 },
  { name: 'B', return: 0.18, risk: 5.3, horizon: 2, score: 0.034 },
  { name: 'C', return: 0.26, risk: 8.1, horizon: 4, score: 0.032 },
]

function ScorePlot() {
  const bars = [
    { label: 'A', value: 0.05 },
    { label: 'B', value: 0.034 },
  ]
  const max = Math.max(...bars.map((bar) => bar.value))

  return (
    <svg viewBox="0 0 520 220" className="h-full w-full" role="img" aria-label="Сравнение проектов после фильтрации">
      <line x1="50" y1="180" x2="470" y2="180" stroke="#64748b" strokeWidth="2" />
      {bars.map((bar, index) => {
        const x = 120 + index * 160
        const height = (bar.value / max) * 95
        const y = 180 - height
        return (
          <g key={bar.label}>
            <rect x={x} y={y} width="80" height={height} rx="14" fill={index === 0 ? '#059669' : '#2563eb'} />
            <text x={x + 40} y="200" textAnchor="middle" fontSize="12" fill="#334155">
              {bar.label}
            </text>
            <text x={x + 40} y={y - 10} textAnchor="middle" fontSize="12" fill="#0f172a">
              {bar.value.toFixed(3)}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

function Practice1_Screen5({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 1 · Python и рабочая среда"
        title="Первый мини-анализ данных в Python"
        subtitle="Собираем все элементы вместе: данные, ограничения, формулу доходности, код сравнения и итоговую рекомендацию."
      />

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="content-block">
          <MathText
            as="p"
            text="Финальный экран должен показать студенту, что инвестиционный анализ - это последовательность решений. Сначала задается множество допустимых альтернатив, затем рассчитывается доходность $R_i = \\frac{P_{1,i} - P_{0,i}}{P_{0,i}}$, потом вводятся ограничения по горизонту и риску, и только после этого формулируется рекомендация."
            className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
          <MathBlock formula={String.raw`R_i = \frac{P_{1,i} - P_{0,i}}{P_{0,i}}`} />
        </section>

        <IdeaCard title="Учебная интрига">
          <p>
            Самая высокая ожидаемая доходность не гарантирует победу в сравнении, если проект не
            проходит по горизонту инвестирования.
          </p>
        </IdeaCard>
      </section>

      <DatasetCard
        title="Набор альтернатив"
        text="Здесь уже не один проект, а портфель кандидатов. Это приближает пример к реальной задаче финансового аналитика, который почти всегда сравнивает несколько вариантов одновременно."
        code={integratedCode}
        codeTitle="Python: фильтруем проекты и строим рекомендацию"
      />

      <ComparisonTable
        columns={interpretationRows.map((row) => row.name)}
        rows={[
          {
            label: 'Ожидаемая доходность',
            values: interpretationRows.map((row) => `${(row.return * 100).toFixed(0)}%`),
          },
          {
            label: 'Риск',
            values: interpretationRows.map((row) => row.risk),
          },
          {
            label: 'Горизонт, лет',
            values: interpretationRows.map((row) => row.horizon),
            highlight: true,
          },
          {
            label: 'Условный score',
            values: interpretationRows.map((row) => row.score.toFixed(3)),
          },
        ]}
      />

      <TaskBlock
        title="Логика мини-анализа"
        items={[
          {
            title: 'Ограничиваем множество решений',
            content: 'Сначала исключаем проекты, не подходящие по горизонту инвестирования.',
          },
          {
            title: 'Сравниваем допустимые альтернативы',
            content: 'Внутри допустимого множества сопоставляем доходность и риск, а не просто ищем максимум по одной колонке.',
          },
          {
            title: 'Формулируем управленческий вывод',
            content: 'Рекомендация должна быть объяснима на языке бизнеса и привязана к условиям задачи.',
          },
        ]}
      />

      <PlotViewer
        title="После фильтра по горизонту"
        caption="На графике остаются только допустимые проекты A и B. Это полезный методический момент: студенты видят, что сначала работает ограничение, а уже потом критерий сравнения."
      >
        <ScorePlot />
      </PlotViewer>

      <section className="grid gap-4 lg:grid-cols-2">
        <section className="content-block">
          <h3 className="section-title">Как озвучить вывод корректно</h3>
          <MathText
            as="p"
            text="Грамотная рекомендация формулируется условно: «при ограничении $T \\leq 2$ года проект A оказывается предпочтительным по отношению доходности к риску». Такой язык важен и в академической, и в профессиональной среде."
            className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
        </section>

        <AlertBox title="Чего не стоит говорить">
          Нельзя писать «проект A лучший вообще». Это снимает с анализа контекст и создает ложное
          впечатление универсальности решения. Инвестиционный вывод всегда зависит от условий.
        </AlertBox>
      </section>

      <KeyIdea title="Итог практики 1">
        На практике студент должен унести не только набор терминов, но и рабочую схему мышления:
        перевести задачу в данные, рассчитать показатели, учесть ограничения, визуализировать
        сравнение и сформулировать вывод на языке принятия решений.
      </KeyIdea>

      <nav className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/practice/1/screen/4"
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Назад
        </Link>
        <Link
          to="/practice/2/screen/1"
          className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          К практике 2
        </Link>
      </nav>
    </article>
  )
}

export default Practice1_Screen5
