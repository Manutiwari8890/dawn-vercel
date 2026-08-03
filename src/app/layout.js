"use client";
import "./globals.css";
import Script from "next/script";
import Providers from "./providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";


export default function RootLayout({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOverlay, setIsOverlay] = useState(false);

  const toggleCart = () => {
    document.documentElement.style.overflow = "hidden";
    setIsCartOpen(prev => !prev);
    setIsOverlay(prev => !prev);
  };
  const closeCart = () => {
    document.documentElement.style.overflow = "auto";
    setIsCartOpen(false);
    setIsOverlay(false);
  };

  
  useEffect(() => {
    const disableActions = (e) => {
      e.preventDefault();
    };

    document.addEventListener("copy", disableActions);
    document.addEventListener("cut", disableActions);

    return () => {
      document.removeEventListener("copy", disableActions);
      document.removeEventListener("cut", disableActions);
    };
  }, []);

  return (
    <html
      lang="en"
    >
      <head>
        <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="shortcut icon" href="/assets/images/cropped-w-logo-blue-32x32.webp" type="image/x-icon" sizes="32x32" />
              <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
                <link rel="preconnect" href="https://salesiq.zohopublic.com"  crossOrigin="anonymous" />
                  <link rel="preconnect" href="https://new.dawnscientific.com"  crossOrigin="anonymous" />
                    <link rel="preload" href="/assets/fonts/Poppins-Medium.ttf" as="font" type="font/ttf"  crossOrigin="anonymous" />
                      <Script>{`(function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-WXZLLSC');`}</Script>
                      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-PSYYV7LM5S"></Script>
                      <Script type="text/javascript">
                        {`(function(c,l,a,r,i,t,y){
                          c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
                        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "upww9bfxvb");`}
                      </Script>
                      <Script>
                        {`window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'G-PSYYV7LM5S');`}
                      </Script>
                    </head>
                    <body>
                      <Providers>
                        <Header onToggleCart={toggleCart} isOverlay={isOverlay} isCart={isCartOpen} />
                        <Sidebar isActive={isCartOpen} onClose={closeCart} />
                        {children}
                        <Footer />
                      </Providers>
                    </body>
                  </html>
                  );
}
