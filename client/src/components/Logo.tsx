import logoImage from "@assets/d34f41fde710d99d1cd70ae67b4575765f161d6d-1_1769068811822.jpeg";
import clsx from "clsx";
import React from "react";

interface LogoProps {
  className?: string;
  alt?: string;
}

export function Logo({ className, alt = "Operation Solace Logo" }: LogoProps) {
  return (
    <img
      src={logoImage}
      alt={alt}
      className={clsx("rounded-full object-cover", className)}
    />
  );
}
