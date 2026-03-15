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

const contextNotes = [
  {
    title: 'Мини-анализ',
    text: 'Под мини-анализом понимается компактный, но завершенный цикл: загрузка данных, расчет показателей, визуализация и интерпретация результата.',
  },
  {
    title: 'Ограничение выборки',
    text: 'Короткий временной интервал полезен для обучения, но не достаточен для окончательной инвестиционной рекомендации. Это тоже важная часть корректного вывода.',
  },
]

const appleSeries = [
  { date: '22 Jan', close: 193.89 },
  { date: '23 Jan', close: 195.18 },
  { date: '24 Jan', close: 194.50 },
  { date: '25 Jan', close: 194.17 },
  { date: '26 Jan', close: 192.42 },
  { date: '29 Jan', close: 191.73 },
  { date: '30 Jan', close: 188.04 },
  { date: '31 Jan', close: 184.40 },
]

const miniAnalysisCode = `import pandas as pd

aapl = pd.DataFrame(
    {
        "date": pd.to_datetime([
            "2024-01-22", "2024-01-23", "2024-01-24", "2024-01-25",
            "2024-01-26", "2024-01-29", "2024-01-30", "2024-01-31"
        ]),
        "close": [193.89, 195.18, 194.50, 194.17, 192.42, 191.73, 188.04, 184.40],
    }
)

aapl["return"] = aapl["close"].pct_change()

total_return = aapl["close"].iloc[-1] / aapl["close"].iloc[0] - 1
mean_daily_return = aapl["return"].mean()
daily_volatility = aapl["return"].std(ddof=1)
max_daily_drop = aapl["return"].min()

print("Итоговая доходность:", round(total_return, 4))
print("Средняя дневная доходность:", round(mean_daily_return, 4))
print("Дневная волатильность:", round(daily_volatility, 4))
print("Максимальное дневное снижение:", round(max_daily_drop, 4))`


const metricsCode = `metrics = {
    "total_return": total_return,
    "mean_daily_return": mean_daily_return,
    "daily_volatility": daily_volatility,
    "max_daily_drop": max_daily_drop,
}

best_day = aapl.loc[aapl["return"].idxmax(), ["date", "return"]]
worst_day = aapl.loc[aapl["return"].idxmin(), ["date", "return"]]

print({key: round(value, 4) for key, value in metrics.items()})
print()
print("Лучший день:", best_day.to_dict())
print("Худший день:", worst_day.to_dict())`

const metricsPlaygroundCode = `import pandas as pd

aapl = pd.DataFrame(
    {
        "date": pd.to_datetime([
            "2024-01-22", "2024-01-23", "2024-01-24", "2024-01-25",
            "2024-01-26", "2024-01-29", "2024-01-30", "2024-01-31"
        ]),
        "close": [193.89, 195.18, 194.50, 194.17, 192.42, 191.73, 188.04, 184.40],
    }
)

aapl["return"] = aapl["close"].pct_change()

total_return = aapl["close"].iloc[-1] / aapl["close"].iloc[0] - 1
mean_daily_return = aapl["return"].mean()
daily_volatility = aapl["return"].std(ddof=1)
max_daily_drop = aapl["return"].min()

metrics = {
    "total_return": total_return,
    "mean_daily_return": mean_daily_return,
    "daily_volatility": daily_volatility,
    "max_daily_drop": max_daily_drop,
}

best_day = aapl.loc[aapl["return"].idxmax(), ["date", "return"]]
worst_day = aapl.loc[aapl["return"].idxmin(), ["date", "return"]]

print({key: round(value, 4) for key, value in metrics.items()})
print()
print("Лучший день:", best_day.to_dict())
print("Худший день:", worst_day.to_dict())`

const dailyReturns = [
  { date: '23 Jan', value: 0.0067 },
  { date: '24 Jan', value: -0.0035 },
  { date: '25 Jan', value: -0.0017 },
  { date: '26 Jan', value: -0.0090 },
  { date: '29 Jan', value: -0.0036 },
  { date: '30 Jan', value: -0.0192 },
  { date: '31 Jan', value: -0.0194 },
]

