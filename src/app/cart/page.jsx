"use client";

import Link from 'next/link';
import Quantity from '@/components/Quantity';
import { useContext, useState, useEffect, useRef } from 'react';
import { CartContext } from '@/context/cart';
import { useLoader } from '@/context/LoaderContext';
import { AuthContext } from '@/context/AuthContext';
import CanvasCaptcha from '@/components/CanvasCaptcha';

export default function Page() {
    const { cartItems, cartDetail, removeFromCart, getCartTotal, getItemTotal, updateCartItemQuantity } = useContext(CartContext)
    const { user, logout, isLoggedIn, login } = useContext(AuthContext);
    const [popStatus, setPopStatus] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const [cartData, setCartData] = useState({});
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [loadingButton, setLoadingButton] = useState(null);
    const { startLoading, stopLoading } = useLoader();
    const ownBrands = ["chemier", "tristains", "cusp", "lichrom", "bluster", "eks", "kappaa", "dsi"]
    const [captchaInput, setCaptchaInput] = useState("");
    const [captcha, setCaptcha] = useState("");
    const [reloadCaptcha, setReloadCaptcha] = useState(0);

    const loginRef = useRef(null);

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    const handleRemove = async (id) => {
        setLoadingButton(id);
        let res = await removeFromCart(id)
        if (res) {
            setLoadingButton(null)
        }
    }

    const handleQuantity = async (id, qty) => {
        setLoadingButton(id);

        let res = await updateCartItemQuantity(id, qty)
        if (res) {
            setLoadingButton(null)
        }
    }

    useEffect(() => {
        startLoading();
        const fetchCartDetail = async () => {
            const data = await cartDetail()
            const updated = data?.products?.reduce((item, product) => {
                if (!ownBrands.includes(product?.brand?.name.toLowerCase())) {
                    item['add'] = item['add'] || [];
                    item['add'].push(product)
                } else {
                    item['subtract'] = item['subtract'] || [];
                    item['subtract'].push(product)
                }

                return item;
            }, {})
            const addTariff = updated?.add?.reduce((acc, item) => acc + Number(item?.discounted_price), 0) || 0;
            const subtractTariff = updated?.subtract?.reduce((acc, item) => acc + Number(item?.discounted_price), 0) || 0
            data.tariff = Number(((addTariff * data?.tariff_charge) / 100).toFixed(2))
            data.total = (Number(data?.total?.replace(/,/g, "")) - (((subtractTariff * Number(data?.tariff_charge)) / 100))).toFixed(2)
            setCartData(data);
            stopLoading();
        }
        fetchCartDetail();

    }, [cartItems])


    const handlesubmit = (e) => {
        e.preventDefault();

        setIsLoading(true);
        let regobj = {
            email: username,
            password,
            guest_token: localStorage.getItem("guest_key_token"),
        };

        const errors = validate(regobj);
        setFormErrors(errors);

        const raw = JSON.stringify(regobj);
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: raw,
            redirect: "follow"
        };

        if (Object.keys(errors).length === 0) {
            login(requestOptions, false).then((mess) => {
                if (mess) {
                    setMessage(mess)
                    setIsLoading(false);
                    setReloadCaptcha(prev => prev + 1)
                    setCaptchaInput("")
                    document.documentElement.style.overflow = "auto";
                }
            });
        } else {
            setIsLoading(false);
        }

    }

    const validate = (val) => {
        const errors = {}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i

        if (!val.email) {
            errors.email = "Email is required !"
        } else if (!regex.test(val.email)) {
            errors.email = "Email is not valid"
        }
        if (!val.password) {
            errors.password = "Password is required !"
        }
        if (captchaInput !== captcha) {
            errors.captcha = "Captcha is required"
            setReloadCaptcha(prev => prev + 1)
            setCaptchaInput("")
        }
        return errors
    }

    return (
        <>
            {!isLoggedIn ? (
                <div className={`login-modal modal ${popStatus ? 'active' : ''}`} id="demo-modal"
                    onClick={(e) => {
                        if (e.target.classList.contains("login-modal")) {
                            const wrapper = document.querySelector(".form-wrapper");
                            wrapper.classList.add("animate-bounce");
                            wrapper.addEventListener("animationend", () => {
                                wrapper.classList.remove("animate-bounce");
                            }, { once: true });
                        }
                    }}
                >

                    <div className={`form-wrapper widget ${isLoading ? "loading-wrapper" : ""}`}>
                        <div className="logo">
                            <img alt="" src="assets/images/Website-logo-1.webp" loading="lazy" />
                        </div>
                        <form onSubmit={handlesubmit}>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input className="form-control" placeholder="Your Email" type="email" value={username} onChange={(e) => setUsername(e.target.value)} />
                                <p className="error">{formErrors.email}</p>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input className="form-control" placeholder="Your Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <p className="error">{formErrors.password}</p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="loginCaptcha">Enter Captcha Value</label>
                                <input
                                    type="text"
                                    id="loginCaptcha"
                                    className={`form-control`}
                                    placeholder="Enter Captcha"
                                    value={captchaInput}
                                    onChange={(e) => setCaptchaInput(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <CanvasCaptcha reloadTrigger={reloadCaptcha} onChange={setCaptcha} />
                            </div>
                            <div className="d-flex justify-content-space-between mb-2">
                                <div className="form-check">
                                    <input className="form-check-input" id="remember" type="checkbox" value="" />
                                    <label className="form-check-label" htmlFor="remember">Remember Me</label>
                                </div>
                                <Link href="" className="forgot-pass">Forgot Password?</Link>
                            </div>
                            <div className="d-flex align-items-center">
                                <button type="submit" className={`btn btn-primary w-100 ${isLoading ? "loading" : ""}`} aria-label="Submit">
                                    {!isLoading && (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="18" height="18"><path d="M416 160L480 160C497.7 160 512 174.3 512 192L512 448C512 465.7 497.7 480 480 480L416 480C398.3 480 384 494.3 384 512C384 529.7 398.3 544 416 544L480 544C533 544 576 501 576 448L576 192C576 139 533 96 480 96L416 96C398.3 96 384 110.3 384 128C384 145.7 398.3 160 416 160zM406.6 342.6C419.1 330.1 419.1 309.8 406.6 297.3L278.6 169.3C266.1 156.8 245.8 156.8 233.3 169.3C220.8 181.8 220.8 202.1 233.3 214.6L306.7 288L96 288C78.3 288 64 302.3 64 320C64 337.7 78.3 352 96 352L306.7 352L233.3 425.4C220.8 437.9 220.8 458.2 233.3 470.7C245.8 483.2 266.1 483.2 278.6 470.7L406.6 342.7z" fill="currentColor" /></svg>
                                            Login
                                        </>
                                    )}
                                </button>
                            </div>
                            <div className="message" style={{ marginTop: "20px" }}>
                                {message && <p className="error">{message.message}</p>}
                            </div>
                        </form>
                        <div className="authentication-footer">
                            <span className="social-divider">or</span>
                            <p>Don't have an account? <Link href="/register" data-discover="true">Register.</Link></p>
                        </div>
                        <button type="button" className="modal__close" onClick={() => {
                            setPopStatus(false)
                            document.documentElement.style.overflow = "auto";
                        }} aria-label="Modal Close">&times;</button>
                    </div>
                </div>
            ) :
                null
            }
            <section className="page-title">
                <div className="container">
                    <div className="title-wrapper">
                        <div className="title">
                            <h1>SHIPPING CART</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cart-main">
                <div className="container">
                    {cartItems.length > 0 ?
                        <div className="row">
                            <div className="col-md-7">
                                <div>
                                    <div className="products-wrapper widget">
                                        <table className="cart-products">
                                            <thead>
                                                <tr>
                                                    <th>IMAGE</th>
                                                    <th>PRODUCT</th>
                                                    <th>PRICE</th>
                                                    <th>QUANTITY</th>
                                                    <th>SUBTOTAL</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cartItems.map((item) => (
                                                    <tr key={item.id}>
                                                        <td><a><img src={item.image_url} alt={item.name} loading="lazy" /></a></td>
                                                        <td><Link href={`/product/${item.slug}`}>{item.name}</Link></td>
                                                        <td>${isLoggedIn ? item.discounted_price : item.price}</td>
                                                        <td>
                                                            <Quantity quantity={item.quantity} setQuantity={(newQty) => handleQuantity(item.id, newQty)} />
                                                        </td>
                                                        <td><b>${((isLoggedIn ? item.discounted_price : item.price) * item.quantity).toFixed(2)}</b></td>
                                                        <td>
                                                            <button className="remove-item" title="Remove this item" onClick={() => handleRemove(item.id)} aria-label="Remove Cart Item">
                                                                {loadingButton === item.id ?
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="16" height="16" className="loading"><path d="M272 112C272 85.5 293.5 64 320 64C346.5 64 368 85.5 368 112C368 138.5 346.5 160 320 160C293.5 160 272 138.5 272 112zM272 528C272 501.5 293.5 480 320 480C346.5 480 368 501.5 368 528C368 554.5 346.5 576 320 576C293.5 576 272 554.5 272 528zM112 272C138.5 272 160 293.5 160 320C160 346.5 138.5 368 112 368C85.5 368 64 346.5 64 320C64 293.5 85.5 272 112 272zM480 320C480 293.5 501.5 272 528 272C554.5 272 576 293.5 576 320C576 346.5 554.5 368 528 368C501.5 368 480 346.5 480 320zM139 433.1C157.8 414.3 188.1 414.3 206.9 433.1C225.7 451.9 225.7 482.2 206.9 501C188.1 519.8 157.8 519.8 139 501C120.2 482.2 120.2 451.9 139 433.1zM139 139C157.8 120.2 188.1 120.2 206.9 139C225.7 157.8 225.7 188.1 206.9 206.9C188.1 225.7 157.8 225.7 139 206.9C120.2 188.1 120.2 157.8 139 139zM501 433.1C519.8 451.9 519.8 482.2 501 501C482.2 519.8 451.9 519.8 433.1 501C414.3 482.2 414.3 451.9 433.1 433.1C451.9 414.3 482.2 414.3 501 433.1z" fill="currentColor" /></svg> :
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="16" height="16"><path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" fill="currentColor" /></svg>
                                                                }
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}

                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="coupon-wrapper">
                                        <div className="btn-area">
                                            <Link href="/product-category" className="btn btn-secondary">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="18" height="18"><path d="M73.4 297.4C60.9 309.9 60.9 330.2 73.4 342.7L233.4 502.7C245.9 515.2 266.2 515.2 278.7 502.7C291.2 490.2 291.2 469.9 278.7 457.4L173.3 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L173.3 288L278.7 182.6C291.2 170.1 291.2 149.8 278.7 137.3C266.2 124.8 245.9 124.8 233.4 137.3L73.4 297.3z" fill="currentColor" /></svg>
                                                Continue Shopping
                                            </Link>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="widget">
                                    <h4>Cart totals</h4>
                                    <table className="cart-total">
                                        <tbody>
                                            <tr>
                                                <th>Subtotal</th>
                                                <td>${cartData?.sub_total}</td>
                                            </tr>
                                            <tr>
                                                <th>Shipping</th>
                                                <th>Calculate Shipping</th>
                                            </tr>
                                            {Number(cartData?.hazmat_charges?.replace(/,/g, "")) > 0 ?
                                                <tr>
                                                    <th>Hazmat Charges</th>
                                                    <td>+ ${cartData?.hazmat_charges}</td>
                                                </tr> : null
                                            }
                                            {Number(cartData?.tariff) > 0 ?
                                                <tr>
                                                    <th>Tariff Surcharge</th>
                                                    <td>+ ${cartData?.tariff} ({cartData?.tariff_charge}%)</td>
                                                </tr> : null
                                            }
                                            {Number(cartData?.fuel_surcharge) ?
                                                <tr>
                                                    <th>Fuel Surcharge</th>
                                                    <td>+ ${cartData?.fuel_surcharge}</td>
                                                </tr> : null
                                            }
                                            {Number(cartData?.packing_handling_charges?.replace(/,/g, "") > 0) ?
                                                <tr>
                                                    <th>Packing & Handling Charges</th>
                                                    <td>+ ${cartData?.packing_handling_charges}</td>
                                                </tr> : null
                                            }
                                            {Number(cartData?.user_discount?.replace(/,/g, "") > 0) ?
                                                <tr>
                                                    <th>You Save</th>
                                                    <td className="price"> ${cartData?.user_discount}</td>
                                                </tr> : null
                                            }
                                            <tr>
                                                <th>Total</th>
                                                <td>${cartData?.total}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    {!isLoggedIn ?
                                        (<button className="btn btn-primary w-100" type="button" onClick={() => {
                                            setPopStatus(true);
                                            document.documentElement.style.overflow = "hidden";
                                        }
                                        } aria-label="Login">Login</button>
                                        ) :
                                        <Link href="/checkout" className="btn btn-primary w-100">PROCEED TO CHECKOUT </Link>
                                    }
                                </div>
                            </div>
                        </div> :
                        <div className="empty-wrapper">
                            <div className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000" height="100px" width="100px" version="1.1" id="Capa_1" viewBox="0 0 231.523 231.523" xmlSpace="preserve">
                                    <g>
                                        <path d="M107.415,145.798c0.399,3.858,3.656,6.73,7.451,6.73c0.258,0,0.518-0.013,0.78-0.04c4.12-0.426,7.115-4.111,6.689-8.231   l-3.459-33.468c-0.426-4.12-4.113-7.111-8.231-6.689c-4.12,0.426-7.115,4.111-6.689,8.231L107.415,145.798z" />
                                        <path d="M154.351,152.488c0.262,0.027,0.522,0.04,0.78,0.04c3.796,0,7.052-2.872,7.451-6.73l3.458-33.468   c0.426-4.121-2.569-7.806-6.689-8.231c-4.123-0.421-7.806,2.57-8.232,6.689l-3.458,33.468   C147.235,148.377,150.23,152.062,154.351,152.488z" />
                                        <path d="M96.278,185.088c-12.801,0-23.215,10.414-23.215,23.215c0,12.804,10.414,23.221,23.215,23.221   c12.801,0,23.216-10.417,23.216-23.221C119.494,195.502,109.079,185.088,96.278,185.088z M96.278,216.523   c-4.53,0-8.215-3.688-8.215-8.221c0-4.53,3.685-8.215,8.215-8.215c4.53,0,8.216,3.685,8.216,8.215   C104.494,212.835,100.808,216.523,96.278,216.523z" />
                                        <path d="M173.719,185.088c-12.801,0-23.216,10.414-23.216,23.215c0,12.804,10.414,23.221,23.216,23.221   c12.802,0,23.218-10.417,23.218-23.221C196.937,195.502,186.521,185.088,173.719,185.088z M173.719,216.523   c-4.53,0-8.216-3.688-8.216-8.221c0-4.53,3.686-8.215,8.216-8.215c4.531,0,8.218,3.685,8.218,8.215   C181.937,212.835,178.251,216.523,173.719,216.523z" />
                                        <path d="M218.58,79.08c-1.42-1.837-3.611-2.913-5.933-2.913H63.152l-6.278-24.141c-0.86-3.305-3.844-5.612-7.259-5.612H18.876   c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h24.94l6.227,23.946c0.031,0.134,0.066,0.267,0.104,0.398l23.157,89.046   c0.86,3.305,3.844,5.612,7.259,5.612h108.874c3.415,0,6.399-2.307,7.259-5.612l23.21-89.25C220.49,83.309,220,80.918,218.58,79.08z    M183.638,165.418H86.362l-19.309-74.25h135.895L183.638,165.418z" />
                                        <path d="M105.556,52.851c1.464,1.463,3.383,2.195,5.302,2.195c1.92,0,3.84-0.733,5.305-2.198c2.928-2.93,2.927-7.679-0.003-10.607   L92.573,18.665c-2.93-2.928-7.678-2.927-10.607,0.002c-2.928,2.93-2.927,7.679,0.002,10.607L105.556,52.851z" />
                                        <path d="M159.174,55.045c1.92,0,3.841-0.733,5.306-2.199l23.552-23.573c2.928-2.93,2.925-7.679-0.005-10.606   c-2.93-2.928-7.679-2.925-10.606,0.005l-23.552,23.573c-2.928,2.93-2.925,7.679,0.005,10.607   C155.338,54.314,157.256,55.045,159.174,55.045z" />
                                        <path d="M135.006,48.311c0.001,0,0.001,0,0.002,0c4.141,0,7.499-3.357,7.5-7.498l0.008-33.311c0.001-4.142-3.356-7.501-7.498-7.502   c-0.001,0-0.001,0-0.001,0c-4.142,0-7.5,3.357-7.501,7.498l-0.008,33.311C127.507,44.951,130.864,48.31,135.006,48.311z" />
                                    </g>
                                </svg>
                            </div>
                            <Link href="/product-category" className="btn btn-secondary">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="18" height="18"><path d="M73.4 297.4C60.9 309.9 60.9 330.2 73.4 342.7L233.4 502.7C245.9 515.2 266.2 515.2 278.7 502.7C291.2 490.2 291.2 469.9 278.7 457.4L173.3 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L173.3 288L278.7 182.6C291.2 170.1 291.2 149.8 278.7 137.3C266.2 124.8 245.9 124.8 233.4 137.3L73.4 297.3z" fill="currentColor" /></svg>
                                Continue Shopping
                            </Link>
                        </div>
                    }

                </div>
            </section>

            <section className="cart-message">
                <div className="container">
                    <div className="d-flex justify-content-center">
                        <h5>Please Note that Dawn Scientific Inc DO NOT ship any chemicals to home / Residential address. It will be cancelled without Notice and issue a full refund to your account</h5>
                    </div>
                </div>
            </section>
        </>
    )
}
