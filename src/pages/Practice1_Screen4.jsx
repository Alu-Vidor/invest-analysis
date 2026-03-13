import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AlertBox from '../components/AlertBox'
import ExecutablePythonBlock from '../components/ExecutablePythonBlock'
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
    text: 'Это последовательность наблюдений, упорядоченных по времени. Для инвестора базовыми временными рядами являются цены, доходности и объемы торгов.',
  },
  {
    title: 'Воспроизводимость',
    text: 'Аналитический результат считается воспроизводимым, если тот же код на тех же данных приводит к тем же числам и выводам.',
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


const returnsPlaygroundCode = `import pandas as pd

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

aapl["return"] = aapl["close"].pct_change()

mean_return = aapl["return"].mean()
volatility = aapl["return"].std(ddof=1)

print(aapl[["date", "close", "return"]].round(4))
print()
print("Средняя дневная доходность:", round(mean_return, 4))
print("Дневная волатильность:", round(volatility, 4))`

const returnsToolsCode = `aapl["abs_return"] = aapl["return"].abs()

largest_moves = aapl.nlargest(3, "abs_return")[["date", "return", "abs_return"]]
latest_rows = aapl.tail(3)
summary = aapl["return"].agg(["mean", "std", "min", "max"])

print(largest_moves.round(4))
print()
print(latest_rows.round(4))
print()
print(summary.round(4))`

const returnsToolsPlaygroundCode = `import pandas as pd

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

aapl["return"] = aapl["close"].pct_change()
aapl["abs_return"] = aapl["return"].abs()

largest_moves = aapl.nlargest(3, "abs_return")[["date", "return", "abs_return"]]
latest_rows = aapl.tail(3)
summary = aapl["return"].agg(["mean", "std", "min", "max"])

print(largest_moves.round(4))
print()
print(latest_rows.round(4))
print()
print(summary.round(4))`

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
        subtitle="Переходим от таблицы цен к воспроизводимому анализу: загружаем реальные данные Apple, строим доходности и вводим волатильность как статистическую меру риска."
      />

      <section className="content-block space-y-4">
        <MathText
          as="p"
          text="Python нужен инвестиционному аналитику не сам по себе, а как среда, в которой данные, формулы, визуализация и вывод оказываются частями одного процесса. Это позволяет не только считать показатели, но и проверять, откуда они возникли."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <MathText
          as="p"
          text="Если обозначить цену актива в момент $t$ через $P_t$, то ценовой ряд можно записать как последовательность $\\{P_t\\}_{t=1}^{n}$. Именно с такой последовательностью аналитик работает в коде: загружает ее, преобразует и затем переводит в язык доходностей."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <MathBlock formula={String.raw`\{P_t\}_{t=1}^{n}`} />
      </section>

      <section className="grid items-start gap-4 md:grid-cols-2">
        <article className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">Временной ряд</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            Временной ряд представляет собой упорядоченную по времени последовательность
            наблюдений. В инвестиционном анализе это могут быть цены, доходности, объемы торгов,
            дивиденды и любые другие характеристики, меняющиеся от периода к периоду.
          </p>
        </article>

        <article className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">Воспроизводимость</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            Анализ считается воспроизводимым, если другой исследователь может получить те же
            результаты на тех же данных. Для профессиональной работы это принципиально: решение
            должно опираться не на ручные догадки, а на проверяемую цепочку вычислений.
          </p>
        </article>
      </section>

      <section className="space-y-4">
        <section className="content-block space-y-4">
          <h3 className="section-title">Реальный ряд: Apple, 22-31 января 2024 года</h3>
          <MathText
            as="p"
            text="Ниже используется короткий фрагмент реального ряда AAPL. На нем удобно показать, как из одной и той же таблицы извлекаются сразу несколько характеристик: уровень цены, объем торгов и дальнейшие производные показатели."
            className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
          <ExecutablePythonBlock
            code={priceCode}
            title="Python: загружаем реальный ценовой ряд"
            packages={['pandas']}
            note="Это точка входа в анализ: можно изменить цены или добавить новые наблюдения, а затем перейти к доходностям."
          />
        </section>

        <PlotViewer
          title="Цена и объем AAPL"
          caption="Линия показывает цену закрытия, а серые столбцы — объем торгов. Уже на этом этапе видно, что аналитик работает не с абстрактной формулой, а с конкретной структурой наблюдений во времени."
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

      <section className="content-block space-y-4">
        <h3 className="section-title">Переход к доходностям и волатильности</h3>
        <MathText
          as="p"
          text="Абсолютные уровни цен неудобны для сравнения: акция по цене 20 долларов и акция по цене 200 долларов могут двигаться одинаково в относительном смысле, но по-разному в абсолютных изменениях. Поэтому аналитик переходит от уровней $P_t$ к доходностям $r_t$."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <MathBlock formula={String.raw`r_t = \frac{P_t - P_{t-1}}{P_{t-1}}`} />
        <MathText
          as="p"
          text="После этого можно считать среднее значение доходности и меру ее разброса. На вводном уровне именно разброс доходностей удобнее всего связывать с риском краткосрочного поведения ряда."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <div className="grid gap-4 lg:grid-cols-2">
          <MathBlock formula={String.raw`\bar{r} = \frac{1}{n} \sum_{t=1}^{n} r_t`} />
          <MathBlock formula={String.raw`s = \sqrt{\frac{1}{n-1}\sum_{t=1}^{n}(r_t-\bar{r})^2}`} />
        </div>
        <MathText
          as="p"
          text="Здесь $\\bar{r}$ — средняя доходность выборки, а $s$ — выборочная волатильность, то есть стандартное отклонение доходностей. Именно эту величину Python вычисляет с помощью `std(ddof=1)`."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
      </section>

      <section className="grid items-start gap-4 md:grid-cols-2">
        <AlertBox title="Что такое волатильность">
          Волатильность — это статистическая мера изменчивости доходности. Чем сильнее доходности
          отклоняются от своего среднего уровня, тем выше волатильность и тем менее ровным выглядит
          поведение актива на выбранном горизонте.
        </AlertBox>

        <IdeaCard title="Почему волатильность не равна убытку">
          <p>
            Высокая волатильность означает большие колебания, но не задает их направление. Ряд
            может быть волатильным и при резком росте, и при резком снижении. Поэтому волатильность
            интерпретируется как мера неустойчивости, а не как готовый знак плохого результата.
          </p>
        </IdeaCard>
      </section>

      <section className="space-y-4">
        <section className="content-block space-y-4">
          <h3 className="section-title">Python: считаем доходности и волатильность</h3>
          <MathText
            as="p"
            text="В коде переход от цены к доходности делается одной строкой через `pct_change()`. После этого можно сразу рассчитать среднюю дневную доходность и выборочную волатильность, не теряя связи с исходной таблицей."
            className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
          <ExecutablePythonBlock
            code={returnsCode}
            title="Python: доходности и волатильность"
            playgroundCode={returnsPlaygroundCode}
            packages={['pandas']}
            note="Песочница сначала создает таблицу `aapl`, а затем выполняет короткий фрагмент с расчетом доходностей."
          />
        </section>

        <section className="content-block space-y-4">
          <h3 className="section-title">Полезные функции Python</h3>
          <ExecutablePythonBlock
            code={returnsToolsCode}
            title="Python: abs(), nlargest(), tail(), agg()"
            playgroundCode={returnsToolsPlaygroundCode}
            packages={['pandas']}
            note="В интерактивном блоке уже подготовлены и цены, и доходности, поэтому можно сразу исследовать наибольшие движения в ряду."
          />
        </section>
      </section>

      <KeyIdea title="Ключевой вывод">
        Python становится рабочим инструментом аналитика тогда, когда ряд цен переводится в
        воспроизводимую последовательность вычислений: таблица, доходности, волатильность,
        визуализация и корректная интерпретация образуют единый аналитический контур.
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
