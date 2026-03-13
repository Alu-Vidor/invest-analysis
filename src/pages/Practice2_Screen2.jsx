import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Scale, Sigma, Target } from 'lucide-react'
import CourseHeader from '../components/CourseHeader'
import MathBlock from '../components/MathBlock'
import MathText from '../components/MathText'
import KeyIdea from '../components/KeyIdea'
import ComparisonGrid from '../components/ComparisonGrid'
import PlotViewer from '../components/PlotViewer'
import HypothesisFlow from '../components/HypothesisFlow'

const contextNotes = [
  {
    title: 'Почему буква "H"?',
    text: 'От английского Hypothesis. Индекс $0$ означает «ноль эффекта» или baseline. Альтернативную гипотезу иногда обозначают как $H_A$ вместо $H_1$.',
  },
  {
    title: 'Односторонние и двусторонние тесты',
    text: 'Если нас интересует любое отличие, используем двустороннюю альтернативу: $\\mu_{new} \\neq \\mu_{old}$. Если важно доказать строгое улучшение, формулируем одностороннюю альтернативу: $\\mu_{new} > \\mu_{old}$.',
  },
]

const comparisonData = {
  left: {
    title: '$H_0$ (Null Hypothesis)',
    sections: [
      {
        label: 'Академический смысл',
        text: 'Эффекта нет. Разницы нет. Выборки совместимы с одной и той же генеральной совокупностью, а наблюдаемое отклонение объясняется случайностью.',
      },
      {
        label: 'Аналогия с судом',
        text: 'Презумпция невиновности: новый алгоритм, лекарство или дизайн считаются «неизменяющими ситуацию», пока данные не предоставят достаточно сильных улик.',
      },
    ],
    formula: 'H_0: \\mu_1 = \\mu_2',
  },
  right: {
    title: '$H_1$ (Alternative Hypothesis)',
    sections: [
      {
        label: 'Академический смысл',
        text: 'Эффект есть. Разница статистически значима. Данные плохо согласуются со статус-кво и указывают на реальное отличие между генеральными совокупностями.',
      },
      {
        label: 'Аналогия с судом',
        text: 'Это позиция обвинения: улик уже достаточно, чтобы отказаться от прежнего состояния мира и признать наличие эффекта.',
      },
    ],
    formula: 'H_1: \\mu_1 \\neq \\mu_2',
  },
}

const testForms = [
  {
    title: 'Двусторонний тест',
    text: 'Подходит, когда нам важно любое отличие — и рост, и падение.',
    formula: 'H_0: \\mu = \\mu_0 \\qquad H_1: \\mu \\neq \\mu_0',
  },
  {
    title: 'Правосторонний тест',
    text: 'Используется, когда бизнес-гипотеза говорит именно о росте метрики.',
    formula: 'H_0: \\mu \\le \\mu_0 \\qquad H_1: \\mu > \\mu_0',
  },
  {
    title: 'Левосторонний тест',
    text: 'Нужен, когда нас интересует строгое уменьшение показателя, например времени отклика.',
    formula: 'H_0: \\mu \\ge \\mu_0 \\qquad H_1: \\mu < \\mu_0',
  },
]

const reportTemplates = [
  {
    title: 'Параметрическая гипотеза',
    text: 'Когда проверяем среднее, долю или другой параметр, нулевая гипотеза почти всегда фиксирует конкретное числовое значение.',
    formula: 'H_0: \\theta = \\theta_0, \\qquad H_1: \\theta \\neq \\theta_0',
  },
  {
    title: 'Гипотеза о распределении',
    text: 'Когда задача касается формы выборки, гипотеза формулируется как согласие данных с выбранным законом.',
    formula: 'H_0: F(x)=F_0(x), \\qquad H_1: F(x) \\neq F_0(x)',
  },
  {
    title: 'Отчетная формулировка',
    text: 'В академическом отчете лучше писать не общие слова, а явно указывать объект проверки и тип альтернативы.',
    formula: 'H_0:\\ \\text{данные согласуются с нормальным распределением}',
  },
]

