import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Navigation } from "@/components/Navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Sales Product Recommendation", template: "%s | Sales Product Recommendation" },
  description: "Internal product recommendation dashboard backed by a synthetic open source prediction model.",
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
