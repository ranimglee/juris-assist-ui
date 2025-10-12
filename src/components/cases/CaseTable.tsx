import { useState } from "react";
import { Case, CaseStatus } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Send, CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

interface CaseTableProps {
  cases: Case[];
  onEdit: (caseItem: Case) => void;
  onAssign: (caseId: string) => void;
  getLawyerName: (lawyerId?: string) => string;
}

const statusConfig: Record<CaseStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: React.ElementType }> = {
  pending: { label: "En attente", variant: "outline", icon: Clock },
  assigned: { label: "Assignée", variant: "secondary", icon: AlertCircle },
  accepted: { label: "Acceptée", variant: "default", icon: CheckCircle },
  rejected: { label: "Refusée", variant: "destructive", icon: XCircle },
  completed: { label: "Terminée", variant: "default", icon: CheckCircle },
};

export function CaseTable({ cases, onEdit, onAssign, getLawyerName }: CaseTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCases = cases.filter(caseItem =>
    caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    caseItem.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <Input
        placeholder="Rechercher par titre ou type..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-md"
      />

      <div className="rounded-lg border bg-card shadow-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">N° Affaire</TableHead>
              <TableHead className="font-semibold">Titre</TableHead>
              <TableHead className="font-semibold">Type</TableHead>
              <TableHead className="font-semibold">Audience</TableHead>
              <TableHead className="font-semibold">Statut</TableHead>
              <TableHead className="font-semibold">Avocat assigné</TableHead>
              <TableHead className="font-semibold">Notification</TableHead>
              <TableHead className="text-right font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCases.map((caseItem) => {
              const status = statusConfig[caseItem.status];
              const StatusIcon = status.icon;
              
              return (
                <TableRow key={caseItem.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-mono text-sm font-semibold">
                    {caseItem.caseNumber}
                  </TableCell>
                  <TableCell className="font-medium max-w-xs">
                    <div>
                      <p className="font-semibold">{caseItem.title}</p>
                      <p className="text-sm text-muted-foreground line-clamp-1">{caseItem.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {caseItem.type.charAt(0).toUpperCase() + caseItem.type.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(caseItem.courtDate).toLocaleDateString('fr-FR')}
                  </TableCell>
                  <TableCell>
                    <Badge variant={status.variant} className="flex items-center gap-1 w-fit">
                      <StatusIcon className="h-3 w-3" />
                      {status.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {caseItem.assignedLawyerName || (caseItem.assignedLawyerId ? getLawyerName(caseItem.assignedLawyerId) : null) ? (
                      <span className="text-sm font-medium">{caseItem.assignedLawyerName || getLawyerName(caseItem.assignedLawyerId)}</span>
                    ) : (
                      <span className="text-sm text-muted-foreground italic">Non assigné</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {caseItem.notificationSent ? (
                      <div className="flex items-center gap-1 text-success">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm">Envoyée</span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(caseItem)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      {caseItem.status === "pending" && (
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => onAssign(caseItem.id)}
                          className="gradient-accent"
                        >
                          <Send className="h-4 w-4 mr-1" />
                          Assigner
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
