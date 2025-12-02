import { Bell, User, LogOut, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function Navbar() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profileOpen, setProfileOpen] = useState(false);

 

  return (
    <>
      <header className="h-16 border-b border-border bg-background flex items-center justify-end px-6 gap-4">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full" />
        </Button>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
            <DropdownMenuSeparator />
           <DropdownMenuItem onClick={() => navigate("/change-password")}>
  <KeyRound className="mr-2 h-4 w-4" />
  <span>Changer le mot de passe</span>
</DropdownMenuItem>

            <DropdownMenuSeparator />
          <DropdownMenuItem
  className="text-destructive"
  onClick={() => {
    // Ici tu peux aussi nettoyer le localStorage ou le token si nécessaire
    // localStorage.removeItem("token");
    navigate("/login"); // redirige vers la page login
    toast({ title: "Déconnexion réussie" });
  }}
>
  <LogOut className="mr-2 h-4 w-4" />
  <span>Se déconnecter</span>
</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

    </>
  );
}
