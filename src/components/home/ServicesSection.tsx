import { Scale, Users, FileText, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function ServicesSection() {
  const services = [
    {
      icon: Users,
      title: "Annuaire des Avocats",
      titleAr: "دليل المحامين",
      description: "Consultez la liste complète des avocats inscrits à l'ordre avec leurs spécialités et coordonnées.",
      link: "/lawyers"
    },
    {
      icon: FileText,
      title: "Gestion des Affaires",
      titleAr: "إدارة القضايا",
      description: "Système moderne de gestion et de suivi des affaires juridiques pour une meilleure organisation.",
      link: "/cases"
    },
    {
      icon: Calendar,
      title: "Calendrier des Audiences",
      titleAr: "جدول الجلسات",
      description: "Suivez les dates d'audience et les calendriers judiciaires en temps réel.",
      link: "/cases"
    },
    {
      icon: Scale,
      title: "Services Professionnels",
      titleAr: "الخدمات المهنية",
      description: "Accédez à l'ensemble des services et ressources pour la profession d'avocat.",
      link: "/dashboard"
    }
  ];

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Nos Services
          </h2>
          <p className="font-arabic text-2xl text-primary mb-6">خدماتنا</p>
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="h-0.5 w-12 bg-primary"></div>
            <Scale className="h-5 w-5 text-primary" />
            <div className="h-0.5 w-12 bg-primary"></div>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Des outils modernes au service de la profession juridique
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="border-border hover:border-primary transition-all duration-300 hover:shadow-elegant group"
            >
              <CardHeader>
                <div className="mb-4 flex justify-start">
                  <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="font-serif text-2xl">
                  {service.title}
                </CardTitle>
                <p className="font-arabic text-sm text-primary">
                  {service.titleAr}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                <Link to={service.link}>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    Accéder
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
