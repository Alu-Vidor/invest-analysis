import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import CodeBlock from '../components/CodeBlock'
import CourseHeader from '../components/CourseHeader'
import IdeaCard from '../components/IdeaCard'
import KeyIdea from '../components/KeyIdea'
import MathBlock from '../components/MathBlock'
import RecapBlock from '../components/RecapBlock'

const contextNotes = [
  {
    title: 'Что является объектом анализа',
    text: 'В инвестиционном анализе объектом выступает не абстрактный актив, а решение: вложить капитал сейчас ради будущего потока результатов при заданных ограничениях и неопределенности.',
  },
  {
    title: 'Позиция аналитика',
    text: 'Аналитик не угадывает рынок. Он переводит экономическую ситуацию в систему параметров, критериев и сценариев, чтобы решение можно было сравнивать, объяснять и защищать.',
  },
]

const decisionAxes = [
  'объем первоначальных вложений и график последующих поступлений;',
  'стоимость капитала и альтернативные варианты размещения средств;',
  'ограничения по бюджету, сроку, ликвидности и допустимому риску;',
  'критерий выбора: максимизация полезности, доходности или стоимости проекта.',
]

const decisionCode = `import pandas as pd

project = pd.DataFrame(
    {
        "period": [0, 1, 2, 3],
        "cash_flow": [-1200000, 420000, 510000, 560000],
    }
)

initial_outlay = project.loc[project["period"] == 0, "cash_flow"].iloc[0]
future_flows = project.loc[project["period"] > 0, "cash_flow"].sum()

print(project)
print(f"Начальные вложения: {initial_outlay:,.0f}")
print(f"Сумма будущих потоков: {future_flows:,.0f}")`

function Practice1_Screen1({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 1 · Основы инвестиционного анализа"
        title="Инвестиционное решение как объект математического анализа"
        subtitle="Переходим от интуитивного «стоит ли вкладывать?» к формализованной задаче, где каждая величина имеет экономический смысл и место в модели."
      />

      <section className="content-block">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
          Инвестиционный анализ начинается не с формулы и не с графика доходности, а с корректной
          постановки задачи. Мы не исследуем «интересный проект вообще», а рассматриваем решение о
          вложении капитала в условиях ограниченности ресурсов, неодновременности денежных потоков
          и неполноты информации. Именно поэтому инвестиционный анализ тесно связан с математикой:
          решение должно быть представимо через параметры, критерии и проверяемые допущения.
        </p>
      </section>

      <RecapBlock title="Как выглядит инвестиционная задача в строгой постановке">
        <p>
          Пусть в момент времени <strong>t = 0</strong> инвестор расходует капитал
          <strong> I_0</strong>, а затем в моменты <strong>t = 1, 2, ..., n</strong> получает
          денежные потоки <strong>CF_t</strong>. Тогда задача аналитика состоит не просто в
          перечислении этих потоков, а в оценке их ценности, сопоставимости и устойчивости.
        </p>
        <p>
          Экономический смысл здесь принципиален: один и тот же номинальный доход при разной
          структуре сроков, рисков и ликвидности ведет к разным решениям. Поэтому инвестиционное
          решение всегда многомерно и не сводится к одному числу.
        </p>
      </RecapBlock>

      <section className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Из чего состоит объект анализа
          </h3>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            {decisionAxes.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <IdeaCard title="Мини-вопрос для обсуждения">
          <p>
            Два проекта требуют одинаковых инвестиций в размере 1 млн рублей и обещают суммарно по
            1.5 млн рублей поступлений. Можно ли считать их эквивалентными?
          </p>
          <p className="mt-3">
            Нет, если различаются сроки поступлений, вероятность реализации прогноза или
            возможность быстро выйти из позиции. Уже на этом этапе видно, что анализ должен быть
            количественным и структурированным.
          </p>
        </IdeaCard>
      </section>

      <section className="content-block">
        <h3 className="section-title">Базовая математическая запись</h3>
        <p className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200">
          В простейшем виде решение можно представить как отображение набора денежных потоков и
          параметров среды в итоговый критерий выбора:
        </p>
        <MathBlock formula={String.raw`D = f\!\left(I_0,\; CF_1,\ldots,CF_n,\; r,\; \sigma,\; L,\; T\right)`} />
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
          Здесь <strong>r</strong> характеризует требуемую доходность или цену капитала,
          <strong> \sigma</strong> отражает риск, <strong>L</strong> ликвидность, а
          <strong> T</strong> инвестиционный горизонт. На следующих экранах мы разберем эти
          параметры отдельно, чтобы затем встроить их в вычислительный анализ на Python.
        </p>
      </section>

      <section className="content-block">
        <h3 className="section-title">Python как язык формализации</h3>
        <p className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200">
          Уже на вводном этапе полезно перевести словесное описание проекта в структуру данных.
          Это дисциплинирует постановку задачи: становится видно, какие переменные нам известны,
          какие нужно оценить, а какие следует запросить у заказчика или менеджера проекта.
        </p>
        <div className="mt-4">
          <CodeBlock code={decisionCode} title="Python: формализуем денежный поток проекта" />
        </div>
      </section>

      <KeyIdea title="Ключевой вывод">
        Инвестиционный анализ является инструментом принятия решений на основе данных. Его
        профессиональная сила в том, что экономическую неопределенность он переводит в
        воспроизводимую модель, где можно проверить допущения, сравнить альтернативы и обосновать
        рекомендацию.
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
