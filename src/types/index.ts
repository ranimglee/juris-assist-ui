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

export type CaseType = "Type1" | "Type2" | "Type3";
export type CaseStatus = "pending" | "assigned" | "accepted" | "rejected" | "completed";

export interface Case {
  id: string;
  title: string;
  type: CaseType;
  description: string;
  createdAt: string;
  status: CaseStatus;
  assignedLawyerId?: string;
  notificationSent?: boolean;
  notificationDate?: string;
}

export interface DashboardStats {
  totalLawyers: number;
  totalCases: number;
  activeCases: number;
  completedCases: number;
}
