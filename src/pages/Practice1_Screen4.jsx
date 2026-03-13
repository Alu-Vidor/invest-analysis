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
import TaskBlock from '../components/TaskBlock'

const contextNotes = [
  {
    title: 'Зачем Python аналитику',
    text: 'Python объединяет данные, вычисления и интерпретацию. Это делает анализ воспроизводимым и уменьшает зависимость от ручных операций.',
  },
  {
    title: 'Что важно педагогически',
    text: 'Студенту нужно показывать не абстрактный стек библиотек, а конкретные рабочие шаги: загрузили данные, проверили, посчитали, объяснили результат.',
  },
]

const prices = [100, 104, 103, 108, 111]

const pricesCode = `import pandas as pd

prices = pd.Series(
    [100, 104, 103, 108, 111],
    index=pd.to_datetime(["2026-03-01", "2026-03-02", "2026-03-03", "2026-03-04", "2026-03-05"]),
    name="price",
)

print(prices)`

const returnsCode = `returns = prices.pct_change().dropna()

print(returns.round(4))
print()
print("Средняя доходность:", round(returns.mean(), 4))
print("Стандартное отклонение:", round(returns.std(ddof=1), 4))`

const inspectCode = `summary = pd.DataFrame(
    {
        "price": prices,
        "return": prices.pct_change(),
    }
)

print(summary)
print()
print(summary.describe().round(4))`

function PriceLinePlot() {
  const max = Math.max(...prices)
  const min = Math.min(...prices)
  const points = prices
    .map((price, index) => {
      const x = 60 + index * 100
      const y = 170 - ((price - min) / (max - min || 1)) * 90
      return `${x},${y}`
    })
    .join(' ')

  return (
    <svg viewBox="0 0 520 220" className="h-full w-full" role="img" aria-label="Динамика цены актива">
      <line x1="40" y1="180" x2="490" y2="180" stroke="#64748b" strokeWidth="2" />
      <polyline points={points} fill="none" stroke="#2563eb" strokeWidth="3" />
      {prices.map((price, index) => {
        const x = 60 + index * 100
        const y = 170 - ((price - min) / (max - min || 1)) * 90
        return (
          <g key={price + index}>
            <circle cx={x} cy={y} r="5" fill="#2563eb" />
            <text x={x} y={200} textAnchor="middle" fontSize="12" fill="#334155">
              D{index + 1}
            </text>
            <text x={x} y={y - 10} textAnchor="middle" fontSize="12" fill="#0f172a">
              {price}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

function Practice1_Screen4({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 1 · Python и рабочая среда"
        title="Python как инструмент инвестиционного аналитика"
        subtitle="Показываем Python как рабочую среду принятия решений: от первичного ряда цен к понятным метрикам и интерпретации."
      />

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="content-block">
          <MathText
            as="p"
            text="В учебной и профессиональной практике Python ценен не сам по себе, а как среда, в которой данные, формулы и выводы находятся в одном контуре. Если аналитик вычисляет доходности $r_t$, оценивает среднее и риск, а затем формулирует рекомендацию в том же сценарии, анализ становится воспроизводимым."
            className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
        </section>

        <IdeaCard title="Что делаем на экране">
          <p>
            Не перечисляем библиотеки ради библиотек, а идем по рабочему циклу аналитика:
            загрузить ряд, получить доходности, проверить сводку и объяснить результат.
          </p>
        </IdeaCard>
      </section>

      <TaskBlock
        title="Рабочий цикл аналитика в Python"
        items={[
          {
            title: 'Шаг 1. Получить данные в явном виде',
            content: 'Ряд цен или потоков должен быть загружен так, чтобы каждая дата и каждое значение были доступны для проверки.',
          },
          {
            title: 'Шаг 2. Построить производные показатели',
            content: 'Из цен получить доходности, из потоков - агрегаты, из таблиц - нужные признаки.',
          },
          {
            title: 'Шаг 3. Сверить вычисление с экономическим смыслом',
            content: 'Число само по себе ничего не гарантирует. Нужно понять, что именно оно означает для решения.',
          },
        ]}
      />

      <section className="grid gap-4 lg:grid-cols-2">
        <section className="content-block">
          <h3 className="section-title">Шаг 1. Загружаем ряд цен</h3>
          <MathText
            as="p"
            text="Начинаем с малого и прозрачного примера. Это лучше, чем сразу давать «готовый пайплайн»: студент видит, как формируется объект анализа."
            className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
          <div className="mt-4">
            <CodeBlock code={pricesCode} title="Python: создаем ряд цен" />
          </div>
        </section>

        <PlotViewer
          title="Ряд цен"
          caption="Даже простая визуализация полезна: аналитик сначала смотрит на данные глазами, а уже потом переходит к вычислениям."
        >
          <PriceLinePlot />
        </PlotViewer>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <section className="content-block">
          <h3 className="section-title">Шаг 2. Переходим к доходностям</h3>
          <MathText
            as="p"
            text="Доходность между соседними наблюдениями удобно считать по формуле $r_t = \\frac{P_t - P_{t-1}}{P_{t-1}}$. Именно так ряд цен переводится в ряд относительных изменений."
            className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
          <div className="mt-4">
            <CodeBlock code={returnsCode} title="Python: считаем доходности и риск" />
          </div>
        </section>

        <ComparisonTable
          columns={['D2', 'D3', 'D4', 'D5']}
          rows={[
            {
              label: 'Доходность',
              values: ['4.00%', '-0.96%', '4.85%', '2.78%'],
              highlight: true,
            },
            {
              label: 'Комментарий',
              values: ['рост', 'коррекция', 'ускорение', 'умеренный рост'],
            },
          ]}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <section className="content-block">
          <h3 className="section-title">Шаг 3. Проверяем сводку</h3>
          <MathText
            as="p"
            text="После вычислений важно посмотреть на объединенную таблицу и сводную статистику. Этот шаг кажется техническим, но именно он часто спасает от неверной интерпретации."
            className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
          <div className="mt-4">
            <CodeBlock code={inspectCode} title="Python: собираем сводную таблицу" />
          </div>
        </section>

        <AlertBox title="Почему не стоит перескакивать через проверку">
          Студенты часто хотят сразу получить финальное число. Но пропуск промежуточного контроля
          приводит к тому, что ошибка в данных превращается в уверенный и красиво оформленный
          неверный вывод.
        </AlertBox>
      </section>

      <KeyIdea title="Методический итог">
        Python встроен в логику занятия тогда, когда каждый фрагмент кода соответствует отдельному
        шагу аналитического мышления: увидели данные, преобразовали их, проверили, интерпретировали.
      </KeyIdea>

      <nav className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/practice/1/screen/3"
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Назад
        </Link>
        <Link
          to="/practice/1/screen/5"
          className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Далее: 5. Мини-анализ в Python
        </Link>
      </nav>
    </article>
  )
}

export default Practice1_Screen4
