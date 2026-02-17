import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { useLanguage } from "@/i18n";

const monthlyData = [
  { month: "jan", cases: 12, completed: 8 },
  { month: "feb", cases: 15, completed: 10 },
  { month: "mar", cases: 18, completed: 14 },
  { month: "apr", cases: 22, completed: 16 },
  { month: "may", cases: 25, completed: 20 },
  { month: "jun", cases: 28, completed: 22 },
];

export function MonthlyTrendsChart() {
  const { t, lang } = useLanguage();
  const isRTL = lang === "ar";

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="bg-gradient-to-br from-card to-muted/20 rounded-xl shadow-card p-6 border-none hover:shadow-elegant transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-foreground">
          {t("charts.monthlyTrends.title")}
        </h3>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={monthlyData}>
          <defs>
            <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />

          <XAxis
            dataKey="month"
            tickFormatter={(value) => t(`month.${value}`)}
            stroke="hsl(var(--foreground))"
            fontSize={12}
            tickLine={false}
            reversed={isRTL}
          />

          <YAxis
            stroke="hsl(var(--foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            orientation={isRTL ? "right" : "left"}
          />

          <Tooltip
            labelFormatter={(value) => t(`month.${value}`)}
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

          <Area
            type="monotone"
            dataKey="cases"
            stroke="#dc2626"
            strokeWidth={3}
            fill="url(#colorCases)"
            name={t("charts.monthlyTrends.cases")}
          />

          <Area
            type="monotone"
            dataKey="completed"
            stroke="#10b981"
            strokeWidth={3}
            fill="url(#colorCompleted)"
            name={t("charts.monthlyTrends.completed")}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
