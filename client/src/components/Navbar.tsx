import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed w-full z-50 top-0 start-0 glass-panel border-b border-border/40">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between p-4 container-padding">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
          <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-display font-bold text-xl">
            OS
          </div>
          <span className="self-center text-xl font-bold whitespace-nowrap text-primary font-display">
            Operation Solace
          </span>
        </Link>
        
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <a 
            href="https://www.paypal.com/us/fundraiser/charity/5511140" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button className="font-semibold shadow-lg hover:shadow-primary/20 transition-all duration-300">
              Donate with PayPal
            </Button>
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-sticky"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isOpen ? "block" : "hidden"
          }`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
            <li>
              <button
                onClick={() => scrollToSection("hero")}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 transition-colors"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("about")}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 transition-colors"
              >
                Mission
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("contact")}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 transition-colors"
              >
                Contact
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
