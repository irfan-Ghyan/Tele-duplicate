"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { HelmetProvider } from "react-helmet-async";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Link from "next/link";
import Image from "next/image";
import "../i18n";
import Script from "next/script";
import { trackEvent } from "./utils/moengage.js";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  const [showNotice, setShowNotice] = useState(false);
  const pathname = usePathname() || "";
  const [cookiesAccepted, setCookiesAccepted] = useState(null);
  
  useEffect(() => {
    const accepted = localStorage.getItem("cookiesAccepted");
    setCookiesAccepted(accepted);
    if (accepted === null) {
      setShowNotice(true);
    }
  }, []);


  useEffect(() => {
    if (!localStorage.getItem("cookiesAccepted")) {
      setShowNotice(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setCookiesAccepted("true");
    setShowNotice(false);
    console.log("Cookies accepted");
    trackEvent("Cookie Acceptance", { accepted: true });

  };

  const declineCookies = () => {
    localStorage.setItem("cookiesAccepted", "false");
    setCookiesAccepted("false");
    setShowNotice(false);
    console.log("Cookies declined");
    trackEvent("Cookie Acceptance", { accepted: false });
  };

  const hideHeaderFooter = (pathname || "").startsWith("/login") || (pathname || "").startsWith("/dashboard");

 
  
  return (
    <HelmetProvider>
      <html lang="en">
   
      
        <body className={inter.className}>

        <Script
        strategy="afterInteractive"
        id="moengage-script"
        dangerouslySetInnerHTML={{
          __html: `(function(i, s, o, g, r, a, m, n) {
            i.moengage_object = r;
            t = {};
            q = function(f) {
              return function() {
                (i.moengage_q = i.moengage_q || []).push({ f: f, a: arguments });
              };
            };
            (f = [
              "track_event",
              "Web_Start_your_application",
              "Web_Signup",
              "Web_Want_BRE1_limitincrease_click",
              "Web_Happy_with_BRE1limit_click",
              "Web_Complete_Profile",
              "Web_On_bank_statement",
              "Web_Bank statement click_perfios",
              "Web_Bank statement click_manual",
              "Web_Suspend_bank_statement_perfios",
              "Web_Suspend_bank_statement_manual",
              "Web_Suspend_salaryslip",
              "Web_Smart_Repay_Click",
              "Web_downloadapp",
              "destroy_session",
              "add_unique_user_id",
              "moe_events",
              "call_web_push",
              "track",
              "location_type_attribute"
            ]),
              (h = { onsite: ["getData"] });
            for (k in f) {
              t[f[k]] = q(f[k]);
            }
            a = s.createElement(o);
            m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m);
            i.moe =
              i.moe ||
              function() {
                n = arguments[0];
                return t;
              };
            a.onload = function() {
              if (n) {
                i[r] = moe(n);
              }
            };
          })(
            window,
            document,
            "script",
            "https://cdn.moengage.com/webpush/moe_webSdk.min.latest.js",
            "Moengage"
          );

          Moengage = moe({
            app_id: "13NE3FE15UA8RHU1I8WF0RK4",
            debug_logs: 0
          });`
        }}
  ></Script>
{/*         
        {cookiesAccepted === "true" && (
          <>
            <Script
              src="https://cdn.moengage.com/webpush/moe_webSdk.min.latest.js"
              strategy="beforeInteractive"
              id="moengage-script"
              data-moe-wid="13NE3FE15UA8RHU1I8WF0RK4"
              data-moe-dc="dc_2"
              data-moe-dl="1"
              data-moe-sdk-v="2"
              onLoad={() => {
                console.log("MoEngage script loaded successfully");
                setMoEngageReady();
              }}
            />
           
          </>
        )} */}

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


