import HandbookDetails from './HandbookDetails'

function ThinkQuestion({ question, children }) {
  return (
    <section className="rounded-2xl border border-rose-200 bg-rose-50/80 p-5 shadow-soft dark:border-rose-900/50 dark:bg-rose-950/20">
      <p className="text-sm font-semibold uppercase tracking-[0.08em] text-rose-700 dark:text-rose-300">
        Вопрос на подумать
      </p>
      <p className="mt-2 text-base leading-relaxed text-slate-800 dark:text-slate-100">{question}</p>
      <div className="mt-4">
        <HandbookDetails title="Ответ (не открывайте сразу, сначала подумайте сами!)">
          {children}
        </HandbookDetails>
      </div>
    </section>
  )
}

export default ThinkQuestion
