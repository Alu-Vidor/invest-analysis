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
import { moexSeries } from '../data/practice1RealData'

const contextNotes = [
  {
    title: 'Мини-анализ',
    text: 'Под мини-анализом понимается компактный, но завершенный цикл: загрузка данных, расчет показателей, визуализация и интерпретация результата.',
  },
  {
    title: 'Ограничение выборки',
    text: 'Короткий временной интервал полезен для обучения, но не достаточен для окончательной инвестиционной рекомендации. Это важная часть профессиональной этики.',
  },
]

const miniAnalysisCode = `import pandas as pd

# Данные по индексу МосБиржи (MOEX) - Ноябрь 2024
data = {
    "date": ["2024-11-01", "2024-11-05", "2024-11-06", "2024-11-07", "2024-11-08"],
    "close": [2575.25, 2616.51, 2662.88, 2691.31, 2734.56]
}

moex = pd.DataFrame(data)
moex["date"] = pd.to_datetime(moex["date"])
moex["return"] = moex["close"].pct_change()

total_return = (moex["close"].iloc[-1] / moex["close"].iloc[0]) - 1
daily_vol = moex["return"].std()

print("Мини-анализ Индекса МосБиржи (Ноябрь 2024):")
print(moex[["date", "close", "return"]].round(4))
print(f"\nИтоговая доходность за неделю: {round(total_return * 100, 2)}%")
print(f"Дневная волатильность: {round(daily_vol, 4)}")`

const metricsCode = `best_day_idx = moex["return"].idxmax()
best_day = moex.loc[best_day_idx, "date"].strftime('%Y-%m-%d')
best_val = moex.loc[best_day_idx, "return"]

print(f"Лучший день: {best_day} ({round(best_val * 100, 2)}%)")`

const metricsPlaygroundCode = `import pandas as pd

data = {
    "date": ["2024-11-01", "2024-11-05", "2024-11-06", "2024-11-07", "2024-11-08"],
    "close": [2575.25, 2616.51, 2662.88, 2691.31, 2734.56]
}

moex = pd.DataFrame(data)
moex["date"] = pd.to_datetime(moex["date"])
moex["return"] = moex["close"].pct_change()

best_day_idx = moex["return"].idxmax()
best_day = moex.loc[best_day_idx, "date"].strftime('%Y-%m-%d')
best_val = moex.loc[best_day_idx, "return"]

print(f"Анализ экстремумов MOEX:")
print(f"Лучший день периода: {best_day}")
print(f"Доходность в этот день: {round(best_val * 100, 2)}%")`

const dailyReturns = [
  { date: '05 Nov', value: 0.0160 },
  { date: '06 Nov', value: 0.0177 },
  { date: '07 Nov', value: 0.0107 },
  { date: '08 Nov', value: 0.0161 },
]

