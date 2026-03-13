import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ComparisonTable from '../components/ComparisonTable'
import CourseHeader from '../components/CourseHeader'
import ExecutablePythonBlock from '../components/ExecutablePythonBlock'
import IdeaCard from '../components/IdeaCard'
import KeyIdea from '../components/KeyIdea'
import MathBlock from '../components/MathBlock'
import MathText from '../components/MathText'
import PlotViewer from '../components/PlotViewer'

const contextNotes = [
  {
    title: 'Чистый денежный поток',
    text: 'Чистый денежный поток периода — это разность между всеми денежными поступлениями и всеми денежными выплатами данного периода.',
  },
  {
    title: 'Структура потока',
    text: 'Для инвестиционного решения важно видеть не только итоговый CF_t, но и его происхождение: инвестиционные расходы, операционный эффект и терминальную стоимость.',
  },
]

const projectRows = [
  { year: 0, investing: -18, operating: 0, terminal: 0, net: -18 },
  { year: 1, investing: 0, operating: 4.8, terminal: 0, net: 4.8 },
  { year: 2, investing: 0, operating: 5.4, terminal: 0, net: 5.4 },
  { year: 3, investing: 0, operating: 6.1, terminal: 0, net: 6.1 },
  { year: 4, investing: 0, operating: 6.5, terminal: 1.7, net: 8.2 },
]

const cashFlowCode = `import pandas as pd

project = pd.DataFrame(
    {
        "year": [0, 1, 2, 3, 4],
        "investing_cf_mln": [-18.0, 0.0, 0.0, 0.0, 0.0],
        "operating_cf_mln": [0.0, 4.8, 5.4, 6.1, 6.5],
        "terminal_cf_mln": [0.0, 0.0, 0.0, 0.0, 1.7],
    }
)

project["net_cf_mln"] = (
    project["investing_cf_mln"]
    + project["operating_cf_mln"]
    + project["terminal_cf_mln"]
)
project["cumulative_cf_mln"] = project["net_cf_mln"].cumsum()

print(project.round(2))
print()
print("Итоговый накопленный поток:", round(project["cumulative_cf_mln"].iloc[-1], 2))`

const utilityCode = `cash_flows = [-18.0, 4.8, 5.4, 6.1, 8.2]
years = [0, 1, 2, 3, 4]

for year, flow in zip(years, cash_flows):
    print(year, flow)

print("Сумма потоков:", round(sum(cash_flows), 2))
print("Максимальный приток:", max(cash_flows[1:]))`

function CashFlowStructureChart() {
  const maxAbs = Math.max(...projectRows.map((row) => Math.abs(row.net)))
  const zeroY = 120

  return (
    <svg
      viewBox="0 0 540 240"
      className="h-full w-full"
      role="img"
      aria-label="Структура денежного потока проекта"
    >
      <line x1="40" y1={zeroY} x2="510" y2={zeroY} stroke="#64748b" strokeWidth="2" />
      {projectRows.map((row, index) => {
        const x = 65 + index * 88
        const barHeight = (Math.abs(row.net) / maxAbs) * 86
        const y = row.net >= 0 ? zeroY - barHeight : zeroY

        return (
          <g key={row.year}>
            <rect
              x={x}
              y={y}
              width="42"
              height={barHeight}
              rx="10"
              fill={row.net >= 0 ? '#2563eb' : '#e11d48'}
              opacity="0.92"
            />
            <text x={x + 21} y="198" textAnchor="middle" fontSize="12" fill="#334155">
              t={row.year}
            </text>
            <text
              x={x + 21}
              y={row.net >= 0 ? y - 10 : y + barHeight + 18}
              textAnchor="middle"
              fontSize="12"
              fill="#0f172a"
            >
              {row.net.toFixed(1)}
            </text>
          </g>
        )
      })}
      <text x="10" y="28" fontSize="12" fill="#475569">
        млн руб.
      </text>
    </svg>
  )
}

