import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ComposedChart,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import CodeBlock from '../components/CodeBlock'
import CourseHeader from '../components/CourseHeader'
import KeyIdea from '../components/KeyIdea'
import MathBlock from '../components/MathBlock'
import PlotViewer from '../components/PlotViewer'
import TerminalOutput from '../components/TerminalOutput'

const ciCode = `import numpy as np
import scipy.stats as st

# Наши данные (рост студентов в см)
data = np.array([175, 180, 168, 172, 185, 178, 170, 182, 176, 171])

# Строим 95% доверительный интервал для среднего (распределение Стьюдента)
conf_interval = st.t.interval(
    confidence=0.95,
    df=len(data) - 1,
    loc=np.mean(data),
    scale=st.sem(data),
)

print(f"Доверительный интервал (95%): {conf_interval}")`

const contextNotes = [
  {
    title: 't-распределение vs Z-распределение',
    text: 'В коде мы использовали `st.t.interval`, а не нормальное распределение. Причина в том, что истинная дисперсия генеральной совокупности нам неизвестна и оценивается по той же маленькой выборке. Для малых выборок распределение Стьюдента даёт более широкие и более осторожные интервалы.',
  },
  {
    title: 'Уровень доверия',
    text: 'Чем выше уровень доверия, тем шире получается интервал. Интервал на 99% надёжнее, чем на 95%, но он менее точный. Интервал со 100% уверенностью можно сделать почти бесконечно широким, и он потеряет практический смысл.',
  },
  {
    title: 'Предпосылки метода',
    text: 'Классический доверительный интервал для среднего опирается на случайность выборки и предполагает, что наблюдения независимы. Для маленьких выборок дополнительно важно, чтобы распределение в генеральной совокупности не было слишком далеко от нормального.',
  },
]

const sampleMean = 175.7
const sampleSem = 1.658
const tCriticalByConfidence = {
  90: 1.833,
  91: 1.895,
  92: 1.973,
  93: 2.067,
  94: 2.185,
  95: 2.262,
  96: 2.398,
  97: 2.581,
  98: 2.821,
  99: 3.25,
}
const chartData = [{ x: sampleMean, y: 0.5 }]

const documentationLinks = [
  {
    label: 'SciPy: t distribution',
    href: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.t.html',
  },
  {
    label: 'SciPy: sem',
    href: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.sem.html',
  },
  {
    label: 'NumPy: mean',
    href: 'https://numpy.org/doc/stable/reference/generated/numpy.mean.html',
  },
]

