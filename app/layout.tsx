import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthSessionProvider from "@/components/AuthSessionProvider";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dicovery Prompts",
  description: "Discover & Share AI Prompt",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="night">
      <body className={inter.className}>
        <AuthSessionProvider>
          <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-auto ">
            <div className="min-h-screen">
              <Navbar />

              <main>
                {children}
              </main>
            </div>

            <Footer />
          </div>
          <ToastContainer />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
