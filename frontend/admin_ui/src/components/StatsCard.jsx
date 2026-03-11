export default function StatsCard({ title, value }) {

  return (
    <div className="bg-white shadow rounded p-4">

      <p className="text-gray-500">
        {title}
      </p>

      <h2 className="text-2xl font-bold">
        {value}
      </h2>

    </div>
  );
}