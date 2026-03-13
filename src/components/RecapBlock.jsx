function RecapBlock({ title, children }) {
  return (
    <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 shadow-soft dark:border-emerald-900 dark:bg-emerald-950/40">
      <h3 className="text-lg font-semibold tracking-tight text-emerald-900 dark:text-emerald-200">{title}</h3>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-slate-700 dark:text-slate-200">{children}</div>
    </section>
  )
}

export default RecapBlock
