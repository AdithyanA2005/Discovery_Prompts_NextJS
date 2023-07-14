import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Provider from "@/components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dicovery Prompts",
  description: "Discover & Share AI Prompt",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="night">
      <body className={inter.className}>
        <Provider>
          <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-auto ">
            <div className="min-h-screen">
              <Navbar />

              <main>
                {children}
              </main>
            </div>

            <Footer />
          </div>
        </Provider>
      </body>
    </html>
  )
}
