import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ShieldAlert, ShieldCheck, TrendingUp } from 'lucide-react'
import CourseHeader from '../components/CourseHeader'
import MathBlock from '../components/MathBlock'
import MathText from '../components/MathText'
import KeyIdea from '../components/KeyIdea'
import ConfusionMatrix from '../components/ConfusionMatrix'
import PlotViewer from '../components/PlotViewer'
import ErrorTradeoffChart from '../components/ErrorTradeoffChart'

const contextNotes = [
  {
    title: 'Что страшнее для бизнеса?',
    text: 'Цена ошибки зависит от задачи. В медицине часто критичнее ошибка II рода: пропустить болезнь опаснее, чем зря отправить на дообследование. В антиспаме наоборот — важнее не потерять полезное письмо, даже если часть спама проскочит.',
  },
  {
    title: 'Индустриальный стандарт $\\alpha$',
    text: 'Часто заранее фиксируют $\\alpha = 0.05$. Это означает готовность в среднем в $5\\%$ случаев ошибочно увидеть эффект там, где его нет.',
  },
]

const matrixColumns = [
  { title: '$H_0$ верна', subtitle: 'Эффекта нет' },
  { title: '$H_1$ верна', subtitle: 'Эффект есть' },
]

const matrixRows = [
  { title: 'Не отвергаем $H_0$', subtitle: 'Оставляем всё как есть' },
  { title: 'Отвергаем $H_0$', subtitle: 'Внедряем изменения' },
]

const matrixCells = [
  [
    {
      type: 'success',
      title: 'Истинно-отрицательный (True Negative)',
      text: 'Мы правильно сохранили статус-кво: бесполезную фичу не внедрили.',
    },
    {
      type: 'error',
      title: 'Ошибка II рода (False Negative)',
      text: 'Вероятность $\\beta$. Реальный эффект есть, но тест его пропустил.',
    },
  ],
  [
    {
      type: 'error',
      title: 'Ошибка I рода (False Positive)',
      text: 'Уровень значимости $\\alpha$. Мы увидели эффект там, где его на самом деле нет.',
    },
    {
      type: 'success',
      title: 'Истинно-положительный (True Positive)',
      text: 'Мы засекли реальный эффект. Эта вероятность называется мощностью критерия.',
    },
  ],
]

const tradeoffCards = [
  {
    icon: ShieldAlert,
    title: 'Ошибка I рода',
    text: 'Ложная тревога: принимаем шум за открытие.',
    formula: String.raw`\alpha = P(\text{reject } H_0 \mid H_0\, \text{ true})`,
    tone: 'rose',
  },
  {
    icon: ShieldCheck,
    title: 'Ошибка II рода',
    text: 'Пропущенный сигнал: эффект есть, но тест молчит.',
    formula: String.raw`\beta = P(\text{fail to reject } H_0 \mid H_1\, \text{ true})`,
    tone: 'sky',
  },
  {
    icon: TrendingUp,
    title: 'Мощность',
    text: 'Шанс действительно заметить эффект, если он существует.',
    formula: String.raw`1 - \beta`,
    tone: 'emerald',
  },
]

const toneMap = {
  rose: 'border-rose-200 bg-rose-50/80 dark:border-rose-900/50 dark:bg-rose-950/20',
  sky: 'border-sky-200 bg-sky-50/80 dark:border-sky-900/50 dark:bg-sky-950/20',
  emerald: 'border-emerald-200 bg-emerald-50/80 dark:border-emerald-900/50 dark:bg-emerald-950/20',
}

