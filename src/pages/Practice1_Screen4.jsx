import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AlertBox from '../components/AlertBox'
import ExecutablePythonBlock from '../components/ExecutablePythonBlock'
import ComparisonTable from '../components/ComparisonTable'
import CourseHeader from '../components/CourseHeader'
import IdeaCard from '../components/IdeaCard'
import HandbookDetails from '../components/HandbookDetails'
import KeyIdea from '../components/KeyIdea'
import MathBlock from '../components/MathBlock'
import MathText from '../components/MathText'
import PlotViewer from '../components/PlotViewer'
import SourceNote from '../components/SourceNote'
import ThinkQuestion from '../components/ThinkQuestion'
import { sseSeries } from '../data/practice1RealData'

const contextNotes = [
  {
    title: 'Временной ряд',
    text: 'Это последовательность наблюдений, упорядоченных по времени. Для инвестора базовыми временными рядами являются цены, доходности и объемы торгов.',
  },
  {
    title: 'Воспроизводимость',
    text: 'Аналитический результат считается воспроизводимым, если тот же код на тех же данных приводит к тем же числам и выводам.',
  },
]

const priceCode = `import pandas as pd

# Данные по индексу SSE Composite (Китай) - сентябрь 2024
data = {
    "date": ["2024-09-23", "2024-09-24", "2024-09-25", "2024-09-26", "2024-09-27", "2024-09-30"],
    "close": [2748.92, 2863.13, 2896.31, 3000.95, 3087.53, 3336.50]
}

sse = pd.DataFrame(data)
sse["date"] = pd.to_datetime(sse["date"])
sse["return"] = sse["close"].pct_change()

print("Индекс SSE Composite (Rally Sept 2024):")
print(sse.round(4))`

const returnsCode = `# Расчет накопленной доходности за неделю стимулов
total_return = (sse["close"].iloc[-1] / sse["close"].iloc[0]) - 1
daily_vol = sse["return"].std()

print(f"Общий рост за период: {round(total_return * 100, 2)}%")
print(f"Дневная волатильность: {round(daily_vol, 4)}")`


const returnsPlaygroundCode = `import pandas as pd

# Данные по индексу SSE Composite (Китай) - сентябрь 2024
data = {
    "date": ["2024-09-23", "2024-09-24", "2024-09-25", "2024-09-26", "2024-09-27", "2024-09-30"],
    "close": [2748.92, 2863.13, 2896.31, 3000.95, 3087.53, 3336.50]
}

sse = pd.DataFrame(data)
sse["date"] = pd.to_datetime(sse["date"])
sse["return"] = sse["close"].pct_change()

total_return = (sse["close"].iloc[-1] / sse["close"].iloc[0]) - 1
daily_vol = sse["return"].std()

print("Анализ стимулов в Китае (Sept 2024):")
print(sse[["date", "close", "return"]].round(4))
print(f"\nСуммарный рост: {round(total_return * 100, 2)}%")
print(f"Дневная волатильность: {round(daily_vol, 4)}")`

function PriceVolumeChart() {
  const maxPrice = Math.max(...sseSeries.map((item) => item.close))
  const minPrice = Math.min(...sseSeries.map((item) => item.close))

  const pricePoints = sseSeries
    .map((item, index) => {
      const x = 60 + index * 80
      const y = 110 - ((item.close - minPrice) / (maxPrice - minPrice || 1)) * 70
      return `${x},${y}`
    })
    .join(' ')

  return (
    <svg viewBox="0 0 520 240" className="h-full w-full">
      <line x1="45" y1="190" x2="490" y2="190" stroke="#64748b" strokeWidth="2" />
      <polyline points={pricePoints} fill="none" stroke="#2563eb" strokeWidth="3" />
      {sseSeries.map((item, index) => {
        const x = 60 + index * 80
        const priceY = 110 - ((item.close - minPrice) / (maxPrice - minPrice || 1)) * 70

        return (
          <g key={item.date}>
            <circle cx={x} cy={priceY} r="5" fill="#2563eb" />
            <text x={x} y="210" textAnchor="middle" fontSize="10" fill="#334155" transform={`rotate(-30, ${x}, 210)`}>
              {item.date}
            </text>
            <text x={x} y={priceY - 10} textAnchor="middle" fontSize="10" fill="#0f172a" fontWeight="bold">
              {Math.round(item.close)}
            </text>
          </g>
        )
      })}
      <text x="384" y="26" fontSize="12" fill="#2563eb" fontWeight="bold">
        SSE Composite Index
      </text>
    </svg>
  )
}

