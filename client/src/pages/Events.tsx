import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  flyerUrl: string | null;
  createdAt: string;
}

function isUpcoming(dateStr: string): boolean {
  try {
    const eventDate = new Date(dateStr);
    return eventDate >= new Date(new Date().setHours(0, 0, 0, 0));
  } catch {
    return true;
  }
}

export default function Events() {
  const { data: events = [], isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  const upcomingEvents = events.filter(e => isUpcoming(e.date));
  const pastEvents = events.filter(e => !isUpcoming(e.date));

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

          {isLoading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2].map(i => (
                <div key={i} className="h-64 bg-muted animate-pulse rounded-xl" />
              ))}
            </div>
          ) : upcomingEvents.length > 0 ? (
            <div className="space-y-12">
              {upcomingEvents.map(event => (
                <div
                  key={event.id}
                  data-testid={`event-upcoming-${event.id}`}
                  className="w-full max-w-4xl mx-auto flex flex-col md:flex-row bg-card rounded-xl overflow-hidden shadow-lg border border-border"
                >
                  <div className="w-full md:w-1/2 flex-shrink-0">
                    {event.flyerUrl ? (
                      <img
                        src={event.flyerUrl}
                        alt={event.title}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-64 md:h-full bg-muted flex items-center justify-center">
                        <Calendar className="w-12 h-12 text-muted-foreground/40" />
                      </div>
                    )}
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <h3 className="text-3xl font-display font-bold mb-4 text-primary">{event.title}</h3>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="w-5 h-5 mr-3 text-secondary flex-shrink-0" />
                        <span className="font-medium">{event.date}</span>
                      </div>
                      {event.time && (
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="w-5 h-5 mr-3 text-secondary flex-shrink-0" />
                          <span className="font-medium">{event.time}</span>
                        </div>
                      )}
                      {event.location && (
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="w-5 h-5 mr-3 text-secondary flex-shrink-0" />
                          <span className="font-medium">{event.location}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-base leading-relaxed">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground" data-testid="no-upcoming-events">
              No upcoming events at the moment. Check back soon!
            </p>
          )}
        </div>
      </section>

      {/* PAST EVENTS */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto container-padding">
          <h2 className="text-3xl font-display font-bold mb-12 text-center">Past Events</h2>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-48 bg-muted animate-pulse rounded-xl" />
              ))}
            </div>
          ) : pastEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map(event => (
                <Card key={event.id} className="overflow-hidden flex flex-col" data-testid={`event-past-${event.id}`}>
                  {event.flyerUrl && (
                    <div className="overflow-hidden">
                      <img
                        src={event.flyerUrl}
                        alt={event.title}
                        className="w-full h-48 object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                      <Calendar className="w-4 h-4 mr-2" />
                      {event.date}
                      {event.time && <span className="ml-2">· {event.time}</span>}
                    </div>
                    {event.location && (
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <MapPin className="w-4 h-4 mr-2" />
                        {event.location}
                      </div>
                    )}
                    <CardTitle className="font-display text-xl">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{event.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground" data-testid="no-past-events">
              No past events to display.
            </p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
