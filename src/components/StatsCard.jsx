export default function StatsCard({ title, value }) {
  return (
    <div className="flex flex-col items-center justify-center bg-slate-800 p-5 min-w-[150px] rounded-2xl shadow-md hover:shadow-lg transition-all">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-3xl font-bold mt-1 text-accent">{value}</h2>
    </div>
  );
}
