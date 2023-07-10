import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dicovery Prompts",
  description: "Discover & Share AI Prompt",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="night">
      <body className={inter.className}>
        <div className="max-w-7xl mx-auto">
          <Navbar />
          <main className="px-2">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
