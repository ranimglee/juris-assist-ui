import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Briefcase, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import onatLogo from "@/assets/onat-logo.png";
import { useLanguage } from "@/i18n";

const navigation = [
  { key: "dashboard", href: "/dashboard", icon: LayoutDashboard },
  { key: "lawyers", href: "/lawyers", icon: Users },
  { key: "cases", href: "/cases", icon: Briefcase },
];

export function Sidebar() {
  const { t } = useLanguage();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [user, setUser] = useState(null);

  // Fetch authenticated user from cookie-based session
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/auth/me`, {
          credentials: "include", 
        });

        if (!res.ok) throw new Error("Failed to fetch user");

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, [API_BASE_URL]);

  const handleLogout = () => {
    fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    }).finally(() => {
      window.location.href = "/";
    });
  };

  return (
    <aside className="w-64 bg-sidebar-background text-sidebar-foreground flex flex-col border-r border-sidebar-border shadow-elegant">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center justify-center gap-3">
          <img src={onatLogo} alt="ONAT Logo" className="h-16 w-auto object-contain" />
          <div className="text-left">
            <h1 className="text-lg font-bold text-sidebar-foreground font-serif">
              ONAT
            </h1>
            <p className="text-xs text-muted-foreground">{t("sidebar.tagline")}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.key}
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
            <item.icon className="w-5 h-5" />
            <span>{t(`sidebar.nav.${item.key}`)}</span>
          </NavLink>
        ))}
      </nav>

      {/* Profile + Logout */}
      <div className="p-4 border-t border-sidebar-border space-y-3">
        <div className="px-4 py-3 rounded-lg bg-sidebar-accent">
          <p className="text-sm font-medium text-sidebar-foreground">{t("sidebar.admin")}</p>

          <p className="text-xs text-muted-foreground">
            {user ? user.email : t("sidebar.loading")}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-red-500 hover:text-white transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span>{t("sidebar.logout")}</span>
        </button>
      </div>
    </aside>
  );
}
