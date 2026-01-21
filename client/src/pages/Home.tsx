import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";
import { useContactForm } from "@/hooks/use-contact";
import { Shield, HeartHandshake, Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const contactMutation = useContactForm();

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: InsertContactMessage) => {
    contactMutation.mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <Navbar />
      
      {/* HERO SECTION */}
      <section id="hero" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/20 text-green-800 text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-green-600 mr-2"></span>
                San Antonio, TX
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6 text-balance text-primary">
                Healing Retreats & Support for Veterans
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg">
                We provide community, integration, and care to help restore purpose and hope to those who have served but fall through the cracks of traditional assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://www.paypal.com/us/fundraiser/charity/5511140" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 shadow-xl hover:-translate-y-0.5 transition-all duration-200">
                    Make a Donation
                  </Button>
                </a>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto text-lg h-14 px-8 border-primary text-primary hover:bg-primary/5"
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Learn More
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
                {/* Descriptive comment for Unsplash image replacement */}
                {/* peaceful nature landscape mountain sunrise calm */}
                <img 
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop" 
                  alt="Peaceful mountain landscape representing healing" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-border max-w-xs hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center text-secondary-foreground">
                    <HeartHandshake className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-primary">Community First</p>
                    <p className="text-xs text-muted-foreground">Reconnecting those who served.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MISSION / ABOUT SECTION */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-primary">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Operation Solace Foundation provides healing retreats and support programs for veterans who face mental health challenges but don’t qualify for traditional assistance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="p-8 rounded-2xl bg-background border border-border/50 hover:shadow-lg transition-all duration-300"
              {...fadeInUp}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-primary mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-display">Safety & Support</h3>
              <p className="text-muted-foreground">
                Providing a safe haven for veterans to address mental health challenges without judgment or bureaucracy.
              </p>
            </motion.div>

            <motion.div 
              className="p-8 rounded-2xl bg-background border border-border/50 hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-700 mb-6">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-display">Healing Retreats</h3>
              <p className="text-muted-foreground">
                Immersive experiences designed to break the cycle of isolation and restore a sense of inner peace.
              </p>
            </motion.div>

            <motion.div 
              className="p-8 rounded-2xl bg-background border border-border/50 hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-700 mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-display">Community Integration</h3>
              <p className="text-muted-foreground">
                Rebuilding the brotherhood and connection that many veterans lose after leaving the service.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pattern-dots"></div>
        <div className="max-w-4xl mx-auto container-padding text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Your Support Changes Lives</h2>
          <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            100% of your donation goes directly to funding retreats and support programs for veterans in need.
          </p>
          <a 
            href="https://www.paypal.com/us/fundraiser/charity/5511140" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button size="lg" variant="secondary" className="text-primary font-bold text-lg h-14 px-10 shadow-lg hover:bg-white transition-colors">
              Donate Now via PayPal <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </a>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-primary">Get in Touch</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Have questions about our programs, or want to know how you can help? Send us a message and we'll get back to you soon.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-1">
                    <span className="font-bold">📍</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Location</h4>
                    <p className="text-muted-foreground">San Antonio, TX</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-1">
                    <span className="font-bold">✉️</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Email</h4>
                    <p className="text-muted-foreground">info@operationsolace.org</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-border">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" className="h-12 bg-gray-50 border-gray-200" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your@email.com" className="h-12 bg-gray-50 border-gray-200" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="How can we help?" className="min-h-[120px] bg-gray-50 border-gray-200" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full h-12 text-lg font-semibold"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
