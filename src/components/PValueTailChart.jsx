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

function normalLike(x, sigma = 1) {
  return Math.exp(-(x * x) / (2 * sigma * sigma))
}

const observed = 1.9

const rawData = Array.from({ length: 121 }, (_, index) => {
  const x = -3 + index * 0.05
  const density = normalLike(x)
  const tail = x >= observed ? density : 0

  return {
    x: Number(x.toFixed(2)),
    density: Number(density.toFixed(4)),
    tail: Number(tail.toFixed(4)),
  }
})

function PValueTailChart() {
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={rawData} margin={{ top: 20, right: 36, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#cbd5e1" />
          <XAxis
            dataKey="x"
            tickLine={false}
            axisLine={{ stroke: '#64748b' }}
            tick={{ fill: '#475569', fontSize: 12 }}
            label={{
              value: 'Статистика теста',
              position: 'insideBottom',
              offset: -4,
              fill: '#475569',
              fontSize: 12,
            }}
          />
          <YAxis hide domain={[0, 'auto']} />
          <Tooltip
            formatter={(value) => Number(value).toFixed(3)}
            labelFormatter={(label) => `t = ${label}`}
            contentStyle={{ borderRadius: '0.75rem', border: '1px solid #cbd5e1' }}
          />
          <Area
            type="monotone"
            dataKey="density"
            stroke="#334155"
            fill="#cbd5e1"
            fillOpacity={0.65}
            name="Распределение при H₀"
          />
          <Area
            type="monotone"
            dataKey="tail"
            stroke="#f97316"
            fill="#fdba74"
            fillOpacity={0.95}
            name="p-value"
          />
          <ReferenceLine
            x={observed}
            stroke="#ea580c"
            strokeDasharray="6 6"
            label={{
              value: 'Наблюдаемое t',
              position: 'insideTopLeft',
              fill: '#ea580c',
              fontSize: 12,
              offset: 8,
            }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PValueTailChart
