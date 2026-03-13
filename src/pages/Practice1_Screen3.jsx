import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import CourseHeader from '../components/CourseHeader'
import KeyIdea from '../components/KeyIdea'
import MathBlock from '../components/MathBlock'

const scores = [65, 70, 72, 75, 78, 80, 82, 85, 88, 1000]

const consequenceCards = [
  {
    title: 'Что ломается',
    text: 'Среднее арифметическое перестает быть типичным значением группы и начинает отражать ошибочную строку.',
  },
  {
    title: 'Что делать аналитически',
    text: 'Нужно сравнить среднее с медианой, проверить максимум, построить график и найти источник выброса.',
  },
  {
    title: 'Какой урок',
    text: 'Число само по себе не гарантирует корректность. Важна структура данных и устойчивость метрики.',
  },
]

function DataPill({ value, isAnomaly = false }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-xl px-3 py-1.5 text-sm font-semibold ${
        isAnomaly
          ? 'border border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300'
          : 'border border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-300'
      }`}
    >
      {value}
    </span>
  )
}

function Practice1_Screen3({ setContext, setContextNotes }) {
  const sections = useMemo(
    () => [
      {
        id: 'intro',
        title: 'Сюжет задачи',
        note: 'Один сбой в данных записал студенту 1000 баллов. Нужно понять, почему классическое среднее здесь перестает описывать группу.',
      },
      {
        id: 'data-array',
        title: 'Данные',
        note: 'Видно, что девять оценок лежат в диапазоне 65-88, а одно значение резко выбивается вправо.',
      },
      {
        id: 'mean-formula',
        title: 'Среднее арифметическое',
        note: 'Среднее учитывает величину каждого наблюдения. Поэтому один большой выброс линейно сдвигает итог.',
      },
      {
        id: 'sensitivity',
        title: 'Чувствительность к выбросу',
        note: 'Если заменить одно значение на огромное число, среднее сразу растет. Это и есть проблема неустойчивости.',
      },
      {
        id: 'key-idea',
        title: 'Постановка следующего шага',
        note: 'Нужна метрика центра, которая меньше зависит от экстремальных значений. На следующем экране это будет медиана.',
      },
    ],
    [],
  )

  useEffect(() => {
    setContextNotes([])
    setContext({ title: sections[0].title, text: sections[0].note })
  }, [sections, setContext, setContextNotes])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting)
        if (!visibleEntry) {
          return
        }

        const currentSection = sections.find((section) => section.id === visibleEntry.target.id)
        if (currentSection) {
          setContext({ title: currentSection.title, text: currentSection.note })
        }
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0.1 },
    )

    sections.forEach((section) => {
      const node = document.getElementById(section.id)
      if (node) {
        observer.observe(node)
      }
    })

    return () => observer.disconnect()
  }, [sections, setContext])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 1 -> БАЗОВЫЕ ПОНЯТИЯ"
        title="Мини-пример: оценки 10 студентов"
        subtitle="Почему одно ошибочное значение ломает среднее арифметическое."
      />

      <section className="content-block space-y-6">
        <p id="intro" className="max-w-3xl text-base leading-relaxed text-slate-700 dark:text-slate-200">
          Представим типичную аналитическую ситуацию: у нас есть оценки 10 студентов за тест. Девять
          человек написали его нормально, но в одной записи произошел баг, и вместо реального балла
          в таблице оказалось число 1000. Формально это все еще числовой столбец, но содержательно
          данные уже испорчены.
        </p>

        <div id="data-array" className="space-y-3">
          <p className="font-semibold text-slate-900 dark:text-white">
            Отсортированный набор данных выглядит так:
          </p>
          <div className="flex flex-wrap gap-3">
            {scores.map((score) => (
              <DataPill key={score} value={score} isAnomaly={score === 1000} />
            ))}
          </div>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Уже на глаз видно, что одно значение живет по другим правилам. Основная масса оценок
            лежит около 70-80, а 1000 создает длинный правый хвост.
          </p>
        </div>

        <div id="mean-formula" className="space-y-4">
          <h3 className="section-title">Попытка №1. Среднее арифметическое</h3>
          <p className="max-w-3xl text-base leading-relaxed text-slate-700 dark:text-slate-200">
            Среднее арифметическое складывает все наблюдения и делит сумму на их количество. Оно
            использует именно <strong>значения</strong> элементов, а не только их порядок.
          </p>
          <MathBlock formula={String.raw`\bar{x} = \frac{1}{n}\sum_{i=1}^{n} x_i = \frac{1695}{10} = 169.5`} />
          <p className="max-w-3xl text-base leading-relaxed text-slate-700 dark:text-slate-200">
            <strong>Результат: 169.5 баллов.</strong> Это абсурдный ответ: средний балл оказался
            выше максимума теста. Значит, формула посчитана верно, но сама метрика в этой ситуации
            перестала описывать реальность.
          </p>
        </div>

        <div id="sensitivity" className="space-y-4">
          <h3 className="section-title">Почему среднее так легко ломается</h3>
          <p className="max-w-3xl text-base leading-relaxed text-slate-700 dark:text-slate-200">
            У среднего есть линейная чувствительность к каждому элементу. Если обозначить ошибочное
            значение через <code className="rounded bg-slate-200 px-1.5 py-0.5 text-sm dark:bg-slate-700">M</code>,
            то получим:
          </p>
          <MathBlock formula={String.raw`\bar{x}(M) = \frac{695 + M}{10}`} />
          <p className="max-w-3xl text-base leading-relaxed text-slate-700 dark:text-slate-200">
            Эта запись важна: как только <code className="rounded bg-slate-200 px-1.5 py-0.5 text-sm dark:bg-slate-700">M</code>{' '}
            растет, среднее растет вместе с ним. Если бы вместо 1000 стояло 88, то мы получили бы
            вполне нормальное среднее:
          </p>
          <MathBlock formula={String.raw`\bar{x}_{\text{без бага}} = \frac{695 + 88}{10} = 78.3`} />
          <p className="max-w-3xl text-base leading-relaxed text-slate-700 dark:text-slate-200">
            Один неверный элемент сдвинул центр выборки с 78.3 до 169.5. Именно поэтому среднее
            арифметическое называют чувствительным к выбросам.
          </p>
        </div>

        <div id="key-idea">
          <KeyIdea title="Проблема сформулирована">
            Среднее арифметическое хорошо работает, когда данные чистые и без экстремальных
            аномалий. Но если даже одна строка содержит сильный выброс, центр выборки может
            исказиться. Значит, на следующем шаге нам нужна метрика, которая опирается не на
            величину значения, а на положение элемента в упорядоченном ряду.
          </KeyIdea>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {consequenceCards.map((card) => (
          <article
            key={card.title}
            className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900"
          >
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">{card.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">{card.text}</p>
          </article>
        ))}
      </section>

      <nav className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/practice/1/screen/2"
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Назад
        </Link>

        <Link
          to="/practice/1/screen/4"
          className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Далее: 4. Робастность: медиана спасает ситуацию
        </Link>
      </nav>
    </article>
  )
}

export default Practice1_Screen3
