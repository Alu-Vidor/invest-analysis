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
import {
  treasuryNote2028,
  treasuryNoteSchedule2028,
} from '../data/practice2RealData'

const contextNotes = [
  {
    title: 'Денежный поток',
    text: 'Денежный поток инвестиционного решения - это упорядоченная во времени последовательность выплат и поступлений, которую можно записать по периодам и затем анализировать математически.',
  },
  {
    title: 'Купонная облигация',
    text: 'Купонная облигация формирует заранее известный календарь платежей: регулярные купоны и возврат номинала в дату погашения. Поэтому она удобна как первый реальный объект для моделирования потока.',
  },
]

const scheduleCode = `import pandas as pd

face_value = 10_000
coupon_rate = 0.0425
coupon = face_value * coupon_rate / 2

schedule = pd.DataFrame(
    {
        "period": list(range(1, 9)),
        "date": [
            "2024-07-15",
            "2025-01-15",
            "2025-07-15",
            "2026-01-15",
            "2026-07-15",
            "2027-01-15",
            "2027-07-15",
            "2028-01-15",
        ],
        "coupon_usd": [coupon] * 8,
        "principal_usd": [0, 0, 0, 0, 0, 0, 0, face_value],
    }
)

schedule["cash_flow_usd"] = schedule["coupon_usd"] + schedule["principal_usd"]
schedule["cumulative_inflow_usd"] = schedule["cash_flow_usd"].cumsum()

print(schedule.round(2))
print()
print("Total coupons:", round(schedule["coupon_usd"].sum(), 2))
print("Total cash flow:", round(schedule["cash_flow_usd"].sum(), 2))`

const utilityCode = `dates = [
    "2024-07-15",
    "2025-01-15",
    "2025-07-15",
    "2026-01-15",
    "2026-07-15",
    "2027-01-15",
    "2027-07-15",
    "2028-01-15",
]
cash_flows = [212.5, 212.5, 212.5, 212.5, 212.5, 212.5, 212.5, 10212.5]

for number, (date, amount) in enumerate(zip(dates, cash_flows), start=1):
    print(number, date, amount)

print("Max payment:", max(cash_flows))
print("Coupon total:", sum(cash_flows[:-1]))`

