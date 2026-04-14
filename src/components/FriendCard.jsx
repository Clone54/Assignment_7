import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

export default function FriendCard({ friend }) {
  const statusColors = {
    "overdue": "bg-red-800 text-white border-red-200",
    "almost due": "bg-orange-800 text-white border-orange-200",
    "on-track": "bg-green-800 text-white border-green-200",
  };

  return (
    <Link
  to={`/friend/${friend.id}`}
  className="bg-white rounded-[32px] border border-[#F2F2F2] w-[260px] pt-8 pb-6 px-4 shadow-sm hover:shadow-xl transition-all flex flex-col items-center"
>
  <div className="relative mb-3">
    <img
      src={friend.picture}
      className="h-20 w-20 rounded-full object-cover border-2 border-white shadow-sm"
    />
    <div className={cn(
      "absolute bottom-0 right-1 h-4 w-4 rounded-full border-[3px] border-white",
      friend.status === "on-track" ? "bg-green-500" : "bg-orange-500"
    )} />
  </div>

  <h3 className="text-[18px] font-bold text-[#244D3F] leading-tight">{friend.name}</h3>
  <p className="text-[11px] text-gray-400 mb-3">{friend.days_since_contact}d ago</p>

  <div className="flex gap-1 mb-6">
    {friend.tags.map(tag => (
      <span key={tag} className="px-3 py-1 text-[10px] font-bold bg-[#CBFADB] text-[#244D3F] rounded-full uppercase">
        {tag}
      </span>
    ))}
  </div>

  <div className={cn(
    "px-6 py-1.5 rounded-full text-[12px] font-bold text-white uppercase tracking-wide",
    friend.status === "overdue" ? "bg-[#E65C5C]" : "bg-[#FF9F43]" 
  )}>
    {friend.status}
  </div>
</Link>
  );
}
