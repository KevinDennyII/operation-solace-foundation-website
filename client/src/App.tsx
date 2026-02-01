import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import OurApproach from "@/pages/OurApproach";
import Programs from "@/pages/Programs";
import OurStory from "@/pages/OurStory";
import Contact from "@/pages/Contact";
import Resources from "@/pages/Resources";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/our-approach" component={OurApproach} />
      <Route path="/programs" component={Programs} />
      <Route path="/resources" component={Resources} />
      <Route path="/our-story" component={OurStory} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
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
