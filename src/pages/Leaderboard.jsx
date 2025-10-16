import LeaderboardTable from "../components/LeaderboardTable";
import StatsCard from "../components/StatsCard";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Leaderboard() {
  const [stats, setStats] = useState({ total: 0, prose: 0, poetry: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const querySnapshot = await getDocs(collection(db, "submissions"));
      const data = querySnapshot.docs.map(doc => doc.data());
      const total = data.length;
      const prose = data.filter(d => d.submissionType === "Prose").length;
      const poetry = data.filter(d => d.submissionType === "Poetry").length;
      setStats({ total, prose, poetry });
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen px-8 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-accent">
        LitSoc Leaderboard ✍️
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatsCard title="Total Submissions" value={stats.total} />
        <StatsCard title="Prose Entries" value={stats.prose} />
        <StatsCard title="Poetry Entries" value={stats.poetry} />
      </div>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-center">
        Leaderboard — Prose & Poetry
      </h2>

      <LeaderboardTable />
    </div>
  );
}
