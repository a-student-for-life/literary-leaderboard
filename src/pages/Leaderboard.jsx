


import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";
import LeaderboardTable from "../components/LeaderboardTable";
import StatsCard from "../components/StatsCard";
import logo from "../assets/litsoc-logo.png";
import { FaInstagram } from "react-icons/fa";

export default function Leaderboard() {
  const [stats, setStats] = useState({ total: 0, prose: 0, poetry: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const querySnapshot = await getDocs(collection(db, "submissions"));
      const data = querySnapshot.docs.map((doc) => doc.data());
      const total = data.length;
      const prose = data.filter((d) => d.submissionType === "Prose").length;
      const poetry = data.filter((d) => d.submissionType === "Poetry").length;
      setStats({ total, prose, poetry });
    };
    fetchStats();
  }, []);

  return (
    <div className="relative min-h-screen px-4 sm:px-8 py-10 overflow-hidden bg-lit-cream">
       
      {/* 🌈 Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-40"
        style={{
          background:
            "linear-gradient(120deg, #F8E5D0 0%, #E2B091 50%, #F8E5D0 100%)",
        }}
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      {/* Header */}
      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 text-center sm:text-left"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <motion.img
          src={logo}
          alt="LitSoc Logo"
          className="h-24 sm:h-40 lg:h-32 object-contain drop-shadow-md mx-auto sm:mx-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        />

        <motion.div
          className="text-center sm:text-left"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.h1
  className="text-2xl scale-[1.09] tracking-wide sm:text-4xl font-bold mb-0 text-center tracking-wide"
  style={{
    fontFamily: "'Cinzel Decorative', cursive",
    background: "linear-gradient(90deg, #4B2E1C, #C35B3A)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "0 2px 6px rgba(139, 69, 19, 0.4)"
  }}
  initial={{ opacity: 0, y: 10 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
  viewport={{ once: true }}
>
  LitSoc Leaderboard🪶
</motion.h1>

          {
          
          
<p
  className="text-[#C35B3A] mt-0 text-base sm:text-lg italic tracking-wide text-center sm:text-left"
  style={{
    fontFamily: "'Dancing Script', cursive",
    fontWeight: 550,
    fontSize: "1.44rem"
  }}
>
  Creativity isn’t measured… but here we try anyway🎨
</p>


}


          {/* Instagram icon */}
          <div className="mt-1 flex justify-center sm:justify-start items-center gap-4">
            <a
              href="https://www.instagram.com/dbit_litsoc?igsh=ZmtyMGJwYXdudXVq"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8E3F29] hover:text-[#4B2E1C] transition-colors"
            >
              <FaInstagram size={24} />
            </a>
          </div>

          {/* Animated underline */}
          <motion.div
            className="mt-2 h-1 w-24 bg-[#C35B3A] rounded-full mx-auto sm:mx-0"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true }}
          />
        </motion.div>
      </motion.div>

      {/* Stats cards with subtle animation */}
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-stretch gap-6 mb-10"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
      >
        <StatsCard className="flex-1" title="Total Submissions" value={stats.total} />
        <StatsCard className="flex-1" title="Prose Entries" value={stats.prose} />
        <StatsCard className="flex-1" title="Poetry Entries" value={stats.poetry} />
      </motion.div>

      {/* Leaderboard section title */}
<motion.h2
    className="text-[#8E3F29] mt-0 text-base sm:text-lg  tracking-wide text-center sm:text-center"
  style={{
    fontFamily: "'Spectral', sans",
    fontSize: "1.44rem"
  }}
  initial={{ opacity: 0, y: 10 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
  viewport={{ once: true }}
>
  Leaderboard - Prose & Poetry🏆
</motion.h2>





      {/* Leaderboard Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.4 }}
        viewport={{ once: true }}
      >
        <LeaderboardTable />
      </motion.div>
    </div>
  );
}
