import { Mail, Phone, MapPin, Scale } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function ContactSection() {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Adresse",
      titleAr: "العنوان",
      content: "Tunis, Tunisie"
    },
    {
      icon: Phone,
      title: "Téléphone",
      titleAr: "الهاتف",
      content: "+216 XX XXX XXX"
    },
    {
      icon: Mail,
      title: "Email",
      titleAr: "البريد الإلكتروني",
      content: "contact@onat.tn"
    }
  ];

  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Contactez-nous
          </h2>
          <p className="font-arabic text-2xl text-primary mb-6">اتصل بنا</p>
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="h-0.5 w-12 bg-primary"></div>
            <Scale className="h-5 w-5 text-primary" />
            <div className="h-0.5 w-12 bg-primary"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {contactInfo.map((info, index) => (
            <Card 
              key={index} 
              className="border-border hover:border-primary transition-all duration-300 hover:shadow-elegant group text-center"
            >
              <CardContent className="p-8">
                <div className="mb-4 flex justify-center">
                  <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    <info.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-semibold text-foreground mb-1">
                  {info.title}
                </h3>
                <p className="font-arabic text-xs text-primary mb-3">
                  {info.titleAr}
                </p>
                <p className="text-muted-foreground text-sm">
                  {info.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
