"use client";


import { useState, useEffect } from 'react'
import CanvasCaptcha from '@/components/CanvasCaptcha';

export default function JoinClient() {
    const [captchaInput, setCaptchaInput] = useState("");
    const [captcha, setCaptcha] = useState("");
    const [reloadCaptcha, setReloadCaptcha] = useState(0);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (captchaInput !== captcha) {
            setReloadCaptcha(prev => prev + 1)
            setCaptchaInput("")
        }
    }

    return (
        <>
            <div className='wrapper'>
                <div className='container'>
                    <div className='joinus_box'>
                        <div className='joinus_left back_yellow_dark'>
                            <img src='assets/images/join-us.webp' />
                        </div>
                        <div className='joinus_right'>
                            <div className='dawn_form back_gray'>
                                <form onSubmit={handleSubmit}>
                                    <h3>Upload Your Resume</h3>
                                    <div className="form-group">
                                        <label>Your Name (required)</label>
                                        <input type="text" className="form-control" placeholder="Your Name" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Your Email (required)</label>
                                        <input type="email" className="form-control" placeholder="Your Email" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Your Phone (required)</label>
                                        <input type="tel" className="form-control" placeholder="Your Phone" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Attachment</label>
                                        <input type="file" className="form-control" placeholder="Quantity" required />
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
                                    <div className="form-group pt-2">
                                        <CanvasCaptcha reloadTrigger={reloadCaptcha} onChange={setCaptcha} />
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <button type="submit" className="btn btn-primary" aria-label="Submit">Send</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
