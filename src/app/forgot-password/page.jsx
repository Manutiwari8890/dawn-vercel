"use client";

import { useEffect, useState, useContext } from 'react'
import { AuthContext } from '@/context/AuthContext';
import CanvasCaptcha from '@/components/CanvasCaptcha';

export default function Page() {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const { user, logout, isLoggedIn, login } = useContext(AuthContext);
    const [captchaInput, setCaptchaInput] = useState("");
    const [captcha, setCaptcha] = useState("");
    const [reloadCaptcha, setReloadCaptcha] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [message, setMessage] = useState({
        type: false,
        value: "",
    });

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
    }, []);

    const handlesubmit = (e) => {
        e.preventDefault();

        let regobj = {
            email: email,
            "cf-turnstile-response": null,
        };

        const formErrors = validate(regobj);
        setFormErrors(formErrors);

        const raw = JSON.stringify(regobj);
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: raw,
            redirect: "follow"
        };


        if (Object.keys(formErrors).length === 0) {
            setIsLoading(true);

            fetch(`${baseUrl}forgot-password`, requestOptions)
                .then((response) => {
                    return response.json().then((data) => ({
                        status: response.status,
                        body: data,
                    }))
                })
                .then(({ status, body }) => {
                    if (body) {
                        let msg = "";
                        if (typeof body.message === "string") {
                            msg = body.message;
                        }
                        else if (typeof body.message === "object" && body.message !== null) {
                            const firstErrorKey = Object.keys(body.message)[0];
                            if (firstErrorKey) {
                                msg = body.message[firstErrorKey][0];
                            }
                        }
                        setMessage({
                            type: body.status,
                            value: msg,
                        })
                        setReloadCaptcha(prev => prev+1)
                        setCaptchaInput("")
                    }
                    setIsLoading(false);
                })
                .catch((error) => console.error(error));

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
        if(captchaInput !== captcha) {
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
                                    <h1>FORGOT PASSWORD</h1>
                                </div>
                            </div>
                            <div className={`form-wrapper widget ${isLoading ? "loading-wrapper" : ""}`}>
                                <div className="logo">
                                    <img src="assets/images/Website-logo-1.webp" alt="" />
                                </div>
                                <form onSubmit={handlesubmit}>
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input type="email" className="form-control" placeholder="Your Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                                        {formErrors?.email && <p className="error">{formErrors.email}</p>}
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
                                    <div className="d-flex align-items-center mt-2">
                                        <button type="submit" className={`btn btn-primary w-100 ${isLoading ? "loading" : ""}`} aria-label="Submit">
                                            {!isLoading && (
                                                <>
                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="18" height="18"><path d="M7,22H5a3,3,0,0,1-3-3V5A3,3,0,0,1,5,2H7A1,1,0,0,0,7,0H5A5.006,5.006,0,0,0,0,5V19a5.006,5.006,0,0,0,5,5H7a1,1,0,0,0,0-2Z" fill="currentColor" /><path d="M23,11h0l-15.777.032a2.018,2.018,0,0,1,.326-.446l3.879-3.879a1,1,0,1,0-1.414-1.414L6.133,9.172a4,4,0,0,0,0,5.656l3.879,3.879a1,1,0,1,0,1.414-1.414L7.547,13.414a2.01,2.01,0,0,1-.291-.382L23,13a1,1,0,0,0,0-2Z" fill="currentColor" /></svg>
                                                    Submit
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    {message?.value &&
                                        <div className='message' style={{ marginTop: "20px" }}>
                                            <p className={message.type ? "success" : "error"}>{message?.value}</p>
                                        </div>
                                    }
                                </form>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="advertisement-wrapper">
                                <img src="https://new.dawnscientific.com/public/storage/advertisement/login-promo.webp" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}