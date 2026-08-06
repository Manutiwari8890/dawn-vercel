"use client";
import { useState, useEffect } from 'react'
import CanvasCaptcha from '@/components/CanvasCaptcha';

export default function QuoteClient() {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    const [captchaInput, setCaptchaInput] = useState("");
    const [captcha, setCaptcha] = useState("");
    const [reloadCaptcha, setReloadCaptcha] = useState(0);
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        catalog : "",
        product : "",
        size : "",
        quantity : "",
        name : "",
        email : "",
        phone : "",
        company : "",
        message : ""
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (captchaInput !== captcha) {
            setReloadCaptcha(prev => prev + 1)
            setCaptchaInput("")
            return;
        }
        setLoading(true)
        try{
            const response = await fetch(`${baseUrl}get-quote`, {
                headers: { "Content-Type": "application/json" },
                method : "POST",
                body : JSON.stringify(data)
            });

            if(!response.ok){
                throw new Error("Get Quote Fetch Failed");
            }

            const result = await response.json();
            setData({
                catalog : "",
                product : "",
                size : "",
                quantity : "",
                name : "",
                email : "",
                phone : "",
                company : "",
                message : ""
            })
            setCaptchaInput("");
            setLoading(false)
            setMessage(result?.message)
        }catch(err){
            console.log(err)
        }
        
    }
    return (
        <>
            <div className='wrapper'>
                <div className='container'>
                    <div className='inner_banner'>
                        <h1>Request for Quotation</h1>
                        <p>Please provide us with your current chemical needs and let our team do the work on getting you the best prices on all your chemical needs.</p>
                    </div>
                    <div className='dawn_form back_gray'>
                        <form onSubmit={handleSubmit}>
                            <div className='row justify-content-start'>
                                <div className="form-group col_3">
                                    <label>Catalog#</label>
                                    <input type="text" value={data?.catalog} onChange={(e) => setData(prev => ({...prev, catalog : e.target.value}))} className="form-control" placeholder="Catalog" required />
                                </div>
                                <div className="form-group col_3">
                                    <label>Product*</label>
                                    <input type="text" value={data?.product} onChange={(e) => setData(prev => ({...prev, product : e.target.value}))} className="form-control" placeholder="Product" required />
                                </div>
                                <div className="form-group col_3">
                                    <label>Size* (Pack Size)</label>
                                    <input type="number" value={data?.size} onChange={(e) => setData(prev => ({...prev, size : e.target.value}))} className="form-control" placeholder="Size" required />
                                </div>
                                <div className="form-group col_3">
                                    <label>Quantity*</label>
                                    <input type="number" value={data?.quantity} onChange={(e) => setData(prev => ({...prev, quantity : e.target.value}))} className="form-control" placeholder="Quantity" required />
                                </div>
                                <div className="form-group col_3">
                                    <label>Your Name</label>
                                    <input type="text" value={data?.name} onChange={(e) => setData(prev => ({...prev, name : e.target.value}))} className="form-control" placeholder="Your Name" required />
                                </div>
                                <div className="form-group col_3">
                                    <label>Your Email</label>
                                    <input type="email" value={data?.email} onChange={(e) => setData(prev => ({...prev, email : e.target.value}))} className="form-control" placeholder="Your Email" required />
                                </div>
                                <div className="form-group col_3">
                                    <label>Phone Number</label>
                                    <input type="tel" value={data?.phone} onChange={(e) => setData(prev => ({...prev, phone : e.target.value}))} className="form-control" placeholder="Phone Number" required />
                                </div>
                                <div className="form-group col_3">
                                    <label>Company</label>
                                    <input type="text" value={data?.company} required onChange={(e) => setData(prev => ({...prev, company : e.target.value}))} className="form-control" placeholder="Company" />
                                </div>
                                <div className="form-group col_12">
                                    <label>Your Message</label>
                                    <textarea className="form-control" placeholder="Your Message" required  defaultValue={data?.message} onChange={(e) => setData(prev => ({...prev, message : e.target.value}))} />
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
                                        required
                                    />
                                </div>
                                <div className="form-group pt-2">
                                    <CanvasCaptcha reloadTrigger={reloadCaptcha} onChange={setCaptcha} />
                                </div>
                            </div>
                            {message && <p className="success">{message}</p>}
                            <div className="d-flex align-items-center">
                                <button type="submit" className={`btn btn-primary ${loading && "loading"}`} aria-label="Submit">{loading ? "" : "Get Quote"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}
