import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import CodeBlock from '../components/CodeBlock'
import CourseHeader from '../components/CourseHeader'
import IdeaCard from '../components/IdeaCard'
import KeyIdea from '../components/KeyIdea'

const contextNotes = [
  {
    title: 'Новая среда анализа',
    text: 'Цифровая экономика расширила набор доступных данных: кроме отчетности и котировок аналитик работает с транзакционными, поведенческими и платформенными данными.',
  },
  {
    title: 'Цена цифровизации',
    text: 'Рост объема данных не отменяет требований к качеству. Ошибка в источнике, агрегировании или идентификации объекта способна привести к неверному инвестиционному выводу.',
  },
]

const digitalBlocks = [
  {
    title: 'Данные становятся потоковыми',
    text: 'Информация поступает не раз в квартал, а практически непрерывно: рыночные цены, пользовательская активность, платежи, логистические события.',
  },
  {
    title: 'Решения ускоряются',
    text: 'Окно для реакции на изменение условий сокращается, поэтому возрастает роль автоматизированной обработки и воспроизводимых вычислений.',
  },
  {
    title: 'Аналитик работает на стыке дисциплин',
    text: 'Нужно понимать экономический смысл показателей, основы статистики, структуру данных и ограничения цифровых источников.',
  },
]

const pipelineCode = `import pandas as pd

market = pd.DataFrame(
    {
        "date": pd.to_datetime(["2026-03-01", "2026-03-02", "2026-03-03", "2026-03-04"]),
        "price": [101.2, 102.8, 101.9, 104.1],
        "clicks": [5400, 5600, 5900, 6100],
    }
)

market["daily_return"] = market["price"].pct_change()
market["click_growth"] = market["clicks"].pct_change()

print(market.round(4))`

function Practice1_Screen3({ setContext, setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
    if (setContext) {
      setContext({
        title: 'Инвестиционный анализ в цифровой экономике',
        text: 'Современный аналитик работает с цифровыми следами бизнеса и рынка, но обязан проверять их качество и экономическую интерпретацию.',
      })
    }
  }, [setContext, setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 1 · Основы инвестиционного анализа"
        title="Инвестиционный анализ в цифровой экономике"
        subtitle="Понимаем, как цифровые данные меняют профессию аналитика и почему вычислительная грамотность становится частью экономической компетентности."
      />

      <section className="content-block">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
          В цифровой экономике инвестиционные решения все чаще опираются не только на
          бухгалтерскую отчетность и экспертные оценки, но и на большие массивы операционных
          данных. Платформы, маркетплейсы, финтех-сервисы и цифровые экосистемы оставляют
          измеримые следы, по которым можно оценивать спрос, устойчивость денежных потоков и
          чувствительность бизнеса к изменениям среды.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {digitalBlocks.map((block) => (
          <article
            key={block.title}
            className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900"
          >
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">{block.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              {block.text}
            </p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <IdeaCard title="Профессиональная ситуация">
          <p>
            Аналитик оценивает цифровой сервис. Помимо финансового результата ему доступны данные о
            трафике, конверсии, удержании клиентов и сезонности операций. Эти показатели сами по
            себе не заменяют денежный поток, но помогают объяснить его динамику и устойчивость.
          </p>
        </IdeaCard>

        <IdeaCard title="Вопрос для аудитории">
          <p>
            Если у проекта растет число пользователей, означает ли это автоматический рост его
            инвестиционной привлекательности?
          </p>
          <p className="mt-3">
            Нет. Нужно проверить монетизацию, unit-экономику, структуру затрат и то, превращается
            ли цифровая активность в денежный результат.
          </p>
        </IdeaCard>
      </section>

      <section className="content-block">
        <h3 className="section-title">Цифровой след как таблица данных</h3>
        <p className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200">
          Один из базовых навыков современного аналитика состоит в том, чтобы быстро соединять
          рыночные и операционные данные. Даже простая таблица уже позволяет поставить важный
          исследовательский вопрос: движутся ли показатели бизнеса и финансовый результат в одном
          направлении?
        </p>
        <div className="mt-4">
          <CodeBlock code={pipelineCode} title="Python: связываем рыночную цену и цифровую активность" />
        </div>
      </section>

      <KeyIdea title="Что меняется в профессии">
        Инвестиционный анализ в цифровой экономике перестает быть исключительно кабинетной работой
        с готовыми отчетами. Специалисту нужно уметь извлекать, очищать и интерпретировать данные,
        сохраняя экономическую логику вывода. Именно поэтому язык Python и работа с данными входят
        в базовый профессиональный инструментарий.
      </KeyIdea>

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
          Далее: 4. Python как инструмент
        </Link>
      </nav>
    </article>
  )
}

export default Practice1_Screen3
