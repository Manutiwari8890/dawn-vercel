import ApplicationClient from "./ApplicationCLient";

export const metadata = {
  title: "Applications - Dawnscietific",
  description:
    "Products for various Application requirements for your laboratory needs at Dawn Scientific.",

  keywords: ["scientific laboratory supplier in USA", "Scientific Products Distributor USA", "Laboratory Chemicals Supplier New Jersey", "Laboratory Solutions Provider", "Ready to use solutions", "HPLC Solvents", "GC solvents", "Trusted Laboratory Chemicals and Supplies Company in USA", "Laboratory Chemicals and Consumables Supplier for Research Labs", "ISO Certified Laboratory Supplier in New Jersey", "WBENC certified scientific supplier in USA", "Where can research laboratories buy scientific supplies in USA", "Who Is a Trusted Laboratory Supplier in New Jersey", "Stains and indicators for microbiology and histology", "high purity inorganic and organic reagents"],

  alternates: {
    canonical: "https://dawnscientific.com/applications",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Applications - Dawnscietific",
    description:
      "Products for various Application requirements for your laboratory needs at Dawn Scientific.",
    url: "https://dawnscientific.com/applications",
    siteName: "Dawn Scientific",
    type: "website",
    locale: "en_IN",

    images: [
      {
        url: "http://dawnscientific.com/assets/images/Dawn-scientific.webp",
        width: 1200,
        height: 630,
        alt: "Dawn Scientific",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Applications - Dawnscietific",
    description:
      "Products for various Application requirements for your laboratory needs at Dawn Scientific.",
    images: [
      "http://dawnscientific.com/assets/images/Dawn-scientific.webp",
    ],
  },
};

export default function Page(){
    return (
        <ApplicationClient />   
    )
}