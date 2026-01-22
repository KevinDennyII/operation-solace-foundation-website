import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Leaf, Brain, Users, MessageCircle, ArrowRight, Shield } from "lucide-react";
import { Link } from "wouter";

export default function Programs() {
  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <Navbar />
      
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl -z-10" />
        <div className="max-w-7xl mx-auto container-padding">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-primary text-balance" data-testid="text-page-title">
              Our Programs
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Comprehensive support for veterans seeking alternative paths to healing and wellness.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2022&auto=format&fit=crop" 
                  alt="Peaceful meditation and healing retreat" 
                  className="w-full h-[350px] object-cover"
                  data-testid="img-therapy"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-semibold mb-6">
                <Leaf className="w-4 h-4 mr-2" />
                Therapy Access
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-primary">
                Psychedelic-Assisted Therapy
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We connect veterans with safe, clinically-guided psychedelic therapy programs. These transformative experiences have shown remarkable results for PTSD, depression, and moral injury.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">Vetted, safe retreat centers and practitioners</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">Plant medicine experiences (psilocybin, ayahuasca)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">Integration support before and after</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mb-6">
                <Brain className="w-4 h-4 mr-2" />
                Education
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-primary">
                Awareness & Education
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We're committed to reducing the stigma around psychedelic healing and educating the public about its benefits for veteran mental health.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Brain className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">Public awareness campaigns</span>
                </li>
                <li className="flex items-start gap-3">
                  <Brain className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">Educational resources on psychedelic research</span>
                </li>
                <li className="flex items-start gap-3">
                  <Brain className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">Advocacy for veteran access to alternative treatments</span>
                </li>
              </ul>
            </div>
            <div>
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2070&auto=format&fit=crop" 
                  alt="Education and awareness" 
                  className="w-full h-[350px] object-cover"
                  data-testid="img-education"
                />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2069&auto=format&fit=crop" 
                  alt="Veterans community gathering" 
                  className="w-full h-[350px] object-cover"
                  data-testid="img-community"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-100 text-amber-800 text-sm font-semibold mb-6">
                <Users className="w-4 h-4 mr-2" />
                Community
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-primary">
                Community Building
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Healing is not a solo journey. We build a tribe of like-minded individuals who have experienced plant medicine and can support each other's growth.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">Peer support networks</span>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">Regular community gatherings and events</span>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">Rebuilding the brotherhood lost after service</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto container-padding text-center">
          <MessageCircle className="w-12 h-12 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Need Help?</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            If you're a veteran seeking support, reach out to us. We're here to listen and help you find the right path forward.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" data-testid="button-contact">
              Contact Us <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
