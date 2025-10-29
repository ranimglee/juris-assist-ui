import { Link } from "react-router-dom";
import { Scale, Users, BookOpen, FileText, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=2000&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <div className="mb-6 inline-block">
            <Scale className="h-20 w-20 text-secondary" />
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 tracking-tight">
            Ordre National des Avocats de Tunisie
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 font-sans">
            Au service de la justice, de l'équité et de l'État de droit
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/dashboard">
              <Button size="lg" variant="secondary" className="shadow-glow font-sans">
                Espace Administrateur
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 font-sans">
              En savoir plus
            </Button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-primary mb-4">
              Notre Mission
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-sans">
              L'Ordre National des Avocats de Tunisie est l'instance représentative de la profession d'avocat, 
              garante de l'éthique, de l'indépendance et de l'excellence dans l'exercice du droit.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 shadow-card hover:shadow-elegant transition-shadow">
              <div className="mb-4 text-secondary">
                <Scale className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-primary mb-3">
                Justice et Équité
              </h3>
              <p className="text-muted-foreground font-sans">
                Défendre les droits fondamentaux et garantir l'accès à une justice équitable pour tous les citoyens.
              </p>
            </Card>

            <Card className="p-8 shadow-card hover:shadow-elegant transition-shadow">
              <div className="mb-4 text-secondary">
                <Users className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-primary mb-3">
                Excellence Professionnelle
              </h3>
              <p className="text-muted-foreground font-sans">
                Promouvoir la formation continue et l'excellence dans l'exercice de la profession d'avocat.
              </p>
            </Card>

            <Card className="p-8 shadow-card hover:shadow-elegant transition-shadow">
              <div className="mb-4 text-secondary">
                <BookOpen className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-primary mb-3">
                État de Droit
              </h3>
              <p className="text-muted-foreground font-sans">
                Contribuer au renforcement de l'État de droit et au respect des principes démocratiques.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6 bg-muted">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-primary mb-4">
              Services en Ligne
            </h2>
            <p className="text-lg text-muted-foreground font-sans">
              Accédez à nos services numériques pour une gestion moderne et efficace
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Link to="/lawyers">
              <Card className="p-8 shadow-card hover:shadow-elegant transition-all cursor-pointer group">
                <div className="flex items-start gap-4">
                  <div className="text-secondary group-hover:scale-110 transition-transform">
                    <Users className="h-10 w-10" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-semibold text-primary mb-2 group-hover:text-secondary transition-colors">
                      Annuaire des Avocats
                    </h3>
                    <p className="text-muted-foreground font-sans">
                      Consultez la liste complète des avocats inscrits et leurs spécialités
                    </p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link to="/cases">
              <Card className="p-8 shadow-card hover:shadow-elegant transition-all cursor-pointer group">
                <div className="flex items-start gap-4">
                  <div className="text-secondary group-hover:scale-110 transition-transform">
                    <FileText className="h-10 w-10" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-semibold text-primary mb-2 group-hover:text-secondary transition-colors">
                      Gestion des Affaires
                    </h3>
                    <p className="text-muted-foreground font-sans">
                      Système de gestion et d'assignation des affaires juridiques
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-primary mb-4">
              Nous Contacter
            </h2>
            <p className="text-lg text-muted-foreground font-sans">
              L'Ordre National des Avocats de Tunisie est à votre écoute
            </p>
          </div>

          <Card className="p-10 shadow-elegant">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-secondary/10 text-secondary mb-4">
                  <Phone className="h-6 w-6" />
                </div>
                <h3 className="font-serif font-semibold text-primary mb-2">Téléphone</h3>
                <p className="text-muted-foreground font-sans">+216 XX XXX XXX</p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-secondary/10 text-secondary mb-4">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="font-serif font-semibold text-primary mb-2">Email</h3>
                <p className="text-muted-foreground font-sans">contact@onat.tn</p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-secondary/10 text-secondary mb-4">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="font-serif font-semibold text-primary mb-2">Adresse</h3>
                <p className="text-muted-foreground font-sans">Tunis, Tunisie</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="gradient-primary text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Scale className="h-8 w-8 text-secondary" />
                <span className="text-xl font-serif font-bold">ONAT</span>
              </div>
              <p className="text-white/80 font-sans text-sm">
                Ordre National des Avocats de Tunisie - Au service de la justice depuis toujours
              </p>
            </div>

            <div>
              <h4 className="font-serif font-semibold mb-4">Liens Utiles</h4>
              <ul className="space-y-2 text-sm font-sans">
                <li><a href="#" className="text-white/80 hover:text-secondary transition-colors">À propos</a></li>
                <li><a href="#" className="text-white/80 hover:text-secondary transition-colors">Actualités</a></li>
                <li><a href="#" className="text-white/80 hover:text-secondary transition-colors">Publications</a></li>
                <li><a href="#" className="text-white/80 hover:text-secondary transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif font-semibold mb-4">Mentions Légales</h4>
              <ul className="space-y-2 text-sm font-sans">
                <li><a href="#" className="text-white/80 hover:text-secondary transition-colors">Conditions d'utilisation</a></li>
                <li><a href="#" className="text-white/80 hover:text-secondary transition-colors">Politique de confidentialité</a></li>
                <li><a href="#" className="text-white/80 hover:text-secondary transition-colors">Mentions légales</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-sm text-white/60 font-sans">
            <p>© {new Date().getFullYear()} Ordre National des Avocats de Tunisie. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
