import FallbackLoader from "@/components/FallbackLoader";
import SearchClient from "./SearchClient";
import { Suspense } from "react";

export async function generateMetadata() {
  const title =
    "Search Products | Dawn Scientific";

  const description ="Search high-quality laboratory products, scientific instruments, chemicals, glassware, consumables, and lab equipment from trusted brands at competitive prices at Dawn Scientific";

  return {
    title,
    description,

    keywords: `Dawn Scientific`,

    alternates: {
      canonical: `https://www.dawnscientific.com/search`,
    },

    openGraph: {
      type: "website",
      title,
      description,
      url: `https://www.dawnscientific.com/search`,
      siteName: "Lab Consumables, Chemicals & Equipment from Dawn Scientific",
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
      title,
      description,
      images: ["http://dawnscientific.com/assets/images/Dawn-scientific.png"]
    },
  };
}
export default async function Page(){
    return  <Suspense fallback={<FallbackLoader />}>
            <SearchClient />
            </Suspense>
}