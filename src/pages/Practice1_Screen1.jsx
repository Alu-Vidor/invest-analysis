import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ExecutablePythonBlock from '../components/ExecutablePythonBlock'
import ComparisonTable from '../components/ComparisonTable'
import CourseHeader from '../components/CourseHeader'
import IdeaCard from '../components/IdeaCard'
import KeyIdea from '../components/KeyIdea'
import MathBlock from '../components/MathBlock'
import MathText from '../components/MathText'
import PlotViewer from '../components/PlotViewer'
import RecapBlock from '../components/RecapBlock'

const contextNotes = [
  {
    title: 'Инвестиционное решение',
    text: 'Это выбор о размещении капитала сегодня ради ожидаемого результата в будущем. Анализируется не только размер выгоды, но и сроки, риск и ограничения.',
  },
  {
    title: 'Денежный поток',
    text: 'Денежным потоком называют поступление или выбытие денег в конкретный момент времени. Именно потоки становятся базовым объектом математической записи.',
  },
]

const definitionCards = [
  {
    title: 'Инвестиционное решение',
    text: 'Решение о вложении капитала в проект, актив или стратегию с расчетом на будущий экономический результат.',
  },
  {
    title: 'Первоначальные инвестиции',
    text: 'Расход капитала в стартовый момент. Обычно обозначается как I₀ и имеет отрицательный знак, потому что деньги выбывают.',
  },
  {
    title: 'Денежный поток',
    text: 'Поступление или выбытие денег в период t. В записи его обычно обозначают как CF_t.',
  },
  {
    title: 'Инвестиционный горизонт',
    text: 'Период, в течение которого инвестор готов держать проект или актив и ждать результата.',
  },
]

const projectRows = [
  { period: 0, flow: -1200, label: 'Разработка и запуск' },
  { period: 1, flow: 350, label: 'Первые продажи' },
  { period: 2, flow: 470, label: 'Рост клиентской базы' },
  { period: 3, flow: 620, label: 'Стабильная монетизация' },
]

const cashFlowCode = `import pandas as pd

cash_flow = pd.DataFrame(
    {
        "year": [0, 1, 2, 3],
        "cash_flow_thousand_rub": [-1200, 350, 470, 620],
    }
)

cash_flow["cumulative"] = cash_flow["cash_flow_thousand_rub"].cumsum()

print(cash_flow)
print()
print("Итоговый накопленный поток:", cash_flow["cumulative"].iloc[-1])`

function CashFlowChart() {
  const maxAbs = Math.max(...projectRows.map((item) => Math.abs(item.flow)))
  const zeroY = 110

  return (
    <svg viewBox="0 0 520 220" className="h-full w-full" role="img" aria-label="Структура денежных потоков проекта">
      <line x1="40" y1={zeroY} x2="490" y2={zeroY} stroke="#64748b" strokeWidth="2" />
      {projectRows.map((item, index) => {
        const x = 80 + index * 105
        const barHeight = (Math.abs(item.flow) / maxAbs) * 80
        const y = item.flow >= 0 ? zeroY - barHeight : zeroY

        return (
          <g key={item.period}>
            <rect
              x={x}
              y={y}
              width="48"
              height={barHeight}
              rx="12"
              fill={item.flow >= 0 ? '#2563eb' : '#e11d48'}
              opacity="0.9"
            />
            <text x={x + 24} y="195" textAnchor="middle" fontSize="12" fill="#334155">
              t={item.period}
            </text>
            <text
              x={x + 24}
              y={item.flow >= 0 ? y - 8 : y + barHeight + 18}
              textAnchor="middle"
              fontSize="12"
              fill="#0f172a"
            >
              {item.flow}
            </text>
          </g>
        )
      })}
      <text x="10" y="34" fontSize="12" fill="#475569">
        тыс. руб.
      </text>
    </svg>
  )
}

