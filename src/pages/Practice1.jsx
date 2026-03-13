import { useEffect, useMemo } from 'react'
import CodeBlock from '../components/CodeBlock'
import IdeaCard from '../components/IdeaCard'
import MathBlock from '../components/MathBlock'

const pythonSnippet = `import numpy as np

sample = np.array([11, 10, 13, 9, 12, 8, 11, 15, 10, 9])
mean = sample.mean()
variance = sample.var(ddof=1)

print(f"Среднее: {mean:.2f}")
print(f"Выборочная дисперсия: {variance:.2f}")`

function Practice1({ setContext }) {
  const sections = useMemo(
    () => [
      {
        id: 'practice-overview',
        title: 'Рекап: что измеряем в выборке',
        note: 'Этот блок фиксирует базовую лексику: где центр выборки и как оценить разброс.',
      },
      {
        id: 'intuition',
        title: 'Интуиция: почему среднее может быть неустойчивым',
        note: 'Покажите студентам, как один выброс может сместить среднее и почти не изменить медиану.',
      },
      {
        id: 'python-example',
        title: 'Код: быстрый расчёт в Python',
        note: 'Важно проговорить параметр ddof=1: без него студенты получают смещенную оценку дисперсии.',
      },
      {
        id: 'key-idea',
        title: 'Ключевая идея',
        note: 'Смысл практики: статистика это язык для сжатого описания данных до пары интерпретируемых чисел.',
      },
    ],
    [],
  )

  useEffect(() => {
    setContext({ title: 'Пояснение к слайду', text: sections[0].note })
  }, [sections, setContext])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting)
        if (!visibleEntry) {
          return
        }
        const currentSection = sections.find((section) => section.id === visibleEntry.target.id)
        if (!currentSection) {
          return
        }
        setContext({ title: currentSection.title, text: currentSection.note })
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
    <article className="space-y-4">
      <section id="practice-overview" className="content-block">
        <p className="text-sm font-semibold uppercase tracking-[0.1em] text-indigo-600 dark:text-indigo-400">
          Практика 1
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Описательная статистика
        </h2>
        <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
          В этом занятии мы повторяем, как компактно описывать реальную выборку: где расположен ее центр,
          насколько данные разбросаны и как эти параметры связаны с интерпретацией.
        </p>
        <MathBlock formula="\\bar{x} = \\frac{1}{n}\\sum_{i=1}^{n}x_i, \\quad s^2 = \\frac{1}{n-1}\\sum_{i=1}^{n}(x_i-\\bar{x})^2" />
      </section>

      <section id="intuition" className="content-block">
        <h3 className="section-title">Интуиция</h3>
        <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
          Представьте группу из 10 студентов: 9 человек написали тест на 70-80 баллов, а один получил 10.
          Среднее мгновенно просядет, хотя типичный студент все еще где-то около 75. Поэтому всегда важно
          смотреть не только на среднее, но и на устойчивые показатели центра.
        </p>
        <IdeaCard title="Мини-пример (Интуиция)">
          Один выброс может "утянуть" среднее вниз. Медиана при этом почти не меняется, поэтому пара
          "среднее + медиана" часто лучше объясняет структуру данных, чем один показатель.
        </IdeaCard>
      </section>

      <section id="python-example" className="content-block">
        <h3 className="section-title">Код</h3>
        <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
          Ниже минимальный фрагмент для расчета ключевых статистик выборки в Python.
        </p>
        <div className="mt-4">
          <CodeBlock code={pythonSnippet} title="Python: среднее и выборочная дисперсия" />
        </div>
      </section>

      <section id="key-idea" className="content-block">
        <IdeaCard title="Ключевая идея">
          Описательная статистика это первый слой моделирования: вы учитесь извлекать из "сырых" данных
          компактное, но интерпретируемое представление. Дальше на этой базе строятся интервальные оценки и
          проверки гипотез.
        </IdeaCard>
      </section>
    </article>
  )
}

export default Practice1
