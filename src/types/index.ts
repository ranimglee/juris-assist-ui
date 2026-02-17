export interface Lawyer {
  id: number;
  prenom: string;
  identifiant:string;
  nom: string;
  email: string;
  telephone: string;
  region: string;
  adresse: string;
  dateInscription: string | null;
  affairesAcceptees?: number;
  affairesRefusees?: number;
  affairesEnCours?: number;
  lastAssignedAt?: string | null;
}

export type SousType =
  | "TRIBUNAL_PREMIERE_INSTANCE_NABEUL"
  | "TRIBUNAL_PREMIERE_INSTANCE_KORBA"
  | "COUR_APPEL_NABEUL"
  | "NABEUL"
  | "ZAGHOUAN"
  | "GROMBALIA";

export type CaseType = "criminel" | "enquete" | "enqueteur_preliminaire";

export type CaseStatus = "pending" | "assigned" | "accepted" | "rejected" | "completed";

export type Case = {
  id: number;
  caseNumber: string;
  title: string;
  type: CaseType;
  sousType?:SousType;
  nomAccuse: string; // nomAccuse
  createdAt: string;
  courtDate: string;
  status: CaseStatus;
  assignedLawyerId?: string;
  assignedLawyerName?: string; // on peut récupérer le nom depuis API avocat
  notificationSent?: string
};


export interface DashboardStats {
  totalLawyers: number;
  totalCases: number;
  activeCases: number;
  completedCases: number;
}
export type AffaireFormData = {
  numero: string;
  titre: string;
  type: CaseType;
  sousType?: SousType;
  nomAccuse: string;
  dateTribunal: string;
};
export type AssignmentMode = "AUTOMATIC" | "MANUAL";
