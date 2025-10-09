import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { CaseTable } from "@/components/cases/CaseTable";
import { CaseModal } from "@/components/cases/CaseModal";
import { mockCases, mockLawyers } from "@/lib/mockData";
import { Case, Lawyer } from "@/types";
import { Button } from "@/components/ui/button";
import { Plus, Zap } from "lucide-react";
import { toast } from "sonner";

export default function Cases() {
  const [cases, setCases] = useState<Case[]>(mockCases);
  const [lawyers] = useState<Lawyer[]>(mockLawyers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCase, setEditingCase] = useState<Case | undefined>();

  const getLawyerName = (lawyerId?: string) => {
    if (!lawyerId) return "-";
    const lawyer = lawyers.find(l => l.id === lawyerId);
    return lawyer ? `${lawyer.firstName} ${lawyer.lastName}` : "-";
  };

  const handleAdd = () => {
    setEditingCase(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (caseItem: Case) => {
    setEditingCase(caseItem);
    setIsModalOpen(true);
  };

  const handleSave = (caseData: Omit<Case, "id">) => {
    if (editingCase) {
      setCases(cases.map(c => c.id === editingCase.id ? { ...caseData, id: editingCase.id } : c));
      toast.success("Affaire modifiée avec succès");
    } else {
      const newCase: Case = {
        ...caseData,
        id: String(Date.now()),
      };
      setCases([...cases, newCase]);
      toast.success("Affaire créée avec succès");
    }
  };

  const assignCaseToLawyer = (caseId: string) => {
    // Algorithme d'assignation
    // 1. Filtrer les avocats disponibles
    // 2. Trier par : date d'inscription (récents en premier), puis nombre d'affaires en cours
    // 3. Round-robin par région (tour d'Europe)
    
    const availableLawyers = [...lawyers].sort((a, b) => {
      // Priorité 1: Avocats récents
      const dateCompare = new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime();
      if (dateCompare !== 0) return dateCompare;
      
      // Priorité 2: Moins d'affaires en cours
      return a.activeCases - b.activeCases;
    });

    if (availableLawyers.length === 0) {
      toast.error("Aucun avocat disponible");
      return;
    }

    const selectedLawyer = availableLawyers[0];
    
    setCases(cases.map(c => 
      c.id === caseId 
        ? {
            ...c,
            status: "assigned",
            assignedLawyerId: selectedLawyer.id,
            notificationSent: true,
            notificationDate: new Date().toISOString(),
          }
        : c
    ));

    toast.success(
      `Affaire assignée à ${selectedLawyer.firstName} ${selectedLawyer.lastName}`,
      {
        description: "Une notification par email a été envoyée à l'avocat",
      }
    );
  };

  const assignAllPendingCases = () => {
    const pendingCases = cases.filter(c => c.status === "pending");
    
    if (pendingCases.length === 0) {
      toast.info("Aucune affaire en attente d'assignation");
      return;
    }

    pendingCases.forEach(caseItem => {
      assignCaseToLawyer(caseItem.id);
    });
  };

  return (
    <Layout>
      <div className="p-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestion des affaires</h1>
            <p className="text-muted-foreground mt-1">Créez et assignez des affaires aux avocats</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={assignAllPendingCases} variant="outline" className="border-primary text-primary hover:bg-primary/10">
              <Zap className="h-5 w-5 mr-2" />
              Assigner tout
            </Button>
            <Button onClick={handleAdd} className="gradient-accent">
              <Plus className="h-5 w-5 mr-2" />
              Créer une affaire
            </Button>
          </div>
        </div>

        <div className="bg-card rounded-lg shadow-card p-6">
          <CaseTable
            cases={cases}
            onEdit={handleEdit}
            onAssign={assignCaseToLawyer}
            getLawyerName={getLawyerName}
          />
        </div>

        <CaseModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          caseData={editingCase}
        />
      </div>
    </Layout>
  );
}
