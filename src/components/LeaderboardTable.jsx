import { FaHeart, FaRegHeart, FaFeatherAlt, FaBook, FaPalette } from "react-icons/fa";
import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  increment,
  getDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";

export default function LeaderboardTable() {
  const [participants, setParticipants] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [likePulse, setLikePulse] = useState({});

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "submissions"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      data.sort((a, b) => b.points - a.points);

      let currentRank = 1;
      let lastPoints = null;
      data.forEach((p, index) => {
        if (lastPoints !== null && p.points === lastPoints) {
          p.rank = currentRank;
        } else {
          currentRank = index + 1;
          p.rank = currentRank;
        }
        lastPoints = p.points;
      });

      setParticipants((prev) => {
        const newPulse = {};
        data.forEach((item) => {
          const old = prev.find((p) => p.id === item.id);
          if (old && old.likeCount !== item.likeCount) {
            newPulse[item.id] = true;
            setTimeout(() => {
              setLikePulse((prev) => ({ ...prev, [item.id]: false }));
            }, 400);
          }
        });
        setLikePulse((prev) => ({ ...prev, ...newPulse }));
        return data;
      });
    });

    return () => unsub();
  }, []);

  const handleLikeToggle = async (id) => {
    const docRef = doc(db, "submissions", id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return;

    const data = snapshot.data();
    let currentUser =
      localStorage.getItem("userEmail") ||
      localStorage.getItem("deviceId") ||
      (() => {
        const newId = crypto.randomUUID();
        localStorage.setItem("deviceId", newId);
        return newId;
      })();

    const hasLiked = data.likedByUsers?.includes(currentUser);

    try {
      if (hasLiked) {
        await updateDoc(docRef, {
          likeCount: increment(-1),
          likedByUsers: arrayRemove(currentUser),
        });
      } else {
        await updateDoc(docRef, {
          likeCount: increment(1),
          likedByUsers: arrayUnion(currentUser),
        });
      }
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  const filtered = participants.filter((p) => {
    const titleText = p.title?.title?.toLowerCase() || "";
    const nameText = p.name?.toLowerCase() || "";
    const typeText = p.submissionType?.toLowerCase() || "";

    return (
      (filter === "All" || p.submissionType === filter) &&
      (nameText.includes(search.toLowerCase()) ||
        typeText.includes(search.toLowerCase()) ||
        titleText.includes(search.toLowerCase()))
    );
  });

 const renderTypeIcon = (type) => {
    if (type === "Poetry") return <FaFeatherAlt className="text-lit-terra inline mr-2" />;
    if (type === "Prose") return <FaBook className="text-lit-terra inline mr-2" />;
    if (type === "Painting") return <FaPalette className="text-lit-terra inline mr-2" />;
    return null;
  };

  const renderRank = (rank) => {
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
          placeholder="Search by name, type, or title..."
          className="flex-1 px-4 py-2 rounded-md border border-lit-muted focus:ring-2 focus:ring-lit-terra focus:outline-none shadow-sm tracking-wide"
          style={{ fontFamily: "'Lora', serif" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="px-4 py-2 rounded-md border border-lit-muted focus:ring-2 focus:ring-lit-terra focus:outline-none shadow-sm tracking-wide"
          style={{ fontFamily: "'Lora', serif" }}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Prose">Prose</option>
          <option value="Poetry">Poetry</option>
          <option value="Painting">Painting</option>
        </select>
      </div>

      {/* Scrollable Table */}
      <div className="overflow-x-auto rounded-xl">
        <table className="min-w-[900px] w-full text-left border-collapse">
          <thead
            className="bg-lit-terra text-lit-cream rounded-t-lg text-sm tracking-wider"
            style={{ fontFamily: "'Cinzel Decorative', serif" }}
          >
            <tr>
              <th className="py-3 px-3 text-center min-w-[50px]">Rank</th>
              <th className="py-3 px-3 min-w-[120px]">Name</th>
              <th className="py-3 px-3 min-w-[150px]">Title/URL</th>
              <th className="py-3 px-3 min-w-[80px]">Type</th>
              <th className="py-3 px-3 text-center min-w-[70px]">Points</th>
              <th className="py-3 px-3 text-center min-w-[90px]">Likes</th>
              <th className="py-3 px-3 min-w-[150px]">Status</th>
              <th className="py-3 px-3 text-center min-w-[100px]">Goodies</th>
            </tr>
          </thead>

          <tbody className="text-lit-brown text-base leading-relaxed">
            {filtered.map((p) => {
              const status = p["status of recent work"];
              const rowBg =
                p.rank <= 3
                  ? "bg-lit-gold/10"
                  : "even:bg-lit-cream/30 odd:bg-lit-cream/10";

              const currentUser =
                localStorage.getItem("userEmail") ||
                localStorage.getItem("deviceId");
              const isLiked = p.likedByUsers?.includes(currentUser);

              return (
                <tr
                  key={p.id}
                  className={`${rowBg} border-b border-lit-muted hover:bg-lit-terra/10 hover:scale-[1.01] transition-all`}
                >
                  {/* Rank */}
                  <td
                    className="py-2 px-3 text-center font-bold text-lg tracking-wide"
                    style={{ fontFamily: "'Cinzel Decorative', serif" }}
                  >
                    {renderRank(p.rank)}
                  </td>

                  {/* Name */}
                  <td
                    className="py-2 px-3 text-lg font-medium tracking-wide"
                    style={{ fontFamily: "'Spectral', serif" }}
                  >
                  {p.name}
                  </td>

                  {/* Title */}
                
                  <td className="py-2 px-3 font-body italic">
                    {p.title?.title ? (
                      <a
                        href={p.title.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-dark-terra hover:underline"
                      >
                        {p.title.title}
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>

                  {/* Type */}
                  <td
                    className="py-2 px-3 font-medium tracking-wide flex items-center"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    {renderTypeIcon(p.submissionType)}
                    {p.submissionType}
                  </td>

                  {/* Points */}
                  <td
                    className="py-2 px-3 text-center font-bold"
                    style={{ fontFamily: "'Cinzel Decorative', serif" }}
                  >
                    {p.points}
                  </td>

                  {/* Likes */}
                  <td className="py-2 px-3 text-center flex justify-center">
                    <button
                      onClick={() => handleLikeToggle(p.id)}
                      className="px-3 py-1 rounded-lg font-medium transition flex items-center justify-center gap-2 bg-lit-gold text-lit-brown hover:bg-lit-gold/95"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      <motion.span
                        whileTap={{ scale: 0.9 }}
                        animate={{
                          scale: likePulse[p.id]
                            ? [1, 1.4, 1]
                            : isLiked
                            ? [1, 1.15, 1]
                            : 1,
                        }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center justify-center"
                      >
                        {isLiked ? (
                          <FaHeart className="text-red-600" />
                        ) : (
                          <FaRegHeart className="text-lit-brown" />
                        )}
                      </motion.span>
                      <span>{p.likeCount || 0}</span>
                    </button>
                  </td>

                  {/* Status */}
                  <td className="py-2 px-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        status === "Winner"
                          ? "bg-lit-gold text-lit-brown"
                          : status === "Reviewed"
                          ? "bg-lit-terra text-lit-cream"
                          : "bg-lit-muted text-lit-brown"
                      }`}
                      style={{ fontFamily: "'Tangerine', serif" }}
                    >
                      {status}
                    </span>
                  </td>

                  {/* Goodies - Automatically YES for Rank 1, 2, 3 */}
                  <td className="py-2 px-3 text-center whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        p.rank <= 3
                          ? "bg-lit-brown text-lit-cream"
                          : "bg-lit-muted text-lit-brown"
                    }`}
                    style={{ fontFamily: "'Tangerine', serif" }}
                  >
                    {p.rank <= 3 ? "🎁 Yes" : "Next Up"}
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
