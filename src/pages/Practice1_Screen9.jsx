import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BadgeInfo, Database, FolderKanban, ListChecks } from 'lucide-react'
import CourseHeader from '../components/CourseHeader'
import CodeBlock from '../components/CodeBlock'
import KeyIdea from '../components/KeyIdea'

const contextNotes = [
  {
    title: 'Как разбить на интервалы в Python?',
    text: 'Для выполнения первого пункта (построение интервального ряда) используйте функцию `pd.cut()` в Pandas. Она автоматически разобьет ваш непрерывный массив `income_data` на заданное количество корзин (bins) и позволит посчитать частоты через `.value_counts()`.',
  },
  {
    title: 'Исправленная vs Выборочная дисперсия',
    text: 'В задании №3 вас просят посчитать обе дисперсии. По умолчанию формула дисперсии делит сумму квадратов отклонений на n. Это выборочная (смещенная) дисперсия. Чтобы получить исправленную (несмещенную) оценку, нужно делить на n-1. В Pandas методы `.var()` и `.std()` по умолчанию используют `ddof=1`, а для смещенной оценки нужно явно указать `ddof=0`.',
  },
]

const datasetCode = `from sklearn.datasets import fetch_california_housing
import pandas as pd

data = fetch_california_housing()
df = pd.DataFrame(data.data, columns=data.feature_names)
income_data = df['MedInc']  # Наш непрерывный признак`

const taskItems = [
  {
    title: 'Построение интервального ряда',
    content:
      'Разбейте непрерывные данные на интервалы. Постройте таблицу (интервальный вариационный ряд), содержащую частоты (n_i) и относительные частоты (w_i) попадания доходов в каждый интервал.',
  },
  {
    title: 'Визуализация',
    content:
      'Постройте гистограмму относительных частот, полигон частот и кумуляту (эмпирическую функцию распределения, ECDF). Обязательно подпишите оси.',
  },
  {
    title: 'Точечные оценки',
    content: [
      'Выборочную среднюю (Mean)',
      'Медиану (Median) и моду (Mode)',
      'Выборочную дисперсию и выборочное СКО (смещенные оценки)',
      'Исправленную дисперсию и исправленное СКО (несмещенные оценки)',
      'Коэффициент асимметрии (Skewness)',
      'Коэффициент эксцесса (Kurtosis)',
    ],
  },
  {
    title: 'Аналитический вывод',
    content:
      'Напишите текстовый вывод о том, симметрично ли распределение доходов, есть ли тяжелые хвосты (по коэффициентам асимметрии и эксцесса) и сильно ли среднее значение отличается от медианы.',
  },
]

const documentationLinks = [
  {
    label: 'scikit-learn: fetch_california_housing',
    href: 'https://scikit-learn.org/stable/modules/generated/sklearn.datasets.fetch_california_housing.html',
  },
  {
    label: 'pandas: cut',
    href: 'https://pandas.pydata.org/docs/reference/api/pandas.cut.html',
  },
  {
    label: 'pandas: value_counts',
    href: 'https://pandas.pydata.org/docs/reference/api/pandas.Series.value_counts.html',
  },
  {
    label: 'SciPy: skew',
    href: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.skew.html',
  },
  {
    label: 'SciPy: kurtosis',
    href: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.kurtosis.html',
  },
]

function DatasetCard() {
  return (
    <section className="rounded-[1.75rem] border border-sky-200 bg-gradient-to-br from-sky-50 via-white to-cyan-50 p-6 shadow-soft dark:border-sky-900/70 dark:from-sky-950/30 dark:via-slate-900 dark:to-cyan-950/20">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-500/12 text-sky-700 dark:bg-sky-400/10 dark:text-sky-300">
          <Database size={24} />
        </div>

        <div className="min-w-0 flex-1 space-y-4">
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
              Ваш датасет: Доходы населения (Калифорния)
            </h3>
            <p className="mt-2 text-base leading-relaxed text-slate-700 dark:text-slate-200">
              Мы будем использовать классический открытый датасет по доходам и ценам на недвижимость. В нем
              содержится непрерывный признак <code className="rounded bg-slate-200 px-1.5 py-0.5 text-sm dark:bg-slate-700">MedInc</code>{' '}
              (медианный доход в десятках тысяч долларов в конкретном районе).
            </p>
          </div>

          <div className="rounded-2xl border border-sky-100 bg-white/80 p-4 dark:border-sky-900/50 dark:bg-slate-900/60">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-sky-700 dark:text-sky-300">
              <FolderKanban size={16} />
              Как загрузить данные
            </div>
            <CodeBlock code={datasetCode} title="Python: загрузка датасета" />
          </div>
        </div>
      </div>
    </section>
  )
}

