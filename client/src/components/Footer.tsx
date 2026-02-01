import { Link } from "wouter";
import { Heart } from "lucide-react";
import { SiInstagram } from "react-icons/si";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="md:flex md:justify-between gap-8">
          <div className="mb-8 md:mb-0">
            <Link href="/" className="flex items-center gap-3" data-testid="link-footer-logo">
              <Logo className="h-14 w-14" />
              <span className="self-center text-2xl font-bold whitespace-nowrap font-display text-white">
                Operation Solace
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-primary-foreground/80 font-light">
              Empowering veterans through psychedelic healing. Restoring purpose, connection, and hope to those who have served.
            </p>
            <p className="mt-2 text-primary-foreground/60 text-sm" data-testid="text-ein">
              EIN: 33-3302627
            </p>
            <div className="mt-4">
              <a 
                href="https://www.instagram.com/operation_solace/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-white transition-colors"
                data-testid="link-instagram"
              >
                <SiInstagram className="w-5 h-5" />
                <span>Follow us on Instagram</span>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-12 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-white/90">Pages</h2>
              <ul className="text-primary-foreground/70 font-light space-y-3">
                <li>
                  <Link href="/our-approach" className="hover:text-white transition-colors" data-testid="link-footer-approach">Our Approach</Link>
                </li>
                <li>
                  <Link href="/programs" className="hover:text-white transition-colors" data-testid="link-footer-programs">Programs</Link>
                </li>
                <li>
                  <Link href="/our-story" className="hover:text-white transition-colors" data-testid="link-footer-story">Our Story</Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors" data-testid="link-footer-contact">Contact</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-white/90">Support</h2>
              <ul className="text-primary-foreground/70 font-light space-y-3">
                <li>
                  <a 
                    href="https://www.paypal.com/us/fundraiser/charity/5511140" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-white transition-colors"
                    data-testid="link-footer-donate"
                  >
                    Donate via PayPal
                  </a>
                </li>
                <li>
                  <a href="mailto:partnerships@operationsolace.org" className="hover:text-white transition-colors" data-testid="link-footer-partners">
                    Corporate Partners
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-white/90">Legal</h2>
              <ul className="text-primary-foreground/70 font-light space-y-3">
                <li>
                  <span className="cursor-default">Privacy Policy</span>
                </li>
                <li>
                  <span className="cursor-default">Terms of Service</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-8 border-white/20 sm:mx-auto" />
        <div className="sm:flex sm:items-center sm:justify-between gap-4">
          <span className="text-sm text-primary-foreground/60 sm:text-center" data-testid="text-copyright">
            © {new Date().getFullYear()} Operation Solace Foundation. All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0 items-center space-x-2 text-sm text-primary-foreground/60">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-secondary fill-secondary" />
            <span>in San Antonio, TX</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
