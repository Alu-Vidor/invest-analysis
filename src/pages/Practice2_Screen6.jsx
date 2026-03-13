import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Calculator, Dices, Sigma, Target, TriangleAlert } from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Area,
  Legend,
  Line,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import CourseHeader from '../components/CourseHeader'
import MathBlock from '../components/MathBlock'
import CodeBlock from '../components/CodeBlock'
import KeyIdea from '../components/KeyIdea'
import MathText from '../components/MathText'
import TerminalOutput from '../components/TerminalOutput'
import ComparisonTable from '../components/ComparisonTable'
import PlotViewer from '../components/PlotViewer'

const contextNotes = [
  {
    title: 'Жесткое ограничение',
    text: 'У критерия Пирсона есть важное правило: ожидаемая частота в каждой корзине ($E_i$) должна быть не меньше 5. Если вы кинете кубик всего 12 раз, математика Хи-квадрата начнет врать. В таких случаях корзины объединяют.',
  },
  {
    title: 'Степени свободы (df)',
    text: 'Форма распределения $\\chi^2$ зависит от числа степеней свободы. Здесь это число категорий минус один: $6 - 1 = 5$. Для монетки с двумя исходами график был бы совсем другим. SciPy учитывает это автоматически.',
  },
]

const comparisonColumns = ['1', '2', '3', '4', '5', '6']

const comparisonRows = [
  {
    label: 'Ожидаем (E)',
    values: [10, 10, 10, 10, 10, 10],
  },
  {
    label: 'Наблюдаем (O)',
    values: [5, 8, 9, 12, 14, 12],
    highlight: true,
  },
]

const contributionRows = [
  { face: '1', observed: 5, expected: 10, diff: -5, contribution: 2.5 },
  { face: '2', observed: 8, expected: 10, diff: -2, contribution: 0.4 },
  { face: '3', observed: 9, expected: 10, diff: -1, contribution: 0.1 },
  { face: '4', observed: 12, expected: 10, diff: 2, contribution: 0.4 },
  { face: '5', observed: 14, expected: 10, diff: 4, contribution: 1.6 },
  { face: '6', observed: 12, expected: 10, diff: 2, contribution: 0.4 },
]

const observedExpectedRows = contributionRows.map((item) => ({
  face: item.face,
  observed: item.observed,
  expected: item.expected,
}))

const chiSquareCurveData = [
  { x: 0, density: 0.0 },
  { x: 1, density: 0.08 },
  { x: 2, density: 0.14 },
  { x: 3, density: 0.16 },
  { x: 4, density: 0.15 },
  { x: 5, density: 0.125 },
  { x: 5.4, density: 0.115 },
  { x: 6, density: 0.1 },
  { x: 7, density: 0.075 },
  { x: 8, density: 0.055 },
  { x: 9, density: 0.04 },
  { x: 10, density: 0.028 },
  { x: 11.07, density: 0.02 },
  { x: 12, density: 0.015 },
  { x: 14, density: 0.008 },
  { x: 16, density: 0.004 },
]

const summaryCards = [
  { label: 'Статистика', value: 'χ² = 5.40', tone: 'border-slate-200 bg-slate-50/80 dark:border-slate-700 dark:bg-slate-950/70' },
  { label: 'Степени свободы', value: 'df = 5', tone: 'border-sky-200 bg-sky-50/80 dark:border-sky-900/50 dark:bg-sky-950/20' },
  { label: 'Решение', value: 'p = 0.369 > 0.05', tone: 'border-emerald-200 bg-emerald-50/80 dark:border-emerald-900/50 dark:bg-emerald-950/20' },
]

const chiSquareCode = `import scipy.stats as stats

# Наши данные
observed = [5, 8, 9, 12, 14, 12]
expected = [10, 10, 10, 10, 10, 10]

# Проводим тест Хи-квадрат
chi2_stat, p_value = stats.chisquare(f_obs=observed, f_exp=expected)

print(f"Статистика Хи-квадрат: {chi2_stat:.2f}")
print(f"P-value: {p_value:.4f}")`

