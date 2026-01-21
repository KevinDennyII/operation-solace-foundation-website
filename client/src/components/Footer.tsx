import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center">
              <span className="self-center text-2xl font-bold whitespace-nowrap font-display text-white">
                Operation Solace
              </span>
            </a>
            <p className="mt-4 max-w-sm text-primary-foreground/80 font-light">
              Restoring purpose, connection, and hope to those who have served.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-2">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-white/90">Resources</h2>
              <ul className="text-primary-foreground/70 font-light">
                <li className="mb-4">
                  <a href="https://www.paypal.com/us/fundraiser/charity/5511140" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Donate</a>
                </li>
                <li className="mb-4">
                  <a href="#about" className="hover:text-white transition-colors">About Us</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-white/90">Legal</h2>
              <ul className="text-primary-foreground/70 font-light">
                <li className="mb-4">
                  <span className="cursor-default">Privacy Policy</span>
                </li>
                <li>
                  <span className="cursor-default">Terms &amp; Conditions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-white/20 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-primary-foreground/60 sm:text-center">
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
