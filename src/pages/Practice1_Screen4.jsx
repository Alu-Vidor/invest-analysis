import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AlertBox from '../components/AlertBox'
import CodeBlock from '../components/CodeBlock'
import ComparisonTable from '../components/ComparisonTable'
import CourseHeader from '../components/CourseHeader'
import IdeaCard from '../components/IdeaCard'
import KeyIdea from '../components/KeyIdea'
import MathBlock from '../components/MathBlock'
import MathText from '../components/MathText'
import PlotViewer from '../components/PlotViewer'

const contextNotes = [
  {
    title: 'Временной ряд',
    text: 'Это последовательность наблюдений, упорядоченных по времени. Для инвестиционного анализа временные ряды цен и доходностей являются базовым типом данных.',
  },
  {
    title: 'Доходность актива',
    text: 'Доходность измеряет относительное изменение цены между двумя моментами времени. Она используется вместо абсолютного изменения, чтобы сравнивать разные активы и периоды.',
  },
]

const appleSeries = [
  { date: '22 Jan', close: 193.89, volume: 60133900 },
  { date: '23 Jan', close: 195.18, volume: 42355600 },
  { date: '24 Jan', close: 194.50, volume: 53631300 },
  { date: '25 Jan', close: 194.17, volume: 54822100 },
  { date: '26 Jan', close: 192.42, volume: 44594000 },
  { date: '29 Jan', close: 191.73, volume: 47145600 },
  { date: '30 Jan', close: 188.04, volume: 55859400 },
  { date: '31 Jan', close: 184.40, volume: 55467800 },
]

const priceCode = `import pandas as pd

aapl = pd.DataFrame(
    {
        "date": pd.to_datetime([
            "2024-01-22", "2024-01-23", "2024-01-24", "2024-01-25",
            "2024-01-26", "2024-01-29", "2024-01-30", "2024-01-31"
        ]),
        "close": [193.89, 195.18, 194.50, 194.17, 192.42, 191.73, 188.04, 184.40],
        "volume": [60133900, 42355600, 53631300, 54822100, 44594000, 47145600, 55859400, 55467800],
    }
)

print(aapl.head())`

const returnsCode = `aapl["return"] = aapl["close"].pct_change()

mean_return = aapl["return"].mean()
volatility = aapl["return"].std(ddof=1)

print(aapl[["date", "close", "return"]].round(4))
print()
print("Средняя дневная доходность:", round(mean_return, 4))
print("Дневная волатильность:", round(volatility, 4))`

