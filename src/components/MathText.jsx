import { Fragment, createElement } from 'react'
import katex from 'katex'

function InlineMath({ formula, block = false }) {
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

  const Tag = block ? 'div' : 'span'

  return <Tag dangerouslySetInnerHTML={{ __html: rendered }} />
}

function MathText({ text, as: Component = 'span', className }) {
  if (typeof text !== 'string') {
    return createElement(Component, { className }, text)
  }

  const parts = []
  const regex = /\$\$([\s\S]+?)\$\$|\$([^$]+?)\$/g
  let lastIndex = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }

    if (match[1]) {
      parts.push(<InlineMath key={`block-${match.index}`} formula={match[1]} block />)
    } else if (match[2]) {
      parts.push(<InlineMath key={`inline-${match.index}`} formula={match[2]} />)
    }

    lastIndex = regex.lastIndex
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return createElement(
    Component,
    { className },
    parts.map((part, index) => (
      <Fragment key={index}>{part}</Fragment>
    )),
  )
}

export { InlineMath }
export default MathText
