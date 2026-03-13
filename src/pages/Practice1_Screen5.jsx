import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import CodeBlock from '../components/CodeBlock'
import CourseHeader from '../components/CourseHeader'
import IdeaCard from '../components/IdeaCard'
import KeyIdea from '../components/KeyIdea'
import MathBlock from '../components/MathBlock'

const contextNotes = [
  {
    title: 'Логика мини-анализа',
    text: 'На этом экране мы соединяем предыдущие темы: формализуем объект, рассчитываем доходность, учитываем риск и интерпретируем результат в контексте инвестиционного горизонта.',
  },
  {
    title: 'Главная привычка аналитика',
    text: 'Ценность Python не в том, что он быстро считает. Важно, что код сохраняет последовательность рассуждения: от данных к метрике, от метрики к выводу.',
  },
]

const miniAnalysisCode = `import pandas as pd

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

short_horizon = projects.query("horizon_years <= 2").copy()
recommended = short_horizon.sort_values(
    by=["expected_return", "risk_score"],
    ascending=[False, True],
).iloc[0]

print(projects[["project", "expected_return", "risk_score", "liquidity_days", "horizon_years"]])
print()
print("Рекомендация для горизонта до 2 лет:")
print(recommended[["project", "expected_return", "risk_score"]])`

const interpretationPoints = [
  'сначала проверяем, какие проекты вообще допустимы по инвестиционному горизонту;',
  'затем сравниваем ожидаемую доходность внутри допустимого множества;',
  'после этого смотрим, не покупается ли высокая доходность чрезмерным риском;',
  'только в конце формулируем рекомендацию в языке управленческого решения.',
]

function Practice1_Screen5({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 1 · Python и рабочая среда"
        title="Первый мини-анализ данных в Python"
        subtitle="Проводим компактный инвестиционный разбор: от таблицы проектов к обоснованной рекомендации на языке данных."
      />

      <section className="content-block">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
          Завершающий экран практики нужен для того, чтобы собрать все предыдущие элементы в
          единую процедуру. Мы берем простую таблицу проектов, рассчитываем ожидаемую доходность,
          фильтруем варианты по горизонту и делаем вывод не интуитивно, а на основе заданных
          критериев. Это и есть базовая модель аналитического поведения.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <section className="content-block">
          <h3 className="section-title">Какая метрика используется</h3>
          <p className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200">
            Для первого приближения достаточно ожидаемой однопериодной доходности:
          </p>
          <MathBlock formula={String.raw`R_i = \frac{P_{1,i} - P_{0,i}}{P_{0,i}}`} />
          <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
            Но сама по себе эта формула не завершает анализ. Она лишь создает числовую основу,
            после которой необходимо учесть риск, ликвидность и соответствие проекта целям
            инвестора.
          </p>
        </section>

        <IdeaCard title="Мини-кейс">
          <p>
            Предположим, инвестор не готов замораживать капитал более чем на два года. Тогда
            проект с самой высокой номинальной доходностью может быть автоматически исключен из
            рассмотрения, если его горизонт слишком длинный.
          </p>
        </IdeaCard>
      </section>

      <section className="content-block">
        <h3 className="section-title">Код анализа</h3>
        <p className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200">
          Ниже показан минимальный, но уже профессионально осмысленный пайплайн: данные
          структурируются в `DataFrame`, затем рассчитывается доходность, применяется фильтр по
          горизонту, и только потом строится рекомендация.
        </p>
        <div className="mt-4">
          <CodeBlock code={miniAnalysisCode} title="Python: первый инвестиционный мини-анализ" />
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Как интерпретировать результат
          </h3>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            {interpretationPoints.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-300" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        <IdeaCard title="Формулировка вывода для отчета">
          <p>
            Корректный вывод звучит не как «проект B лучший», а как «при горизонте инвестирования
            до 2 лет проект B обеспечивает наибольшую ожидаемую доходность среди допустимых
            альтернатив при умеренном уровне риска».
          </p>
          <p className="mt-3">
            Такой язык важен для реальной практики: рекомендация должна быть привязана к данным,
            условиям и ограничениям, а не к абстрактной оценке.
          </p>
        </IdeaCard>
      </section>

      <KeyIdea title="Итог практики 1">
        Мы прошли полный вводный цикл: задали объект инвестиционного анализа, выделили ключевые
        категории сравнения, связали их с цифровой средой и реализовали первичный анализ на
        Python. Именно так формируется профессиональная привычка принимать решения на основе
        данных, а не на основе впечатлений.
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
