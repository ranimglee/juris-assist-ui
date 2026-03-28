import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Briefcase, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import onatLogo from "@/assets/logo-onan.png";
import { useLanguage } from "@/i18n";

const navigation = [
  { key: "dashboard", href: "/dashboard", icon: LayoutDashboard },
  { key: "lawyers", href: "/lawyers", icon: Users },
  { key: "cases", href: "/cases", icon: Briefcase },
];

export function Sidebar() {
  const { t, lang } = useLanguage();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const isRTL = lang === "ar";

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/auth/me`, { credentials: "include" })
      .then(res => res.ok ? res.json() : null)
      .then(data => setUser(data))
      .catch(console.error);
  }, [API_BASE_URL]);

const handleLogout = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Logout failed");

    // Force reload to reset session state
    window.location.href = "/";
  } catch (error) {
    console.error("Logout error:", error);
    alert(t("navbar.logout.failed")); // fallback
  }
};

  return (
    <aside
      dir={isRTL ? "rtl" : "ltr"}
      className={cn(
        "w-64 bg-sidebar-background text-sidebar-foreground flex flex-col shadow-elegant",
        isRTL
          ? "border-l border-sidebar-border"
          : "border-r border-sidebar-border"
      )}
    >
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div
          className={cn(
            "flex items-center justify-center gap-3",
            isRTL && "flex-row-reverse"
          )}
        >
          <img
            src={onatLogo}
            alt="ONAT Logo"
            className="h-16 w-auto object-contain"
          />
          <div className={cn("text-left", isRTL && "text-right")}>
            <h1 className="text-lg font-bold font-serif">
              {t("sidebar.organizationName")}
            </h1>
            <p className="text-xs text-muted-foreground">
              {t("sidebar.tagline")}
            </p>
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
            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          isRTL && "flex-row-reverse"
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
        <div
          className={cn(
            "px-4 py-3 rounded-lg bg-sidebar-accent",
            isRTL && "text-right"
          )}
        >
          <p className="text-sm font-medium">{t("sidebar.admin")}</p>
          <p className="text-xs text-muted-foreground">
            {user ? user.email : t("sidebar.loading")}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500 hover:text-white transition",
            isRTL && "flex-row-reverse"
          )}
        >
          <LogOut className="w-5 h-5" />
          <span>{t("sidebar.logout")}</span>
        </button>
      </div>
    </aside>
  );
}
