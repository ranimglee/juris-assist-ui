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
import { useLanguage } from "@/i18n";

export function Navbar() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { lang, setLang, t } = useLanguage();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const toggleLang = () => {
    setLang(lang === "fr" ? "ar" : "fr");
  };

  return (
    <header className="h-16 border-b border-border bg-background flex items-center justify-end px-6 gap-4">
      {/* Language Switcher */}
      <Button
        variant="outline"
        size="sm"
        className="font-semibold"
        onClick={toggleLang}
      >
        {lang === "fr" ? "العربية" : "Français"}
      </Button>

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
          <DropdownMenuLabel>{t("navbar.account")}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/change-password")}>
            <KeyRound className="mr-2 h-4 w-4" />
            <span>{t("navbar.changePassword")}</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
         <DropdownMenuItem
  className="text-destructive"
  onClick={async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include", // important to send cookies
      });
      toast({ title: t("navbar.logout.success") });
      navigate("/");
    } catch (error) {
      toast({ title: t("navbar.logout.failed"), variant: "destructive" });
    }
  }}
>
  <LogOut className="mr-2 h-4 w-4" />
  <span>{t("navbar.logout")}</span>
</DropdownMenuItem>

        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
