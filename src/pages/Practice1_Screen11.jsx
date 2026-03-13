import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, PartyPopper } from 'lucide-react'
import CourseHeader from '../components/CourseHeader'
import DatasetCard from '../components/DatasetCard'
import TaskBlock from '../components/TaskBlock'

const contextNotes = [
  {
    title: 'Ordered Categorical Data',
    text: 'В Pandas есть специальный тип данных для таких шкал — `CategoricalDtype(ordered=True)`. Если вы проверите тип колонки `cut` (`df_diamonds[\'cut\'].dtype`), вы увидите, что Pandas уже знает порядок Fair < Good < Very Good < Premium < Ideal. Благодаря этому сортировка графика и вычисление медианы будут работать правильно, а не по алфавиту.',
  },
  {
    title: 'Медиана для текста?',
    text: 'Если вместо чисел у нас слова, логика остаётся той же: сортируем все наблюдения по порядку шкалы и смотрим, какая категория стоит ровно в середине списка. Для `cut` это и будет медианное качество огранки.',
  },
]

const datasetCode = `import seaborn as sns
import pandas as pd

# Загружаем реальный датасет

df_diamonds = sns.load_dataset('diamonds')

# Наш ранговый признак (качество огранки)
ordinal_data = df_diamonds['cut']
print(ordinal_data.unique())`

const taskItems = [
  {
    title: 'Сгруппированный ранжированный ряд',
    content:
      'Постройте таблицу частот: сколько бриллиантов качества Ideal, сколько Premium и так далее. Выведите абсолютные и относительные частоты.',
  },
  {
    title: 'Визуализация',
    content:
      'Постройте полигон частот (или столбчатую диаграмму, если она уместнее) и эмпирическую функцию распределения (ECDF) для качества огранки.',
  },
  {
    title: 'Точечные оценки (Осторожно!)',
    content:
      'Вычислите только возможные и статистически корректные точечные оценки для ранговой шкалы. В первую очередь это мода и медиана.',
  },
  {
    title: 'Связанные ранги',
    content:
      'Постройте несгруппированный ранжированный ряд со связанными рангами, когда одинаковым категориям присваивается средний ранг, например с помощью `rank(method=\'average\')`.',
  },
  {
    title: 'Аналитический вывод',
    content:
      'Ответьте на вопрос: имеет ли математический смысл расчёт дисперсии и среднего арифметического для признака `cut`? Почему? Какое качество огранки встречается на рынке чаще всего (мода)?',
  },
]

const documentationLinks = [
  {
    label: 'Seaborn: load_dataset',
    href: 'https://seaborn.pydata.org/generated/seaborn.load_dataset.html',
  },
  {
    label: 'pandas: CategoricalDtype',
    href: 'https://pandas.pydata.org/docs/reference/api/pandas.CategoricalDtype.html',
  },
  {
    label: 'pandas: rank',
    href: 'https://pandas.pydata.org/docs/reference/api/pandas.Series.rank.html',
  },
]

function Practice1_Screen11({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 1 -> ЛАБОРАТОРНАЯ РАБОТА"
        title="Лаб 1.3. Ранговые и номинативные признаки"
        subtitle="Работаем с порядковыми шкалами на реальных данных."
      />

      <section className="content-block space-y-6">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
          В последнем задании мы отказываемся от классической математики (сложения и деления) и
          переходим к порядковым шкалам. В методичке это соответствует Заданию 5: там использовалась
          5-балльная шкала экспертных оценок, а здесь мы возьмём реальный рыночный датасет, где
          качество товара оценивается по 5-уровневой порядковой шкале.
        </p>

        <DatasetCard
          title="💎 Ваш датасет: Характеристики 54 000 бриллиантов (Seaborn Diamonds)"
          text="Это реальный датасет с ценами и характеристиками бриллиантов. Нас интересует признак `cut` (качество огранки). Он имеет 5 уровней: Fair (Удовлетворительно), Good (Хорошо), Very Good (Очень хорошо), Premium (Премиум), Ideal (Идеально). Это классическая ранговая шкала."
          code={datasetCode}
          codeTitle="Python: загрузка рангового признака"
        />

        <TaskBlock title="Что необходимо сделать в Jupyter Notebook:" items={taskItems} />
        <section className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-6 dark:border-slate-700 dark:bg-slate-900/70">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Официальная документация Python
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            Основные API для ранговой шкалы, категориального порядка и связанных рангов в Лаб 1.3.
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
          to="/practice/1/screen/10"
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Назад
        </Link>

        <Link
          to="/practice/2"
          className="inline-flex min-h-16 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-indigo-600 px-6 py-4 text-base font-semibold text-white shadow-soft transition hover:from-emerald-400 hover:to-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PartyPopper size={20} />
          🎉 Завершить Практику 1 → Перейти к Практике 2
          <ArrowRight size={18} />
        </Link>
      </nav>
    </article>
  )
}

export default Practice1_Screen11

