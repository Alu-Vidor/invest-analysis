function TerminalOutput({ lines = [] }) {
  const normalizedLines = Array.isArray(lines) ? lines : [lines]

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-300 bg-slate-100 px-4 py-3 font-mono text-sm text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
      <pre className="m-0 whitespace-pre-wrap">{normalizedLines.join('\n')}</pre>
    </div>
  )
}

export default TerminalOutput
