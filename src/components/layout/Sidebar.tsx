import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Briefcase, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import onatLogo from "@/assets/onat-logo.webp";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Avocats", href: "/lawyers", icon: Users },
  { name: "Affaires", href: "/cases", icon: Briefcase },
];

export function Sidebar() {
  const handleLogout = () => {
    // Exemple : supprimer le token et rediriger vers la page de connexion
    localStorage.removeItem("token");
    window.location.href = "/signin";
  };

  return (
    <aside className="w-64 bg-sidebar-background text-sidebar-foreground flex flex-col border-r border-sidebar-border shadow-elegant">
      {/* Logo + titre */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center justify-center gap-3">
          <img 
            src={onatLogo} 
            alt="ONAT Logo" 
            className="h-16 w-auto object-contain"
          />
          <div className="text-left">
            <h1 className="text-lg font-bold text-sidebar-foreground font-serif">ONAT</h1>
            <p className="text-xs text-muted-foreground">Gestion Juridique</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.href === "/"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium",
                isActive
                  ? "bg-primary text-primary-foreground shadow-elegant"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
        
      </nav>

      {/* Profil + Déconnexion */}

      <div className="p-4 border-t border-sidebar-border space-y-3">
        <div className="px-4 py-3 rounded-lg bg-sidebar-accent">
          <p className="text-sm font-medium text-sidebar-foreground">Admin</p>
          <p className="text-xs text-muted-foreground">admin@onat.tn</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-red-500 hover:text-white transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span>Se déconnecter</span>
        </button>
      </div>
    </aside>
  );
}
