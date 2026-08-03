import Link from 'next/link';
import Chromatography from './Chromatography';

export const metadata = {
    title: "Application Chromatography supplies - Dawn Scientific",
    description:
        "Chromatography is an important technique for laboratory science. It can separate, identify, and quantify compounds in complex mixtures.",

    keywords: ["scientific laboratory supplier in USA", "Scientific Products Distributor USA", "Laboratory Chemicals Supplier New Jersey", "Laboratory Solutions Provider", "Ready to use solutions", "HPLC Solvents", "GC solvents", "Trusted Laboratory Chemicals and Supplies Company in USA", "Laboratory Chemicals and Consumables Supplier for Research Labs", "ISO Certified Laboratory Supplier in New Jersey", "WBENC certified scientific supplier in USA", "Where can research laboratories buy scientific supplies in USA", "Who Is a Trusted Laboratory Supplier in New Jersey", "Stains and indicators for microbiology and histology", "high purity inorganic and organic reagents"],

    alternates: {
        canonical: "https://dawnscientific.com/analytical-lab",
    },

    robots: {
        index: true,
        follow: true,
    },

    openGraph: {
        title: "Application Chromatography supplies - Dawn Scientific",
        description:
            "Chromatography is an important technique for laboratory science. It can separate, identify, and quantify compounds in complex mixtures.",
        url: "https://dawnscientific.com/analytical-lab",
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
        title: "Application Chromatography supplies - Dawn Scientific",
        description:
            "Chromatography is an important technique for laboratory science. It can separate, identify, and quantify compounds in complex mixtures.",
        images: [
            "http://dawnscientific.com/assets/images/Dawn-scientific.webp",
        ],
    },
};


export default function Page() {
    return (
        <Chromatography />
    )
}