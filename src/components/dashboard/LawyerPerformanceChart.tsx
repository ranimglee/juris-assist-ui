import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { mockLawyers, mockCases } from "@/lib/mockData";

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
    <div className="bg-card rounded-lg shadow-card p-6">
      <h3 className="text-xl font-bold text-foreground mb-4">Performance des avocats</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={lawyerStats}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="name" stroke="hsl(var(--foreground))" />
          <YAxis stroke="hsl(var(--foreground))" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Bar dataKey="total" fill="hsl(var(--primary))" name="Total" />
          <Bar dataKey="completed" fill="hsl(142, 71%, 45%)" name="Terminées" />
          <Bar dataKey="active" fill="hsl(var(--secondary))" name="En cours" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
