import MathText from './MathText'

function CourseHeader({ badge, title, subtitle }) {
  return (
    <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
      <MathText
        as="p"
        text={badge}
        className="text-sm font-semibold uppercase tracking-[0.1em] text-indigo-600 dark:text-indigo-400"
      />
      <MathText
        as="h2"
        text={title}
        className="mt-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
      />
      <MathText
        as="p"
        text={subtitle}
        className="mt-2 text-base leading-relaxed text-slate-600 dark:text-slate-300"
      />
    </header>
  )
}

export default CourseHeader
