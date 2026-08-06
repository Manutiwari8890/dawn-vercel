import QuoteClient from "./QuoteClient";

export const metadata = {
    title: "Get quote - Dawnscietific",
    description:
        "Request for Quotation Please provide us with your current chemical needs and let our team do the work on getting you the best prices on all your chemical needs. Catalog# Product* Size* (Pack Size) Quantity* Your Name Your Email Phone Number Company Your Message",

    keywords: ["scientific laboratory supplier in USA", "Scientific Products Distributor USA", "Laboratory Chemicals Supplier New Jersey", "Laboratory Solutions Provider", "Ready to use solutions", "HPLC Solvents", "GC solvents", "Trusted Laboratory Chemicals and Supplies Company in USA", "Laboratory Chemicals and Consumables Supplier for Research Labs", "ISO Certified Laboratory Supplier in New Jersey", "WBENC certified scientific supplier in USA", "Where can research laboratories buy scientific supplies in USA", "Who Is a Trusted Laboratory Supplier in New Jersey", "Stains and indicators for microbiology and histology", "high purity inorganic and organic reagents"],

    alternates: {
        canonical: "https://dawnscientific.com/get-quote",
    },

    robots: {
        index: true,
        follow: true,
    },

    openGraph: {
        title: "Get quote - Dawnscietific",
        description:
            "Request for Quotation Please provide us with your current chemical needs and let our team do the work on getting you the best prices on all your chemical needs. Catalog# Product* Size* (Pack Size) Quantity* Your Name Your Email Phone Number Company Your Message",
        url: "https://dawnscientific.com/get-quote",
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
        title: "Get quote - Dawnscietific",
        description:
            "Request for Quotation Please provide us with your current chemical needs and let our team do the work on getting you the best prices on all your chemical needs. Catalog# Product* Size* (Pack Size) Quantity* Your Name Your Email Phone Number Company Your Message",
        images: [
            "http://dawnscientific.com/assets/images/Dawn-scientific.webp",
        ],
    },
};


export default function Page() {
    return (
        <>
            <QuoteClient />
        </>
    )
}