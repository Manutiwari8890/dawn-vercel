import SingleBlogClient from './SingleBlogClient';

async function getBlog(slug) {
    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const res = await fetch(`${BASE_URL}blogs/${slug}`, {
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
    const blog = await getBlog(slug);
    const title =
    blog.meta_title ||
    `${blog.name} | Dawn Scientific`;

  const description =
    blog.meta_description ||
    blog.short_description ||
    `Buy ${blog.name} at best price `;

  return {
    title,
    description, 

    keywords: blog.meta_keyword || `${blog?.name}, Dawn Scientific`,

    alternates: {
      canonical: `https://www.dawnscientific.com/blog/detail/${slug}`,
    },

    openGraph: {
      type: "website",
      title,
      description,
      url: `https://www.dawnscientific.com/blog/detail/${slug}`,
      siteName: "Lab Consumables, Chemicals & Equipment from Dawn Scientific",
      images: [
        {
          url: blog.image_url,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description, 
      images: [blog.image_url],
    },
  };
}
export default async function Page({params}){
    const { slug } = await params;
    const data = await getBlog(slug)
    return <SingleBlogClient  initData={data} />
}