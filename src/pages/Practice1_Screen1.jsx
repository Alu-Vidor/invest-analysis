import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import CodeBlock from '../components/CodeBlock'
import ComparisonTable from '../components/ComparisonTable'
import CourseHeader from '../components/CourseHeader'
import IdeaCard from '../components/IdeaCard'
import KeyIdea from '../components/KeyIdea'
import MathBlock from '../components/MathBlock'
import MathText from '../components/MathText'
import PlotViewer from '../components/PlotViewer'
import RecapBlock from '../components/RecapBlock'
import TaskBlock from '../components/TaskBlock'

const contextNotes = [
  {
    title: 'Что анализируем',
    text: 'Инвестиционный анализ изучает не просто актив, а решение о вложении капитала при заданных потоках, сроках, ограничениях и альтернативной стоимости денег.',
  },
  {
    title: 'Почему здесь нужна математика',
    text: 'Пока решение не переведено в переменные и связи между ними, его нельзя сравнить, автоматизировать и воспроизвести в коде.',
  },
]

const projectRows = [
  { period: 0, flow: -1200, label: 'Старт проекта' },
  { period: 1, flow: 350, label: 'Запуск продаж' },
  { period: 2, flow: 470, label: 'Рост выручки' },
  { period: 3, flow: 620, label: 'Стабилизация' },
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
print("Суммарный поток за 4 года:", cash_flow["cash_flow_thousand_rub"].sum())`

function CashFlowChart() {
  const maxAbs = Math.max(...projectRows.map((item) => Math.abs(item.flow)))
  const zeroY = 110

  return (
    <svg viewBox="0 0 520 220" className="h-full w-full" role="img" aria-label="Денежные потоки проекта">
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
            <text x={x + 24} y={item.flow >= 0 ? y - 8 : y + barHeight + 18} textAnchor="middle" fontSize="12" fill="#0f172a">
              {item.flow}
            </text>
          </g>
        )
      })}
      <text x="12" y="35" fontSize="12" fill="#475569">
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
        subtitle="Формализуем решение о вложении капитала, выделяем его переменные и сразу переводим экономический сюжет в структуру данных."
      />

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="content-block">
          <MathText
            as="p"
            text="Инвестиционное решение нельзя анализировать только на языке общих рассуждений. Аналитику нужно зафиксировать момент вложения $t=0$, будущие потоки $CF_t$, цену капитала $r$ и ограничения инвестора. Только после этого возникает математическая модель, пригодная для сравнения альтернатив."
            className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
          <MathBlock formula={String.raw`D = f\left(I_0,\; CF_1,\ldots,CF_n,\; r,\; \sigma,\; L,\; T\right)`} />
          <MathText
            as="p"
            text="Здесь $I_0$ - первоначальные инвестиции, $CF_t$ - денежные потоки по периодам, $\sigma$ - риск, $L$ - ликвидность, $T$ - горизонт удержания. Эта запись еще не решает задачу, но задает ее координаты."
            className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
        </section>

        <IdeaCard title="Стартовый вопрос">
          <p>
            Если два проекта требуют одинаковых вложений, но один возвращает деньги раньше, а
            другой позже, можно ли считать их одинаково привлекательными?
          </p>
          <p className="mt-3">
            Нет. Уже здесь проявляется временная структура решения, а значит и необходимость
            строгой формализации.
          </p>
        </IdeaCard>
      </section>

      <RecapBlock title="Мини-кейс: запуск цифрового сервиса">
        <p>
          Компания рассматривает запуск аналитической платформы для малого бизнеса. На старте
          требуется разработка и маркетинг, поэтому поток в момент <strong>t = 0</strong>{' '}
          отрицателен. Затем проект начинает генерировать выручку и частично компенсирует
          первоначальные затраты.
        </p>
        <p>
          Для преподавания это удобный сюжет: он сразу показывает, что инвестиционный анализ
          работает с распределением результатов во времени, а не с абстрактной итоговой прибылью.
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
            label: 'Экономический смысл',
            values: projectRows.map((row) => row.label),
          },
        ]}
      />

      <PlotViewer
        title="Визуализация потока"
        caption="Отрицательный стартовый поток и последующие поступления образуют типичную структуру инвестиционного решения. Уже на этой схеме видно, что временное расположение денег не менее важно, чем их суммарный объем."
      >
        <CashFlowChart />
      </PlotViewer>

      <TaskBlock
        title="Что студент должен сделать на этом этапе"
        items={[
          {
            title: 'Отделить объект анализа от описания идеи',
            content:
              'Сформулировать, какие величины относятся к инвестиционному решению: вложения, будущие потоки, риск, ликвидность, горизонт.',
          },
          {
            title: 'Перевести сюжет в таблицу',
            content:
              'Указать периоды и потоки так, чтобы их можно было сразу загрузить в Python без ручной переработки.',
          },
          {
            title: 'Сделать первый аналитический вывод',
            content:
              'Понять, что решение нельзя оценить только по сумме поступлений; важны структура во времени и условия реализации проекта.',
          },
        ]}
      />

      <section className="content-block">
        <h3 className="section-title">Python: начинаем с таблицы, а не с формулы</h3>
        <MathText
          as="p"
          text="Интерактивность занятия возникает тогда, когда экономический сюжет сразу проверяется в данных. Ниже мы не строим «готовый пайплайн», а делаем первый технический шаг: создаем таблицу потоков и считаем накопленный итог по годам."
          className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <div className="mt-4">
          <CodeBlock code={cashFlowCode} title="Python: создаем таблицу денежных потоков" />
        </div>
      </section>

      <KeyIdea title="Ключевой вывод">
        Инвестиционный анализ начинается в тот момент, когда экономическое решение становится
        структурой данных. Именно это превращает обсуждение проекта в профессиональную процедуру
        принятия решения на основе данных.
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
