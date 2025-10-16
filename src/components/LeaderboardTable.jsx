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

  const filtered = participants.filter(p =>
    (filter === "All" || p.submissionType === filter) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.submissionType.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="mt-6 bg-slate-800 p-4 sm:p-6 rounded-2xl shadow-lg">
      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row justify-between mb-4 gap-2">
        <input
          type="text"
          placeholder="Search by name or type..."
          className="flex-1 px-4 py-2 rounded-md text-black"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          className="px-4 py-2 rounded-md text-black"
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
        <table className="min-w-full text-left text-white">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="py-2 px-3">Rank</th>
              <th className="py-2 px-3">Name</th>
              <th className="py-2 px-3">Type</th>
              <th className="py-2 px-3">Points</th>
              <th className="py-2 px-3">Status of Recent Work</th>
              <th className="py-2 px-3">Goodies</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => {
              const status = p["status of recent work"];
              const goodies = p.goodies === true;

              return (
                <tr
                  key={p.id}
                  className="border-b border-slate-700 hover:bg-slate-700/30 transition"
                >
                  <td className="py-2 px-3">{p.rank}</td>
                  <td className="py-2 px-3">{p.name}</td>
                  <td className="py-2 px-3">{p.submissionType}</td>
                  <td className="py-2 px-3">{p.points}</td>
                  <td className="py-2 px-3">
                    <span
                      className={`px-3 py-1 rounded-lg text-sm ${
                        status === "Winner"
                          ? "bg-green-600"
                          : status === "Reviewed"
                          ? "bg-yellow-500 text-black"
                          : "bg-gray-600"
                      }`}
                    >
                      {status}
                    </span>
                  </td>
                  <td className="py-2 px-3">
                    <span
                      className={`px-3 py-1 rounded-lg text-sm flex items-center gap-1 w-fit ${
                        goodies ? "bg-purple-700" : "bg-gray-600"
                      }`}
                    >
                      {goodies ? "🎁 Yes" : "🚫 No"}
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
