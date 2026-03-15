import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ExecutablePythonBlock from '../components/ExecutablePythonBlock'
import ComparisonTable from '../components/ComparisonTable'
import CourseHeader from '../components/CourseHeader'
import HandbookDetails from '../components/HandbookDetails'
import KeyIdea from '../components/KeyIdea'
import MathBlock from '../components/MathBlock'
import MathText from '../components/MathText'
import PlotViewer from '../components/PlotViewer'
import SourceNote from '../components/SourceNote'
import ThinkQuestion from '../components/ThinkQuestion'

const contextNotes = [
  {
    title: 'Цифровая экономика',
    text: 'Это среда, в которой стоимость компании все чаще формируется цифровыми сервисами, платформами, данными и сетевыми эффектами.',
  },
  {
    title: 'Сегментный анализ',
    text: 'Инвестор оценивает не только общий объем выручки, но и ее внутреннюю структуру: какие направления формируют более устойчивый и прогнозируемый денежный поток.',
  },
]

const appleServices = [
  { quarter: 'Q1 FY24', total: 119.58, services: 23.12 },
  { quarter: 'Q2 FY24', total: 90.75, services: 23.87 },
  { quarter: 'Q3 FY24', total: 85.78, services: 24.21 },
  { quarter: 'Q4 FY24', total: 94.93, services: 24.97 },
]

const servicesCode = `import pandas as pd

apple_segments = pd.DataFrame(
    {
        "quarter": ["Q1 FY24", "Q2 FY24", "Q3 FY24", "Q4 FY24"],
        "total_revenue_billion_usd": [119.58, 90.75, 85.78, 94.93],
        "services_revenue_billion_usd": [23.12, 23.87, 24.21, 24.97],
    }
)

apple_segments["services_share"] = (
    apple_segments["services_revenue_billion_usd"]
    / apple_segments["total_revenue_billion_usd"]
).round(3)

apple_segments["services_growth"] = (
    apple_segments["services_revenue_billion_usd"].pct_change()
).round(3)

print(apple_segments)`


const servicesToolsCode = `apple_segments["services_share_pct"] = (
    apple_segments["services_share"] * 100
).round(1)

leaders = apple_segments.sort_values("services_share_pct", ascending=False)
recent = apple_segments.tail(2)
later_quarters = apple_segments.query("quarter != 'Q1 FY24'")

print(leaders[["quarter", "services_share_pct"]])
print()
print(recent)
print()
print(later_quarters[["quarter", "services_growth"]])`

const servicesToolsPlaygroundCode = `import pandas as pd

apple_segments = pd.DataFrame(
    {
        "quarter": ["Q1 FY24", "Q2 FY24", "Q3 FY24", "Q4 FY24"],
        "total_revenue_billion_usd": [119.58, 90.75, 85.78, 94.93],
        "services_revenue_billion_usd": [23.12, 23.87, 24.21, 24.97],
    }
)

apple_segments["services_share"] = (
    apple_segments["services_revenue_billion_usd"]
    / apple_segments["total_revenue_billion_usd"]
).round(3)

apple_segments["services_growth"] = (
    apple_segments["services_revenue_billion_usd"].pct_change()
).round(3)

apple_segments["services_share_pct"] = (
    apple_segments["services_share"] * 100
).round(1)

leaders = apple_segments.sort_values("services_share_pct", ascending=False)
recent = apple_segments.tail(2)
later_quarters = apple_segments.query("quarter != 'Q1 FY24'")

print(leaders[["quarter", "services_share_pct"]])
print()
print(recent)
print()
print(later_quarters[["quarter", "services_growth"]])`

function ServicesShareChart() {
  return (
    <svg viewBox="0 0 520 240" className="h-full w-full" role="img" aria-label="Доля сервисной выручки Apple в 2024 финансовом году">
      <line x1="50" y1="190" x2="490" y2="190" stroke="#64748b" strokeWidth="2" />
      {appleServices.map((item, index) => {
        const share = item.services / item.total
        const x = 70 + index * 105
        const totalHeight = (item.total / 120) * 130
        const servicesHeight = share * totalHeight
        const y = 190 - totalHeight
        const servicesY = 190 - servicesHeight

        return (
          <g key={item.quarter}>
            <rect x={x} y={y} width="50" height={totalHeight} rx="12" fill="#cbd5e1" />
            <rect x={x} y={servicesY} width="50" height={servicesHeight} rx="12" fill="#2563eb" />
            <text x={x + 25} y="208" textAnchor="middle" fontSize="12" fill="#334155">
              {item.quarter.replace(' FY24', '')}
            </text>
            <text x={x + 25} y={servicesY - 8} textAnchor="middle" fontSize="12" fill="#0f172a">
              {(share * 100).toFixed(1)}%
            </text>
          </g>
        )
      })}
      <text x="360" y="34" fontSize="12" fill="#2563eb">
        services
      </text>
      <text x="360" y="52" fontSize="12" fill="#64748b">
        total revenue
      </text>
    </svg>
  )
}

