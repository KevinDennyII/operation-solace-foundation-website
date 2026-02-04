import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Heart, Users, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function OurApproach() {
  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <Navbar />
      
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-primary text-balance" data-testid="text-page-title">
              Our Approach
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Transparency, dedication, and unwavering commitment to those who served.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary/20 text-teal-800 text-sm font-semibold mb-6">
                <Heart className="w-4 h-4 mr-2" />
                100% Donation Model
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-primary">
                Every Dollar Goes to Veterans
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                When you donate to Operation Solace Foundation, 100% of your contribution goes directly toward providing care, resources, and connection for veterans and their families.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We operate with complete transparency because we believe those who sacrificed for our freedom deserve nothing less than our total dedication.
              </p>
              <a 
                href="https://www.paypal.com/us/fundraiser/charity/5511140" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button size="lg" data-testid="button-donate-approach">
                  Make a Donation <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src="/images/IMG_2470.jpg" 
                  alt="Veteran support community" 
                  className="w-full h-[400px] object-cover"
                  data-testid="img-community"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto container-padding">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-center text-primary">
            How Your Donation Helps
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-2xl border border-border/50 shadow-sm" data-testid="card-connection">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center text-primary mb-6">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-4 font-display">Initial Connection</h3>
              <p className="text-muted-foreground leading-relaxed">
                We provide that first conversation — a safe space where veterans can begin their healing journey without judgment or pressure.
              </p>
            </div>
            <div className="p-8 bg-white rounded-2xl border border-border/50 shadow-sm" data-testid="card-programs">
              <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center text-teal-700 mb-6">
                <Heart className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-4 font-display">Healing Programs</h3>
              <p className="text-muted-foreground leading-relaxed">
                Your donations fund access to transformative retreats and therapy programs that traditional VA services cannot provide.
              </p>
            </div>
            <div className="p-8 bg-white rounded-2xl border border-border/50 shadow-sm" data-testid="card-support">
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center text-orange-700 mb-6">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-4 font-display">Long-Term Support</h3>
              <p className="text-muted-foreground leading-relaxed">
                Healing doesn't end after a retreat. We provide ongoing community support and integration coaching.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto container-padding text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Corporate Partnerships</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            We partner with organizations that share our mission to support veterans. Together, we can make a greater impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <a href="mailto:partnerships@operationsolace.org">
              <Button size="lg" variant="secondary" data-testid="button-partner">
                Partner With Us
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
