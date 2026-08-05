import FaqClient from "./FaqClient";

export const metadata = {
    title: "Contact us for any of your Laboratory requirements - Dawnscietific",
    description:
        "Contact us for any of your Laboratory requirements on sales@dawnscientific.com, call us on 1-800-DAWN-SCI or 732-902-6300",

    keywords: ["scientific laboratory supplier in USA", "Scientific Products Distributor USA", "Laboratory Chemicals Supplier New Jersey", "Laboratory Solutions Provider", "Ready to use solutions", "HPLC Solvents", "GC solvents", "Trusted Laboratory Chemicals and Supplies Company in USA", "Laboratory Chemicals and Consumables Supplier for Research Labs", "ISO Certified Laboratory Supplier in New Jersey", "WBENC certified scientific supplier in USA", "Where can research laboratories buy scientific supplies in USA", "Who Is a Trusted Laboratory Supplier in New Jersey", "Stains and indicators for microbiology and histology", "high purity inorganic and organic reagents"],

    alternates: {
        canonical: "https://dawnscientific.com/contact",
    },

    robots: {
        index: true,
        follow: true,
    },

    openGraph: {
        title: "Contact us for any of your Laboratory requirements - Dawnscietific",
        description:
            "Contact us for any of your Laboratory requirements on sales@dawnscientific.com, call us on 1-800-DAWN-SCI or 732-902-6300",
        url: "https://dawnscientific.com/contact",
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
        title: "Contact us for any of your Laboratory requirements - Dawnscietific",
        description:
            "Contact us for any of your Laboratory requirements on sales@dawnscientific.com, call us on 1-800-DAWN-SCI or 732-902-6300",
        images: [
            "http://dawnscientific.com/assets/images/Dawn-scientific.webp",
        ],
    },
};


export default function Page() {
    return (
        <>
            <FaqClient />
        </>
    )
}