function TreasuryCashFlowChart() {
  const maxValue = Math.max(...treasuryNoteSchedule2028.map((row) => row.cashFlowUsd))

  return (
    <svg
      viewBox="0 0 620 260"
      className="h-full w-full"
      role="img"
      aria-label="График платежей по казначейской ноте США со сроком погашения 15 января 2028 года"
    >
      <line x1="48" y1="205" x2="585" y2="205" stroke="#64748b" strokeWidth="2" />
      {treasuryNoteSchedule2028.map((row, index) => {
        const x = 70 + index * 64
        const height = (row.cashFlowUsd / maxValue) * 140
        const y = 205 - height

        return (
          <g key={row.period}>
            <rect x={x} y={y} width="34" height={height} rx="10" fill="#2563eb" opacity="0.9" />
            <text x={x + 17} y="226" textAnchor="middle" fontSize="11" fill="#334155">
              k={row.period}
            </text>
            {index === treasuryNoteSchedule2028.length - 1 ? (
              <text x={x + 17} y={y - 10} textAnchor="middle" fontSize="11" fill="#0f172a">
                10 212.5
              </text>
            ) : null}
          </g>
        )
      })}
      <text x="12" y="26" fontSize="12" fill="#475569">
        USD
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
        subtitle="Начинаем с реального инструмента: раскладываем по периодам денежный поток казначейской ноты США и показываем, как из экономического описания возникает математическая модель, пригодная для расчета в Python."
      />

      <section className="content-block space-y-4">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
          Представьте, что вам нужно оценить облигацию для клиентского портфеля. Доходность еще не
          посчитана, дисконтирование впереди, но первый профессиональный вопрос уже понятен: какой
          именно календарь денег получит инвестор и в какие даты?
        </p>
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
          Здесь появляется <strong>денежный поток</strong> (англ. <em>cash flow</em>) и{' '}
          <strong>купонная облигация</strong> (англ. <em>coupon bond</em>) как особенно удобный
          реальный объект для старта: ее выплаты заранее зафиксированы контрактом.
        </p>
        <MathText
          as="p"
          text="В инвестиционном анализе решение задается не общими словами, а последовательностью платежей по времени. Если в момент $t$ возникают поступления $In_t$ и выплаты $Out_t$, то чистый денежный поток периода определяется как разность этих величин."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <MathBlock formula={String.raw`CF_t = In_t - Out_t`} />
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
          В этой записи <strong>Inₜ</strong> — приток денег в период <strong>t</strong>,
          <strong>Outₜ</strong> — выплата или расход, а <strong>CFₜ</strong> — чистый итог периода.
          Нам важно не только значение потока, но и его место во времени.
        </p>
        <MathText
          as="p"
          text="Для облигации структура потока особенно прозрачна. Пусть $F$ - номинал, $c$ - годовая купонная ставка, $m$ - число купонных выплат в году. Тогда размер одного купона равен $C = \frac{F \cdot c}{m}$, а денежный поток по обычной купонной облигации записывается так:"
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <MathBlock formula={String.raw`CF_k = C,\quad k=1,\dots,n-1;\qquad CF_n = C + F`} />
        <MathText
          as="p"
          text="Эта запись важна методически: аналитик сразу отделяет регулярные промежуточные поступления от терминального потока, в котором вместе с последним купоном возвращается номинал. Такое разложение затем напрямую переносится в таблицу и код."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
      </section>

      <section className="grid items-start gap-4 lg:grid-cols-2">
        <IdeaCard title="Поток инвестора и поток эмитента">
          <p>
            Один и тот же контракт можно читать с двух сторон. Купон для инвестора — приток денег,
            а для эмитента — расход. Такая смена точки зрения важна, потому что инвестиционный
            анализ всегда зависит от того, чьи именно денежные потоки мы моделируем.
          </p>
        </IdeaCard>

        <IdeaCard title="Контрактный и прогнозный поток">
          <p>
            У облигации поток почти полностью задан договором, а у инвестиционного проекта он чаще
            всего прогнозируется. Поэтому облигация — удобная стартовая модель: здесь мы учимся
            логике расчета на потоке, где меньше неопределенности.
          </p>
        </IdeaCard>
      </section>

      <IdeaCard title="Реальные данные примера">
        <p>
          Используем реальный инструмент: {treasuryNote2028.title}. Для пакета с номиналом{' '}
          {treasuryNote2028.faceValueUsd.toLocaleString('en-US')} USD купон выплачивается дважды в год и
          составляет 212.50 USD за полугодие. Последний платеж 15 января 2028 года включает и купон, и
          возврат номинала.
        </p>
      </IdeaCard>

      <SourceNote>
        Реальные данные примера: <strong>{treasuryNote2028.title}</strong>, номинал{' '}
        {treasuryNote2028.faceValueUsd.toLocaleString('en-US')} USD, купон{' '}
        {(treasuryNote2028.couponRate * 100).toFixed(3)}% годовых, выплаты дважды в год до{' '}
        <strong>15 января 2028 года</strong>.
      </SourceNote>

      <ComparisonTable
        columns={treasuryNoteSchedule2028.map((row) => `k=${row.period}`)}
        rows={[
          {
            label: 'Дата платежа',
            values: treasuryNoteSchedule2028.map((row) => row.date),
          },
          {
            label: 'Купон, USD',
            values: treasuryNoteSchedule2028.map((row) => row.couponUsd.toFixed(2)),
          },
          {
            label: 'Погашение номинала, USD',
            values: treasuryNoteSchedule2028.map((row) => row.principalUsd.toFixed(2)),
          },
          {
            label: 'Итоговый денежный поток, USD',
            values: treasuryNoteSchedule2028.map((row) => row.cashFlowUsd.toFixed(2)),
            highlight: true,
          },
        ]}
      />

      <PlotViewer
        title="Календарь платежей по реальной купонной ноте"
        caption="Первые семь периодов дают одинаковый купонный приток, а в последнем периоде возникает скачок, потому что к купону добавляется возврат номинала. Именно такая форма потока потом определяет цену бумаги и ее чувствительность к ставке."
      >
        <TreasuryCashFlowChart />
      </PlotViewer>

      <ThinkQuestion question="Почему для облигации недостаточно знать только суммарный объем будущих выплат?">
        <p>
          Потому что одинаковая общая сумма может быть распределена по времени по-разному. Поток,
          где деньги приходят раньше, обычно ценнее потока, где та же сумма приходит позже.
        </p>
        <p>
          Кроме того, в облигации важно различать доход в виде купонов и возврат вложенного
          капитала в конце срока. Эти элементы играют разную экономическую роль.
        </p>
      </ThinkQuestion>

      <section className="content-block space-y-4">
        <h3 className="section-title">Экономическая интерпретация потока</h3>
        <MathText
          as="p"
          text="Одинаковая сумма по всем периодам не означает одинаковую экономическую роль платежей. Промежуточные купоны создают доход инвестора, а терминальный поток возвращает вложенный капитал. Поэтому при дальнейшем анализе мы будем отдельно смотреть на структуру потока, а не только на его суммарный объем."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <MathText
          as="p"
          text="Для будущей профессиональной работы это принципиально: тот же подход используется при оценке облигаций, лизинга, кредитов, проектного финансирования и любых договоров с распределенными во времени платежами."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
      </section>

      <HandbookDetails title="Подробнее: почему облигация — идеальный учебный объект для финансовой математики">
        <p>
          У облигации известны даты платежей, размер купона и номинал к погашению. Это делает ее
          почти лабораторным примером: структура потока ясна, а значит, можно сосредоточиться на
          логике дисконтирования и интерпретации.
        </p>
        <p>
          Позже мы увидим, что тот же подход переносится и на более сложные объекты: кредиты,
          аренду, проектное финансирование и корпоративные DCF-модели.
        </p>
      </HandbookDetails>

      <section className="content-block space-y-4">
        <h3 className="section-title">Python: собираем поток в таблицу</h3>
        <MathText
          as="p"
          text="Сначала фиксируем даты и платежи в явном табличном виде. Это важный навык: пока поток не собран в структуру данных, его нельзя корректно дисконтировать, сравнивать и использовать в сценарном анализе."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <ExecutablePythonBlock
          code={scheduleCode}
          title="Python: таблица платежей по казначейской ноте"
          packages={['pandas']}
          note="Попробуйте изменить номинал или купонную ставку и посмотрите, как меняется весь календарь платежей. Так студент видит, что формула и данные здесь связаны напрямую."
        />
      </section>

      <section className="content-block space-y-4">
        <h3 className="section-title">Полезные функции Python на первом шаге</h3>
        <MathText
          as="p"
          text="Даже до сложных финансовых формул аналитик постоянно использует базовые средства языка: `zip()` связывает даты и суммы, `enumerate()` добавляет номер периода, `sum()` быстро считает общий приток, `max()` помогает увидеть самый крупный платеж. Эти функции особенно полезны при первичной проверке данных."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <ExecutablePythonBlock
          code={utilityCode}
          title="Python: zip(), enumerate(), sum(), max()"
          note="Этот фрагмент полезен именно как рабочая проверка структуры потока: сначала мы убеждаемся, что периоды и суммы стоят на своих местах, и только затем переходим к расчету стоимости."
        />
      </section>

      <KeyIdea title="Ключевой вывод">
        Денежный поток - это исходная математическая форма инвестиционного решения. Пока реальный контракт не
        переведен в последовательность $CF_k$, невозможно корректно обсуждать ни цену инструмента, ни его
        доходность, ни риск.
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
