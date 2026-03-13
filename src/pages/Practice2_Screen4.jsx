import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Coins, Percent, Scale } from 'lucide-react'
import CourseHeader from '../components/CourseHeader'
import KeyIdea from '../components/KeyIdea'
import AlertBox from '../components/AlertBox'
import RuleCard from '../components/RuleCard'
import MathBlock from '../components/MathBlock'
import MathText from '../components/MathText'
import PlotViewer from '../components/PlotViewer'
import PValueTailChart from '../components/PValueTailChart'

const contextNotes = [
  {
    title: '❌ Самая частая ошибка',
    text: 'Нельзя интерпретировать $p$-value как вероятность истинности $H_0$. $p$-value описывает вероятность получить наблюдаемые данные при условии, что $H_0$ верна.',
  },
  {
    title: 'Почему именно $0.05$?',
    text: 'Порог значимости $\\alpha = 0.05$ — это соглашение, а не закон природы. В задачах с дорогой ошибкой I рода порог делают строже: $0.01$, $0.001$ и ниже.',
  },
]

const decisionCards = [
  {
    tone: 'error',
    title: '$p \\le \\alpha$',
    text: 'Наблюдаемые данные слишком плохо согласуются с $H_0$. На выбранном уровне значимости мы отвергаем именно эту нулевую гипотезу.',
    verdict: 'Решение: отвергаем $H_0$',
  },
  {
    tone: 'success',
    title: '$p > \\alpha$',
    text: 'Данных пока недостаточно, чтобы объявить противоречие с $H_0$. Это не доказательство $H_0$, а только отсутствие оснований её отвергнуть.',
    verdict: 'Решение: не отвергаем $H_0$',
  },
]

const examples = [
  {
    title: 'Проверка среднего',
    hypothesis: '$H_0$: среднее не изменилось',
    meaning: 'Если $p \\le \\alpha$, отвергаем отсутствие эффекта. Тогда говорят, что отличие статистически значимо.',
  },
  {
    title: 'Нормальность / критерий согласия',
    hypothesis: '$H_0$: данные согласуются с распределением',
    meaning: 'Если $p > \\alpha$, у нас нет оснований отвергать согласие. Если статистика критерия меньше критической границы, это тот же вывод: $H_0$ не отвергается.',
  },
  {
    title: 'Регрессия',
    hypothesis: '$H_0$: коэффициент равен нулю',
    meaning: 'Если $p \\le \\alpha$, отвергаем нулевой коэффициент. Отсюда и появляется практическая фраза «коэффициент значим».',
  },
]

const reportLines = [
  {
    title: 'Шаг 1. Формула решения',
    text: 'Сначала даем чисто статистический вердикт: сравниваем $p$-value с $\\alpha$ и пишем только про $H_0$.',
  },
  {
    title: 'Шаг 2. Предметный смысл',
    text: 'Затем переводим это решение на язык задачи: нормальность, логнормальность, среднее, коэффициент и т.д.',
  },
  {
    title: 'Шаг 3. Осторожность',
    text: 'Не используем формулировки «доказано» и «точно». Частотная статистика работает языком оснований и согласия с данными.',
  },
]

