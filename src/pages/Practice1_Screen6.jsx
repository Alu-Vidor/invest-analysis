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
    title: 'Тикер SPY',
    text: 'ETF SPDR S&P 500 Trust — это один из старейших и наиболее популярных биржевых фондов в мире. Покупая 1 акцию SPY, вы фактически покупаете микро-долю во всех 500 крупнейших компаниях США.',
  },
  {
    title: 'NaN при pct_change',
    text: 'При расчете доходности для первого дня в выборке предыдущего дня нет, поэтому pandas ставит Not a Number (NaN). Не забудьте использовать `.dropna()`, чтобы эти пропуски не сломали статистические функции.',
  },
]

const datasetCode = `import yfinance as yf
import pandas as pd

# Загружаем исторические цены S&P 500 ETF (SPY) за весь 2023 год
spy = yf.download("SPY", start="2023-01-01", end="2023-12-31")

# Выделяем цены закрытия (Close)
spy_close = spy["Close"]

print(spy_close.head())`

const taskItems = [
  {
    title: 'Подготовка данных',
    content: 'Рассчитайте массив ежедневных доходностей (`daily_returns`) на основе цен закрытия (используйте `pct_change()`). Обязательно удалите пропущенные значения (NaN) перед дальнейшим анализом.',
  },
  {
    title: 'Базовые метрики',
    content: 'Найдите математическое ожидание (среднюю дневную доходность) и стандартное отклонение (дневную волатильность) для рассчитанного массива.',
  },
  {
    title: 'Анализ экстремумов',
    content: 'Найдите дни с лучшей и худшей доходностью за год. Выведите даты и значения в процентах. Попробуйте найти в интернете финансовые новости за эти дни — что произошло на рынке?',
  },
  {
    title: 'Визуализация (Цена и Доходность)',
    content: 'Постройте два графика (можно использовать `matplotlib` или `seaborn`): линейный график самих цен закрытия за весь 2023 год и гистограмму распределения дневных доходностей.',
  },
  {
    title: 'Оценка итогового результата (Buy & Hold)',
    content: 'Рассчитайте накопленную (итоговую) доходность инвестора, который купил бы актив в первый торговый день года и продал в последний. Сравните этот результат с простой суммой всех дневных доходностей. Почему они не совпадают?',
  },
  {
    title: 'Вывод аналитика',
    content: 'Сформулируйте в 2-3 предложениях итог года для данного актива: оправдал ли рост рынка принятый инвестором риск (с учетом рассчитанной волатильности и экстремальных просадок)?',
  },
]

const documentationLinks = [
  {
    label: 'yfinance: download',
    href: 'https://pypi.org/project/yfinance/',
  },
  {
    label: 'Pandas: pct_change',
    href: 'https://pandas.pydata.org/docs/reference/api/pandas.Series.pct_change.html',
  },
  {
    label: 'Pandas: idxmax / idxmin',
    href: 'https://pandas.pydata.org/docs/reference/api/pandas.Series.idxmax.html',
  },
]

function Practice1_Screen6({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 1 -> ЛАБОРАТОРНАЯ РАБОТА"
        title="Лаб 1. Самостоятельный мини-анализ актива"
        subtitle="Анализируем исторические данные реального рыночного актива (S&P 500 ETF)."
      />

      <section className="content-block space-y-6">
        <MathText
          as="p"
          text="На протяжении всей первой практики мы знакомились с базовыми метриками инвестиционного решения и учились применять простой код Python для расчета доходностей и волатильности. Настало время провести полный цикл 'мини-анализа' самостоятельно, от загрузки сырых данных из интернета до графики и интерпретации."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />

        <DatasetCard
          title="📈 Ваш актив: S&P 500 ETF (SPY)"
          text="Мы будем использовать библиотеку yfinance для загрузки реальных исторических цен."
          code={datasetCode}
          codeTitle="Python: загрузка исторического ряда S&P 500 ETF"
        />

        <section className="rounded-[1.9rem] border border-violet-300 bg-gradient-to-br from-violet-50 via-white to-indigo-50 p-2 shadow-soft dark:border-violet-900/50 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/30">
          <TaskBlock title="Ваши задачи в Jupyter Notebook:" items={taskItems} />
        </section>

        <AlertBox title="Разница между итоговой доходностью и суммой дневных">
          <MathText
            as="p"
            text={String.raw`Доходность за период не равна сумме дневных доходностей из-за эффекта сложного процента (compound interest). $(1+r_1)(1+r_2) \neq 1 + r_1 + r_2$. Остерегайтесь простого суммирования процентов, когда речь идет о длительных периодах!`}
          />
        </AlertBox>

        <ContextNote
          title="Критерий успеха"
          text="Хороший аналитический отчет не только показывает код и графики, но и формулирует четкие словесные выводы. Ваш Jupyter Notebook должен читаться как связная история о том, как данный актив прожил торговый год."
        />

        <section className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-6 dark:border-slate-700 dark:bg-slate-900/70">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Полезная документация
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            Здесь собраны ссылки на функции, которые значительно ускорят выполнение заданий:
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

      <nav className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/practice/1/screen/5"
            className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Назад
          </Link>
        </div>

        <Link
          to="/practice/2/screen/1"
          className="inline-flex min-h-16 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-sky-600 to-emerald-600 px-6 py-4 text-base font-semibold text-white shadow-soft transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PartyPopper size={20} />
          {'🎉 Завершить Практику 1 -> Перейти к Практике 2'}
          <ArrowRight size={18} />
        </Link>
      </nav>
    </article>
  )
}

export default Practice1_Screen6
