"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { HelmetProvider } from "react-helmet-async";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../app/components/header/Header";
import Footer from "./components/footer/Footer";
import Link from "next/link";
import Image from "next/image";
import "../i18n";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [showNotice, setShowNotice] = useState(false);
  const pathname = usePathname() || "";

  useEffect(() => {
    if (!localStorage.getItem("cookiesAccepted")) {
      setShowNotice(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setShowNotice(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookiesAccepted", "false");
    setShowNotice(false);
  };

  const hideHeaderFooter = (pathname || "").startsWith("/login") || (pathname || "").startsWith("/dashboard");

  return (
    <HelmetProvider>
      <html lang="en">
        <body className={inter.className}>
          {!hideHeaderFooter && <Header />} 

          {children}

          {!hideHeaderFooter && <Footer />}

          {!pathname.startsWith("/dashboard") && (
            <Link
              href="https://api.whatsapp.com/send/?phone=966552249297&text&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="fixed bottom-4 right-4 z-50"
            >
              <Image
                src="/assets/images/whastapp.png"
                alt="WhatsApp"
                width={60}
                height={60}
                className="hover:opacity-80 transition-opacity"
              />
            </Link>
            )}

          {showNotice && (
            <div id="cookie-notice">
              <p className="py-8">
                Our website uses cookies to enhance your experience. These
                include necessary cookies to operate the site, as well as
                analytics and advertising cookies. By accepting, you agree to
                the use of all cookies.
              </p>
              <button className="button" onClick={acceptCookies}>
                Accept
              </button>
              <button className="button11" onClick={declineCookies}>
                Decline
              </button>
            </div>
          )}
        </body>
      </html>
    </HelmetProvider>
  );
}
