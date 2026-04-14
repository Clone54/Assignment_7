import { UserPlus, Users, Clock, Calendar, CheckCircle2 } from "lucide-react";
import { useApp } from "../context/AppContext";
import FriendCard from "../components/FriendCard";
import { motion } from "motion/react";

export default function Home() {
  const { friends, loading } = useApp();

  const summaryCards = [
    { title: "Total Friends", value: friends.length, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Need Attention", value: friends.filter(f => f.bar === "attention").length, icon: Clock, color: "text-red-600", bg: "bg-red-50" },
    { title: "Interaction This Month", value: friends.filter(f => f.bar === "interaction").length, icon: Calendar, color: "text-orange-600", bg: "bg-orange-50" },
    { title: "On Track", value: friends.filter(f => f.bar === "on-track").length, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
  ];

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#1a3a32] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 text-4xl font-bold tracking-tight text-black sm:text-5xl"
        >
          Friends to Keep Close in Your Life
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto mb-8 max-w-2xl text-lg text-gray-500"
        >
          Your personal shelf of meaningful connections. Browse, tend, and nurture the
          relationships that matter most.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 rounded-full bg-green-800 px-6 py-3 font-semibold text-white transition-transform hover:scale-105 cursor-pointer active:scale-95"
        >
          <UserPlus className="h-5 w-5" />
          Add a Friend
        </motion.button>
      </div>

      <div className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
          >
            <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", card.bg)}>
              <card.icon className={cn("h-6 w-6", card.color)} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{card.title}</p>
              <p className="text-2xl font-bold text-[#1a3a32]">{card.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-black">Your Friends</h2>
          <span className="text-sm text-gray-500">{friends.length} total</span>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {friends.map((friend, index) => (
            <motion.div
              key={friend.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <FriendCard friend={friend} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}
