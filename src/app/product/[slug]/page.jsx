import ProductClient from "./ProductClient";


async function getProduct(slug) {
    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`https://new.dawnscientific.com/public/api/products/${slug}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

  const result = await res.json();
  return result.data;
}

export async function generateMetadata({ params }) {
    const {slug} = await params;
  const product = await getProduct(slug);
  const title =
    product.meta_title ||
    `${product.name} | Dawn Scientific`;

  const description =
    product.meta_description ||
    product.short_description ||
    `Buy ${product.name} at best price`;

  return {
    title,
    description,

    keywords: product.meta_keyword || `${product.name}, ${product.sku}, Dawn Scientific`,

    alternates: {
      canonical: `https://www.dawnscientific.com/product/${product.slug}`,
    },

    openGraph: {
      type: "website",
      title,
      description,
      url: `https://www.dawnscientific.com/product/${product.slug}`,
      siteName: "Lab Consumables, Chemicals & Equipment from Dawn Scientific",
      images: [
        {
          url: product.image_url,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.image_url],
    },
  };
}
export default async function Page({params}){
    const {slug} = await params;

    const product = await getProduct(slug);

    return <ProductClient initialData={product} />
}