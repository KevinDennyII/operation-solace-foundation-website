import { Suspense, lazy } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

const NotFound = lazy(() => import("@/pages/not-found"));
const Home = lazy(() => import("@/pages/Home"));
const OurApproach = lazy(() => import("@/pages/OurApproach"));
const Programs = lazy(() => import("@/pages/Programs"));
const Events = lazy(() => import("@/pages/Events"));
const AdminEvents = lazy(() => import("@/pages/AdminEvents"));
const OurStory = lazy(() => import("@/pages/OurStory"));
const Contact = lazy(() => import("@/pages/Contact"));
const Resources = lazy(() => import("@/pages/Resources"));

function Router() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/our-approach" component={OurApproach} />
        <Route path="/programs" component={Programs} />
        <Route path="/events" component={Events} />
        <Route path="/admin/events" component={AdminEvents} />
        <Route path="/resources" component={Resources} />
        <Route path="/our-story" component={OurStory} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
