import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FileText, BookOpen, Microscope, ArrowRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const resources = [
  {
    title: "Psychedelic treatment for co-occurring alcohol misuse and post-traumatic stress symptoms among United States Special Operations Forces Veterans",
    type: "Research Study",
    icon: FileText,
    description: "An in-depth analysis of how psychedelic therapies can address complex co-occurring conditions in the SOF community.",
    link: "#"
  },
  {
    title: "Exploring the potential of psychedelics for the betterment of all",
    type: "Article",
    icon: Globe,
    description: "A comprehensive look at the societal and individual benefits of psychedelic medicine beyond clinical settings.",
    link: "#"
  },
  {
    title: "Chapter 5 - A case report SPECT study and theoretical rationale for the sequential administration of ibogaine and 5-MeO-DMT",
    type: "Book Chapter",
    icon: BookOpen,
    description: "Scientific case report and rationale for sequential administration of ibogaine and 5-MeO-DMT in treating alcohol use disorder.",
    link: "#"
  },
  {
    title: "Advancing the Science & Application of Psychedelics to Improve Mental Health",
    type: "Scientific Paper",
    icon: Microscope,
    description: "Current advancements in psychedelic science and their practical applications for improving mental health outcomes.",
    link: "#"
  },
  {
    title: "Translational Psychedelic Research Program",
    type: "Research Program",
    icon: Microscope,
    description: "Information about translational research programs bridging the gap between scientific discovery and clinical application.",
    link: "#"
  },
  {
    title: "Welcome to the world’s largest psychedelic science research center",
    type: "Organization",
    icon: Globe,
    description: "Discover the leading center for psychedelic science research and their groundbreaking work in the field.",
    link: "#"
  }
];

export default function Resources() {
  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <Navbar />
      
      {/* HERO SECTION */}
      <section className="pt-32 pb-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl opacity-20" />
        
        <div className="max-w-7xl mx-auto container-padding relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
              Resources
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed">
              These resources are designed to educate, inform, and inspire action. From impactful statistics to in-depth research and veteran-focused programs, these resources provide valuable insights into the transformative potential of psychedelic therapy and the initiatives supporting those who served.
            </p>
          </div>
        </div>
      </section>

      {/* RESOURCES GRID */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <div 
                key={index}
                className="group flex flex-col p-8 rounded-2xl bg-background border border-border/50 hover:shadow-lg transition-all duration-300 hover:border-primary/20"
              >
                <div className="mb-6">
                  <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <resource.icon className="w-6 h-6" />
                  </div>
                </div>
                
                <div className="mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {resource.type}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 font-display text-primary leading-snug min-h-[3.5rem]">
                  {resource.title}
                </h3>
                
                <p className="text-muted-foreground mb-8 flex-grow">
                  {resource.description}
                </p>
                
                <div className="mt-auto">
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300">
                    Read More <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
