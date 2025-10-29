import { Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-court">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Animated Justice Scale */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <Scale className="w-[600px] h-[600px] text-primary animate-[swing_4s_ease-in-out_infinite]" 
               style={{
                 filter: "drop-shadow(0 0 60px hsl(var(--primary) / 0.3))"
               }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Arabic Text */}
          <h1 className="font-arabic text-3xl md:text-4xl text-primary-foreground mb-4 animate-fade-in">
            المنظمة الوطنية للمحامين التونسيين
          </h1>
          
          {/* French Title */}
          <h2 className="font-serif text-5xl md:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in animation-delay-200">
            Ordre National des Avocats de Tunisie
          </h2>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 font-light animate-fade-in animation-delay-400">
            Gardiens de la justice, défenseurs du droit
          </p>

          <div className="flex items-center justify-center gap-1 mb-12 animate-fade-in animation-delay-600">
            <div className="h-0.5 w-12 bg-primary"></div>
            <Scale className="h-6 w-6 text-primary" />
            <div className="h-0.5 w-12 bg-primary"></div>
          </div>

          {/* Mission Statement */}
          <p className="text-lg text-primary-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in animation-delay-800">
            L'Ordre National des Avocats de Tunisie veille à l'honneur, à l'indépendance et à la dignité 
            de la profession d'avocat, tout en garantissant le respect des droits de la défense et l'accès à la justice.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in animation-delay-1000">
            <a href="#services">
              <Button size="lg" variant="default" className="shadow-glow text-lg px-8">
                <Scale className="mr-2 h-5 w-5" />
                Nos Services
              </Button>
            </a>
            <a href="#about">
              <Button size="lg" variant="outline" className="bg-background/10 text-primary-foreground border-primary-foreground/30 hover:bg-background/20 text-lg px-8">
                En savoir plus
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
}
