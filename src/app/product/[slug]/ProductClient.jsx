"use client";

import { useContext, useEffect, useState, useRef } from 'react'
import Link from 'next/link';
import { useParams, useRouter } from "next/navigation";

import Quantity from '@/components/Quantity';
import { CartContext } from '@/context/cart';
import { AuthContext } from '@/context/AuthContext';
import ZoomImage from '@/components/ZoomImage';
import { useLoader } from '@/context/LoaderContext';
import { WishListContext } from '@/context/WishListContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {
  loadCaptchaEnginge,
  LoadCanvasTemplateNoReload ,
  validateCaptcha
} from "react-simple-captcha";
import { useUI } from '@/context/UiContext';


export default function ProductClient({ initialData  }) {
    const navigate = useRouter();
    const { toggleCart } = useUI()
    const [token, setToken] = useState(null);
    const [popStatus, setPopStatus] = useState(false);
    const [captchaInput, setCaptchaInput] = useState("");

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const { toggleWishlist, getWishList, wishlistLoadingIds, fetchWishList, wishList } = useContext(WishListContext);
    const { startLoading, stopLoading } = useLoader();
    const [loadingButton, setLoadingButton] = useState(null);

    const [encodedUrl, setEncodedUrl] = useState("");
    const [encodedTitle, setEncodedTitle] = useState("");
    const [encodedImage, setEncodedImage] = useState("");
    const [captchaMessage, setCaptchaMessage] = useState("");

    useEffect(() => {
        setToken(localStorage.getItem("token"))
        loadCaptchaEnginge(6)
    }, [])

    let { slug } = useParams()
    const { user, logout, isLoggedIn } = useContext(AuthContext);

    const [data, setData] = useState(initialData);
    const [quantity, setQuantity] = useState({});
    const [equantity, setEquantity] = useState(0);
    const [lowest, setLowest] = useState([0, 0]);
    const handleQuantityChange = (Id, value) => {
        setQuantity((prev) => ({
            ...prev,
            [Id]: value >= 1 ? value : 0,
        }));
    };

    const [productTab, setProductTab] = useState(1);

    const { cartItems, addToCart, recentlyViewed } = useContext(CartContext)
    
    const [ratingMes, setRatingMes] = useState("");
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [revLoad, setRevLoad] = useState(false);
    const [rmessage, setRmessage] = useState({
        type: false,
        value: "",
    });

    const [reviews, setReviews] = useState([]);
    const [bigImg, setBigImg] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const [bfname, setBfname] = useState("");
    const [blname, setBlname] = useState("");
    const [bemail, setBemail] = useState("");
    const [bnumber, setBnumber] = useState("");
    const [bcompany, setBcompany] = useState("");
    const [blocation, setBlocation] = useState("");
    const [bmessage, setBmessage] = useState("");
    const [bulkMessage, setBulkmessage] = useState("");

    function normalizeSlug(slug) {
        let encoded = encodeURIComponent(slug);
        encoded = encoded.replace(/%2D/g, "-");
        return encoded.toLowerCase();
    } 

    useEffect(() => {
        startLoading();
        const getDetails = async () => {
                    await fetchWishList();
                    
                    recentlyViewed(initialData)
                    if(initialData.variations){
                        const minSell = initialData?.variations 
                        .map(v => Number(v["sell_price"])) .filter(price => price > 0) 
                        .reduce((pre, next) => Math.min(pre, next), Infinity); 

                        const minDiscount = initialData?.variations 
                        .map(v => Number(v["discounted_price"])) .filter(price => price > 0) 
                        .reduce((pre, next) => Math.min(pre, next), Infinity); 
                        setLowest([minSell, minDiscount])
                    }
                    setEncodedTitle(initialData.name)
                    setEncodedUrl(`https://dawn-project.vercel.app/product/${initialData.name}`)
                    setEncodedImage(initialData.image_url);
                    stopLoading()
                }
        getDetails();
    },
        [slug]);

    useEffect(() => {
        const getReview = async () => {
            try {
                const res = await fetch(`${baseUrl}products/${data?.id}/reviews?per_page=5`);
                if (!res.ok) {
                    throw new Error("Review Fetch Failed");
                }
                const result = await res.json();
                if (result.status) {
                    setReviews(result.data)
                }
            } catch (err) {
                console.error(err)
            }
        }

        if (data?.id) {
            getReview();
        }

    }, [rmessage, data]);

    const handleAddToCart = async (id, qty, variation_id = null) => {
        const currentKey = id || variation_id; // store locally
        setLoadingButton(currentKey);
        const product = { ...data, quantity: qty, variation_id };
        const res = await addToCart(product);

        if (res) {
            toggleCart(); // open the sidebar
            setLoadingButton(null);
        }
    };


    const handleBulk = (e) => {
        e.preventDefault();
        let regobj = {
            product_id: data.id,
            first_name: bfname,
            last_name: blname,
            contact_no: bnumber,
            email: bemail,
            company: bcompany,
            location: blocation,
            message: bmessage,
            quantity : Number(equantity),
            "cf-turnstile-response" : null
        };

        if(validateCaptcha(captchaInput)){
            setIsLoading(true);
            fetch(`${baseUrl}bulk-inquiry`, {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(regobj)
            }).then((response) => {
                return response.json().then((data) => ({
                    status: response.status,
                    body: data,
                }))
            }).then(({ status, body }) => {
                setBulkmessage(body.message);
                setBfname("");
                setBlname("");
                setBemail("");
                setBnumber("");
                setBcompany("");
                setBlocation("");
                setBmessage("");
                setEquantity("");
                setIsLoading(false);
                loadCaptchaEnginge(6);
                setCaptchaMessage("");
                setCaptchaInput("");                       
            }).catch((err) => {
                setBulkmessage("Validation error: " + err.message);
            })
        }else{
            setCaptchaMessage("captcha Wrong")
        }
        
    }
    const checkWishlist = (id) => {
        return wishList.some(item => item.id === id);
    }


    const handleRating = async (e) => {
        e.preventDefault();
        if (!ratingMes) {
            setRmessage({
                type: false,
                value: "Message Required !"
            })
            return;
        }

        setRevLoad(true);
        const ratData = {
            product_id: data?.id,
            rating: rating,
            description: ratingMes
        }
        try {
            const response = await fetch(`${baseUrl}reviews`, {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
                body: JSON.stringify(ratData)
            });
            if (!response.ok) {
                throw new Error("Rating Fetched Failed");
            }
            const result = await response.json();
            setRmessage({
                type: result.status,
                value: result.message
            })

        } catch (err) {
            console.error(err)
        } finally {
            setRevLoad(false);
        }

    }

    const handlePhone = (e) => {
        let value = e.target.value;
        value = value.replace(/[^\d+]/g, "");
        if (value.length > 15) {
            value = value.slice(0, 15);
        }
        setBnumber(value)
    }

    const schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: data?.name,
        image: [
            "https://example.com/images/iphone.jpg"
        ],
        description: data?.short_description || data?.name,
        brand: {
            "@type": "Brand",
            name: data?.brands?.[0]?.name
        },
        offers: {
            "@type": "Offer",
            price: data?.discounted_price,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock"
        }
    };


    return (
        <>
            <div className={`enquiry-modal modal ${popStatus ? 'active' : ''}`} id="demo-modal"
                onClick={(e) => {
                    if (e.target.classList.contains("enquiry-modal")) {
                        const wrapper = document.querySelector(".enquiry-modal .form-wrapper");
                        wrapper.classList.add("animate-bounce");
                        wrapper.addEventListener("animationend", () => {
                        wrapper.classList.remove("animate-bounce");
                        }, { once: true });
                    }
                    }}
            >
                <div className={`form-wrapper widget ${isLoading ? "loading-wrapper" : ""}`}>
                    <div className="logo">
                        <img src="/assets/images/Website-logo-1.webp" alt={data?.name} loading="lazy" />
                    </div>
                    <form onSubmit={handleBulk}>
                        <div className="row">
                            <div className="col-md-33">
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input type="text" className="form-control" placeholder="Enter your first name" value={bfname} onChange={(e) => setBfname(e.target.value)} required />
                                </div>
                            </div>
                            <div className="col-md-33">
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input type="text" className="form-control" placeholder="Enter your last name" value={blname} onChange={(e) => setBlname(e.target.value)} required />
                                </div>
                            </div>
                            <div className="col-md-33">
                                <div className="form-group">
                                    <label>Contact Number</label>
                                    <input type="tel" className="form-control" max="15" placeholder="Enter your contact number" value={bnumber} onChange={(e) => handlePhone(e)} required />
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" className="form-control" placeholder="Enter your email" value={bemail} onChange={(e) => setBemail(e.target.value)} required />
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="form-group">
                                    <label>Company</label>
                                    <input type="text" className="form-control" placeholder="Enter your company name" value={bcompany} onChange={(e) => setBcompany(e.target.value)} required />
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="form-group">
                                    <label>Location</label>
                                    <input type="text" className="form-control" placeholder="Location" value={blocation} onChange={(e) => setBlocation(e.target.value)} required />
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="form-group">
                                    <label>Message</label>
                                    <textarea maxLength="200" placeholder="Message . . ." onChange={(e) => setBmessage(e.target.value)} value={bmessage} required></textarea>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="form-group">
                                    <label>Quantity</label>
                                    <input type="number" min="1" placeholder="Quantity" value={equantity} onChange={(e) => setEquantity(e.target.value)}  required />
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="form-group">
                                    <label>Product Name</label>
                                    <input type="text" placeholder="Product" defaultValue={data?.name} readOnly={true} />
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="form-group">
                                    <label htmlFor="captcha">Enter Captcha Value</label>
                                    <input
                                        type="text"
                                        id="captcha"
                                        className="form-control"
                                        placeholder="Enter Captcha"
                                        value={captchaInput}
                                        onChange={(e) => setCaptchaInput(e.target.value)}
                                    />
                                    {captchaMessage && <p className="error">{captchaMessage}</p>}
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="captcha-wrapper mt-25">
                                    <LoadCanvasTemplateNoReload />
                                    <button className="reload-captcha" type="button" onClick={() => loadCaptchaEnginge(6)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" id="Isolation_Mode" data-name="Isolation Mode" viewBox="0 0 24 24" width="24" height="24"><path d="M21,12a9.038,9.038,0,1,1-2.647-6.353L16,8h5.909A1.09,1.09,0,0,0,23,6.909V1L20.471,3.529A11.98,11.98,0,1,0,24,12Z" /></svg>
                                    </button>
                                </div>
                            </div>
                            
                        </div>
                        {bulkMessage && <p className="success">{bulkMessage}</p>}
                        <button className={`btn btn-primary w-100 mt-2 ${isLoading ? "loading" : ""}`} aria-label="Submit">{!isLoading ? "Submit" : ""}</button>
                    </form>
                </div>
                <button type="button" className="modal__close" onClick={() => {
                    setPopStatus(false)
                    document.documentElement.style.overflow = "auto";
                }} aria-label="Close Modal">&times;</button>
            </div>
            
            <section className="single-main">
                <div className="container">
                    <div className="row">
                        <div className="col-md-10">
                              <nav aria-label="breadcrumb" className="breadcrumb">
                                    <ul className="flex items-center gap-2 text-sm">
                                        <li>
                                            <Link href="/">Home</Link>
                                        </li>
                                        <li>
                                            <svg xmlns="http://www.w3.org/2000/svg" id="Bold" viewBox="0 0 24 24" width="18" height="18"><path d="M15.75,9.525,11.164,4.939A1.5,1.5,0,0,0,9.043,7.061l4.586,4.585a.5.5,0,0,1,0,.708L9.043,16.939a1.5,1.5,0,0,0,2.121,2.122l4.586-4.586A3.505,3.505,0,0,0,15.75,9.525Z"/></svg>
                                        </li>
                                        <li>
                                            <Link href={`/product-category/${data?.categories?.[0]?.slug}`}>{data?.categories?.[0]?.name}</Link>
                                        </li>
                                        <li>
                                            <svg xmlns="http://www.w3.org/2000/svg" id="Bold" viewBox="0 0 24 24" width="18" height="18"><path d="M15.75,9.525,11.164,4.939A1.5,1.5,0,0,0,9.043,7.061l4.586,4.585a.5.5,0,0,1,0,.708L9.043,16.939a1.5,1.5,0,0,0,2.121,2.122l4.586-4.586A3.505,3.505,0,0,0,15.75,9.525Z"/></svg>
                                        </li>
                                        <li>
                                            <p>{data?.name}</p>
                                        </li>
                                    </ul>
                                </nav>
                        </div>
                        <div className="col-md-3">
                            <div className="product-image-wrapper">
                                <div className="product-image-slider">
                                    {data?.image_url ?
                                        <ZoomImage
                                            src={bigImg || data?.image_url}
                                        /> :
                                        <ZoomImage
                                            src={bigImg || data?.brands[0].image_url}
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="short-description">
                                <div className="sku"><b>{data?.sku}</b></div>
                                <div className="title">
                                    <div className="title_p">
                                        <h1>{data?.name}</h1>
                                            <div className="price">
                                                {(data?.variations.length > 1) ?
                                                    <>
                                                        {isLoggedIn ?
                                                            <>
                                                                {(data?.variations?.map((p) =>Number(p?.discounted_price)).reduce((a, b) => Math.max(a, b), 0) > 0) ?
                                                                    <>
                                                                        <div>
                                                                            <del>${lowest[0]} - ${data?.variations[data?.variations.length - 1].price}</del>
                                                                        </div>
                                                                        <div>
                                                                            <span className="price">${lowest[1]} - ${data?.variations[data?.variations.length - 1].discounted_price}</span>
                                                                        </div>
                                                                    </> : ""
                                                                }
                                                                

                                                            </> :
                                                            <>
                                                                {(data?.variations?.map((p) =>Number(p?.price)).reduce((a, b) => Math.max(a, b), 0) > 0) ?
                                                                    <p>
                                                                        <span className="price">${lowest[0]} - ${data?.variations[data?.variations.length - 1].price}</span>
                                                                    </p> : ""
                                                                }
                                                            </>
                                                        }
                                                    </> :
                                                    <>
                                                        {(Number(data?.price)>0) ?
                                                            (
                                                                (isLoggedIn && data?.price != data?.discounted_price) ?
                                                                <>
                                                                    <del>${data?.price}</del>
                                                                    <span className="price">${data?.discounted_price}</span>
                                                                </> :
                                                                <span className="price">${data?.discounted_price}</span>
                                                            ) : 
                                                            ''
                                                        }
                                                    </>
                                                }
                                            </div>

                                    </div>

                                    {data?.brands &&
                                        <div className="brands">
                                            {data?.brands.map((brand) => (
                                                <Link href={`/brand/${brand.slug}`} className="brand-img" key={brand.id}><img src={brand.image_url} alt={brand?.name} loading="lazy" /></Link>
                                            ))}
                                        </div>
                                    }
                                </div>

                                {data?.variations.length < 1 && data?.price > 0 &&
                                    <div className="shop-single-sortinfo">
                                        <ul>
                                            <li>
                                                <Quantity quantity={quantity[data?.id] || 1} setQuantity={(val) => handleQuantityChange(data?.id, val)} label={true} />
                                            </li>
                                        </ul>
                                    </div>
                                }

                                {data?.variations.length < 1 &&
                                    <div className="btn-area">
                                        {data?.price > 0 ?
                                            <>
                                                <button className="btn btn-primary" onClick={() => handleAddToCart(data?.id, quantity[data?.id] || 0)} aria-label="Add To Cart">{
                                                    loadingButton === data?.id ?
                                                        <>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="loading" width="16" height="16"><path d="M272 112C272 85.5 293.5 64 320 64C346.5 64 368 85.5 368 112C368 138.5 346.5 160 320 160C293.5 160 272 138.5 272 112zM272 528C272 501.5 293.5 480 320 480C346.5 480 368 501.5 368 528C368 554.5 346.5 576 320 576C293.5 576 272 554.5 272 528zM112 272C138.5 272 160 293.5 160 320C160 346.5 138.5 368 112 368C85.5 368 64 346.5 64 320C64 293.5 85.5 272 112 272zM480 320C480 293.5 501.5 272 528 272C554.5 272 576 293.5 576 320C576 346.5 554.5 368 528 368C501.5 368 480 346.5 480 320zM139 433.1C157.8 414.3 188.1 414.3 206.9 433.1C225.7 451.9 225.7 482.2 206.9 501C188.1 519.8 157.8 519.8 139 501C120.2 482.2 120.2 451.9 139 433.1zM139 139C157.8 120.2 188.1 120.2 206.9 139C225.7 157.8 225.7 188.1 206.9 206.9C188.1 225.7 157.8 225.7 139 206.9C120.2 188.1 120.2 157.8 139 139zM501 433.1C519.8 451.9 519.8 482.2 501 501C482.2 519.8 451.9 519.8 433.1 501C414.3 482.2 414.3 451.9 433.1 433.1C451.9 414.3 482.2 414.3 501 433.1z" fill="currentColor" /></svg>
                                                        </>
                                                        :
                                                        <>
                                                            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="16" height="16"><path d="M21.59,15H6.65l.13,1.12c.06,.5,.49,.88,.99,.88h12.22v2H7.78c-1.52,0-2.8-1.14-2.98-2.65L3.21,2.88c-.06-.5-.49-.88-.99-.88H0V0H2.22c1.52,0,2.8,1.14,2.98,2.65l.04,.35h4.76v2H5.48l.94,8h13.54l1.6-8h-5.55V3h7.99l-2.4,12Zm-14.59,5c-1.1,0-2,.9-2,2s.9,2,2,2,2-.9,2-2-.9-2-2-2Zm10,0c-1.1,0-2,.9-2,2s.9,2,2,2,2-.9,2-2-.9-2-2-2ZM8.89,7.72l2.69,2.69c.39,.39,.9,.58,1.41,.58s1.02-.19,1.41-.58l2.68-2.68-1.41-1.41-1.68,1.68V0h-2V8l-1.69-1.69-1.41,1.41Z" fill="currentColor" /></svg> Add To Cart
                                                        </>
                                                }
                                                </button>
                                                <button
                                                    onClick={() => toggleWishlist(data?.id)}
                                                    className={`${checkWishlist(data?.id) ? "active" : ""} btn btn-wishlist`}
                                                    disabled={wishlistLoadingIds.includes(data?.id)}
                                                    aria-label="Toggle Wishlist"
                                                >
                                                    <span className="icon">
                                                        {wishlistLoadingIds.includes(data?.id) ? (
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="loading" width="18" height="18"><path d="M272 112C272 85.5 293.5 64 320 64C346.5 64 368 85.5 368 112C368 138.5 346.5 160 320 160C293.5 160 272 138.5 272 112zM272 528C272 501.5 293.5 480 320 480C346.5 480 368 501.5 368 528C368 554.5 346.5 576 320 576C293.5 576 272 554.5 272 528zM112 272C138.5 272 160 293.5 160 320C160 346.5 138.5 368 112 368C85.5 368 64 346.5 64 320C64 293.5 85.5 272 112 272zM480 320C480 293.5 501.5 272 528 272C554.5 272 576 293.5 576 320C576 346.5 554.5 368 528 368C501.5 368 480 346.5 480 320zM139 433.1C157.8 414.3 188.1 414.3 206.9 433.1C225.7 451.9 225.7 482.2 206.9 501C188.1 519.8 157.8 519.8 139 501C120.2 482.2 120.2 451.9 139 433.1zM139 139C157.8 120.2 188.1 120.2 206.9 139C225.7 157.8 225.7 188.1 206.9 206.9C188.1 225.7 157.8 225.7 139 206.9C120.2 188.1 120.2 157.8 139 139zM501 433.1C519.8 451.9 519.8 482.2 501 501C482.2 519.8 451.9 519.8 433.1 501C414.3 482.2 414.3 451.9 433.1 433.1C451.9 414.3 482.2 414.3 501 433.1z" fill="currentColor" /></svg>
                                                        ) : (
                                                            checkWishlist(data?.id) ?
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="18" height="18"><path d="M305 151.1L320 171.8L335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1L576 231.7C576 343.9 436.1 474.2 363.1 529.9C350.7 539.3 335.5 544 320 544C304.5 544 289.2 539.4 276.9 529.9C203.9 474.2 64 343.9 64 231.7L64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1z" fill="currentColor" /></svg> :
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="18" height="18"><path d="M442.9 144C415.6 144 389.9 157.1 373.9 179.2L339.5 226.8C335 233 327.8 236.7 320.1 236.7C312.4 236.7 305.2 233 300.7 226.8L266.3 179.2C250.3 157.1 224.6 144 197.3 144C150.3 144 112.2 182.1 112.2 229.1C112.2 279 144.2 327.5 180.3 371.4C221.4 421.4 271.7 465.4 306.2 491.7C309.4 494.1 314.1 495.9 320.2 495.9C326.3 495.9 331 494.1 334.2 491.7C368.7 465.4 419 421.3 460.1 371.4C496.3 327.5 528.2 279 528.2 229.1C528.2 182.1 490.1 144 443.1 144zM335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1C576 297.7 533.1 358 496.9 401.9C452.8 455.5 399.6 502 363.1 529.8C350.8 539.2 335.6 543.9 320 543.9C304.4 543.9 289.2 539.2 276.9 529.8C240.4 502 187.2 455.5 143.1 402C106.9 358.1 64 297.7 64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1L320 171.8L335 151.1z" fill="currentColor" /></svg>
                                                        ) }
                                                    </span>
                                                </button>
                                            </> :
                                            <button className="btn btn-primary" onClick={() => {
                                                document.documentElement.style.overflow = "hidden";
                                                setPopStatus(true)
                                            }} aria-label="Inquiry">Inquiry Now</button>

                                        }
                                    </div>
                                }

                                {data?.variations.length > 0 &&
                                    <div className="vartion-products mt-2">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Catalogue</th>
                                                    <th>Size</th>
                                                    <th>Price</th>
                                                    <th>Quantity</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.variations.map((variation) => (
                                                        <tr key={variation.id}>
                                                            <td>{variation.sku}</td>
                                                            <td>{variation.size}</td>
                                                            <td>
                                                                <span className="price">
                                                                    {variation?.sell_price > 0 ?
                                                                        ((isLoggedIn && variation.sell_price!=variation.discounted_price) ?
                                                                            <>
                                                                                <del>${variation.sell_price}</del>&nbsp;
                                                                                <span className="price">${variation.discounted_price}</span>
                                                                            </> :
                                                                            `$${variation.sell_price}`
                                                                        ) :
                                                                        '-'
                                                                    }
                                                                </span>
                                                            </td>
                                                            <td>
                                                                {((Number(variation?.price) > 0) && (Number(variation?.stock) > 0)) ?
                                                                    <Quantity quantity={quantity[variation.id] || 1} setQuantity={(val) => handleQuantityChange(variation.id, val)} /> :
                                                                    '-' 
                                                                }
                                                            </td>
                                                            <td>
                                                                {(Number(variation?.price) > 0 && Number(variation?.stock) > 0) ?
                                                                    <>
                                                                        <button className="btn btn-primary" onClick={() => handleAddToCart(null, quantity[variation?.id], variation.id)} aria-label="Add To Cart">{
                                                                                loadingButton === variation?.id ?
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="loading" width="18" height="18"><path d="M272 112C272 85.5 293.5 64 320 64C346.5 64 368 85.5 368 112C368 138.5 346.5 160 320 160C293.5 160 272 138.5 272 112zM272 528C272 501.5 293.5 480 320 480C346.5 480 368 501.5 368 528C368 554.5 346.5 576 320 576C293.5 576 272 554.5 272 528zM112 272C138.5 272 160 293.5 160 320C160 346.5 138.5 368 112 368C85.5 368 64 346.5 64 320C64 293.5 85.5 272 112 272zM480 320C480 293.5 501.5 272 528 272C554.5 272 576 293.5 576 320C576 346.5 554.5 368 528 368C501.5 368 480 346.5 480 320zM139 433.1C157.8 414.3 188.1 414.3 206.9 433.1C225.7 451.9 225.7 482.2 206.9 501C188.1 519.8 157.8 519.8 139 501C120.2 482.2 120.2 451.9 139 433.1zM139 139C157.8 120.2 188.1 120.2 206.9 139C225.7 157.8 225.7 188.1 206.9 206.9C188.1 225.7 157.8 225.7 139 206.9C120.2 188.1 120.2 157.8 139 139zM501 433.1C519.8 451.9 519.8 482.2 501 501C482.2 519.8 451.9 519.8 433.1 501C414.3 482.2 414.3 451.9 433.1 433.1C451.9 414.3 482.2 414.3 501 433.1z" fill="currentColor" /></svg>
                                                                                    :
                                                                                    <>
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="16" height="16"><path d="M21.59,15H6.65l.13,1.12c.06,.5,.49,.88,.99,.88h12.22v2H7.78c-1.52,0-2.8-1.14-2.98-2.65L3.21,2.88c-.06-.5-.49-.88-.99-.88H0V0H2.22c1.52,0,2.8,1.14,2.98,2.65l.04,.35h4.76v2H5.48l.94,8h13.54l1.6-8h-5.55V3h7.99l-2.4,12Zm-14.59,5c-1.1,0-2,.9-2,2s.9,2,2,2,2-.9,2-2-.9-2-2-2Zm10,0c-1.1,0-2,.9-2,2s.9,2,2,2,2-.9,2-2-.9-2-2-2ZM8.89,7.72l2.69,2.69c.39,.39,.9,.58,1.41,.58s1.02-.19,1.41-.58l2.68-2.68-1.41-1.41-1.68,1.68V0h-2V8l-1.69-1.69-1.41,1.41Z" fill="currentColor" /></svg> Add To Cart
                                                                                    </>
                                                                            }
                                                                        </button>
                                                                    </> :
                                                                    <button className="btn btn-primary" onClick={() => setPopStatus(true)} aria-label="Inquiry">Inquiry Now</button>
                                                                }

                                                            </td>
                                                        </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                }
                                <div className="descritpion-wrapper">
                                    <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: initialData?.short_description }}></div>
                                    <button className={`btn-dark btn-size-small ${!initialData?.short_description ? "align-left" : ""}`} onClick={() => {
                                        document.documentElement.style.overflow = "hidden";
                                        setPopStatus(true)
                                    }} aria-label="Inquiry">Bulk Inquiry</button>
                                </div>
                                <div className="extra-info">
                                    <div className="share">
                                        Share :
                                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="share">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="16" height="16"><path d="M240 363.3L240 576L356 576L356 363.3L442.5 363.3L460.5 265.5L356 265.5L356 230.9C356 179.2 376.3 159.4 428.7 159.4C445 159.4 458.1 159.8 465.7 160.6L465.7 71.9C451.4 68 416.4 64 396.2 64C289.3 64 240 114.5 240 223.4L240 265.5L174 265.5L174 363.3L240 363.3z" fill="currentColor"></path></svg>
                                        </a>
                                        <a href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`} target="_blank" rel="noopener noreferrer" className="share">
                                            <svg xmlns="http://www.w3.org/2000/svg" id="Capa_1" data-name="Capa 1" viewBox="0 0 24 24" width="16" height="16"><path d="m18.9,1.153h3.682l-8.042,9.189,9.46,12.506h-7.405l-5.804-7.583-6.634,7.583H.469l8.6-9.831L0,1.153h7.593l5.241,6.931,6.065-6.931Zm-1.293,19.494h2.039L6.482,3.239h-2.19l13.314,17.408Z" fill="currentColor"></path></svg>
                                        </a>
                                        <a href={`https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodedImage}&description=${encodedTitle}`} target="_blank" rel="noopener noreferrer" className="share">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="16" height="16"><path d="M568 320C568 457 457 568 320 568C294.4 568 269.8 564.1 246.6 556.9C256.7 540.4 271.8 513.4 277.4 491.9C280.4 480.3 292.8 432.9 292.8 432.9C300.9 448.3 324.5 461.4 349.6 461.4C424.4 461.4 478.3 392.6 478.3 307.1C478.3 225.2 411.4 163.9 325.4 163.9C218.4 163.9 161.5 235.7 161.5 314C161.5 350.4 180.9 395.7 211.8 410.1C216.5 412.3 219 411.3 220.1 406.8C220.9 403.4 225.1 386.5 227 378.7C227.6 376.2 227.3 374 225.3 371.6C215.2 359.1 207 336.3 207 315C207 260.3 248.4 207.4 319 207.4C379.9 207.4 422.6 248.9 422.6 308.3C422.6 375.4 388.7 421.9 344.6 421.9C320.3 421.9 302 401.8 307.9 377.1C314.9 347.6 328.4 315.8 328.4 294.5C328.4 275.5 318.2 259.6 297 259.6C272.1 259.6 252.1 285.3 252.1 319.8C252.1 341.8 259.5 356.6 259.5 356.6C259.5 356.6 235 460.4 230.5 479.8C225.5 501.2 227.5 531.4 229.6 551C137.4 514.9 72 425.1 72 320C72 183 183 72 320 72C457 72 568 183 568 320z" fill="currentColor"></path></svg>
                                        </a>
                                        <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`} target="_blank" rel="noopener noreferrer" className="share">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="16" height="16"><path d="M196.3 512L103.4 512L103.4 212.9L196.3 212.9L196.3 512zM149.8 172.1C120.1 172.1 96 147.5 96 117.8C96 103.5 101.7 89.9 111.8 79.8C121.9 69.7 135.6 64 149.8 64C164 64 177.7 69.7 187.8 79.8C197.9 89.9 203.6 103.6 203.6 117.8C203.6 147.5 179.5 172.1 149.8 172.1zM543.9 512L451.2 512L451.2 366.4C451.2 331.7 450.5 287.2 402.9 287.2C354.6 287.2 347.2 324.9 347.2 363.9L347.2 512L254.4 512L254.4 212.9L343.5 212.9L343.5 253.7L344.8 253.7C357.2 230.2 387.5 205.4 432.7 205.4C526.7 205.4 544 267.3 544 347.7L544 512L543.9 512z" fill="currentColor"></path></svg>
                                        </a>
                                    </div>
                                    <div className="shop-single-sortinfo">
                                        <ul>
                                            <li>Category: 
                                                {data?.categories.map((cat, index) => (
                                                    <Link href={`/product-category/${cat?.slug}`} key={cat.id}>{cat.name}{(data.categories.length > index + 1) ? ' , ' : ''}</Link>
                                                ))}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="single-product-details">
                <div className="container">
                    <div className="row">
                        <div className="tabs-wrapper">
                            <nav>
                                <div className="nav-tabs">
                                    <button className={`nav-link ${(productTab == 1) ? 'active' : ''}`} onClick={() => setProductTab(1)} aria-label="Description">Description</button>
                                    <button className={`nav-link ${(productTab == 2) ? 'active' : ''}`} onClick={() => setProductTab(2)} aria-label="Additional Info">Additional Info</button>
                                    <button className={`nav-link ${(productTab == 3) ? 'active' : ''}`} onClick={() => setProductTab(3)} aria-label="Reviews">Reviews</button>
                                    {/* <button className={`nav-link ${(productTab == 4) ? 'active' : ''}`} onClick={() => setProductTab(4)} aria-label="Bulk Inquiry">Bulk Inquiry</button> */}
                                </div>
                            </nav>
                            <div className="tab-content" id="nav-tabContent">
                                <div className={`tab-pane fade ${(productTab == 1) ? 'active' : ''}`} role="tabpanel" aria-labelledby="nav-tab1">
                                    <div className="shop-single-desc">
                                        <div dangerouslySetInnerHTML={{ __html: data?.description }} />
                                    </div>
                                </div>
                                <div className={`tab-pane fade ${(productTab == 2) ? 'active' : ''}`} role="tabpanel" aria-labelledby="nav-tab2">
                                    <div className="shop-single-additional">
                                        <div dangerouslySetInnerHTML={{ __html: data?.additional_info }} />
                                    </div>
                                </div>
                                <div className={`tab-pane fade ${(productTab == 3) ? 'active' : ''}`} role="tabpanel" aria-labelledby="nav-tab3">
                                    <div className="shop-review">
                                        <div className="review-comments">
                                            <div className="col-md-5">
                                                <h5>Reviews ({reviews?.length})</h5>
                                                {reviews?.length > 0 && (
                                                    reviews?.map((rev) => (
                                                        <div className="single-review" key={rev?.id}>
                                                            <div className="user-details">
                                                                <div className="img-area">
                                                                    <img src="/assets/images/user.webp" alt={data?.name} loading="lazy" />
                                                                </div>
                                                                <h4>{rev.user.name}</h4>
                                                            </div>
                                                            <div className="rating">
                                                                <p>{rev.description}</p>
                                                                <div className="d-flex">
                                                                    {[...Array(rev.rating)].map((_, i) => (
                                                                        <span className="rating-star" key={i}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="16" height="16"><path d="M19.467,23.316,12,17.828,4.533,23.316,7.4,14.453-.063,9H9.151L12,.122,14.849,9h9.213L16.6,14.453Z" fill="currentColor" /></svg>
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                )
                                                }
                                            </div>


                                            <div className="form-wrapper">
                                                <div className="col-md-5">
                                                    {isLoggedIn ?
                                                        <form onSubmit={handleRating}>
                                                            <div className={`form-group ${revLoad ? "loading-wrapper" : ""}`}>
                                                                <textarea maxLength="200" placeholder="Review . . ." onChange={(e) => setRatingMes(e.target.value)} value={ratingMes}>{ratingMes}</textarea>
                                                            </div>
                                                            <div className="d-flex mb-2">
                                                                {[...Array(5)].map((star, index) => {
                                                                    const value = index + 1;
                                                                    return (
                                                                        <button
                                                                            key={value}
                                                                            type="button"
                                                                            onClick={() => setRating(value)}
                                                                            onMouseEnter={() => setHover(value)}
                                                                            onMouseLeave={() => setHover(0)}
                                                                            className={`rating-btn ${value <= (hover || rating) ? "active" : ""
                                                                                }`}
                                                                            aria-label={value}
                                                                        >
                                                                            <span className="icon">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="16" height="16">
                                                                                    <path d="M24.062,9.033H14.849L12,.156l-2.849,8.877H-.062l7.46,5.453-2.864,8.863,7.467-5.488,7.467,5.488-2.864-8.863,7.46-5.453Zm-6.5,11.676l-5.562-4.089-5.562,4.089,2.134-6.604L3,10.033h6.881l2.119-6.605,2.12,6.605h6.88l-5.571,4.072,2.134,6.604Z" fill="currentColor" />
                                                                                </svg>
                                                                            </span>                                                                        
                                                                        </button>
                                                                    );
                                                                })}
                                                            </div>
                                                            {rmessage.value &&
                                                                <p className={`${rmessage.type ? "success" : "error"}`}>{rmessage.value}</p>
                                                            }
                                                            <button className={`btn btn-primary ${revLoad ? "loading" : ""}`} aria-label="Submit">{revLoad ? "" : "Submit"}</button>
                                                        </form> :
                                                        <p>Please <Link href="/login">Login</Link></p>
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className={`tab-pane fade ${(productTab == 4) ? 'active' : ''}`}>
                                    <div className={`col-md-8 dawn_form ${isLoading ? "loading-wrapper" : ""}`}>
                                        <form onSubmit={handleBulk}>
                                            <div className="row">
                                                <div className="form-group col_6">
                                                    <label>First Name</label>
                                                    <input type="text" className="form-control" placeholder="Enter your first name" value={bfname} onChange={(e) => setBfname(e.target.value)} required />
                                                </div>
                                                <div className="form-group col_6">
                                                    <label>Last Name</label>
                                                    <input type="text" className="form-control" placeholder="Enter your last name" value={blname} onChange={(e) => setBlname(e.target.value)} required />
                                                </div>
                                                <div className="form-group col_6">
                                                    <label>Contact Number</label>
                                                    <input type="tel" max="15" className="form-control" placeholder="Enter your contact number" value={bnumber} onChange={(e) => handlePhone(e)} required />
                                                </div>
                                                <div className="form-group col_6">
                                                    <label>Email</label>
                                                    <input type="email" className="form-control" placeholder="Enter your email" value={bemail} onChange={(e) => setBemail(e.target.value)} required />
                                                </div>
                                                <div className="form-group col_6">
                                                    <label>Company</label>
                                                    <input type="text" className="form-control" placeholder="Enter your company name" value={bcompany} onChange={(e) => setBcompany(e.target.value)} required />
                                                </div>
                                                <div className="form-group col_6">
                                                    <label>Location</label>
                                                    <input type="text" className="form-control" placeholder="Location" value={blocation} onChange={(e) => setBlocation(e.target.value)} required />
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label>Quantity</label>
                                                        <input type="number" min="1" placeholder="Quantity" value={equantity} onChange={(e) => setEquantity(e.target.value)}  required />
                                                    </div>
                                                </div>
                                                <div className="form-group col_6">
                                                    <label>Message</label>
                                                    <textarea maxLength="200" placeholder="Message . . ." onChange={(e) => setBmessage(e.target.value)} value={bmessage} required></textarea>
                                                </div>
                                                <Turnstile
                                                    sitekey="0x4AAAAAAB6ROztNKa7zfprV"
                                                    onVerify={handleCaptchaChange}
                                                />
                                            </div>
                                            {captchaMessage && <p className="error">{captchaMessage}</p>}
                                            {bulkMessage && <p className="success">{bulkMessage}</p>}
                                            <button className={`btn btn-primary mt-2 ${isLoading ? "loading" : ""}`} aria-label="Submit">{!isLoading ? "Submit" : ""}</button>
                                        </form>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
 
            <section className="related">
                <div className="container">
                    <div className="title">
                        <h2>Related Products</h2>
                    </div>
                    <div className="row widget">
                        {data?.relatedProducts && (
                            <Swiper
                                modules={[Navigation, Autoplay, Pagination]}
                                spaceBetween={20}
                                slidesPerView={1}
                                navigation
                                autoplay={{ delay: 2500, disableOnInteraction: false }}
                                loop={true}
                                pagination={{ clickable: true }}
                                breakpoints={{
                                    480: { slidesPerView: 2 },
                                    768: { slidesPerView: 3 },
                                    1024: { slidesPerView: (data?.relatedProducts.length > 4 ? 4 : data?.relatedProducts.length) },
                                }}
                            >
                                {data.relatedProducts.map((pro) => (
                                    <SwiperSlide key={pro.id}>
                                        <Link href={`/product/${pro?.slug}`} aria-label={pro?.name} className="category-item">
                                            <div className="img-container">
                                                <img src={pro.image_url} alt={pro?.name} loading="lazy" />
                                                <div className="category-action-wrap">
                                                    <div className="category-action">
                                                        <span className="icon">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="18" height="18"><path d="M320 144C254.8 144 201.2 173.6 160.1 211.7C121.6 247.5 95 290 81.4 320C95 350 121.6 392.5 160.1 428.3C201.2 466.4 254.8 496 320 496C385.2 496 438.8 466.4 479.9 428.3C518.4 392.5 545 350 558.6 320C545 290 518.4 247.5 479.9 211.7C438.8 173.6 385.2 144 320 144zM127.4 176.6C174.5 132.8 239.2 96 320 96C400.8 96 465.5 132.8 512.6 176.6C559.4 220.1 590.7 272 605.6 307.7C608.9 315.6 608.9 324.4 605.6 332.3C590.7 368 559.4 420 512.6 463.4C465.5 507.1 400.8 544 320 544C239.2 544 174.5 507.2 127.4 463.4C80.6 419.9 49.3 368 34.4 332.3C31.1 324.4 31.1 315.6 34.4 307.7C49.3 272 80.6 220 127.4 176.6zM320 400C364.2 400 400 364.2 400 320C400 290.4 383.9 264.5 360 250.7C358.6 310.4 310.4 358.6 250.7 360C264.5 383.9 290.4 400 320 400zM240.4 311.6C242.9 311.9 245.4 312 248 312C283.3 312 312 283.3 312 248C312 245.4 311.8 242.9 311.6 240.4C274.2 244.3 244.4 274.1 240.5 311.5zM286 196.6C296.8 193.6 308.2 192.1 319.9 192.1C328.7 192.1 337.4 193 345.7 194.7C346 194.8 346.2 194.8 346.5 194.9C404.4 207.1 447.9 258.6 447.9 320.1C447.9 390.8 390.6 448.1 319.9 448.1C258.3 448.1 206.9 404.6 194.7 346.7C192.9 338.1 191.9 329.2 191.9 320.1C191.9 309.1 193.3 298.3 195.9 288.1C196.1 287.4 196.2 286.8 196.4 286.2C208.3 242.8 242.5 208.6 285.9 196.7z" fill="currentColor" /></svg>
                                                        </span>
                                                        <button
                                                            onClick={() => toggleWishlist(pro?.id)}
                                                            className={`${checkWishlist(pro?.id) ? "active" : ""}`}
                                                            disabled={wishlistLoadingIds.includes(pro?.id)}
                                                            aria-label="Wishlist"
                                                        >
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
                                            <div className="content">
                                                <h2 aria-label={pro?.name}>{pro.name}</h2>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

