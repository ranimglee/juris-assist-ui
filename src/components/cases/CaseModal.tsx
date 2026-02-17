import { useState, useEffect } from "react";
import { AssignmentMode, Case, CaseType, SousType } from "@/types";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Scale, User, Calendar, Hash, AlertCircle } from "lucide-react";
import { useLanguage } from "@/i18n";
import { Loader2 } from "lucide-react";
import { getAllLawyers } from "@/lib/api/lawyerApi";

interface CaseModalProps {
  isOpen: boolean;
  onClose: () => void;
onSave: (data: {
  numero: string;
  titre: string;
  type: CaseType;
  sousType?: SousType | null;
  nomAccuse: string;
  dateTribunal: string;
  assignmentMode: AssignmentMode;
  assignedLawyerId?: string | null;
}) => void;

caseData?: Case;
}



export function CaseModal({ isOpen, onClose, onSave, caseData }: CaseModalProps) {
const [lawyers, setLawyers] = useState<{id: string, nom: string, prenom:string}[]>([]);

  // Frontend lowercase enums
const caseTypes: CaseType[] = ["criminel", "enquete", "enqueteur_preliminaire"];
const [assignmentMode, setassignmentMode] =
  useState<AssignmentMode>("AUTOMATIC");
const [selectedLawyerId, setSelectedLawyerId] = useState<string | null>(null);

const [formData, setFormData] = useState<{
  numero: string;
  titre: string;
  type: CaseType;
  sousType?: SousType; 
  nomAccuse: string;
  dateTribunal: string;
}>({
  numero: "",
  titre: "",
  type: "criminel",
  sousType: undefined, 
  nomAccuse: "",
  dateTribunal: ""
});

const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const { t, lang } = useLanguage();
  const isRTL = lang === "ar";
useEffect(() => {
  const fetchLawyers = async () => {
    console.log("Fetching lawyers..."); // debug
    try {
      const data = await getAllLawyers(); // use your API helper
      console.log("Fetched lawyers:", data);
      setLawyers(data);
    } catch (err) {
      console.error("Error fetching lawyers:", err);
      setLawyers([]);
    }
  };

  if (isOpen && assignmentMode === "MANUAL") {
    fetchLawyers();
  }
}, [isOpen, assignmentMode]);

useEffect(() => {
  console.log("Editing caseData:", caseData); // for debugging

  if (caseData) {
    // Map the sousType from caseData to the correct SelectItem value
  const matchedSousType =
  sousTypeOptions[caseData.type as CaseType]?.find(
    (st) => st.value === caseData.sousType
  )?.value;
    setFormData({
      numero: caseData.caseNumber || "",
      titre: caseData.title || "",
      type: caseData.type || "criminel",
      sousType: matchedSousType, // undefined if no match
      nomAccuse: caseData.nomAccuse || "",
      dateTribunal: caseData.courtDate?.split("T")[0] || "",
    });
  } else {
    setFormData({
      numero: "",
      titre: "",
      type: "criminel",
      sousType: undefined,
      nomAccuse: "",
      dateTribunal: "",
    });
  }

  setErrors({});
  setTouched({});
}, [caseData, isOpen]);

 const sousTypeOptions: Record<
  CaseType,
  { value: SousType; labelKey: string }[]
> = {
  criminel: [
    {
      value: "TRIBUNAL_PREMIERE_INSTANCE_NABEUL",
      labelKey: "cases.sousType.TRIBUNAL_PREMIERE_INSTANCE_NABEUL",
    },
    {
      value: "TRIBUNAL_PREMIERE_INSTANCE_KORBA",
      labelKey: "cases.sousType.TRIBUNAL_PREMIERE_INSTANCE_KORBA",
    },
    {
      value: "COUR_APPEL_NABEUL",
      labelKey: "cases.sousType.COUR_APPEL_NABEUL",
    },
  ],
  enquete: [
    {
      value: "NABEUL",
      labelKey: "cases.sousType.NABEUL",
    },
    {
      value: "ZAGHOUAN",
      labelKey: "cases.sousType.ZAGHOUAN",
    },
    {
      value: "GROMBALIA",
      labelKey: "cases.sousType.GROMBALIA",
    },
  ],
  enqueteur_preliminaire: [],
};


  const validateField = (name: string, value: string) => {
    switch (name) {
      case "numero":
        if (!value) return t("cases.modal.error.numberRequired");
        break;
      case "titre":
        if (!value) return t("cases.modal.error.titleRequired");
        if (value.length < 3) return t("cases.modal.error.min3");
        break;
      case "nomAccuse":
        if (!value) return t("cases.modal.error.accusedRequired");
        if (value.length < 2) return t("cases.modal.error.min2");
        break;
      case "dateTribunal":
        if (!value) return t("cases.modal.error.courtDateRequired");
        break;
    }
    return "";
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    const error = validateField(field, formData[field as keyof typeof formData]);
    setErrors({ ...errors, [field]: error });
  };

const handleChange = (field: string, value: string) => {
  const newFormData = { ...formData, [field]: value };
  setFormData(newFormData);


  if (touched[field]) {
    const error = validateField(field, value);
    setErrors({ ...errors, [field]: error });
  }
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const newErrors: Record<string, string> = {};
  Object.keys(formData).forEach((key) => {
    if (key === "type" || key === "sousType") return;

    const error = validateField(
      key,
      formData[key as keyof typeof formData] as string
    );

    if (error) newErrors[key] = error;
  });

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    setTouched(
      Object.keys(formData).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      )
    );
    return;
  }

