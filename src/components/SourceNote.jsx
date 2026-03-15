function SourceNote({ title = 'Реальные данные', children }) {
  return (
    <aside className="rounded-2xl border border-slate-200 bg-slate-50/90 p-4 shadow-soft dark:border-slate-700 dark:bg-slate-900">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
        {title}
      </p>
      <div className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">{children}</div>
    </aside>
  )
}

export default SourceNote
