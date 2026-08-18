"use client"

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useLoader } from "@/context/LoaderContext";

export default function SingleBlogClient({initData}) {
    const { startLoading, stopLoading } = useLoader();
    const { slug } = useParams()
    const [detail, setDetail] = useState(initData);
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    useEffect(() => {
        startLoading();
        const fetchDetail = async () => {
            try {
                const response = await fetch(`${baseUrl}blogs/${slug}`); // Example API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch product data');
                }
                const data = await response.json();
                setDetail(data['data'])
            } catch (err) {
                console.error(err.message);
            } finally {
                stopLoading();
            }
        };

        fetchDetail();
    },
        []);


    return (
        <>
            <section className="blog_detail">
                <div className="container">
                    <div className="row">
                        <div className="w_100">
                            <div className="text-center">
                                <Link className="blog_category dark" href='/blog'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="20" height="20"><path d="M73.4 297.4C60.9 309.9 60.9 330.2 73.4 342.7L233.4 502.7C245.9 515.2 266.2 515.2 278.7 502.7C291.2 490.2 291.2 469.9 278.7 457.4L173.3 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L173.3 288L278.7 182.6C291.2 170.1 291.2 149.8 278.7 137.3C266.2 124.8 245.9 124.8 233.4 137.3L73.4 297.3z" fill="currentColor" /></svg>
                                    Back
                                </Link>
                                <Link className="blog_category" href={`/blog/${detail?.categories?.[0]?.slug}`}>{detail?.categories?.[0]?.name}</Link>
                            </div>
                            <h1 className="text-center">{detail?.title}</h1>
                            <p className="timeline text-center">
                                On {detail?.published_date &&
                                    new Intl.DateTimeFormat("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                        weekday: "long",
                                    }).format(new Date(detail.published_date))}
                            </p>
                            <div className="text-center">
                                <div className="blog_thumbnail">
                                    <img src={detail?.image_url} alt={detail?.title} width={560} heght={560} />
                                </div>
                            </div>
                            <div className="desc">
                                <div dangerouslySetInnerHTML={{ __html: detail?.content }}></div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}