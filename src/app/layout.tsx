import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Pixelify_Sans } from "next/font/google";
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Conpecome",
  description: "Mate a fome em um clique!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <AuthProvider>
          {children}
          <Toaster position="bottom-right" richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
