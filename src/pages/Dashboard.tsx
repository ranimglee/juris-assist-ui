import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Layout } from "@/components/layout/Layout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { LawyerTable } from "@/components/lawyers/LawyerTable";
import { mockLawyers, mockCases } from "@/lib/mockData";
import { Lawyer } from "@/types";
import { Users, Briefcase, CheckCircle, TrendingUp } from "lucide-react";
import { toast } from "sonner";

export default function Dashboard() {
  const [lawyers] = useState<Lawyer[]>(mockLawyers);

  const stats = {
    totalLawyers: lawyers.length,
    totalCases: mockCases.length,
    activeCases: mockCases.filter(c => c.status === "assigned" || c.status === "accepted").length,
    completedCases: mockCases.filter(c => c.status === "completed").length,
  };

  const handleEdit = (lawyer: Lawyer) => {
    toast.info(`Édition de ${lawyer.firstName} ${lawyer.lastName}`);
  };

  const handleDelete = (id: string) => {
    toast.success("Avocat supprimé avec succès");
  };

  return (
    <>
      <Navbar />
      <Layout>
        <div className="p-8 space-y-8 mt-20">
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

          <div className="bg-card rounded-lg shadow-card p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground">Suivi des avocats</h2>
              <p className="text-muted-foreground mt-1">Gérez et suivez l'activité de vos avocats</p>
            </div>
            <LawyerTable
              lawyers={lawyers}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </Layout>
    </>
  );
}
