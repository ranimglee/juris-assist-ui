import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type Language = "fr" | "ar";

type Translations = Record<Language, Record<string, string>>;

const translations: Translations = {
  fr: {
    "lang.fr": "Français",
    "lang.ar": "العربية",
    
   
    // Navbar
    "navbar.account": "Mon Compte",
    "navbar.changePassword": "Changer le mot de passe",
    "navbar.logout": "Se déconnecter",
    "navbar.logout.success": "Déconnexion réussie",

    // Login
    "login.title": "Responsable Distribution",
    "login.subtitle": "Accès sécurisé à votre espace professionnel",
    "login.email": "Email",
    "login.email.placeholder": "votre@email.com",
    "login.password": "Mot de passe",
    "login.password.placeholder": "••••••••",
    "login.remember": "Se souvenir",
    "login.forgot": "Mot de passe oublié ?",
    "login.submit": "Se connecter",
    "login.footer": "© 2025 Ordre National Des Avocats De Tunisie. Tous droits réservés.",
    "login.ssl": "Connexion sécurisée SSL",
    "login.fillAll": "Veuillez remplir tous les champs",
    "login.invalid": "Identifiants incorrects",
    "login.success": "Connexion réussie",
    "login.error": "Erreur lors de la connexion",

    // Home / Index
    "home.hero.title": "Ordre National des Avocats de Tunisie",
    "home.hero.subtitle": "Au service de la justice, de l'équité et de l'État de droit",
    "home.hero.admin": "Espace Administrateur",
    "home.hero.more": "En savoir plus",

    "home.mission.title": "Notre Mission",
    "home.mission.text":
      "L'Ordre National des Avocats de Tunisie est l'instance représentative de la profession d'avocat, garante de l'éthique, de l'indépendance et de l'excellence dans l'exercice du droit.",
    "home.mission.card1.title": "Justice et Équité",
    "home.mission.card1.text":
      "Défendre les droits fondamentaux et garantir l'accès à une justice équitable pour tous les citoyens.",
    "home.mission.card2.title": "Excellence Professionnelle",
    "home.mission.card2.text":
      "Promouvoir la formation continue et l'excellence dans l'exercice de la profession d'avocat.",
    "home.mission.card3.title": "État de Droit",
    "home.mission.card3.text":
      "Contribuer au renforcement de l'État de droit et au respect des principes démocratiques.",

    "home.services.title": "Services en Ligne",
    "home.services.subtitle": "Accédez à nos services numériques pour une gestion moderne et efficace",
    "home.services.lawyers.title": "Annuaire des Avocats",
    "home.services.lawyers.text":
      "Consultez la liste complète des avocats inscrits et leurs spécialités",
    "home.services.cases.title": "Gestion des Affaires",
    "home.services.cases.text": "Système de gestion et d'assignation des affaires juridiques",

    "home.contact.title": "Nous Contacter",
    "home.contact.subtitle": "L'Ordre National des Avocats de Tunisie est à votre écoute",
    "home.contact.phone": "Téléphone",
    "home.contact.email": "Email",
    "home.contact.address": "Adresse",

    "home.footer.about":
      "Ordre National des Avocats de Tunisie - Au service de la justice depuis toujours",
    "home.footer.links": "Liens Utiles",
    "home.footer.aboutLink": "À propos",
    "home.footer.news": "Actualités",
    "home.footer.publications": "Publications",
    "home.footer.contact": "Contact",
    "home.footer.legal": "Mentions Légales",
    "home.footer.terms": "Conditions d'utilisation",
    "home.footer.privacy": "Politique de confidentialité",
    "home.footer.mentions": "Mentions légales",
    "home.footer.copyright":
      "© 2025 Ordre National Des Avocats De Tunisie. Tous droits réservés.",

    // Sidebar / Layout
    "sidebar.tagline": "Gestion Juridique",
    "sidebar.nav.dashboard": "Dashboard",
    "sidebar.nav.lawyers": "Avocats",
    "sidebar.nav.cases": "Affaires",
    "sidebar.admin": "Admin",
    "sidebar.admin.email": "admin@onat.tn",
    "sidebar.logout": "Se déconnecter",

    // Dashboard
    "dashboard.title": "Tableau de bord",
    "dashboard.subtitle": "Vue d'ensemble de votre gestion juridique",
    "dashboard.stats.lawyers": "Avocats enregistrés",
    "dashboard.stats.casesTotal": "Affaires totales",
    "dashboard.stats.casesActive": "Affaires en cours",
    "dashboard.stats.casesCompleted": "Affaires terminées",

    // Lawyers page
    "lawyers.title": "Gestion des avocats",
    "lawyers.subtitle": "Ajoutez, modifiez et gérez votre équipe d'avocats",
    "lawyers.add": "Ajouter un avocat",
    "lawyers.exportPdf": "Export PDF",
    "lawyers.exportExcel": "Export Excel",
    "lawyers.stats.total": "Total Avocats",
    "lawyers.stats.active": "Actifs",
    "lawyers.stats.specialties": "Spécialités",
    "lawyers.loading.title": "Chargement des données...",
    "lawyers.loading.subtitle": "Veuillez patienter un instant",
    "lawyers.empty.title": "Aucun avocat enregistré",
    "lawyers.empty.subtitle":
      "Commencez par ajouter votre premier avocat pour gérer votre équipe juridique",
    "lawyers.empty.button": "Ajouter votre premier avocat",
    "lawyers.list.title": "Liste des avocats",
    "lawyers.list.count": "{count} avocat{suffix} au total",
    "lawyers.toast.loadError": "Erreur lors du chargement des avocats",
    "lawyers.toast.saveError": "Erreur lors de l'enregistrement",
    "lawyers.toast.saveCreate": "Avocat ajouté avec succès",
    "lawyers.toast.saveUpdate": "Avocat modifié avec succès",
    "lawyers.toast.deleteSuccess": "Avocat supprimé avec succès",
    "lawyers.toast.deleteError": "Erreur lors de la suppression",
    "lawyers.toast.exportPdfSuccess": "PDF téléchargé !",
    "lawyers.toast.exportPdfError":
      "Erreur lors du téléchargement du PDF",
    "lawyers.toast.exportExcelSuccess": "Excel téléchargé !",
    "lawyers.toast.exportExcelError":
      "Erreur lors du téléchargement du fichier Excel",

    // Lawyers table
    "lawyers.table.searchPlaceholder":
      "Rechercher par nom, email ou région...",
    "lawyers.table.results": "{count} résultat{suffix}",
    "lawyers.table.empty.title": "Aucun avocat enregistré",
    "lawyers.table.empty.subtitle":
      "Commencez par créer votre premier avocat pour le voir apparaître ici.",
    "lawyers.table.emptyFiltered.title": "Aucun résultat trouvé",
    "lawyers.table.emptyFiltered.subtitle":
      "Essayez d'ajuster vos filtres de recherche pour trouver ce que vous cherchez.",
    "lawyers.table.resetFilters": "Réinitialiser les filtres",
    "lawyers.table.columns.name": "Nom & Prénom",
    "lawyers.table.columns.identifiant": "Identifiant",

    
    "lawyers.table.columns.contact": "Contact",
    "lawyers.table.columns.region": "Région",
    "lawyers.table.columns.registration": "Inscription",
    "lawyers.table.columns.cases": "Affaires",
    "lawyers.table.columns.performance": "Performance",
    "lawyers.table.columns.actions": "Actions",

    // Lawyers modal
    "lawyers.modal.title.edit": "Modifier l'avocat",
    "lawyers.modal.title.create": "Ajouter un avocat",
    "lawyers.modal.subtitle.edit":
      "Mettez à jour les informations de l'avocat",
    "lawyers.modal.subtitle.create":
      "Remplissez les informations du nouvel avocat",
    "lawyers.modal.section.personal": "Informations personnelles",
    "lawyers.modal.section.contact": "Informations de contact",
    "lawyers.modal.section.location": "Localisation",
    "lawyers.modal.firstName": "Prénom",
    "lawyers.modal.identifiant": "Identifiant",
    "lawyers.modal.identifiant.placeholder": "Ex:00000",
    "lawyers.modal.firstName.placeholder": "Ex: Jean",
    "lawyers.modal.lastName": "Nom",
    "lawyers.modal.lastName.placeholder": "Ex: Dupont",
    "lawyers.modal.email": "Email",
    "lawyers.modal.email.placeholder": "exemple@email.com",
    "lawyers.modal.phone": "Téléphone",
    "lawyers.modal.phone.placeholder": "+216 12 345 678",
    "lawyers.modal.region": "Région",
    "lawyers.modal.region.placeholder": "Ex: Tunis",
    "lawyers.modal.address": "Adresse complète",
    "lawyers.modal.address.placeholder":
      "Ex: 123 Avenue Habib Bourguiba, Tunis",
    "lawyers.modal.registrationDate": "Date d'inscription",
    "lawyers.modal.registrationDate.help":
      "Date à laquelle l'avocat a rejoint le cabinet",
    "lawyers.modal.cancel": "Annuler",
    "lawyers.modal.save": "Enregistrer",
    "lawyers.modal.error.email": "Email invalide",
    "lawyers.modal.error.phone": "Numéro de téléphone invalide",
    "lawyers.modal.error.minChars": "Minimum 2 caractères",

    // Cases page
    "cases.title": "Gestion des affaires",
    "cases.subtitle":
      "Créez et gérez les affaires judiciaires en toute simplicité",
    "cases.new": "Nouvelle affaire",
    "cases.stats.total": "Total des affaires",
    "cases.stats.pending": "En attente",
    "cases.stats.assigned": "Assignées",
    "cases.stats.active": "Actives",
    "cases.list.title": "Liste des affaires",
    "cases.list.count": "{count} affaire{suffix} au total",
    "cases.toast.loadError": "Erreur de chargement des affaires",
    "cases.toast.deleteSuccess": "Affaire supprimée",
    "cases.toast.deleteError": "Erreur lors de la suppression",
    "cases.toast.updateError": "Erreur lors de la modification",
    "cases.toast.updateSuccess": "Affaire modifiée",
    "cases.toast.createError": "Erreur lors de la création",
    "cases.toast.createSuccess": "Affaire créée",
    "cases.toast.saveError": "Erreur lors de l'enregistrement",

    // Cases table
    "cases.table.searchPlaceholder":
      "Rechercher par numéro, titre, type ou avocat...",
    "cases.table.status.all": "Tous les statuts",
    "cases.table.loading": "Chargement...",
    "cases.table.results": "{count} résultat{suffix}",
    "cases.table.empty.title": "Aucune affaire enregistrée",
    "cases.table.empty.subtitle":
      "Commencez par créer votre première affaire pour la voir apparaître ici.",
    "cases.table.emptyFiltered.title": "Aucun résultat trouvé",
    "cases.table.emptyFiltered.subtitle":
      "Essayez d'ajuster vos filtres de recherche pour trouver ce que vous cherchez.",
    "cases.table.resetFilters": "Réinitialiser les filtres",
    "cases.table.columns.number": "N° Affaire",
    "cases.table.columns.title": "Titre",
    "cases.table.columns.type": "Type",
    "cases.table.columns.courtDate": "Audience",
    "cases.table.columns.status": "Statut",
    "cases.table.columns.lawyer": "Avocat assigné",
    "cases.table.columns.actions": "Actions",
    "cases.table.unassigned": "Non assigné",

    // Cases status labels
    "cases.status.pending": "En attente",
    "cases.status.assigned": "Assignée",
    "cases.status.accepted": "Acceptée",
    "cases.status.rejected": "Refusée",
    "cases.status.completed": "Terminée",

    // Cases modal
    "cases.modal.title.edit": "Modifier l'affaire",
    "cases.modal.title.create": "Créer une nouvelle affaire",
    "cases.modal.number": "Numéro",
    "cases.modal.number.placeholder": "Ex: AFF-2024-001",
    "cases.modal.title": "Titre",
    "cases.modal.title.placeholder": "Ex: Affaire de fraude fiscale",
    "cases.modal.type": "Type d'affaire",
    "cases.modal.type.placeholder": "Sélectionnez un type",
    "cases.modal.type.criminel": "Criminel",
    "cases.modal.type.enquête": "Enquête",
    "cases.modal.type.civil": "Civil",
    "cases.modal.accused": "Nom de l'accusé",
    "cases.modal.accused.placeholder": "Ex: Jean Dupont",
    "cases.modal.courtDate": "Date du tribunal",
    "cases.modal.cancel": "Annuler",
    "cases.modal.save": "Enregistrer",
    "cases.modal.error.numberRequired": "Numéro obligatoire",
    "cases.modal.error.titleRequired": "Titre obligatoire",
    "cases.modal.error.min3": "Minimum 3 caractères",
    "cases.modal.error.accusedRequired":
      "Nom de l'accusé obligatoire",
    "cases.modal.error.min2": "Minimum 2 caractères",
    "cases.modal.error.courtDateRequired":
      "Date du tribunal obligatoire",

    // Forgot password
    "forgot.title": "Réinitialiser le mot de passe",
    "forgot.subtitle":
      "Entrez votre adresse email pour recevoir un lien de réinitialisation",
    "forgot.emailLabel": "Email",
    "forgot.emailPlaceholder": "votre@email.com",
    "forgot.submit": "Envoyer le lien",
    "forgot.backToLogin": "Retour à la page de connexion",
    "forgot.footer":
      "© 2025 Ordre National Des Avocats De Tunisie. Tous droits réservés.",
    "forgot.error.empty": "Veuillez entrer votre email",
    "forgot.error.request": "Erreur lors de l'envoi de la demande",
    "forgot.success": "Un email de réinitialisation a été envoyé !",
    "forgot.error.unknown": "Erreur inconnue",

    // Change password
    "password.header.title": "Sécurité du compte",
    "password.header.subtitle":
      "Modifiez votre mot de passe pour protéger votre compte",
    "password.notice.title": "Conseil de sécurité",
    "password.notice.text":
      "Utilisez un mot de passe unique que vous n'utilisez pas pour d'autres comptes. Changez votre mot de passe régulièrement pour maintenir la sécurité.",
    "password.current": "Mot de passe actuel",
    "password.current.placeholder": "Entrez votre mot de passe actuel",
    "password.new": "Nouveau mot de passe",
    "password.new.placeholder": "Entrez votre nouveau mot de passe",
    "password.strength.label": "Force du mot de passe:",
    "password.strength.weak": "Faible",
    "password.strength.medium": "Moyen",
    "password.strength.good": "Bon",
    "password.strength.excellent": "Excellent",
    "password.requirements.title": "Votre mot de passe doit contenir:",
    "password.requirements.length": "Au moins 8 caractères",
    "password.requirements.uppercase": "Une lettre majuscule",
    "password.requirements.lowercase": "Une lettre minuscule",
    "password.requirements.number": "Un chiffre",
    "password.requirements.special":
      "Un caractère spécial (!@#$%...)",
    "password.confirm": "Confirmer le nouveau mot de passe",
    "password.confirm.placeholder":
      "Confirmez votre nouveau mot de passe",
    "password.confirm.mismatch": "Les mots de passe ne correspondent pas",
    "password.confirm.match": "Les mots de passe correspondent",
    "password.submit.loading": "Chargement...",
    "password.submit.label": "Changer le mot de passe",
    "password.cancel": "Annuler",
    "password.error.empty": "Veuillez remplir tous les champs",
    "password.error.mismatch":
      "Les nouveaux mots de passe ne correspondent pas",
    "password.error.weak":
      "Votre mot de passe n'est pas assez fort",
    "password.success": "Mot de passe changé avec succès !",
    "password.error.generic":
      "Erreur lors du changement de mot de passe",
    "password.tips.title": "Conseils de sécurité supplémentaires",
    "password.tips.1":
      "N'utilisez jamais le même mot de passe pour plusieurs comptes",
    "password.tips.2":
      "Activez l'authentification à deux facteurs pour une sécurité accrue",
    "password.tips.3":
      "Changez votre mot de passe tous les 3 à 6 mois",
    "password.tips.4":
      "Utilisez un gestionnaire de mots de passe pour les stocker en toute sécurité",

    // Not found
    "notfound.title": "404",
    "notfound.message": "Oups ! Page introuvable",
    "notfound.back": "Retour à l'accueil",
      "reset.title": "Réinitialiser le mot de passe",
  "reset.subtitle": "Entrez un nouveau mot de passe pour votre compte",
  "reset.newPassword": "Nouveau mot de passe",
  "reset.newPasswordPlaceholder": "Entrez votre nouveau mot de passe",
  "reset.confirmPassword": "Confirmer le mot de passe",
  "reset.confirmPasswordPlaceholder": "Confirmez votre mot de passe",
  "reset.submit": "Réinitialiser le mot de passe",
  "reset.backToLogin": "Retour à la connexion",
  "reset.footer": "© 2025 Ordre National Des Avocats De Tunisie. Tous droits réservés.",

  "reset.successTitle": "Succès",
  "reset.success": "Votre mot de passe a été réinitialisé avec succès.",

  "reset.error.title": "Erreur",
  "reset.error.empty": "Veuillez remplir tous les champs.",
  "reset.error.mismatch": "Les mots de passe ne correspondent pas.",
  "reset.error.request": "Impossible de réinitialiser le mot de passe.",
  "reset.error.unknown": "Une erreur inconnue est survenue.",
  },
  ar: {
    "lang.fr": "Français",
    "lang.ar": "العربية",

    // Navbar
    "navbar.account": "حسابي",
    "navbar.changePassword": "تغيير كلمة المرور",
    "navbar.logout": "تسجيل الخروج",
    "navbar.logout.success": "تم تسجيل الخروج بنجاح",

    // Login
    "login.title": "مسؤول التوزيع",
    "login.subtitle": "ولوج آمن إلى فضائكم المهني",
    "login.email": "البريد الإلكتروني",
    "login.email.placeholder": "your@email.com",
    "login.password": "كلمة المرور",
    "login.password.placeholder": "••••••••",
    "login.remember": "تذكّرني",
    "login.forgot": "هل نسيت كلمة المرور؟",
    "login.submit": "تسجيل الدخول",
    "login.footer": "© 2025 الهيئة الوطنية للمحامين بتونس. كل الحقوق محفوظة.",
    "login.ssl": "اتصال آمن SSL",
    "login.fillAll": "الرجاء ملء جميع الحقول",
    "login.invalid": "معطيات الدخول غير صحيحة",
    "login.success": "تم تسجيل الدخول بنجاح",
    "login.error": "خطأ أثناء عملية تسجيل الدخول",

    // Home / Index
    "home.hero.title": "الهيئة الوطنية للمحامين بتونس",
    "home.hero.subtitle": "في خدمة العدالة والإنصاف ودولة القانون",
    "home.hero.admin": "فضاء المسؤولين",
    "home.hero.more": "المزيد من المعلومات",

    "home.mission.title": "مهمّتنا",
    "home.mission.text":
      "الهيئة الوطنية للمحامين بتونس هي الهيكل الممثل لمهنة المحاماة، الساهرة على أخلاقياتها واستقلاليتها وجودتها في ممارسة القانون.",
    "home.mission.card1.title": "العدالة والإنصاف",
    "home.mission.card1.text":
      "الدفاع عن الحقوق الأساسية وضمان النفاذ إلى عدالة منصفة لجميع المواطنين.",
    "home.mission.card2.title": "التميّز المهني",
    "home.mission.card2.text":
      "دعم التكوين المستمر وتعزيز التميّز في ممارسة مهنة المحاماة.",
    "home.mission.card3.title": "دولة القانون",
    "home.mission.card3.text":
      "الإسهام في تدعيم دولة القانون واحترام المبادئ الديمقراطية.",

    "home.services.title": "الخدمات الرقمية",
    "home.services.subtitle":
      "استفيدوا من خدماتنا الرقمية من أجل إدارة حديثة وفعّالة",
    "home.services.lawyers.title": "دليل المحامين",
    "home.services.lawyers.text":
      "الاطلاع على القائمة الكاملة للمحامين المسجلين وتخصّصاتهم",
    "home.services.cases.title": "إدارة القضايا",
    "home.services.cases.text": "نظام لإدارة وتوزيع القضايا القانونية",

    "home.contact.title": "اتصلوا بنا",
    "home.contact.subtitle": "الهيئة الوطنية للمحامين بتونس في خدمتكم",
    "home.contact.phone": "الهاتف",
    "home.contact.email": "البريد الإلكتروني",
    "home.contact.address": "العنوان",

    "home.footer.about":
      "الهيئة الوطنية للمحامين بتونس - في خدمة العدالة منذ القدم",
    "home.footer.links": "روابط مفيدة",
    "home.footer.aboutLink": "من نحن",
    "home.footer.news": "الأخبار",
    "home.footer.publications": "المنشورات",
    "home.footer.contact": "اتصل بنا",
    "home.footer.legal": "البيانات القانونية",
    "home.footer.terms": "شروط الاستخدام",
    "home.footer.privacy": "سياسة الخصوصية",
    "home.footer.mentions": "البيانات القانونية",
    "home.footer.copyright":
      "© 2025 الهيئة الوطنية للمحامين بتونس. كل الحقوق محفوظة.",

    // Sidebar / Layout
    "sidebar.tagline": "منظومة التصرف القانوني",
    "sidebar.nav.dashboard": "اللوحة الرئيسة",
    "sidebar.nav.lawyers": "المحامون",
    "sidebar.nav.cases": "القضايا",
    "sidebar.admin": "المشرف",
    "sidebar.admin.email": "admin@onat.tn",
    "sidebar.logout": "تسجيل الخروج",

    // Dashboard
    "dashboard.title": "لوحة المتابعة",
    "dashboard.subtitle": "نظرة شاملة على تسييركم القانوني",
    "dashboard.stats.lawyers": "محامون مسجّلون",
    "dashboard.stats.casesTotal": "إجمالي القضايا",
    "dashboard.stats.casesActive": "القضايا الجارية",
    "dashboard.stats.casesCompleted": "القضايا المغلقة",

    // Lawyers page
    "lawyers.title": "إدارة المحامين",
    "lawyers.subtitle":
      "أضف، عدّل وتابع فريق المحامين الخاص بك",
    "lawyers.add": "إضافة محامٍ",
    "lawyers.exportPdf": "تصدير PDF",
    "lawyers.exportExcel": "تصدير Excel",
    "lawyers.stats.total": "إجمالي المحامين",
    "lawyers.stats.active": "النشطون",
    "lawyers.stats.specialties": "الاختصاصات",
    "lawyers.loading.title": "جاري تحميل المعطيات...",
    "lawyers.loading.subtitle": "الرجاء الانتظار قليلاً",
    "lawyers.empty.title": "لا يوجد أي محامٍ مسجّل",
    "lawyers.empty.subtitle":
      "ابدأ بإضافة أول محامٍ لتسيير فريقك القانوني",
    "lawyers.empty.button": "إضافة أول محامٍ",
    "lawyers.list.title": "قائمة المحامين",
    "lawyers.list.count": "{count} محامٍ (محامون) في المجموع",
    "lawyers.toast.loadError":
      "خطأ أثناء تحميل قائمة المحامين",
    "lawyers.toast.saveError":
      "خطأ أثناء عملية الحفظ",
    "lawyers.toast.saveCreate":
      "تمت إضافة المحامي بنجاح",
    "lawyers.toast.saveUpdate":
      "تم تعديل بيانات المحامي بنجاح",
    "lawyers.toast.deleteSuccess":
      "تم حذف المحامي بنجاح",
    "lawyers.toast.deleteError":
      "خطأ أثناء عملية الحذف",
    "lawyers.toast.exportPdfSuccess":
      "تم تنزيل ملف PDF بنجاح!",
    "lawyers.toast.exportPdfError":
      "خطأ أثناء تنزيل ملف PDF",
    "lawyers.toast.exportExcelSuccess":
      "تم تنزيل ملف Excel بنجاح!",
    "lawyers.toast.exportExcelError":
      "خطأ أثناء تنزيل ملف Excel",

    // Lawyers table
    "lawyers.table.searchPlaceholder":
      "البحث حسب الاسم أو البريد أو الجهة...",
    "lawyers.table.results": "{count} نتيجة{suffix}",
    "lawyers.table.empty.title": "لا يوجد أي محامٍ مسجّل",
    "lawyers.table.empty.subtitle":
      "ابدأ بإضافة أول محامٍ لظهوره في هذه القائمة.",
    "lawyers.table.emptyFiltered.title": "لا توجد نتائج",
    "lawyers.table.emptyFiltered.subtitle":
      "حاول تعديل معايير البحث للحصول على نتائج.",
    "lawyers.table.resetFilters": "إعادة تعيين التصفية",
    "lawyers.table.columns.name": "الاسم واللقب",
    "lawyers.table.columns.contact": "معلومات الاتصال",
    "lawyers.table.columns.region": "الجهة",
    "lawyers.table.columns.registration": "تاريخ التسجيل",
    "lawyers.table.columns.cases": "القضايا",
    "lawyers.table.columns.performance": "الأداء",
    "lawyers.table.columns.actions": "إجراءات",
    "lawyers.table.columns.identifiant": "المعرف",

    // Lawyers modal
    "lawyers.modal.title.edit": "تعديل بيانات المحامي",
    "lawyers.modal.title.create": "إضافة محامٍ جديد",
    "lawyers.modal.subtitle.edit":
      "قم بتحديث بيانات هذا المحامي",
    "lawyers.modal.subtitle.create":
      "املأ بيانات المحامي الجديد",
    "lawyers.modal.section.personal": "البيانات الشخصية",
    "lawyers.modal.section.contact": "بيانات الاتصال",
    "lawyers.modal.section.location": "بيانات العنوان",
    "lawyers.modal.firstName": "الاسم",
    "lawyers.modal.firstName.placeholder": "مثال: أحمد",
    "lawyers.modal.identifiant": "المعرف",
"lawyers.modal.identifiant.placeholder": "مثال: 00000",

    "lawyers.modal.lastName": "اللقب",
    "lawyers.modal.lastName.placeholder": "مثال: بن صالح",
    "lawyers.modal.email": "البريد الإلكتروني",
    "lawyers.modal.email.placeholder": "example@email.com",
    "lawyers.modal.phone": "رقم الهاتف",
    "lawyers.modal.phone.placeholder": "+216 12 345 678",
    "lawyers.modal.region": "الجهة",
    "lawyers.modal.region.placeholder": "مثال: تونس",
    "lawyers.modal.address": "العنوان الكامل",
    "lawyers.modal.address.placeholder":
      "مثال: 123 شارع الحبيب بورقيبة، تونس",
    "lawyers.modal.registrationDate": "تاريخ التسجيل",
    "lawyers.modal.registrationDate.help":
      "تاريخ انضمام المحامي إلى الهيكل",
    "lawyers.modal.cancel": "إلغاء",
    "lawyers.modal.save": "حفظ",
    "lawyers.modal.error.email": "بريد إلكتروني غير صالح",
    "lawyers.modal.error.phone": "رقم هاتف غير صالح",
    "lawyers.modal.error.minChars": "على الأقل حرفان",

    // Cases page
    "cases.title": "إدارة القضايا",
    "cases.subtitle":
      "أنشئ وتابع القضايا القضائية بسهولة",
    "cases.new": "قضية جديدة",
    "cases.stats.total": "إجمالي القضايا",
    "cases.stats.pending": "في الانتظار",
    "cases.stats.assigned": "مكلّفة",
    "cases.stats.active": "نشِطة",
    "cases.list.title": "قائمة القضايا",
    "cases.list.count": "{count} قضية في المجموع",
    "cases.toast.loadError": "خطأ أثناء تحميل القضايا",
    "cases.toast.deleteSuccess": "تم حذف القضية",
    "cases.toast.deleteError":
      "خطأ أثناء حذف القضية",
    "cases.toast.updateError":
      "خطأ أثناء تعديل القضية",
    "cases.toast.updateSuccess":
      "تم تعديل القضية بنجاح",
    "cases.toast.createError":
      "خطأ أثناء إنشاء القضية",
    "cases.toast.createSuccess":
      "تم إنشاء القضية بنجاح",
    "cases.toast.saveError":
      "خطأ أثناء عملية الحفظ",

    // Cases table
    "cases.table.searchPlaceholder":
      "البحث حسب رقم القضية، العنوان، النوع أو المحامي...",
    "cases.table.status.all": "جميع الحالات",
    "cases.table.loading": "جاري التحميل...",
    "cases.table.results": "{count} نتيجة{suffix}",
    "cases.table.empty.title": "لا توجد أي قضية مسجّلة",
    "cases.table.empty.subtitle":
      "ابدأ بإنشاء أول قضية لظهورها في هذه القائمة.",
    "cases.table.emptyFiltered.title": "لا توجد نتائج",
    "cases.table.emptyFiltered.subtitle":
      "حاول تعديل معايير البحث للحصول على نتائج.",
    "cases.table.resetFilters": "إعادة تعيين التصفية",
    "cases.table.columns.number": "رقم القضية",
    "cases.table.columns.title": "العنوان",
    "cases.table.columns.type": "النوع",
    "cases.table.columns.courtDate": "تاريخ الجلسة",
    "cases.table.columns.status": "الحالة",
    "cases.table.columns.lawyer": "المحامي المكلّف",
    "cases.table.columns.actions": "إجراءات",
    "cases.table.unassigned": "غير مكلّفة",

    // Cases status labels
    "cases.status.pending": "في الانتظار",
    "cases.status.assigned": "مكلّفة",
    "cases.status.accepted": "مقبولة",
    "cases.status.rejected": "مرفوضة",
    "cases.status.completed": "منتهية",

    // Cases modal
    "cases.modal.title.edit": "تعديل القضية",
    "cases.modal.title.create": "إنشاء قضية جديدة",
    "cases.modal.number": "رقم القضية",
    "cases.modal.number.placeholder": "مثال: AFF-2024-001",
    "cases.modal.title": "عنوان القضية",
    "cases.modal.title.placeholder": "مثال: قضية تحيّل مالي",
    "cases.modal.type": "نوع القضية",
    "cases.modal.type.placeholder": "اختر نوع القضية",
    "cases.modal.type.criminel": "جنائية",
    "cases.modal.type.enquête": "بحث",
    "cases.modal.type.civil": "مدنية",
    "cases.modal.accused": "اسم المتهم",
    "cases.modal.accused.placeholder": "مثال: أحمد بن صالح",
    "cases.modal.courtDate": "تاريخ الجلسة",
    "cases.modal.cancel": "إلغاء",
    "cases.modal.save": "حفظ",
    "cases.modal.error.numberRequired": "رقم القضية إجباري",
    "cases.modal.error.titleRequired": "العنوان إجباري",
    "cases.modal.error.min3": "على الأقل 3 أحرف",
    "cases.modal.error.accusedRequired": "اسم المتهم إجباري",
    "cases.modal.error.min2": "على الأقل حرفان",
    "cases.modal.error.courtDateRequired":
      "تاريخ الجلسة إجباري",

    // Forgot password
    "forgot.title": "إعادة تعيين كلمة المرور",
    "forgot.subtitle":
      "أدخل بريدك الإلكتروني لتصلك رسالة إعادة التعيين",
    "forgot.emailLabel": "البريد الإلكتروني",
    "forgot.emailPlaceholder": "your@email.com",
    "forgot.submit": "إرسال الرابط",
    "forgot.backToLogin": "الرجوع إلى تسجيل الدخول",
    "forgot.footer":
      "© 2025 الهيئة الوطنية للمحامين بتونس. كل الحقوق محفوظة.",
    "forgot.error.empty": "الرجاء إدخال بريدك الإلكتروني",
    "forgot.error.request":
      "خطأ أثناء إرسال الطلب",
    "forgot.success":
      "تم إرسال رسالة إعادة التعيين!",
    "forgot.error.unknown": "خطأ غير معروف",

    // Change password
    "password.header.title": "أمان الحساب",
    "password.header.subtitle":
      "قم بتغيير كلمة المرور لحماية حسابك",
    "password.notice.title": "نصيحة أمنية",
    "password.notice.text":
      "استخدم كلمة مرور فريدة لا تستعملها في حسابات أخرى، وقم بتغييرها بصفة دورية للحفاظ على الأمان.",
    "password.current": "كلمة المرور الحالية",
    "password.current.placeholder":
      "أدخل كلمة المرور الحالية",
    "password.new": "كلمة المرور الجديدة",
    "password.new.placeholder":
      "أدخل كلمة المرور الجديدة",
    "password.strength.label": "قوة كلمة المرور:",
    "password.strength.weak": "ضعيفة",
    "password.strength.medium": "متوسطة",
    "password.strength.good": "جيدة",
    "password.strength.excellent": "ممتازة",
    "password.requirements.title": "يجب أن تحتوي كلمة المرور على:",
    "password.requirements.length": "8 أحرف على الأقل",
    "password.requirements.uppercase": "حرف واحد كبير على الأقل",
    "password.requirements.lowercase": "حرف واحد صغير على الأقل",
    "password.requirements.number": "رقم واحد على الأقل",
    "password.requirements.special":
      "رمز خاص واحد على الأقل (!@#$%...)",
    "password.confirm": "تأكيد كلمة المرور الجديدة",
    "password.confirm.placeholder":
      "أعد إدخال كلمة المرور الجديدة",
    "password.confirm.mismatch":
      "كلمتا المرور غير متطابقتين",
    "password.confirm.match":
      "كلمتا المرور متطابقتان",
    "password.submit.loading": "جاري المعالجة...",
    "password.submit.label": "تغيير كلمة المرور",
    "password.cancel": "إلغاء",
    "password.error.empty":
      "الرجاء ملء جميع الحقول",
    "password.error.mismatch":
      "كلمتا المرور الجديدتان غير متطابقتين",
    "password.error.weak":
      "كلمة المرور ليست قوية بما يكفي",
    "password.success":
      "تم تغيير كلمة المرور بنجاح!",
    "password.error.generic":
      "حدث خطأ أثناء تغيير كلمة المرور",
    "password.tips.title": "نصائح إضافية للأمان",
    "password.tips.1":
      "لا تستعمل نفس كلمة المرور لأكثر من حساب",
    "password.tips.2":
      "قم بتفعيل المصادقة الثنائية لزيادة الأمان",
    "password.tips.3":
      "غيّر كلمة المرور كل 3 إلى 6 أشهر",
    "password.tips.4":
      "استعمل مدير كلمات مرور لتخزينها بأمان",

    // Not found
    "notfound.title": "404",
    "notfound.message": "عذراً، الصفحة غير موجودة",
    "notfound.back": "العودة إلى الصفحة الرئيسية",
    "reset.title": "إعادة تعيين كلمة المرور",
  "reset.subtitle": "أدخل كلمة مرور جديدة لحسابك",
  "reset.newPassword": "كلمة المرور الجديدة",
  "reset.newPasswordPlaceholder": "أدخل كلمة المرور الجديدة",
  "reset.confirmPassword": "تأكيد كلمة المرور",
  "reset.confirmPasswordPlaceholder": "أعد إدخال كلمة المرور",
  "reset.submit": "إعادة تعيين كلمة المرور",
  "reset.backToLogin": "العودة إلى تسجيل الدخول",
  "reset.footer": "© 2025 الهيئة الوطنية للمحامين بتونس. كل الحقوق محفوظة.",

  "reset.successTitle": "تم بنجاح",
  "reset.success": "تمت إعادة تعيين كلمة المرور بنجاح.",

  "reset.error.title": "خطأ",
  "reset.error.empty": "يرجى ملء جميع الحقول.",
  "reset.error.mismatch": "كلمتا المرور غير متطابقتين.",
  "reset.error.request": "تعذر إعادة تعيين كلمة المرور.",
  "reset.error.unknown": "حدث خطأ غير معروف."
  },
};

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

const STORAGE_KEY = "juris-assist-language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const stored =
      typeof window !== "undefined"
        ? (window.localStorage.getItem(STORAGE_KEY) as Language | null)
        : null;
    if (stored === "fr" || stored === "ar") return stored;
    // Default: French
    return "fr";
  });

  const setLang = (value: Language) => {
    setLangState(value);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, value);
    }
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang === "ar" ? "ar" : "fr";
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    }
  }, [lang]);

  const t = (key: string, vars?: Record<string, string | number>) => {
    const value = translations[lang][key] ?? translations.fr[key] ?? key;
    if (!vars) return value;
    return Object.entries(vars).reduce((acc, [k, v]) => {
      return acc.replace(`{${k}}`, String(v));
    }, value);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}


