import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const monthlyData = [
  { month: "Jan", cases: 12, completed: 8 },
  { month: "Fév", cases: 15, completed: 10 },
  { month: "Mar", cases: 18, completed: 14 },
  { month: "Avr", cases: 22, completed: 16 },
  { month: "Mai", cases: 25, completed: 20 },
  { month: "Juin", cases: 28, completed: 22 },
];

export function MonthlyTrendsChart() {
  return (
    <div className="bg-card rounded-lg shadow-card p-6">
      <h3 className="text-xl font-bold text-foreground mb-4">Évolution mensuelle</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="month" stroke="hsl(var(--foreground))" />
          <YAxis stroke="hsl(var(--foreground))" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="cases"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            name="Affaires créées"
          />
          <Line
            type="monotone"
            dataKey="completed"
            stroke="hsl(142, 71%, 45%)"
            strokeWidth={2}
            name="Affaires terminées"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
