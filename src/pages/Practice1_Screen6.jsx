import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import CourseHeader from '../components/CourseHeader'
import CodeBlock from '../components/CodeBlock'
import KeyIdea from '../components/KeyIdea'
import MathBlock from '../components/MathBlock'
import PlotViewer from '../components/PlotViewer'

const histogramCode = `import seaborn as sns
import matplotlib.pyplot as plt

# Строим гистограмму с 10 корзинами
sns.histplot(df['salary'], bins=10, kde=False)
plt.title("Гистограмма зарплат")
plt.show()`

const ecdfCode = `# Строим ECDF
sns.ecdfplot(data=df['salary'])
plt.title("Эмпирическая функция распределения (ECDF)")
plt.show()`

const histogramData = [
  { bucket: '25-35', count: 2 },
  { bucket: '35-45', count: 4 },
  { bucket: '45-55', count: 7 },
  { bucket: '55-65', count: 11 },
  { bucket: '65-75', count: 14 },
  { bucket: '75-85', count: 12 },
  { bucket: '85-95', count: 8 },
  { bucket: '95-105', count: 5 },
  { bucket: '105-115', count: 2 },
  { bucket: '115-125', count: 1 },
]

const ecdfData = [
  { salary: 28, share: 0.05 },
  { salary: 35, share: 0.12 },
  { salary: 41, share: 0.18 },
  { salary: 49, share: 0.3 },
  { salary: 56, share: 0.42 },
  { salary: 63, share: 0.5 },
  { salary: 71, share: 0.62 },
  { salary: 78, share: 0.74 },
  { salary: 86, share: 0.84 },
  { salary: 94, share: 0.91 },
  { salary: 108, share: 0.97 },
  { salary: 122, share: 1 },
]

const contextNotes = [
  {
    title: 'Математика ECDF',
    text: (
      <>
        <p>Строгое определение эмпирической функции распределения выглядит так:</p>
        <MathBlock formula={String.raw`\hat{F}_n(x) = \frac{1}{n} \sum_{i=1}^{n} I(X_i \le x)`} />
        <p>
          Где <code className="rounded bg-slate-200 px-1.5 py-0.5 text-xs dark:bg-slate-700">n</code> —
          объем выборки, а <code className="rounded bg-slate-200 px-1.5 py-0.5 text-xs dark:bg-slate-700">I</code> —
          индикаторная функция (равна 1, если условие выполняется, и 0, если нет). По сути, это просто
          накопительная доля.
        </p>
      </>
    ),
  },
  {
    title: 'Matplotlib vs Seaborn',
    text: 'Под капотом seaborn использует базовую библиотеку matplotlib. Но Seaborn специально создан для статистической визуализации: он сам считает агрегации, красивее выглядит "из коробки" и отлично работает напрямую с DataFrame из Pandas.',
  },
  {
    title: 'Как читать форму',
    text: 'Если на гистограмме видно несколько локальных пиков, это может означать смесь разных подгрупп в данных. Если ECDF долго идет почти горизонтально, в этом диапазоне мало наблюдений; если резко подскакивает вверх, там значения скапливаются особенно плотно.',
  },
  {
    title: 'Связь с теорией',
    text: (
      <>
        <p>ECDF является естественной оценкой истинной функции распределения <em>F(x)</em>.</p>
        <MathBlock formula={String.raw`\sup_x |\hat F_n(x) - F(x)| \to 0 \quad \text{при } n \to \infty`} />
        <p>То есть при росте выборки эмпирическая кривая равномерно приближается к теоретической.</p>
      </>
    ),
  },
]

const documentationLinks = [
  {
    label: 'Seaborn: histplot',
    href: 'https://seaborn.pydata.org/generated/seaborn.histplot.html',
  },
  {
    label: 'Seaborn: ecdfplot',
    href: 'https://seaborn.pydata.org/generated/seaborn.ecdfplot.html',
  },
  {
    label: 'Matplotlib: pyplot',
    href: 'https://matplotlib.org/stable/api/pyplot_summary.html',
  },
]

