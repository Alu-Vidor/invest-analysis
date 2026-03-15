import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ComparisonTable from '../components/ComparisonTable'
import CourseHeader from '../components/CourseHeader'
import ExecutablePythonBlock from '../components/ExecutablePythonBlock'
import HandbookDetails from '../components/HandbookDetails'
import IdeaCard from '../components/IdeaCard'
import KeyIdea from '../components/KeyIdea'
import MathBlock from '../components/MathBlock'
import MathText from '../components/MathText'
import PlotViewer from '../components/PlotViewer'
import SourceNote from '../components/SourceNote'
import ThinkQuestion from '../components/ThinkQuestion'
import { treasuryCurveJan022024 } from '../data/practice2RealData'

const contextNotes = [
  {
    title: 'Временная стоимость денег',
    text: 'Одна и та же денежная сумма имеет разную ценность в зависимости от момента получения: деньги сегодня можно инвестировать уже сейчас, а деньги в будущем еще только предстоит дождаться.',
  },
  {
    title: 'Кривая ставок',
    text: 'В практическом анализе ставка зависит от срока. Поэтому вместо одной абстрактной нормы часто используют набор рыночных ставок по различным горизонтам.',
  },
]

const curveCode = `import pandas as pd

curve = pd.DataFrame(
    {
        "maturity_years": [1, 2, 3, 5, 10, 30],
        "yield_pct": [4.80, 4.33, 4.09, 3.93, 3.95, 4.08],
    }
)

curve["rate"] = curve["yield_pct"] / 100
curve["discount_factor"] = 1 / (1 + curve["rate"]) ** curve["maturity_years"]
curve["pv_of_1000_usd"] = 1000 * curve["discount_factor"]

print(curve.round(4))
print()
print("Best PV for 1000 USD:", round(curve["pv_of_1000_usd"].max(), 2))`

const utilityCode = `curve = [
    ("1Y", 4.80),
    ("2Y", 4.33),
    ("3Y", 4.09),
    ("5Y", 3.93),
    ("10Y", 3.95),
    ("30Y", 4.08),
]

discount_factors = [
    (label, round(1 / (1 + rate / 100) ** years, 4))
    for label, rate, years in [
        ("1Y", 4.80, 1),
        ("2Y", 4.33, 2),
        ("3Y", 4.09, 3),
        ("5Y", 3.93, 5),
        ("10Y", 3.95, 10),
        ("30Y", 4.08, 30),
    ]
]

print(discount_factors)
print("Smallest factor:", min(value for _, value in discount_factors))`

function TreasuryCurveChart() {
  const maxYield = Math.max(...treasuryCurveJan022024.map((row) => row.yieldPct))
  const minYield = Math.min(...treasuryCurveJan022024.map((row) => row.yieldPct))
  const points = treasuryCurveJan022024
    .map((row, index) => {
      const x = 70 + index * 88
      const y = 165 - ((row.yieldPct - minYield) / (maxYield - minYield || 1)) * 90
      return `${x},${y}`
    })
    .join(' ')

  return (
    <svg
      viewBox="0 0 620 250"
      className="h-full w-full"
      role="img"
      aria-label="Кривая доходностей казначейских бумаг США на 2 января 2024 года"
    >
      <line x1="50" y1="185" x2="580" y2="185" stroke="#64748b" strokeWidth="2" />
      <polyline points={points} fill="none" stroke="#2563eb" strokeWidth="3" />
      {treasuryCurveJan022024.map((row, index) => {
        const x = 70 + index * 88
        const y = 165 - ((row.yieldPct - minYield) / (maxYield - minYield || 1)) * 90

        return (
          <g key={row.label}>
            <circle cx={x} cy={y} r="5" fill="#2563eb" />
            <text x={x} y="208" textAnchor="middle" fontSize="12" fill="#334155">
              {row.label}
            </text>
            <text x={x} y={y - 12} textAnchor="middle" fontSize="11" fill="#0f172a">
              {row.yieldPct.toFixed(2)}%
            </text>
          </g>
        )
      })}
      <text x="12" y="26" fontSize="12" fill="#475569">
        доходность, %
      </text>
    </svg>
  )
}

