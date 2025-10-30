import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { CaseStatusChart } from "@/components/dashboard/CaseStatusChart";
import { LawyerPerformanceChart } from "@/components/dashboard/LawyerPerformanceChart";
import { MonthlyTrendsChart } from "@/components/dashboard/MonthlyTrendsChart";
import { mockLawyers, mockCases } from "@/lib/mockData";
import { Lawyer } from "@/types";
import { Users, Briefcase, CheckCircle, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const [lawyers] = useState<Lawyer[]>(mockLawyers);

  const stats = {
    totalLawyers: lawyers.length,
    totalCases: mockCases.length,
    activeCases: mockCases.filter(c => c.status === "assigned" || c.status === "accepted").length,
    completedCases: mockCases.filter(c => c.status === "completed").length,
  };

  return (
    <Layout>
      <div className="p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tableau de bord</h1>
          <p className="text-muted-foreground mt-1">Vue d'ensemble de votre gestion juridique</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Avocats enregistrés"
            value={stats.totalLawyers}
            icon={Users}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Affaires totales"
            value={stats.totalCases}
            icon={Briefcase}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Affaires en cours"
            value={stats.activeCases}
            icon={TrendingUp}
          />
          <StatsCard
            title="Affaires terminées"
            value={stats.completedCases}
            icon={CheckCircle}
            trend={{ value: 15, isPositive: true }}
          />
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CaseStatusChart />
            <LawyerPerformanceChart />
          </div>
          <MonthlyTrendsChart />
        </div>
      </div>
    </Layout>
  );
}
