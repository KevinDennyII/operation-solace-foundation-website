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
import { MapPin, Mail, Phone } from "lucide-react";

const CONTACT_EMAIL = "info@operationsolace.org";

export default function Contact() {
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

  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <Navbar />
      
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-primary text-balance">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Have questions? Need support? Want to get involved? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24 bg-background">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-8 text-primary">Get in Touch</h2>
              
              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-lg">Location</h4>
                    <p className="text-muted-foreground">San Antonio, TX</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-lg">Email</h4>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-muted-foreground hover:text-primary transition-colors">
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-border/50">
                <h3 className="font-bold text-lg mb-4 font-display text-primary">For Veterans</h3>
                <p className="text-muted-foreground leading-relaxed">
                  If you're a veteran seeking support, please don't hesitate to reach out. We're here to listen and help you explore your options for healing. Your information is always kept confidential.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 lg:p-10 rounded-2xl shadow-lg border border-border">
              <h2 className="text-2xl font-display font-bold mb-6 text-primary">Send a Message</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your name" 
                            className="h-12 bg-gray-50 border-gray-200" 
                            data-testid="input-name"
                            {...field} 
                          />
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
                          <Input 
                            placeholder="your@email.com" 
                            className="h-12 bg-gray-50 border-gray-200" 
                            data-testid="input-email"
                            {...field} 
                          />
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
                          <Textarea 
                            placeholder="How can we help?" 
                            className="min-h-[150px] bg-gray-50 border-gray-200" 
                            data-testid="input-message"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full h-12 text-lg font-semibold"
                    disabled={contactMutation.isPending}
                    data-testid="button-submit"
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
