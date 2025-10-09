import { useState } from "react";
import { Lawyer } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";

interface LawyerTableProps {
  lawyers: Lawyer[];
  onEdit: (lawyer: Lawyer) => void;
  onDelete: (id: string) => void;
}

type SortField = "lastName" | "registrationDate" | "activeCases" | "region";
type SortOrder = "asc" | "desc";

export function LawyerTable({ lawyers, onEdit, onDelete }: LawyerTableProps) {
  const [sortField, setSortField] = useState<SortField>("lastName");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const filteredAndSortedLawyers = lawyers
    .filter(lawyer => 
      `${lawyer.firstName} ${lawyer.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lawyer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lawyer.region.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const multiplier = sortOrder === "asc" ? 1 : -1;
      
      if (sortField === "registrationDate") {
        return multiplier * (new Date(a.registrationDate).getTime() - new Date(b.registrationDate).getTime());
      }
      
      if (sortField === "activeCases") {
        return multiplier * (a.activeCases - b.activeCases);
      }
      
      return multiplier * a[sortField].localeCompare(b[sortField]);
    });

  return (
    <div className="space-y-4">
      <Input
        placeholder="Rechercher par nom, email ou région..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-md"
      />

      <div className="rounded-lg border bg-card shadow-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>
                <Button variant="ghost" size="sm" onClick={() => handleSort("lastName")} className="font-semibold">
                  Nom Prénom <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>
                <Button variant="ghost" size="sm" onClick={() => handleSort("region")} className="font-semibold">
                  Région <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" size="sm" onClick={() => handleSort("registrationDate")} className="font-semibold">
                  Date d'inscription <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-center">
                <Button variant="ghost" size="sm" onClick={() => handleSort("activeCases")} className="font-semibold">
                  Affaires <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedLawyers.map((lawyer) => (
              <TableRow key={lawyer.id} className="hover:bg-muted/30 transition-colors">
                <TableCell className="font-medium">
                  {lawyer.firstName} {lawyer.lastName}
                </TableCell>
                <TableCell className="text-muted-foreground">{lawyer.email}</TableCell>
                <TableCell className="text-muted-foreground">{lawyer.phone}</TableCell>
                <TableCell>{lawyer.region}</TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(lawyer.registrationDate).toLocaleDateString('fr-FR')}
                </TableCell>
                <TableCell className="text-center">
                  <div className="space-y-1">
                    <div className="text-sm">
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-primary/10 text-primary font-medium">
                        {lawyer.activeCases} en cours
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {lawyer.acceptedCases} acceptées · {lawyer.rejectedCases} refusées
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(lawyer)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(lawyer.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
