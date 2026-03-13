import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import CodeBlock from '../components/CodeBlock'
import CourseHeader from '../components/CourseHeader'
import IdeaCard from '../components/IdeaCard'
import KeyIdea from '../components/KeyIdea'
import MathBlock from '../components/MathBlock'

const contextNotes = [
  {
    title: 'Доходность и риск',
    text: 'Высокая ожидаемая доходность почти никогда не существует сама по себе: обычно она сопровождается большей неопределенностью результатов.',
  },
  {
    title: 'Ликвидность и горизонт',
    text: 'Даже хороший по доходности объект может быть неудобен для инвестора, если его трудно быстро продать или срок вложения не совпадает с финансовыми целями.',
  },
]

const categoryCards = [
  {
    title: 'Доходность',
    text: 'Показывает, насколько результат инвестиции превышает исходное вложение. Для аналитика это не только факт роста, но и характеристика эффективности использования капитала.',
  },
  {
    title: 'Риск',
    text: 'Отражает изменчивость возможных исходов. Важна не только средняя ожидаемая выгода, но и диапазон отклонений от нее, включая неблагоприятные сценарии.',
  },
  {
    title: 'Ликвидность',
    text: 'Характеризует скорость и издержки преобразования актива в деньги без существенной потери стоимости. Для практики финансового управления это критично.',
  },
  {
    title: 'Горизонт',
    text: 'Определяет временной интервал, в течение которого инвестор готов удерживать позицию и ждать результата. Горизонт влияет на допустимый риск и выбор метрик.',
  },
]

const compareCode = `import pandas as pd

projects = pd.DataFrame(
    {
        "project": ["A", "B", "C"],
        "initial_investment": [1000000, 1000000, 1000000],
        "expected_payoff": [1180000, 1250000, 1320000],
        "risk_score": [2.1, 4.8, 7.2],
        "liquidity_days": [5, 30, 180],
        "horizon_years": [1, 2, 4],
    }
)

projects["expected_return"] = (
    projects["expected_payoff"] - projects["initial_investment"]
) / projects["initial_investment"]

print(projects[["project", "expected_return", "risk_score", "liquidity_days", "horizon_years"]])`

function Practice1_Screen2({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 1 · Основы инвестиционного анализа"
        title="Базовые категории: доходность, риск, ликвидность, горизонт"
        subtitle="Разбираем четыре координаты, без которых нельзя корректно сравнивать инвестиционные альтернативы."
      />

      <section className="content-block">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
          После формализации инвестиционного решения возникает следующий вопрос: по каким
          измерениям сравнивать альтернативы? В реальной профессиональной работе аналитик почти
          никогда не принимает решение только по одному критерию. Нужно одновременно учитывать
          потенциальную выгоду, степень неопределенности, возможность быстро выйти из позиции и
          временной профиль проекта.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {categoryCards.map((card) => (
          <article
            key={card.title}
            className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900"
          >
            <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
              {card.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              {card.text}
            </p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <section className="content-block">
          <h3 className="section-title">Две базовые формулы</h3>
          <p className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200">
            На начальном уровне удобно зафиксировать две математические идеи. Первая описывает
            доходность как относительное изменение стоимости, вторая показывает риск как разброс
            возможных результатов вокруг ожидаемого значения.
          </p>
          <MathBlock formula={String.raw`R = \frac{V_1 - V_0}{V_0}`} />
          <MathBlock formula={String.raw`\sigma^2 = \sum_{i=1}^{m} p_i\left(r_i - \mathbb{E}[R]\right)^2`} />
        </section>

        <IdeaCard title="Почему нельзя оптимизировать только доходность">
          <p>
            Проект с наибольшей ожидаемой доходностью может оказаться неподходящим для компании,
            если деньги потребуются раньше срока или если вероятность кассового разрыва слишком
            высока.
          </p>
          <p className="mt-3">
            Поэтому инвестиционный анализ всегда связан с компромиссами, а не с поиском одного
            «абсолютно лучшего» числа.
          </p>
        </IdeaCard>
      </section>

      <section className="content-block">
        <h3 className="section-title">Как это выглядит в данных</h3>
        <p className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200">
          В практике аналитика категории должны быть сведены в одну таблицу сравнения. Тогда
          решение становится прозрачным: мы видим не только ожидаемую отдачу, но и то, какой риск
          и какой временной профиль сопровождают эту отдачу.
        </p>
        <div className="mt-4">
          <CodeBlock code={compareCode} title="Python: сравниваем проекты по ключевым категориям" />
        </div>
      </section>

      <KeyIdea title="Профессиональный акцент">
        Сильный инвестиционный аналитик мыслит не отдельными показателями, а системой взаимосвязей
        между ними. Именно эта способность отличает расчетчика от специалиста, который умеет
        принимать и аргументировать решения в финансовой среде.
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