function Practice2_Screen2({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 2 · Денежные потоки и дисконтирование"
        title="Временная стоимость денег"
        subtitle="Переходим от календаря платежей к их стоимости. Для примеров используем реальные доходности казначейских бумаг США на 2 января 2024 года как рыночную основу для дисконтирования."
      />

      <section className="content-block space-y-4">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
          Если клиент говорит: «Через десять лет я получу 1000 долларов», у нас сразу возникает
          встречный вопрос: сколько эти деньги стоят сегодня? Именно так на бытовом языке
          проявляется <strong>временная стоимость денег</strong> (англ. <em>time value of money</em>).
        </p>
        <MathText
          as="p"
          text="Если капитал можно вложить под ставку $r$, то текущая и будущая суммы неравноценны. Операция наращения показывает, во что превратится сумма сегодня, а операция дисконтирования переводит будущий платеж в стоимость на текущую дату."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <MathBlock formula={String.raw`FV_t = PV \cdot (1+r)^t`} />
        <MathBlock formula={String.raw`PV = \frac{FV_t}{(1+r)^t}`} />
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
          Здесь <strong>PV</strong> — <strong>приведенная стоимость</strong> (англ.{' '}
          <em>present value</em>), <strong>FVₜ</strong> — будущая стоимость через{' '}
          <strong>t</strong> периодов, а <strong>r</strong> — ставка за один период. Чем выше
          ставка или чем дальше платеж, тем меньше его текущая ценность.
        </p>
        <MathText
          as="p"
          text="Если ставка различается по срокам, аналитик использует временную структуру ставок. В простейшем приближении коэффициент дисконтирования для горизонта $t$ лет можно записать как $DF_t = (1+y_t)^{-t}$, где $y_t$ - рыночная доходность соответствующего срока."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <MathBlock formula={String.raw`DF_t = \frac{1}{(1+y_t)^t}`} />
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
          Во второй формуле <strong>DFₜ</strong> — коэффициент дисконтирования, а{' '}
          <strong>yₜ</strong> — рыночная ставка для срока <strong>t</strong>. Именно поэтому в
          практике мы спрашиваем не просто «какая ставка?», а «какая ставка на нужный срок?».
        </p>
      </section>

      <IdeaCard title="Теоретическая оговорка, которая важна для корректности">
        <p>
          В строгой оценке купонных потоков обычно используют не par yield curve, а spot curve, то есть набор
          безрисковых ставок для отдельных дат платежей. В этой практике казначейские доходности выступают как
          прозрачное учебное приближение рыночной ставки по сроку. Такой шаг допустим для освоения логики
          дисконтирования и широко используется на вводном этапе.
        </p>
      </IdeaCard>

      <SourceNote>
        Реальные рыночные данные: доходности <strong>U.S. Treasury</strong> на{' '}
        <strong>2 января 2024 года</strong> по срокам от 1 до 30 лет. На их основе строим
        учебную таблицу коэффициентов дисконтирования.
      </SourceNote>

      <ComparisonTable
        columns={treasuryCurveJan022024.map((row) => row.label)}
        rows={[
          {
            label: 'Доходность, % годовых',
            values: treasuryCurveJan022024.map((row) => row.yieldPct.toFixed(2)),
          },
          {
            label: 'Коэффициент дисконтирования',
            values: treasuryCurveJan022024.map((row) => row.discountFactor.toFixed(4)),
            highlight: true,
          },
          {
            label: 'PV будущих 1000 USD',
            values: treasuryCurveJan022024.map((row) => (1000 * row.discountFactor).toFixed(2)),
          },
        ]}
      />

      <PlotViewer
        title="Реальная кривая доходностей как база для оценки времени"
        caption="Даже на одном и том же рынке стоимость денег зависит от горизонта. Поэтому в профессиональном анализе вопрос звучит не просто «какая ставка?», а «какая ставка для данного срока и данного типа риска?»."
      >
        <TreasuryCurveChart />
      </PlotViewer>

      <ThinkQuestion question="Что произойдет с приведенной стоимостью фиксированного будущего платежа, если ставка дисконтирования станет очень большой?">
        <p>
          Приведенная стоимость будет стремиться к нулю. Экономическая интуиция здесь простая:
          при очень высокой альтернативной доходности деньги, которые придут далеко в будущем,
          почти не влияют на решение сегодня.
        </p>
        <p>
          Именно поэтому долгосрочные проекты особенно чувствительны к ставке дисконтирования:
          небольшое изменение ставки может сильно сдвинуть их текущую оценку.
        </p>
      </ThinkQuestion>

      <section className="content-block space-y-4">
        <h3 className="section-title">Что показывает таблица коэффициентов</h3>
        <MathText
          as="p"
          text="Для будущего платежа в 1000 USD коэффициент дисконтирования меньше единицы и убывает с ростом срока. Экономический смысл прост: чем дальше платеж, тем сильнее влияние альтернативной доходности и ожидания по времени. Поэтому одинаковые по номиналу суммы на горизонтах 1 и 10 лет не могут сравниваться напрямую."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <MathText
          as="p"
          text="В реальной деятельности этот принцип лежит в основе оценки облигаций, инвестиционных проектов, пенсионных обязательств и моделей DCF. Аналитик фактически переводит все будущие суммы в общий масштаб стоимости на одну дату."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
      </section>

      <HandbookDetails title="Подробнее про par curve и spot curve">
        <p>
          В строгой профессиональной оценке купонные платежи обычно дисконтируют по спот-ставкам,
          то есть по ставкам для конкретных дат платежей. Они точнее отражают временную структуру
          безрисковой стоимости денег.
        </p>
        <p>
          В этой практике мы используем казначейскую кривую как прозрачное учебное приближение.
          Так вы видите саму идею дисконтирования, не утопая сразу в технических нюансах
          бутстреппинга.
        </p>
      </HandbookDetails>

      <section className="content-block space-y-4">
        <h3 className="section-title">Python: строим рыночную таблицу коэффициентов</h3>
        <MathText
          as="p"
          text="Python удобно использовать не только для вычисления формулы, но и для структурирования рынка данных. Ниже одна таблица сразу содержит срок, доходность, коэффициент дисконтирования и текущую стоимость условного будущего платежа."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <ExecutablePythonBlock
          code={curveCode}
          title="Python: доходности Treasury и коэффициенты дисконтирования"
          packages={['pandas']}
          note="Попробуйте заменить одну из доходностей и посмотрите, как меняется текущая стоимость будущих 1000 USD. Это прямое соединение рыночных данных и инвестиционного вывода."
        />
      </section>

      <section className="content-block space-y-4">
        <h3 className="section-title">Полезные функции Python для работы со ставками</h3>
        <MathText
          as="p"
          text="В задачах анализа кривой ставок регулярно используются генераторы списков, `min()` и `max()` для поиска экстремумов, а в табличных расчетах - `idxmax()` и `idxmin()`, когда нужно найти строку с наибольшей или наименьшей текущей стоимостью. Эти операции помогают быстро интерпретировать результат, а не только получить число."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <ExecutablePythonBlock
          code={utilityCode}
          title="Python: списковые выражения и min()"
          note="Фрагмент показывает, как из набора рыночных ставок быстро получить уже интерпретируемый объект - список коэффициентов дисконтирования по срокам."
        />
      </section>

      <KeyIdea title="Ключевой вывод">
        Временная стоимость денег - это не абстрактное рассуждение, а способ перевода рыночной информации в
        коэффициенты сравнения. Как только ставка задана по сроку, будущий платеж можно привести к текущей
        стоимости и включить в решение.
      </KeyIdea>

      <nav className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/practice/2/screen/1"
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Назад
        </Link>
        <Link
          to="/practice/2/screen/3"
          className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Далее: 3. Операции наращения и дисконтирования
        </Link>
      </nav>
    </article>
  )
}

export default Practice2_Screen2
