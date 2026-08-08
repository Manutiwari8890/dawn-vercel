import CategoryClient from './CategoryClient';

async function getProducts(slug, searchParams) {
  const params = new URLSearchParams();
  if (slug) {
    params.set("category", slug);
  }
  if (searchParams.brand) {
    params.set("brand", searchParams.brand);
  }
  if (searchParams.alphabet) {
    params.set("alphabet", searchParams.alphabet);
  }
  if (searchParams.price_min) {
    params.set("price_min", searchParams.price_min);
  }
  if (searchParams.price_max) {
    params.set("price_max", searchParams.price_max);
  }
  if (searchParams.sort_by) {
    params.set("sort_by", searchParams.sort_by);
  }
  if (searchParams.page) {
    params.set("page", searchParams.page);
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}products?${params.toString()}`,
    {
      cache: "no-store"
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}
async function getCategories() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}categories`,
    {
      cache: "no-store"
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch Categories");
  }
  return res.json();
}

async function getCategoryDetails(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}categories/${slug}`,
    {
      cache: "no-store"
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch Categories");
  }
  return res.json();
}

export async function generateMetadata({ params }) {
  const {slug} = await params;

  const [category, subCategory, childrenCat, child] = slug;
  const currentSlug = child || childrenCat || subCategory || category || "";
  const categoryDetails = await getCategoryDetails(currentSlug);
  
  const title =
    categoryDetails?.data?.meta_title ||
    `${categoryDetails?.data?.name} | Dawn Scientific`;

  const description =
    categoryDetails?.data?.meta_description ||
    categoryDetails?.data?.description ||
    `Buy ${categoryDetails?.data?.name} at best price`;

  return {
    title,
    description,

    keywords: categoryDetails?.data?.meta_keyword || `${categoryDetails?.data?.name}, ${categoryDetails?.data?.slug}, Dawn Scientific`,

    alternates: {
      canonical: `https://www.dawnscientific.com/product-category/${categoryDetails?.data?.slug}`,
    },

    openGraph: {
      type: "website",
      title,
      description,
      url: `https://www.dawnscientific.com/product-category/${categoryDetails?.data?.slug}`,
      siteName: "Lab Consumables, Chemicals & Equipment from Dawn Scientific",
      images: [
        {
          url: categoryDetails?.data?.image_url,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [categoryDetails?.data?.image_url],
    },
  };
}
export default async function Page({ params, searchParams }) {
  const { slug } = await params;
  const filters = await searchParams;
  const [category, subCategory, childrenCat, child] = slug;

  const currentSlug = child || childrenCat || subCategory || category || "";


  const products = await getProducts(currentSlug, filters)
  const categories = await getCategories();
  const categoryDetails = await getCategoryDetails(currentSlug);

  return <CategoryClient initData={{products : products, categories : categories, categoryDetails : categoryDetails}} />
}