import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Lock, User, Scale } from "lucide-react";
import onatLogo from "@/assets/onat-logo.png";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    try {
      const res = await fetch(`/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Identifiants incorrects");

      const data = await res.json();
      alert("Connexion réussie");
      console.log("User logged in:", data);
    } catch (error) {
      alert(error.message || "Erreur lors de la connexion");
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-red-900/80"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/50 p-8 md:p-10">
          {/* Logo */}
         <div className="flex justify-center mb-6">
  <div className="relative">
    
    {/* Logo */}
    <div className="relative p-4 rounded-xl shadow-lg">
      <img 
        src={onatLogo} 
        alt="Logo ONAT" 
        className="w-16 h-16 object-contain" // ajuste la taille selon ton besoin
      />
    </div>
  </div>
</div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-3xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-amber-900 dark:from-white dark:via-amber-100 dark:to-amber-300 bg-clip-text text-transparent mb-2">
              Responsable Distribution
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
              Accès sécurisé à votre espace professionnel
            </p>
          </div>

          {/* Form */}
          <div className="space-y-5">
            <div className="group">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 ml-1">
                Email
              </label>
              <div className="relative flex items-center border-2 border-slate-200 dark:border-slate-700 rounded-xl p-3.5 transition-all duration-200 focus-within:border-amber-500 focus-within:ring-4 focus-within:ring-amber-500/10 group-hover:border-slate-300 dark:group-hover:border-slate-600 bg-white dark:bg-slate-800/50">
                <User className="w-5 h-5 text-slate-400 dark:text-slate-500 mr-3 flex-shrink-0" />
                <input
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 ml-1">
                Mot de passe
              </label>
              <div className="relative flex items-center border-2 border-slate-200 dark:border-slate-700 rounded-xl p-3.5 transition-all duration-200 focus-within:border-amber-500 focus-within:ring-4 focus-within:ring-amber-500/10 group-hover:border-slate-300 dark:group-hover:border-slate-600 bg-white dark:bg-slate-800/50">
                <Lock className="w-5 h-5 text-slate-400 dark:text-slate-500 mr-3 flex-shrink-0" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer group">
                <input type="checkbox" className="mr-2 accent-blue-600" />
                <span className="text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
                  Se souvenir
                </span>
              </label>
              <a 
                href="/forgot-password" 
                className="text-red-700 dark:text-red-500 font-semibold hover:text-red-800 dark:hover:text-red-400 transition-colors"
              >
                Mot de passe oublié?
              </a>
            </div>

            <Button
              onClick={handleLogin}
  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 ..."
            >
              Se connecter
            </Button>
          </div>

         

          {/* Trust Badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-500">
            <Lock className="w-3.5 h-3.5" />
            <span>Connexion sécurisée SSL</span>
          </div>
        </div>

        {/* Bottom Text */}
        <p className="text-center text-sm text-white/70 mt-6">
          © 2025 Ordre National Des Avocats De Tunisie. Tous droits réservés.
        </p>
      </div>
    </div>
  );
}