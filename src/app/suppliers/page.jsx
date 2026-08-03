import SupplierClient from "./SupplierClient";

export const metadata = {
  title: "Suppliers - Dawnscietific",
  description:
    "Dawn Scientific specialized in distribution of premium Chemicals and consumables products sourced from reputable manufacturers and distributors worldwide. ",

  keywords: ["scientific laboratory supplier in USA", "Scientific Products Distributor USA", "Laboratory Chemicals Supplier New Jersey", "Laboratory Solutions Provider", "Ready to use solutions", "HPLC Solvents", "GC solvents", "Trusted Laboratory Chemicals and Supplies Company in USA", "Laboratory Chemicals and Consumables Supplier for Research Labs", "ISO Certified Laboratory Supplier in New Jersey", "WBENC certified scientific supplier in USA", "Where can research laboratories buy scientific supplies in USA", "Who Is a Trusted Laboratory Supplier in New Jersey", "Stains and indicators for microbiology and histology", "high purity inorganic and organic reagents"],

  alternates: {
    canonical: "https://dawnscientific.com/applications",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Suppliers - Dawnscietific",
    description:
      "Dawn Scientific specialized in distribution of premium Chemicals and consumables products sourced from reputable manufacturers and distributors worldwide. ",
    url: "https://dawnscientific.com/applications",
    siteName: "Dawn Scientific",
    type: "website",
    locale: "en_IN",

    images: [
      {
        url: "http://dawnscientific.com/assets/images/Dawn-scientific.png",
        width: 1200,
        height: 630,
        alt: "Dawn Scientific",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Suppliers - Dawnscietific",
    description:
      "Dawn Scientific specialized in distribution of premium Chemicals and consumables products sourced from reputable manufacturers and distributors worldwide. ",
    images: [
      "http://dawnscientific.com/assets/images/Dawn-scientific.png",
    ],
  },
};

export default function Page(){
    return (
        <SupplierClient />   
    )
}