function Practice2_Screen4({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 2 -> ИНТУИЦИЯ"
        title="$p$-value: переводим на человеческий"
        subtitle="Как измерить степень удивления от полученных данных."
      />

      <section className="content-block space-y-6">
        <section className="rounded-[1.75rem] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-amber-50 p-6 shadow-soft dark:border-slate-700 dark:from-slate-900 dark:via-slate-900 dark:to-amber-950/20">
          <div className="flex items-start gap-3">
            <Coins size={22} className="mt-1 shrink-0 text-amber-600 dark:text-amber-300" />
            <div className="space-y-4 text-base leading-relaxed text-slate-700 dark:text-slate-200">
              <MathText
                as="p"
                text="Представьте, что друг дает вам монетку и уверяет, что она честная. Это и есть нулевая гипотеза $H_0$. Один орел, два орла, даже три орла подряд нас не поражают."
              />
              <p>
                Но если при 10 бросках подряд <strong>все 10 раз выпал орел</strong>, интуиция
                резко меняется: случайность еще возможна, но выглядит уже крайне неправдоподобно.
              </p>
            </div>
          </div>
        </section>

        <AlertBox title="Удивление">
          <p>
            Для честной монетки вероятность десяти орлов подряд равна
            <code> (1/2)^10 = 1/1024 ≈ 0.00098</code>, то есть меньше одной десятой процента.
          </p>
          <MathBlock formula={String.raw`P(10\ \text{орлов подряд} \mid H_0)=\left(\frac{1}{2}\right)^{10}\approx 0.00098`} />
          <p>
            Это и есть логика <strong>p-value</strong>: мы оцениваем, насколько редким был бы наш
            результат, если бы текущая нулевая гипотеза была верна.
          </p>
        </AlertBox>

        <KeyIdea title="Что такое $p$-value?">
          <MathText
            as="p"
            text="$p$-value — это вероятность получить такие же или еще более экстремальные данные при условии, что $H_0$ верна. Это число всегда интерпретируется только относительно конкретной нулевой гипотезы, а не относительно абстрактного «эффекта»."
          />
        </KeyIdea>

        <AlertBox title="Универсальное правило решения">
          <MathText
            as="p"
            text={String.raw`Частотная статистика использует только два корректных вывода: $p \le \alpha \Rightarrow$ отвергаем $H_0$; $p > \alpha \Rightarrow$ не отвергаем $H_0$.`}
          />
          <MathText
            as="p"
            text="Что именно означает это решение содержательно, зависит от формулировки $H_0$. Поэтому фразы вроде «эффект есть» или «распределение принято» — это уже прикладная интерпретация после статистического решения."
          />
        </AlertBox>

        <PlotViewer
          title="Хвост распределения и p-value"
          caption="Оранжевая область — это вероятность получить наблюдение не менее экстремальное при условии, что текущая H₀ верна. Чем она меньше, тем сильнее аргумент против этой H₀."
        >
          <PValueTailChart />
        </PlotViewer>

        <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-[1.5rem] border border-indigo-200 bg-indigo-50/70 p-6 dark:border-indigo-900/50 dark:bg-indigo-950/20">
            <div className="flex items-start gap-3">
              <Percent size={20} className="mt-0.5 shrink-0 text-indigo-600 dark:text-indigo-300" />
              <div>
                <MathText
                  as="h3"
                  text="$p$-value как площадь хвоста"
                  className="text-lg font-semibold tracking-tight text-indigo-900 dark:text-indigo-200"
                />
                <MathText
                  as="p"
                  text="На графике $p$-value — это площадь хвоста распределения, которую отсекает наша наблюдаемая статистика. Чем дальше статистика от центра распределения при $H_0$, тем меньше хвост и тем сильнее наше математическое удивление."
                  className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200"
                />
                <MathBlock formula={String.raw`p\text{-value}=P(|T|\ge |t_{obs}|\mid H_0)`} />
                <MathText
                  as="p"
                  text="Если изменить формулировку $H_0$, изменится и смысл вывода. Именно поэтому в критериях согласия, тестах на нормальность и в регрессии одна и та же механика $p$-value приводит к разным содержательным формулировкам."
                  className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200"
                />
              </div>
            </div>
          </article>

          <article className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
            <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
              Решение в три строки
            </h3>
            <ol className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              <li>
                <MathText text="1. Явно запишите $H_0$." />
              </li>
              <li>
                <MathText text="2. Вычислите статистику критерия и соответствующее $p$-value." />
              </li>
              <li>
                <MathText text={String.raw`3. Сравните $p$-value с $\alpha$ и сделайте вывод только про $H_0$.`} />
              </li>
            </ol>
          </article>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          {decisionCards.map((card) => (
            <RuleCard key={card.title} {...card} />
          ))}
        </section>

        <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <div className="flex items-start gap-3">
            <Scale size={20} className="mt-1 shrink-0 text-slate-600 dark:text-slate-300" />
            <div className="space-y-4">
              <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                Как меняется смысл в разных задачах
              </h3>
              <div className="grid gap-4 lg:grid-cols-3">
                {examples.map((example) => (
                  <article key={example.title} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-950/70">
                    <h4 className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-900 dark:text-white">
                      {example.title}
                    </h4>
                    <MathText as="p" text={example.hypothesis} className="mt-3 text-sm font-medium text-slate-900 dark:text-white" />
                    <MathText as="p" text={example.meaning} className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200" />
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Шаблон вывода для отчета
          </h3>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {reportLines.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-950/70"
              >
                <h4 className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-900 dark:text-white">
                  {item.title}
                </h4>
                <MathText
                  as="p"
                  text={item.text}
                  className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200"
                />
              </article>
            ))}
          </div>
          <div className="mt-4 rounded-2xl border border-indigo-200 bg-indigo-50/70 p-4 dark:border-indigo-900/50 dark:bg-indigo-950/20">
            <MathText
              as="p"
              text={String.raw`Базовая формула записи: «На уровне значимости $\alpha = 0.05$ нулевая гипотеза $H_0$ ... , поскольку $p$-value ... . Следовательно, данные ...».`}
              className="text-sm leading-relaxed text-slate-700 dark:text-slate-200"
            />
          </div>
        </section>

        <details className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft open:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:open:bg-slate-900/90">
          <summary className="cursor-pointer text-sm font-semibold uppercase tracking-[0.08em] text-slate-900 dark:text-white">
            <MathText text="Мини-интерактив: что НЕ говорит $p$-value?" />
          </summary>
          <div className="mt-4 grid gap-3 lg:grid-cols-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Не говорит</p>
              <MathText as="p" text="«Вероятность истинности $H_0$ равна $3\\%$», «модель доказана» или «эффект точно есть» — это неверные интерпретации." className="mt-1" />
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Говорит</p>
              <MathText as="p" text="«Если $H_0$ верна, то увидеть такие данные случайно было бы трудно или легко — в зависимости от величины $p$-value»." className="mt-1" />
            </div>
          </div>
        </details>
      </section>

      <nav className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/practice/2/screen/3"
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Назад
        </Link>

        <Link
          to="/practice/2/screen/5"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Далее: 5. QQ-plot: смотрим на нормальность
          <ArrowRight size={16} />
        </Link>
      </nav>
    </article>
  )
}

export default Practice2_Screen4
