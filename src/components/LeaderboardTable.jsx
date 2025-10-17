// import { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebase";

// export default function LeaderboardTable() {
//   const [participants, setParticipants] = useState([]);
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("All");

//   useEffect(() => {
//     const fetchData = async () => {
//       const querySnapshot = await getDocs(collection(db, "submissions"));
//       const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       data.sort((a, b) => a.rank - b.rank);
//       setParticipants(data);
//     };
//     fetchData();
//   }, []);

//   const filtered = participants.filter(p =>
//     (filter === "All" || p.submissionType === filter) &&
//     (p.name.toLowerCase().includes(search.toLowerCase()) ||
//       p.submissionType.toLowerCase().includes(search.toLowerCase()))
//   );

//   const renderRank = rank => {
//     if (rank === 1) return "🥇";
//     if (rank === 2) return "🥈";
//     if (rank === 3) return "🥉";
//     return rank;
//   };

//   return (
//     <div className="mt-6 bg-slate-800 p-4 sm:p-6 rounded-2xl shadow-lg">
//       {/* Search + Filter */}
//       <div className="flex flex-col sm:flex-row justify-between mb-4 gap-2">
//         <input
//           type="text"
//           placeholder="Search by name or type..."
//           className="flex-1 px-4 py-2 rounded-md text-black"
//           value={search}
//           onChange={e => setSearch(e.target.value)}
//         />
//         <select
//           className="px-4 py-2 rounded-md text-black"
//           value={filter}
//           onChange={e => setFilter(e.target.value)}
//         >
//           <option value="All">All</option>
//           <option value="Prose">Prose</option>
//           <option value="Poetry">Poetry</option>
//         </select>
//       </div>

//       {/* Scrollable Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full text-left text-white">
//           <thead>
//             <tr className="border-b border-slate-700">
//               <th className="py-2 px-3">Rank</th>
//               <th className="py-2 px-3">Name</th>
//               <th className="py-2 px-3">Type</th>
//               <th className="py-2 px-3">Points</th>
//               <th className="py-2 px-3">Status of Recent Work</th>
//               <th className="py-2 px-3">Goodies</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filtered.map(p => {
//               const status = p["status of recent work"];
//               const goodies = p.goodies === true;

//               return (
//                 <tr
//                   key={p.id}
//                   className="border-b border-slate-700 hover:bg-slate-700/30 transition"
//                 >
//                   <td className="py-2 px-3">{renderRank(p.rank)}</td>
//                   <td className="py-2 px-3">{p.name}</td>
//                   <td className="py-2 px-3">{p.submissionType}</td>
//                   <td className="py-2 px-3">{p.points}</td>
//                   <td className="py-2 px-3">
//                     <span
//                       className={`px-3 py-1 rounded-lg text-sm ${
//                         status === "Winner"
//                           ? "bg-green-600"
//                           : status === "Reviewed"
//                           ? "bg-yellow-500 text-black"
//                           : "bg-gray-600"
//                       }`}
//                     >
//                       {status}
//                     </span>
//                   </td>
//                   <td className="py-2 px-3">
//                     <span
//                       className={`px-3 py-1 rounded-lg text-sm flex items-center gap-1 w-fit ${
//                         goodies ? "bg-purple-700" : "bg-gray-600"
//                       }`}
//                     >
//                       {goodies ? "🎁 Yes" : "🤞 Next Up"}
//                     </span>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }



//....//



import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function LeaderboardTable() {
  const [participants, setParticipants] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "submissions"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      data.sort((a, b) => a.rank - b.rank);
      setParticipants(data);
    };
    fetchData();
  }, []);

  const filtered = participants.filter(
    p =>
      (filter === "All" || p.submissionType === filter) &&
      (p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.submissionType.toLowerCase().includes(search.toLowerCase()))
  );

  const renderRank = rank => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return rank;
  };

  return (
    <div className="mt-6 bg-lit-cream p-4 sm:p-6 rounded-2xl shadow-xl border border-lit-muted">
      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row justify-between mb-4 gap-2">
        <input
          type="text"
          placeholder="Search by name or type..."
          className="flex-1 px-4 py-2 rounded-md border border-lit-muted focus:ring-2 focus:ring-lit-terra focus:outline-none"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="px-4 py-2 rounded-md border border-lit-muted focus:ring-2 focus:ring-lit-terra focus:outline-none"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Prose">Prose</option>
          <option value="Poetry">Poetry</option>
        </select>
      </div>

      {/* Scrollable Table */}
      <div className="overflow-x-auto">
        <table className="min-w-[700px] w-full text-left border-collapse">
          <thead className="bg-lit-terra text-lit-cream rounded-t-lg">
            <tr>
              <th className="py-3 px-3 uppercase text-sm font-semibold tracking-wide text-center min-w-[50px]">Rank</th>
              <th className="py-3 px-3 uppercase text-sm font-semibold tracking-wide min-w-[120px]">Name</th>
              <th className="py-3 px-3 uppercase text-sm font-semibold tracking-wide min-w-[80px]">Type</th>
              <th className="py-3 px-3 uppercase text-sm font-semibold tracking-wide text-center min-w-[70px]">Points</th>
              <th className="py-3 px-3 uppercase text-sm font-semibold tracking-wide min-w-[150px]">Status</th>
              <th className="py-3 px-3 uppercase text-sm font-semibold tracking-wide text-center min-w-[100px]">Goodies</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => {
              const status = p["status of recent work"];
              const goodies = p.goodies === true;

              const rowBg = p.rank <= 3 ? "bg-lit-gold/10" : "bg-transparent";

              return (
                <tr
                  key={p.id}
                  className={`${rowBg} border-b border-lit-muted hover:bg-lit-terra/10 transition-all`}
                >
                  <td className="py-2 px-3 text-center">{renderRank(p.rank)}</td>
                  <td className="py-2 px-3">{p.name}</td>
                  <td className="py-2 px-3">{p.submissionType}</td>
                  <td className="py-2 px-3 text-center">{p.points}</td>
                  <td className="py-2 px-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        status === "Winner"
                          ? "bg-lit-gold text-lit-brown"
                          : status === "Reviewed"
                          ? "bg-lit-terra text-lit-cream"
                          : "bg-lit-muted text-lit-brown"
                      }`}
                    >
                      {status}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        goodies ? "bg-lit-brown text-lit-cream" : "bg-lit-muted text-lit-brown"
                      }`}
                    >
                      {goodies ? "🎁 Yes" : "Next Up"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
