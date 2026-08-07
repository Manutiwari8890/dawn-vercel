"use client";

import Link from "next/link";
import {useParams, useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useLoader } from "@/context/LoaderContext";

function BlogCategory()
{
        const { startLoading, stopLoading } = useLoader();
        const [blogs, setBlogs] = useState([]);
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        let {slug} = useParams()
        const [meta, setMeta] = useState({});
        const searchParams = useSearchParams();
        const router = useRouter();

        useEffect(() => {
            startLoading();
            const fetchBlog = async () => {
                console.log(searchParams)
                const page = searchParams.get('page')

                try {
                    const response = await fetch(`${baseUrl}blogs/category/${slug}?per_page=12${page ? `&page=${page}` : ''}`); // Example API endpoint
                    if (!response.ok) {
                      throw new Error('Failed to fetch product data');
                    }
                    const data = await response.json();
                    setBlogs(data['data'])
                    setMeta(data['meta'])
                    stopLoading();
                } catch (err) {
                    console.error(err.message);
                }
            };
    
            fetchBlog();
            }, 
        [searchParams.toString()]);
     

    const handlePage = (page) => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(page).forEach(([key, value]) => {
            if (value === null || value === undefined || value === "") {
                params.delete(key);
            } else {
                params.set(key, value);
            }
        });
        router.push(`?${params.toString()}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }


    return (
        <div className="blog_page">
            <section className="page-title">
                <div className="container">
                    <div className="title-wrapper">
                        <div className="title">
                            <h1>{blogs?.length > 0 &&
                                    blogs?.[0].categories[0].name
                                }</h1>
                        </div>
                    </div>
                </div>
            </section>
            <section className="knowledge">
                <div className="container">
                    <div className="row">
                        {blogs &&
                            blogs?.map((blog) => (
                                <div className="col-md-25" key={blog?.id}>
                                    <div className="article">
                                        <div className="img-container">
                                            <img src={blog?.image_url} alt="" />
                                        </div>
                                        <div className="title">
                                            <h3>{blog?.title}</h3>
                                        </div>
                                        <div className="btn-area mt-2">
                                            <Link href={`/blog/detail/${blog?.slug}`} className="btn btn-secondary w-100">
                                                Read More 
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="20" height="20"><path d="M566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3C348.8 149.8 348.8 170.1 361.3 182.6L466.7 288L96 288C78.3 288 64 302.3 64 320C64 337.7 78.3 352 96 352L466.7 352L361.3 457.4C348.8 469.9 348.8 490.2 361.3 502.7C373.8 515.2 394.1 515.2 406.6 502.7L566.6 342.7z" fill="currentColor" /></svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="row">
                                                <div className="pagination">
                                                    {/* Previous button */}
                                                    <button
                                                        disabled={meta?.current_page < 2}
                                                        onClick={() => handlePage({page : (meta?.current_page - 1)})}
                                                        aria-label="Previous"
                                                    >
                                                        Previous
                                                    </button>

                                                    {(() => {
                                                        const totalPages = Number(meta?.last_page) || 0;
                                                        const currentPage = Number(meta?.current_page) || 1;
                                                        const windowSize = 10;

                                                        // calculate start & end
                                                        let start = Math.max(1, currentPage - Math.floor(windowSize / 2));
                                                        let end = start + windowSize - 1;

                                                        if (end > totalPages) {
                                                            end = totalPages;
                                                            start = Math.max(1, end - windowSize + 1);
                                                        }

                                                        return [...Array(end - start + 1)].map((_, i) => {
                                                            const page = start + i;
                                                            return (
                                                                <button
                                                                    key={page}
                                                                    className={currentPage === page ? "active" : ""}
                                                                    onClick={() => handlePage({page})}
                                                                    aria-label={`Page ${page}`}
                                                                >
                                                                    {page}
                                                                </button>
                                                            );
                                                        });
                                                    })()}

                                                    {/* Next button */}
                                                    <button
                                                        disabled={meta?.current_page >= meta?.last_page}
                                                        onClick={() => handlePage({page : (meta?.current_page + 1)})}
                                                        aria-label="Next"
                                                    >
                                                        Next
                                                    </button>
                                                </div>

                                            </div>
                </div>
            </section>
        </div>
    )
}

export default BlogCategory;