function TaskBlock() {
  return (
    <section className="rounded-[1.75rem] border border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-6 shadow-soft dark:border-indigo-900/70 dark:from-indigo-950/30 dark:via-slate-900 dark:to-blue-950/20">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/12 text-indigo-700 dark:bg-indigo-400/10 dark:text-indigo-300">
          <ListChecks size={24} />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Что необходимо сделать в Jupyter Notebook:
          </h3>
          <ol className="mt-5 space-y-4">
            {taskItems.map((item, index) => (
              <li
                key={item.title}
                className="rounded-[1.4rem] border border-indigo-100 bg-white/90 p-5 dark:border-indigo-900/50 dark:bg-slate-900/70"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-base font-semibold text-slate-900 dark:text-white">{item.title}</h4>
                    {Array.isArray(item.content) ? (
                      <ul className="space-y-2 text-base leading-relaxed text-slate-700 dark:text-slate-200">
                        {item.content.map((point) => (
                          <li key={point} className="flex items-start gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-300" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">{item.content}</p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function Practice1_Screen9({ setContextNotes }) {
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
        badge="Практика 1 -> ЛАБОРАТОРНАЯ РАБОТА"
        title="Лаб 1.1. Непрерывные признаки"
        subtitle="Анализируем распределение доходов."
      />

      <section className="content-block space-y-6">
        <div className="rounded-[1.75rem] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-sky-50 p-6 dark:border-slate-700 dark:from-slate-900 dark:via-slate-900 dark:to-sky-950/20">
          <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
            В классической методичке вам предлагалось проанализировать абстрактный непрерывный признак X и
            «Среднедушевые доходы». Мы объединим эти задачи и выполним полный цикл описательной статистики на
            реальных финансовых данных.
          </p>
        </div>

        <DatasetCard />

        <TaskBlock />

        <KeyIdea title="Важное примечание">
          Смысл этой лабораторной работы не в механическом вызове функций `mean()` и `std()`, а в интерпретации
          формы распределения. Сопоставляйте графики, числовые оценки и текстовый вывод: именно эта связка
          показывает, что вы действительно понимаете данные.
        </KeyIdea>

        <section className="rounded-[1.5rem] border border-amber-200 bg-amber-50/80 p-5 dark:border-amber-900/60 dark:bg-amber-950/20">
          <div className="flex items-start gap-3">
            <BadgeInfo size={20} className="mt-0.5 shrink-0 text-amber-700 dark:text-amber-300" />
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-amber-700 dark:text-amber-300">
                Практический ориентир
              </h3>
              <p className="mt-2 text-base leading-relaxed text-slate-700 dark:text-slate-200">
                Если распределение заметно скошено вправо, это обычно проявляется сразу в трех местах: длинный
                правый хвост на гистограмме, положительная асимметрия и среднее значение выше медианы.
              </p>
            </div>
          </div>
        </section>
        <section className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-6 dark:border-slate-700 dark:bg-slate-900/70">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Официальная документация Python
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            Набор API для интервалов, частот и коэффициентов формы распределения в Лаб 1.1.
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {documentationLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-200 dark:hover:border-indigo-700 dark:hover:text-indigo-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>
      </section>

      <nav className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/practice/1/screen/8"
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Назад
        </Link>

        <Link
          to="/practice/1/screen/10"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Далее: 10. Лаб 1.2. Дискретные признаки
          <ArrowRight size={16} />
        </Link>
      </nav>
    </article>
  )
}

export default Practice1_Screen9
