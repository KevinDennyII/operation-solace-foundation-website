import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  flyerUrl?: string;
  isUpcoming: boolean;
}

const events: Event[] = [
  {
    id: "ruck-day-2025",
    title: "Ruck Day",
    date: "Upcoming", 
    description: "It's Ruck Day. Let's move with purpose.",
    flyerUrl: "/ruck-day.jpg",
    isUpcoming: true,
  },
  // Example past event structure (hidden for now as there are no past events yet)
  /*
  {
    id: "past-event-example",
    title: "Past Community Gathering",
    date: "January 15, 2025",
    description: "A gathering to support our veterans.",
    isUpcoming: false
  }
  */
];

export default function Events() {
  const upcomingEvents = events.filter(e => e.isUpcoming);
  const pastEvents = events.filter(e => !e.isUpcoming);

  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <Navbar />
      
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 bg-primary/5">
        <div className="max-w-7xl mx-auto container-padding text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6 text-primary">
            Events
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Join us in our mission. Connect, heal, and move with purpose.
          </p>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto container-padding">
          <h2 className="text-3xl font-display font-bold mb-12 text-center">Upcoming Events</h2>
          
          {upcomingEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-12 items-start">
               {upcomingEvents.map(event => (
                 <div key={event.id} className="w-full max-w-4xl mx-auto md:col-span-2 grid md:grid-cols-2 gap-8 bg-card rounded-xl overflow-hidden shadow-lg border border-border">
                    <div className="relative h-full min-h-[400px]">
                      {event.flyerUrl ? (
                         <img 
                           src={event.flyerUrl} 
                           alt={event.title} 
                           className="absolute inset-0 w-full h-full object-cover"
                         />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <span className="text-muted-foreground">No Flyer Available</span>
                        </div>
                      )}
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <h3 className="text-3xl font-display font-bold mb-4 text-primary">{event.title}</h3>
                      <div className="space-y-4 mb-6">
                        <div className="flex items-center text-muted-foreground">
                           <Calendar className="w-5 h-5 mr-3 text-secondary" />
                           <span className="font-medium">{event.date}</span>
                        </div>
                      </div>
                      <p className="text-lg leading-relaxed mb-6">{event.description}</p>
                    </div>
                 </div>
               ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No upcoming events at the moment.</p>
          )}
        </div>
      </section>

      {/* PAST EVENTS */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto container-padding">
           <h2 className="text-3xl font-display font-bold mb-12 text-center">Past Events</h2>
           
           {pastEvents.length > 0 ? (
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               {pastEvents.map(event => (
                 <Card key={event.id} className="overflow-hidden flex flex-col h-full">
                   {event.flyerUrl && (
                     <div className="h-48 overflow-hidden relative">
                       <img src={event.flyerUrl} alt={event.title} className="absolute inset-0 w-full h-full object-cover transition-transform hover:scale-105 duration-300" />
                     </div>
                   )}
                   <CardHeader>
                     <div className="flex items-center text-sm text-muted-foreground mb-2">
                       <Calendar className="w-4 h-4 mr-2" />
                       {event.date}
                     </div>
                     <CardTitle className="font-display text-xl">{event.title}</CardTitle>
                   </CardHeader>
                   <CardContent>
                     <p className="text-muted-foreground">{event.description}</p>
                   </CardContent>
                 </Card>
               ))}
             </div>
           ) : (
             <p className="text-center text-muted-foreground">No past events to display.</p>
           )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