function ReturnsBarChart() {
  const maxAbs = Math.max(...dailyReturns.map((item) => Math.abs(item.value)))
  const zeroY = 110

  return (
    <svg viewBox="0 0 520 220" className="h-full w-full">
      <line x1="40" y1={zeroY} x2="490" y2={zeroY} stroke="#64748b" strokeWidth="2" />
      {dailyReturns.map((item, index) => {
        const x = 90 + index * 90
        const barHeight = (Math.abs(item.value) / maxAbs) * 70
        const y = item.value >= 0 ? zeroY - barHeight : zeroY

        return (
          <g key={item.date}>
            <rect
              x={x}
              y={y}
              width="40"
              height={barHeight}
              rx="8"
              fill={item.value >= 0 ? '#10b981' : '#f43f5e'}
            />
            <text x={x + 20} y="195" textAnchor="middle" fontSize="10" fill="#334155">
              {item.date}
            </text>
            <text x={x + 20} y={y - 5} textAnchor="middle" fontSize="10" fill="#065f46" fontWeight="bold">
              +{ (item.value * 100).toFixed(1) }%
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
        badge="Практика 1 · Завершение"
        title="Ваш первый мини-анализ данных в Python"
        subtitle="Завершаем вводную практику коротким и честным разбором динамики российского рынка в ноябре 2024 года."
      />

      <section className="content-block space-y-4">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
          На финальном шаге мы собираем все части воедино. Профессиональный аналитик умеет быстро 
          сделать срез данных и сформулировать честный вывод, не выдавая краткосрочные колебания 
          за долгосрочные тренды.
        </p>
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
          Мы проведем <strong>мини-анализ</strong> (англ. <em>mini-analysis</em>) на примере 
          <strong>Индекса МосБиржи (MOEX)</strong>. В начале ноября 2024 года рынок показал 
          активное восстановление после затяжного снижения — это отличный пример для расчета 
          итоговой доходности и дневного риска.
        </p>
        <MathText
          as="p"
          text="Мини-анализ — это полный цикл: загрузка данных, расчет формул, визуализация и интерпретация. Пусть данных немного, но структура работы должна быть эталонной."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <MathText
          as="p"
          text="Итоговая доходность интервала ($R_{\mathrm{total}}$) рассчитывается как изменение стоимости от первого до последнего дня. Это 'взгляд сверху' на результат инвестиции за период."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <MathBlock formula={String.raw`R_{\mathrm{total}} = \frac{I_{\mathrm{end}} - I_{\mathrm{start}}}{I_{\mathrm{start}}}`} />
      </section>

      <SourceNote>
        Реальные данные: значения <strong>Индекса МосБиржи (IMOEX)</strong> за первую неделю ноября 2024 года.
      </SourceNote>

      <ComparisonTable
        columns={moexSeries.map((item) => item.date)}
        rows={[
          {
            label: 'Индекс MOEX',
            values: moexSeries.map((item) => item.close.toFixed(1)),
            highlight: true,
          },
        ]}
      />

      <section className="space-y-4">
        <section className="content-block">
          <h3 className="section-title">Python: расчет итогов недели</h3>
          <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
            Ниже представлен код для расчета доходности и волатильности. Обратите внимание, 
            как быстро Python позволяет выделить главные характеристики из списка цен.
          </p>
          <div className="mt-4">
            <ExecutablePythonBlock
              code={miniAnalysisCode}
              title="Python: расчет MOEX за ноябрь 2024"
              packages={['pandas']}
              defaultOpen
              note="Попробуйте изменить Pend (последнее значение), чтобы увидеть, как изменится итоговая доходность периода."
            />
          </div>
        </section>

        <section className="content-block">
          <h3 className="section-title">Интерпретация цифр</h3>
          <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
            Рост индекса на 6% за неделю — это сильный сигнал, но аналитик также смотрит на 
            волатильность. Высокий разброс дневных значений говорит о том, что рост сопровождается 
            неуверенностью участников рынка.
          </p>
        </section>
      </section>

      <PlotViewer
        title="Дневные доходности IMOEX (Ноябрь 2024)"
        caption="Зеленые столбцы показывают ежедневный рост. Аналитик видит здесь 'единодушие' рынка в течение нескольких дней, что часто предшествует более широким изменениям или, наоборот, техническим коррекциям."
      >
        <ReturnsBarChart />
      </PlotViewer>

      <ThinkQuestion question="Можно ли на основе этой недели сделать вывод, что российский рынок будет расти весь следующий год?">
        <p>
          Конечно нет. Мини-анализ по определению ограничен во времени. Он фиксирует локальную 
          динамику (например, реакцию на новости или технический отскок).
        </p>
        <p>
          Профессионализм аналитика заключается в умении разделять краткосрочные 'шоки' и 
          фундаментальные факторы, которые мы будем изучать в следующих практиках.
        </p>
      </ThinkQuestion>

      <section className="space-y-4">
        <IdeaCard title="Корректная формулировка вывода">
          <p>
            На интервале 1-8 ноября 2024 года индекс МосБиржи продемонстрировал уверенное восстановление 
            на 6.2%. Такая высокая доходность при умеренной волатильности указывает на позитивный импульс 
            в данный момент, однако для стратегических решений требуется анализ более длинных рядов.
          </p>
        </IdeaCard>

        <AlertBox title="Правило аналитика #1">
          Всегда указывайте границы вашего исследования. 'На этой неделе...' — звучит профессиональнее, 
          чем 'Рынок теперь всегда будет...'.
        </AlertBox>
      </section>

      <section className="space-y-4">
        <section className="content-block">
          <h3 className="section-title">Полезные функции Python для финала</h3>
          <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
            Для быстрого поиска 'лучшего дня' или форматирования дат используйте idxmax и strftime:
          </p>
          <div className="mt-4">
            <ExecutablePythonBlock
              code={metricsCode}
              title="Python: поиск экстремумов"
              playgroundCode={metricsPlaygroundCode}
              packages={['pandas']}
              note="В интерактивном режиме вы можете найти дату самого резкого движения в любую сторону."
            />
          </div>
        </section>
      </section>

      <HandbookDetails title="Итоги Практики 1">
        <p>
          Мы прошли путь от базового уравнения инвестиций до работы с реальными временными рядами в Python. 
          Вы научились:
        </p>
        <ul className="list-disc ml-5 mt-2 space-y-1 text-slate-700 dark:text-slate-200">
          <li>Формализовать денежные потоки через CF_t.</li>
          <li>Учитывать риски и ликвидность на реальных примерах (OFZ, Nikkei).</li>
          <li>Разлагать выручку технологических гигантов (Tencent).</li>
          <li>Использовать Python для воспроизводимых расчетов.</li>
        </ul>
      </HandbookDetails>

      <KeyIdea title="Ключевой итог">
        Инвестиционный анализ — это не только математика, но и дисциплина мышления. 
        Умение переложить реальный рыночный кейс на язык чисел и кода — ваш первый 
        самый важный навык.
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
          Перейти к практике 2
        </Link>
      </nav>
    </article>
  )
}

export default Practice1_Screen5
