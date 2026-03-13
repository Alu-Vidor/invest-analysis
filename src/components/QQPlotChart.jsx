import {
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const nearNormalData = [
  { theoretical: -2.4, sample: -2.3 },
  { theoretical: -1.9, sample: -1.95 },
  { theoretical: -1.5, sample: -1.48 },
  { theoretical: -1.1, sample: -1.08 },
  { theoretical: -0.7, sample: -0.72 },
  { theoretical: -0.3, sample: -0.29 },
  { theoretical: 0, sample: 0.02 },
  { theoretical: 0.3, sample: 0.31 },
  { theoretical: 0.7, sample: 0.74 },
  { theoretical: 1.1, sample: 1.12 },
  { theoretical: 1.5, sample: 1.53 },
  { theoretical: 1.9, sample: 1.95 },
  { theoretical: 2.4, sample: 2.36 },
]

const skewedData = [
  { theoretical: -2.4, sample: -1.1 },
  { theoretical: -1.9, sample: -0.95 },
  { theoretical: -1.5, sample: -0.8 },
  { theoretical: -1.1, sample: -0.55 },
  { theoretical: -0.7, sample: -0.25 },
  { theoretical: -0.3, sample: 0.08 },
  { theoretical: 0, sample: 0.45 },
  { theoretical: 0.3, sample: 0.88 },
  { theoretical: 0.7, sample: 1.42 },
  { theoretical: 1.1, sample: 2.1 },
  { theoretical: 1.5, sample: 2.95 },
  { theoretical: 1.9, sample: 3.95 },
  { theoretical: 2.4, sample: 5.2 },
]

const heavyTailsData = [
  { theoretical: -2.4, sample: -4.15 },
  { theoretical: -1.9, sample: -3.05 },
  { theoretical: -1.5, sample: -2.2 },
  { theoretical: -1.1, sample: -1.5 },
  { theoretical: -0.7, sample: -0.9 },
  { theoretical: -0.3, sample: -0.36 },
  { theoretical: 0, sample: 0 },
  { theoretical: 0.3, sample: 0.35 },
  { theoretical: 0.7, sample: 0.92 },
  { theoretical: 1.1, sample: 1.55 },
  { theoretical: 1.5, sample: 2.32 },
  { theoretical: 1.9, sample: 3.2 },
  { theoretical: 2.4, sample: 4.3 },
]

function QQPlotChart({ variant = 'normal' }) {
  const chartMap = {
    normal: {
      data: nearNormalData,
      pointColor: '#2563eb',
      lineColor: '#dc2626',
      yDomain: [-2.6, 2.6],
    },
    skewed: {
      data: skewedData,
      pointColor: '#ea580c',
      lineColor: '#a855f7',
      yDomain: [-2.6, 5.5],
    },
    'heavy-tails': {
      data: heavyTailsData,
      pointColor: '#0f766e',
      lineColor: '#be123c',
      yDomain: [-4.6, 4.6],
    },
  }

  const chart = chartMap[variant] ?? chartMap.normal

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 12, right: 18, left: 8, bottom: 12 }}>
          <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#cbd5e1" />
          <XAxis
            type="number"
            dataKey="theoretical"
            domain={[-2.6, 2.6]}
            tickLine={false}
            axisLine={{ stroke: '#64748b' }}
            tick={{ fill: '#475569', fontSize: 12 }}
            label={{ value: 'Теоретические квантили N(0,1)', position: 'insideBottom', offset: -4, fill: '#475569', fontSize: 12 }}
          />
          <YAxis
            type="number"
            dataKey="sample"
            domain={chart.yDomain}
            tickLine={false}
            axisLine={{ stroke: '#64748b' }}
            tick={{ fill: '#475569', fontSize: 12 }}
            width={46}
            label={{ value: 'Квантили выборки', angle: -90, position: 'insideLeft', fill: '#475569', fontSize: 12 }}
          />
          <Tooltip
            cursor={{ strokeDasharray: '4 4' }}
            formatter={(value) => Number(value).toFixed(2)}
            labelFormatter={() => ''}
            contentStyle={{ borderRadius: '0.75rem', border: '1px solid #cbd5e1' }}
          />
          <ReferenceLine
            segment={[{ x: -2.5, y: -2.5 }, { x: 2.5, y: 2.5 }]}
            stroke={chart.lineColor}
            strokeWidth={2}
            strokeDasharray="6 6"
          />
          <Scatter data={chart.data} fill={chart.pointColor} />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}

export default QQPlotChart
