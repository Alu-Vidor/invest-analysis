import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import CourseHeader from '../components/CourseHeader'
import DistributionSketch from '../components/DistributionSketch'
import KeyIdea from '../components/KeyIdea'
import MathBlock from '../components/MathBlock'
import SortVisualization from '../components/SortVisualization'

const contextNotes = [
  {
    title: 'Классический пример из жизни',
    text: 'Представьте бар, в котором сидят 10 человек со средней зарплатой 50 000 рублей. Вдруг в бар заходит Илон Маск. Средняя зарплата в баре мгновенно становится равна миллионам долларов (среднее сломалось). Но медианная зарплата посетителей почти не изменится. Именно поэтому в новостях и экономике всегда правильнее смотреть на медианную, а не на среднюю зарплату по региону.',
  },
]

const sortedScores = [65, 70, 72, 75, 78, 80, 82, 85, 88, 1000]

const decisionCards = [
  {
    title: 'Среднее лучше',
    text: 'Если распределение близко к симметричному, нет тяжелых хвостов и выбросы отсутствуют или объяснимы.',
  },
  {
    title: 'Медиана лучше',
    text: 'Если данные скошены, содержат редкие экстремальные значения или описывают типичного представителя группы.',
  },
  {
    title: 'Лучший академический ход',
    text: 'Почти всегда полезно сообщать обе оценки: среднее как баланс значений и медиану как робастный центр.',
  },
]

function Practice1_Screen4({ setContextNotes }) {
  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setContextNotes(contextNotes)
    }, 0)

    return () => {
      window.clearTimeout(timerId)
    }
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 1 -> БАЗОВЫЕ ПОНЯТИЯ"
        title="Робастность: медиана спасает ситуацию"
        subtitle="Как игнорировать шум и находить реальную середину."
      />

      <section className="content-block space-y-6">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
          На прошлом шаге мы увидели, что среднее арифметическое учитывает <em>значение</em>{' '}
          каждого элемента. Из-за этого число 1000 перетянуло весь результат на себя. Чтобы спасти
          аналитику, нам нужна метрика, которая смотрит не на значения, а на <strong>порядок</strong>{' '}
          (ранги).
        </p>

        <div className="space-y-4">
          <h3 className="section-title">Считаем медиану (Median)</h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Медиана - это просто число, которое делит отсортированный набор данных ровно пополам.
            Алгоритм прост: сортируем по возрастанию и берем элемент прямо по центру.
          </p>

          <MathBlock formula={String.raw`Me = \begin{cases} x_{(\frac{n+1}{2})}, & n \text{ нечетно} \\[4pt] \frac{x_{(n/2)} + x_{(n/2+1)}}{2}, & n \text{ четно} \end{cases}`} />

          <SortVisualization
            values={sortedScores}
            highlighted={[4, 5]}
            caption="Так как элементов 10 (четное число), берем два центральных"
          />

          <MathBlock formula={String.raw`Me = \frac{x_{(5)} + x_{(6)}}{2} = \frac{78 + 80}{2} = 79`} />

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            <strong>Результат: 79 баллов.</strong> Эта оценка прекрасно описывает реальную
            успеваемость группы. Обратите внимание: медиане абсолютно все равно, написано ли в
            конце <code className="rounded bg-slate-200 px-1.5 py-0.5 text-sm dark:bg-slate-700">100</code>{' '}
            или <code className="rounded bg-slate-200 px-1.5 py-0.5 text-sm dark:bg-slate-700">1000000</code>.
            Она игнорирует экстремальные значения, фокусируясь только на центре.
          </p>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Важно, что медиана использует <strong>порядковые статистики</strong>
            : нам важны пятое и шестое места в отсортированном ряду, а не точная величина самого
            большого элемента. Пока выброс остается справа от центра, на медиану он не влияет.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="section-title">Визуализация: График</h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Схематично разницу между этими метриками для правосторонне-скошенного распределения
            можно представить так:
          </p>
          <DistributionSketch />
        </div>

        <KeyIdea title="Что такое робастность?">
          В статистике <strong>робастность (устойчивость)</strong> - это способность метода
          выдавать адекватный результат даже тогда, когда часть данных содержит сильный шум или
          выбросы.
          <br />
          <br />
          Среднее арифметическое - <strong>не робастно</strong> (чувствительно к аномалиям).
          <br />
          Медиана - <strong>робастна</strong>.
        </KeyIdea>
      </section>

      <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
        <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
          Когда какую оценку брать
        </h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {decisionCards.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-950/70"
            >
              <h4 className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-900 dark:text-white">
                {card.title}
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">{card.text}</p>
            </article>
          ))}
        </div>
      </section>

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
          Далее: 5. Данные в коде (Pandas)
        </Link>
      </nav>
    </article>
  )
}

export default Practice1_Screen4