const expectedPipelineCode = `import numpy as np
from scipy import stats

# discrete_data — наблюдаемое количество событий
values, observed = np.unique(discrete_data, return_counts=True)
n = observed.sum()

# 1. Оцениваем параметр модели
lambda_hat = discrete_data.mean()

# 2. Считаем теоретические вероятности
probabilities = stats.poisson.pmf(values, mu=lambda_hat)

# 3. Переводим вероятности в ожидаемые частоты
expected = n * probabilities

# 4. Если некоторые expected < 5, объединяем редкие категории
# 5. После этого запускаем chisquare(observed, expected)`

const modelChoiceCards = [
  {
    title: 'Пуассон',
    text: 'Считаем редкие события за фиксированный интервал: клиенты за час, ошибки на странице, заявки за минуту.',
  },
  {
    title: 'Биномиальное',
    text: 'Считаем число успехов в заранее фиксированном числе испытаний: орлы в 10 бросках, дефекты в партии из 50 изделий.',
  },
]

const documentationLinks = [
  {
    label: 'SciPy: chisquare',
    href: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.chisquare.html',
  },
  {
    label: 'SciPy: poisson',
    href: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.poisson.html',
  },
  {
    label: 'SciPy: kstest',
    href: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.kstest.html',
  },
]

function Practice2_Screen6({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 2 -> КРИТЕРИИ В КОДЕ"
        title={String.raw`Критерий согласия Хи-квадрат ($\chi^2$)`}
        subtitle="Сравниваем реальность с нашими ожиданиями."
      />

      <section className="content-block space-y-6">
        <MathText
          as="p"
          text="Если QQ-plot нужен для непрерывных величин (рост, вес, доходы), то для категориальных и дискретных частот используют критерий Хи-квадрат Пирсона. Его логика проста: мы берем наблюдаемые частоты (Observed) и сравниваем их с ожидаемыми (Expected). Чем больше расхождение, тем сильнее данные спорят с нулевой гипотезой."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />

        <section className="rounded-[1.5rem] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-amber-50 p-6 shadow-soft dark:border-slate-700 dark:from-slate-900 dark:via-slate-900 dark:to-amber-950/20">
          <div className="flex items-start gap-3">
            <Dices size={22} className="mt-1 shrink-0 text-amber-600 dark:text-amber-300" />
            <div className="space-y-4">
              <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                Интуиция и формула
              </h3>
              <MathText
                as="p"
                text="Представьте, что мы кинули игральный кубик 60 раз. Если он честный ($H_0$), мы ожидаем, что каждая грань выпадет ровно по 10 раз. Но в реальности цифры почти никогда не совпадают идеально."
                className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
              />
              <ComparisonTable columns={comparisonColumns} rows={comparisonRows} />
              <MathText
                as="p"
                text="Чтобы понять, случаен ли такой перекос, Пирсон предложил одну сумму: на каждом шаге берем разницу между $O_i$ и $E_i$, возводим ее в квадрат и делим на ожидаемую частоту."
                className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
              />
              <MathBlock formula={String.raw`\chi^2 = \sum_{i=1}^{k} \frac{(O_i - E_i)^2}{E_i}`} />
              <MathText
                as="p"
                text="Здесь $O_i$ — Observed, а $E_i$ — Expected. Квадрат нужен, чтобы отрицательные и положительные отклонения не взаимоуничтожались."
                className="text-sm leading-relaxed text-slate-700 dark:text-slate-200"
              />
            </div>
          </div>
        </section>

        <PlotViewer
          title="Observed vs Expected по каждой грани"
          caption="Синие столбцы показывают ожидаемые частоты, янтарные — наблюдаемые. Чем сильнее расходятся пары столбцов, тем больше вклад соответствующей категории в статистику χ²."
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={observedExpectedRows} margin={{ top: 12, right: 16, left: 0, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" vertical={false} />
              <XAxis dataKey="face" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Legend verticalAlign="top" height={28} />
              <Bar dataKey="expected" name="Expected" fill="#6366f1" radius={[8, 8, 0, 0]} />
              <Bar dataKey="observed" name="Observed" fill="#f59e0b" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </PlotViewer>

        <section className="grid gap-4 lg:grid-cols-2">
          <article className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Что показывает этот график</h3>
            <MathText
              as="p"
              text="Он отвечает на первый вопрос: где именно данные расходятся с моделью. Здесь самые заметные отклонения у граней 1 и 5."
              className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200"
            />
          </article>

          <article className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Чего он не показывает</h3>
            <MathText
              as="p"
              text="Визуальный перекос еще не означает статистическую значимость. Нужно понять, редок ли такой рисунок при честном кубике."
              className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200"
            />
          </article>
        </section>

        <div className="grid gap-4 lg:grid-cols-3">
          {summaryCards.map((card) => (
            <article key={card.label} className={`rounded-[1.5rem] border p-5 shadow-soft ${card.tone}`}>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-600 dark:text-slate-300">
                {card.label}
              </p>
              <p className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">{card.value}</p>
            </article>
          ))}
        </div>

        <PlotViewer
          title="Где находится наше значение χ²"
          caption="Для df = 5 правый хвост соответствует редким большим отклонениям. Наша статистика χ² = 5.4 лежит левее критической границы около 11.07, поэтому оснований отвергать H₀ нет."
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chiSquareCurveData} margin={{ top: 16, right: 24, left: 0, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" vertical={false} />
              <XAxis dataKey="x" type="number" tickLine={false} axisLine={false} domain={[0, 16]} />
              <YAxis hide domain={[0, 0.18]} />
              <Tooltip
                formatter={(value) => [value, 'Плотность']}
                labelFormatter={(label) => `χ² = ${label}`}
              />
              <ReferenceArea x1={11.07} x2={16} fill="#fecaca" fillOpacity={0.35} />
              <Area type="monotone" dataKey="density" stroke="#6366f1" fill="#c7d2fe" fillOpacity={0.55} />
              <Line type="monotone" dataKey="density" stroke="#4f46e5" dot={false} strokeWidth={2} />
              <ReferenceLine x={5.4} stroke="#f59e0b" strokeWidth={2} />
              <ReferenceLine x={11.07} stroke="#dc2626" strokeDasharray="5 5" />
            </ComposedChart>
          </ResponsiveContainer>
        </PlotViewer>

        <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[1.5rem] border border-indigo-200 bg-indigo-50/70 p-5 shadow-soft dark:border-indigo-900/50 dark:bg-indigo-950/20">
            <div className="flex items-start gap-3">
              <Sigma size={20} className="mt-1 shrink-0 text-indigo-600 dark:text-indigo-300" />
              <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">Как читать распределение</h3>
                <MathText
                  as="p"
                  text={String.raw`Большие значения $\chi^2$ лежат справа. Именно правый хвост образует критическую зону, где расхождение уже считается слишком сильным для случайности.`}
                  className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200"
                />
              </div>
            </div>
          </article>

          <article className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Вывод по нашему примеру</h3>
            <MathText
              as="p"
              text={String.raw`Наша статистика $\chi^2 = 5.4$ стоит заметно левее критической границы. Значит, такого расхождения еще недостаточно, чтобы отвергнуть $H_0$.`}
              className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200"
            />
          </article>
        </section>

        <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <div className="flex items-start gap-3">
            <TriangleAlert size={20} className="mt-1 shrink-0 text-amber-600 dark:text-amber-300" />
            <MathText
              as="p"
              text={String.raw`Практическое ограничение: критерий Пирсона корректен, когда ожидаемые частоты в корзинах не слишком малы. Для учебного правила держите в памяти порог $E_i \ge 5$.`}
              className="text-sm leading-relaxed text-slate-700 dark:text-slate-200"
            />
          </div>
        </section>

        <PlotViewer
          title="Какие грани сильнее всего тянут статистику вверх"
          caption="Самый большой вклад дают те категории, где разрыв между наблюдаемой и ожидаемой частотой максимален. В этом примере главные источники статистики — грани 1 и 5."
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={contributionRows} margin={{ top: 12, right: 16, left: 0, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" vertical={false} />
              <XAxis dataKey="face" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip
                cursor={{ fill: 'rgba(148, 163, 184, 0.12)' }}
                formatter={(value) => [value, 'Вклад в χ²']}
                labelFormatter={(label) => `Грань ${label}`}
              />
              <ReferenceLine y={1} stroke="#f59e0b" strokeDasharray="5 5" />
              <Bar dataKey="contribution" radius={[10, 10, 0, 0]}>
                {contributionRows.map((item) => (
                  <Cell
                    key={item.face}
                    fill={item.contribution >= 1 ? '#f59e0b' : '#6366f1'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </PlotViewer>

        <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <div className="flex items-start gap-3">
            <Calculator size={20} className="mt-1 shrink-0 text-slate-700 dark:text-slate-200" />
            <MathText
              as="p"
              text={String.raw`Этот график показывает механику формулы: итоговая статистика складывается из вкладов отдельных категорий. В нашем примере основную массу $\chi^2$ создают две грани, а не все шесть одинаково.`}
              className="text-sm leading-relaxed text-slate-700 dark:text-slate-200"
            />
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Пишем код (SciPy)
          </h3>
          <MathText
            as="p"
            text="В Python и сама формула, и вычисление $p$-value уже спрятаны внутри `scipy.stats.chisquare`."
            className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
          <CodeBlock code={chiSquareCode} language="python" title="Python: критерий согласия Хи-квадрат" />
          <TerminalOutput
            lines={['Статистика Хи-квадрат: 5.40', 'P-value: 0.3690']}
          />
        </section>

        <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Как получить Expected в реальной задаче
          </h3>
          <MathText
            as="p"
            text="В лабораторной работе ожидаемые частоты почти никогда не даны готовыми. Их нужно вывести из выбранной модели: сначала оценить параметр распределения, затем получить теоретические вероятности и только потом умножить их на объем выборки."
            className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
          <div className="mt-4 grid gap-4 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-950/70">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-900 dark:text-white">Шаг 1</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">Выбираем модель и оцениваем её параметр по данным.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-950/70">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-900 dark:text-white">Шаг 2</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">Считаем вероятности для каждого допустимого значения.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-950/70">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-900 dark:text-white">Шаг 3</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">Умножаем вероятности на размер выборки и получаем `Expected`.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-950/70">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-900 dark:text-white">Шаг 4</p>
              <MathText
                as="p"
                text={String.raw`Проверяем условие $E_i \ge 5$ и при необходимости объединяем хвост.`}
                className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200"
              />
            </div>
          </div>
          <div className="mt-5">
            <CodeBlock code={expectedPipelineCode} language="python" title="Python: pipeline для Expected frequencies" />
          </div>
        </section>

        <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Когда Пуассон, а когда биномиальное
          </h3>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {modelChoiceCards.map((card) => (
              <article
                key={card.title}
                className="rounded-[1.25rem] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-700 dark:bg-slate-950/70"
              >
                <h4 className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-900 dark:text-white">
                  {card.title}
                </h4>
                <MathText
                  as="p"
                  text={card.text}
                  className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200"
                />
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <div className="flex items-start gap-3">
            <Target size={20} className="mt-1 shrink-0 text-indigo-600 dark:text-indigo-300" />
            <div className="grid flex-1 gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-950/70">
                <MathText text="$H_0$: частоты согласуются с моделью" className="text-sm leading-relaxed text-slate-700 dark:text-slate-200" />
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-950/70">
                <MathText text={String.raw`Считаем $\chi^2$, $df$ и $p$-value`} className="text-sm leading-relaxed text-slate-700 dark:text-slate-200" />
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-950/70">
                <MathText text={String.raw`Если $p > \alpha$, то $H_0$ не отвергается`} className="text-sm leading-relaxed text-slate-700 dark:text-slate-200" />
              </div>
            </div>
          </div>
        </section>

        <KeyIdea title="Как читать результат?">
          <MathText
            as="p"
            text={String.raw`Наш p-value равен 0.369, то есть около 37%. Это заметно больше стандартного порога $\alpha = 0.05$. Значит, мы не отвергаем нулевую гипотезу: перекос между 5 единицами и 14 пятерками для 60 бросков еще выглядит как нормальная случайность, а не как улика против честного кубика.`}
          />
        </KeyIdea>

        <section className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-6 dark:border-slate-700 dark:bg-slate-900/70">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Официальная документация Python
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            Эти страницы пригодятся перед дискретной лабораторной: там есть параметры, ограничения и примеры вызова функций.
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {documentationLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-200 dark:hover:border-indigo-700 dark:hover:text-indigo-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>
      </section>

      <nav className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/practice/2/screen/5"
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Назад
        </Link>

        <Link
          to="/practice/2/screen/7"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Далее: 7. Лаб 2.1. Распределение непрерывного признака
          <ArrowRight size={16} />
        </Link>
      </nav>
    </article>
  )
}

export default Practice2_Screen6
