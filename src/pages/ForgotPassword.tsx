import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    if (!email) {
      alert("Veuillez entrer votre email");
      return;
    }

    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Erreur lors de l'envoi de la demande");

      alert("Un email de réinitialisation a été envoyé !");
    } catch (error: any) {
      alert(error.message || "Erreur inconnue");
    }
  };

  return (
    
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background Image + Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-red-900/80"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/50 p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-3xl font-bold text-red-700 mb-2">
              Réinitialiser le mot de passe
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
              Entrez votre adresse email pour recevoir un lien de réinitialisation
            </p>
          </div>

          {/* Form */}
          <div className="space-y-5">
            <div className="group">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 ml-1">
                Email
              </label>
              <div className="relative flex items-center border-2 border-slate-200 dark:border-slate-700 rounded-xl p-3.5 transition-all duration-200 focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-500/10 group-hover:border-slate-300 dark:group-hover:border-slate-600 bg-white dark:bg-slate-800/50">
                <Mail className="w-5 h-5 text-slate-400 dark:text-slate-500 mr-3 flex-shrink-0" />
                <input
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Envoyer le lien
            </Button>
          </div>

          {/* Bottom Text */}
          <div className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
            <a href="/login" className="text-red-700 font-semibold hover:text-red-800">
              Retour à la connexion
            </a>
          </div>
        </div>

        <p className="text-center text-sm text-white/70 mt-6">
          © 2025 Ordre National Des Avocats De Tunisie. Tous droits réservés.
        </p>
      </div>
    </div>
  );
}
