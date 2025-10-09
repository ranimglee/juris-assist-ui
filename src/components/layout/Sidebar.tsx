import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Briefcase, Scale } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Avocats", href: "/lawyers", icon: Users },
  { name: "Affaires", href: "/cases", icon: Briefcase },
];

export function Sidebar() {
  return (
    <aside className="w-64 gradient-primary text-sidebar-foreground flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <Scale className="w-6 h-6 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground">LegalFlow</h1>
            <p className="text-xs text-sidebar-foreground/70">Gestion Juridique</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.href === "/"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-md"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn("w-5 h-5", isActive && "text-sidebar-primary")} />
                <span className="font-medium">{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="px-4 py-3 rounded-lg bg-sidebar-accent/30">
          <p className="text-sm font-medium text-sidebar-foreground">Admin</p>
          <p className="text-xs text-sidebar-foreground/70">admin@legalflow.fr</p>
        </div>
      </div>
    </aside>
  );
}