function PriceVolumeChart() {
  const maxPrice = Math.max(...appleSeries.map((item) => item.close))
  const minPrice = Math.min(...appleSeries.map((item) => item.close))
  const maxVolume = Math.max(...appleSeries.map((item) => item.volume))

  const pricePoints = appleSeries
    .map((item, index) => {
      const x = 60 + index * 55
      const y = 110 - ((item.close - minPrice) / (maxPrice - minPrice || 1)) * 70
      return `${x},${y}`
    })
    .join(' ')

  return (
    <svg viewBox="0 0 520 240" className="h-full w-full" role="img" aria-label="Цена и объем торгов Apple в конце января 2024 года">
      <line x1="45" y1="190" x2="490" y2="190" stroke="#64748b" strokeWidth="2" />
      <polyline points={pricePoints} fill="none" stroke="#2563eb" strokeWidth="3" />
      {appleSeries.map((item, index) => {
        const x = 60 + index * 55
        const priceY = 110 - ((item.close - minPrice) / (maxPrice - minPrice || 1)) * 70
        const volumeHeight = (item.volume / maxVolume) * 55
        const volumeY = 180 - volumeHeight

        return (
          <g key={item.date}>
            <rect x={x - 12} y={volumeY} width="24" height={volumeHeight} rx="6" fill="#cbd5e1" />
            <circle cx={x} cy={priceY} r="4" fill="#2563eb" />
            <text x={x} y="206" textAnchor="middle" fontSize="10" fill="#334155">
              {item.date}
            </text>
          </g>
        )
      })}
      <text x="384" y="26" fontSize="12" fill="#2563eb">
        close price
      </text>
      <text x="384" y="44" fontSize="12" fill="#64748b">
        volume
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
        subtitle="Работаем с реальным рыночным рядом: загружаем данные Apple, считаем доходности и видим, как код соединяет таблицу, формулу и интерпретацию."
      />

      <section className="grid items-start gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="content-block">
          <MathText
            as="p"
            text="Python в инвестиционном анализе нужен не ради самого программирования, а как единая среда для хранения данных, вычисления показателей и формулировки вывода. Это делает анализ воспроизводимым и избавляет от ручных операций."
            className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
        </section>

        <IdeaCard title="Что такое воспроизводимость">
          <p>
            Результат называется воспроизводимым, если другой человек может получить те же числа и
            выводы на тех же данных, используя тот же код.
          </p>
        </IdeaCard>
      </section>

      <section className="grid items-start gap-4 lg:grid-cols-2">
        <section className="content-block">
          <h3 className="section-title">Реальный ряд: Apple, 22-31 января 2024 года</h3>
          <MathText
            as="p"
            text="Временной ряд — это последовательность наблюдений, упорядоченных по времени. В инвестиционном анализе базовыми примерами являются ряды цен, доходностей и объемов торгов."
            className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
          <div className="mt-4">
            <CodeBlock code={priceCode} title="Python: загружаем реальный ценовой ряд" />
          </div>
        </section>

        <PlotViewer
          title="Цена и объем AAPL"
          caption="Линия показывает цену закрытия, а серые столбцы — объем торгов. Уже на этой стадии видно, что цена и ликвидность читаются из одной и той же таблицы."
        >
          <PriceVolumeChart />
        </PlotViewer>
      </section>

      <ComparisonTable
        columns={appleSeries.map((item) => item.date)}
        rows={[
          {
            label: 'Цена закрытия, USD',
            values: appleSeries.map((item) => item.close.toFixed(2)),
            highlight: true,
          },
          {
            label: 'Объем торгов, млн акций',
            values: appleSeries.map((item) => (item.volume / 1_000_000).toFixed(1)),
          },
        ]}
      />

      <section className="grid items-start gap-4 lg:grid-cols-2">
        <section className="content-block">
          <h3 className="section-title">Переход к доходностям</h3>
          <MathText
            as="p"
            text="Доходность между двумя соседними моментами времени вычисляется как относительное изменение цены. Именно эта величина удобна для дальнейшего статистического анализа."
            className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
          <MathBlock formula={String.raw`r_t = \frac{P_t - P_{t-1}}{P_{t-1}}`} />
          <div className="mt-4">
            <CodeBlock code={returnsCode} title="Python: считаем доходности и волатильность" />
          </div>
        </section>

        <section className="space-y-4">
          <AlertBox title="Что такое волатильность">
            Волатильностью называют статистическую меру изменчивости доходности. На вводном уровне
            ее удобно понимать как количественное выражение неустойчивости ценовой динамики.
          </AlertBox>
          <IdeaCard title="Почему волатильность не равна убытку">
            <p>
              Высокая волатильность означает большие колебания, но не указывает заранее их
              направление. Цена может резко расти и резко падать; обе ситуации увеличивают
              волатильность.
            </p>
          </IdeaCard>
        </section>
      </section>

      <section className="grid items-start gap-4 lg:grid-cols-2">
        <section className="content-block">
          <h3 className="section-title">Еще немного теории о временных рядах</h3>
          <MathText
            as="p"
            text="Ряд цен сам по себе неудобен для статистического сравнения разных активов, потому что абсолютные уровни цен могут сильно различаться. Именно поэтому в анализе чаще переходят от уровней P_t к доходностям r_t."
            className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
          <MathText
            as="p"
            text="После такого перехода можно сравнивать не сами цены, а относительные изменения, что делает выводы более сопоставимыми и математически осмысленными."
            className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
        </section>

        <section className="content-block">
          <h3 className="section-title">Полезные функции Python</h3>
          <div className="mt-4">
            <CodeBlock
              code={`aapl["abs_return"] = aapl["return"].abs()

top_moves = aapl.nlargest(3, "abs_return")[["date", "return", "abs_return"]]
latest_rows = aapl.tail(3)
summary = aapl["return"].agg(["mean", "std", "min", "max"])

print(top_moves.round(4))
print()
print(latest_rows.round(4))
print()
print(summary.round(4))`}
              title="Python: abs(), nlargest(), tail(), agg()"
            />
          </div>
        </section>
      </section>

      <KeyIdea title="Ключевой вывод">
        Python становится инструментом аналитика тогда, когда данные рынка, формулы доходности и
        итоговый комментарий оказываются частью одного воспроизводимого процесса.
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
