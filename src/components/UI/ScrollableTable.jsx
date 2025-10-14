const ScrollableTable = ({ columns, data, heightClass = 'h-80' }) => {
  return (
    <div className={`overflow-auto ${heightClass} border border-neutral-700 rounded-lg`}>
      <table className="min-w-full divide-y divide-neutral-700">
        <thead className="bg-neutral-800/80 sticky top-0">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800">
          {data.length === 0 ? (
            <tr>
              <td className="px-4 py-6 text-center text-gray-500" colSpan={columns.length}>
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={row.id || idx} className="hover:bg-neutral-800/40">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-sm text-gray-200 whitespace-nowrap">
                    {col.render ? col.render(row[col.key], row, idx) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ScrollableTable;


