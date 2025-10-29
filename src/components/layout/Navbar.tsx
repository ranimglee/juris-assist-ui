import { Link, useLocation } from "react-router-dom";
import { Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import onatLogo from "@/assets/onat-logo.webp";

export function Navbar() {
  const location = useLocation();
  const isAdminRoute = location.pathname.includes('/dashboard') || 
                       location.pathname.includes('/lawyers') || 
                       location.pathname.includes('/cases');

  const navigation = [
    { name: "Accueil", href: "/" },
    { name: "À propos", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-elegant">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={onatLogo} 
              alt="ONAT Logo" 
              className="h-14 w-14 transition-transform duration-300 group-hover:scale-110"
            />
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl text-foreground">ONAT</span>
              <span className="text-xs text-muted-foreground font-arabic">المنظمة الوطنية للمحامين التونسيين</span>
            </div>
          </Link>

          {/* Navigation */}
          {!isAdminRoute && (
            <div className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>
          )}

          {/* Admin Access Button */}
          {!isAdminRoute ? (
            <Link to="/dashboard">
              <Button variant="default" className="shadow-elegant">
                <Scale className="mr-2 h-4 w-4" />
                Espace Admin
              </Button>
            </Link>
          ) : (
            <Link to="/">
              <Button variant="outline">
                Retour au site
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
