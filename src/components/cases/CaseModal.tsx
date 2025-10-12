import { useState, useEffect } from "react";
import { Case, CaseType } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (caseData: Omit<Case, "id">) => void;
  caseData?: Case;
}

const caseTypes: CaseType[] = ["criminel", "enquête", "civil"];

export function CaseModal({ isOpen, onClose, onSave, caseData }: CaseModalProps) {
  const [formData, setFormData] = useState({
    caseNumber: "",
    title: "",
    type: "criminel" as CaseType,
    description: "",
    courtDate: "",
  });

  useEffect(() => {
    if (caseData) {
      setFormData({
        caseNumber: caseData.caseNumber,
        title: caseData.title,
        type: caseData.type,
        description: caseData.description,
        courtDate: caseData.courtDate,
      });
    } else {
      setFormData({
        caseNumber: "",
        title: "",
        type: "criminel",
        description: "",
        courtDate: "",
      });
    }
  }, [caseData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      caseNumber: formData.caseNumber || `AFF-${Date.now()}`,
      createdAt: caseData?.createdAt || new Date().toISOString().split('T')[0],
      status: caseData?.status || "pending",
      assignedLawyerId: caseData?.assignedLawyerId,
      assignedLawyerName: caseData?.assignedLawyerName,
      notificationSent: caseData?.notificationSent,
      notificationDate: caseData?.notificationDate,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {caseData ? "Modifier l'affaire" : "Créer une affaire"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="caseNumber">Numéro d'affaire</Label>
              <Input
                id="caseNumber"
                value={formData.caseNumber}
                onChange={(e) => setFormData({ ...formData, caseNumber: e.target.value })}
                placeholder="Généré automatiquement"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value as CaseType })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {caseTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Titre *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder="Ex: Litige commercial - Contrat non respecté"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="courtDate">Audience au tribunal *</Label>
            <Input
              id="courtDate"
              type="date"
              value={formData.courtDate}
              onChange={(e) => setFormData({ ...formData, courtDate: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={4}
              placeholder="Décrivez l'affaire en détails..."
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" className="gradient-accent">
              {caseData ? "Modifier" : "Créer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
