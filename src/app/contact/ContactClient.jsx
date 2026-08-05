"use client"
import { useState, useEffect } from 'react'

import CanvasCaptcha from '@/components/CanvasCaptcha';

export default function ContactClient() {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const [captchaInput, setCaptchaInput] = useState("");
    const [captcha, setCaptcha] = useState("");
    const [reloadCaptcha, setReloadCaptcha] = useState(0);

    const [contact, setContact] = useState(
        {
            name: "",
            email: "",
            subject: "",
            message: "",
        }
    )
    
    const [formError, setFormErrors] = useState({});
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleContact = (e) => {
        const { name, value } = e.target;
        setContact(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = FormValidate(contact);
        setFormErrors(errors);

        if (Object.keys(errors).length <= 0) {
            setLoading(true);
            fetch(`${baseUrl}contact-us`, {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({...contact, "cf-turnstile-response" : null})
            }).then((response) => {
                return response.json().then((data) => ({
                    status: response.status,
                    body: data,
                }))
            }).then(({ status, body }) => {
                setMessageType(body.status ? true : false)
                setMessage(body.message);
                setContact({
                    name: "",
                    email: "",
                    subject: "",
                    message: "",
                })
                setLoading(false);
                setReloadCaptcha(prev => prev+1)
                setCaptchaInput("")                       
            }).catch((err) => {
                setMessage("Validation error: " + err.message);
                setLoading(false);
            })
        }
    }

    const FormValidate = (val) => {
        const error = {}

        if (!val.name) {
            error.name = "The Name field is required."
        }
        if (!val.email) {
            error.email = "The Email field is required."
        }
        if (!val.subject) {
            error.subject = "The Subject field is required."
        }
        if (!val.message) {
            error.message = "The Message field is required."
        }
        if(captchaInput !== captcha) {
            error.captcha = "Captcha is required"
                setReloadCaptcha(prev => prev+1)
                setCaptchaInput("")
        } 
        return error
    }

    return (
        <>
            <div className='wrapper'>
                <div className='container'>
                    <div className='inner_banner'>
                        <h1>Contact</h1>
                    </div>
                    <div className='contact_box'>
                        <div className='contact_left'>
                            <div className={`dawn_form back_gray ${loading ? "loading-wrapper" : ""}`}>
                                <form onSubmit={handleSubmit}>
                                    <div className='row'>
                                        <div className="form-group col_6">
                                            <label>Your Name</label>
                                            <input type="text" className="form-control" name="name" value={contact.name} placeholder="Your Name" onChange={handleContact} />
                                            {formError.name && <p className="error">{formError.name}</p>}
                                        </div>
                                        <div className="form-group col_6">
                                            <label>Your Email</label>
                                            <input type="email" className="form-control" name="email" value={contact.email} placeholder="Your Email" onChange={handleContact} />
                                            {formError.email && <p className="error">{formError.email}</p>}
                                        </div>
                                        <div className="form-group col_12">
                                            <label>Subject</label>
                                            <input type="text" className="form-control" name="subject" value={contact.subject} placeholder="Subject" onChange={handleContact} />
                                            {formError.subject && <p className="error">{formError.subject}</p>}
                                        </div>
                                        <div className="form-group col_12">
                                            <label>Your Message</label>
                                            <textarea maxLength="200" className="form-control" name="message" rows="5" value={contact.message} placeholder="Your Message" onChange={handleContact} />
                                            {formError.message && <p className="error">{formError.message}</p>}
                                        </div>
                                        <div className="col_12">
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
                                        </div>
                                        <div className="message mt-1">
                                            {message && <p className={messageType ? "success" : "error"}>{message}</p>}
                                        </div>
                                        <div className="d-flex align-items-center mt-2">
                                            <button type="submit" className={`btn btn-primary ${loading ? "loading" : ""}`} aria-label="Submit">{!loading ? "Send" : ""}</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className='contact_right'>
                            <div className="contact-icon">
                                <p>
                                    <span className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="16" height="16">
                                            <path d="M11.986,1.002C7.159,1.068,2.309,5.81,2.309,10.457c0,6.416,8.773,12.146,9.145,12.382,.472,.301,.942,.104,1.112-.012,.368-.252,9.021-6.25,9.126-12.418-.146-4.77-4.85-9.341-9.705-9.407Zm2.826,12.129c-.94,.94-1.865,1.4-2.817,1.4-.076,0-.152-.003-.229-.009-.877-.067-1.696-.509-2.578-1.392-1.866-1.865-1.866-3.758,0-5.624,1.867-1.866,3.758-1.865,5.625,0,1.865,1.867,1.865,3.759,0,5.624Z" fill="currentColor" />
                                            <path d="M12.018,8.108c-.409,0-.85,.246-1.416,.812-1.196,1.196-.966,1.829,0,2.796,.518,.519,.949,.783,1.316,.812,.416,.045,.909-.24,1.479-.812,1.195-1.195,.966-1.829,0-2.796-.508-.509-.925-.812-1.379-.812Z" fill="currentColor" />
                                        </svg>
                                    </span>   
                                    Address: 
                                    16 Evesboro-Medford Road, Unit A2, Medford NJ 08055
                                    {/* 121, Liberty Street, Metuchen, NJ 08840     */}
                                </p>
                            </div>
                            <div className="contact-icon">
                                <p>
                                    <span className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"  width="16" height="16"><path d="M23,11a1,1,0,0,1-1-1,8.008,8.008,0,0,0-8-8,1,1,0,0,1,0-2A10.011,10.011,0,0,1,24,10,1,1,0,0,1,23,11Zm-3-1a6,6,0,0,0-6-6,1,1,0,1,0,0,2,4,4,0,0,1,4,4,1,1,0,0,0,2,0Zm2.183,12.164.91-1.049a3.1,3.1,0,0,0,0-4.377c-.031-.031-2.437-1.882-2.437-1.882a3.1,3.1,0,0,0-4.281.006l-1.906,1.606A12.784,12.784,0,0,1,7.537,9.524l1.6-1.9a3.1,3.1,0,0,0,.007-4.282S7.291.939,7.26.908A3.082,3.082,0,0,0,2.934.862l-1.15,1C-5.01,9.744,9.62,24.261,17.762,24A6.155,6.155,0,0,0,22.183,22.164Z" fill="currentColor" /></svg>
                                    </span>
                                    <a href='tel:732-902-6300'>Phone: 732-902-6300</a>
                                </p>
                            </div>
                            <div className="contact-icon">
                                <p>
                                    <span className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"  width="16" height="16"><path d="M18.5,2H8.24C7.432,.795,6.057,0,4.5,0,2.019,0,0,2.019,0,4.5v14c0,3.032,2.468,5.5,5.5,5.5h13c3.032,0,5.5-2.468,5.5-5.5V7.5c0-3.032-2.468-5.5-5.5-5.5ZM3,4.5c0-.827,.673-1.5,1.5-1.5s1.5,.673,1.5,1.5V14.5c0,.827-.673,1.5-1.5,1.5s-1.5-.673-1.5-1.5V4.5Zm15.5,16.5H5.5c-1.296,0-2.363-.99-2.488-2.253,.466,.164,.966,.253,1.488,.253,2.481,0,4.5-2.019,4.5-4.5V5h5v1c0,1.105,.895,2,2,2h5v10.5c0,1.379-1.121,2.5-2.5,2.5Zm-4.5-8.5c0,.828-.672,1.5-1.5,1.5s-1.5-.672-1.5-1.5,.672-1.5,1.5-1.5,1.5,.672,1.5,1.5Zm5,0c0,.828-.672,1.5-1.5,1.5s-1.5-.672-1.5-1.5,.672-1.5,1.5-1.5,1.5,.672,1.5,1.5Zm-5,5c0,.828-.672,1.5-1.5,1.5s-1.5-.672-1.5-1.5,.672-1.5,1.5-1.5,1.5,.672,1.5,1.5Zm5,0c0,.828-.672,1.5-1.5,1.5s-1.5-.672-1.5-1.5,.672-1.5,1.5-1.5,1.5,.672,1.5,1.5Z" fill="currentColor" /></svg>
                                    </span>
                                    <a href='to:973-802-1005'>Fax: 973-802-1005</a>
                                </p>
                            </div>
                            <div className="contact-icon">
                                <p>
                                    <span className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24"  width="16" height="16"><path d="M19,1H5A5.006,5.006,0,0,0,0,6V18a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V6A5.006,5.006,0,0,0,19,1ZM5,3H19a3,3,0,0,1,2.78,1.887l-7.658,7.659a3.007,3.007,0,0,1-4.244,0L2.22,4.887A3,3,0,0,1,5,3ZM19,21H5a3,3,0,0,1-3-3V7.5L8.464,13.96a5.007,5.007,0,0,0,7.072,0L22,7.5V18A3,3,0,0,1,19,21Z" fill="currentColor" /></svg>
                                    </span>
                                <a href='mailto:sales@dawnscientific.com'> E-Mail: sales@dawnscientific.com</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
