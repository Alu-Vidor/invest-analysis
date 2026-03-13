import katex from 'katex'

function MathBlock({ formula, block = true }) {
  let rendered

  try {
    rendered = katex.renderToString(formula, {
      throwOnError: true,
      displayMode: block,
    })
  } catch (error) {
    console.error(`KaTeX render failed for formula: ${formula}`, error)
    rendered = katex.renderToString(formula, {
      throwOnError: false,
      displayMode: block,
    })
  }

  return (
    <div
      className="my-4 overflow-x-auto rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
      dangerouslySetInnerHTML={{ __html: rendered }}
    />
  )
}

export default MathBlock
