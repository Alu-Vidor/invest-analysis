import {
  CartesianGrid,
  Legend,
  Line,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  LineChart,
} from 'recharts'

const tradeoffData = [
  {
    mode: 'Мягкий',
    strictness: 1,
    alpha: 0.16,
    beta: 0.08,
    power: 0.92,
    summary: 'Легко объявить эффект, но много ложных тревог.',
  },
  {
    mode: 'Умеренный',
    strictness: 2,
    alpha: 0.11,
    beta: 0.13,
    power: 0.87,
    summary: 'Компромисс между ложной тревогой и пропуском сигнала.',
  },
  {
    mode: 'Сбалансированный',
    strictness: 3,
    alpha: 0.08,
    beta: 0.18,
    power: 0.82,
    summary: 'Типичный учебный режим при фиксированном размере выборки.',
  },
  {
    mode: 'Строгий',
    strictness: 4,
    alpha: 0.05,
    beta: 0.26,
    power: 0.74,
    summary: 'Ложных тревог меньше, но растёт шанс пропустить эффект.',
  },
  {
    mode: 'Очень строгий',
    strictness: 5,
    alpha: 0.03,
    beta: 0.35,
    power: 0.65,
    summary: 'Почти не верим в эффект без сильных улик, мощность проседает.',
  },
]

function ErrorTradeoffChart() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={tradeoffData} margin={{ top: 18, right: 20, left: 8, bottom: 18 }}>
          <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#cbd5e1" />
          <ReferenceArea x1="Строгий" x2="Очень строгий" fill="#fee2e2" fillOpacity={0.18} />
          <ReferenceArea x1="Мягкий" x2="Умеренный" fill="#dcfce7" fillOpacity={0.14} />
          <XAxis
            dataKey="mode"
            tickLine={false}
            axisLine={{ stroke: '#64748b' }}
            tick={{ fill: '#475569', fontSize: 12 }}
            interval={0}
          />
          <YAxis
            tickLine={false}
            axisLine={{ stroke: '#64748b' }}
            tick={{ fill: '#475569', fontSize: 12 }}
            domain={[0, 1]}
            tickFormatter={(value) => `${Math.round(value * 100)}%`}
            width={48}
          />
          <Tooltip
            formatter={(value, name) => [`${Math.round(Number(value) * 100)}%`, name]}
            labelFormatter={(_, payload) => payload?.[0]?.payload?.summary ?? ''}
            contentStyle={{ borderRadius: '0.75rem', border: '1px solid #cbd5e1' }}
          />
          <Legend verticalAlign="bottom" height={36} />
          <Line
            type="monotone"
            dataKey="alpha"
            stroke="#ef4444"
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 3, fill: '#fff' }}
            activeDot={{ r: 6 }}
            name="Ошибка I рода α"
          />
          <Line
            type="monotone"
            dataKey="beta"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 3, fill: '#fff' }}
            activeDot={{ r: 6 }}
            name="Ошибка II рода β"
          />
          <Line
            type="monotone"
            dataKey="power"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 3, fill: '#fff' }}
            activeDot={{ r: 6 }}
            name="Мощность 1 − β"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ErrorTradeoffChart
