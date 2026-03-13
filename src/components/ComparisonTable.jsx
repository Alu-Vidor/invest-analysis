function ComparisonTable({ columns = [], rows = [] }) {
  return (
    <div className="overflow-x-auto rounded-[1.5rem] border border-slate-200 bg-white shadow-soft dark:border-slate-700 dark:bg-slate-900">
      <table className="min-w-full border-collapse text-sm text-slate-700 dark:text-slate-200">
        <thead className="bg-slate-100/90 dark:bg-slate-800/90">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-slate-900 dark:text-white">Показатель</th>
            {columns.map((column) => (
              <th
                key={column}
                className="px-4 py-3 text-center font-semibold text-slate-900 dark:text-white"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr
              key={row.label}
              className={row.highlight ? 'bg-amber-50/80 dark:bg-amber-950/20' : 'bg-white dark:bg-slate-900'}
            >
              <th className="border-t border-slate-200 px-4 py-3 text-left font-semibold text-slate-900 dark:border-slate-700 dark:text-white">
                {row.label}
              </th>
              {row.values.map((value, index) => (
                <td
                  key={`${row.label}-${columns[index] ?? index}`}
                  className="border-t border-slate-200 px-4 py-3 text-center dark:border-slate-700"
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ComparisonTable
