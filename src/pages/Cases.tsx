import { useState, useEffect, useCallback } from "react";
import { Layout } from "@/components/layout/Layout";
import { CaseTable } from "@/components/cases/CaseTable";
import { Case, CaseStatus, CaseType, SousType } from "@/types";
import { CaseModal } from "@/components/cases/CaseModal";
import { Button } from "@/components/ui/button";
import { Plus, Briefcase, Scale, FileText, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/i18n";
import { CaseService } from "@/services/case.service";
import { SaveCaseDTO } from "@/services/case.types";

import { CASE_TYPE_TO_BACKEND, toBackendSousType } from "@/services/case.mapper";
const ACTIVE_STATUSES: CaseStatus[] = ["pending", "assigned", "accepted"];

export default function Cases() {
  const [cases, setCases] = useState<Case[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCase, setEditingCase] = useState<Case | undefined>();
  const { t } = useLanguage();

const loadCases = useCallback(async () => {
  try {
    const data = await CaseService.getAll();
    setCases(data);
  } catch (error) {
    toast.error(t("cases.toast.loadError"));
    console.error(error);
  }
}, [t]);

useEffect(() => {
  loadCases();
}, [loadCases]);

const handleDelete = async (caseId: number) => {
  try {
    await CaseService.remove(caseId);

    setCases((prev) => prev.filter((c) => c.id !== caseId));

    toast.success(t("cases.toast.deleteSuccess"));
  } catch (error: any) {
    toast.error(error.message || t("cases.toast.deleteError"));
    console.error(error);
  }
};


const handleSave = async (caseData: {
  numero: string;
  titre: string;
  type: CaseType;
  sousType?: SousType;
  nomAccuse: string;
  dateTribunal: string;
  assignmentMode: "AUTOMATIC" | "MANUAL";
  assignedLawyerId?: string | null;
}) => {

  const dto: SaveCaseDTO = {
  numero: caseData.numero,
  titre: caseData.titre,
  type: CASE_TYPE_TO_BACKEND[caseData.type],
  sousType: toBackendSousType(caseData.sousType),
  nomAccuse: caseData.nomAccuse,
  dateTribunal: caseData.dateTribunal,
  assignmentMode: caseData.assignmentMode,
  avocatId: caseData.assignmentMode === "MANUAL" ? Number(caseData.assignedLawyerId) : null,
};


  try {
    const savedCase = editingCase
      ? await CaseService.update(editingCase.id, dto)
      : await CaseService.create(dto);

    setCases((prev) =>
      editingCase
        ? prev.map((c) => (c.id === savedCase.id ? savedCase : c))
        : [savedCase, ...prev]
    );

    toast.success(
      editingCase
        ? t("cases.toast.updateSuccess")
        : t("cases.toast.createSuccess")
    );

    setIsModalOpen(false);
    setEditingCase(undefined);
  } catch (error: any) {
    toast.error(error.message || t("cases.toast.saveError"));
    console.error(error);
  }
};

  // Calculate statistics
  const stats = {
    total: cases.length,
    pending: cases.filter(c => c.status === "pending").length,
    assigned: cases.filter(c => c.status === "assigned").length,
    active: cases.filter(c => ACTIVE_STATUSES.includes(c.status)).length,
  };

  return (
    <Layout>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="max-w-7xl mx-auto p-6 sm:p-8 space-y-8">

        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br gradient-accent to-indigo-600 rounded-lg">
                <Scale className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
                {t("cases.title")}
              </h1>
            </div>
            <p className="text-sm text-muted-foreground pl-14">
              {t("cases.subtitle")}
            </p>
          </div>

          <Button
            onClick={() => {
              setEditingCase(undefined);
              setIsModalOpen(true);
            }}
            className="gradient-accent"
          >
            <Plus className="h-5 w-5 mr-2" />
            {t("cases.new")}
          </Button>

        </div>



       

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">
                    {t("cases.stats.total")}
                  </p>
                  <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">
                    {t("cases.stats.pending")}
                  </p>
                  <p className="text-3xl font-bold text-amber-600">{stats.pending}</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-xl">
                  <FileText className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">
                    {t("cases.stats.assigned")}
                  </p>
                  <p className="text-3xl font-bold text-indigo-600">{stats.assigned}</p>
                </div>
                <div className="p-3 bg-indigo-50 rounded-xl">
                  <Scale className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">
                    {t("cases.stats.active")}
                  </p>
                  <p className="text-3xl font-bold text-green-600">{stats.active}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Cases Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-xl font-semibold text-slate-900">
                  {t("cases.list.title")}
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  {t("cases.list.count", {
                    count: cases.length,
                    suffix: cases.length !== 1 ? "s" : "",
                  })}
                </p>
              </div>
            <div className="overflow-x-auto">
              <CaseTable
                cases={cases}
                onEdit={(c) => {
                  setEditingCase(c);
                  setIsModalOpen(true);
                }}
                onAssign={() => {}}
                onDelete={handleDelete}
                getLawyerName={(lawyerId) => {
                  const lawyer = cases.find(c => c.assignedLawyerId === lawyerId);
                  return lawyer?.assignedLawyerName || "-";
                }}
              />
            </div>
          </div>
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