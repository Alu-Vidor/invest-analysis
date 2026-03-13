import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

function CodeBlock({ code, language = 'python', title = 'Пример кода' }) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 1200)
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-700 bg-[#1e1e1e] shadow-soft">
      <header className="border-b border-slate-700 bg-slate-900/60 px-4 py-2.5">
        <h3 className="text-sm font-semibold text-slate-200">{title}</h3>
      </header>

      <div className="relative">
        <button
          type="button"
          onClick={handleCopy}
          className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-md bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white transition hover:bg-indigo-500"
        >
          {isCopied ? <Check size={14} /> : <Copy size={14} />}
          {isCopied ? 'Скопировано' : 'Копировать'}
        </button>

        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: '#1e1e1e',
            fontSize: '0.85rem',
          }}
          wrapLongLines
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </section>
  )
}

export default CodeBlock
