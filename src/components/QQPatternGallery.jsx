const patternCards = [
  {
    title: 'Почти нормальное распределение',
    tone:
      'border-blue-200 bg-blue-50/80 dark:border-blue-900/50 dark:bg-blue-950/20',
    xDomain: [-2.6, 2.6],
    yDomain: [-2.6, 2.6],
    points: [
      { x: -2.3, y: -2.2 },
      { x: -1.8, y: -1.85 },
      { x: -1.3, y: -1.28 },
      { x: -0.8, y: -0.82 },
      { x: -0.3, y: -0.27 },
      { x: 0.2, y: 0.24 },
      { x: 0.7, y: 0.66 },
      { x: 1.2, y: 1.25 },
      { x: 1.7, y: 1.74 },
      { x: 2.2, y: 2.18 },
    ],
    takeaway: 'Точки идут вдоль диагонали без систематического изгиба.',
  },
  {
    title: 'Правая асимметрия',
    tone:
      'border-amber-200 bg-amber-50/80 dark:border-amber-900/50 dark:bg-amber-950/20',
    xDomain: [-2.6, 2.6],
    yDomain: [-2.6, 5.5],
    points: [
      { x: -2.3, y: -1.8 },
      { x: -1.8, y: -1.5 },
      { x: -1.3, y: -1.18 },
      { x: -0.8, y: -0.75 },
      { x: -0.3, y: -0.15 },
      { x: 0.2, y: 0.48 },
      { x: 0.7, y: 1.12 },
      { x: 1.2, y: 1.95 },
      { x: 1.7, y: 2.95 },
      { x: 2.2, y: 4.2 },
    ],
    takeaway: 'Правый хвост тяжелее нормы: верхние квантили резко уходят вверх.',
  },
  {
    title: 'Тяжелые хвосты',
    tone:
      'border-teal-200 bg-teal-50/80 dark:border-teal-900/50 dark:bg-teal-950/20',
    xDomain: [-2.6, 2.6],
    yDomain: [-4.6, 4.6],
    points: [
      { x: -2.3, y: -4.0 },
      { x: -1.8, y: -2.95 },
      { x: -1.3, y: -1.85 },
      { x: -0.8, y: -0.95 },
      { x: -0.3, y: -0.28 },
      { x: 0.2, y: 0.18 },
      { x: 0.7, y: 0.82 },
      { x: 1.2, y: 1.72 },
      { x: 1.7, y: 2.85 },
      { x: 2.2, y: 4.02 },
    ],
    takeaway: 'Оба хвоста отклоняются сильнее центра: получается выраженная S-форма.',
  },
]

function scaleX(value, [min, max]) {
  const left = 16
  const width = 176
  return left + ((value - min) / (max - min)) * width
}

function scaleY(value, [min, max]) {
  const top = 14
  const height = 94
  return top + height - ((value - min) / (max - min)) * height
}

function pointsToSvg(points, xDomain, yDomain) {
  return points
    .map(({ x, y }) => `${scaleX(x, xDomain).toFixed(1)},${scaleY(y, yDomain).toFixed(1)}`)
    .join(' ')
}

function QQPatternGallery() {
  return (
    <section className="grid gap-4 xl:grid-cols-3">
      {patternCards.map((card) => (
        <article
          key={card.title}
          className={`rounded-[1.5rem] border p-5 shadow-soft ${card.tone}`}
        >
          <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-900 dark:text-white">
            {card.title}
          </h3>

          <div className="mt-4 rounded-[1.25rem] border border-white/70 bg-white/90 p-3 dark:border-slate-700 dark:bg-slate-950/80">
            <svg viewBox="0 0 208 120" className="h-40 w-full" role="img" aria-label={card.title}>
              <line
                x1="14"
                y1="108"
                x2="194"
                y2="108"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-slate-400 dark:text-slate-300"
              />
              <line
                x1="16"
                y1="106"
                x2="16"
                y2="12"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-slate-400 dark:text-slate-300"
              />
              <line
                x1={scaleX(card.xDomain[0], card.xDomain)}
                y1={scaleY(card.xDomain[0], card.yDomain)}
                x2={scaleX(card.xDomain[1], card.xDomain)}
                y2={scaleY(card.xDomain[1], card.yDomain)}
                stroke="#e11d48"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
              <polyline
                points={pointsToSvg(card.points, card.xDomain, card.yDomain)}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-slate-900 dark:text-slate-100"
              />
              {card.points.map((point, index) => (
                <circle
                  key={`${card.title}-${index}`}
                  cx={scaleX(point.x, card.xDomain)}
                  cy={scaleY(point.y, card.yDomain)}
                  r="2.75"
                  fill="currentColor"
                  className="text-slate-900 dark:text-slate-100"
                />
              ))}
            </svg>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            {card.takeaway}
          </p>
        </article>
      ))}
    </section>
  )
}

export default QQPatternGallery
