import { Case } from "@/types";

export const getAffairesByAvocatId = async (avocatId: number): Promise<Case[]> => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const res = await fetch(`${baseUrl}/api/affaires/avocat/${avocatId}`);
  if (!res.ok) throw new Error("Erreur lors du chargement des affaires");

  const data = await res.json();

  // 🔥 Mapping backend → frontend
  return data.map((affaire: any): Case => ({
    id: affaire.id,
    caseNumber: affaire.numero,
    title: affaire.titre,
    type: affaire.type,
    sousType:affaire.sousType,
    nomAccuse: affaire.nomAccuse,
    createdAt: affaire.dateCreation,
    courtDate: affaire.dateTribunal,
    status: affaire.statut,
    assignmentMode: affaire.assignmentMode,
  }));
};
