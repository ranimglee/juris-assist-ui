import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Home, Briefcase, Calendar, FileText } from "lucide-react";
import { Case, Lawyer } from "@/types";
import { getAffairesByAvocatId } from "@/services/affaireService";

interface LawyerDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lawyer: Lawyer | null;
}

export default function LawyerDetailsModal({ isOpen, onClose, lawyer }: LawyerDetailsModalProps) {
  const [affaires, setAffaires] = useState<Case[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (lawyer && isOpen) {
      setIsLoading(true);
      setError(null);
      getAffairesByAvocatId(Number(lawyer.id))
        .then(setAffaires)
        .catch((err) => setError(err.message))
        .finally(() => setIsLoading(false));
    }
  }, [lawyer, isOpen]);

  if (!lawyer) return null;

  const getStatusColor = (status: string) => {
    const statusMap: Record<string, string> = {
      "En cours": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      "Planifié": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      "Terminé": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      "Suspendu": "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    };
    return statusMap[status] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl font-bold">
              {lawyer.prenom[0]}{lawyer.nom[0]}
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-white">
                {lawyer.prenom} {lawyer.nom}
              </DialogTitle>
              <p className="text-blue-100 text-sm mt-1">Avocat</p>
            </div>
          </div>
        </DialogHeader>

        <div className="overflow-y-auto px-6 py-4 space-y-6 flex-1">
          {/* Contact Information Cards */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" />
              Informations de contact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Email</p>
                    <p className="text-sm font-medium truncate">{lawyer.email}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-950 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Téléphone</p>
                    <p className="text-sm font-medium">{lawyer.telephone}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-950 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Région</p>
                    <p className="text-sm font-medium">{lawyer.region}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-950 flex items-center justify-center">
                    <Home className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Adresse</p>
                    <p className="text-sm font-medium">{lawyer.adresse}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Cases Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Affaires assignées
              </h3>
              {!isLoading && affaires.length > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {affaires.length} affaire{affaires.length > 1 ? "s" : ""}
                </Badge>
              )}
            </div>

            {isLoading ? (
              <Card>
                <CardContent className="p-8">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm text-gray-500">Chargement des affaires...</p>
                  </div>
                </CardContent>
              </Card>
            ) : error ? (
              <Card>
                <CardContent className="p-8 text-center text-red-600">
                  Erreur: {error}
                </CardContent>
              </Card>
            ) : affaires.length === 0 ? (
              <Card>
                <CardContent className="p-8">
                  <div className="text-center text-gray-500">
                    <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>Aucune affaire assignée</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {affaires.map((a) => (
                  <Card key={a.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-mono text-xs text-gray-500 dark:text-gray-400 mb-1">{a.caseNumber}</p>
                              <h4 className="font-semibold text-base">{a.title}</h4>
                            </div>
                            <Badge className={getStatusColor(a.status)} variant="secondary">
                              {a.status}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4" />
                              <span>Créé le {new Date(a.createdAt).toLocaleDateString("fr-FR")}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4 text-blue-600" />
                              <span className="font-medium">Audience: {new Date(a.courtDate).toLocaleDateString("fr-FR")}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t bg-gray-50 dark:bg-gray-900">
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