function Practice1_Screen6({ setContextNotes }) {
  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setContextNotes(contextNotes)
    }, 0)

    return () => {
      window.clearTimeout(timerId)
    }
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 1 -> ДАННЫЕ В КОДЕ"
        title="Визуализация: Гистограмма и ECDF"
        subtitle="Почему нельзя доверять только цифрам и как увидеть форму данных."
      />

      <section className="content-block space-y-6">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
          Точечные оценки (среднее, медиана) сжимают весь датасет до одного числа. Но чтобы понять реальную
          картину (есть ли асимметрия, сколько у нас «горбов»-мод), на данные нужно посмотреть. Главный
          инструмент для непрерывных признаков в Python — библиотека{' '}
          <code className="rounded bg-slate-200 px-1.5 py-0.5 text-sm dark:bg-slate-700">seaborn</code>.
        </p>

        <div className="space-y-4">
          <h3 className="section-title">1. Гистограмма (Histogram)</h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Гистограмма разбивает весь диапазон значений на равные отрезки (корзины / bins) и считает,
            сколько наблюдений попало в каждую корзину.
          </p>
          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-700 dark:bg-slate-800/40">
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              Если гистограмму нормировать, она становится грубой оценкой плотности распределения:
            </p>
            <MathBlock formula={String.raw`\hat f_h(x) = \frac{1}{nh} \sum_{i=1}^{n} I\!\left(x_i \in [a_j, a_j + h)\right), \quad x \in [a_j, a_j + h)`} />
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Здесь <em>h</em> — ширина корзины. Именно поэтому выбор `bins` или ширины интервала влияет не
              только на внешний вид, но и на саму статистическую оценку формы распределения.
            </p>
          </div>
          <CodeBlock code={histogramCode} language="python" title="Python" />
          <PlotViewer
            title="Пример распределения зарплат"
            caption="Гистограмма отлично показывает форму распределения (например, нормальный «колокол»), но её вид сильно зависит от выбранного количества корзин (`bins`)."
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={histogramData} margin={{ top: 12, right: 12, left: 0, bottom: 12 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="#cbd5e1" vertical={false} />
                <XAxis
                  dataKey="bucket"
                  tick={{ fill: '#475569', fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: '#94a3b8' }}
                />
                <YAxis
                  tick={{ fill: '#475569', fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: '#94a3b8' }}
                  width={34}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(14, 165, 233, 0.08)' }}
                  contentStyle={{
                    borderRadius: '0.9rem',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                  }}
                  formatter={(value) => [value, 'Частота']}
                  labelFormatter={(label) => `Интервал: ${label}`}
                />
                <Bar dataKey="count" radius={[10, 10, 0, 0]} fill="#0ea5e9" />
              </BarChart>
            </ResponsiveContainer>
          </PlotViewer>
        </div>

        <div className="space-y-4">
          <h3 className="section-title">2. Эмпирическая функция (ECDF)</h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Проблема гистограммы в том, что внутри корзины мы теряем точные значения. ECDF (Empirical
            Cumulative Distribution Function) решает эту проблему. Она показывает долю наблюдений в
            выборке, которые меньше или равны заданному значению <em>x</em>.
          </p>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 dark:border-emerald-900 dark:bg-emerald-950/20">
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              Формально ECDF оценивает вероятность события <em>X ≤ x</em>:
            </p>
            <MathBlock formula={String.raw`F(x) = P(X \le x), \qquad \hat F_n(x) = \frac{1}{n}\sum_{i=1}^{n} I(X_i \le x)`} />
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              В отличие от гистограммы здесь нет параметра ширины корзины, поэтому ECDF не вводит
              дополнительного сглаживания и сохраняет все точки выборки.
            </p>
          </div>
          <CodeBlock code={ecdfCode} language="python" title="Python" />
          <PlotViewer
            title="Накопительная доля наблюдений"
            caption="ECDF растет ступеньками от 0 до 1. По оси Y мы сразу видим процентили (например, какое значение отсекает 50% данных — это и есть наша медиана!)."
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ecdfData} margin={{ top: 12, right: 18, left: 0, bottom: 12 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="#64748b" strokeOpacity={0.35} vertical={false} />
                <XAxis
                  dataKey="salary"
                  tick={{ fill: '#cbd5e1', fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: '#94a3b8' }}
                  label={{
                    value: 'Значение x',
                    position: 'insideBottom',
                    offset: -6,
                    fill: '#cbd5e1',
                    fontSize: 12,
                  }}
                />
                <YAxis
                  domain={[0, 1]}
                  ticks={[0, 0.25, 0.5, 0.75, 1]}
                  tickFormatter={(value) => `${Math.round(value * 100)}%`}
                  tick={{ fill: '#cbd5e1', fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: '#94a3b8' }}
                  width={42}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '0.9rem',
                    border: '1px solid #475569',
                    backgroundColor: '#0f172a',
                    color: '#e2e8f0',
                  }}
                  formatter={(value) => [`${Math.round(value * 100)}%`, 'Доля <= x']}
                  labelFormatter={(label) => `x = ${label}`}
                />
                <ReferenceLine
                  y={0.5}
                  stroke="#34d399"
                  strokeDasharray="6 6"
                  label={{ value: '50%', position: 'insideTopRight', fill: '#6ee7b7', fontSize: 12 }}
                />
                <Line
                  type="stepAfter"
                  dataKey="share"
                  stroke="#7dd3fc"
                  strokeWidth={3}
                  dot={{ r: 3, fill: '#38bdf8', stroke: '#e0f2fe', strokeWidth: 1.5 }}
                  activeDot={{ r: 5, fill: '#38bdf8', stroke: '#ffffff', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </PlotViewer>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <section className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5 shadow-soft dark:border-amber-900 dark:bg-amber-950/30">
            <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-amber-800 dark:text-amber-300">
              Как выбирать `bins`
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              Слишком мало корзин сглаживает картину и прячет реальные особенности распределения. Слишком
              много корзин делает график шумным: случайные флуктуации начинают выглядеть как «структура».
              Поэтому гистограмму полезно перестраивать с несколькими значениями `bins`, а не верить первому
              варианту.
            </p>
          </section>

          <section className="rounded-2xl border border-sky-200 bg-sky-50/70 p-5 shadow-soft dark:border-sky-900 dark:bg-sky-950/30">
            <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-sky-800 dark:text-sky-300">
              Что видно на ECDF сразу
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              Горизонтальный участок означает редкие значения в диапазоне. Резкий вертикальный скачок
              показывает плотное скопление наблюдений. Пересечение линии уровня 50% дает медиану, а уровней
              25% и 75% — квартили без дополнительной группировки данных.
            </p>
          </section>
        </div>

        <KeyIdea title="Что использовать?">
          <strong>Гистограмма</strong> интуитивно понятнее заказчику бизнеса: сразу видно, где «густо», а
          где «пусто». <strong>ECDF</strong> точнее и полезнее для аналитика: она не теряет информацию из-за
          группировки по корзинам и позволяет мгновенно считывать медиану, квартили и выбросы.
        </KeyIdea>
        <section className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-6 dark:border-slate-700 dark:bg-slate-900/70">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Официальная документация Python
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            Здесь API для двух основных графиков Практики 1 и базовой настройки визуализации.
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
          to="/practice/1/screen/5"
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Назад
        </Link>

        <Link
          to="/practice/1/screen/7"
          className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Далее: 7. Точечные и интервальные оценки (код)
        </Link>
      </nav>
    </article>
  )
}

export default Practice1_Screen6
