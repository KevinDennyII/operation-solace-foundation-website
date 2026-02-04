import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Leaf, Brain, Users, MessageCircle, ArrowRight, Shield, LucideIcon } from "lucide-react";
import { Link } from "wouter";

interface ProgramData {
  id: string;
  tag: {
    label: string;
    icon: LucideIcon;
    colorClass: string;
    iconColorClass: string;
    textColorClass: string;
  };
  title: string;
  description: string;
  features: {
    text: string;
    icon: LucideIcon;
    iconColorClass: string;
  }[];
  image: {
    src: string;
    alt: string;
    testId: string;
  };
}

const PROGRAMS: ProgramData[] = [
  {
    id: "therapy",
    tag: {
      label: "Therapy Access",
      icon: Leaf,
      colorClass: "bg-primary/10",
      textColorClass: "text-primary",
      iconColorClass: "text-primary",
    },
    title: "Psychedelic-Assisted Therapy",
    description: "We connect veterans with safe, clinically-guided psychedelic therapy programs. These transformative experiences have shown remarkable results for PTSD, depression, and moral injury.",
    features: [
      { text: "Vetted, safe retreat centers and practitioners", icon: Shield, iconColorClass: "text-primary/80" },
      { text: "Plant medicine experiences (psilocybin, ayahuasca)", icon: Shield, iconColorClass: "text-primary/80" },
      { text: "Integration support before and after", icon: Shield, iconColorClass: "text-primary/80" },
    ],
    image: {
      src: "/images/IMG_2514.jpg",
      alt: "Peaceful meditation and healing retreat",
      testId: "img-therapy",
    },
  },
  {
    id: "education",
    tag: {
      label: "Education",
      icon: Brain,
      colorClass: "bg-accent/10",
      textColorClass: "text-accent",
      iconColorClass: "text-accent",
    },
    title: "Awareness & Education",
    description: "We're committed to reducing the stigma around psychedelic healing and educating the public about its benefits for veteran mental health.",
    features: [
      { text: "Public awareness campaigns", icon: Brain, iconColorClass: "text-accent/80" },
      { text: "Educational resources on psychedelic research", icon: Brain, iconColorClass: "text-accent/80" },
      { text: "Advocacy for veteran access to alternative treatments", icon: Brain, iconColorClass: "text-accent/80" },
    ],
    image: {
      src: "/images/IMG_9923.jpg",
      alt: "Education and awareness",
      testId: "img-education",
    },
  },
  {
    id: "community",
    tag: {
      label: "Community",
      icon: Users,
      colorClass: "bg-secondary/10",
      textColorClass: "text-secondary-foreground",
      iconColorClass: "text-secondary-foreground",
    },
    title: "Community Building",
    description: "Healing is not a solo journey. We build a tribe of like-minded individuals who have experienced plant medicine and can support each other's growth.",
    features: [
      { text: "Peer support networks", icon: Users, iconColorClass: "text-secondary-foreground/80" },
      { text: "Regular community gatherings and events", icon: Users, iconColorClass: "text-secondary-foreground/80" },
      { text: "Rebuilding the brotherhood lost after service", icon: Users, iconColorClass: "text-secondary-foreground/80" },
    ],
    image: {
      src: "/images/IMG_9903.jpg",
      alt: "Veterans community gathering",
      testId: "img-community",
    },
  },
];

function ProgramContent({ program }: { program: ProgramData }) {
  return (
    <div>
      <div className={`inline-flex items-center px-4 py-2 rounded-full ${program.tag.colorClass} ${program.tag.textColorClass} text-sm font-semibold mb-6`}>
        <program.tag.icon className="w-4 h-4 mr-2" />
        {program.tag.label}
      </div>
      <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-primary">
        {program.title}
      </h2>
      <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
        {program.description}
      </p>
      <ul className="space-y-4 mb-8">
        {program.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <feature.icon className={`w-5 h-5 ${feature.iconColorClass} mt-1 flex-shrink-0`} />
            <span className="text-muted-foreground">{feature.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProgramImage({ program }: { program: ProgramData }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl">
      <img 
        src={program.image.src} 
        alt={program.image.alt} 
        className="w-full h-[350px] object-cover"
        data-testid={program.image.testId}
      />
    </div>
  );
}

function ProgramSection({ program, isReversed }: { program: ProgramData; isReversed: boolean }) {
  return (
    <div className="grid lg:grid-cols-2 gap-16 items-center mb-20 last:mb-0">
      <div className={isReversed ? "order-2 lg:order-1" : "order-1"}>
        {isReversed ? <ProgramImage program={program} /> : <ProgramContent program={program} />}
      </div>
      
      <div className={isReversed ? "order-1 lg:order-2" : "order-2"}>
        {isReversed ? <ProgramContent program={program} /> : <ProgramImage program={program} />}
      </div>
    </div>
  );
}

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

      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto container-padding">
          {PROGRAMS.map((program, index) => (
            <ProgramSection 
              key={program.id} 
              program={program} 
              isReversed={index % 2 === 0} 
            />
          ))}
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
