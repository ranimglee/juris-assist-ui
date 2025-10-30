import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { mockCases } from "@/lib/mockData";

const COLORS = {
  pending: "hsl(var(--primary))",
  assigned: "hsl(var(--secondary))",
  accepted: "hsl(var(--accent))",
  completed: "hsl(142, 71%, 45%)",
  rejected: "hsl(var(--destructive))",
};

export function CaseStatusChart() {
  const statusCounts = mockCases.reduce((acc, case_) => {
    acc[case_.status] = (acc[case_.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(statusCounts).map(([status, count]) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: count,
    color: COLORS[status as keyof typeof COLORS],
  }));

  return (
    <div className="bg-card rounded-lg shadow-card p-6">
      <h3 className="text-xl font-bold text-foreground mb-4">Répartition des affaires</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
