import { useState, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Pencil, Calendar, Clock, MapPin, Lock, ImageIcon, X, Plus } from "lucide-react";

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
  flyerDataUrl: string | null;
  clearFlyer: boolean;
}

const EMPTY_FORM: EventFormData = {
  title: "",
  date: "",
  time: "",
  location: "",
  description: "",
  flyer: null,
  flyerDataUrl: null,
  clearFlyer: false,
};

type Mode = { type: "create" } | { type: "edit"; event: Event };

export default function AdminEvents() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [form, setForm] = useState<EventFormData>(EMPTY_FORM);
  const [flyerPreview, setFlyerPreview] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>({ type: "create" });

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
      const res = await fetch("/api/admin/events", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-password": password },
        body: JSON.stringify({
          title: data.title,
          date: data.date,
          time: data.time,
          location: data.location,
          description: data.description,
          flyerData: data.flyerDataUrl || undefined,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to create event");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      resetForm();
      toast({ title: "Event created!", description: "The event has been added successfully." });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: EventFormData }) => {
      const res = await fetch(`/api/admin/events/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "x-admin-password": password },
        body: JSON.stringify({
          title: data.title,
          date: data.date,
          time: data.time,
          location: data.location,
          description: data.description,
          flyerData: data.flyerDataUrl || undefined,
          clearFlyer: data.clearFlyer || undefined,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to update event");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      resetForm();
      toast({ title: "Event updated!", description: "Your changes have been saved." });
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
      if (mode.type === "edit") resetForm();
      toast({ title: "Event deleted", description: "The event has been removed." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete event.", variant: "destructive" });
    },
  });

  function resetForm() {
    setForm(EMPTY_FORM);
    setFlyerPreview(null);
    setMode({ type: "create" });
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function startEdit(event: Event) {
    setMode({ type: "edit", event });
    setForm({
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      description: event.description,
      flyer: null,
      flyerDataUrl: event.flyerUrl,
      clearFlyer: false,
    });
    setFlyerPreview(event.flyerUrl);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setForm(f => ({ ...f, flyer: file, flyerDataUrl: dataUrl, clearFlyer: false }));
      setFlyerPreview(dataUrl);
    };
    reader.readAsDataURL(file);
  }

  function removeFlyer() {
    setForm(f => ({ ...f, flyer: null, flyerDataUrl: null, clearFlyer: true }));
    setFlyerPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.date || !form.time || !form.location || !form.description) {
      toast({ title: "Missing fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    if (mode.type === "edit") {
      updateMutation.mutate({ id: mode.event.id, data: form });
    } else {
      createMutation.mutate(form);
    }
  }

  const isSubmitting = createMutation.isPending || updateMutation.isPending;
  const isEditing = mode.type === "edit";

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
                      autoComplete="current-password"
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
            Create, edit, and manage upcoming events for Operation Solace Foundation.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* FORM PANEL */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-bold">
                  {isEditing ? "Edit Event" : "Add New Event"}
                </h2>
                {isEditing && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetForm}
                    data-testid="button-cancel-edit"
                    className="text-muted-foreground"
                  >
                    <X className="w-4 h-4 mr-1" /> Cancel
                  </Button>
                )}
              </div>

              {isEditing && (
                <div className="mb-4 p-3 bg-secondary/10 border border-secondary/30 rounded-lg text-sm text-secondary font-medium flex items-center gap-2">
                  <Pencil className="w-4 h-4 flex-shrink-0" />
                  Editing: <span className="font-bold">{mode.event.title}</span>
                </div>
              )}

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
                      <Label>Event Flyer {isEditing ? "(replace or remove)" : "(optional)"}</Label>

                      {flyerPreview && !form.clearFlyer ? (
                        <div className="relative border border-border rounded-lg overflow-hidden">
                          <img
                            src={flyerPreview}
                            alt="Flyer preview"
                            className="w-full max-h-48 object-contain bg-muted/30"
                          />
                          <div className="absolute top-2 right-2 flex gap-2">
                            <Button
                              type="button"
                              size="sm"
                              variant="secondary"
                              onClick={() => fileInputRef.current?.click()}
                              data-testid="button-replace-flyer"
                            >
                              <Pencil className="w-3 h-3 mr-1" /> Replace
                            </Button>
                            <Button
                              type="button"
                              size="sm"
                              variant="destructive"
                              onClick={removeFlyer}
                              data-testid="button-remove-flyer"
                            >
                              <X className="w-3 h-3 mr-1" /> Remove
                            </Button>
                          </div>
                          {form.flyer && (
                            <p className="text-xs text-center text-muted-foreground py-1 bg-muted/50">{form.flyer.name}</p>
                          )}
                        </div>
                      ) : (
                        <div
                          className="border-2 border-dashed border-border rounded-lg p-4 cursor-pointer hover:border-primary/50 transition-colors"
                          onClick={() => fileInputRef.current?.click()}
                          data-testid="dropzone-flyer"
                        >
                          <div className="flex flex-col items-center justify-center py-6 text-muted-foreground">
                            <ImageIcon className="w-10 h-10 mb-2" />
                            <p className="text-sm">Click to upload flyer image</p>
                            <p className="text-xs mt-1">PNG, JPG, WEBP up to 10MB</p>
                          </div>
                        </div>
                      )}

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        data-testid="input-flyer-file"
                        onChange={handleFileChange}
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button
                        type="submit"
                        className="flex-1"
                        data-testid="button-submit-event"
                        disabled={isSubmitting}
                      >
                        {isEditing
                          ? <><Pencil className="w-4 h-4 mr-2" />{isSubmitting ? "Saving..." : "Save Changes"}</>
                          : <><Plus className="w-4 h-4 mr-2" />{isSubmitting ? "Creating..." : "Create Event"}</>
                        }
                      </Button>
                      {isEditing && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={resetForm}
                          data-testid="button-cancel-edit-bottom"
                          disabled={isSubmitting}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* EVENTS LIST */}
            <div>
              <h2 className="text-2xl font-display font-bold mb-6">
                All Events <span className="text-muted-foreground text-lg font-normal">({events.length})</span>
              </h2>

              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-28 bg-muted animate-pulse rounded-xl" />
                  ))}
                </div>
              ) : events.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center text-muted-foreground">
                    <Calendar className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p>No events yet. Create your first event using the form.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {events.map(event => {
                    const isCurrentlyEditing = mode.type === "edit" && mode.event.id === event.id;
                    return (
                      <Card
                        key={event.id}
                        className={`overflow-hidden transition-all ${isCurrentlyEditing ? "ring-2 ring-secondary" : ""}`}
                        data-testid={`card-event-${event.id}`}
                      >
                        <div className="flex">
                          {event.flyerUrl && (
                            <div className="w-20 flex-shrink-0 bg-muted/50 flex items-center justify-center overflow-hidden">
                              <img
                                src={event.flyerUrl}
                                alt={event.title}
                                className="w-full h-full object-contain"
                              />
                            </div>
                          )}
                          <div className="flex-1 p-4 min-w-0">
                            <div className="flex justify-between items-start gap-2">
                              <div className="min-w-0">
                                <h3 className="font-display font-bold text-base leading-tight truncate">
                                  {event.title}
                                  {isCurrentlyEditing && (
                                    <span className="ml-2 text-xs font-normal text-secondary">(editing)</span>
                                  )}
                                </h3>
                                <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" /> {event.date}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {event.time}
                                  </span>
                                  <span className="flex items-center gap-1 truncate">
                                    <MapPin className="w-3 h-3 flex-shrink-0" /> {event.location}
                                  </span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">{event.description}</p>
                              </div>
                              <div className="flex flex-col gap-1 flex-shrink-0">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 px-3 text-xs"
                                  data-testid={`button-edit-event-${event.id}`}
                                  onClick={() => isCurrentlyEditing ? resetForm() : startEdit(event)}
                                  disabled={deleteMutation.isPending}
                                >
                                  {isCurrentlyEditing
                                    ? <><X className="w-3 h-3 mr-1" />Cancel</>
                                    : <><Pencil className="w-3 h-3 mr-1" />Edit</>
                                  }
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 px-3 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                                  data-testid={`button-delete-event-${event.id}`}
                                  onClick={() => {
                                    if (confirm(`Delete "${event.title}"? This cannot be undone.`)) {
                                      deleteMutation.mutate(event.id);
                                    }
                                  }}
                                  disabled={deleteMutation.isPending}
                                >
                                  <Trash2 className="w-3 h-3 mr-1" /> Delete
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
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
