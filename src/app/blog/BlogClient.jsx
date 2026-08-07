"use client"

import { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import { useLoader } from "@/context/LoaderContext";

export default function BlogClient() {
    const { startLoading, stopLoading } = useLoader();
    const [blogs, setBlogs] = useState([]);
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    useEffect(() => {
        startLoading();
        const fetchBlog = async () => {
            try {
                const response = await fetch(`${baseUrl}blogs`); // Example API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch product data');
                }
                const data = await response.json();
                setBlogs(data['data'])
                stopLoading();
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchBlog();
    },
        []);

    return (
        <>
            <div className="blog_page">
                <section className="page-title">
                    <div className="container">
                        <div className="title-wrapper">
                            <div className="title">
                                <h1>Our Latest News & Blog</h1>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="knowledge">
                    <div className="container">
                        {blogs &&
                            blogs?.map((blog) => (
                                <Fragment key={blog?.id}>
                                    <div className="title">
                                        <h2>{blog?.name}</h2>
                                    </div>
                                    <div className="row">
                                        {blog['blogs']?.map((single) => (
                                            <div className="col-md-25" key={single?.id}>
                                                <div className="article">
                                                    <div className="img-container">
                                                        <img src={single?.image_url} alt="" />
                                                    </div>
                                                    <div className="title">
                                                        <h3>{single?.title}</h3>
                                                    </div>
                                                    <div className="btn-area mt-2">
                                                        <Link href={`/blog/detail/${single?.slug}`} className="btn btn-primary w-100">
                                                            Read More 
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="20" height="20"><path d="M566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3C348.8 149.8 348.8 170.1 361.3 182.6L466.7 288L96 288C78.3 288 64 302.3 64 320C64 337.7 78.3 352 96 352L466.7 352L361.3 457.4C348.8 469.9 348.8 490.2 361.3 502.7C373.8 515.2 394.1 515.2 406.6 502.7L566.6 342.7z" fill="currentColor" /></svg>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="btn-wrap">
                                        <Link href={`/blogs/${blog?.slug}`} className="btn btn-secondary">SEE MORE</Link>
                                    </div>
                                </Fragment>
                            ))
                        }
                    </div>
                </section>
            </div>
        </>

    )
}

