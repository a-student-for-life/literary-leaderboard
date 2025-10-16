// export default function StatsCard({ title, value }) {
//   return (
//     <div className="flex flex-col items-center justify-center bg-slate-800 p-5 min-w-[150px] rounded-2xl shadow-md hover:shadow-lg transition-all">
//       <p className="text-gray-400 text-sm">{title}</p>
//       <h2 className="text-3xl font-bold mt-1 text-accent">{value}</h2>
//     </div>
//   );
// }



// export default function StatsCard({ title, value }) {
//   return (
//     <div className="flex flex-col items-center justify-center bg-lit-brown p-4 sm:p-6 min-w-[160px] rounded-2xl shadow-md hover:shadow-lg transition-all">
//       <p className="text-lit-cream text-sm">{title}</p>
//       <h2 className="text-2xl sm:text-3xl font-bold mt-1 text-lit-cream">{value}</h2>
//     </div>
//   );
// }


export default function StatsCard({ title, value, className }) {
  return (
    <div className={`flex flex-col items-center justify-center bg-lit-brown p-6 rounded-2xl shadow-md hover:shadow-lg transition-all ${className}`}>
      <p className="text-lit-cream text-sm">{title}</p>
      <h2 className="text-3xl font-bold mt-1 text-lit-cream">{value}</h2>
    </div>
  );
}
