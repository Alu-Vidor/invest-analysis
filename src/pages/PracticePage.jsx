import { useEffect, useMemo } from 'react'
import CodeBlock from '../components/CodeBlock'
import IdeaCard from '../components/IdeaCard'
import MathBlock from '../components/MathBlock'
import Practice1 from './Practice1'
import Practice1_Screen1 from './Practice1_Screen1'
import Practice1_Screen2 from './Practice1_Screen2'
import Practice1_Screen3 from './Practice1_Screen3'
import Practice1_Screen4 from './Practice1_Screen4'
import Practice1_Screen5 from './Practice1_Screen5'
import Practice2_Screen1 from './Practice2_Screen1'
import Practice2_Screen2 from './Practice2_Screen2'
import Practice2_Screen3 from './Practice2_Screen3'
import Practice2_Screen4 from './Practice2_Screen4'
import Practice2_Screen5 from './Practice2_Screen5'
import Practice2_Screen6 from './Practice2_Screen6'
import Practice2_Screen7 from './Practice2_Screen7'
import Practice2_Screen8 from './Practice2_Screen8'

const pageContent = {
  2: {
    title: 'Распределения и вероятности',
    recap:
      'Разберем, как эмпирическое распределение приближается к теоретическому и почему форма распределения важна для выбора метода.',
    intuition:
      'Даже если две выборки имеют одинаковое среднее, их хвосты и асимметрия могут сильно отличаться.',
    formula: 'P(X = k) = {n \\choose k} p^k (1-p)^{n-k}',
    code: `import numpy as np\n\nsample = np.random.binomial(n=20, p=0.4, size=1000)\nprint(sample.mean())\nprint(sample.var(ddof=1))`,
    keyIdea: 'Перед проверкой гипотез всегда смотрите на форму данных, а не только на одно число.',
  },
  3: {
    title: 'Доверительные интервалы',
    recap:
      'Переходим от точечной оценки к диапазону значений, в котором параметр находится с заданной надежностью.',
    intuition:
      'Интервал уже при маленькой выборке и уже при большом шуме данных; ширина несет важную информацию.',
    formula: '\\bar{x} \\pm z_{1-\\alpha/2}\\frac{\\sigma}{\\sqrt{n}}',
    code: `import scipy.stats as st\n\nx_bar = 12.4\nsigma = 3.1\nn = 40\nz = st.norm.ppf(0.975)\nmargin = z * sigma / (n ** 0.5)\nprint(x_bar - margin, x_bar + margin)`,
    keyIdea: 'Интервал это честный язык неопределенности, который дополняет точечную оценку.',
  },
  4: {
    title: 'Проверка гипотез',
    recap:
      'Формулируем нулевую и альтернативную гипотезы и оцениваем, насколько данные согласуются с H0.',
    intuition:
      'Малое p-value не доказывает H1, а только указывает, что наблюдение редкое при H0.',
    formula: 'p\\text{-value} = P(T \\ge t_{obs}\\mid H_0)',
    code: `from scipy import stats\n\nsample = [12, 13, 11, 14, 10, 13, 12]\nt_stat, p_value = stats.ttest_1samp(sample, popmean=10)\nprint(t_stat, p_value)`,
    keyIdea: 'Статистическое решение это баланс риска ошибки и практической интерпретации.',
  },
  5: {
    title: 'Корреляция и регрессия',
    recap:
      'Изучаем связь между переменными и строим простую линейную модель для прогноза.',
    intuition:
      'Корреляция описывает совместное изменение, но не является доказательством причинности.',
    formula:
      'r = \\frac{\\sum (x_i-\\bar{x})(y_i-\\bar{y})}{\\sqrt{\\sum (x_i-\\bar{x})^2 \\sum (y_i-\\bar{y})^2}}',
    code: `import numpy as np\n\nx = np.array([1, 2, 3, 4, 5])\ny = np.array([2, 4, 5, 4, 6])\nprint(np.corrcoef(x, y)[0, 1])`,
    keyIdea: 'Любая модель связи должна сопровождаться анализом остатков и ограничений данных.',
  },
  6: {
    title: 'Непараметрические методы',
    recap:
      'Когда предположения параметрических тестов не выполняются, используем ранговые критерии.',
    intuition:
      'Порядок наблюдений часто устойчивее к выбросам, чем их абсолютные значения.',
    formula: 'U = n_1n_2 + \\frac{n_1(n_1+1)}{2} - R_1',
    code: `from scipy.stats import mannwhitneyu\n\na = [12, 15, 14, 13, 16]\nb = [9, 11, 10, 12, 8]\nstat, p = mannwhitneyu(a, b, alternative='two-sided')\nprint(stat, p)`,
    keyIdea:
      'Непараметрические критерии дают надежный запасной план для реальных, “грязных” данных.',
  },
}

