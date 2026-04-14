import { useParams, useNavigate } from "react-router-dom";
import {
  Clock,
  Calendar,
  Target,
  BellOff,
  Archive,
  Trash2,
  ChevronLeft,
  Mail,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import { cn } from "../lib/utils";
import callImage from "../assets/PhoneCall.png"
import textImage from "../assets/ChatDots.png"
import videoImage from "../assets/VideoCamera.png"

export default function FriendDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { friends, addTimelineEntry, loading } = useApp();

  const friend = friends.find(f => f.id === parseInt(id));

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#1a3a32] border-t-transparent"></div>
      </div>
    );
  }

  if (!friend) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold text-gray-800">Friend not found</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-[#1a3a32] hover:underline flex items-center gap-1"
        >
          <ChevronLeft className="h-4 w-4" /> Back to Home
        </button>
      </div>
    );
  }

  const handleCheckIn = (type) => {
    const iconMap = {
      "Call": "Phone",
      "Text": "MessageCircle",
      "Video": "Video"
    };

    addTimelineEntry({
      type,
      friendName: friend.name,
      icon: iconMap[type]
    });

    toast.success(`${type} with ${friend.name} logged!`, {
      icon: '✅',
      style: {
        borderRadius: '10px',
        background: '#1a3a32',
        color: '#fff',
      },
    });
  };

  const statusColors = {
    "overdue": "bg-red-800 text-white",
    "almost due": "bg-orange-800 text-white",
    "on-track": "bg-green-800 text-white",
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate("/")}
        className="mb-8 flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-[#1a3a32] transition-colors"
      >
        <ChevronLeft className="h-4 w-4" /> Back to Friends
      </button>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm"
          >
            <img
              src={friend.picture}
              alt={friend.name}
              referrerPolicy="no-referrer"
              className="mx-auto mb-6 h-32 w-32 rounded-full object-cover border-4 border-[#f0f4f3]"
            />
            <h1 className="text-2xl font-bold text-[#1a3a32] mb-2">{friend.name}</h1>

            <div className="flex flex-col items-center gap-2 mb-6">
              <span className={cn(
                "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border",
                statusColors[friend.status]
              )}>
                {friend.status}
              </span>
              <div className="flex flex-wrap justify-center gap-1.5">
                {friend.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 text-[12px] font-semibold uppercase tracking-wider bg-[#CBFADB] text-[#244D3F] rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-gray-500 italic mb-6">"{friend.bio}"</p>

            <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
              <Mail className="h-4 w-4" />
              <span>Preferred: {friend.email}</span>
            </div>
          </motion.div>

          <div className="space-y-3">
            <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-100 bg-white py-3 font-medium text-gray-700 transition-all hover:bg-gray-50">
              <BellOff className="h-4 w-4" /> Snooze 2 Weeks
            </button>
            <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-100 bg-white py-3 font-medium text-gray-700 transition-all hover:bg-gray-50">
              <Archive className="h-4 w-4" /> Archive
            </button>
            <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-50 bg-white py-3 font-medium text-red-600 transition-all hover:bg-red-50">
              <Trash2 className="h-4 w-4" /> Delete
            </button>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { label: "Days Since Contact", value: friend.days_since_contact, icon: Clock },
              { label: "Goal (Days)", value: friend.goal, icon: Target },
              { label: "Next Due", value: friend.next_due_date, icon: Calendar },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm"
              >
                <p className="text-3xl font-bold text-[#1a3a32] mb-1">{stat.value}</p>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[#1a3a32]">Relationship Goal</h3>
              <button className="rounded-lg bg-gray-50 px-3 py-1 text-xs font-bold text-gray-500 hover:bg-gray-100 transition-colors">
                Edit
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0f4f3] text-[#1a3a32]">
                <Target className="h-5 w-5" />
              </div>
              <p className="text-gray-600">
                Connect every <span className="font-bold text-[#1a3a32]">{friend.goal} days</span>
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm"
          >
            <h3 className="text-lg font-bold text-[#1a3a32] mb-6">Quick Check-In</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Call", icon: callImage },
                { label: "Text", icon: textImage },
                { label: "Video", icon: videoImage },
              ].map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.label}
                    onClick={() => handleCheckIn(action.label)}
                    className="group flex flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50/50 py-6 transition-all hover:bg-[#f0f4f3] hover:border-[#2d5a4c]/20"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#1a3a32] shadow-sm transition-transform group-hover:scale-110">
                      <img
                        src={action.icon}
                        alt={action.label}
                        className="h-6 w-6 object-contain"
                      />
                    </div>
                    <span className="text-sm font-bold text-gray-600 group-hover:text-[#1a3a32]">{action.label}</span>
                  </button>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
