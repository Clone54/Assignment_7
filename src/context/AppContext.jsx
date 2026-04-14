import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [friends, setFriends] = useState([]);
  const [timeline, setTimeline] = useState(() => {
    const saved = localStorage.getItem("keenkeeper_timeline");
    return saved ? JSON.parse(saved) : [
      { id: 1, type: "Meetup", friendName: "Tom Baker", date: "2026-03-29", icon: "Handshake" },
      { id: 2, type: "Text", friendName: "Sarah Chen", date: "2026-03-28", icon: "Text" },
      { id: 3, type: "Meetup", friendName: "Olivia Martinez", date: "2026-03-26", icon: "Handshake" },
      { id: 4, type: "Video", friendName: "Aisha Patel", date: "2026-03-23", icon: "Video" },
      { id: 5, type: "Meetup", friendName: "Sarah Chen", date: "2026-03-21", icon: "Handshake" },
      { id: 6, type: "Call", friendName: "Marcus Johnson", date: "2026-03-19", icon: "Phone" },
    ];
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await fetch("/friends.json");
        const data = await response.json();
        setFriends(data);
      } catch (error) {
        console.error("Error fetching friends:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  useEffect(() => {
    localStorage.setItem("keenkeeper_timeline", JSON.stringify(timeline));
  }, [timeline]);

  const addTimelineEntry = (entry) => {
    const newEntry = {
      id: Date.now(),
      ...entry,
      date: new Date().toISOString().split('T')[0]
    };
    setTimeline(prev => [newEntry, ...prev]);
  };

  return (
    <AppContext.Provider value={{ friends, timeline, loading, addTimelineEntry }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  return context;
}
