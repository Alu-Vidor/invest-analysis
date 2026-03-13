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
import Practice1_Screen6 from './Practice1_Screen6'
import Practice1_Screen7 from './Practice1_Screen7'
import Practice1_Screen8 from './Practice1_Screen8'
import Practice1_Screen9 from './Practice1_Screen9'
import Practice1_Screen10 from './Practice1_Screen10'
import Practice1_Screen11 from './Practice1_Screen11'
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
    title: 'Р Р°СЃРїСЂРµРґРµР»РµРЅРёСЏ Рё РІРµСЂРѕСЏС‚РЅРѕСЃС‚Рё',
    recap:
      'Р Р°Р·Р±РµСЂРµРј, РєР°Рє СЌРјРїРёСЂРёС‡РµСЃРєРѕРµ СЂР°СЃРїСЂРµРґРµР»РµРЅРёРµ РїСЂРёР±Р»РёР¶Р°РµС‚СЃСЏ Рє С‚РµРѕСЂРµС‚РёС‡РµСЃРєРѕРјСѓ Рё РїРѕС‡РµРјСѓ С„РѕСЂРјР° СЂР°СЃРїСЂРµРґРµР»РµРЅРёСЏ РІР°Р¶РЅР° РґР»СЏ РІС‹Р±РѕСЂР° РјРµС‚РѕРґР°.',
    intuition:
      'Р”Р°Р¶Рµ РµСЃР»Рё РґРІРµ РІС‹Р±РѕСЂРєРё РёРјРµСЋС‚ РѕРґРёРЅР°РєРѕРІРѕРµ СЃСЂРµРґРЅРµРµ, РёС… С…РІРѕСЃС‚С‹ Рё Р°СЃРёРјРјРµС‚СЂРёСЏ РјРѕРіСѓС‚ СЃРёР»СЊРЅРѕ РѕС‚Р»РёС‡Р°С‚СЊСЃСЏ.',
    formula: 'P(X = k) = {n \\choose k} p^k (1-p)^{n-k}',
    code: `import numpy as np\n\nsample = np.random.binomial(n=20, p=0.4, size=1000)\nprint(sample.mean())\nprint(sample.var(ddof=1))`,
    keyIdea: 'РџРµСЂРµРґ РїСЂРѕРІРµСЂРєРѕР№ РіРёРїРѕС‚РµР· РІСЃРµРіРґР° СЃРјРѕС‚СЂРёС‚Рµ РЅР° С„РѕСЂРјСѓ РґР°РЅРЅС‹С…, Р° РЅРµ С‚РѕР»СЊРєРѕ РЅР° РѕРґРЅРѕ С‡РёСЃР»Рѕ.',
  },
  3: {
    title: 'Р”РѕРІРµСЂРёС‚РµР»СЊРЅС‹Рµ РёРЅС‚РµСЂРІР°Р»С‹',
    recap:
      'РџРµСЂРµС…РѕРґРёРј РѕС‚ С‚РѕС‡РµС‡РЅРѕР№ РѕС†РµРЅРєРё Рє РґРёР°РїР°Р·РѕРЅСѓ Р·РЅР°С‡РµРЅРёР№, РІ РєРѕС‚РѕСЂРѕРј РїР°СЂР°РјРµС‚СЂ РЅР°С…РѕРґРёС‚СЃСЏ СЃ Р·Р°РґР°РЅРЅРѕР№ РЅР°РґРµР¶РЅРѕСЃС‚СЊСЋ.',
    intuition:
      'РРЅС‚РµСЂРІР°Р» СѓР¶Рµ РїСЂРё РјР°Р»РµРЅСЊРєРѕР№ РІС‹Р±РѕСЂРєРµ Рё СѓР¶Рµ РїСЂРё Р±РѕР»СЊС€РѕРј С€СѓРјРµ РґР°РЅРЅС‹С…; С€РёСЂРёРЅР° РЅРµСЃРµС‚ РІР°Р¶РЅСѓСЋ РёРЅС„РѕСЂРјР°С†РёСЋ.',
    formula: '\\bar{x} \\pm z_{1-\\alpha/2}\\frac{\\sigma}{\\sqrt{n}}',
    code: `import scipy.stats as st\n\nx_bar = 12.4\nsigma = 3.1\nn = 40\nz = st.norm.ppf(0.975)\nmargin = z * sigma / (n ** 0.5)\nprint(x_bar - margin, x_bar + margin)`,
    keyIdea: 'РРЅС‚РµСЂРІР°Р» СЌС‚Рѕ С‡РµСЃС‚РЅС‹Р№ СЏР·С‹Рє РЅРµРѕРїСЂРµРґРµР»РµРЅРЅРѕСЃС‚Рё, РєРѕС‚РѕСЂС‹Р№ РґРѕРїРѕР»РЅСЏРµС‚ С‚РѕС‡РµС‡РЅСѓСЋ РѕС†РµРЅРєСѓ.',
  },
  4: {
    title: 'РџСЂРѕРІРµСЂРєР° РіРёРїРѕС‚РµР·',
    recap:
      'Р¤РѕСЂРјСѓР»РёСЂСѓРµРј РЅСѓР»РµРІСѓСЋ Рё Р°Р»СЊС‚РµСЂРЅР°С‚РёРІРЅСѓСЋ РіРёРїРѕС‚РµР·С‹ Рё РѕС†РµРЅРёРІР°РµРј, РЅР°СЃРєРѕР»СЊРєРѕ РґР°РЅРЅС‹Рµ СЃРѕРіР»Р°СЃСѓСЋС‚СЃСЏ СЃ H0.',
    intuition:
      'РњР°Р»РѕРµ p-value РЅРµ РґРѕРєР°Р·С‹РІР°РµС‚ H1, Р° С‚РѕР»СЊРєРѕ СѓРєР°Р·С‹РІР°РµС‚, С‡С‚Рѕ РЅР°Р±Р»СЋРґРµРЅРёРµ СЂРµРґРєРѕРµ РїСЂРё H0.',
    formula: 'p\\text{-value} = P(T \\ge t_{obs}\\mid H_0)',
    code: `from scipy import stats\n\nsample = [12, 13, 11, 14, 10, 13, 12]\nt_stat, p_value = stats.ttest_1samp(sample, popmean=10)\nprint(t_stat, p_value)`,
    keyIdea: 'РЎС‚Р°С‚РёСЃС‚РёС‡РµСЃРєРѕРµ СЂРµС€РµРЅРёРµ СЌС‚Рѕ Р±Р°Р»Р°РЅСЃ СЂРёСЃРєР° РѕС€РёР±РєРё Рё РїСЂР°РєС‚РёС‡РµСЃРєРѕР№ РёРЅС‚РµСЂРїСЂРµС‚Р°С†РёРё.',
  },
  5: {
    title: 'РљРѕСЂСЂРµР»СЏС†РёСЏ Рё СЂРµРіСЂРµСЃСЃРёСЏ',
    recap:
      'РР·СѓС‡Р°РµРј СЃРІСЏР·СЊ РјРµР¶РґСѓ РїРµСЂРµРјРµРЅРЅС‹РјРё Рё СЃС‚СЂРѕРёРј РїСЂРѕСЃС‚СѓСЋ Р»РёРЅРµР№РЅСѓСЋ РјРѕРґРµР»СЊ РґР»СЏ РїСЂРѕРіРЅРѕР·Р°.',
    intuition:
      'РљРѕСЂСЂРµР»СЏС†РёСЏ РѕРїРёСЃС‹РІР°РµС‚ СЃРѕРІРјРµСЃС‚РЅРѕРµ РёР·РјРµРЅРµРЅРёРµ, РЅРѕ РЅРµ СЏРІР»СЏРµС‚СЃСЏ РґРѕРєР°Р·Р°С‚РµР»СЊСЃС‚РІРѕРј РїСЂРёС‡РёРЅРЅРѕСЃС‚Рё.',
    formula: 'r = \\frac{\\sum (x_i-\\bar{x})(y_i-\\bar{y})}{\\sqrt{\\sum (x_i-\\bar{x})^2 \\sum (y_i-\\bar{y})^2}}',
    code: `import numpy as np\n\nx = np.array([1, 2, 3, 4, 5])\ny = np.array([2, 4, 5, 4, 6])\nprint(np.corrcoef(x, y)[0, 1])`,
    keyIdea: 'Р›СЋР±Р°СЏ РјРѕРґРµР»СЊ СЃРІСЏР·Рё РґРѕР»Р¶РЅР° СЃРѕРїСЂРѕРІРѕР¶РґР°С‚СЊСЃСЏ Р°РЅР°Р»РёР·РѕРј РѕСЃС‚Р°С‚РєРѕРІ Рё РѕРіСЂР°РЅРёС‡РµРЅРёР№ РґР°РЅРЅС‹С….',
  },
  6: {
    title: 'РќРµРїР°СЂР°РјРµС‚СЂРёС‡РµСЃРєРёРµ РјРµС‚РѕРґС‹',
    recap:
      'РљРѕРіРґР° РїСЂРµРґРїРѕР»РѕР¶РµРЅРёСЏ РїР°СЂР°РјРµС‚СЂРёС‡РµСЃРєРёС… С‚РµСЃС‚РѕРІ РЅРµ РІС‹РїРѕР»РЅСЏСЋС‚СЃСЏ, РёСЃРїРѕР»СЊР·СѓРµРј СЂР°РЅРіРѕРІС‹Рµ РєСЂРёС‚РµСЂРёРё.',
    intuition:
      'РџРѕСЂСЏРґРѕРє РЅР°Р±Р»СЋРґРµРЅРёР№ С‡Р°СЃС‚Рѕ СѓСЃС‚РѕР№С‡РёРІРµРµ Рє РІС‹Р±СЂРѕСЃР°Рј, С‡РµРј РёС… Р°Р±СЃРѕР»СЋС‚РЅС‹Рµ Р·РЅР°С‡РµРЅРёСЏ.',
    formula: 'U = n_1n_2 + \\frac{n_1(n_1+1)}{2} - R_1',
    code: `from scipy.stats import mannwhitneyu\n\na = [12, 15, 14, 13, 16]\nb = [9, 11, 10, 12, 8]\nstat, p = mannwhitneyu(a, b, alternative='two-sided')\nprint(stat, p)`,
    keyIdea: 'РќРµРїР°СЂР°РјРµС‚СЂРёС‡РµСЃРєРёРµ РєСЂРёС‚РµСЂРёРё РґР°СЋС‚ РЅР°РґРµР¶РЅС‹Р№ Р·Р°РїР°СЃРЅРѕР№ РїР»Р°РЅ РґР»СЏ СЂРµР°Р»СЊРЅС‹С…, вЂњРіСЂСЏР·РЅС‹С…вЂќ РґР°РЅРЅС‹С….',
  },
}