function Practice1_Screen4({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 1 · Python и рабочая среда"
        title="Python как инструмент инвестиционного аналитика"
        subtitle="Переходим от сырых таблиц к воспроизводимому анализу на примере взрывного роста китайского рынка в сентябре 2024 года."
      />

      <section className="content-block space-y-4">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
          Представьте, что вам нужно проанализировать "неделю чудес" на китайском рынке (конец сентября 2024), когда 
          индекс <strong>SSE Composite</strong> вырос на 20% за считанные дни после объявления стимулов ЦБ Китая. 
          Вручную считать доходности по дням неудобно, а главное — трудно воспроизвести результат. 
          Именно здесь <strong>Python</strong> становится рабочей средой аналитика.
        </p>
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
          Мы будем работать с <strong>временным рядом</strong> (англ. <em>time series</em>) и 
          следить за <strong>воспроизводимостью</strong>: один и тот же код на тех же данных должен давать 
          идентичный результат у любого аналитика в команде.
        </p>
        <MathText
          as="p"
          text="Инструментарий Python позволяет объединить сбор данных, расчеты и визуализацию в единый процесс. Это исключает ошибки при 'ручном кодировании' формул в Excel и делает анализ прозрачным."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <MathText
          as="p"
          text="Если обозначить значение индекса в момент $t$ через $I_t$, то ценовой ряд — это последовательность $\{I_t\}_{t=1}^{n}$. Мы загружаем эту последовательность в структуру DataFrame библиотеки pandas."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <MathBlock formula={String.raw`\{I_t\}_{t=1}^{n}`} />
      </section>

      <section className="grid items-start gap-4 md:grid-cols-2">
        <article className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">Временной ряд</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            Временной ряд — это упорядоченная по времени последовательность наблюдений. В нашем случае
            это ежедневные значения закрытия индекса Шанхайской фондовой биржи.
          </p>
        </article>

        <article className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">Воспроизводимость</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            Использование кода гарантирует, что любой сможет повторить ваши расчеты. Это критически
            важно при работе в инвестиционных фондах, где каждое решение должно иметь проверяемое обоснование.
          </p>
        </article>
      </section>

      <section className="space-y-4">
        <section className="content-block space-y-4">
          <h3 className="section-title">Реальные данные: SSE Composite (Stimulus Rally 2024)</h3>
          <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
            Ниже представлен фрагмент данных за сентябрь 2024 года. Это исторический период масштабного 
            вмешательства государства в экономику Китая, вызвавшего резкий рост котировок.
          </p>
          <ExecutablePythonBlock
            code={priceCode}
            title="Python: загрузка и предобработка ряда SSE"
            packages={['pandas']}
            note="Мы создаем таблицу и рассчитываем столбец return (дневная доходность). Обратите внимание на рост индекса 30 сентября — более 8% за один день!"
          />
        </section>

        <SourceNote>
          Данные: значения закрытия <strong>Shanghai Composite Index (SSE)</strong> за 
          период 23-30 сентября 2024 г.
        </SourceNote>

        <PlotViewer
          title="Взрывной рост SSE Composite (Sept 2024)"
          caption="График показывает динамику индекса после объявления стимулов. Резкий наклон в конце сентября иллюстрирует то, что аналитики называют 'паническими покупками' (FOMO) на фоне господдержки."
        >
          <PriceVolumeChart />
        </PlotViewer>
      </section>

      <ComparisonTable
        columns={sseSeries.map((item) => item.date)}
        rows={[
          {
            label: 'SSE Index (Close)',
            values: sseSeries.map((item) => item.close.toFixed(1)),
            highlight: true,
          },
        ]}
      />

      <section className="content-block space-y-4">
        <h3 className="section-title">Переход к доходностям и риску</h3>
        <MathText
          as="p"
          text="Абсолютные значения индекса (2700 или 3300) сложнее интерпретировать, чем проценты роста. Поэтому мы переходим к доходности $r_t$."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <MathBlock formula={String.raw`r_t = \frac{I_t - I_{t-1}}{I_{t-1}}`} />
        <MathText
          as="p"
          text="Для оценки того, насколько 'нервным' был рынок, мы считаем стандартное отклонение доходностей — волатильность ($s$)."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <MathBlock formula={String.raw`s = \sqrt{\frac{1}{n-1}\sum_{t=1}^{n}(r_t-\bar{r})^2}`} />
      </section>

      <ThinkQuestion question="Почему при анализе такого 'вертикального' роста волатильность взлетает вместе с ценой?">
        <p>
          Волатильность измеряет отклонение от среднего. В период резкого ралли дневные доходности 
          (напр. +4% или +8%) сильно отличаются от типичных нулевых или слабоотрицательных значений, 
          что математически увеличивает стандартное отклонение.
        </p>
        <p>
          Для аналитика это сигнал: рынок нестабилен, риск коррекции возрастает вместе с доходностью.
        </p>
      </ThinkQuestion>

      <section className="grid items-start gap-4 md:grid-cols-2">
        <AlertBox title="Роль Python в кризис">
          В моменты высокой волатильности (как в Китае 2024 или Японии 2024) скорость пересчета 
          риск-метрик становится решающим конкурентным преимуществом. Скрипт на Python сделает это за миллисекунды.
        </AlertBox>

        <IdeaCard title="Накопленная доходность">
          <p>
            В инвестициях важно не просто знать доходность за день, а понимать, сколько заработал 
            инвестор за весь период. Python позволяет легко рассчитать кумулятивный эффект через 
            iloc (индексацию по позиции) или метод cumprod().
          </p>
        </IdeaCard>
      </section>

      <section className="space-y-4">
        <section className="content-block">
          <h3 className="section-title">Python: расчет итогов ралли</h3>
          <div className="mt-4">
            <ExecutablePythonBlock
              code={returnsCode}
              title="Python: статистика доходности и риск"
              playgroundCode={returnsPlaygroundCode}
              packages={['pandas']}
              note="Запустите код, чтобы увидеть суммарный рост рынка акций Китая всего за одну неделю."
            />
          </div>
        </section>
      </section>

      <HandbookDetails title="Подробнее: почему 30 сентября 2024 вошло в историю">
        <p>
          Объем торгов на китайских биржах в этот день побил исторический рекорд, достигнув 2.6 трлн юаней. 
          Такой аномальный объем в сочетании с ростом индекса на 8% за день — это классический пример 
          события 'толстого хвоста' в статистике, которое аналитик должен учитывать в своих моделях.
        </p>
      </HandbookDetails>

      <KeyIdea title="Ключевой вывод">
        Python — это мост между хаотичными рыночными данными и структурированным выводом. 
        На примере ралли SSE мы видим, как код позволяет мгновенно превратить ценовые шоки в 
        измеримые метрики роста и риска.
      </KeyIdea>

      <nav className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/practice/1/screen/3"
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Назад
        </Link>
        <Link
          to="/practice/1/screen/5"
          className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Далее: 5. Мини-анализ в Python
        </Link>
      </nav>
    </article>
  )
}

export default Practice1_Screen4
