import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { mockCases } from "@/lib/mockData";
import { FileText } from "lucide-react";
import { useLanguage } from "@/i18n";

const COLORS = {
  pending: "#ef4444",
  assigned: "#f59e0b",
  accepted: "#3b82f6",
  completed: "#10b981",
  rejected: "#6b7280",
};

export function CaseStatusChart() {
  const { t, lang } = useLanguage();
  const isRTL = lang === "ar";

  const statusCounts = mockCases.reduce((acc, case_) => {
    acc[case_.status] = (acc[case_.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(statusCounts).map(([status, count]) => ({
    name: t(`case.status.${status}`),
    value: count,
    color: COLORS[status as keyof typeof COLORS],
  }));

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="bg-gradient-to-br from-card to-muted/20 rounded-xl shadow-card p-6 border-none hover:shadow-elegant transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-md">
          <FileText className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-foreground">
          {t("charts.caseStatus.title")}
        </h3>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
         <Pie
  data={data}
  cx="50%"
  cy="50%"
  labelLine={false}
  label={({ name, percent }) => {
    const value = `${(percent * 100).toFixed(0)}٪`;
    return isRTL ? `${value} ${name}` : `${name}: ${value}`;
  }}
  outerRadius={90}
  innerRadius={60}
  dataKey="value"
  strokeWidth={2}
  stroke="#fff"
>

            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "12px",
              padding: "12px",
              textAlign: isRTL ? "right" : "left",
            }}
          />

          <Legend
            align={isRTL ? "right" : "center"}
            wrapperStyle={{ paddingTop: "20px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