function Practice2_Screen1({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 2 · Денежные потоки и дисконтирование"
        title="Структура денежного потока инвестиционного решения"
        subtitle="Переходим от качественного описания проекта к потоку платежей по периодам: фиксируем исходящие и входящие суммы, разделяем их по экономическому смыслу и подготавливаем к расчету."
      />

      <section className="content-block space-y-4">
        <MathText
          as="p"
          text="Во второй практике объектом анализа становится не просто идея проекта, а его денежный поток во времени. Именно поток платежей позволяет связать экономическое содержание решения с формулами дисконтирования, приведенной стоимости и критериями эффективности."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <MathText
          as="p"
          text="Если в период $t$ компания получает денежные поступления $In_t$ и несет денежные выплаты $Out_t$, то чистый денежный поток определяется как разность этих величин."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <MathBlock formula={String.raw`CF_t = In_t - Out_t`} />
        <MathText
          as="p"
          text="В прикладном инвестиционном анализе полезно разложить $CF_t$ на составные части: инвестиционные расходы, операционный эффект и терминальную стоимость в конце проекта. Такое разложение делает модель прозрачной и пригодной для дальнейшей проверки в Python."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <MathBlock formula={String.raw`CF_t = CF_t^{inv} + CF_t^{oper} + CF_t^{term}`} />
      </section>

      <section className="grid items-start gap-4 md:grid-cols-2">
        <IdeaCard title="Почему структура важнее одной суммы">
          <p>
            Два проекта могут давать одинаковую суммарную прибыль, но быть совершенно разными по
            инвестиционному качеству. Если один проект возвращает деньги поздно, а другой раньше,
            их экономическая ценность уже не совпадает.
          </p>
        </IdeaCard>

        <IdeaCard title="Что такое терминальный поток">
          <p>
            Терминальным потоком называют завершающее денежное поступление в конце проекта:
            ликвидационную стоимость оборудования, возврат оборотного капитала, остаточную цену
            актива или итоговый платеж по продаже бизнеса.
          </p>
        </IdeaCard>
      </section>

      <section className="content-block space-y-4">
        <h3 className="section-title">Учебный кейс: автоматизация складского участка</h3>
        <MathText
          as="p"
          text="Предположим, компания вкладывает 18 млн руб. в автоматизированную линию комплектования заказов. Проект дает ежегодный операционный эффект за счет экономии труда и снижения ошибок, а в последнем периоде дополнительно возникает терминальный поток."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
      </section>

      <ComparisonTable
        columns={projectRows.map((row) => `Год ${row.year}`)}
        rows={[
          {
            label: 'Инвестиционный поток, млн руб.',
            values: projectRows.map((row) => row.investing.toFixed(1)),
          },
          {
            label: 'Операционный поток, млн руб.',
            values: projectRows.map((row) => row.operating.toFixed(1)),
          },
          {
            label: 'Терминальный поток, млн руб.',
            values: projectRows.map((row) => row.terminal.toFixed(1)),
          },
          {
            label: 'Чистый поток, млн руб.',
            values: projectRows.map((row) => row.net.toFixed(1)),
            highlight: true,
          },
        ]}
      />

      <PlotViewer
        title="Динамика чистого денежного потока"
        caption="Стартовый отрицательный поток отражает первоначальные вложения, а последующие положительные значения — операционный эффект проекта. Такая форма потока типична для капитальных инвестиций."
      >
        <CashFlowStructureChart />
      </PlotViewer>

      <section className="content-block space-y-4">
        <h3 className="section-title">Python: собираем поток в таблицу</h3>
        <MathText
          as="p"
          text="Для дальнейшего анализа поток нужно перевести в табличный формат. Тогда к нему можно применять накопление, дисконтирование, сценарные изменения и сравнительный анализ альтернатив."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <ExecutablePythonBlock
          code={cashFlowCode}
          title="Python: таблица денежного потока проекта"
          packages={['pandas']}
          note="Попробуйте изменить один из операционных потоков или терминальный эффект и посмотрите, как меняется накопленный результат."
        />
      </section>

      <section className="space-y-4">
        <section className="content-block space-y-4">
          <h3 className="section-title">Полезные функции Python</h3>
          <MathText
            as="p"
            text="Даже до дисконтирования аналитик постоянно использует базовые операции чтения потока: перебор периодов, суммирование и поиск экстремальных значений."
            className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
          <ExecutablePythonBlock
            code={utilityCode}
            title="Python: zip(), sum(), max()"
            note="Этот фрагмент показывает, как быстро связать периоды и потоки еще до построения более сложной финансовой модели."
          />
        </section>

        <IdeaCard title="Профессиональный смысл этапа">
          <p>
            В реальной работе аналитик редко начинает с NPV. Сначала он проверяет, корректно ли
            собран сам поток: не забыты ли стартовые вложения, терминальная стоимость, налоговые
            эффекты и возврат капитала в конце горизонта.
          </p>
        </IdeaCard>
      </section>

      <KeyIdea title="Ключевой вывод">
        Денежный поток — это базовый язык инвестиционного анализа. Пока проект не переведен в
        последовательность $CF_t$ по периодам, нельзя корректно обсуждать ни его стоимость, ни
        эффективность, ни риск.
      </KeyIdea>

      <nav className="flex justify-end">
        <Link
          to="/practice/2/screen/2"
          className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Далее: 2. Временная стоимость денег
        </Link>
      </nav>
    </article>
  )
}

export default Practice2_Screen1
