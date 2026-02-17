import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRef, useState } from "react";
import { 
  Download, 
  FileText, 
  Calendar, 
  User, 
  Scale, 
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  PenTool
} from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useLanguage } from "@/i18n";
import { CaseStatus } from "@/types";

interface CaseItem {
  caseNumber: string;
  title: string;
  type: string;
  nomAccuse?: string;
  assignedLawyerName?: string;
  createdAt: string;
  courtDate?: string;
  status: string;
}

interface SignaturePadProps {
  onSign: (dataUrl: string) => void;
}

function SignaturePad({ onSign }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) onSign(canvas.toDataURL());
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    onSign("");
  };

  return (
    <div className="space-y-2">
      <canvas
        ref={canvasRef}
        width={400}
        height={150}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className="border-2 border-dashed border-gray-300 rounded-lg cursor-crosshair bg-white w-full"
        style={{ touchAction: 'none' }}
      />
      <Button variant="outline" size="sm" onClick={clearSignature} className="w-full">
        Effacer la signature
      </Button>
    </div>
  );
}

interface PdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseItem: CaseItem;
}

export default function PdfModal({ isOpen, onClose, caseItem }: PdfModalProps) {
  const pdfRef = useRef<HTMLDivElement>(null);
  const [signature, setSignature] = useState<string | null>(null);



const handleDownload = async () => {
  if (!pdfRef.current) return;

  const element = pdfRef.current;

  // Forcer dimensions visibles
  const originalStyle = {
    height: element.style.height,
    overflow: element.style.overflow,
  };
  element.style.height = "auto";
  element.style.overflow = "visible";

  // Attendre le rendu complet
  await new Promise((r) => setTimeout(r, 100));

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    scrollY: -window.scrollY,
  });

  element.style.height = originalStyle.height;
  element.style.overflow = originalStyle.overflow;

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save(`Affaire_${caseItem.caseNumber}.pdf`);
};

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    EN_ATTENTE: "En attente",
    EN_COURS: "En cours",
    ACCEPTEE: "Acceptée",
    REFUSEE: "Refusée",
    CLOTUREE: "Clôturée",
  };

  return labels[status] || status;
};

const getStatusIcon = (status: string) => {
  const map: Record<string, any> = {
    EN_ATTENTE: AlertCircle,
    EN_COURS: Clock,
    ACCEPTEE: CheckCircle,
    REFUSEE: XCircle,
    CLOTUREE: CheckCircle,
  };

  return map[status] || AlertCircle;
};
  const translateBackendStatus = (statut: string): CaseStatus => {
    switch (statut) {
      case "EN_ATTENTE": return "pending";
      case "ASSIGNEE": return "assigned";
      case "ACCEPTEE": return "accepted";
      case "REFUSEE": return "rejected";
      case "TERMINEE": return "completed";
      default: return "pending";
    }
  };
const getStatusBadgeColor = (status: string) => {
  const map: Record<string, string> = {
    EN_ATTENTE: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    EN_COURS: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    ACCEPTEE: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    REFUSEE: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    CLOTUREE: "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  };

  return map[status] || "bg-gray-100 text-gray-800";
};

const StatusIconComponent = getStatusIcon(caseItem.status);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] overflow-hidden flex flex-col p-0">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4 bg-gradient-to-r from-slate-700 to-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-white">
                Dossier Juridique
              </DialogTitle>
              <p className="text-sm text-slate-200 mt-1">
                Document officiel - Affaire N° {caseItem.caseNumber}
              </p>
            </div>
          </div>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 bg-gray-50 dark:bg-gray-950">
          <div ref={pdfRef} className="max-w-3xl mx-auto space-y-6">
            {/* Document Header Card */}
            <Card className="border-2 border-slate-200 dark:border-slate-800">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center">
                      <FileText className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                        {caseItem.title}
                      </h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-mono">
                        REF: {caseItem.caseNumber}
                      </p>
                    </div>
                  </div>
                 <Badge
  className={`${getStatusBadgeColor(caseItem.status)} flex items-center gap-1.5 px-3 py-1`}
>
  <StatusIconComponent className="w-3.5 h-3.5" />
  {getStatusLabel(caseItem.status)}
</Badge>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-700 my-4" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950 flex items-center justify-center flex-shrink-0">
                      <Scale className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                        Type d'affaire
                      </p>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        {caseItem.type}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-950 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                        Date de création
                      </p>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        {new Date(caseItem.createdAt).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric"
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-950 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                        Date d'audience
                      </p>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        {caseItem.courtDate 
                          ? new Date(caseItem.courtDate).toLocaleDateString("fr-FR", {
                              day: "numeric",
                              month: "long",
                              year: "numeric"
                            })
                          : "Non planifiée"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-50 dark:bg-orange-950 flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                        Statut actuel
                      </p>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        {caseItem.status}
                      </p>
                    </div>
                  </div>
                  {/* Nom de l'accusé */}
<div className="flex items-start gap-3">
  <div className="w-10 h-10 rounded-lg bg-red-50 dark:bg-red-950 flex items-center justify-center flex-shrink-0">
    <User className="w-5 h-5 text-red-600 dark:text-red-400" />
  </div>
  <div>
    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
      Nom de l'accusé
    </p>
    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
      {caseItem.nomAccuse || "Non renseigné"}
    </p>
  </div>
</div>

{/* Nom de l'avocat */}
<div className="flex items-start gap-3">
  <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center flex-shrink-0">
    <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
  </div>
  <div>
    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
      Avocat assigné
    </p>
    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
      {caseItem.assignedLawyerName || "Aucun avocat assigné"}
    </p>
  </div>
</div>

                </div>
              </CardContent>
            </Card>

            {/* Description Card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  Description de l'affaire
                </h3>
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-800">
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {caseItem.title}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Footer Info */}
            <Card className="bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-700">
              <CardContent className="p-4">
                <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                  Ce document est généré automatiquement et constitue un récapitulatif officiel de l'affaire.
                  <br />
                  Généré le {new Date().toLocaleDateString("fr-FR", { 
                    day: "numeric", 
                    month: "long", 
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer Actions */}
       {/* Footer Actions */}
        <div className="px-6 py-4 border-t bg-white dark:bg-slate-900 flex justify-between items-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Document prêt à être téléchargé
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Fermer
            </Button>
            <Button onClick={handleDownload} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Télécharger PDF
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}