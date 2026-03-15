import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ExecutablePythonBlock from '../components/ExecutablePythonBlock'
import ComparisonTable from '../components/ComparisonTable'
import CourseHeader from '../components/CourseHeader'
import IdeaCard from '../components/IdeaCard'
import HandbookDetails from '../components/HandbookDetails'
import KeyIdea from '../components/KeyIdea'
import MathBlock from '../components/MathBlock'
import MathText from '../components/MathText'
import SourceNote from '../components/SourceNote'
import ThinkQuestion from '../components/ThinkQuestion'

const contextNotes = [
  {
    title: 'Четыре базовые категории',
    text: 'Доходность показывает размер результата, риск — степень неопределенности, ликвидность — скорость выхода из позиции, горизонт — допустимую длину вложения.',
  },
  {
    title: 'Почему одного числа недостаточно',
    text: 'Высокая доходность без учета риска и ликвидности может привести к формально красивому, но практически слабому решению.',
  },
]

const categoryCards = [
  {
    title: 'Доходность',
    text: 'Относительное изменение стоимости вложения за выбранный период. Она отвечает на вопрос, насколько эффективно использован капитал.',
  },
  {
    title: 'Риск',
    text: 'Изменчивость возможных результатов относительно ожидаемого значения. Чем выше разброс, тем менее предсказуем итог.',
  },
  {
    title: 'Ликвидность',
    text: 'Способность быстро превратить актив в деньги без существенной потери стоимости. Для рыночных инструментов она часто связана с объемом торгов.',
  },
  {
    title: 'Горизонт',
    text: 'Период, на который инвестор готов вложить средства. Оценка инструмента на недельном и пятилетнем горизонтах может различаться.',
  },
]

const appleJanuaryData = [
  { date: '22 Jan', close: 193.89, volume: 60133900 },
  { date: '23 Jan', close: 195.18, volume: 42355600 },
  { date: '24 Jan', close: 194.50, volume: 53631300 },
  { date: '25 Jan', close: 194.17, volume: 54822100 },
  { date: '26 Jan', close: 192.42, volume: 44594000 },
  { date: '29 Jan', close: 191.73, volume: 47145600 },
  { date: '30 Jan', close: 188.04, volume: 55859400 },
  { date: '31 Jan', close: 184.40, volume: 55467800 },
]

const appleCode = `import pandas as pd

aapl = pd.DataFrame(
    {
        "date": ["2024-01-22", "2024-01-23", "2024-01-24", "2024-01-25", "2024-01-26", "2024-01-29", "2024-01-30", "2024-01-31"],
        "close": [193.89, 195.18, 194.50, 194.17, 192.42, 191.73, 188.04, 184.40],
        "volume": [60133900, 42355600, 53631300, 54822100, 44594000, 47145600, 55859400, 55467800],
    }
)

period_return = aapl["close"].iloc[-1] / aapl["close"].iloc[0] - 1
price_range = (aapl["close"].min(), aapl["close"].max())
average_volume = int(aapl["volume"].mean())

print("Доходность периода:", round(period_return, 4))
print("Диапазон цен:", price_range)
print("Средний объем:", average_volume)`


const summaryCode = `summary_frame = (
    aapl.assign(daily_range=aapl["close"] - aapl["close"].mean())
        [["close", "volume", "daily_range"]]
        .agg(["mean", "min", "max"])
)

print(summary_frame.round(2))
print(sorted(aapl["close"].tolist())[:3])`

const summaryPlaygroundCode = `import pandas as pd

aapl = pd.DataFrame(
    {
        "date": ["2024-01-22", "2024-01-23", "2024-01-24", "2024-01-25", "2024-01-26", "2024-01-29", "2024-01-30", "2024-01-31"],
        "close": [193.89, 195.18, 194.50, 194.17, 192.42, 191.73, 188.04, 184.40],
        "volume": [60133900, 42355600, 53631300, 54822100, 44594000, 47145600, 55859400, 55467800],
    }
)

summary_frame = (
    aapl.assign(daily_range=aapl["close"] - aapl["close"].mean())
        [["close", "volume", "daily_range"]]
        .agg(["mean", "min", "max"])
)

print(summary_frame.round(2))
print()
print(sorted(aapl["close"].tolist())[:3])`

