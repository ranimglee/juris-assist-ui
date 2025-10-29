import { Scale } from "lucide-react";
import onatLogo from "@/assets/onat-logo.webp";

export function Footer() {
  return (
    <footer className="bg-accent text-accent-foreground py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo and Name */}
          <div className="flex items-center gap-3">
            <img 
              src={onatLogo} 
              alt="ONAT Logo" 
              className="h-12 w-12"
            />
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg">ONAT</span>
              <span className="text-xs font-arabic opacity-80">المنظمة الوطنية للمحامين التونسيين</span>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <div className="h-0.5 w-8 bg-primary"></div>
            <Scale className="h-4 w-4 text-primary" />
            <div className="h-0.5 w-8 bg-primary"></div>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-sm opacity-80">
              © {new Date().getFullYear()} ONAT. Tous droits réservés.
            </p>
            <p className="text-xs font-arabic opacity-70 mt-1">
              جميع الحقوق محفوظة
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
