import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteLawyerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  lawyerName?: string;
}

export function DeleteLawyerModal({ isOpen, onClose, onConfirm, lawyerName }: DeleteLawyerModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Confirmer la suppression</DialogTitle>
        </DialogHeader>

        <p className="mb-6">
          Voulez-vous vraiment supprimer l'avocat <strong>{lawyerName}</strong> ?
        </p>

        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Supprimer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
