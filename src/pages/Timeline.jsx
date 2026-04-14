import { useState } from "react";
import { useApp } from "../context/AppContext";
import { Phone, MessageCircle, Video, Handshake, Filter } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";

export default function Timeline() {
  const { timeline } = useApp();
  const [filter, setFilter] = useState("All");

  const iconMap = {
    "Phone": Phone,
    "MessageCircle": MessageCircle,
    "Video": Video,
    "Handshake": Handshake
  };

  const filteredTimeline = filter === "All" 
    ? timeline 
    : timeline.filter(entry => entry.type === filter);

  const filterOptions = ["All", "Call", "Text", "Video", "Meetup"];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#1a3a32]">Timeline</h1>
        
        <div className="relative inline-block">
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 shadow-sm">
            <Filter className="h-4 w-4 text-gray-400" />
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-transparent text-sm font-medium text-gray-600 outline-none cursor-pointer"
            >
              {filterOptions.map(opt => (
                <option key={opt} value={opt}>{opt === "All" ? "Filter timeline" : opt}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredTimeline.length > 0 ? (
            filteredTimeline.map((entry, idx) => {
              const Icon = iconMap[entry.icon] || MessageCircle;
              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f4f3] text-[#1a3a32]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold text-[#1a3a32]">
                      {entry.type} <span className="font-normal text-gray-400">with</span> {entry.friendName}
                    </h3>
                    <p className="text-sm text-gray-400">
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
