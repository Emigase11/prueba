import Image from "next/image";
import { content } from "@/lib/content";
import logo from "@/public/images/logo-web-orange-cmax-system.png";

export function Footer() {
  const { brand } = content;

  return (
    <footer className="border-t bg-muted/40 py-10">
      <div className="container flex flex-col items-center gap-4 text-center">
        <Image src={logo} alt={brand.logo.alt} className="h-8 w-auto" />
        <p className="text-body-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {brand.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