function Practice2_Screen3({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 2 -> ИНТУИЦИЯ"
        title="Ошибки I и II рода: кого посадить?"
        subtitle="Почему в статистике нельзя быть правым на 100% и как выбрать меньшее из зол."
      />

      <section className="content-block space-y-6">
        <MathText
          as="p"
          text="Мы сформулировали гипотезы, собрали данные и вынесли вердикт. Но тест работает не со всей генеральной совокупностью, а лишь с выборкой. Поэтому даже при корректной процедуре наш вердикт может оказаться ошибочным. У статистики есть ровно два типа таких ошибок."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />

        <ConfusionMatrix columns={matrixColumns} rows={matrixRows} cells={matrixCells} />

        <PlotViewer
          title="Как меняются α, β и мощность"
          caption="Слева — мягкий порог: тест чаще объявляет эффект. Справа — строгий порог: α падает, но β растёт, а мощность снижается."
        >
          <ErrorTradeoffChart />
        </PlotViewer>

        <section className="grid gap-5 lg:grid-cols-3">
          {tradeoffCards.map((card) => {
            const Icon = card.icon
            return (
              <article
                key={card.title}
                className={`rounded-[1.5rem] border p-5 shadow-soft ${toneMap[card.tone]}`}
              >
                <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                  <Icon size={18} />
                  <h3 className="text-base font-semibold">{card.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">{card.text}</p>
                <MathBlock formula={card.formula} />
              </article>
            )
          })}
        </section>

        <section className="rounded-[1.5rem] border border-indigo-200 bg-indigo-50/70 p-6 dark:border-indigo-900/50 dark:bg-indigo-950/20">
          <h3 className="text-lg font-semibold tracking-tight text-indigo-900 dark:text-indigo-200">
            Баланс ошибок при фиксированном размере выборки
          </h3>
          <p className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200">
            Если сделать правило слишком строгим, чтобы почти никогда не получать ложных тревог,
            тест начнет часто пропускать реальные эффекты. Это и есть фундаментальный компромисс.
          </p>
          <MathBlock formula={String.raw`\alpha \downarrow \; \Rightarrow \; \beta \uparrow, \qquad \alpha \uparrow \; \Rightarrow \; \beta \downarrow`} />
          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white/80 p-4 dark:border-slate-700 dark:bg-slate-900/80">
              <MathText as="p" text={String.raw`Низкий $\alpha$`} className="text-sm font-semibold text-slate-900 dark:text-white" />
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">Меньше ложных срабатываний, но больше пропущенных эффектов.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white/80 p-4 dark:border-slate-700 dark:bg-slate-900/80">
              <MathText as="p" text={String.raw`Высокий $\alpha$`} className="text-sm font-semibold text-slate-900 dark:text-white" />
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">Легче объявить эффект, но возрастает риск ошибочного внедрения.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white/80 p-4 dark:border-slate-700 dark:bg-slate-900/80">
              <MathText as="p" text="Большое $n$" className="text-sm font-semibold text-slate-900 dark:text-white" />
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">Единственный способ одновременно уменьшить обе ошибки и поднять мощность.</p>
            </div>
          </div>
        </section>

        <details className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft open:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:open:bg-slate-900/90">
          <summary className="cursor-pointer text-sm font-semibold uppercase tracking-[0.08em] text-slate-900 dark:text-white">
            Мини-интерактив: какой режим выбрать?
          </summary>
          <div className="mt-4 grid gap-3 lg:grid-cols-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Консервативный режим</p>
              <p className="mt-1">Подходит, когда ложное внедрение дорого стоит: медицина, финансы, продакшен-релизы.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Чувствительный режим</p>
              <p className="mt-1">Подходит, когда важнее не пропустить сигнал: скрининг, поиск аномалий, ранние исследования.</p>
            </div>
          </div>
        </details>

        <KeyIdea title={String.raw`Баланс $\alpha$ и $\beta$`}>
          {'Ошибки I и II рода связаны как качели. Настраивая строгость теста, вы почти всегда перераспределяете риск между ними. Единственный способ реально улучшить обе стороны сразу — увеличить размер выборки и тем самым сузить шум выборочных оценок.'}
        </KeyIdea>
      </section>

      <nav className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/practice/2/screen/2"
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Назад
        </Link>

        <Link
          to="/practice/2/screen/4"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Далее: 4. P-value: переводим на человеческий
          <ArrowRight size={16} />
        </Link>
      </nav>
    </article>
  )
}

export default Practice2_Screen3
