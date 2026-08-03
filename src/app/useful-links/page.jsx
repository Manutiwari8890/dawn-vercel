import UsefulClient from "./UsefulClient";

export const metadata = {
    title: "Useful links - Dawn Scientific",
    description:
        "Ready to take your chemistry knowledge to the next level? Check out Resources for the best tools and resources for learning about Laboratory Chemicals, Pharmaceutical Excipients, Aquaculture Specialties, and Food Grade Additives. ",

    keywords: ["scientific laboratory supplier in USA", "Scientific Products Distributor USA", "Laboratory Chemicals Supplier New Jersey", "Laboratory Solutions Provider", "Ready to use solutions", "HPLC Solvents", "GC solvents", "Trusted Laboratory Chemicals and Supplies Company in USA", "Laboratory Chemicals and Consumables Supplier for Research Labs", "ISO Certified Laboratory Supplier in New Jersey", "WBENC certified scientific supplier in USA", "Where can research laboratories buy scientific supplies in USA", "Who Is a Trusted Laboratory Supplier in New Jersey", "Stains and indicators for microbiology and histology", "high purity inorganic and organic reagents"],

    alternates: {
        canonical: "https://dawnscientific.com/contact",
    },

    robots: {
        index: true,
        follow: true,
    },

    openGraph: {
        title: "Useful links - Dawn Scientific",
        description:
            "Ready to take your chemistry knowledge to the next level? Check out Resources for the best tools and resources for learning about Laboratory Chemicals, Pharmaceutical Excipients, Aquaculture Specialties, and Food Grade Additives. ",
        url: "https://dawnscientific.com/contact",
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
        title: "Useful links - Dawn Scientific",
        description:
            "Ready to take your chemistry knowledge to the next level? Check out Resources for the best tools and resources for learning about Laboratory Chemicals, Pharmaceutical Excipients, Aquaculture Specialties, and Food Grade Additives. ",
        images: [
            "http://dawnscientific.com/assets/images/Dawn-scientific.png",
        ],
    },
};


export default function Page() {
    return (
        <>
            <UsefulClient />
        </>
    )
}