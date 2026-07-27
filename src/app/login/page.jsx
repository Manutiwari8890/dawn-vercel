"use client";
import { useEffect, useState, useContext, useRef } from 'react'
import Link from 'next/link';
import { AuthContext } from '@/context/AuthContext';
import CanvasCaptcha from '@/components/CanvasCaptcha';
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function Login() {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const router = useRouter();
    
    const { user, logout, isLoggedIn, login } = useContext(AuthContext);
    const guest_token = localStorage.getItem("guest_key_token");
    const [passTogle, setPassToggle] = useState(false);
    const [captchaInput, setCaptchaInput] = useState("");
    const [captcha, setCaptcha] = useState("");
    const [reloadCaptcha, setReloadCaptcha] = useState(0);
    const [tcaptchaInput, setTcaptchaInput] = useState("");
    const [tcaptcha, setTcaptcha] = useState("");
    const [reloadTcaptcha, setReloadTcaptcha] = useState(0);

    useEffect(() => {
        if (isLoggedIn) {
            router.push('/');
        }
    }, []);

    

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState({
        type: false,
        value: ""
    });

    const [formErrors, setFormErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const [hasProblem, setHasProblem] = useState(false);
    const [pname, setPname] = useState("");
    const [pemail, setPemail] = useState("");
    const [pphone, setPphone] = useState("");
    const [promessage, setPromessage] = useState("");
    const [pLoading, setPloading] = useState(false);
    const [pMessage, setPMessage] = useState({
        type: false,
        value: ""
    });


    const handlesubmit = (e) => {
        e.preventDefault();
        let regobj = {
            email,
            password,
            guest_token: guest_token,
            "cf-turnstile-response": null,
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
            setIsLoading(true);
            login(requestOptions, true).then((res) => {
                if (res) {
                    let msg = "";
                    if (typeof res.message === "string") {
                        msg = res.message;
                    }
                    else if (typeof res.message === "object" && res.message !== null) {
                        const firstErrorKey = Object.keys(res.message)[0];
                        if (firstErrorKey) {
                            msg = res.message[firstErrorKey][0];
                        }
                    }
                    setMessage({
                        type: res.status,
                        value: msg,
                    })
                    setIsLoading(false);
                    setReloadCaptcha(prev => prev+1)
                    setCaptchaInput("")
                }
            });
        }

    }

    const handleProblemSubmit = async (e) => {
        e.preventDefault();
        let regobj = {
            name: pname,
            email: pemail,
            phone: pphone,
            message: promessage,
        };


        const raw = JSON.stringify(regobj);
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: raw,
        };

        if (tcaptchaInput == tcaptcha) {
            setPloading(true);
            try {
                const response = await fetch(`${baseUrl}login-enquiry`, requestOptions);
                if (!response.ok) {
                    throw new Error("Failed !")
                }
                const result = await response.json()
                setPMessage({
                    type: result.status,
                    value: result.message
                })
            } catch (err) {
                console.log(err)
            } finally {
                setPloading(false);
                setReloadTcaptcha(prev => prev+1)
                setTcaptchaInput("")
            }
        } else {
            setReloadTcaptcha(prev => prev+1)
            setTcaptchaInput("")
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
            setReloadCaptcha(prev => prev+1)
            setCaptchaInput("")
        }
        return errors
    }

    return (
        <>
            <section className="authentication">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5">
                            <div className="page-title title-wrapper">
                                <div className="title w-full">
                                    <h1>LOGIN</h1>
                                </div>
                            </div>
                            <div className={`form-wrapper m-auto widget ${isLoading ? "loading-wrapper" : ""}`}>
                                <form onSubmit={handlesubmit}>
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input type="email" className="form-control" placeholder="Your Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                                        <p className="error">{formErrors.email}</p>
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type={`${passTogle ? "text" : "password"}`} className="form-control" placeholder="Your Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                                        <span className="input-group-text" onClick={() => setPassToggle(!passTogle)}>
                                            {!passTogle ?
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><g id="_01_align_center" data-name="01 align center" fill="currentColor"><path d="M23.821,11.181v0a15.736,15.736,0,0,0-4.145-5.44l3.032-3.032L21.293,1.293,18,4.583A11.783,11.783,0,0,0,12,3C4.5,3,1.057,9.261.179,11.181a1.969,1.969,0,0,0,0,1.64,15.736,15.736,0,0,0,4.145,5.44L1.293,21.293l1.414,1.414L6,19.417A11.783,11.783,0,0,0,12,21c7.5,0,10.943-6.261,11.821-8.181A1.968,1.968,0,0,0,23.821,11.181ZM2,12.011C2.75,10.366,5.693,5,12,5a9.847,9.847,0,0,1,4.518,1.068L14.753,7.833a4.992,4.992,0,0,0-6.92,6.92L5.754,16.832A13.647,13.647,0,0,1,2,12.011ZM15,12a3,3,0,0,1-3,3,2.951,2.951,0,0,1-1.285-.3L14.7,10.715A2.951,2.951,0,0,1,15,12ZM9,12a3,3,0,0,1,3-3,2.951,2.951,0,0,1,1.285.3L9.3,13.285A2.951,2.951,0,0,1,9,12Zm3,7a9.847,9.847,0,0,1-4.518-1.068l1.765-1.765a4.992,4.992,0,0,0,6.92-6.92l2.078-2.078A13.584,13.584,0,0,1,22,12C21.236,13.657,18.292,19,12,19Z" fill="currentColor" /></g></svg>
                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor" /><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor" /></svg>
                                            }
                                        </span>
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
                                            <input className="form-check-input" type="checkbox" value="" id="remember" />
                                            <label className="form-check-label" htmlFor="remember">
                                                Remember Me
                                            </label>
                                        </div>
                                        <Link href="/forgot-password" className="forgot-pass">Forgot Password?</Link>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <button type="submit" className={`btn btn-primary w-100 ${isLoading ? "loading" : ""} `} aria-label="Submit">
                                            {!isLoading && (
                                                <>
                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="18" height="18"><path d="M7,22H5a3,3,0,0,1-3-3V5A3,3,0,0,1,5,2H7A1,1,0,0,0,7,0H5A5.006,5.006,0,0,0,0,5V19a5.006,5.006,0,0,0,5,5H7a1,1,0,0,0,0-2Z" fill="currentColor" /><path d="M23,11h0l-15.777.032a2.018,2.018,0,0,1,.326-.446l3.879-3.879a1,1,0,1,0-1.414-1.414L6.133,9.172a4,4,0,0,0,0,5.656l3.879,3.879a1,1,0,1,0,1.414-1.414L7.547,13.414a2.01,2.01,0,0,1-.291-.382L23,13a1,1,0,0,0,0-2Z" fill="currentColor" /></svg>
                                                    Login
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    {message.value &&
                                        <div className='message' style={{ marginTop: "20px" }}>
                                            <p className={message.type ? "success" : "error"}>{message.value}</p>
                                        </div>
                                    }
                                </form>
                                <div className="authentication-footer">
                                    <span className="social-divider">or</span>
                                    <p>Don't have an account? <Link href="/register">Register.</Link></p>
                                </div>
                            </div>
                            
                        </div>
                        <div className="col-md-5">
                            <div className="mt-2">
                                <h2 className="issue-title">We’ve recently updated our website.</h2>
                                <p className=" text-center error-title mb-2"> If your account was created before October 2025, please reset your <br />password to ensure a seamless experience.
                                </p>
                                <p className="issue-text">If you are experiencing any issues with login or sign-up, please <br /> contact us using the form below. Our support team will assist you promptly.</p>
                                <div className="text-center">
                                    <button className="m-auto btn btn-secondary mb-2" onClick={() => setHasProblem(!hasProblem)}>{hasProblem ? "X" : "Open Form"}</button>
                                </div>
                                {hasProblem &&
                                    <div className={`form-wrapper m-auto widget animate-fade ${pLoading ? "loading-wrapper" : ""}`}>
                                        <form onSubmit={handleProblemSubmit}>
                                            <div className="form-group">
                                                <label>Name <span className="error">*</span></label>
                                                <input type="text" placeholder="Your Name" className="form-control" value={pname} onChange={(e) => setPname(e.target.value)} required={true} />
                                            </div>
                                            <div className="form-group">
                                                <label>Email <span className="error">*</span></label>
                                                <input type="email" placeholder="Your Email" className="form-control" value={pemail} onChange={(e) => setPemail(e.target.value)} required={true} />
                                            </div>
                                            <div className="form-group">
                                                <label>Phone <span className="error">*</span></label>
                                                <input type="tel" placeholder="Your Phone Number" className="form-control" value={pphone} onChange={(e) => setPphone(e.target.value)} required={true} />
                                            </div>
                                            <div className="form-group">
                                                <label>Please Describe Your Issue <span className="error">*</span></label>
                                                <textarea maxlength="200" placeholder="Enter Issue" onChange={(e) => setPromessage(e.target.value)} defaultValue={promessage} required={true}></textarea>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="captchaReport">Enter Captcha Value</label>
                                                <input
                                                    type="text"
                                                    id="captchaReport"
                                                    className={`form-control`}
                                                    placeholder="Enter Captcha"
                                                    value={tcaptchaInput}
                                                    onChange={(e) => setTcaptchaInput(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group ">
                                                    <CanvasCaptcha reloadTrigger={reloadTcaptcha} onChange={setTcaptcha} />
                                            </div>
                                            <button className={`btn btn-secondary w-100 mt-2 ${pLoading ? "loading" : ""}`}>{pLoading ? "" : "Submit"}</button>
                                            {pMessage.value &&
                                                <div className='message' style={{ marginTop: "20px" }}>
                                                    <p className={pMessage.type ? "success" : "error"}>{pMessage.value}</p>
                                                </div>
                                            }
                                        </form>
                                    </div>
                                }
                            </div>
                            <div className="advertisement-wrapper">
                                <Swiper
                                    style={{ paddingTop: "0px", paddingBottom: "40px" }}
                                    modules={[Navigation, Autoplay, Pagination]}
                                    spaceBetween={20}
                                    slidesPerView={1}
                                    navigation
                                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                                    loop={true}
                                    pagination={{ clickable: true }}
                                    breakpoints={{
                                        480: { slidesPerView: 1 },
                                        768: { slidesPerView: 1 },
                                        1024: { slidesPerView: 1 },
                                    }}
                                >
                                    <SwiperSlide>
                                        <Link href="/product-category/brands/chemier">
                                            <img src="https://new.dawnscientific.com/public/storage/advertisement/login-promo-1.webp" alt="" />
                                        </Link>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <Link href="/product-category/brands/cusp-reagents">
                                            <img src="https://new.dawnscientific.com/public/storage/advertisement/login-promo-2.webp" alt="" />       
                                        </Link>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <Link href="/product-category/brands/lichrom">
                                            <img src="https://new.dawnscientific.com/public/storage/advertisement/login-promo-3.webp" alt="" />
                                        </Link>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <Link href="/product-category/brands/tristains">
                                            <img src="https://new.dawnscientific.com/public/storage/advertisement/login-promo-4.webp" alt="" />
                                        </Link>
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login