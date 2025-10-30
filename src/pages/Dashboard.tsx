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
      <div className="p-8 space-y-8 bg-gradient-to-br from-background to-muted/30 min-h-screen">
        <div className="animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground bg-gradient-primary bg-clip-text text-transparent">
            Tableau de bord
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">Vue d'ensemble de votre gestion juridique</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
          <StatsCard
            title="Avocats enregistrés"
            value={stats.totalLawyers}
            icon={Users}
            trend={{ value: 12, isPositive: true }}
            gradient="gradient-primary"
          />
          <StatsCard
            title="Affaires totales"
            value={stats.totalCases}
            icon={Briefcase}
            trend={{ value: 8, isPositive: true }}
            gradient="gradient-accent"
          />
          <StatsCard
            title="Affaires en cours"
            value={stats.activeCases}
            icon={TrendingUp}
            gradient="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <StatsCard
            title="Affaires terminées"
            value={stats.completedCases}
            icon={CheckCircle}
            trend={{ value: 15, isPositive: true }}
            gradient="gradient-success"
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
