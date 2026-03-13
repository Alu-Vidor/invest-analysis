import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import CourseHeader from '../components/CourseHeader'
import IdeaCard from '../components/IdeaCard'
import RecapBlock from '../components/RecapBlock'

const roadmapItems = [
  'сначала определяем тип признака и допустимые операции;',
  'затем ищем центр, разброс и возможные аномалии;',
  'после этого строим графики и проверяем форму распределения;',
  'только потом пишем аналитический вывод для отчета.',
]

const outcomes = [
  'отличать среднее от медианы не по определению, а по поведению на реальных данных;',
  'читать гистограмму и ECDF как инструменты анализа формы распределения;',
  'загружать данные в Pandas и быстро проверять качество таблицы;',
  'оформлять лабораторную как воспроизводимый аналитический ноутбук.',
]

const contextNotes = [
  {
    title: 'Зачем нам Python и Pandas?',
    text: 'В классических курсах часто используют Excel или ручной счет. Мы используем Python, так как это индустриальный стандарт для аналитики данных и машинного обучения. Pandas позволяет сделать за 2 строчки кода то, на что в таблицах ушли бы часы.',
  },
  {
    title: 'Грязные данные',
    text: 'В учебниках данные всегда причесаны. В реальности (и в наших лабах) вы столкнетесь с пропусками, выбросами и ошибками сбора. Описательная статистика — это ваш первый фильтр адекватности данных.',
  },
]

function Practice1_Screen1({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Связь с лекцией: Раздел 1"
        title="Описательная статистика: От сырых данных к смыслу"
        subtitle="Где мы находимся и куда идем дальше"
      />

      <section className="content-block">
        <div className="space-y-4 text-base leading-relaxed text-slate-700 dark:text-slate-200">
          <p>
            На лекциях мы разобрали методы фиксации данных, шкалы измерений и первичную
            обработку. На практике наша задача — научиться применять эти инструменты к реальным
            данным с помощью Python. Мы научимся превращать нечитаемые таблицы с тысячами строк в
            понятные метрики и графики.
          </p>
        </div>
      </section>

      <RecapBlock title="Напоминание: Выборка vs Генеральная совокупность">
        <p>
          В идеальном мире мы бы знали всё. Если бы мы хотели узнать средний рост всех людей на
          Земле, мы бы измерили каждого (это генеральная совокупность). Но в реальности у нас нет
          на это ни времени, ни денег.
        </p>
        <p>
          Поэтому мы берем небольшую группу людей (выборку), измеряем их и надеемся, что они
          хорошо отражают картину в целом.
        </p>
        <p>
          Главная проблема статистики: выборка почти никогда не бывает идеальной. Описательная
          статистика дает нам инструменты, чтобы понять, с чем именно мы имеем дело, прежде чем
          делать глобальные выводы.
        </p>
      </RecapBlock>

      <IdeaCard title="План на сегодня">
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            Шкалы измерений: разберемся, почему нельзя считать среднее арифметическое для цвета
            глаз.
          </p>
          <p>
            Мини-пример (Интуиция): посмотрим, как выбросы ломают классические метрики на примере
            оценок студентов.
          </p>
          <p>
            Переход в код (Pandas): загрузим датасет и посчитаем точечные и интервальные оценки.
          </p>
          <p>
            Визуализация: построим гистограммы и эмпирическую функцию распределения (ECDF).
          </p>
          <p>
            Лабораторные работы (1.1 - 1.3): ваши самостоятельные задания по непрерывным,
            дискретным и номинативным признакам.
          </p>
        </div>
      </IdeaCard>

      <section className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Логика практики
          </h3>
          <ol className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            {roadmapItems.map((item, index) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white">
                  {index + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-[1.5rem] border border-indigo-200 bg-indigo-50/70 p-6 shadow-soft dark:border-indigo-900/50 dark:bg-indigo-950/20">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Что должно получиться к концу
          </h3>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            {outcomes.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </section>

      <div className="flex justify-end">
        <Link
          to="/practice/1/screen/2"
          className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Далее: 2. Шкалы измерений
        </Link>
      </div>
    </article>
  )
}

export default Practice1_Screen1
