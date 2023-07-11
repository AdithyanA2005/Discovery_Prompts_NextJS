import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dicovery Prompts",
  description: "Discover & Share AI Prompt",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="night">
      <body className={inter.className}>
        <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-auto ">
          <Navbar />

          <main>
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  )
}
