import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCheck, CircleCheckBig, FlaskConical, NotebookPen, TriangleAlert } from 'lucide-react'
import CourseHeader from '../components/CourseHeader'

const contextNotes = [
  {
    title: 'Воспроизводимость (Reproducibility)',
    text: 'Золотое правило Data Science: ваш ноутбук должен запускаться у другого человека нажатием одной кнопки «Run All». Перед сдачей работы обязательно очистите вывод ячеек (Restart & Clear Output) и запустите всё заново. Если код упал с ошибкой — работу сдавать рано.',
  },
  {
    title: 'Откуда брать данные?',
    text: 'На следующих экранах к каждому заданию будет приложен открытый датасет (ссылка на CSV-файл или загрузка через библиотеку `seaborn`). Вы будете работать с реальными рыночными данными.',
  },
]

const checklistItems = [
  {
    title: 'Структура',
    text: 'Ноутбук разбит на логические блоки с помощью Markdown-заголовков. Например: `## Загрузка данных`, `## Построение ECDF`.',
  },
  {
    title: 'Код',
    text: 'Код чистый, переменные названы осмысленно. Не `df1`, `df2`, а `df_salaries`, `df_ratings`. Избегайте лишних `print()`.',
  },
  {
    title: 'Визуализация',
    text: 'У всех графиков есть названия (`plt.title`) и подписаны оси X и Y (`plt.xlabel`, `plt.ylabel`). Без подписей график считается недействительным.',
  },
  {
    title: 'Интерпретация (главное)',
    text: 'Под каждой вычисленной метрикой или построенным графиком есть текстовая ячейка Markdown с выводом: не просто число, а объяснение его смысла.',
  },
]

const documentationLinks = [
  {
    label: 'Jupyter Notebook docs',
    href: 'https://jupyter-notebook.readthedocs.io/en/stable/',
  },
  {
    label: 'Google Colab',
    href: 'https://colab.research.google.com/notebooks/basic_features_overview.ipynb',
  },
  {
    label: 'Markdown guide',
    href: 'https://www.markdownguide.org/basic-syntax/',
  },
]

function InfoCard({ title, children }) {
  return (
    <section className="rounded-[1.75rem] border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-orange-50 p-6 shadow-soft dark:border-amber-900/70 dark:from-amber-950/30 dark:via-slate-900 dark:to-orange-950/20">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300">
          <FlaskConical size={24} />
        </div>
        <div className="space-y-3">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">{title}</h3>
          <div className="text-base leading-relaxed text-slate-700 dark:text-slate-200">{children}</div>
        </div>
      </div>
    </section>
  )
}

function ChecklistItem({ title, text }) {
  return (
    <li className="rounded-[1.5rem] border border-emerald-200 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 dark:border-emerald-900/70 dark:bg-slate-900/90">
      <div className="flex items-start gap-4">
        <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/12 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
          <CircleCheckBig size={24} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
          <p className="mt-2 text-base leading-relaxed text-slate-700 dark:text-slate-200">{text}</p>
        </div>
      </div>
    </li>
  )
}

function Practice1_Screen8({ setContextNotes }) {
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
        title="Чек-лист: правила оформления и сдачи"
        subtitle="Как превратить код в полноценный аналитический отчет."
      />

      <section className="content-block space-y-6">
        <div className="rounded-[1.75rem] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-indigo-50 p-6 dark:border-slate-700 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/30">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/12 text-indigo-700 dark:bg-indigo-400/10 dark:text-indigo-300">
              <NotebookPen size={24} />
            </div>
            <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
              Впереди вас ждут три лабораторные работы (1.1, 1.2 и 1.3). В реальной работе аналитика просто написать код недостаточно — нужно уметь объяснять бизнесу, что означают полученные цифры. Поэтому мы отказываемся от формата <strong>«сдать скрипт»</strong> и переходим к формату <strong>Jupyter Notebook</strong>.
            </p>
          </div>
        </div>

        <InfoCard title="🛠 Инструментарий">
          <p>
            Все работы выполняются в среде <strong>Jupyter Notebook</strong> или <strong>Google Colab</strong>.
          </p>
          <p className="mt-2">
            Разрешенные библиотеки: <code className="rounded bg-slate-200 px-1.5 py-0.5 text-sm dark:bg-slate-700">pandas</code>,{' '}
            <code className="rounded bg-slate-200 px-1.5 py-0.5 text-sm dark:bg-slate-700">numpy</code>,{' '}
            <code className="rounded bg-slate-200 px-1.5 py-0.5 text-sm dark:bg-slate-700">scipy.stats</code>,{' '}
            <code className="rounded bg-slate-200 px-1.5 py-0.5 text-sm dark:bg-slate-700">matplotlib</code>,{' '}
            <code className="rounded bg-slate-200 px-1.5 py-0.5 text-sm dark:bg-slate-700">seaborn</code>.
          </p>
        </InfoCard>

        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/12 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
              <CheckCheck size={24} />
            </div>
            <div>
              <h3 className="section-title">Требования к идеальному ноутбуку</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Перед отправкой работы преподавателю проверьте себя по этому списку.
              </p>
            </div>
          </div>

          <ul className="grid gap-4">
            {checklistItems.map((item) => (
              <ChecklistItem key={item.title} title={item.title} text={item.text} />
            ))}
          </ul>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <article className="rounded-[1.5rem] border border-rose-200 bg-rose-50/80 p-5 dark:border-rose-900/60 dark:bg-rose-950/20">
            <div className="flex items-center gap-2 text-rose-700 dark:text-rose-300">
              <TriangleAlert size={18} />
              <h3 className="text-sm font-semibold uppercase tracking-[0.08em]">Плохо</h3>
            </div>
            <p className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200">
              «Медиана равна 45000».
            </p>
          </article>

          <article className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50/80 p-5 dark:border-emerald-900/60 dark:bg-emerald-950/20">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
              <CircleCheckBig size={18} />
              <h3 className="text-sm font-semibold uppercase tracking-[0.08em]">Хорошо</h3>
            </div>
            <p className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200">
              «Медианная зарплата составляет 45 000 руб., при этом средняя равна 60 000 руб. Сильная скошенность распределения вправо говорит о наличии небольшого числа аномально высоких зарплат».
            </p>
          </article>
        </section>
        <section className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-6 dark:border-slate-700 dark:bg-slate-900/70">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Полезная документация
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            Короткий набор ссылок по среде, в которой оформляются все лабораторные Практики 1.
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
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
          to="/practice/1/screen/7"
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Назад
        </Link>

        <Link
          to="/practice/1/screen/9"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Далее: 9. Лаб 1.1. Непрерывные признаки
          <ArrowRight size={16} />
        </Link>
      </nav>
    </article>
  )
}

export default Practice1_Screen8
