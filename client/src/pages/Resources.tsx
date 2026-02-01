import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useState } from "react";

const resources = [
  {
    title: "Psychedelic treatment for co-occurring alcohol misuse and post-traumatic stress symptoms among United States Special Operations Forces Veterans",
    type: "Research Study",
    description: "An in-depth analysis of how psychedelic therapies can address complex co-occurring conditions in the SOF community.",
    link: "https://akjournals.com/view/journals/2054/5/3/article-p149.xml"
  },
  {
    title: "Exploring the potential of psychedelics for the betterment of all",
    type: "Article",
    description: "A comprehensive look at the societal and individual benefits of psychedelic medicine beyond clinical settings.",
    link: "https://psychedelics.berkeley.edu/"
  },
  {
    title: "Chapter 5 - A case report SPECT study and theoretical rationale for the sequential administration of ibogaine and 5-MeO-DMT",
    type: "Book Chapter",
    description: "Scientific case report and rationale for sequential administration of ibogaine and 5-MeO-DMT in treating alcohol use disorder.",
    link: "https://www.sciencedirect.com/science/chapter/bookseries/abs/pii/S0079612318300931?via%3Dihub"
  },
  {
    title: "Advancing the Science & Application of Psychedelics to Improve Mental Health",
    type: "Scientific Paper",
    description: "Current advancements in psychedelic science and their practical applications for improving mental health outcomes.",
    link: "https://dellmed.utexas.edu/units/charmaine-and-gordon-mcgill-center-for-psychedelic-research-and-therapy"
  },
  {
    title: "Translational Psychedelic Research Program",
    type: "Research Program",
    description: "Information about translational research programs bridging the gap between scientific discovery and clinical application.",
    link: "https://psychedelics.ucsf.edu/#Studies"
  },
  {
    title: "Welcome to the world’s largest psychedelic science research center",
    type: "Organization",
    description: "Discover the leading center for psychedelic science research and their groundbreaking work in the field.",
    link: "https://hopkinspsychedelic.org/"
  }
];

const FAVICON_BASE_URL = "https://www.google.com/s2/favicons";
const FAVICON_SIZE = 128;

const getFavicon = (url: string) => {
  try {
    const domain = new URL(url).hostname;
    return `${FAVICON_BASE_URL}?domain=${domain}&sz=${FAVICON_SIZE}`;
  } catch (e) {
    return "";
  }
};

const FallbackIcon = () => (
  <svg 
    className="w-8 h-8 text-primary" 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M15 3h6v6"/>
    <path d="M10 14 21 3"/>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
  </svg>
);

function ResourceIcon({ url, type }: { url: string; type: string }) {
  const [error, setError] = useState(false);

  if (error) {
    return <FallbackIcon />;
  }

  return (
    <img 
      src={getFavicon(url)} 
      alt={`${type} icon`}
      className="w-10 h-10 object-contain"
      onError={() => setError(true)}
    />
  );
}

function ResourceCard({ resource }: { resource: typeof resources[0] }) {
  return (
    <a 
      href={resource.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col p-8 rounded-2xl bg-background border border-border/50 hover:shadow-lg transition-all duration-300 hover:border-primary/20"
    >
      <div className="mb-6">
        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center border border-border/50 shadow-sm overflow-hidden group-hover:border-primary/20 transition-colors duration-300">
          <ResourceIcon url={resource.link} type={resource.type} />
        </div>
      </div>
      
      <div className="mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors">
          {resource.type}
        </span>
      </div>
      
      <h3 className="text-xl font-bold mb-3 font-display text-primary leading-snug min-h-[3.5rem] group-hover:text-secondary transition-colors">
        {resource.title}
      </h3>
      
      <p className="text-muted-foreground mb-8 flex-grow">
        {resource.description}
      </p>
      
      <div className="mt-auto">
        <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300">
          Read More <ExternalLink className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </a>
  );
}

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
              <ResourceCard key={index} resource={resource} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