function Practice1_Screen7({ setContextNotes }) {
  const [confidenceLevel, setConfidenceLevel] = useState(95)

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setContextNotes(contextNotes)
    }, 0)

    return () => {
      window.clearTimeout(timerId)
    }
  }, [setContextNotes])

  const interval = useMemo(() => {
    const tCritical = tCriticalByConfidence[confidenceLevel]
    const margin = tCritical * sampleSem
    return {
      lower: Number((sampleMean - margin).toFixed(2)),
      upper: Number((sampleMean + margin).toFixed(2)),
      margin: Number(margin.toFixed(2)),
    }
  }, [confidenceLevel])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 1 -> ДАННЫЕ В КОДЕ"
        title="Точечные и интервальные оценки"
        subtitle="Почему одного числа всегда недостаточно."
      />

      <section className="content-block space-y-6">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
          До сих пор мы считали точечные оценки (Point Estimates) — среднее, медиану, дисперсию.
          Точечная оценка дает нам ровно одно число. Но у нас есть только <em>выборка</em>, а вывод
          мы хотим сделать о всей <em>генеральной совокупности</em>.
        </p>

        <div className="space-y-3">
          <h3 className="section-title">1. Проблема точечной оценки</h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Если мы измерим рост 100 случайных студентов и получим среднее 175 см, это не значит,
            что средний рост <em>всех</em> студентов университета ровно 175 см. Если мы возьмем
            другие 100 человек, среднее окажется 174.2 см или 176.1 см. Точечная оценка почти
            наверняка ошибается, потому что она не показывает масштаб неопределенности.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="section-title">2. Интервальная оценка</h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Вместо одного числа мы строим диапазон, который с заданным уровнем доверия накрывает
            истинное значение генерального параметра.
          </p>
          <MathBlock formula={String.raw`\bar{x} \pm z_{\alpha/2} \frac{\sigma}{\sqrt{n}}`} />
          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-700 dark:bg-slate-800/40">
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              Эта формула состоит из трех частей:
            </p>
            <ol className="mt-3 space-y-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              <li>
                1. <code className="rounded bg-slate-200 px-1.5 py-0.5 text-xs dark:bg-slate-700">x̄</code>{' '}
                — наша точечная оценка, то есть среднее по выборке.
              </li>
              <li>
                2. <code className="rounded bg-slate-200 px-1.5 py-0.5 text-xs dark:bg-slate-700">zα/2</code>{' '}
                — квантиль распределения, который задаёт уровень доверия, например 95%.
              </li>
              <li>
                3. <code className="rounded bg-slate-200 px-1.5 py-0.5 text-xs dark:bg-slate-700">σ / √n</code>{' '}
                — стандартная ошибка среднего: чем больше выборка, тем точнее оценка и тем уже
                интервал.
              </li>
            </ol>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <section className="rounded-2xl border border-indigo-200 bg-indigo-50/70 p-5 dark:border-indigo-900 dark:bg-indigo-950/20">
            <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-indigo-800 dark:text-indigo-300">
              Формула, которая ближе к коду
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              В реальной задаче дисперсия почти всегда неизвестна, поэтому на практике чаще
              используют не z-интервал, а t-интервал:
            </p>
            <MathBlock formula={String.raw`\bar{x} \pm t_{\alpha/2,\;n-1}\frac{s}{\sqrt{n}}`} />
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Здесь <em>s</em> — выборочное стандартное отклонение, а число степеней свободы равно{' '}
              <code className="rounded bg-slate-200 px-1.5 py-0.5 text-xs dark:bg-slate-700">n - 1</code>.
            </p>
          </section>

          <section className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5 dark:border-amber-900 dark:bg-amber-950/20">
            <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-amber-800 dark:text-amber-300">
              Что означает ширина интервала
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              Ширина доверительного интервала определяется величиной статистической ошибки.
              Интервал расширяется, если:
            </p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              <li>данные сильно разбросаны;</li>
              <li>объём выборки мал;</li>
              <li>мы требуем более высокий уровень доверия.</li>
            </ul>
          </section>
        </div>

        <div className="space-y-4">
          <h3 className="section-title">3. Считаем в коде</h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            В Python не нужно считать доверительный интервал руками. Библиотека{' '}
            <code className="rounded bg-slate-200 px-1.5 py-0.5 text-xs dark:bg-slate-700">
              scipy.stats
            </code>{' '}
            строит его одной командой.
          </p>
          <CodeBlock code={ciCode} language="python" title="Python" />
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">
              Вывод в терминале
            </p>
            <TerminalOutput lines="Доверительный интервал (95%): (171.68, 179.71)" />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="section-title">4. Как меняется интервал при разном уровне доверия</h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Ниже один и тот же выборочный средний рост. Меняется только уровень доверия. Чем выше
            требование к надежности вывода, тем шире становится интервал.
          </p>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-700 dark:bg-slate-800/40">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <label
                  htmlFor="confidence-level"
                  className="text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  Уровень доверия: <span className="text-indigo-600 dark:text-indigo-300">{confidenceLevel}%</span>
                </label>
                <div className="text-sm text-slate-600 dark:text-slate-300">
                  Интервал: [{interval.lower}; {interval.upper}]
                </div>
              </div>

              <input
                id="confidence-level"
                type="range"
                min="90"
                max="99"
                step="1"
                value={confidenceLevel}
                onChange={(event) => setConfidenceLevel(Number(event.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-indigo-600 dark:bg-slate-700"
              />

              <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>90%</span>
                <span>95%</span>
                <span>99%</span>
              </div>
            </div>
          </div>

          <PlotViewer
            title="Интервал вокруг выборочного среднего"
            caption="Синяя вертикальная линия показывает выборочное среднее x̄ = 175.7. Закрашенная зона показывает доверительный интервал для среднего при выбранном уровне доверия."
          >
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 24, right: 24, left: 12, bottom: 12 }}>
                <XAxis
                  type="number"
                  dataKey="x"
                  domain={[168, 184]}
                  tickCount={9}
                  tick={{ fill: '#475569', fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: '#94a3b8' }}
                  label={{
                    value: 'Средний рост, см',
                    position: 'insideBottom',
                    offset: -6,
                    fill: '#475569',
                    fontSize: 12,
                  }}
                />
                <YAxis type="number" domain={[0, 1]} hide />
                <Tooltip
                  contentStyle={{
                    borderRadius: '0.9rem',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                  }}
                  formatter={(value, name) => {
                    if (name === 'mean') {
                      return [`${value} см`, 'Выборочное среднее']
                    }
                    return [value, name]
                  }}
                  labelFormatter={() => `Уровень доверия: ${confidenceLevel}%`}
                />
                <ReferenceArea x1={interval.lower} x2={interval.upper} y1={0.2} y2={0.8} fill="#93c5fd" fillOpacity={0.45} />
                <ReferenceLine
                  x={sampleMean}
                  stroke="#2563eb"
                  strokeWidth={3}
                  label={{ value: 'x̄', position: 'top', fill: '#1d4ed8', fontSize: 12 }}
                />
                <ReferenceLine x={interval.lower} stroke="#64748b" strokeDasharray="5 5" />
                <ReferenceLine x={interval.upper} stroke="#64748b" strokeDasharray="5 5" />
                <Scatter dataKey="x" fill="#1d4ed8" name="mean" shape="circle" />
              </ComposedChart>
            </ResponsiveContainer>
          </PlotViewer>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900/50">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">
                Выборочное среднее
              </p>
              <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">{sampleMean} см</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900/50">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">
                Полуширина интервала
              </p>
              <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">{interval.margin} см</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900/50">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">
                Текущий доверительный интервал
              </p>
              <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
                [{interval.lower}; {interval.upper}]
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 dark:border-slate-700 dark:bg-slate-900/50">
          <h3 className="section-title">5. Когда такой интервал корректен?</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Доверительный интервал для среднего имеет смысл только тогда, когда выборка получена
            достаточно честно: наблюдения независимы, сама выборка не систематически смещена, а
            используемая модель разумна для данных. Иначе интервал может выглядеть строго, но
            статистически вводить в заблуждение.
          </p>
        </div>

        <KeyIdea title="Как правильно читать результат?">
          Фраза "доверительный интервал 95%" не означает, что с вероятностью 95% истинное среднее
          попадет именно в интервал от 171.68 до 179.71. Истинное среднее фиксировано: оно либо
          внутри, либо нет. Корректная интерпретация такая: если много раз повторять выборку и
          строить такие интервалы, то примерно 95% из них накроют истинное среднее генеральной
          совокупности.
        </KeyIdea>
        <section className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-6 dark:border-slate-700 dark:bg-slate-900/70">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Официальная документация Python
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            Эти страницы помогут сверить формулу, параметры и численную реализацию доверительного интервала.
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
          to="/practice/1/screen/6"
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Назад
        </Link>

        <Link
          to="/practice/1/screen/8"
          className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Далее: 8. Чек-лист: Лабораторная работа
        </Link>
      </nav>
    </article>
  )
}

export default Practice1_Screen7