const payload = {
  ...formData,
  sousType: formData.type === "enqueteur_preliminaire" ? null : formData.sousType ?? null,
  dateTribunal: formData.dateTribunal + "T00:00:00",
  assignmentMode,          
  assignedLawyerId: assignmentMode === "MANUAL" ? selectedLawyerId : null,
};



  try {
    setIsLoading(true);
    await onSave(payload); 
    onClose();
  } finally {
    setIsLoading(false);
  }
};



  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3 pb-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
              <Scale className="h-6 w-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold">
                {caseData
                  ? t("cases.modal.title.edit")
                  : t("cases.modal.title.create")}
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6 bg-white">
          {/* Numéro */}
          <div className="space-y-2">
            <Label htmlFor="numero" className="flex items-center gap-2 text-sm font-semibold">
              <Hash className="w-4 h-4" /> {t("cases.modal.number")}{" "}
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="numero"
              value={formData.numero}
              onChange={(e) => handleChange("numero", e.target.value)}
              onBlur={() => handleBlur("numero")}
              placeholder={t("cases.modal.number.placeholder")}
              className={`h-11 transition-all ${
                errors.numero && touched.numero
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
            {errors.numero && touched.numero && (
              <div className="flex items-center gap-1 text-xs text-red-600">
                <AlertCircle className="h-3 w-3" /> {errors.numero}
              </div>
            )}
          </div>

          {/* Titre */}
          <div className="space-y-2">
            <Label htmlFor="titre" className="flex items-center gap-2 text-sm font-semibold">
              <FileText className="w-4 h-4" /> {t("cases.modal.title")}{" "}
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="titre"
              value={formData.titre}
              onChange={(e) => handleChange("titre", e.target.value)}
              onBlur={() => handleBlur("titre")}
              placeholder={t("cases.modal.title.placeholder")}
              className={`h-11 transition-all ${
                errors.titre && touched.titre
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
            {errors.titre && touched.titre && (
              <div className="flex items-center gap-1 text-xs text-red-600">
                <AlertCircle className="h-3 w-3" /> {errors.titre}
              </div>
            )}
          </div>
{/* Type */}
<div className={`space-y-2 ${isRTL ? "text-right" : "text-left"}`} dir={isRTL ? "rtl" : "ltr"}>
  <Label className="flex items-center gap-2 text-sm font-semibold">
    <Scale className="w-4 h-4" /> {t("cases.modal.type")}
  </Label>
  <Select
    value={formData.type}
    onValueChange={(value) =>
      setFormData({
        ...formData,
        type: value as CaseType,
        sousType: undefined,
      })
    }
  >
    <SelectTrigger className={`h-11 transition-all ${isRTL ? "text-right" : "text-left"}`}>
      <SelectValue placeholder={t("cases.modal.type.placeholder")} />
    </SelectTrigger>
    <SelectContent dir={isRTL ? "rtl" : "ltr"}>
      {caseTypes.map((type) => (
        <SelectItem key={type} value={type} className={isRTL ? "text-right" : "text-left"}>
          {t(`cases.modal.type.${type}`)}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>

{/* Sous-Type */}
{sousTypeOptions[formData.type]?.length > 0 &&
  formData.type !== "enqueteur_preliminaire" && (
    <div
      className={`space-y-2 ${
        isRTL ? "text-right" : "text-left"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <Label className="flex items-center gap-2 text-sm font-semibold">
        <Scale className="w-4 h-4" />
        {t("cases.modal.sousType")}
      </Label>

      <Select
        value={formData.sousType || ""}
        onValueChange={(value) =>
          setFormData({ ...formData, sousType: value as SousType })
        }
      >
        <SelectTrigger
          className={`h-11 transition-all ${
            isRTL ? "text-right" : "text-left"
          }`}
        >
          <SelectValue
            placeholder={t("cases.modal.sousType.placeholder")}
          />
        </SelectTrigger>

        <SelectContent dir={isRTL ? "rtl" : "ltr"}>
          {sousTypeOptions[formData.type].map((st) => (
            <SelectItem
              key={st.value}
              value={st.value}
              className={isRTL ? "text-right" : "text-left"}
            >
              {t(st.labelKey)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  
)}



          {/* Nom accusé */}
          <div className="space-y-2">
            <Label htmlFor="nomAccuse" className="flex items-center gap-2 text-sm font-semibold">
              <User className="w-4 h-4" /> {t("cases.modal.accused")}{" "}
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="nomAccuse"
              value={formData.nomAccuse}
              onChange={(e) => handleChange("nomAccuse", e.target.value)}
              onBlur={() => handleBlur("nomAccuse")}
              placeholder={t("cases.modal.accused.placeholder")}
              className={`h-11 transition-all ${
                errors.nomAccuse && touched.nomAccuse
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
            {errors.nomAccuse && touched.nomAccuse && (
              <div className="flex items-center gap-1 text-xs text-red-600">
                <AlertCircle className="h-3 w-3" /> {errors.nomAccuse}
              </div>
            )}
          </div>
{/* Assignment Method */}
<div className="space-y-2">
  <Label className="flex items-center gap-2 text-sm font-semibold">
    <User className="w-4 h-4" /> {t("cases.modal.assignment")}
  </Label>

  <div className="flex gap-4">
    {/* AUTOMATIC */}
    <label className="relative flex items-center cursor-pointer gap-2 select-none">
      <input
        type="radio"
        value="AUTOMATIC"
        checked={assignmentMode === "AUTOMATIC"}
        onChange={() => setassignmentMode("AUTOMATIC")}
        className="peer absolute opacity-0 w-0 h-0"
      />
      <span className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-blue-600 peer-checked:bg-blue-600 transition-colors flex-shrink-0"></span>
      <span className="text-sm">
        {t("cases.modal.assignment.automatic")}
      </span>
    </label>

    {/* MANUAL */}
    <label className="relative flex items-center cursor-pointer gap-2 select-none">
      <input
        type="radio"
        value="MANUAL"
        checked={assignmentMode === "MANUAL"}
        onChange={() => setassignmentMode("MANUAL")}
        className="peer absolute opacity-0 w-0 h-0"
      />
      <span className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-blue-600 peer-checked:bg-blue-600 transition-colors flex-shrink-0"></span>
      <span className="text-sm">
        {t("cases.modal.assignment.manual")}
      </span>
    </label>
  </div>
</div>



{/* Lawyer Select */}
<div
  className={`transition-all duration-200 ${
    assignmentMode === "MANUAL" ? "opacity-100" : "opacity-50 pointer-events-none"
  }`}
>
  <Select
    value={selectedLawyerId ?? ""}
    onValueChange={(value) => setSelectedLawyerId(value)}
    disabled={assignmentMode !== "MANUAL"}
  >
    <SelectTrigger className="h-11">
      <SelectValue
        placeholder={`-- ${t("cases.modal.selectLawyerPlaceholder")} --`}
      />
    </SelectTrigger>

    <SelectContent>
      {lawyers.length === 0 ? (
        <SelectItem value="loading" disabled>
          {t("cases.modal.loading")}
        </SelectItem>
      ) : (
        lawyers.map((lawyer) => (
          <SelectItem key={lawyer.id} value={lawyer.id}>
            {lawyer.prenom} {lawyer.nom}
          </SelectItem>
        ))
      )}
    </SelectContent>
  </Select>
</div>








          {/* Date tribunal */}
          <div className="space-y-2">
            <Label htmlFor="dateTribunal" className="flex items-center gap-2 text-sm font-semibold">
              <Calendar className="w-4 h-4" /> {t("cases.modal.courtDate")}{" "}
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="dateTribunal"
              type="date"
              value={formData.dateTribunal}
              onChange={(e) => handleChange("dateTribunal", e.target.value)}
              onBlur={() => handleBlur("dateTribunal")}
              className={`h-11 transition-all ${
                errors.dateTribunal && touched.dateTribunal
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
            {errors.dateTribunal && touched.dateTribunal && (
              <div className="flex items-center gap-1 text-xs text-red-600">
                <AlertCircle className="h-3 w-3" /> {errors.dateTribunal}
              </div>
            )}
          </div>

          <DialogFooter className="gap-3 pt-4">
           <Button
  type="button"
  variant="outline"
  onClick={onClose}
  className="h-11 px-6"
  disabled={isLoading}
>
  {t("cases.modal.cancel")}
</Button>

          <Button
  type="submit"
  className="gradient-accent h-11 px-8 font-semibold"
  disabled={isLoading}
>
  {isLoading && (
    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  )}
  {isLoading
    ? t("cases.modal.saving")
    : t("cases.modal.save")}
</Button>

          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
