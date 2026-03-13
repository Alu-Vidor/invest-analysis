function PlotViewer({ title, children, caption }) {
  return (
    <figure className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-soft dark:border-slate-700 dark:bg-slate-900">
      <div className="border-b border-slate-200 bg-slate-50/90 px-5 py-3 dark:border-slate-700 dark:bg-slate-800/60">
        <figcaption className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-700 dark:text-slate-200">
          {title}
        </figcaption>
      </div>

      <div className="bg-[radial-gradient(circle_at_top,_rgba(125,211,252,0.18),_transparent_55%),linear-gradient(180deg,_rgba(248,250,252,0.96),_rgba(255,255,255,1))] p-4 dark:bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.12),_transparent_55%),linear-gradient(180deg,_rgba(15,23,42,0.96),_rgba(15,23,42,1))]">
        <div className="rounded-[1.25rem] border border-white/70 bg-white/90 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] dark:border-slate-700 dark:bg-slate-950/80">
          <div className="h-72 w-full">{children}</div>
        </div>
      </div>

      <p className="border-t border-slate-200 px-5 py-4 text-sm leading-relaxed text-slate-600 dark:border-slate-700 dark:text-slate-300">
        {caption}
      </p>
    </figure>
  )
}

export default PlotViewer
