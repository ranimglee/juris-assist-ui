import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { LawyerTable } from "@/components/lawyers/LawyerTable";
import { LawyerModal } from "@/components/lawyers/LawyerModal";
import { Lawyer } from "@/types";
import { Button } from "@/components/ui/button";
import { Plus, Users, Scale, Briefcase } from "lucide-react";
import { toast } from "sonner";

import {
  getAllLawyers,
  createLawyer,
  updateLawyer,
  deleteLawyer,
} from "@/lib/api/lawyerApi";

export default function Lawyers() {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLawyer, setEditingLawyer] = useState<Lawyer | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLawyers();
  }, []);

  const loadLawyers = async () => {
    setIsLoading(true);
    try {
      const data = await getAllLawyers();
      setLawyers(data);
    } catch (e) {
      toast.error("Erreur lors du chargement des avocats");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingLawyer(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (lawyer: Lawyer) => {
    setEditingLawyer(lawyer);
    setIsModalOpen(true);
  };

  const handleSave = async (lawyerData: Omit<Lawyer, "id">) => {
    try {
      if (editingLawyer) {
        const updated = await updateLawyer(Number(editingLawyer.id), lawyerData);
        setLawyers(lawyers.map(l => l.id === updated.id ? updated : l));
        toast.success("Avocat modifié avec succès");
      } else {
        const created = await createLawyer(lawyerData);
        setLawyers([...lawyers, created]);
        toast.success("Avocat ajouté avec succès");
      }
      setIsModalOpen(false);
    } catch {
      toast.error("Erreur lors de l'enregistrement");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteLawyer(Number(id));
      setLawyers(lawyers.filter(l => l.id !== id));
      toast.success("Avocat supprimé avec succès");
    } catch {
      toast.error("Erreur lors de la suppression");
    }
  };
const exportPdf = async () => {
  try {
    const res = await fetch("http://localhost:8080/api/lawyers/export/pdf/design");
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "avocats.pdf";
    a.click();

    toast.success("PDF téléchargé !");
  } catch (e) {
    toast.error("Erreur lors du téléchargement du PDF");
  }
};

const exportExcel = async () => {
  try {
    const res = await fetch("http://localhost:8080/api/lawyers/export/excel");
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "avocats.xlsx";
    a.click();

    toast.success("Excel téléchargé !");
  } catch (e) {
    toast.error("Erreur lors du téléchargement du fichier Excel");
  }
};

  return (
    <Layout>
      <div className="p-8 space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br gradient-accent to-indigo-600 rounded-lg">
                <Scale className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
                Gestion des avocats
              </h1>
            </div>
            <p className="text-sm text-muted-foreground pl-14">
              Ajoutez, modifiez et gérez votre équipe d'avocats
            </p>
          </div>
        <div className="flex gap-2">
          <Button 
    onClick={handleAdd} 
    size="lg"
    className="gradient-accent flex items-center justify-center gap-2"
  >
    <Plus className="h-5 w-5" />
    Ajouter un avocat
  </Button>


          
            <Button onClick={exportPdf} variant="outline" size="lg" className="gap-2">
              <Scale className="h-5 w-5" />
              Export PDF
            </Button>
            <Button onClick={exportExcel} variant="outline" size="lg" className="gap-2">
              <Briefcase className="h-5 w-5" />
              Export Excel
            </Button>
          
          </div>
        </div>


        {/* Stats Cards */}
        {!isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Total Avocats</p>
                  <p className="text-3xl font-bold text-slate-900">{lawyers.length}</p>
                  </div>
                <div className="p-3 bg-blue-50 rounded-xl">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Actifs</p>
                 <p className="text-3xl font-bold text-amber-600">4</p>
               </div>
                <div className="p-3 bg-blue-50 rounded-xl">
                  <Briefcase className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Spécialités</p>
                  <p className="text-3xl font-bold text-indigo-600">2</p>
               </div>
                <div className="p-3 bg-blue-50 rounded-xl">
                  <Scale className="w-6 h-6 text-indigo-600"/>
                </div>
              </div>
            </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Spécialités</p>
                   <p className="text-3xl font-bold text-indigo-600">2</p>
               </div>
                <div className="p-3 bg-blue-50 rounded-xl">
                  <Scale className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Card */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
          {isLoading ? (
            <div className="p-12">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="relative w-16 h-16">
                  <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 dark:border-blue-900 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Chargement des données...
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Veuillez patienter un instant
                  </p>
                </div>
              </div>
            </div>
          ) : lawyers.length === 0 ? (
            <div className="p-12">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full blur-xl opacity-20"></div>
                  <div className="relative p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 rounded-full border-2 border-blue-200 dark:border-blue-800">
                    <Users className="h-16 w-16 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>

                <div className="text-center space-y-3 max-w-md">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Aucun avocat enregistré
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Commencez par ajouter votre premier avocat pour gérer votre équipe juridique
                  </p>
                  
                  <Button 
                    onClick={handleAdd}
                    className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Ajouter votre premier avocat
                  </Button>
                </div>
              </div>
            </div>
          ) : (
   <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900">Liste des avocats</h2>
              <p className="text-sm text-slate-600 mt-1">
                {lawyers.length} avocat{lawyers.length !== 1 ? 's' : ''} au total
              </p>
            </div>

            <div className="overflow-x-auto">
              <LawyerTable
                lawyers={lawyers}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
            </div>
          )}
          
        </div>

        <LawyerModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          lawyer={editingLawyer}
        />
      </div>
      
    </Layout>
  );
}