function SortVisualization({ values = [], highlighted = [], caption }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900">
      <div className="flex flex-wrap gap-3">
        {values.map((value, index) => {
          const isHighlighted = highlighted.includes(index)

          return (
            <div key={`${value}-${index}`} className="flex flex-col items-center gap-2">
              <span
                className={`inline-flex min-w-14 items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold ${
                  isHighlighted
                    ? 'border-2 border-emerald-500 bg-emerald-100 text-emerald-800 shadow-sm dark:border-emerald-400 dark:bg-emerald-950/40 dark:text-emerald-200'
                    : 'border border-slate-200 bg-slate-100 text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400'
                }`}
              >
                {value}
              </span>
              {isHighlighted ? (
                <span className="max-w-24 text-center text-xs font-medium leading-relaxed text-emerald-700 dark:text-emerald-300">
                  {caption}
                </span>
              ) : (
                <span className="h-[2.5rem]" aria-hidden="true" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SortVisualization
