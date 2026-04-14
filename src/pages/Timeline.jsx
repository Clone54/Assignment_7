import { useState } from "react";
import { useApp } from "../context/AppContext";
import Phone from "../assets/call.png";
import Text from "../assets/text.png";
import Video from "../assets/video.png";
import Handshake from "../assets/handshake.png";
import { motion, AnimatePresence } from "framer-motion";

export default function Timeline() {
  const { timeline } = useApp();
  const [filter, setFilter] = useState("All");

  const iconMap = {
    "Call": Phone,
    "Phone": Phone,
    "Text": Text,
    "Video": Video,
    "Meetup": Handshake,
    "Handshake": Handshake
  };

  const filteredTimeline = filter === "All"
    ? timeline
    : timeline.filter(entry => entry.type === filter);

  const filterOptions = ["All", "Call", "Text", "Video", "Meetup"];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-[40px] font-bold tracking-tight text-[#244D3F] mb-6">Timeline</h1>

      <div className="relative inline-block ml-5 appearance-none">
        <div className="flex items-center gap-2 rounded-xl border border-[#F2F2F2] bg-white px-4 py-2 shadow-sm">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-transparent text-sm font-medium text-gray-600 outline-none cursor-pointer pr-4 pl-4 rounded-2xl"
          >
            {filterOptions.map(opt => (
              <option key={opt} value={opt}>{opt === "All" ? "Filter timeline" : opt}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredTimeline.length > 0 ? (
            filteredTimeline.map((entry, idx) => {
              const iconSrc = iconMap[entry.type] || iconMap[entry.icon] || Handshake;

              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ delay: idx * 0.03 }}
                  className="flex items-center gap-4 rounded-[24px] border border-[#F2F2F2] bg-white p-4 transition-all hover:shadow-md"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0f4f3]">
                    <img
                      src={iconSrc}
                      alt={entry.type}
                      className="h-5 w-5 object-contain"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-[16px] font-bold text-[#244D3F]">
                      {entry.type} <span className="font-normal text-gray-700">with {entry.friendName}</span>
                    </h3>
                    <p className="text-[13px] text-gray-400">
                      {new Date(entry.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="py-20 text-center text-gray-400">
              <p>No interactions found for this filter.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}