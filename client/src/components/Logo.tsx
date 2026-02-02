import clsx from "clsx";

interface LogoProps {
  className?: string;
  alt?: string;
}

export function Logo({ className, alt = "Operation Solace Logo" }: LogoProps) {
  return (
    <img
      src="/logo.jpeg"
      alt={alt}
      className={clsx("object-contain", className)}
      data-testid="img-logo"
    />
  );
}
