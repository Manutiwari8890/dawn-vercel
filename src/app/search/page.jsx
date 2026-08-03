"use client"
import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useLoader } from '@/context/LoaderContext';
import { AuthContext } from '@/context/AuthContext';
import { WishListContext } from '@/context/WishListContext';
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export default function Page() {
    const searchParams = useSearchParams();
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    
    const [mobileFilter, setMobileFilter] = useState(false);
    const { startLoading, stopLoading } = useLoader();
    const { isLoggedIn } = useContext(AuthContext);
    const [loadBrand, setLoadBrand] = useState(false);
    const [loadSize, setLoadSize] = useState(false);
    const { toggleWishlist, wishlistLoadingIds, wishList, fetchWishList } = useContext(WishListContext);
    const [sizes, setSizes] = useState(() => searchParams.getAll("size[]") || []);

    const pathName = usePathname();
    const searchValue = searchParams.get('s');
    const [meta, setMeta] = useState({});
    const [page, setPage] = useState(1);
    const router = useRouter();

    const value = searchValue || pathName?.state?.s || '';
    const [products, setProducts] = useState([]);

    const [range, setRange] = useState([0, 1]); // min, max
    const [initPrice, setinitPrice] = useState({
        min: 0,
        max: 1
    });

    useEffect(() => {
        startLoading();
        const num = searchParams.get("page");
        const sizeParams = searchParams
        .getAll("size[]")
        .map(size => `size[]=${encodeURIComponent(size)}`)
        .join("&");
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${baseUrl}products-search?name=${value}${num ? `&page=${num}` : ""}${searchParams?.get("price_min") ? `&price_min=${searchParams?.get("price_min")}&price_max=${searchParams?.get("price_max")}` : ""}${searchParams?.get("brand") ? `&brand=${searchParams?.get("brand")}` : ""}${sizeParams ? `&${sizeParams}` : ""}`, {
                    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch product data');
                }
                const data = await response.json();
                setProducts(data.data);
                setMeta(data.meta)
                setinitPrice({ min: data?.meta?.min_price, max: data?.meta?.max_price })
                setRange([searchParams.get("price_min") || data?.meta?.min_price, searchParams.get("price_max") || data?.meta?.max_price])
                stopLoading();
            } catch (err) {
                console.error(err.message);
            }
        };

        if (value) {
            fetchProduct();
        }
    }, [value, searchParams]);

    function checkWishlist(id) {
        return wishList.some(item => item.id === id);
    }

    const handlePage = (page) => {
        router.push(`/search?s=${searchValue}&page=${page}`)
        setPage(page)
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const applyFilter = (p = null, b = null) => {
        const pageFilter = p || searchParams.get("page") || 1;
        const brand = b || searchParams.get("brand");
        const size = searchParams.get("size[]");
        if (p) {
            setPage(pageFilter);
        }
        //let params = { s: searchValue, price_min: range[0], price_max: range[1], page: pageFilter, brand: brand }
        const params = new URLSearchParams(searchParams.toString());

        params.set("s", searchValue);
        params.set("price_min", String(range[0]));
        params.set("price_max", String(range[1]));
        params.set("page", String(pageFilter));

        if (brand) {
            params.set("brand", brand);
        } else {
            params.delete("brand");
        }

        params.delete("size[]");
        if (size) {
            if (Array.isArray(size)) {
                size.forEach((item) => params.append("size[]", item));
            } else {
                params.append("size[]", size);
            }
        }

        router.push(`${pathname}?${params.toString()}`);
    }

    const removeFilter = (key) => {
        let para = { s: searchParams.get("s"), price_min: range[0], price_max: range[1], page: searchParams.get("page"), brand: searchParams.get("brand") };
        if (key == "all") {
            para = { s: searchParams.get("s"), page: searchParams.get("page") }
        }
        if (key == "brand") delete para.brand
        if (key == "price") { delete para.price_min; delete para.price_max }
        searchParams.set(para)
    }

    const handleSizes = (e) => {
        const val = e.target.value
        let updated = [];
        setSizes(prev => {
                if(prev.includes(val)){
                    updated = prev?.filter(p => p!=val)
                }
                else{
                    updated = [...prev, val]
                }
                return updated;
            }
        );        

    }

    useEffect(() => {
            const params = new URLSearchParams(searchParams);
            params.delete("size[]");

            if (searchParams.get("s")) params.set("s", searchParams.get("s"));
            if (searchParams.get("price_min")) {
                params.set("price_min", searchParams.get("price_min"));
                params.set("price_max", searchParams.get("price_max"));
            }
            if (searchParams.get("page")) params.set("page", searchParams.get("page"));
            if (searchParams.get("brand")) params.set("brand", searchParams.get("brand"));
            if(sizes?.length>0){
                // 👇 array style
                sizes.forEach(size => {
                    params.append("size[]", size);
                });
            }
          router.replace(`${pathName}?${params.toString()}`);
    }, [sizes]);

    return (
        <>
            <section className="page-title mobile_cate search-title">
                <div className="container">
                    <div className="title-wrapper">
                        <div className="title">
                            <h1>Search Results For : “ {value} ”{sizes}</h1>
                        </div>
                        <div className="title">
                            <button className="sort-icon mt-1" aria-label="Toggle Filter" onClick={() => setMobileFilter(prev => !prev)}>
                                <span className="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="list" width="18" height="18"><path d="M104 112C90.7 112 80 122.7 80 136L80 184C80 197.3 90.7 208 104 208L152 208C165.3 208 176 197.3 176 184L176 136C176 122.7 165.3 112 152 112L104 112zM256 128C238.3 128 224 142.3 224 160C224 177.7 238.3 192 256 192L544 192C561.7 192 576 177.7 576 160C576 142.3 561.7 128 544 128L256 128zM256 288C238.3 288 224 302.3 224 320C224 337.7 238.3 352 256 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L256 288zM256 448C238.3 448 224 462.3 224 480C224 497.7 238.3 512 256 512L544 512C561.7 512 576 497.7 576 480C576 462.3 561.7 448 544 448L256 448zM80 296L80 344C80 357.3 90.7 368 104 368L152 368C165.3 368 176 357.3 176 344L176 296C176 282.7 165.3 272 152 272L104 272C90.7 272 80 282.7 80 296zM104 432C90.7 432 80 442.7 80 456L80 504C80 517.3 90.7 528 104 528L152 528C165.3 528 176 517.3 176 504L176 456C176 442.7 165.3 432 152 432L104 432z" fill="currentColor"></path></svg>
                                </span>
                                More Products<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="16" height="16"><path d="M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z" fill="currentColor"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="search-products widget ">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-3">
                            <div className={`mobile_filter ${mobileFilter ? "active" : ""}`}>
                                <div className="m_filter_title">
                                    <h2>Search by Links</h2>
                                    <button aria-label="Close" onClick={() => setMobileFilter(prev => !prev)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="18" height="18"><path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" fill="currentColor"></path></svg>
                                    </button>
                                </div>
                                {meta?.filter_brands?.length > 0 &&
                                    <div className={`widget search-result`}>
                                        <h4>Brands</h4>
                                        <ul className={`brand-wrapper ${loadBrand ? "active" : ""}`}>
                                            {
                                                meta?.filter_brands?.map(brand => (
                                                    <li key={brand?.id}>
                                                        <button onClick={() => applyFilter(null, brand.slug)} aria-label={brand.slug}>{brand.name}</button>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                        <button className="load-btn" onClick={() => { setLoadBrand((prev) => !prev); window.scrollTo({ top: 0, left: 0, behavior: "smooth" }) }}>{loadBrand ? "Read less" : "Load More"}</button>
                                    </div>
                                }
                                {meta?.uniqueSizes?.length > 0 &&
                                    <div className="widget size-filter">
                                        <h4>Size</h4>
                                        <div className={`grid-wrapper ${loadSize ? "active" : ""}`}>
                                            {meta?.uniqueSizes?.map((size, index) => (
                                                    <div className="form-check" key={size?.slug}>
                                                        <input type="checkbox" value={size?.slug} id={size?.slug} checked={sizes?.includes(size?.slug) ? true : false} onChange={handleSizes} className="form-check-input"  />
                                                        <label htmlFor={size?.slug}>{size?.name}</label>
                                                    </div>
                                            ))}
                                        </div>
                                        <button className="load-btn" onClick={() => { setLoadSize((prev) => !prev); window.scrollTo({ top: 0, left: 0, behavior: "smooth" }) }}>{loadSize ? "Read less" : "Load More"}</button>
                                    </div>
                                }
                                <div className="widget">
                                    <h4>Price</h4>
                                    {initPrice?.min == initPrice?.max ?
                                        <h6 className="price-desc">Only one price available: <span>${initPrice?.min}</span></h6> :
                                        <>
                                            <Slider
                                                range
                                                min={initPrice?.min}
                                                max={initPrice?.max}
                                                allowCross={true} // prevents handles from crossing
                                                value={range}
                                                onChange={(val) => { setRange(val) }}
                                                trackStyle={[{ backgroundColor: "#fab214" }]} // track color
                                                handleRender={(node, props) => {

                                                    return (
                                                        <div
                                                            style={{
                                                                position: "relative",
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position: "absolute",
                                                                    bottom: "12px",
                                                                    left: ((props?.value / initPrice?.max) * 100).toFixed(2) + "%",
                                                                    transform: "translateX(-50%)",
                                                                    background: "#fab214",
                                                                    color: "#fff",
                                                                    padding: "2px 6px",
                                                                    borderRadius: "4px",
                                                                    fontSize: "9px",
                                                                    whiteSpace: "nowrap",
                                                                    pointerEvents: "none",
                                                                }}
                                                            >
                                                                ${props.value}
                                                            </div>
                                                            {node}
                                                        </div>
                                                    )
                                                }}
                                                handleStyle={[
                                                    { borderColor: "#fab214", height: 20, width: 20 }, // left handle
                                                    { borderColor: "#fab214", height: 20, width: 20 }  // right handle
                                                ]}
                                            />
                                            <div className="range-desc">
                                                <h5 className="range-values"> ${initPrice?.min} - ${initPrice?.max}</h5>
                                                <button onClick={() => applyFilter()} className="btn btn-primary" aria-label="Price Filter">Filter</button>
                                            </div>
                                        </>
                                    }

                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="widget archive-products">
                                <div className="sorting-wrapper">
                                    <div className="text">
                                        {meta?.current_page &&
                                            <span>Showing {(20 * (meta?.current_page - 1)) + 1}-{products?.length + (20 * (meta?.current_page - 1))} of {meta?.total} Results</span>
                                        }
                                    </div>
                                    <div className="applied-filters">
                                        {searchParams.get("brand") && (
                                            <span className="filter-tag">
                                                <span className="badge badge-info"><b>Brand</b> : {searchParams.get("brand")}</span>
                                                <button onClick={() => removeFilter("brand")} className="remove-item" aria-label="Clear Filter">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="12" height="12"><path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" fill="currentColor" /></svg>
                                                </button>
                                            </span>
                                        )}

                                        {searchParams.get("price_min") && (
                                            <span className="filter-tag">
                                                <span className="badge badge-success"><b>Price : </b>${searchParams.get("price_min")} - ${searchParams.get("price_max")}</span>
                                                <button onClick={() => removeFilter("price")} className="remove-item" aria-label="Clear Filter">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="12" height="12"><path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" fill="currentColor" /></svg>
                                                </button>
                                            </span>
                                        )}

                                        {(searchParams.get("price_min") || searchParams.get("brand")) && (
                                            <button className="badge badge-danger" onClick={() => removeFilter("all")} aria-label="Remove Filter">
                                                Clear All
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="product-wrapper">
                                {products.map(pro => (
                                    <div className="product-list-content" key={pro?.id}>
                                        <div className="row">
                                            {/* <div className="col-md-1">
                                                <div className="img-area">
                                                    <img src={pro?.image_url} alt={pro?.name} loading="lazy" />
                                                </div>
                                            </div> */}
                                            <div className="col-md-2">
                                                <h2 className="product_sku">
                                                    <span className="badge badge-yellow">{pro?.sku}</span>
                                                </h2>
                                            </div>
                                            <div className="col-md-4">
                                                <h2 className="product_title">
                                                    <Link href={`/product/${pro?.slug}`}> {pro?.name}</Link>
                                                </h2>
                                                {pro?.brands.length > 0 &&
                                                    <h2 className="brand_name">
                                                        <Link href={`/brand/${pro?.brands[0].slug}`}>{pro?.brands[0].name}</Link>
                                                    </h2>
                                                }
                                            </div>
                                            <div className="col-md-25 text-center">
                                                <Link href={`/product/${pro?.slug}`}>
                                                    {(pro?.variations.length > 1) ?
                                                        <>
                                                            {(isLoggedIn && pro?.variations[0].price != pro?.variations[pro?.variations.length - 1].price) ?
                                                                <>
                                                                    {(pro?.variations[pro?.variations.length - 1].discounted_price > 0 && pro?.variations[pro?.variations.length - 1]?.stock > 0) ?
                                                                        <>
                                                                            <del>${pro?.variations.map(v => Number(v["sell_price"])).filter(price => price > 0).reduce((pre, next) => Math.min(pre, next), Infinity)} - ${pro?.variations.map(v => Number(v["price"])).filter(price => price > 0).reduce((pre, next) => Math.max(pre, next), -Infinity)}</del>
                                                                            <p className="price">${pro?.variations.map(v => Number(v["discounted_price"])).filter(price => price > 0).reduce((pre, next) => Math.min(pre, next), Infinity)} - ${pro?.variations.map(v => Number(v["discounted_price"])).filter(price => price > 0).reduce((pre, next) => Math.max(pre, next), -Infinity)}</p>
                                                                        </> : <p className="price">Inquiry Now</p>
                                                                    }

                                                                </> :
                                                                <>
                                                                    <p>
                                                                        <span className="price">
                                                                            {(pro?.variations[pro?.variations.length - 1].discounted_price > 0 && pro?.variations[pro?.variations.length - 1]?.stock > 0) ?
                                                                                `$${pro?.variations.map(v => Number(v["discounted_price"])).filter(price => price > 0).reduce((pre, next) => Math.min(pre, next), Infinity)} - $${pro?.variations.map(v => Number(v["discounted_price"])).filter(price => price > 0).reduce((pre, next) => Math.max(pre, next), -Infinity)}` : 'Inquiry Now'
                                                                            }
                                                                        </span>
                                                                    </p>

                                                                </>
                                                            }
                                                        </> :
                                                        <>
                                                            {(isLoggedIn && pro?.price != pro?.discounted_price) ?
                                                                <>
                                                                    <del>${pro?.price}</del>
                                                                    <span className="price"> ${pro?.discounted_price}</span>
                                                                </> :
                                                                <span className="price">{pro?.price > 0 ? '$' + pro?.price : 'Inquiry Now'}</span>
                                                            }
                                                        </>
                                                    }
                                                </Link>
                                            </div>
                                            <div className="col-md-15">
                                                <div className="btn-area">
                                                    <Link href={`/product/${pro?.slug}`} >
                                                        <span className="icon">
                                                            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="18" height="18"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor" /><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor" /></svg>
                                                        </span>
                                                    </Link>
                                                    <button
                                                        onClick={() => toggleWishlist(pro?.id)}
                                                        className={`${checkWishlist(pro?.id) ? "active" : ""}`}
                                                        disabled={wishlistLoadingIds.includes(pro?.id)}
                                                        aria-label="Add To Wishlist">
                                                        <span className="icon">
                                                            {wishlistLoadingIds.includes(pro.id) ? (
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="loading" width="18" height="18"><path d="M272 112C272 85.5 293.5 64 320 64C346.5 64 368 85.5 368 112C368 138.5 346.5 160 320 160C293.5 160 272 138.5 272 112zM272 528C272 501.5 293.5 480 320 480C346.5 480 368 501.5 368 528C368 554.5 346.5 576 320 576C293.5 576 272 554.5 272 528zM112 272C138.5 272 160 293.5 160 320C160 346.5 138.5 368 112 368C85.5 368 64 346.5 64 320C64 293.5 85.5 272 112 272zM480 320C480 293.5 501.5 272 528 272C554.5 272 576 293.5 576 320C576 346.5 554.5 368 528 368C501.5 368 480 346.5 480 320zM139 433.1C157.8 414.3 188.1 414.3 206.9 433.1C225.7 451.9 225.7 482.2 206.9 501C188.1 519.8 157.8 519.8 139 501C120.2 482.2 120.2 451.9 139 433.1zM139 139C157.8 120.2 188.1 120.2 206.9 139C225.7 157.8 225.7 188.1 206.9 206.9C188.1 225.7 157.8 225.7 139 206.9C120.2 188.1 120.2 157.8 139 139zM501 433.1C519.8 451.9 519.8 482.2 501 501C482.2 519.8 451.9 519.8 433.1 501C414.3 482.2 414.3 451.9 433.1 433.1C451.9 414.3 482.2 414.3 501 433.1z" fill="currentColor" /></svg>
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
                            <div className="row">
                                <div className="pagination">
                                    {/* Previous button */}
                                    <button
                                        disabled={meta?.current_page < 2}
                                        onClick={() => handlePage(meta?.current_page - 1)}
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
                                                    onClick={() => handlePage(page)}
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
                                        onClick={() => handlePage(meta?.current_page + 1)}
                                        aria-label="Next"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                            {(meta?.categories?.length > 0 || meta?.brands?.length > 0) &&
                                <div className="row justify-content-center category-result-wrapper">
                                    <div className="col-md-10">
                                        <div className="product-wrapper">
                                            <div className="product-list-content p-3">
                                                {meta?.categories?.length > 0 &&
                                                    <>
                                                        <h4>Category</h4>
                                                        <div className="row gap-15">
                                                            {meta?.categories?.map(cat => (
                                                                <Link href={`/product-category/${cat?.slug}`} className="text-base font-semibold hover:text-primary" key={cat?.id}><span className="inline-block w-2 h-2 bg-primary/80 rounded-full mr-2"></span>{cat?.name}</Link>
                                                            ))}
                                                        </div>
                                                    </>
                                                }
                                                {meta?.brands?.length > 0 &&
                                                    <>
                                                        <h4 className="mt-4">Brands</h4>
                                                        <div className="row gap-15">
                                                            {meta?.brands?.map(brand => (
                                                                <Link href={`/brand/${brand?.slug}`} className="text-base font-semibold hover:text-primary" key={brand?.id}><span className="inline-block w-2 h-2 bg-primary/80 rounded-full mr-2"></span>{brand?.name}</Link>
                                                            ))}
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

