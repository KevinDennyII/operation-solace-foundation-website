import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Heart, Star, ArrowRight, Quote, Calendar } from "lucide-react";
import { Logo } from "@/components/Logo";

export default function OurStory() {
  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <Navbar />
      
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="max-w-7xl mx-auto container-padding">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-primary text-balance" data-testid="text-page-title">
              Our Story
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Born from personal experience, driven by a mission to heal.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                <Star className="w-4 h-4 mr-2" />
                The Beginning
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-primary">
                From Darkness to Light
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Operation Solace Foundation was founded by veterans who experienced the transformative power of psychedelic-assisted therapy firsthand. After years of struggling with the invisible wounds of war — PTSD, depression, and isolation — our founder found healing through a psilocybin retreat.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                That experience changed everything. It restored hope, purpose, and connection. And it sparked a mission: to ensure every veteran has access to these life-changing treatments.
              </p>
            </div>
            <div className="relative flex justify-center">
              <Logo 
                className="w-72 h-72 md:w-80 md:h-80 border-4 border-white shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto container-padding">
          <div className="bg-white rounded-2xl p-10 shadow-lg border border-border/50 relative">
            <Quote className="absolute top-6 left-6 w-12 h-12 text-primary/10" />
            <blockquote className="text-2xl md:text-3xl font-display text-primary leading-relaxed text-center mb-8 pt-8" data-testid="text-quote">
              "Peace is possible. Through community, through healing, through connection — we can restore the purpose and hope that service once gave us."
            </blockquote>
            <p className="text-center text-muted-foreground font-medium">
              — Founder, Operation Solace Foundation
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-center text-primary">
            What We Believe
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-8 bg-background rounded-2xl border border-border/50" data-testid="card-belief-1">
              <h3 className="text-xl font-bold mb-4 font-display text-primary">The Invisible Wounds Are Real</h3>
              <p className="text-muted-foreground leading-relaxed">
                PTSD, moral injury, and depression don't always show on the surface. But they are devastating. We honor these wounds by providing real solutions, not band-aids.
              </p>
            </div>
            <div className="p-8 bg-background rounded-2xl border border-border/50" data-testid="card-belief-2">
              <h3 className="text-xl font-bold mb-4 font-display text-primary">Traditional Systems Fall Short</h3>
              <p className="text-muted-foreground leading-relaxed">
                Many veterans don't qualify for VA services or find them inadequate. We exist to fill that gap with compassionate, effective alternatives.
              </p>
            </div>
            <div className="p-8 bg-background rounded-2xl border border-border/50" data-testid="card-belief-3">
              <h3 className="text-xl font-bold mb-4 font-display text-primary">Psychedelic Healing Works</h3>
              <p className="text-muted-foreground leading-relaxed">
                The science is clear: psychedelic-assisted therapy offers breakthrough results for treatment-resistant PTSD and depression. Veterans deserve access.
              </p>
            </div>
            <div className="p-8 bg-background rounded-2xl border border-border/50" data-testid="card-belief-4">
              <h3 className="text-xl font-bold mb-4 font-display text-primary">Community Is Medicine</h3>
              <p className="text-muted-foreground leading-relaxed">
                Brotherhood and connection are essential to healing. We rebuild the bonds that many veterans lose when they leave the service.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2089&auto=format&fit=crop" 
                  alt="Veterans community gathering" 
                  className="w-full h-[400px] object-cover"
                  data-testid="img-community"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary/20 text-green-800 text-sm font-semibold mb-6">
                <Calendar className="w-4 h-4 mr-2" />
                Community Outreach
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-primary">
                Spreading the Message
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We actively participate in community events to raise awareness about psychedelic therapy for veterans. Our outreach honors fallen heroes while educating the public about alternative healing paths.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                From veteran appreciation events to community gatherings, we meet people where they are and share the hope of healing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto container-padding text-center">
          <Heart className="w-12 h-12 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Every donation, every share, every conversation helps us reach more veterans who are suffering in silence.
          </p>
          <a 
            href="https://www.paypal.com/us/fundraiser/charity/5511140" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button size="lg" variant="secondary" data-testid="button-donate-story">
              Support a Veteran Today <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