function ReturnsBarChart() {
  const maxAbs = Math.max(...dailyReturns.map((item) => Math.abs(item.value)))
  const zeroY = 110

  return (
    <svg viewBox="0 0 520 220" className="h-full w-full" role="img" aria-label="Дневные доходности Apple в конце января 2024 года">
      <line x1="40" y1={zeroY} x2="490" y2={zeroY} stroke="#64748b" strokeWidth="2" />
      {dailyReturns.map((item, index) => {
        const x = 55 + index * 62
        const barHeight = (Math.abs(item.value) / maxAbs) * 70
        const y = item.value >= 0 ? zeroY - barHeight : zeroY

        return (
          <g key={item.date}>
            <rect
              x={x}
              y={y}
              width="34"
              height={barHeight}
              rx="10"
              fill={item.value >= 0 ? '#059669' : '#e11d48'}
            />
            <text x={x + 17} y="195" textAnchor="middle" fontSize="10" fill="#334155">
              {item.date}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

function Practice1_Screen5({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 1 · Python и рабочая среда"
        title="Первый мини-анализ данных в Python"
        subtitle="Завершаем практику коротким, но полным разбором реального ценового ряда: считаем доходность, волатильность и формулируем корректный аналитический вывод."
      />

      <section className="content-block space-y-4">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
          На этом шаге мы собираем все части вместе. У аналитика редко бывает роскошь бесконечно
          долго изучать один маленький фрагмент данных: чаще нужно быстро построить компактный, но
          честный вывод и ясно обозначить его границы.
        </p>
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
          Такой формат мы называем <strong>мини-анализом</strong> (англ. <em>mini-analysis</em>):
          данные, формула, расчет, визуализация и интерпретация уже присутствуют, но масштаб задачи
          остается учебно управляемым.
        </p>
        <MathText
          as="p"
          text="Мини-анализ — это небольшое исследование, в котором уже присутствуют все основные стадии работы аналитика: данные, формула, расчет, визуализация и интерпретация. На учебном уровне этого достаточно, чтобы сформировать правильную структуру мышления."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <MathText
          as="p"
          text="Если цена в начале интервала обозначена через $P_{\\mathrm{start}}$, а цена в конце через $P_{\\mathrm{end}}$, то итоговая доходность периода выражается как относительное изменение стоимости. Эта запись связывает исходный ряд и итоговый аналитический вывод."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <MathBlock formula={String.raw`R = \frac{P_{\mathrm{end}} - P_{\mathrm{start}}}{P_{\mathrm{start}}}`} />
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
          Здесь <strong>Pstart</strong> — цена в начале интервала, <strong>Pend</strong> — цена в
          конце интервала, а <strong>R</strong> — итоговая доходность за весь рассматриваемый
          период. Эта формула особенно полезна, когда мы хотим быстро свернуть ряд в один итоговый
          показатель, не теряя связи с исходными ценами.
        </p>
        <MathText
          as="p"
          text="При этом учебный мини-анализ не следует подменять полноценной инвестиционной рекомендацией. Короткая выборка полезна для освоения метода, но недостаточна для серьезного заключения без более длинного горизонта и дополнительного контекста."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
      </section>

      <SourceNote>
        Реальные данные примера: закрытия <strong>AAPL</strong> за{' '}
        <strong>22-31 января 2024 года</strong>. Мы сознательно берем короткий фрагмент, чтобы
        показать метод, а не имитировать полноформатную рекомендацию.
      </SourceNote>

      <ComparisonTable
        columns={appleSeries.map((item) => item.date)}
        rows={[
          {
            label: 'Цена закрытия, USD',
            values: appleSeries.map((item) => item.close.toFixed(2)),
            highlight: true,
          },
        ]}
      />

      <section className="space-y-4">
        <section className="content-block">
          <h3 className="section-title">Python: считаем ключевые показатели</h3>
          <MathText
            as="p"
            text="Ниже код дает три базовые характеристики ряда: итоговую доходность периода, среднюю дневную доходность и дневную волатильность. Дополнительно фиксируется наибольшее дневное снижение."
            className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
          <div className="mt-4">
            <ExecutablePythonBlock
              code={miniAnalysisCode}
              title="Python: первый мини-анализ реального ряда"
              packages={['pandas']}
              defaultOpen
              note="Этот блок можно редактировать прямо на странице: например, добавить новую метрику или изменить интервал наблюдения."
            />
          </div>
        </section>

        <section className="content-block">
          <h3 className="section-title">Как интерпретировать показатели</h3>
          <MathText
            as="p"
            text="Итоговая доходность отражает, чем закончился интервал в целом. Средняя дневная доходность показывает среднее направление движения внутри периода. Волатильность измеряет изменчивость, а максимальное дневное снижение помогает увидеть масштаб краткосрочного неблагоприятного движения."
            className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
        </section>
      </section>

      <PlotViewer
        title="Дневные доходности AAPL"
        caption="График показывает, что внутри короткого интервала положительное движение быстро сменилось серией отрицательных доходностей. Это хороший пример того, как визуализация дополняет числовую сводку."
      >
        <ReturnsBarChart />
      </PlotViewer>

      <ThinkQuestion question="Можно ли назвать актив «плохим», если на коротком фрагменте ряда его итоговая доходность оказалась отрицательной?">
        <p>
          Нет. Короткий интервал фиксирует локальный эпизод, а не полную инвестиционную историю
          инструмента. Он может быть полезен для демонстрации метода, но не для окончательного
          стратегического вывода.
        </p>
        <p>
          Хороший аналитик всегда отделяет результат конкретного окна наблюдений от более общего
          суждения об активе. Именно эта дисциплина и отличает анализ от поспешной интерпретации.
        </p>
      </ThinkQuestion>

      <section className="space-y-4">
        <IdeaCard title="Корректная формулировка вывода">
          <p>
            На рассматриваемом интервале акции Apple показали отрицательную итоговую доходность и
            заметную внутрипериодную изменчивость. Следовательно, для очень короткого горизонта
            конец января 2024 года нельзя назвать спокойным участком ряда.
          </p>
        </IdeaCard>

        <AlertBox title="Почему этого мало для инвестиционной рекомендации">
          Несколько торговых дней полезны для демонстрации метода, но слишком коротки для
          полноценного инвестиционного вывода. Корректный аналитик обязан указывать ограничения
          выборки, а не скрывать их.
        </AlertBox>
      </section>

      <section className="space-y-4">
        <section className="content-block">
          <h3 className="section-title">Что еще полезно сказать теоретически</h3>
          <MathText
            as="p"
            text="Даже самый аккуратный мини-анализ не заменяет длинного инвестиционного исследования. Он дает локальный срез поведения ряда, но не отвечает на вопросы о структурном тренде, фундаментальных драйверах бизнеса и сценариях будущего."
            className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
          <MathText
            as="p"
            text="Поэтому корректный вывод в инвестиционном анализе почти всегда имеет границы применимости: нужно явно понимать, к какому интервалу, набору данных и предпосылкам он относится."
            className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
        </section>

        <section className="content-block">
          <h3 className="section-title">Полезные функции Python</h3>
          <div className="mt-4">
            <ExecutablePythonBlock
              code={metricsCode}
              title="Python: idxmax(), idxmin(), to_dict()"
              playgroundCode={metricsPlaygroundCode}
              packages={['pandas']}
              note="Под короткий сниппет подложена полная подготовка данных, чтобы можно было сразу искать лучший и худший дни."
            />
          </div>
        </section>
      </section>

      <HandbookDetails title="Подробнее: как формулировать вывод без логических натяжек">
        <p>
          Корректный вывод всегда содержит три части: что мы наблюдали, на каких данных это
          увидели и где заканчивается область применимости результата.
        </p>
        <p>
          Например: «На интервале 22-31 января 2024 года акции AAPL показали отрицательную
          итоговую доходность и повышенную внутрипериодную изменчивость; этого недостаточно для
          долгосрочной инвестиционной рекомендации, но достаточно для демонстрации базовых метрик
          ряда». Такая формулировка честна и профессиональна.
        </p>
      </HandbookDetails>

      <KeyIdea title="Итог практики 1">
        Инвестиционный анализ как учебная дисциплина начинается с умения видеть путь от данных к
        решению: задать объект анализа, выбрать корректные категории, загрузить реальный ряд,
        посчитать показатели и интерпретировать их без логических натяжек.
      </KeyIdea>

      <nav className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/practice/1/screen/4"
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Назад
        </Link>
        <Link
          to="/practice/2/screen/1"
          className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          К практике 2
        </Link>
      </nav>
    </article>
  )
}

export default Practice1_Screen5
