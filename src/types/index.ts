export interface Lawyer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  region: string;
  address: string;
  registrationDate: string;
  acceptedCases: number;
  rejectedCases: number;
  activeCases: number;
}

export type CaseType = "criminel" | "enquête" | "civil";
export type CaseStatus = "pending" | "assigned" | "accepted" | "rejected" | "completed";

export interface Case {
  id: string;
  caseNumber: string;
  title: string;
  type: CaseType;
  description: string;
  createdAt: string;
  courtDate: string;
  status: CaseStatus;
  assignedLawyerId?: string;
  assignedLawyerName?: string;
  notificationSent?: boolean;
  notificationDate?: string;
}

export interface DashboardStats {
  totalLawyers: number;
  totalCases: number;
  activeCases: number;
  completedCases: number;
}