function Practice1_Screen3({ setContext, setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
    if (setContext) {
      setContext({
        title: 'Инвестиционный анализ в цифровой экономике',
        text: 'В цифровой экономике инвестор анализирует не только масштаб бизнеса, но и структуру выручки, повторяемость доходов и роль сервисных сегментов.',
      })
    }
  }, [setContext, setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 1 · Основы инвестиционного анализа"
        title="Инвестиционный анализ в цифровой экономике"
        subtitle="Показываем, почему в современной компании важно анализировать не только общий объем выручки, но и ее состав, устойчивость и повторяемость."
      />

      <section className="content-block space-y-4">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
          Когда мы анализируем технологическую компанию, нас интересует не только общий объем
          выручки, но и то, насколько эта выручка повторяема. Для инвестора это почти жизненный
          вопрос: одно дело — разовый всплеск продаж, другое — поток подписок и сервисных
          комиссий, который возвращается квартал за кварталом.
        </p>
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
          Поэтому на экране появляется <strong>сегментный анализ</strong> (англ.{' '}
          <em>segment analysis</em>) и <strong>сервисная выручка</strong> (англ.{' '}
          <em>services revenue</em>) как важные сигналы качества цифровой бизнес-модели.
        </p>
        <MathText
          as="p"
          text="В цифровой экономике стоимость компании все чаще создается платформами, сервисами, программными продуктами и экосистемными связями. Поэтому инвестору уже недостаточно знать только общую выручку: необходимо понимать, какая ее часть формируется более устойчивыми и повторяемыми источниками."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <MathText
          as="p"
          text="Если обозначить сервисную выручку через $S_t$, а общую выручку компании через $R_t$, то ключевой характеристикой структуры бизнеса становится доля сервисного сегмента."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <MathBlock formula={String.raw`s_t = \frac{S_t}{R_t}`} />
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
          Здесь <strong>Sₜ</strong> — выручка сервисного сегмента в период <strong>t</strong>, а{' '}
          <strong>Rₜ</strong> — общая выручка компании в тот же период. Чем выше и устойчивее
          отношение <strong>sₜ</strong>, тем больше вклад регулярного цифрового сегмента в общую
          структуру бизнеса.
        </p>
        <MathText
          as="p"
          text="Показатель $s_t$ не заменяет анализ абсолютных величин, но помогает увидеть, насколько заметную роль играют цифровые сервисы в формировании дохода. Если сервисная составляющая велика и устойчива, будущие денежные потоки компании обычно легче прогнозировать."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <MathText
          as="p"
          text="Для динамического анализа полезно рассматривать и темп роста сервисной выручки. Он показывает, как меняется цифровой сегмент от периода к периоду и не исчерпывается простым наблюдением за уровнем продаж."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <MathBlock formula={String.raw`g_t = \frac{S_t - S_{t-1}}{S_{t-1}}`} />
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
          Во второй формуле <strong>gₜ</strong> — темп роста сервисной выручки, то есть
          относительное изменение показателя между двумя соседними периодами. Он помогает увидеть
          не только уровень цифрового сегмента, но и его динамику.
        </p>
      </section>

      <section className="grid items-start gap-4 md:grid-cols-2">
        <article className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">Сервисная выручка</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            Сервисной выручкой называют доходы от подписок, цифрового контента, облачных услуг,
            платформенных комиссий и других нематериальных сервисов. В отличие от разовой продажи
            устройства, такие поступления нередко повторяются и поэтому особенно важны для оценки
            устойчивости бизнеса.
          </p>
        </article>

        <article className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">Сегментный анализ</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            Сегментный анализ рассматривает компанию через отдельные направления бизнеса. Он нужен
            затем, чтобы отделить масштаб от качества роста: одинаковая общая выручка может иметь
            разную инвестиционную ценность, если в одном случае она формируется повторяемыми
            сервисами, а в другом зависит от более цикличных продаж.
          </p>
        </article>
      </section>

      <section className="content-block space-y-4">
        <h3 className="section-title">Реальный пример: Apple, 2024 финансовый год</h3>
        <MathText
          as="p"
          text="Apple раскрывает квартальную выручку сегмента Services в официальной отчетности. Для инвестора это важный источник информации: цифровой сегмент позволяет проверить, какова доля более регулярных доходов внутри крупной технологической компании."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <MathText
          as="p"
          text="В этой задаче мы не строим полноценную оценку компании, а решаем более локальную, но содержательную подзадачу: сравниваем кварталы по абсолютной сервисной выручке и по доле $s_t = S_t / R_t$."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
      </section>

      <SourceNote>
        Реальные данные примера: квартальная отчетность <strong>Apple</strong> за{' '}
        <strong>FY2024</strong>, где отдельно раскрывается сегмент <strong>Services</strong>.
        Это хороший учебный кейс для анализа структуры выручки цифровой компании на официальных
        данных.
      </SourceNote>

      <ComparisonTable
        columns={appleServices.map((item) => item.quarter)}
        rows={[
          {
            label: 'Общая выручка, млрд USD',
            values: appleServices.map((item) => item.total.toFixed(2)),
          },
          {
            label: 'Выручка Services, млрд USD',
            values: appleServices.map((item) => item.services.toFixed(2)),
            highlight: true,
          },
          {
            label: 'Доля Services',
            values: appleServices.map((item) => `${((item.services / item.total) * 100).toFixed(1)}%`),
          },
        ]}
      />

      <PlotViewer
        title="Доля Services в квартальной выручке Apple"
        caption="На графике видно, что сервисный сегмент занимает заметную и устойчивую долю в структуре доходов компании. Для аналитика это важнее, чем единичное число общей выручки, потому что именно структура помогает судить о качестве роста."
      >
        <ServicesShareChart />
      </PlotViewer>

      <section className="space-y-4">
        <ThinkQuestion question="Всегда ли высокая доля сервисной выручки автоматически делает компанию более привлекательной для инвестора?">
          <p>
            Нет. Высокая доля сервиса сама по себе еще не гарантирует ни высокой маржи, ни низкой
            конкуренции, ни устойчивого роста. Она только подсказывает, что структура выручки может
            быть более регулярной и прогнозируемой.
          </p>
          <p>
            Дальше аналитик обязан проверить рентабельность, темп роста, насыщение рынка и силу
            клиентской базы. Структура выручки — важный, но не единственный слой анализа.
          </p>
        </ThinkQuestion>

        <section className="content-block space-y-4">
          <h3 className="section-title">Python: считаем долю и темп роста сегмента</h3>
          <MathText
            as="p"
            text="В Python удобно сначала собрать таблицу по кварталам, затем добавить вычисляемые столбцы. Так логика анализа остается прозрачной: мы видим исходные данные, формулу и итоговый результат в одной структуре."
            className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
          <ExecutablePythonBlock
            code={servicesCode}
            title="Python: анализ сервисной выручки"
            packages={['pandas']}
            note="Попробуйте пересчитать доли и темпы роста для других периодов или добавить новый квартал в таблицу."
          />
        </section>

        <section className="content-block space-y-4">
          <h3 className="section-title">Как читать результат</h3>
          <MathText
            as="p"
            text="Если сервисная выручка растет даже тогда, когда общая выручка колеблется, это означает, что цифровой сегмент вносит стабилизирующий вклад в бизнес-модель. Для инвестиционного анализа такое наблюдение важно, потому что устойчивые сегменты поддерживают качество будущих потоков."
            className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
          <MathText
            as="p"
            text="При этом одна только высокая доля $s_t$ еще не гарантирует инвестиционную привлекательность. Аналитик всегда связывает структуру выручки с рентабельностью, конкуренцией, темпом роста и общей стратегией компании."
            className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
        </section>
      </section>

      <HandbookDetails title="Подробнее: почему рынок любит повторяемые сервисные доходы">
        <p>
          Повторяемая выручка снижает неопределенность прогноза: если клиентская база уже платит по
          подписке или регулярно пользуется платформой, будущий денежный поток обычно проще
          моделировать, чем разовые продажи.
        </p>
        <p>
          Именно поэтому инвесторы часто отдельно смотрят на сервисные сегменты у технологических
          компаний: они помогают понять не только размер бизнеса, но и качество его денежной
          архитектуры.
        </p>
      </HandbookDetails>

      <section className="space-y-4">
        <section className="content-block space-y-4">
          <h3 className="section-title">Что важно теоретически</h3>
          <MathText
            as="p"
            text="Цифровой сегмент особенно ценен тогда, когда его доходы повторяются: подписка, облачный сервис или комиссия платформы создают не случайный разовый поток, а регулярную последовательность поступлений. В этом состоит их особая роль в инвестиционном анализе."
            className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
          <MathText
            as="p"
            text="Поэтому в цифровой экономике анализ структуры выручки становится инструментом принятия решений на основе данных. Он помогает отличать рост, построенный на устойчивой клиентской базе, от роста, который опирается только на временный всплеск продаж."
            className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
        </section>

        <section className="content-block space-y-4">
          <h3 className="section-title">Полезные функции Python</h3>
          <ExecutablePythonBlock
            code={servicesToolsCode}
            title="Python: sort_values(), tail(), query()"
            playgroundCode={servicesToolsPlaygroundCode}
            packages={['pandas']}
            note="Короткий сниппет показан для чтения, а в интерактивном запуске ему уже подготовлена таблица `apple_segments`."
          />
        </section>
      </section>

      <KeyIdea title="Ключевой вывод">
        В цифровой экономике инвестор оценивает не только масштаб бизнеса, но и архитектуру его
        доходов. Сегментный анализ и расчет доли сервисной выручки помогают увидеть, насколько
        устойчивыми и прогнозируемыми являются будущие денежные потоки компании.
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
