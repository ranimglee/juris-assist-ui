import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Layout } from "@/components/layout/Layout";
import { Lock, Eye, EyeOff, Shield, Check, X, AlertCircle } from "lucide-react";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const passwordValidations = {
    length: newPassword.length >= 8,
    uppercase: /[A-Z]/.test(newPassword),
    lowercase: /[a-z]/.test(newPassword),
    number: /[0-9]/.test(newPassword),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
  };

  const passwordStrength = Object.values(passwordValidations).filter(Boolean).length;

  const getStrengthColor = () => {
    if (passwordStrength <= 2) return "bg-red-500";
    if (passwordStrength <= 3) return "bg-orange-500";
    if (passwordStrength <= 4) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (passwordStrength <= 2) return "Faible";
    if (passwordStrength <= 3) return "Moyen";
    if (passwordStrength <= 4) return "Bon";
    return "Excellent";
  };

  const handleSubmit = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Veuillez remplir tous les champs");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Les nouveaux mots de passe ne correspondent pas");
      return;
    }
    if (passwordStrength < 4) {
      alert("Votre mot de passe n'est pas assez fort");
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Mot de passe changé avec succès !");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      alert("Erreur lors du changement de mot de passe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header Card */}
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 rounded-2xl p-8 mb-6 shadow-xl">
            <div className="flex items-center gap-4 text-white">
              <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
                <Shield className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Sécurité du compte</h1>
                <p className="text-amber-100 mt-1">
                  Modifiez votre mot de passe pour protéger votre compte
                </p>
              </div>
            </div>
          </div>

          {/* Main Form Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            {/* Security Notice */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 m-6 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-blue-900 dark:text-blue-200 mb-1">
                    Conseil de sécurité
                  </p>
                  <p className="text-blue-700 dark:text-blue-300">
                    Utilisez un mot de passe unique que vous n'utilisez pas pour d'autres comptes.
                    Changez votre mot de passe régulièrement pour maintenir la sécurité.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Current Password */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Mot de passe actuel
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Lock className="w-5 h-5 text-slate-400" />
                  </div>
                  <Input
                    type={showCurrent ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Entrez votre mot de passe actuel"
                    className="pl-11 pr-11 h-12 border-2 focus:border-amber-500 dark:bg-slate-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  >
                    {showCurrent ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Nouveau mot de passe
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Lock className="w-5 h-5 text-slate-400" />
                  </div>
                  <Input
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Entrez votre nouveau mot de passe"
                    className="pl-11 pr-11 h-12 border-2 focus:border-amber-500 dark:bg-slate-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  >
                    {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {newPassword && (
                  <div className="space-y-3 mt-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400 font-medium">
                        Force du mot de passe:
                      </span>
                      <span
                        className={`font-bold ${
                          passwordStrength <= 2
                            ? "text-red-600"
                            : passwordStrength <= 3
                            ? "text-orange-600"
                            : passwordStrength <= 4
                            ? "text-yellow-600"
                            : "text-green-600"
                        }`}
                      >
                        {getStrengthText()}
                      </span>
                    </div>
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                            level <= passwordStrength
                              ? getStrengthColor()
                              : "bg-slate-200 dark:bg-slate-700"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Validation Checklist */}
                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 space-y-2">
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-3">
                        Votre mot de passe doit contenir:
                      </p>
                      {[
                        { key: "length", label: "Au moins 8 caractères" },
                        { key: "uppercase", label: "Une lettre majuscule" },
                        { key: "lowercase", label: "Une lettre minuscule" },
                        { key: "number", label: "Un chiffre" },
                        { key: "special", label: "Un caractère spécial (!@#$%...)" },
                      ].map(({ key, label }) => (
                        <div key={key} className="flex items-center gap-2 text-sm">
                          {passwordValidations[key] ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <X className="w-4 h-4 text-slate-400" />
                          )}
                          <span
                            className={
                              passwordValidations[key]
                                ? "text-green-700 dark:text-green-400"
                                : "text-slate-600 dark:text-slate-400"
                            }
                          >
                            {label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Confirmer le nouveau mot de passe
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Lock className="w-5 h-5 text-slate-400" />
                  </div>
                  <Input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirmez votre nouveau mot de passe"
                    className="pl-11 pr-11 h-12 border-2 focus:border-amber-500 dark:bg-slate-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  >
                    {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {confirmPassword && newPassword !== confirmPassword && (
                  <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1.5 mt-1">
                    <X className="w-4 h-4" />
                    Les mots de passe ne correspondent pas
                  </p>
                )}
                {confirmPassword && newPassword === confirmPassword && (
                  <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1.5 mt-1">
                    <Check className="w-4 h-4" />
                    Les mots de passe correspondent
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSubmit}
                  disabled={
                    loading ||
                    !currentPassword ||
                    !newPassword ||
                    !confirmPassword ||
                    newPassword !== confirmPassword ||
                    passwordStrength < 4
                  }
                  className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Chargement...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Changer le mot de passe
                    </span>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                  }}
                  className="px-8 py-6 rounded-xl border-2 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Annuler
                </Button>
              </div>
            </div>
          </div>

          {/* Additional Security Tips */}
          <div className="mt-6 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-600" />
              Conseils de sécurité supplémentaires
            </h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>N'utilisez jamais le même mot de passe pour plusieurs comptes</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Activez l'authentification à deux facteurs pour une sécurité accrue</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Changez votre mot de passe tous les 3 à 6 mois</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Utilisez un gestionnaire de mots de passe pour les stocker en toute sécurité</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
