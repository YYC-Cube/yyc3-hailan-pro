import * as React from "react";
import { Link } from "react-router-dom";
import { BrandLogo } from "@/app/components/BrandLogo";

interface LogoProps {
  className?: string;
  variant?: "icon" | "full";
}

export const Logo = ({ className, variant = "full" }: LogoProps) => {
  return (
    <Link to="/" className="inline-flex items-center justify-center">
      <BrandLogo variant={variant} className={className} />
    </Link>
  );
};
