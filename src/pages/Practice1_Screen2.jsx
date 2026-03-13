import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AlertBox from '../components/AlertBox'
import CodeBlock from '../components/CodeBlock'
import ComparisonGrid from '../components/ComparisonGrid'
import ComparisonTable from '../components/ComparisonTable'
import CourseHeader from '../components/CourseHeader'
import IdeaCard from '../components/IdeaCard'
import KeyIdea from '../components/KeyIdea'
import MathBlock from '../components/MathBlock'
import MathText from '../components/MathText'
import PlotViewer from '../components/PlotViewer'

const contextNotes = [
  {
    title: 'Категории решения',
    text: 'Доходность отвечает на вопрос «сколько получим», риск - «насколько это устойчиво», ликвидность - «как быстро выйдем», горизонт - «когда нам нужны деньги».',
  },
  {
    title: 'Типичная ошибка',
    text: 'Если оценивать проекты только по доходности, можно выбрать вариант, который математически выгоден, но практически не подходит инвестору.',
  },
]

const projects = [
  { name: 'A', return: 0.18, risk: 0.09, liquidity: 7, horizon: 1 },
  { name: 'B', return: 0.25, risk: 0.21, liquidity: 45, horizon: 2 },
  { name: 'C', return: 0.31, risk: 0.34, liquidity: 180, horizon: 4 },
]

const compareCode = `import pandas as pd

projects = pd.DataFrame(
    {
        "project": ["A", "B", "C"],
        "expected_return": [0.18, 0.25, 0.31],
        "risk": [0.09, 0.21, 0.34],
        "liquidity_days": [7, 45, 180],
        "horizon_years": [1, 2, 4],
    }
)

projects["return_per_unit_of_risk"] = (
    projects["expected_return"] / projects["risk"]
).round(2)

print(projects)`

function RiskReturnPlot() {
  return (
    <svg viewBox="0 0 520 240" className="h-full w-full" role="img" aria-label="Риск и доходность проектов">
      <line x1="60" y1="190" x2="480" y2="190" stroke="#64748b" strokeWidth="2" />
      <line x1="60" y1="190" x2="60" y2="30" stroke="#64748b" strokeWidth="2" />
      <text x="485" y="195" fontSize="12" fill="#475569">
        risk
      </text>
      <text x="28" y="35" fontSize="12" fill="#475569">
        return
      </text>

      {projects.map((project) => {
        const x = 60 + project.risk * 1000
        const y = 190 - project.return * 400
        return (
          <g key={project.name}>
            <circle cx={x} cy={y} r="10" fill="#2563eb" opacity="0.85" />
            <text x={x} y={y - 16} textAnchor="middle" fontSize="12" fill="#0f172a">
              {project.name}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

function Practice1_Screen2({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 1 · Основы инвестиционного анализа"
        title="Базовые категории: доходность, риск, ликвидность, горизонт"
        subtitle="Разбираем, по каким координатам инвестор сравнивает альтернативы и почему одного показателя здесь принципиально недостаточно."
      />

      <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="content-block">
          <MathText
            as="p"
            text="Доходность, риск, ликвидность и горизонт образуют минимальную систему координат инвестиционного решения. Если аналитик опускает хотя бы одну из них, вывод становится односторонним. Например, проект с максимальной ожидаемой доходностью $R$ может оказаться неприемлемым по риску $\sigma$ или по сроку удержания $T$."
            className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
        </section>

        <IdeaCard title="Вопрос для обсуждения">
          <p>
            Что выберет финансовый директор: проект с доходностью 31% и горизонтом 4 года или
            проект с доходностью 18% и горизонтом 1 год?
          </p>
          <p className="mt-3">
            Ответ зависит от цели компании, цены капитала и ограничений по ликвидности. Значит,
            решение всегда контекстно.
          </p>
        </IdeaCard>
      </section>

      <ComparisonGrid
        left={{
          title: 'Если смотреть только на доходность',
          sections: [
            { label: 'Вывод', text: 'Лучшим кажется проект с наибольшим ожидаемым ростом стоимости.' },
            { label: 'Риск', text: 'Игнорируется вероятность неблагоприятного исхода и разброс результатов.' },
            { label: 'Практика', text: 'Такой подход может привести к переоценке агрессивных проектов.' },
          ],
          formula: String.raw`R = \frac{V_1 - V_0}{V_0}`,
        }}
        right={{
          title: 'Если учитывать систему категорий',
          sections: [
            { label: 'Вывод', text: 'Проект оценивается в многомерном пространстве ограничений и целей.' },
            { label: 'Риск', text: 'Высокая доходность сопоставляется с ценой неопределенности.' },
            { label: 'Практика', text: 'Решение становится ближе к реальным условиям бизнеса и инвестора.' },
          ],
          formula: String.raw`D = g\left(R,\; \sigma,\; L,\; T\right)`,
        }}
      />

      <ComparisonTable
        columns={projects.map((project) => project.name)}
        rows={[
          {
            label: 'Ожидаемая доходность',
            values: projects.map((project) => `${(project.return * 100).toFixed(0)}%`),
          },
          {
            label: 'Риск',
            values: projects.map((project) => `${(project.risk * 100).toFixed(0)}%`),
            highlight: true,
          },
          {
            label: 'Ликвидность, дней',
            values: projects.map((project) => project.liquidity),
          },
          {
            label: 'Горизонт, лет',
            values: projects.map((project) => project.horizon),
          },
        ]}
      />

      <PlotViewer
        title="Карта «риск-доходность»"
        caption="На плоскости видно, что более высокая доходность обычно достигается ценой роста риска. Эта визуализация хорошо работает в аудитории: студент сразу видит компромисс, а не просто читает о нем."
      >
        <RiskReturnPlot />
      </PlotViewer>

      <section className="grid gap-4 lg:grid-cols-2">
        <section className="content-block">
          <h3 className="section-title">Формализация категорий</h3>
          <MathText
            as="p"
            text="Даже на вводном уровне важно не потерять математическую строгость. Доходность можно записать как $R = \\frac{V_1 - V_0}{V_0}$, а риск - как разброс возможных результатов вокруг ожидаемого значения."
            className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
          <MathBlock formula={String.raw`\sigma^2 = \sum_{i=1}^{m} p_i \left(r_i - \mathbb{E}[R]\right)^2`} />
        </section>

        <AlertBox title="Методическое предупреждение">
          На этом этапе не нужно притворяться, будто студент уже умеет выбирать оптимальный
          проект по сложному критерию. Цель экрана другая: показать, что инвестиционное решение
          принципиально многокритериально и потому требует данных и вычислений.
        </AlertBox>
      </section>

      <section className="content-block">
        <h3 className="section-title">Python: читаем таблицу как аналитик</h3>
        <MathText
          as="p"
          text="Ниже код делает только один содержательный шаг: соединяет ключевые категории в одну таблицу и добавляет показатель $\\frac{R}{\\sigma}$ как грубую иллюстрацию компромисса между доходностью и риском."
          className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <div className="mt-4">
          <CodeBlock code={compareCode} title="Python: сравниваем проекты по четырем категориям" />
        </div>
      </section>

      <KeyIdea title="Ключевой вывод">
        Профессиональный инвестиционный анализ начинается там, где проект перестают описывать
        одним числом. Система категорий делает решение сопоставимым, а значит пригодным для
        аргументации и автоматизации.
      </KeyIdea>

      <nav className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/practice/1/screen/1"
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Назад
        </Link>
        <Link
          to="/practice/1/screen/3"
          className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Далее: 3. Цифровая экономика
        </Link>
      </nav>
    </article>
  )
}

export default Practice1_Screen2