function GenericPractice({ id, setContext }) {
  const content = pageContent[id]

  const sections = useMemo(
    () => [
      { id: 'practice-overview', title: 'Рекап', note: content.recap },
      { id: 'intuition', title: 'Интуиция', note: content.intuition },
      {
        id: 'python-example',
        title: 'Код',
        note: 'Покажите связь между формулой и реализацией в Python.',
      },
      { id: 'key-idea', title: 'Ключевая идея', note: content.keyIdea },
    ],
    [content],
  )

  useEffect(() => {
    setContext({ title: sections[0].title, text: sections[0].note })
  }, [sections, setContext])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting)
        if (!visibleEntry) {
          return
        }
        const currentSection = sections.find((section) => section.id === visibleEntry.target.id)
        if (currentSection) {
          setContext({ title: currentSection.title, text: currentSection.note })
        }
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0.1 },
    )

    sections.forEach((section) => {
      const node = document.getElementById(section.id)
      if (node) {
        observer.observe(node)
      }
    })

    return () => observer.disconnect()
  }, [sections, setContext])

  return (
    <article className="space-y-4">
      <section id="practice-overview" className="content-block">
        <p className="text-sm font-semibold uppercase tracking-[0.1em] text-indigo-600 dark:text-indigo-400">
          Практика {id}
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {content.title}
        </h2>
        <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{content.recap}</p>
        <MathBlock formula={content.formula} />
      </section>

      <section id="intuition" className="content-block">
        <h3 className="section-title">Интуиция</h3>
        <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
          {content.intuition}
        </p>
        <IdeaCard title="Мини-пример (Интуиция)">
          Здесь будет расширенный кейс с визуализацией на следующем шаге разработки.
        </IdeaCard>
      </section>

      <section id="python-example" className="content-block">
        <h3 className="section-title">Код</h3>
        <div className="mt-4">
          <CodeBlock code={content.code} title={`Python: практика ${id}`} />
        </div>
      </section>

      <section id="key-idea" className="content-block">
        <IdeaCard title="Ключевая идея">{content.keyIdea}</IdeaCard>
      </section>
    </article>
  )
}

function ComingSoonPracticeScreen({ practiceNumber, screenNumber, setContext, setContextNotes }) {
  useEffect(() => {
    setContext({
      title: 'СКОРО...',
      text:
        screenNumber === undefined
          ? `Практика ${practiceNumber} в разработке.`
          : `Практика ${practiceNumber}, экран ${screenNumber} в разработке.`,
    })
    setContextNotes([
      {
        title: 'Статус',
        text: 'СКОРО...',
      },
    ])
  }, [practiceNumber, screenNumber, setContext, setContextNotes])

  return (
    <article className="content-block">
      <div className="rounded-[1.75rem] border border-indigo-200 bg-indigo-50/70 p-8 text-center shadow-soft dark:border-indigo-900/50 dark:bg-indigo-950/20">
        <p className="text-sm font-semibold uppercase tracking-[0.1em] text-indigo-700 dark:text-indigo-300">
          Практика {practiceNumber}
          {screenNumber !== undefined ? ` · Экран ${screenNumber}` : ''}
        </p>
        <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-900 dark:text-white">
          СКОРО...
        </h2>
      </div>
    </article>
  )
}

function PracticePage({ practiceNumber, screenNumber, setContext, setContextNotes }) {
  if (practiceNumber === 1 && (screenNumber === undefined || screenNumber === 1)) {
    return <Practice1_Screen1 setContextNotes={setContextNotes} />
  }

  if (practiceNumber === 1 && screenNumber === 2) {
    return <Practice1_Screen2 setContextNotes={setContextNotes} />
  }

  if (practiceNumber === 1 && screenNumber === 3) {
    return <Practice1_Screen3 setContext={setContext} setContextNotes={setContextNotes} />
  }

  if (practiceNumber === 1 && screenNumber === 4) {
    return <Practice1_Screen4 setContextNotes={setContextNotes} />
  }

  if (practiceNumber === 1 && screenNumber === 5) {
    return <Practice1_Screen5 setContextNotes={setContextNotes} />
  }

  if (practiceNumber === 1) {
    return <Practice1 setContext={setContext} />
  }

  if (practiceNumber === 2 && (screenNumber === undefined || screenNumber === 1)) {
    return <Practice2_Screen1 setContextNotes={setContextNotes} />
  }

  if (practiceNumber === 2 && screenNumber === 2) {
    return <Practice2_Screen2 setContextNotes={setContextNotes} />
  }

  if (practiceNumber === 2 && screenNumber === 3) {
    return <Practice2_Screen3 setContextNotes={setContextNotes} />
  }

  if (practiceNumber === 2 && screenNumber === 4) {
    return <Practice2_Screen4 setContextNotes={setContextNotes} />
  }

  if (practiceNumber === 2 && screenNumber === 5) {
    return <Practice2_Screen5 setContextNotes={setContextNotes} />
  }

  if (practiceNumber === 2 && screenNumber === 6) {
    return <Practice2_Screen6 setContextNotes={setContextNotes} />
  }

  if (practiceNumber === 2 && screenNumber === 7) {
    return <Practice2_Screen7 setContextNotes={setContextNotes} />
  }

  if (practiceNumber === 2 && screenNumber === 8) {
    return <Practice2_Screen8 setContextNotes={setContextNotes} />
  }

  if (practiceNumber >= 3 && practiceNumber <= 7) {
    return (
      <ComingSoonPracticeScreen
        practiceNumber={practiceNumber}
        screenNumber={screenNumber}
        setContext={setContext}
        setContextNotes={setContextNotes}
      />
    )
  }

  return <GenericPractice id={practiceNumber} setContext={setContext} />
}

export default PracticePage
