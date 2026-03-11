export default function FeedbackTable() {

  return (
    <div className="bg-white shadow rounded">

      <table className="w-full text-left">

        <thead className="bg-gray-200">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Rating</th>
            <th className="p-3">Category</th>
            <th className="p-3">Sentiment</th>
          </tr>
        </thead>

        <tbody>

          <tr className="border-t">
            <td className="p-3">John</td>
            <td className="p-3">2</td>
            <td className="p-3">Performance</td>
            <td className="p-3 text-red-600">NEGATIVE</td>
          </tr>

        </tbody>

      </table>

    </div>
  );
}