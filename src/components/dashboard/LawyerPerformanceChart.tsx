import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { mockLawyers, mockCases } from "@/lib/mockData";
import { Award } from "lucide-react";

export function LawyerPerformanceChart() {
  const lawyerStats = mockLawyers.map((lawyer) => {
    const assignedCases = mockCases.filter((c) => c.assignedLawyerId === lawyer.id);
    const completedCases = assignedCases.filter((c) => c.status === "completed");
    const activeCases = assignedCases.filter((c) => c.status === "assigned" || c.status === "accepted");

    return {
      name: `${lawyer.firstName} ${lawyer.lastName}`,
      total: assignedCases.length,
      completed: completedCases.length,
      active: activeCases.length,
    };
  });

  return (
    <div className="bg-gradient-to-br from-card to-muted/20 rounded-xl shadow-card p-6 border-none hover:shadow-elegant transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-accent flex items-center justify-center shadow-md">
          <Award className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-foreground">Performance des avocats</h3>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={lawyerStats} barGap={8}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis
            dataKey="name"
            stroke="hsl(var(--foreground))"
            fontSize={12}
            tickLine={false}
          />
          <YAxis
            stroke="hsl(var(--foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "12px",
              padding: "12px",
            }}
          />
          <Legend wrapperStyle={{ paddingTop: "20px" }} />
          <Bar dataKey="total" fill="#dc2626" name="Total" radius={[8, 8, 0, 0]} />
          <Bar dataKey="completed" fill="#10b981" name="Terminées" radius={[8, 8, 0, 0]} />
          <Bar dataKey="active" fill="#3b82f6" name="En cours" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
