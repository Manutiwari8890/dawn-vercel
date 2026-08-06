"use client";
import {useState, useEffect} from 'react'
import Link from "next/link";
import CanvasCaptcha from './CanvasCaptcha';

function Footer() {
    const [captchaInput, setCaptchaInput] = useState("");
    const [emailCaptcha, setEmailCaptcha] = useState("");
    const [reloadEmailCaptcha, setReloadEmailCaptcha] = useState(0);
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
    }
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState({
        type : false,
        value : "",
    });
    const [loading, setLoading] = useState(false);

    const SendMail = async (e) => {
        e.preventDefault();
        if(captchaInput !== emailCaptcha){
            setReloadEmailCaptcha(prev => prev+1)
            return
        }
            setLoading(true);
            try{
                const response = await fetch(`${baseUrl}subscribe`, {
                    headers:{"Authorization" : `Bearer ${token}`,  "Content-Type": "application/json"},
                    method : "POST", 
                    body : JSON.stringify({
                        email : email
                    })
                })
                if(!response.ok){
                    throw new Error("Subscribe Fetch Failed");
                }
                const result = await response.json();
                if(result.status){
                    setMessage({
                        type : true,
                        value : result.message
                    });
                    setEmail("");
                    setCaptchaInput("");
                }else{
                    setMessage({
                        type : false,
                        value : result.message.email[0]
                    });
                }
            }catch(err){
                console.log(err)
            }finally{
                setLoading(false)
            }
    }

    return (
        <>
            <section className="pre-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="title">
                                <h2>Subscribe Now</h2>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <form onSubmit={(e) => SendMail(e)}>
                                <div className="d-flex align-center justify-content-end gap-10 form-wrapper">
                                    <div className="form-group">
                                        <input type="email" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            id="captcha"
                                            className={`w-full py-2 px-4 border-t border-primary text-sm text-white font-semibold flex-1`}
                                            placeholder="Enter Captcha"
                                            value={captchaInput}
                                            onChange={(e) => setCaptchaInput(e.target.value)}
                                        />
                                    </div>
                                        <div className="w-max flex gap-2 w-full overflow-hidden">
                                            <CanvasCaptcha  reloadTrigger={reloadEmailCaptcha} onChange={setEmailCaptcha} />
                                        </div>
                                    <button className={`btn btn-primary ${loading ? "loading" : ""}`} aria-label="Subscribe">{!loading ? "Submit" : ""}</button>
                                </div>
                            </form>
                            {message.value &&
                                <p className={`${message?.type ? "success" : "error"}`}>{message.value}</p>                            
                            }
                        </div>
                    </div>
                </div>
            </section>
            <footer>
                <div className="container">
                    <div className="d-flex gap-15">
                        <div className="single-box">
                            <Link href="/" className="logo" aria-label="Dawn Scientific">
                                <img src="/assets/images/Dawn Scientific-White-Logo-01.webp" alt="Dawn Scientific" loading="lazy" width="200" height="60" />
                            </Link>
                            <ul>
                                <li><a href="tel:1-800-DAWN-SCI" aria-label="1-800-DAWN-SCI" className="inquiry-link">
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" width="14" height="14" viewBox="0 0 24 24"><path d="M21,12.424V11A9,9,0,0,0,3,11v1.424A5,5,0,0,0,5,22a2,2,0,0,0,2-2V14a2,2,0,0,0-2-2V11a7,7,0,0,1,14,0v1a2,2,0,0,0-2,2v6H14a1,1,0,0,0,0,2h5a5,5,0,0,0,2-9.576ZM5,20H5a3,3,0,0,1,0-6Zm14,0V14a3,3,0,0,1,0,6Z" fill="currentColor" /></svg>
                                        </span>
                                        1-800-DAWN-SCI
                                    </a>
                                </li>
                                <li><a href="tel:732-902-6300" aria-label="732-902-6300" className="inquiry-link">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="14" height="14"><path d="M23,11a1,1,0,0,1-1-1,8.008,8.008,0,0,0-8-8,1,1,0,0,1,0-2A10.011,10.011,0,0,1,24,10,1,1,0,0,1,23,11Zm-3-1a6,6,0,0,0-6-6,1,1,0,1,0,0,2,4,4,0,0,1,4,4,1,1,0,0,0,2,0Zm2.183,12.164.91-1.049a3.1,3.1,0,0,0,0-4.377c-.031-.031-2.437-1.882-2.437-1.882a3.1,3.1,0,0,0-4.281.006l-1.906,1.606A12.784,12.784,0,0,1,7.537,9.524l1.6-1.9a3.1,3.1,0,0,0,.007-4.282S7.291.939,7.26.908A3.082,3.082,0,0,0,2.934.862l-1.15,1C-5.01,9.744,9.62,24.261,17.762,24A6.155,6.155,0,0,0,22.183,22.164Z" fill="currentColor" /></svg>
                                    </span>
                                    732-902-6300
                                    </a>
                                </li>
                                <li><a href="tel:973-802-1005" aria-label="973-802-1005" className="inquiry-link">
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"  width="14" height="14"><path d="M18.5,2H8.24C7.432,.795,6.057,0,4.5,0,2.019,0,0,2.019,0,4.5v14c0,3.032,2.468,5.5,5.5,5.5h13c3.032,0,5.5-2.468,5.5-5.5V7.5c0-3.032-2.468-5.5-5.5-5.5ZM3,4.5c0-.827,.673-1.5,1.5-1.5s1.5,.673,1.5,1.5V14.5c0,.827-.673,1.5-1.5,1.5s-1.5-.673-1.5-1.5V4.5Zm15.5,16.5H5.5c-1.296,0-2.363-.99-2.488-2.253,.466,.164,.966,.253,1.488,.253,2.481,0,4.5-2.019,4.5-4.5V5h5v1c0,1.105,.895,2,2,2h5v10.5c0,1.379-1.121,2.5-2.5,2.5Zm-4.5-8.5c0,.828-.672,1.5-1.5,1.5s-1.5-.672-1.5-1.5,.672-1.5,1.5-1.5,1.5,.672,1.5,1.5Zm5,0c0,.828-.672,1.5-1.5,1.5s-1.5-.672-1.5-1.5,.672-1.5,1.5-1.5,1.5,.672,1.5,1.5Zm-5,5c0,.828-.672,1.5-1.5,1.5s-1.5-.672-1.5-1.5,.672-1.5,1.5-1.5,1.5,.672,1.5,1.5Zm5,0c0,.828-.672,1.5-1.5,1.5s-1.5-.672-1.5-1.5,.672-1.5,1.5-1.5,1.5,.672,1.5,1.5Z" fill="currentColor" /></svg>
                                        </span>
                                        973-802-1005
                                    </a></li>
                                <li><a href="mailto:sales@dawnscientific.com" aria-label="sales@dawnscientific.com" className="inquiry-link">
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24"  width="14" height="14"><path d="M19,1H5A5.006,5.006,0,0,0,0,6V18a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V6A5.006,5.006,0,0,0,19,1ZM5,3H19a3,3,0,0,1,2.78,1.887l-7.658,7.659a3.007,3.007,0,0,1-4.244,0L2.22,4.887A3,3,0,0,1,5,3ZM19,21H5a3,3,0,0,1-3-3V7.5L8.464,13.96a5.007,5.007,0,0,0,7.072,0L22,7.5V18A3,3,0,0,1,19,21Z" fill="currentColor" /></svg>
                                        </span>
                                        sales@dawnscientific.com
                                    </a>
                                </li>
                                <li>
                                    <a className="inquiry-link" aria-label="Dawn Scientific Address">
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" className="px-2" width="14" height="14">
                                                <path d="M11.986,1.002C7.159,1.068,2.309,5.81,2.309,10.457c0,6.416,8.773,12.146,9.145,12.382,.472,.301,.942,.104,1.112-.012,.368-.252,9.021-6.25,9.126-12.418-.146-4.77-4.85-9.341-9.705-9.407Zm2.826,12.129c-.94,.94-1.865,1.4-2.817,1.4-.076,0-.152-.003-.229-.009-.877-.067-1.696-.509-2.578-1.392-1.866-1.865-1.866-3.758,0-5.624,1.867-1.866,3.758-1.865,5.625,0,1.865,1.867,1.865,3.759,0,5.624Z" fill="currentColor" />
                                                <path d="M12.018,8.108c-.409,0-.85,.246-1.416,.812-1.196,1.196-.966,1.829,0,2.796,.518,.519,.949,.783,1.316,.812,.416,.045,.909-.24,1.479-.812,1.195-1.195,.966-1.829,0-2.796-.508-.509-.925-.812-1.379-.812Z" fill="currentColor" />
                                            </svg>
                                        </span>
                                        16 Evesboro-Medford Road, Unit A2, Medford NJ 08055
                                        {/* 121, Liberty Street, Metuchen, NJ 08840    */}
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="single-box">
                            <h3>About</h3>
                            <ul>
                                <li><Link href="/about" className="nav-item" aria-label="About Dawn Scientific">About Us</Link></li>
                                <li><Link href="/contact" className="nav-item" aria-label="Contact Dawn Scientific">Contact Us</Link></li>
                                <li><Link href="/career" className="nav-item" aria-label="Career With Dawn Scientific">Career</Link></li>
                                <li><Link href="/privacy-policy" className="nav-item" aria-label="Privacy Policy">Privacy Policy</Link></li>
                                <li><Link href="/terms-and-conditions" className="nav-item" aria-label="Terms and Conditions">Terms and Conditions of Sale</Link></li>
                                <li><Link href="/refund-and-returns-policy" className="nav-item" aria-label="Refund and Return Policy">Refund and Returns Policy</Link></li>
                            </ul>
                        </div>
                        <div className="single-box">
                            <h3>Resources</h3>
                            <ul>
                                <li><Link href="/blogs" className="nav-item" aria-label="News and Blogs">News and Blogs</Link></li>
                                {/* <li><a className="nav-item" href="https://new.dawnscientific.com/public/DSI-Brand_2022_8102022_12Page.pdf" target="_blank" aria-label="Catalog">Catalogue</a></li> */}
                                <li><Link href="/literature" className="nav-item" aria-label="Literatur">Catalogue</Link></li>
                                <li><a href="https://doc.dawnscientific.com/" className="nav-item" aria-label="COA and SDS">COA and SDS</a></li>
                                <li><Link href="/faq" className="nav-item" aria-label="FAQ's">FAQ's</Link></li>
                                <li><Link href="/suppliers" className="nav-item" aria-label="Our Suppliers">Our Suppliers</Link></li>
                            </ul>
                        </div>
                        <div className="single-box">
                            <h3>Events</h3>
                            <ul>
                                <li><Link href="/dcat-week-2026" className="nav-item">DCAT Week 2026</Link></li>
                             </ul>

                        </div>
                        
                        
                        <div className="single-box">
                            <h3>My Account</h3>
                            <ul>
                                <li><Link href="/user/account" className="nav-item" aria-label="my account">My Account</Link></li>
                                <li><Link href="/user/orders" className="nav-item" aria-label="Orders">Order History</Link></li>
                                <li><Link href="/billing-terms-and-conditions" className="nav-item" aria-label="Billing Terms & Conditions">Billing Terms and Conditions</Link></li>
                            </ul>
                            <img className="ssl-image" src="/assets/images/positivessl_trust_seal_md_167x42.webp" width="167" height="42" alt="SSL Certificate" loading="lazy" />
                        </div>
                    </div>
                    <hr />
                    <div className="copyright">
                        <p>DAWN SCIENTIFIC INC  <span className="light">2025</span></p>
                        <div className="social-links">
                            <a href="https://www.facebook.com/dawnscientificusa" target="_blank" aria-label="Dawn Scientific Facebook">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="16" height="16"><path d="M240 363.3L240 576L356 576L356 363.3L442.5 363.3L460.5 265.5L356 265.5L356 230.9C356 179.2 376.3 159.4 428.7 159.4C445 159.4 458.1 159.8 465.7 160.6L465.7 71.9C451.4 68 416.4 64 396.2 64C289.3 64 240 114.5 240 223.4L240 265.5L174 265.5L174 363.3L240 363.3z" fill="currentColor" /></svg>
                            </a>
                            <a href="https://x.com/scientific_dawn" target="_blank" aria-label="Dawn Scientific Twitter">
                                <svg xmlns="http://www.w3.org/2000/svg" id="Capa_1" data-name="Capa 1" viewBox="0 0 24 24" width="16" height="16">
                                    <path d="m18.9,1.153h3.682l-8.042,9.189,9.46,12.506h-7.405l-5.804-7.583-6.634,7.583H.469l8.6-9.831L0,1.153h7.593l5.241,6.931,6.065-6.931Zm-1.293,19.494h2.039L6.482,3.239h-2.19l13.314,17.408Z" fill="currentColor" />
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/dawn.scientific/" target="_blank" aria-label="Dawn Scientific Instagram">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 24 24" xmlSpace="preserve" width="16" height="16">
                                    <g>
                                        <path d="M12,2.162c3.204,0,3.584,0.012,4.849,0.07c1.308,0.06,2.655,0.358,3.608,1.311c0.962,0.962,1.251,2.296,1.311,3.608   c0.058,1.265,0.07,1.645,0.07,4.849c0,3.204-0.012,3.584-0.07,4.849c-0.059,1.301-0.364,2.661-1.311,3.608   c-0.962,0.962-2.295,1.251-3.608,1.311c-1.265,0.058-1.645,0.07-4.849,0.07s-3.584-0.012-4.849-0.07   c-1.291-0.059-2.669-0.371-3.608-1.311c-0.957-0.957-1.251-2.304-1.311-3.608c-0.058-1.265-0.07-1.645-0.07-4.849   c0-3.204,0.012-3.584,0.07-4.849c0.059-1.296,0.367-2.664,1.311-3.608c0.96-0.96,2.299-1.251,3.608-1.311   C8.416,2.174,8.796,2.162,12,2.162 M12,0C8.741,0,8.332,0.014,7.052,0.072C5.197,0.157,3.355,0.673,2.014,2.014   C0.668,3.36,0.157,5.198,0.072,7.052C0.014,8.332,0,8.741,0,12c0,3.259,0.014,3.668,0.072,4.948c0.085,1.853,0.603,3.7,1.942,5.038   c1.345,1.345,3.186,1.857,5.038,1.942C8.332,23.986,8.741,24,12,24c3.259,0,3.668-0.014,4.948-0.072   c1.854-0.085,3.698-0.602,5.038-1.942c1.347-1.347,1.857-3.184,1.942-5.038C23.986,15.668,24,15.259,24,12   c0-3.259-0.014-3.668-0.072-4.948c-0.085-1.855-0.602-3.698-1.942-5.038c-1.343-1.343-3.189-1.858-5.038-1.942   C15.668,0.014,15.259,0,12,0z" fill="currentColor" />
                                        <path d="M12,5.838c-3.403,0-6.162,2.759-6.162,6.162c0,3.403,2.759,6.162,6.162,6.162s6.162-2.759,6.162-6.162   C18.162,8.597,15.403,5.838,12,5.838z M12,16c-2.209,0-4-1.791-4-4s1.791-4,4-4s4,1.791,4,4S14.209,16,12,16z" fill="currentColor" />
                                        <circle cx="18.406" cy="5.594" r="1.44" fill="currentColor" />
                                    </g>
                                </svg>
                            </a>
                            <a href="https://www.youtube.com/channel/UC-8U2lwMhO27_Bet7EO0T2A" target="_blank" aria-label="Dawn Scientific Youtube">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 24 24" xmlSpace="preserve" width="16" height="16">
                                    <g id="XMLID_184_">
                                        <path d="M23.498,6.186c-0.276-1.039-1.089-1.858-2.122-2.136C19.505,3.546,12,3.546,12,3.546s-7.505,0-9.377,0.504   C1.591,4.328,0.778,5.146,0.502,6.186C0,8.07,0,12,0,12s0,3.93,0.502,5.814c0.276,1.039,1.089,1.858,2.122,2.136   C4.495,20.454,12,20.454,12,20.454s7.505,0,9.377-0.504c1.032-0.278,1.845-1.096,2.122-2.136C24,15.93,24,12,24,12   S24,8.07,23.498,6.186z M9.546,15.569V8.431L15.818,12L9.546,15.569z" fill="currentColor" />
                                    </g>
                                </svg>
                            </a>
                            <a href="https://in.pinterest.com/dawnscientific/" target="_blank" aria-label="Dawn Scientific Pinterest">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="16" height="16"><path d="M568 320C568 457 457 568 320 568C294.4 568 269.8 564.1 246.6 556.9C256.7 540.4 271.8 513.4 277.4 491.9C280.4 480.3 292.8 432.9 292.8 432.9C300.9 448.3 324.5 461.4 349.6 461.4C424.4 461.4 478.3 392.6 478.3 307.1C478.3 225.2 411.4 163.9 325.4 163.9C218.4 163.9 161.5 235.7 161.5 314C161.5 350.4 180.9 395.7 211.8 410.1C216.5 412.3 219 411.3 220.1 406.8C220.9 403.4 225.1 386.5 227 378.7C227.6 376.2 227.3 374 225.3 371.6C215.2 359.1 207 336.3 207 315C207 260.3 248.4 207.4 319 207.4C379.9 207.4 422.6 248.9 422.6 308.3C422.6 375.4 388.7 421.9 344.6 421.9C320.3 421.9 302 401.8 307.9 377.1C314.9 347.6 328.4 315.8 328.4 294.5C328.4 275.5 318.2 259.6 297 259.6C272.1 259.6 252.1 285.3 252.1 319.8C252.1 341.8 259.5 356.6 259.5 356.6C259.5 356.6 235 460.4 230.5 479.8C225.5 501.2 227.5 531.4 229.6 551C137.4 514.9 72 425.1 72 320C72 183 183 72 320 72C457 72 568 183 568 320z" fill="currentColor" /></svg>
                            </a>
                            <a href="https://www.linkedin.com/company/dawn-scientific/" target="_blank" aria-label="Dawn Scientific Linked In">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="16" height="16"><path d="M196.3 512L103.4 512L103.4 212.9L196.3 212.9L196.3 512zM149.8 172.1C120.1 172.1 96 147.5 96 117.8C96 103.5 101.7 89.9 111.8 79.8C121.9 69.7 135.6 64 149.8 64C164 64 177.7 69.7 187.8 79.8C197.9 89.9 203.6 103.6 203.6 117.8C203.6 147.5 179.5 172.1 149.8 172.1zM543.9 512L451.2 512L451.2 366.4C451.2 331.7 450.5 287.2 402.9 287.2C354.6 287.2 347.2 324.9 347.2 363.9L347.2 512L254.4 512L254.4 212.9L343.5 212.9L343.5 253.7L344.8 253.7C357.2 230.2 387.5 205.4 432.7 205.4C526.7 205.4 544 267.3 544 347.7L544 512L543.9 512z" fill="currentColor" /></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
            <button id="scroll-top" aria-label="Scroll Top">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M9.38346 14.5459V3.01257L6.2768 6.11924L5.3328 5.1619L10.0501 0.443237L14.7688 5.1619L13.8248 6.12057L10.7168 3.01257V14.5459H9.38346ZM2.87146 19.1099C2.25724 19.1099 1.7448 18.9046 1.33413 18.4939C0.923463 18.0832 0.717686 17.5703 0.716797 16.9552V13.7246H2.05013V16.9552C2.05013 17.1606 2.13546 17.349 2.30613 17.5206C2.4768 17.6921 2.6648 17.7775 2.87013 17.7766H17.2301C17.4346 17.7766 17.6226 17.6912 17.7941 17.5206C17.9657 17.3499 18.051 17.1615 18.0501 16.9552V13.7246H19.3835V16.9552C19.3835 17.5695 19.1781 18.0819 18.7675 18.4926C18.3568 18.9032 17.8439 19.109 17.2288 19.1099H2.87146Z" fill="#fff"></path>
                </svg>
            </button>
        </>
    )
}

export default Footer;
