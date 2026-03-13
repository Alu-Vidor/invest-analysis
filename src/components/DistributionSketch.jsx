import {
  Area,
  CartesianGrid,
  ComposedChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

function logNormalLike(x, mu = 3.75, sigma = 0.42) {
  if (x <= 0) {
    return 0
  }

  const exponent = -((Math.log(x) - mu) ** 2) / (2 * sigma * sigma)
  return Math.exp(exponent) / (x * sigma)
}

const rawDistribution = Array.from({ length: 120 }, (_, index) => {
  const x = 1 + index
  return { x, density: logNormalLike(x) }
})

const maxDensity = Math.max(...rawDistribution.map((point) => point.density))

const distributionData = rawDistribution.map((point) => ({
  x: point.x,
  density: Number((point.density / maxDensity).toFixed(4)),
}))

const modePoint = distributionData.reduce((bestPoint, currentPoint) =>
  currentPoint.density > bestPoint.density ? currentPoint : bestPoint,
)

const modeX = modePoint.x
const medianX = 45
const meanX = 60

function DistributionSketch() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={distributionData}
            margin={{ top: 20, right: 24, left: 8, bottom: 12 }}
          >
            <CartesianGrid strokeDasharray="4 4" stroke="#cbd5e1" vertical={false} />
            <XAxis
              dataKey="x"
              type="number"
              domain={[0, 100]}
              tick={{ fill: '#475569', fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#64748b' }}
              ticks={[0, 20, 40, 60, 80, 100]}
              label={{
                value: 'Ось значений',
                position: 'insideBottom',
                offset: -6,
                fill: '#475569',
                fontSize: 12,
              }}
            />
            <YAxis
              tick={{ fill: '#475569', fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#64748b' }}
              width={36}
              domain={[0, 'auto']}
              label={{
                value: 'Плотность',
                angle: -90,
                position: 'insideLeft',
                fill: '#475569',
                fontSize: 12,
              }}
            />
            <Tooltip
              formatter={(value) => [Number(value).toFixed(3), 'Плотность']}
              labelFormatter={(label) => `Значение: ${label}`}
              contentStyle={{
                borderRadius: '0.75rem',
                border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff',
              }}
            />
            <Area
              type="monotone"
              dataKey="density"
              stroke="#0f172a"
              strokeWidth={2}
              fill="#93c5fd"
              fillOpacity={0.6}
            />
            <ReferenceLine
              x={modeX}
              stroke="#0f172a"
              strokeDasharray="6 6"
              label={{ value: 'Mode', position: 'top', fill: '#0f172a', fontSize: 12 }}
            />
            <ReferenceLine
              x={medianX}
              stroke="#059669"
              strokeDasharray="6 6"
              label={{ value: 'Median', position: 'top', fill: '#059669', fontSize: 12 }}
            />
            <ReferenceLine
              x={meanX}
              stroke="#e11d48"
              strokeDasharray="6 6"
              label={{ value: 'Mean', position: 'top', fill: '#e11d48', fontSize: 12 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        Это схематичное правосторонне-скошенное распределение. У него длинный хвост справа, поэтому
        типичное соотношение такое:
        <code className="mx-1 rounded bg-slate-200 px-1.5 py-0.5 text-sm dark:bg-slate-700">
          mode &lt; median &lt; mean
        </code>
        . Именно эту идею и нужно вынести из графика: среднее сильнее всех тянется в сторону
        хвоста.
      </p>
    </div>
  )
}

export default DistributionSketch
