// import React, { ReactNode } from 'react';
// import { Inter } from 'next/font/google';
// import './globals.css';
// import Header from '../app/components/header/Header';
// import Footer from './components/footer/Footer';


// const inter = Inter({ subsets: ['latin'] });

// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// };

// interface RootLayoutProps {
//   children: ReactNode;
// }

// export default function RootLayout({ children }: RootLayoutProps) {
//   return (
    
//     <html lang="en">
//       <body className={inter.className}>
//         <Header />
//         {children}
//         <Footer />
//       </body>
//     </html>
//   );
// }

// 'use client';

// import React, { ReactNode } from 'react';
// import { Inter } from 'next/font/google';
// import './globals.css';
// import Header from '../app/components/header/Header';
// import Footer from './components/footer/Footer';
// import { HelmetProvider } from 'react-helmet-async'; 

// interface RootLayoutProps {
//   children: ReactNode;
// }

// export default function RootLayout({ children }: RootLayoutProps) {
//   return (
//     <HelmetProvider>
//       <html lang="en">
     
//         <body >
//           <Header />
//           {children}
//           <Footer />
//         </body>
//       </html>
//     </HelmetProvider>
//   );
// }

"use client"

import React, { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '../app/components/header/Header';
import Footer from './components/footer/Footer';
import { HelmetProvider } from 'react-helmet-async'; 
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import '../i18n';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {

  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('cookiesAccepted')) {
      setShowNotice(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setShowNotice(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookiesAccepted', 'false');
    setShowNotice(false);
  };


  return (
    <HelmetProvider>
      <html lang="en">
        <body>
          
          <Header />
          {children}
          
          <Footer />

           {/* WhatsApp Icon Button */}
          <Link 
            href="https://api.whatsapp.com/send/?phone=971566628585&text&type=phone_number&app_absent=0" 
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

          {showNotice && (
        <div id="cookie-notice" >
          <p className='py-8'>
          Our website uses cookies to enhance your experience. These include necessary cookies to operate the site, as well as analytics and advertising cookies. By accepting, you agree to the use of all cookies. 
           {/* <a href="/cookie-policy">Cookie Policy</a>. */}
          </p>
          <button className="button" onClick={acceptCookies}>Accept</button>
          <button className="button11" onClick={declineCookies}>Decline</button>
        </div>
      )}
        </body>
      </html>
    </HelmetProvider>
  );
}
