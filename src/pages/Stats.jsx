import { useApp } from "../context/AppContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { motion } from "motion/react";

export default function Stats() {
  const { timeline } = useApp();

  const counts = timeline.reduce((acc, entry) => {
    acc[entry.type] = (acc[entry.type] || 0) + 1;
    return acc;
  }, {});

  const data = Object.keys(counts).map(key => ({
    name: key,
    value: counts[key]
  }));

  const COLORS = ["#1a3a32", "#2d5a4c", "#4ade80", "#8b5cf6", "#f59e0b"];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-12 text-4xl font-extrabold tracking-tight text-[#1a3a32]">Friendship Analytics</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm"
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
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
          >
            <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-1">Total Interactions</p>
            <p className="text-4xl font-bold text-[#1a3a32]">{timeline.length}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
          >
            <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Breakdown</p>
            <div className="space-y-3">
              {data.map((item, idx) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                    <span className="text-sm font-medium text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold text-[#1a3a32]">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
