
export default function InfoTable({ data }) {
  return (
    <table className="table w-full text-home-100 font-body">
      <tbody className="table-row-group">
        {Object.keys(data)?.map((item, index) => (
          <tr key={index} className="table-row border border-accent-700/50 *:text-left *:p-5 odd:bg-fg-100 even:bg-neutral-50">
            <th className="table-cell font-semibold border-r border-accent-700/50">{item}</th>
            <td className="table-cell text-sm opacity-60">{data[item]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}