import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Navigation } from "@/components/Navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "AI Sales Risk Assessment", template: "%s | AI Sales Risk Assessment" },
  description: "EBIOS RM, NIST RMF and AI risk assessment for a synthetic sales recommendation system.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main className="main-content">{children}</main>
      </body>
    </html>
  );
}