function Practice1_Screen2({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 1 · Основы инвестиционного анализа"
        title="Базовые категории: доходность, риск, ликвидность, горизонт"
        subtitle="Вводим четыре базовых понятия, без которых инвестиционное решение нельзя считать полным и корректно интерпретируемым."
      />

      <section className="content-block space-y-4">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
          Представьте, что перед вами две инвестиционные идеи: акции крупной технологической
          компании и краткосрочная облигация. Если смотреть только на потенциальную прибыль, выбор
          кажется простым. Но на практике мы почти сразу спрашиваем себя: насколько результат
          устойчив, можно ли быстро выйти из позиции и совпадает ли инструмент с нашим сроком?
        </p>
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
          Именно поэтому мы вводим <strong>доходность</strong> (англ. <em>return</em>),{' '}
          <strong>риск</strong> (англ. <em>risk</em>), <strong>ликвидность</strong> (англ.{' '}
          <em>liquidity</em>) и <strong>инвестиционный горизонт</strong> (англ.{' '}
          <em>investment horizon</em>). Инвестиционная альтернатива почти никогда не описывается
          одним показателем, и только система категорий делает сравнение профессионально
          корректным.
        </p>
        <MathText
          as="p"
          text="Инвестиционный анализ уже на базовом уровне имеет многокритериальную природу. Одинаковая доходность еще не означает одинакового качества решения: важны неопределенность результата, возможность быстро выйти из позиции и соответствие выбранному горизонту."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
        <MathText
          as="p"
          text="Поэтому профессиональный язык анализа строится не вокруг одного показателя, а вокруг системы взаимосвязанных категорий. Именно они затем переходят в математическую запись, таблицы и код."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
      </section>

      <section className="grid items-start gap-4 md:grid-cols-2">
        <article className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">Проблема одномерного взгляда</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            Два актива могут дать одинаковую ожидаемую доходность, но один будет очень волатилен,
            а другой легко продаваем. Для инвестора это уже не одно и то же решение.
          </p>
        </article>

        <article className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">Почему категории работают вместе</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            Доходность отвечает за результат, риск — за неопределенность, ликвидность — за условия
            выхода, а горизонт — за временную рамку решения. Лишь вместе они дают корректную основу
            для сравнения инвестиционных альтернатив.
          </p>
        </article>
      </section>

      <section className="grid items-start gap-4 md:grid-cols-2">
        {categoryCards.map((card) => (
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

      <section className="grid items-start gap-4 lg:grid-cols-2">
        <section className="content-block">
          <h3 className="section-title">Математическая запись</h3>
          <MathText
            as="p"
            text="Доходность удобно задавать как относительное изменение стоимости. Риск на базовом уровне можно понимать как разброс возможных значений вокруг ожидаемого результата."
            className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
          <MathBlock formula={String.raw`R = \frac{V_1 - V_0}{V_0}`} />
          <MathBlock formula={String.raw`\sigma^2 = \sum_{i=1}^{m} p_i \left(r_i - \mathbb{E}[R]\right)^2`} />
          <p className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200">
            Здесь <strong>V₀</strong> — начальная стоимость вложения, <strong>V₁</strong> —
            стоимость в конце периода, <strong>rᵢ</strong> — возможная доходность в сценарии{' '}
            <strong>i</strong>, <strong>pᵢ</strong> — вероятность этого сценария, а{' '}
            <strong>E[R]</strong> — ожидаемая доходность. Даже такая простая запись уже показывает:
            риск рождается не из одного числа, а из набора возможных исходов.
          </p>
        </section>

        <IdeaCard title="Как связаны категории">
          <p>
            Доходность без риска — неполная картина. Риск без горизонта — тоже неполная картина.
            В инвестиционном анализе значения приобретают смысл только в системе.
          </p>
        </IdeaCard>
      </section>

      <section className="content-block">
        <h3 className="section-title">Реальный пример: Apple в конце января 2024 года</h3>
        <MathText
          as="p"
          text="Ниже приведен короткий реальный фрагмент торгов AAPL. На нем удобно показать, как четыре категории читаются из одних и тех же данных: доходность — по изменению цены, риск — по диапазону колебаний, ликвидность — по объему торгов, горизонт — по длине наблюдаемого интервала."
          className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />
      </section>

      <SourceNote>
        Реальный датасет: акции <strong>AAPL</strong>, цены закрытия и объем торгов за{' '}
        <strong>22-31 января 2024 года</strong>. На коротком фрагменте ряда удобно читать все
        четыре базовые категории из одной и той же таблицы наблюдений.
      </SourceNote>

      <ComparisonTable
        columns={appleJanuaryData.map((row) => row.date)}
        rows={[
          {
            label: 'Цена закрытия, USD',
            values: appleJanuaryData.map((row) => row.close.toFixed(2)),
            highlight: true,
          },
          {
            label: 'Объем торгов, млн акций',
            values: appleJanuaryData.map((row) => (row.volume / 1_000_000).toFixed(1)),
          },
        ]}
      />

      <section className="space-y-4">
        <ThinkQuestion question="Если два актива показывают одинаковую доходность за период, почему инвестор всё равно не обязан считать их равнозначными?">
          <p>
            Потому что одинаковый итоговый результат может быть достигнут по-разному: через
            плавное движение цены или через серию резких скачков, с высокой или низкой
            ликвидностью, на коротком или длинном горизонте.
          </p>
          <p>
            Для инвестиционного решения это критично. Мы сравниваем не только «сколько заработали»,
            но и какой путь прошел инструмент до этого результата.
          </p>
        </ThinkQuestion>

        <IdeaCard title="Еще немного теории о ликвидности">
          <p>
            Ликвидность не равна доходности и не сводится к риску. Актив может быть надежным, но
            неудобным для быстрого выхода из позиции. На рынке это часто проявляется через низкий
            объем торгов, широкий спред и чувствительность цены к крупной заявке.
          </p>
          <p className="mt-3">
            Для инвестора ликвидность особенно важна тогда, когда горизонт короткий или когда
            предполагается необходимость быстро перераспределить капитал.
          </p>
        </IdeaCard>

        <IdeaCard title="Как читать эти данные">
          <p>
            Доходность на рассматриваемом интервале оказалась отрицательной, потому что цена
            снизилась с 193.89 до 184.40 доллара.
          </p>
          <p className="mt-3">
            Риск проявляется в колебаниях внутри периода, а ликвидность — в стабильно высоком
            обороте: каждый день торгуются десятки миллионов акций.
          </p>
        </IdeaCard>

        <section className="content-block">
          <h3 className="section-title">Python: собираем категории из реального ряда</h3>
          <div className="mt-4">
            <ExecutablePythonBlock
              code={appleCode}
              title="Python: выделяем доходность, риск и ликвидность"
              packages={['pandas']}
              note="После запуска можно изменить интервал или добавить новые дни, чтобы увидеть, как меняется сводка по категориям."
            />
          </div>
        </section>
      </section>

      <HandbookDetails title="Подробнее про ликвидность и почему объем торгов — это только первый ориентир">
        <p>
          Высокий объем торгов часто сигнализирует о хорошей ликвидности, но не исчерпывает ее.
          В прикладной работе аналитик дополнительно смотрит на спред между лучшей ценой покупки и
          продажи, глубину стакана и чувствительность цены к крупной заявке.
        </p>
        <p>
          На учебном уровне объема достаточно, чтобы у вас возникла правильная интуиция: ликвидный
          актив обычно проще купить или продать без сильного движения цены против инвестора.
        </p>
      </HandbookDetails>

      <section className="space-y-4">
        <section className="content-block">
          <h3 className="section-title">Полезные функции Python и pandas</h3>
          <MathText
            as="p"
            text="В анализе рыночных данных особенно полезны функции round(), sorted() и методы pandas agg(), assign(), query(). Они позволяют быстро перейти от сырых наблюдений к интерпретируемой сводке."
            className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
          <div className="mt-4">
            <ExecutablePythonBlock
              code={summaryCode}
              title="Python: полезные приемы сводки"
              playgroundCode={summaryPlaygroundCode}
              packages={['pandas']}
              note="В песочницу уже включена исходная таблица `aapl`, поэтому можно сразу экспериментировать со сводными операциями."
            />
          </div>
        </section>

        <IdeaCard title="Зачем эти функции в учебнике">
          <p>
            Они помогают не просто “посчитать что-нибудь”, а оформить исследование аккуратно:
            получить сводку, добавить вычисляемый столбец и быстро отфильтровать данные по
            условию.
          </p>
        </IdeaCard>
      </section>

      <KeyIdea title="Ключевой вывод">
        Доходность, риск, ликвидность и горизонт образуют минимальный понятийный каркас
        инвестиционного анализа. Если мы держим в фокусе все четыре категории сразу, то начинаем
        читать данные как аналитики, а не как наблюдатели одного красивого числа.
      </KeyIdea>

      <nav className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/practice/1/screen/1"
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Назад
        </Link>
        <Link
          to="/practice/1/screen/3"
          className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Далее: 3. Цифровая экономика
        </Link>
      </nav>
    </article>
  )
}

export default Practice1_Screen2
