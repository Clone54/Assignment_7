import { useState } from "react";
import { useApp } from "../context/AppContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { motion } from "motion/react";

export default function Stats() {
  const { timeline } = useApp();
  const [activeIndex, setActiveIndex] = useState(null);

  const counts = timeline.reduce((acc, entry) => {
    acc[entry.type] = (acc[entry.type] || 0) + 1;
    return acc;
  }, {});

  const data = Object.keys(counts).map(key => ({
    name: key,
    value: counts[key]
  }));

  const COLORS = ["#1a3a32", "#8b5cf6", "#4ade20", "#FF0000"];

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-12 text-[40px] font-bold tracking-tight text-[#244D3F]">Friendship Analytics</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 rounded-[32px] border border-[#F2F2F2] bg-white p-8 shadow-sm"
        >
          <h3 className="mb-8 text-lg font-bold text-[#1a3a32]">By Interaction Type</h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                  activeIndex={activeIndex}
                  onClick={onPieEnter}
                  style={{ cursor: 'pointer', outline: 'none' }}
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                      stroke={activeIndex === index ? COLORS[index % COLORS.length]: "none"}
                      strokeWidth={activeIndex === index ? 7 : 0}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-[24px] border border-[#F2F2F2] bg-white p-6 shadow-sm"
          >
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Breakdown</p>
            <div className="space-y-4">
              {data.map((item, idx) => (
                <div 
                  key={item.name} 
                  className={`flex items-center justify-between p-2 rounded-xl transition-colors cursor-pointer ${activeIndex === idx ? 'bg-[#f0f4f3]' : ''}`}
                  onClick={() => setActiveIndex(idx)}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                    <span className="text-sm font-bold text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-extrabold text-[#244D3F]">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}