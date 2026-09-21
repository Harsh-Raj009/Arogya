import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arogya — Clinical Case-Taking & Documentation Platform",
  description:
    "AI-assisted clinical documentation and patient case-taking system. Designed for Indian clinical workflows with an interoperability-ready architecture.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-[#f8fafb] antialiased">
      <body className="h-full min-h-screen text-slate-900 font-sans selection:bg-teal-100 selection:text-teal-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
