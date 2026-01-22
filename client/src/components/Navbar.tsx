import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import logoImage from "@assets/d34f41fde710d99d1cd70ae67b4575765f161d6d-1_1769068811822.jpeg";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/our-approach", label: "Our Approach" },
  { href: "/programs", label: "Programs" },
  { href: "/our-story", label: "Our Story" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  return (
    <nav className="fixed w-full z-50 top-0 start-0 glass-panel border-b border-border/40">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 p-4 container-padding">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer" data-testid="link-logo">
          <img 
            src={logoImage} 
            alt="Operation Solace Logo" 
            className="h-12 w-12 rounded-full object-cover"
          />
          <span className="self-center text-xl font-bold whitespace-nowrap text-primary font-display">
            Operation Solace
          </span>
        </Link>
        
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-2">
          <a 
            href="https://www.paypal.com/us/fundraiser/charity/5511140" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button data-testid="button-donate-header">
              Donate
            </Button>
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-sticky"
            aria-expanded={isOpen}
            data-testid="button-mobile-menu"
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
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-6 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 px-3 rounded md:p-0 transition-colors ${
                    location === link.href
                      ? "text-primary font-semibold"
                      : "text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary"
                  }`}
                  data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
