import React from "react";

export default function FeedbackTable({ feedback }) {

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

          {feedback.map((item) => (

            <tr key={item.feedback_id} className="border-t">

              <td className="p-3">{item.name}</td>
              <td className="p-3">{item.rating}</td>
              <td className="p-3">{item.category}</td>
              <td className="p-3">{item.sentiment}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
} 