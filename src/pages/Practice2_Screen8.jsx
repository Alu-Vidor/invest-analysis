import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, PartyPopper } from 'lucide-react'
import CourseHeader from '../components/CourseHeader'
import DatasetCard from '../components/DatasetCard'
import TaskBlock from '../components/TaskBlock'
import AlertBox from '../components/AlertBox'
import ContextNote from '../components/ContextNote'
import MathText from '../components/MathText'

const contextNotes = [
  {
    title: '⚠️ Колмогоров и дискретные данные',
    text: 'В задании требуется использовать тест Колмогорова-Смирнова (`kstest`). Однако академический нюанс такой: классический тест Колмогорова разработан для непрерывных распределений. Для дискретного Пуассона он становится слишком консервативным, поэтому в строгом анализе используют специальные модификации. В этой лабораторной базовый метод применяется как учебный.',
  },
  {
    title: 'Пуассон vs Биномиальное',
    text: 'Биномиальное распределение описывает число успехов в фиксированном числе испытаний. Распределение Пуассона возникает как его предельный случай, когда испытаний очень много, а вероятность события мала. Для количества гостей за столиком это не идеальная модель, но полезная рабочая гипотеза.',
  },
]

const datasetCode = `import seaborn as sns
import pandas as pd

df = sns.load_dataset('tips')
discrete_data = df['size']  # Дискретный признак: размер компании`

const taskItems = [
  {
    title: 'Выбор гипотезы',
    content: 'Обоснуйте и сформулируйте гипотезу о виде распределения количества гостей за столиком. Похоже ли оно скорее на биномиальное распределение или на закон Пуассона?',
  },
  {
    title: 'Проверка критерием Пирсона ($\\chi^2$)',
    content: [
      'Оцените параметр $\\lambda$ для распределения Пуассона.',
      'Рассчитайте ожидаемые частоты для каждого значения с помощью `scipy.stats.poisson.pmf`.',
      'Проверьте гипотезу на уровне значимости $\\alpha = 0.05$ с помощью `scipy.stats.chisquare`.',
    ],
  },
  {
    title: 'Проверка критерием Колмогорова',
    content: "Проверьте ту же гипотезу с помощью `scipy.stats.kstest`, передав ему теоретическое распределение `'poisson'`.",
  },
  {
    title: 'Аналитический вывод',
    content: 'Сформулируйте итоговый вывод: отвергается ли нулевая гипотеза и насколько вообще размер компании в ресторане подчиняется строгой математической модели.',
  },
]

const documentationLinks = [
  {
    label: 'Seaborn: load_dataset',
    href: 'https://seaborn.pydata.org/generated/seaborn.load_dataset.html',
  },
  {
    label: 'SciPy: poisson',
    href: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.poisson.html',
  },
  {
    label: 'SciPy: chisquare',
    href: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.chisquare.html',
  },
  {
    label: 'SciPy: kstest',
    href: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.kstest.html',
  },
]

function Practice2_Screen8({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 2 -> ЛАБОРАТОРНАЯ РАБОТА"
        title="Лаб 2.2. Суд над дискретными данными"
        subtitle="Ищем Пуассона и Биномиальное распределение в реальной жизни."
      />

      <section className="content-block space-y-6">
        <MathText
          as="p"
          text={String.raw`В прошлом задании мы проверяли непрерывные доходы на нормальность. Но если мы считаем людей, события или ошибки, данные принимают только целые значения: $0, 1, 2, \dots$. Для таких случаев особенно важны распределение Пуассона и биномиальное распределение.`}
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />

        <DatasetCard
          title="🍽 Ваш датасет: Компании в ресторане (Seaborn Tips)"
          text="Мы возвращаемся к встроенному датасету с чеками из ресторана. Нас интересует дискретный признак `size` — количество гостей за одним столиком."
          code={datasetCode}
          codeTitle="Python: загрузка датасета `tips`"
        />

        <section className="rounded-[1.9rem] border border-violet-300 bg-gradient-to-br from-violet-50 via-white to-indigo-50 p-2 shadow-soft dark:border-violet-900/50 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/30">
          <TaskBlock title="Что необходимо сделать в Jupyter Notebook:" items={taskItems} />
        </section>

        <AlertBox title="Ограничение Хи-квадрат">
          <MathText
            as="p"
            text="Если для какого-то количества гостей ожидаемая частота получается меньше 5, критерий Пирсона применять напрямую нельзя. В таком случае редкие категории нужно объединить, например в корзину «5 и более гостей», и только после этого запускать тест."
          />
        </AlertBox>

        <ContextNote
          title="Практический ориентир"
          text="В этой лабораторной особенно важен не только сам `p-value`, но и качество выбранной модели. Даже если формальный тест не отвергает гипотезу, это не означает, что человеческое поведение идеально описывается одной простой формулой."
        />

        <section className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-6 dark:border-slate-700 dark:bg-slate-900/70">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Официальная документация Python
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            Здесь собраны API для загрузки датасета и двух критериев, которые используются в дискретной лабораторной.
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

      <nav className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/practice/2/screen/7"
            className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Назад
          </Link>
        </div>

        <Link
          to="/practice/3/screen/1"
          className="inline-flex min-h-16 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-sky-600 to-emerald-600 px-6 py-4 text-base font-semibold text-white shadow-soft transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PartyPopper size={20} />
          {'🎉 Завершить Практику 2 -> Перейти к Практике 3'}
          <ArrowRight size={18} />
        </Link>
      </nav>
    </article>
  )
}

export default Practice2_Screen8
