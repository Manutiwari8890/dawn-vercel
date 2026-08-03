"use client"

import Link from "next/link";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { WishListContext } from "@/context/WishListContext";
import { useLoader } from "@/context/LoaderContext";
import AccountSidebar from "@/components/AccountSidebar";

export default function Page() {
    const { logout } = useContext(AuthContext);
    const { wishList, toggleWishlist, wishlistLoadingIds, fetchWishList } = useContext(WishListContext);
    const { startLoading, stopLoading } = useLoader();

    function checkWishlist(id) {
        return wishList.some(item => item.id === id);
    }

    useEffect(() => {
        const loadWishlist = async () => {
            startLoading();
            await fetchWishList(); // fills context state
            stopLoading();
        };
        loadWishlist();
    }, []);

    return (
        <>
            <section className="page-title">
                <div className="container">
                    <div className="title-wrapper">
                        <div className="title">
                            <h1>My WishList</h1>
                        </div>
                    </div>
                </div>
            </section>
            <section className="account-wrapper">
                <div className="container">
                    <div className="row">
                        {/* Sidebar */}
                        <div className="col-md-25">
                            <AccountSidebar />
                        </div>

                        {/* Wishlist Content */}
                        <div className="col-md-75">
                            <div className="widget">
                                <h4>My Wishlist</h4>
                                <div className="row">
                                    {wishList?.length > 0 ? (
                                        <div className="product-wrapper wishlist">
                                            {wishList.map(pro => (
                                                
                                                <div className="product-list-content" key={pro.id}>
                                                    <div className="row">
                                                        <div className="col-md-1">
                                                            <div className="img-area">
                                                                <img src={pro?.image_url} alt={pro?.name} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-15">
                                                            <h2 className="product_sku">
                                                                <span className="badge badge-yellow">{pro?.sku}</span>
                                                            </h2>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <h2 className="product_title">
                                                                <Link href={`/product/${pro?.slug}`}> {pro?.name}</Link>
                                                            </h2>
                                                        </div>
                                                        <div className="col-md-15">
                                                            <span className="price">$ {pro?.price}</span>
                                                        </div>
                                                        {pro?.brands &&
                                                            <div className="col-md-15">
                                                                <h2 className="brand_name">
                                                                    <Link href={`/product-category/all-brands/${pro.brands[0].slug}`}>
                                                                        {pro.brands[0].name}
                                                                    </Link>
                                                                </h2>
                                                            </div>
                                                        }

                                                        <div className="col-md-15">
                                                            <div className="btn-area">
                                                                <Link href={`/product/${pro?.slug}`} >
                                                                    <span className="icon">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="18" height="18"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor" /><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor" /></svg>
                                                                    </span>
                                                                </Link>
                                                                <button
                                                                    onClick={() => toggleWishlist(pro.id)}
                                                                    className={`${checkWishlist(pro.id) ? "active" : ""}`}
                                                                    disabled={wishlistLoadingIds.includes(pro.id)}
                                                                    aria-label="Wishlist"
                                                                >
                                                                    <span className="icon">
                                                                        {wishlistLoadingIds.includes(pro.id) ? (
                                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="18" height="18" className="loading"><path d="M272 112C272 85.5 293.5 64 320 64C346.5 64 368 85.5 368 112C368 138.5 346.5 160 320 160C293.5 160 272 138.5 272 112zM272 528C272 501.5 293.5 480 320 480C346.5 480 368 501.5 368 528C368 554.5 346.5 576 320 576C293.5 576 272 554.5 272 528zM112 272C138.5 272 160 293.5 160 320C160 346.5 138.5 368 112 368C85.5 368 64 346.5 64 320C64 293.5 85.5 272 112 272zM480 320C480 293.5 501.5 272 528 272C554.5 272 576 293.5 576 320C576 346.5 554.5 368 528 368C501.5 368 480 346.5 480 320zM139 433.1C157.8 414.3 188.1 414.3 206.9 433.1C225.7 451.9 225.7 482.2 206.9 501C188.1 519.8 157.8 519.8 139 501C120.2 482.2 120.2 451.9 139 433.1zM139 139C157.8 120.2 188.1 120.2 206.9 139C225.7 157.8 225.7 188.1 206.9 206.9C188.1 225.7 157.8 225.7 139 206.9C120.2 188.1 120.2 157.8 139 139zM501 433.1C519.8 451.9 519.8 482.2 501 501C482.2 519.8 451.9 519.8 433.1 501C414.3 482.2 414.3 451.9 433.1 433.1C451.9 414.3 482.2 414.3 501 433.1z" fill="currentColor" /></svg>
                                                                        ) : (
                                                                            checkWishlist(pro?.id) ?
                                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="18" height="18"><path d="M305 151.1L320 171.8L335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1L576 231.7C576 343.9 436.1 474.2 363.1 529.9C350.7 539.3 335.5 544 320 544C304.5 544 289.2 539.4 276.9 529.9C203.9 474.2 64 343.9 64 231.7L64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1z" fill="currentColor" /></svg> :
                                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="18" height="18"><path d="M442.9 144C415.6 144 389.9 157.1 373.9 179.2L339.5 226.8C335 233 327.8 236.7 320.1 236.7C312.4 236.7 305.2 233 300.7 226.8L266.3 179.2C250.3 157.1 224.6 144 197.3 144C150.3 144 112.2 182.1 112.2 229.1C112.2 279 144.2 327.5 180.3 371.4C221.4 421.4 271.7 465.4 306.2 491.7C309.4 494.1 314.1 495.9 320.2 495.9C326.3 495.9 331 494.1 334.2 491.7C368.7 465.4 419 421.3 460.1 371.4C496.3 327.5 528.2 279 528.2 229.1C528.2 182.1 490.1 144 443.1 144zM335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1C576 297.7 533.1 358 496.9 401.9C452.8 455.5 399.6 502 363.1 529.8C350.8 539.2 335.6 543.9 320 543.9C304.4 543.9 289.2 539.2 276.9 529.8C240.4 502 187.2 455.5 143.1 402C106.9 358.1 64 297.7 64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1L320 171.8L335 151.1z" fill="currentColor" /></svg>
                                                                        )}
                                                                    </span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="empty-wrapper">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="18" height="18"><path d="M442.9 144C415.6 144 389.9 157.1 373.9 179.2L339.5 226.8C335 233 327.8 236.7 320.1 236.7C312.4 236.7 305.2 233 300.7 226.8L266.3 179.2C250.3 157.1 224.6 144 197.3 144C150.3 144 112.2 182.1 112.2 229.1C112.2 279 144.2 327.5 180.3 371.4C221.4 421.4 271.7 465.4 306.2 491.7C309.4 494.1 314.1 495.9 320.2 495.9C326.3 495.9 331 494.1 334.2 491.7C368.7 465.4 419 421.3 460.1 371.4C496.3 327.5 528.2 279 528.2 229.1C528.2 182.1 490.1 144 443.1 144zM335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1C576 297.7 533.1 358 496.9 401.9C452.8 455.5 399.6 502 363.1 529.8C350.8 539.2 335.6 543.9 320 543.9C304.4 543.9 289.2 539.2 276.9 529.8C240.4 502 187.2 455.5 143.1 402C106.9 358.1 64 297.7 64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1L320 171.8L335 151.1z" fill="currentColor"></path></svg>
                                            <h2>WishList is Empty</h2>
                                            <Link href="/product-category" className="btn btn-primary">Return To Shop</Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