function Practice2_Screen2({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 2 -> ИНТУИЦИЯ"
        title="Формулируем гипотезы: $H_0$ и $H_1$"
        subtitle="Математическая презумпция невиновности."
      />

      <section className="content-block space-y-6">
        <MathText
          as="p"
          text="Любой статистический тест начинается с формулировки двух взаимоисключающих утверждений. Мы не можем просто сказать алгоритму «найди инсайты». Мы должны задать строгую систему координат: что считаем статус-кво и какое именно отклонение считаем доказательством эффекта."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />

        <ComparisonGrid left={comparisonData.left} right={comparisonData.right} />

        <PlotViewer
          title="Визуальная логика проверки гипотез"
          caption="Сначала фиксируем статус-кво, затем задаём тип отклонения и только после этого переводим задачу в тестовую статистику."
        >
          <HypothesisFlow />
        </PlotViewer>

        <section className="grid gap-5 lg:grid-cols-3">
          <article className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-700 dark:bg-slate-900/70">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white">
              <Scale size={18} />
              <h3 className="text-base font-semibold">Шаг 1. Формулируем</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              Явно задаем параметр интереса: среднее, долю, дисперсию или форму распределения.
            </p>
          </article>

          <article className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-700 dark:bg-slate-900/70">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white">
              <Sigma size={18} />
              <h3 className="text-base font-semibold">Шаг 2. Строим статистику</h3>
            </div>
            <MathText
              as="p"
              text="Выбираем число, которое будет измерять расхождение между данными и $H_0$."
              className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200"
            />
          </article>

          <article className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-700 dark:bg-slate-900/70">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white">
              <Target size={18} />
              <h3 className="text-base font-semibold">Шаг 3. Сравниваем</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              Смотрим, насколько далеко полученное значение уходит от нуля эффекта.
            </p>
          </article>
        </section>

        <section className="rounded-[1.5rem] border border-indigo-200 bg-indigo-50/70 p-6 dark:border-indigo-900/50 dark:bg-indigo-950/20">
          <h3 className="text-lg font-semibold tracking-tight text-indigo-900 dark:text-indigo-200">
            Математический шаблон проверки
          </h3>
          <MathText
            as="p"
            text="Почти любой тест можно мыслить как вычисление статистики $T(X)$ и сравнение ее с ожидаемым поведением при условии, что $H_0$ верна."
            className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
          <MathBlock formula={String.raw`T(X)=\frac{\text{оценка из выборки}-\text{значение по }H_0}{\text{стандартная ошибка}}`} />
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            Чем больше по модулю статистика, тем труднее объяснить данные случайным шумом.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Три стандартные формы альтернативы
          </h3>
          <div className="grid gap-4 lg:grid-cols-3">
            {testForms.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900"
              >
                <h4 className="text-base font-semibold text-slate-900 dark:text-white">{item.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">{item.text}</p>
                <MathBlock formula={item.formula} />
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Как писать гипотезу в отчете
          </h3>
          <MathText
            as="p"
            text="Хорошая гипотеза всегда отвечает на два вопроса: какой объект мы проверяем и что именно считаем отклонением от нормы. Ниже три академически корректных шаблона, которые понадобятся дальше в Практике 2."
            className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {reportTemplates.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.25rem] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-700 dark:bg-slate-950/70"
              >
                <h4 className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-900 dark:text-white">
                  {item.title}
                </h4>
                <MathText
                  as="p"
                  text={item.text}
                  className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200"
                />
                <MathBlock formula={item.formula} />
              </article>
            ))}
          </div>
        </section>

        <details className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft open:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:open:bg-slate-900/90">
          <summary className="cursor-pointer text-sm font-semibold uppercase tracking-[0.08em] text-slate-900 dark:text-white">
            <MathText text="Мини-интерактив: как выбрать знак в $H_1$?" />
          </summary>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            <p>
              Если заранее неважно, в какую сторону уйдет метрика, выбирайте двустороннюю
              альтернативу. Если бизнес-цель заранее сформулирована как «увеличить» или
              «уменьшить», можно использовать односторонний тест.
            </p>
            <MathText
              as="p"
              text="Ключевой принцип: знак в $H_1$ должен быть определен до просмотра данных, иначе тест перестает быть честным."
            />
          </div>
        </details>

        <KeyIdea title="Мы никогда не доказываем $H_0$.">
          <MathText
            as="p"
            text="Статистический тест не выносит вердикт «нулевая гипотеза истинна». Он лишь проверяет, хватило ли улик, чтобы ее отвергнуть. Поэтому корректная формулировка всегда звучит так: либо отвергаем $H_0$, либо не отвергаем $H_0$."
          />
        </KeyIdea>
      </section>

      <nav className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/practice/2/screen/1"
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Назад
        </Link>

        <Link
          to="/practice/2/screen/3"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Далее: 3. Ошибки I и II рода
          <ArrowRight size={16} />
        </Link>
      </nav>
    </article>
  )
}

export default Practice2_Screen2
