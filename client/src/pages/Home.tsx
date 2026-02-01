import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Shield, HeartHandshake, Users, ArrowRight, Leaf, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import { Logo } from "@/components/Logo";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <Navbar />
      
      {/* HERO SECTION */}
      <section id="hero" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/20 text-green-800 text-sm font-medium mb-6">
                <Leaf className="w-4 h-4 mr-2" />
                Psychedelic-Assisted Healing
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6 text-balance text-primary">
                Empowering Veterans Through Healing
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg">
                We provide veterans with access to transformative psychedelic-assisted therapy and build community for those seeking alternative paths to peace.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
                <a 
                  href="https://www.paypal.com/us/fundraiser/charity/5511140" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="w-full sm:w-auto" data-testid="button-donate-hero">
                    Make a Donation
                  </Button>
                </a>
                <Link href="/our-approach">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full sm:w-auto"
                    data-testid="button-learn-more"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative flex justify-center">
              <div className="relative">
                <Logo 
                  alt="Operation Solace - Soldier walking through mushroom field" 
                  className="w-80 h-80 md:w-96 md:h-96 border-4 border-white shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white p-4 rounded-xl shadow-xl border border-border max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-primary" data-testid="text-donation-model">100% Goes to Veterans</p>
                    <p className="text-xs text-muted-foreground">Every dollar funds healing.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 100% DONATION MODEL */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto container-padding text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">100% Donation Model</h2>
          <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Every dollar you donate goes directly to providing care, resources, and connection for veterans and their families. No administrative fees. Complete transparency.
          </p>
          <Link href="/our-approach">
            <Button size="lg" variant="secondary" data-testid="button-see-approach">
              See Our Approach <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-primary">What We Do</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We provide access to psychedelic-assisted therapy, build awareness, and create community for veterans seeking alternative healing.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-background border border-border/50 hover:shadow-lg transition-all duration-300" data-testid="card-therapy">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-700 mb-6">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-display">Therapy Access</h3>
              <p className="text-muted-foreground">
                Connecting veterans with safe, clinically-guided psychedelic therapy programs including psilocybin and ayahuasca retreats.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-background border border-border/50 hover:shadow-lg transition-all duration-300" data-testid="card-awareness">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-primary mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-display">Awareness</h3>
              <p className="text-muted-foreground">
                Educating the public about psychedelic healing benefits and removing the stigma around alternative treatments for PTSD.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-background border border-border/50 hover:shadow-lg transition-all duration-300" data-testid="card-community">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-700 mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-display">Community</h3>
              <p className="text-muted-foreground">
                Building a tribe of like-minded individuals who have experienced plant medicine healing and support each other's growth.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/programs">
              <Button variant="outline" size="lg" data-testid="button-explore-programs">
                Explore Our Programs <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* PEACE IS POSSIBLE */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2074&auto=format&fit=crop" 
                  alt="Veterans community support" 
                  className="w-full h-[400px] object-cover"
                  data-testid="img-community"
                />
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-primary">
                Peace Is Possible
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                The invisible wounds of war — PTSD, depression, moral injury — don't always respond to traditional treatments. But there is hope.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Psychedelic-assisted therapy has shown breakthrough results for veterans suffering from treatment-resistant mental health conditions. We're here to help you access these life-changing treatments.
              </p>
              <Link href="/our-story">
                <Button size="lg" data-testid="button-read-story">
                  Read Our Story <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="max-w-4xl mx-auto container-padding text-center relative z-10">
          <HeartHandshake className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Support a Veteran Today</h2>
          <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Your donation provides direct access to healing retreats and support programs for veterans who sacrificed for our freedom.
          </p>
          <a 
            href="https://www.paypal.com/us/fundraiser/charity/5511140" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button size="lg" variant="secondary" data-testid="button-donate-cta">
              Donate Now via PayPal <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
