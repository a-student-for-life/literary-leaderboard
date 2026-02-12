


import { FaClipboardList, FaBook, FaFeatherAlt, FaPalette } from "react-icons/fa";

export default function StatsCard({ title, value, className }) {
  // Choose icon based on title
  const renderIcon = () => {
    switch (title) {
      case "Total Submissions":
        return <FaClipboardList className="text-[#C35B3A] w-6 h-6" />;
      case "Prose Entries":
        return <FaBook className="text-[#C35B3A] w-6 h-6" />;
      case "Poetry Entries":
        return <FaFeatherAlt className="text-[#C35B3A] w-6 h-6" />;
      case "Painting Entries":
        return <FaPalette className="text-[#C35B3A] w-6 h-6" />;  
      default:
        return null;
    }
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center 
      bg-gradient-to-br from-[#f5e5d8] via-[#edd7bd] to-[#e5caa0]
      p-6 rounded-2xl text-center
      shadow-[0_8px_20px_rgba(180,70,30,0.45),0_4px_12px_rgba(230,130,80,0.3)]
      hover:shadow-[0_12px_32px_rgba(70,45,20,0.5),0_8px_24px_rgba(203,161,111,0.35)]
      hover:-translate-y-1.5
      transition-all duration-500 ease-out
      ${className}`}
    >
      {/* Icon at top-right */}
      <div className="absolute top-4 right-4">
        {renderIcon()}
      </div>

      <p className="text-[#8E3F29] text-md font-semibold uppercase tracking-wide font-serif">
        {title}
      </p>
      <h2 className="text-4xl font-bold font-serif mt-1 text-[#4b2e1c] drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]">
        {value}
      </h2>
    </div>
  );
}



