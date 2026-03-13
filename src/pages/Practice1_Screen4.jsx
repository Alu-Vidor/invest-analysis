import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import CodeBlock from '../components/CodeBlock'
import CourseHeader from '../components/CourseHeader'
import IdeaCard from '../components/IdeaCard'
import KeyIdea from '../components/KeyIdea'

const contextNotes = [
  {
    title: 'Почему именно Python',
    text: 'Python объединяет обработку данных, статистику, визуализацию и автоматизацию. Это особенно важно для инвестиционного анализа, где единый вычислительный контур уменьшает число ручных ошибок.',
  },
  {
    title: 'Воспроизводимость',
    text: 'Хороший аналитический результат должен быть повторяемым: коллега или преподаватель должны иметь возможность получить тот же вывод на тех же данных и с теми же параметрами.',
  },
]

const stackItems = [
  'pandas для табличных данных и первичной подготовки;',
  'numpy для численных операций и векторных вычислений;',
  'matplotlib для базовой визуализации и проверки гипотез;',
  'Jupyter или обычный `.py`-скрипт для воспроизводимого рабочего процесса.',
]

const toolkitCode = `import pandas as pd
import numpy as np

prices = pd.Series([100, 104, 103, 108], name="price")
returns = prices.pct_change().dropna()

summary = {
    "mean_return": returns.mean(),
    "std_return": returns.std(ddof=1),
    "observations": returns.shape[0],
}

print(returns.round(4))
print(summary)`

function Practice1_Screen4({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 1 · Python и рабочая среда"
        title="Python как инструмент инвестиционного аналитика"
        subtitle="Рассматриваем Python не как «язык для программистов», а как профессиональную среду, в которой аналитик работает с данными, моделями и отчетами."
      />

      <section className="content-block">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
          Для современного инвестиционного аналитика Python важен по двум причинам. Во-первых, он
          позволяет быстро перейти от сырой таблицы к вычислимым метрикам и проверяемым выводам.
          Во-вторых, он делает анализ воспроизводимым: вместо цепочки ручных действий в разных
          программах мы получаем единый сценарий обработки данных, который можно повторить,
          проверить и доработать.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Базовый стек практики
          </h3>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            {stackItems.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <IdeaCard title="На что стоит обратить внимание с первого занятия">
          <p>
            Код в инвестиционном анализе нужен не ради самого кода. Его задача состоит в том,
            чтобы сделать вычисления прозрачными, масштабируемыми и воспроизводимыми.
          </p>
          <p className="mt-3">
            Если формула посчитана вручную один раз, это учебный пример. Если расчет оформлен в
            виде кода, его уже можно встроить в реальный рабочий процесс.
          </p>
        </IdeaCard>
      </section>

      <section className="content-block">
        <h3 className="section-title">Минимальный рабочий пример</h3>
        <p className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200">
          Даже несколько строк кода показывают, как Python объединяет вычисления и интерпретацию.
          Мы задаем ряд цен, переходим к доходностям и сразу получаем агрегированные показатели,
          которые могут лечь в основу инвестиционного комментария.
        </p>
        <div className="mt-4">
          <CodeBlock code={toolkitCode} title="Python: от цен к первичным метрикам" />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <IdeaCard title="Типовой учебный workflow">
          <p>1. Загружаем данные.</p>
          <p>2. Проверяем структуру и типы переменных.</p>
          <p>3. Строим первичные показатели.</p>
          <p>4. Формулируем экономическую интерпретацию результата.</p>
        </IdeaCard>

        <IdeaCard title="Связь с будущей профессией">
          <p>
            Такой подход используется в банках, управляющих компаниях, финтехе, консалтинге и
            корпоративных финансах. Чем раньше студент привыкает мыслить в терминах
            воспроизводимого анализа, тем легче ему переходить от учебных кейсов к реальным
            задачам.
          </p>
        </IdeaCard>
      </section>

      <KeyIdea title="Методический смысл экрана">
        Python не добавляется к занятию как внешний технический модуль. Он становится частью самой
        логики инвестиционного анализа: помогает описать данные, вычислить показатели и оформить
        аргументированный вывод на одной платформе.
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
