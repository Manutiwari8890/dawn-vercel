"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function SafetyClient(){
    const [readMore, setReadMore] = useState(false);
    
    return (
        <>
            <div className='wrapper applications applications_inner'>
                <div className='container'>
                    <div className='row'>
                        <div className="widget collapse">
                            <div className="details-wrapper">
                                <div className="col-md-4 img-area">
                                    <div>
                                        <img src="/assets/images/Safety-768x768.webp" />
                                    </div>
                                </div>
                                <div className="col-md-6 text">
                                    <h1>Safety</h1>
                                    <div className={`details ${readMore ? 'active' : ''}`}>
                                        <h2 className='app_inner_subtitle'>Buy Safety related products from Dawn Scientific- Total Protection for Your Laboratory Professionals</h2>
                                        <p>Laboratory environments demand the highest levels of safety. Dawn Scientific offers a broad range of safety products designed to ensure the well-being of personnel and the integrity of your laboratory work. From personal protective equipment (PPE) to necessary accessories, our portfolio meets the diverse needs of modern laboratories.</p>
                                        <h2>Shop Safety Products for Laboratory Protection</h2>
                                        <p>When you buy Safety products for Laboratory applications, quality and reliability are critical. Our portfolio of safety solutions is designed with superior materials and innovative designs to ensure users receive maximum protection and comfort. Whether you’re dealing with hazardous chemicals, fragile samples, or general lab work, our safety products improve your ability to work securely and efficiently.</p>
                                        <h2>The following are some of our comprehensive Safety products portfolio:</h2>
                                        <p>• Gloves: Various types of high-quality gloves for resistance against chemicals, biological agents, and physical threats.<br/>
                                        • Lab Coats: Solid and comfortable coats that can protect thoroughly and offer adequate coverage.<br/>
                                        • Shoe Covers: Meant for hygiene and contamination prevention purposes in sensitive settings.<br/>
                                        • Explore more.</p>
                                        <h2>Why Purchase Safety Lab Products?</h2>
                                        <p>The Laboratory’s safety ensures that the processes in a laboratory are compliant but that, more importantly, it offers room for scientific progression. Purchasing your Safety products for Laboratory from Dawn Scientific avails your reliable solutions:<br/>
                                        • Reliable: Engineered to meet industry standards of safety and performance.<br/>
                                        • Versatile: Suitable for a wide variety of laboratory applications and scenarios.<br/>
                                        • Cost-Effective: High-quality protection at affordable price.<br/>
                                        • Important: A critical component in maintaining a safe, functional working space.</p>
                                        <h2>Our Safety products cater for:</h2>
                                        <p>• Chemical Labs: Defense against acids and alkali corrosive and reactive products.<br/>
                                        • Biological Research Lab: Protective barriers against microbial agents and cross-contaminations<br/>
                                        • Industrial Lab: Stronger solutions for areas of higher demand<br/>
                                        • Academic Institutions: Reasonable cost options for use in student laboratories and educational setups</p>
                                        <h2>Safety Products: Shop From Dawn Scientific</h2>
                                        <p>Shopping for Laboratory needs for Safety at Dawn Scientific always means that you are purchasing safety for your lab to be efficiently operated. Here’s what our key products offer.<br/>
                                        1. Gloves: Large varieties of gloves, focusing on all kinds of purposes, ranging from chemical resistant to puncture proof as well as enhanced grip.<br/>
                                        2. Lab Coats: This is about comfort with utility, a spill and splash-resistant stain-resistant Lab coat, and a professional look, too.<br/>
                                        3. Shoe Covers: They are the perfect shoe covers for keeping sterile environments clean and easy to use, ensuring hygiene in critical spaces.</p>
                                        <h2>Shop and Buy Safety Products for Laboratory Peace of Mind</h2>
                                        <p>Dawn Scientific is your safety laboratory equipment partner. Our products are designed with the needs of the user in mind, offering protection that doesn’t compromise usability or comfort. When you purchase Safety products for Laboratory from us, you get:<br/>
                                        • Unmatched Quality: Crafted from superior materials, products for long-lasting performance.<br/>
                                        • Wide Selection: Vast options to cater to different laboratory settings.<br/>
                                        • Competitive Pricing: Affordable solutions for labs of any size.<br/>
                                        • Fast Delivery: Reliable shipping ensures your safety gear is available when you need it.</p>
                                        <h2>Why Choose Dawn Scientific for Safety Products?</h2>
                                        <p>At Dawn Scientific, we understand that safety is the foundation of effective laboratory work. Our Safety products portfolio is built to support your team, protect your samples, and maintain compliance with regulatory standards.<br/>
                                        • Comprehensive Options: From gloves to lab coats, our range covers every aspect of laboratory safety.<br/>
                                        • High-performance products delivering consistent protection and reliability.<br/>
                                        • Customer-centric approach Personalized solutions for your lab.<br/>
                                        No matter whether you are outfitting a newly installed lab or replenishing your safety supplies- Dawn Scientific provides trusted products that ensure your workspace as a whole is protected yet productive. Browse through the assortment today and take full advantage of the assurance supplied by top-of-the-class laboratory safety equipment.</p>
                                    </div>
                                    <button className="btn-collapse site-title" onClick={() => setReadMore(!readMore)} aria-label="Toggle Read More">Read {readMore ? 'Less' : 'More'}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container app_portfolio_title'>
                    <div className='row'>
                        <h4>Safety Product Portfolio</h4>
                    </div>
                </div>
                <div className='container applications_brands applications_brands_inner'>
                    <div className='row'>												
                        <div className='apl_col'>
                            <Link href="/product-category/consumables-supplies/glove" title="Accuris" className='apl_fill'>
                                <img src="/assets/images/DawnIcons25_Gloves-300x300.webp"/>
                            </Link>
                            <h3>Analytical Columns HPLC</h3>
                            <Link href="/product-category/consumables-supplies/glove" className='apl_link'>3274 products</Link>
                        </div>
                        <div className='apl_col'>
                            <Link href="/product-category/consumables-supplies/lab-safety/lab-coat" title="Adam Equipment" className='apl_fill'>
                                <img src="/assets/images/Lab-coat-100x100.webp" />
                            </Link>
                            <h3>Chromatographic Column</h3>
                            <Link href="/product-category/consumables-supplies/lab-safety/lab-coat" className='apl_link'>90 products</Link>
                        </div>
                        <div className='apl_col'>
                            <Link href="/product-category/consumables-supplies/lab-safety/shoe-covers" title="Agilent" className='apl_fill'>
                                <img src="/assets/images/Shoe-cover-150x150.webp" />
                            </Link>
                            <h3>HPLC Guard Column</h3>
                            <Link href="/product-category/consumables-supplies/lab-safety/shoe-covers" className='apl_link'>17 products</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
