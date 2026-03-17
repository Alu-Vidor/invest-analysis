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
    title: 'Общая логика дисконтирования',
    text: 'Формулы облигации и аннуитета — это не разные математические миры. В обоих случаях мы просто суммируем будущие потоки, деленные на коэффициент дисконтирования $(1+r)^t$.',
  },
  {
    title: 'Аннуитетный платеж по ипотеке',
    text: 'При аннуитете заемщик каждый месяц платит банку одну и ту же сумму. В начале львиная доля этого платежа уходит на погашение процентов, и лишь малая часть — на погашение тела долга. Со временем эта пропорция меняется зеркально.',
  },
]

const datasetCode = `import pandas as pd

# 1. Данные по Казначейской ноте (US Treasury Note)
# Номинал: $1000, Выплаты 2 раза в год (полугодовые купоны)
bond_face_value = 1000
bond_coupon_rate = 0.0425   # 4.25% годовых
bond_periods = 10           # 5 лет = 10 полугодий
market_rates = [0.03, 0.0425, 0.05] # Годовые рыночные ставки для сценариев

# 2. Ипотечные программы (кредит $300,000)
# Программа А: 30 лет фиксированная (ставка 6.8% годовых)
# Программа Б: 15 лет фиксированная (ставка 6.1% годовых)
mortgage_principal = 300_000`

const taskItems = [
  {
    title: 'Универсальная функция оценки PV',
    content: 'Напишите функцию `calculate_pv(cash_flows, discount_rate)`, которая принимает список денежных потоков и ставку дисконтирования за один период (в долях), и возвращает текущую приведенную стоимость (PV) всего потока.',
  },
  {
    title: 'Оценка ОФЗ/Трежерис',
    content: 'Сформируйте список денежных потоков (`cash_flows`) для описанной казначейской ноты. Помните, что купон выплачивается раз в полгода (ставка купона делится на 2), а последний платеж включает и последний купон, и возврат номинала.',
  },
  {
    title: 'Анализ чувствительности (Облигация)',
    content: 'Вызовите вашу функцию PV для казначейской ноты при трех приведенных сценариях годовой рыночной ставки (`market_rates`). Важно: ставку дисконтирования в функцию нужно передавать за полгода! Как меняется цена облигации при росте ставки на рынке? Постройте простой график этой зависимости (x=ставка, y=PV).',
  },
  {
    title: 'Ипотечный калькулятор (Аннуитеты)',
    content: 'Напишите функцию для расчета аннуитетного платежа. С её помощью рассчитайте ежемесячный платеж для: Программы А (30 лет, 6.8%) и Программы Б (15 лет, 6.1%). Обратите внимание: ставку нужно делить на 12 месяцев, а периоды задавать в месяцах.',
  },
  {
    title: 'Сравнение переплат',
    content: 'Для обеих ипотечных программ рассчитайте общую сумму всех выплат за весь срок (ежемесячный платеж × количество месяцев). Вычтите тело кредита ($300,000) и найдите чистую "переплату" банку. Постройте столбчатую диаграмму сравнения этих двух переплат.',
  },
  {
    title: 'Вывод аналитика',
    content: 'Сформулируйте вывод: почему PV облигации падает при росте требуемой рынком ставки? И почему переплата по ипотеке на 30 лет настолько больше, хотя ставка (6.8%) ненамного превышает ставку 15-летней (6.1%)?',
  },
]

const documentationLinks = [
  {
    label: 'Python: enum',
    href: 'https://docs.python.org/3/library/functions.html#enumerate',
  },
  {
    label: 'Matplotlib: plot',
    href: 'https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.plot.html',
  },
  {
    label: 'Matplotlib: bar',
    href: 'https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.bar.html',
  },
]

function Practice2_Screen6({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 2 -> ЛАБОРАТОРНАЯ РАБОТА"
        title="Лаб 2. Оценка контрактов и стоимости денег"
        subtitle="Программируем универсальные логики PV для рыночных облигаций и банковских кредитов."
      />

      <section className="content-block space-y-6">
        <MathText
          as="p"
          text="Во второй практике мы разобрали временную стоимость денег и научились приводить денежные потоки к одному моменту времени с помощью дисконтирования. Теперь вам предстоит создать собственный 'движок' для оценки контрактов в Python и проверить его на двух абсолютно разных (на первый взгляд) финансовых инструментах."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />

        <DatasetCard
          title="🏦 Объекты: Казначейская нота и Ипотека"
          text="Вам не нужно парсить сайты банков и бирж. Мы уже собрали параметры реальных контрактов:"
          code={datasetCode}
          codeTitle="Python: параметры финансовой задачи"
        />

        <section className="rounded-[1.9rem] border border-violet-300 bg-gradient-to-br from-violet-50 via-white to-indigo-50 p-2 shadow-soft dark:border-violet-900/50 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/30">
          <TaskBlock title="Ваши задачи в Jupyter Notebook:" items={taskItems} />
        </section>

        <AlertBox title="Правило соответствия периодов">
          <MathText
            as="p"
            text={String.raw`И в случае облигаций (купоны раз в полгода), и в случае кредитов (платежи раз в месяц) — шаг времени меньше года. Следите за тем, чтобы ставка дисконтирования $r$ и количество периодов $n$ строго соответствовали периодичности самого потока.`}
          />
        </AlertBox>

        <ContextNote
          title="Финансовая интуиция"
          text="Самое важное в этой работе — осознать, что покупка облигации и взятие ипотеки описываются одной и той же базовой математикой. Разница лишь в том, с какой стороны денежного потока вы находитесь."
        />

        <section className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-6 dark:border-slate-700 dark:bg-slate-900/70">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Полезная документация
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            Вам могут пригодиться встроенные функции Python для работы со списками и базовые методы визуализации:
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
            to="/practice/2/screen/5"
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

export default Practice2_Screen6
