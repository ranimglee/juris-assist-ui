import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { LawyerTable } from "@/components/lawyers/LawyerTable";
import { LawyerModal } from "@/components/lawyers/LawyerModal";
import { mockLawyers } from "@/lib/mockData";
import { Lawyer } from "@/types";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export default function Lawyers() {
  const [lawyers, setLawyers] = useState<Lawyer[]>(mockLawyers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLawyer, setEditingLawyer] = useState<Lawyer | undefined>();

  const handleAdd = () => {
    setEditingLawyer(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (lawyer: Lawyer) => {
    setEditingLawyer(lawyer);
    setIsModalOpen(true);
  };

  const handleSave = (lawyerData: Omit<Lawyer, "id">) => {
    if (editingLawyer) {
      setLawyers(lawyers.map(l => l.id === editingLawyer.id ? { ...lawyerData, id: editingLawyer.id } : l));
      toast.success("Avocat modifié avec succès");
    } else {
      const newLawyer: Lawyer = {
        ...lawyerData,
        id: String(Date.now()),
      };
      setLawyers([...lawyers, newLawyer]);
      toast.success("Avocat ajouté avec succès");
    }
  };

  const handleDelete = (id: string) => {
    setLawyers(lawyers.filter(l => l.id !== id));
    toast.success("Avocat supprimé avec succès");
  };

  return (
    <Layout>
      <div className="p-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestion des avocats</h1>
            <p className="text-muted-foreground mt-1">Ajoutez, modifiez et gérez vos avocats</p>
          </div>
          <Button onClick={handleAdd} className="gradient-accent">
            <Plus className="h-5 w-5 mr-2" />
            Ajouter un avocat
          </Button>
        </div>

        <div className="bg-card rounded-lg shadow-card p-6">
          <LawyerTable
            lawyers={lawyers}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
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
