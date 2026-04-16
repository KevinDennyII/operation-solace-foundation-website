import { useState, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Upload, Calendar, Clock, MapPin, Lock, ImageIcon } from "lucide-react";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  flyerUrl: string | null;
}

interface EventFormData {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  flyer: File | null;
}

const EMPTY_FORM: EventFormData = {
  title: "",
  date: "",
  time: "",
  location: "",
  description: "",
  flyer: null,
};

export default function AdminEvents() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [form, setForm] = useState<EventFormData>(EMPTY_FORM);
  const [flyerPreview, setFlyerPreview] = useState<string | null>(null);

  const { data: events = [], isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
    enabled: isAuthenticated,
  });

  const verifyMutation = useMutation({
    mutationFn: async (pw: string) => {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      if (!res.ok) throw new Error("Invalid password");
      return res.json();
    },
    onSuccess: () => {
      setIsAuthenticated(true);
      setAuthError("");
    },
    onError: () => {
      setAuthError("Incorrect password. Please try again.");
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: EventFormData) => {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("date", data.date);
      formData.append("time", data.time);
      formData.append("location", data.location);
      formData.append("description", data.description);
      if (data.flyer) formData.append("flyer", data.flyer);

      const res = await fetch("/api/admin/events", {
        method: "POST",
        headers: { "x-admin-password": password },
        body: formData,
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to create event");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      setForm(EMPTY_FORM);
      setFlyerPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      toast({ title: "Event created!", description: "The event has been added successfully." });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/admin/events/${id}`, {
        method: "DELETE",
        headers: { "x-admin-password": password },
      });
      if (!res.ok) throw new Error("Failed to delete event");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      toast({ title: "Event deleted", description: "The event has been removed." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete event.", variant: "destructive" });
    },
  });

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setForm(f => ({ ...f, flyer: file }));
    if (file) {
      const url = URL.createObjectURL(file);
      setFlyerPreview(url);
    } else {
      setFlyerPreview(null);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.date || !form.time || !form.location || !form.description) {
      toast({ title: "Missing fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    createMutation.mutate(form);
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background font-body text-foreground">
        <Navbar />
        <section className="pt-32 pb-20 lg:pt-48 lg:pb-32">
          <div className="max-w-md mx-auto container-padding">
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl font-display font-bold text-primary mb-2">Admin Access</h1>
              <p className="text-muted-foreground">Enter the admin password to manage events.</p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <form
                  onSubmit={e => { e.preventDefault(); verifyMutation.mutate(password); }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Password</Label>
                    <Input
                      id="admin-password"
                      data-testid="input-admin-password"
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Enter admin password"
                      autoFocus
                    />
                    {authError && (
                      <p className="text-sm text-destructive" data-testid="text-auth-error">{authError}</p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    data-testid="button-admin-login"
                    disabled={verifyMutation.isPending || !password}
                  >
                    {verifyMutation.isPending ? "Verifying..." : "Login"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <Navbar />

      <section className="pt-32 pb-12 lg:pt-48 bg-primary/5">
        <div className="max-w-7xl mx-auto container-padding text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-primary">
            Event Management
          </h1>
          <p className="text-lg text-muted-foreground">
            Create and manage upcoming events for Operation Solace Foundation.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* CREATE FORM */}
            <div>
              <h2 className="text-2xl font-display font-bold mb-6">Add New Event</h2>
              <Card>
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-5">

                    <div className="space-y-2">
                      <Label htmlFor="event-title">Event Title *</Label>
                      <Input
                        id="event-title"
                        data-testid="input-event-title"
                        value={form.title}
                        onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                        placeholder="e.g. Ruck Day 2025"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="event-date">Date *</Label>
                        <Input
                          id="event-date"
                          data-testid="input-event-date"
                          type="date"
                          value={form.date}
                          onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="event-time">Time *</Label>
                        <Input
                          id="event-time"
                          data-testid="input-event-time"
                          type="time"
                          value={form.time}
                          onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="event-location">Location *</Label>
                      <Input
                        id="event-location"
                        data-testid="input-event-location"
                        value={form.location}
                        onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                        placeholder="e.g. Veteran's Park, San Diego, CA"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="event-description">Description *</Label>
                      <Textarea
                        id="event-description"
                        data-testid="input-event-description"
                        value={form.description}
                        onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                        placeholder="Tell attendees about this event..."
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Event Flyer (optional)</Label>
                      <div
                        className="border-2 border-dashed border-border rounded-lg p-4 cursor-pointer hover:border-primary/50 transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                        data-testid="dropzone-flyer"
                      >
                        {flyerPreview ? (
                          <div className="relative">
                            <img
                              src={flyerPreview}
                              alt="Flyer preview"
                              className="w-full max-h-48 object-contain rounded"
                            />
                            <p className="text-xs text-center text-muted-foreground mt-2">{form.flyer?.name}</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-6 text-muted-foreground">
                            <ImageIcon className="w-10 h-10 mb-2" />
                            <p className="text-sm">Click to upload flyer image</p>
                            <p className="text-xs mt-1">PNG, JPG, WEBP up to 10MB</p>
                          </div>
                        )}
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        data-testid="input-flyer-file"
                        onChange={handleFileChange}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      data-testid="button-create-event"
                      disabled={createMutation.isPending}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {createMutation.isPending ? "Creating Event..." : "Create Event"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* EVENTS LIST */}
            <div>
              <h2 className="text-2xl font-display font-bold mb-6">Existing Events</h2>

              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2].map(i => (
                    <div key={i} className="h-32 bg-muted animate-pulse rounded-xl" />
                  ))}
                </div>
              ) : events.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center text-muted-foreground">
                    <Calendar className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p>No events yet. Create your first event above.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {events.map(event => (
                    <Card key={event.id} className="overflow-hidden" data-testid={`card-event-${event.id}`}>
                      <div className="flex">
                        {event.flyerUrl && (
                          <div className="w-24 flex-shrink-0 relative">
                            <img
                              src={event.flyerUrl}
                              alt={event.title}
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 p-4">
                          <div className="flex justify-between items-start gap-2">
                            <div className="min-w-0">
                              <h3 className="font-display font-bold text-lg leading-tight">{event.title}</h3>
                              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3.5 h-3.5" /> {event.date}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5" /> {event.time}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3.5 h-3.5" /> {event.location}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{event.description}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive flex-shrink-0"
                              data-testid={`button-delete-event-${event.id}`}
                              onClick={() => {
                                if (confirm(`Delete "${event.title}"?`)) {
                                  deleteMutation.mutate(event.id);
                                }
                              }}
                              disabled={deleteMutation.isPending}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
