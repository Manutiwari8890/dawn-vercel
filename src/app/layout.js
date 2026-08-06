"use client";
import "./globals.css";
import Script from "next/script";
import Providers from "./providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect, useContext } from "react";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({ children }) {  
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

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Dawn Scientific",
    url: "https://dawnscientific.com",
    logo: "https://dawn-vercel.vercel.app/assets/images/Website-logo-1.webp",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+973-802-1005",
      contactType: "Customer Service",
    },
    sameAs: [
      "https://facebook.com/company",
      "https://linkedin.com/company/company"
    ]
  };


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
                      <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                          __html: JSON.stringify(organizationSchema),
                        }}
                      />
                      <Providers>
                        <>
                          <Header />
                          <Sidebar />
                          {children}
                          <Footer />
                        </>
                      </Providers>
                    </body>
                  </html>
                  );
}
