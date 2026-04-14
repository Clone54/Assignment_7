import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

export default function FriendCard({ friend }) {
  const statusColors = {
    "overdue": "bg-red-100 text-red-700 border-red-200",
    "almost due": "bg-orange-100 text-orange-700 border-orange-200",
    "on-track": "bg-green-100 text-green-700 border-green-200",
  };

  return (
    <Link 
      to={`/friend/${friend.id}`}
      className="group bg-white rounded-2xl border border-gray-100 p-5 transition-all hover:shadow-xl hover:-translate-y-1"
    >
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-4">
          <img 
            src={friend.picture} 
            alt={friend.name}
            referrerPolicy="no-referrer"
            className="h-24 w-24 rounded-full object-cover border-4 border-gray-50 group-hover:border-[#f0f4f3] transition-colors"
          />
          <div className={cn(
            "absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-white",
            friend.status === "on-track" ? "bg-green-500" : 
            friend.status === "almost due" ? "bg-orange-500" : "bg-red-500"
          )} />
        </div>

        <h3 className="text-lg font-bold text-[#1a3a32] mb-1">{friend.name}</h3>
        
        <div className="flex flex-wrap justify-center gap-1.5 mb-4">
          {friend.tags.map(tag => (
            <span key={tag} className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-gray-50 text-gray-500 rounded-full border border-gray-100">
              {tag}
            </span>
          ))}
        </div>

        <div className="w-full pt-4 border-t border-gray-50 flex justify-between items-center">
          <div className="text-left">
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">Last Contact</p>
            <p className="text-sm font-semibold text-gray-700">{friend.days_since_contact} days ago</p>
          </div>
          <span className={cn(
            "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border",
            statusColors[friend.status]
          )}>
            {friend.status}
          </span>
        </div>
      </div>
    </Link>
  );
}
