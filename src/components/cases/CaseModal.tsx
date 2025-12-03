import { useState, useEffect } from "react";
import { CaseType } from "@/types";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Scale, User, Calendar, Hash, AlertCircle } from "lucide-react";
import { useLanguage } from "@/i18n";

interface CaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    numero: string;
    titre: string;
    type: CaseType;
    nomAccuse: string;
    dateTribunal: string;
  }) => void;
  caseData?: any;
}

const caseTypes: CaseType[] = ["criminel", "enquête", "civil"];

export function CaseModal({ isOpen, onClose, onSave, caseData }: CaseModalProps) {
  const [formData, setFormData] = useState({
    numero: "",
    titre: "",
    type: "criminel" as CaseType,
    nomAccuse: "",
    dateTribunal: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const { t } = useLanguage();

  useEffect(() => {
    if (caseData) {
      setFormData({
        numero: caseData.caseNumber || "",
        titre: caseData.title || "",
        type: caseData.type || "civil",
        nomAccuse: caseData.description || "",
        dateTribunal: caseData.courtDate?.split("T")[0] || ""
      });
    } else {
      setFormData({
        numero: "",
        titre: "",
        type: "civil",
        nomAccuse: "",
        dateTribunal: ""
      });
    }
    setErrors({});
    setTouched({});
  }, [caseData, isOpen]);

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
    setFormData({ ...formData, [field]: value });
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors({ ...errors, [field]: error });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
      return;
    }

    onSave({
      numero: formData.numero,
      titre: formData.titre,
      type: formData.type,
      nomAccuse: formData.nomAccuse,
      dateTribunal: formData.dateTribunal + "T00:00:00"
    });

    onClose();
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
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-semibold">
              <Scale className="w-4 h-4" /> {t("cases.modal.type")}
            </Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value as CaseType })}
            >
              <SelectTrigger className="h-11 focus:ring-blue-500 transition-all">
                <SelectValue placeholder={t("cases.modal.type.placeholder")} />
              </SelectTrigger>
              <SelectContent>
                {caseTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {t(`cases.modal.type.${type}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

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
            <Button type="button" variant="outline" onClick={onClose} className="h-11 px-6">
              {t("cases.modal.cancel")}
            </Button>
            <Button type="submit" className="gradient-accent h-11 px-8 font-semibold">
              {t("cases.modal.save")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