function GenericPractice({ id, setContext }) {
  const content = pageContent[id]

  const sections = useMemo(
    () => [
      { id: 'practice-overview', title: 'Р РµРєР°Рї', note: content.recap },
      { id: 'intuition', title: 'РРЅС‚СѓРёС†РёСЏ', note: content.intuition },
      { id: 'python-example', title: 'РљРѕРґ', note: 'РџРѕРєР°Р¶РёС‚Рµ СЃРІСЏР·СЊ РјРµР¶РґСѓ С„РѕСЂРјСѓР»РѕР№ Рё СЂРµР°Р»РёР·Р°С†РёРµР№ РІ Python.' },
      { id: 'key-idea', title: 'РљР»СЋС‡РµРІР°СЏ РёРґРµСЏ', note: content.keyIdea },
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
          РџСЂР°РєС‚РёРєР° {id}
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {content.title}
        </h2>
        <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{content.recap}</p>
        <MathBlock formula={content.formula} />
      </section>

      <section id="intuition" className="content-block">
        <h3 className="section-title">РРЅС‚СѓРёС†РёСЏ</h3>
        <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{content.intuition}</p>
        <IdeaCard title="РњРёРЅРё-РїСЂРёРјРµСЂ (РРЅС‚СѓРёС†РёСЏ)">
          Р—РґРµСЃСЊ Р±СѓРґРµС‚ СЂР°СЃС€РёСЂРµРЅРЅС‹Р№ РєРµР№СЃ СЃ РІРёР·СѓР°Р»РёР·Р°С†РёРµР№ РЅР° СЃР»РµРґСѓСЋС‰РµРј С€Р°РіРµ СЂР°Р·СЂР°Р±РѕС‚РєРё.
        </IdeaCard>
      </section>

      <section id="python-example" className="content-block">
        <h3 className="section-title">РљРѕРґ</h3>
        <div className="mt-4">
          <CodeBlock code={content.code} title={`Python: РїСЂР°РєС‚РёРєР° ${id}`} />
        </div>
      </section>

      <section id="key-idea" className="content-block">
        <IdeaCard title="РљР»СЋС‡РµРІР°СЏ РёРґРµСЏ">{content.keyIdea}</IdeaCard>
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
        <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-900 dark:text-white">СКОРО...</h2>
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

  if (practiceNumber === 1 && screenNumber === 6) {
    return <Practice1_Screen6 setContextNotes={setContextNotes} />
  }

  if (practiceNumber === 1 && screenNumber === 7) {
    return <Practice1_Screen7 setContextNotes={setContextNotes} />
  }

  if (practiceNumber === 1 && screenNumber === 8) {
    return <Practice1_Screen8 setContextNotes={setContextNotes} />
  }

  if (practiceNumber === 1 && screenNumber === 9) {
    return <Practice1_Screen9 setContextNotes={setContextNotes} />
  }

  if (practiceNumber === 1 && screenNumber === 10) {
    return <Practice1_Screen10 setContextNotes={setContextNotes} />
  }

  if (practiceNumber === 1 && screenNumber === 11) {
    return <Practice1_Screen11 setContextNotes={setContextNotes} />
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

  if (practiceNumber >= 3 && practiceNumber <= 6) {
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

