import { Scale, Shield, Users, Gavel } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function AboutSection() {
  const values = [
    {
      icon: Scale,
      title: "Justice",
      titleAr: "العدالة",
      description: "Défendre l'équité et l'égalité devant la loi"
    },
    {
      icon: Shield,
      title: "Indépendance",
      titleAr: "الاستقلالية",
      description: "Garantir la liberté de défense et d'exercice"
    },
    {
      icon: Users,
      title: "Dignité",
      titleAr: "الكرامة",
      description: "Préserver l'honneur de la profession"
    },
    {
      icon: Gavel,
      title: "Intégrité",
      titleAr: "النزاهة",
      description: "Respecter la déontologie et l'éthique"
    }
  ];

  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Nos Valeurs
          </h2>
          <p className="font-arabic text-2xl text-primary mb-6">قيمنا</p>
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="h-0.5 w-12 bg-primary"></div>
            <Scale className="h-5 w-5 text-primary" />
            <div className="h-0.5 w-12 bg-primary"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <Card 
              key={index} 
              className="border-border hover:border-primary transition-all duration-300 hover:shadow-elegant group"
            >
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="font-arabic text-sm text-primary mb-4">
                  {value.titleAr}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