function Practice1_Screen1({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 1 · Основы инвестиционного анализа"
        title="Инвестиционное решение как объект математического анализа"
        subtitle="Переходим от общего экономического сюжета к строгой записи: выделяем денежные потоки, время, ограничения и показываем, как решение превращается в структуру данных."
      />

      <section className="content-block">
        <MathText
          as="p"
          text="В инвестиционном анализе рассматривается не абстрактная идея проекта, а формализованное решение о вложении капитала. Чтобы сравнивать альтернативы, необходимо явно задать начальные инвестиции, будущие денежные потоки, цену капитала, риск, ликвидность и горизонт."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <MathBlock formula={String.raw`D = f\left(I_0,\; CF_1,\ldots,CF_n,\; r,\; \sigma,\; L,\; T\right)`} />
        <MathText
          as="p"
          text="Эта запись задает состав задачи. Здесь $I_0$ обозначает первоначальные вложения, $CF_t$ — денежный поток в период $t$, $r$ — цену капитала, $\\sigma$ — меру риска, $L$ — ликвидность, $T$ — инвестиционный горизонт."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <MathText
          as="p"
          text="Если нужно описать накопленный денежный результат к моменту $t$, удобно использовать частичную сумму потоков. Тогда временная динамика проекта записывается не только через отдельные поступления, но и через их накопление."
          className="mt-4 text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <MathBlock formula={String.raw`C_t = \sum_{k=0}^{t} CF_k`} />
      </section>

      <section className="grid items-start gap-4 lg:grid-cols-2">
        <IdeaCard title="Почему формализация необходима">
          <p>
            Если проект описан только словами, его трудно сравнить с альтернативами. Как только
            он переведен в переменные и периоды, появляется возможность считать, проверять и
            обосновывать вывод.
          </p>
        </IdeaCard>

        <IdeaCard title="Что такое критерий решения">
          <p>
            Критерием называют правило, по которому из нескольких альтернатив выбирается одна.
            На вводном этапе достаточно понимать: критерий связывает данные проекта и итоговое
            управленческое решение.
          </p>
        </IdeaCard>
      </section>

      <section className="grid items-start gap-4 md:grid-cols-2">
        {definitionCards.map((card) => (
          <article
            key={card.title}
            className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900"
          >
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">{card.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              {card.text}
            </p>
          </article>
        ))}
      </section>

      <RecapBlock title="Пример: запуск цифрового сервиса">
        <p>
          Предположим, компания разрабатывает цифровой сервис для малого бизнеса. В момент запуска
          требуются расходы на разработку, инфраструктуру и маркетинг, поэтому стартовый поток
          отрицателен. После выхода продукта на рынок появляются платежи клиентов, и проект
          начинает генерировать положительные поступления.
        </p>
        <p>
          Такой пример удобен тем, что сразу показывает временную структуру решения: деньги
          вкладываются не одновременно с получением результата.
        </p>
      </RecapBlock>

      <ComparisonTable
        columns={['Год 0', 'Год 1', 'Год 2', 'Год 3']}
        rows={[
          {
            label: 'Денежный поток, тыс. руб.',
            values: projectRows.map((row) => row.flow),
            highlight: true,
          },
          {
            label: 'Экономическое содержание',
            values: projectRows.map((row) => row.label),
          },
        ]}
      />

      <PlotViewer
        title="Схема потоков проекта"
        caption="Отрицательный стартовый поток и последующие поступления образуют типичную структуру инвестиционного решения. Для анализа важно не только сколько денег принесет проект, но и когда именно это произойдет."
      >
        <CashFlowChart />
      </PlotViewer>

      <section className="content-block">
        <h3 className="section-title">Еще две важные теоретические идеи</h3>
        <div className="mt-4 grid items-start gap-4 md:grid-cols-2">
          <IdeaCard title="Знак потока">
            <p>
              В инвестиционном анализе знак имеет содержательный смысл. Отрицательный поток
              означает выбытие денег из распоряжения инвестора, а положительный — их возврат или
              поступление дохода.
            </p>
          </IdeaCard>
          <IdeaCard title="Почему важен порядок во времени">
            <p>
              Два проекта с одинаковой суммой поступлений могут иметь разную ценность, если один
              возвращает средства раньше, а другой позже. Поэтому временная структура потока
              является частью самого объекта анализа.
            </p>
          </IdeaCard>
        </div>
      </section>

      <section className="content-block">
        <h3 className="section-title">Первый шаг в Python</h3>
        <MathText
          as="p"
          text="На практике формализация начинается с таблицы. Как только денежные потоки записаны по периодам, их можно загрузить в Python, проверить накопленный результат и затем перейти к более содержательным критериям."
          className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <div className="mt-4">
                    <ExecutablePythonBlock
            code={cashFlowCode}
            title="Python: ???????????? ?????? ??? ??????? ???????"
            packages={['pandas']}
            note="???? ????? ????????? ? ????????: ????????, ??????????? ?????? ?????? ? ??????????, ??? ???????? ??????????? ?????????."
          />
        </div>
      </section>

      <section className="grid items-start gap-4 lg:grid-cols-2">
        <section className="content-block">
          <h3 className="section-title">Полезные функции Python</h3>
          <MathText
            as="p"
            text="Даже на первом экране уже полезно увидеть, что анализ строится на небольшом наборе базовых операций. В чистом Python особенно важны функции sum(), min(), max() и enumerate()."
            className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
          <div className="mt-4">
                        <ExecutablePythonBlock
              code={`cash_flows = [-1200, 350, 470, 620]

print(sum(cash_flows))        # ????? ???????
print(min(cash_flows))        # ??????????? ?????
print(max(cash_flows))        # ???????????? ?????

for period, flow in enumerate(cash_flows):
    print(period, flow)       # ????? ??????? ? ???????? ??????`}
              title="Python: ??????? ??????? ??? ?????? ??????"
              note="????? ?????????? ??????? Python ??? ?????????????? ?????????: ?????? ??????????, ??? ??????? ??????? ??? ???????? ??????? ????????? ???????."
            />
          </div>
        </section>

        <IdeaCard title="Зачем это знать">
          <p>
            Эти функции кажутся простыми, но именно из них собирается аналитическая логика:
            сначала мы читаем массив значений, затем ищем его границы, затем привязываем каждое
            значение ко времени.
          </p>
        </IdeaCard>
      </section>

      <KeyIdea title="Ключевой вывод">
        Инвестиционный анализ начинается с перевода экономического решения в язык переменных,
        периодов и потоков. Только после этого становится возможен строгий расчет и осмысленное
        сравнение альтернатив.
      </KeyIdea>

      <nav className="flex justify-end">
        <Link
          to="/practice/1/screen/2"
          className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Далее: 2. Базовые категории
        </Link>
      </nav>
    </article>
  )
}

export default Practice1_Screen1
