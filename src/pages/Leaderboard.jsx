// import LeaderboardTable from "../components/LeaderboardTable";
// import StatsCard from "../components/StatsCard";
// import { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebase";

// export default function Leaderboard() {
//   const [stats, setStats] = useState({ total: 0, prose: 0, poetry: 0 });

//   useEffect(() => {
//     const fetchStats = async () => {
//       const querySnapshot = await getDocs(collection(db, "submissions"));
//       const data = querySnapshot.docs.map(doc => doc.data());
//       const total = data.length;
//       const prose = data.filter(d => d.submissionType === "Prose").length;
//       const poetry = data.filter(d => d.submissionType === "Poetry").length;
//       setStats({ total, prose, poetry });
//     };
//     fetchStats();
//   }, []);

//   return (
//     <div className="min-h-screen px-8 py-10">
//       <h1 className="text-5xl font-bold mb-8 text-center text-accent">
//         LitSoc Leaderboard ✍️
//       </h1>

//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//         <StatsCard title="Total Submissions" value={stats.total} />
//         <StatsCard title="Prose Entries" value={stats.prose} />
//         <StatsCard title="Poetry Entries" value={stats.poetry} />
//       </div>

//       <h2 className="text-2xl font-semibold mt-10 mb-4 text-center text-maroon">
//         Leaderboard — Prose & Poetry
//       </h2>

//       <LeaderboardTable />
//     </div>
//   );
// }     








import LeaderboardTable from "../components/LeaderboardTable";
import StatsCard from "../components/StatsCard";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import logo from "../assets/litsoc-logo.png"; // replace with your logo path

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
    <div className="min-h-screen px-4 sm:px-8 py-10 bg-lit-cream">
      {/* Header with logo */}
      <div className="flex flex-col sm:flex-row items-center sm:items-end justify-center gap-4 mb-8">
        <img
          src={logo}
          alt="LitSoc Logo"
          className="h-20 sm:h-24 w-auto object-contain drop-shadow-md"
        />
        <div className="text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold text-lit-brown">
            LitSoc Leaderboard ✍️
          </h1>
          <p className="text-lit-terra mt-1 text-sm sm:text-base">
            Prose & Poetry — friendly competition
          </p>
          <div className="mt-2 h-1 w-24 bg-lit-terra rounded-full mx-auto sm:mx-0" />
        </div>
      </div>

      {/* Stats cards */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch gap-6 mb-10">
        <StatsCard className="flex-1" title="Total Submissions" value={stats.total} />
        <StatsCard className="flex-1" title="Prose Entries" value={stats.prose} />
        <StatsCard className="flex-1" title="Poetry Entries" value={stats.poetry} />
      </div>

      {/* Leaderboard section title */}
      <h2 className="text-2xl font-semibold mb-4 text-center text-lit-brown">
        Leaderboard — Prose & Poetry
      </h2>

      {/* Leaderboard Table */}
      <LeaderboardTable />
    </div>
  );
}
