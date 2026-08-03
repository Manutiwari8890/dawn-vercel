"use client"
import { useState } from 'react';
import Link from 'next/link';


export default function CryogenicClient(){
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
                                        <img src="/assets/images/Lifescience_01-768x767.webp" />
                                    </div>
                                </div>
                                <div className="col-md-6 text">
                                    <h1>Cryogenic</h1>
                                    <div className={`details ${readMore ? 'active' : ''}`}>
                                        <h2 className='app_inner_subtitle'>Buy Cryogenic Products from Dawn Scientific: High-quality products for Laboratory Use</h2>
                                        <p>Cryogenic uses in different scientific areas range from research to industrial processes. At Dawn Scientific, we have a diverse portfolio of Cryogenic products to cater to the unique requirements of laboratories. Be it the storage of biological specimens or the performance of sensitive experiments, our cryogenic solutions offer the strength and performance that you need to deliver the reliable results that you need.</p>
                                        <h2>Shop Cryogenic Products for Laboratory Efficiency</h2>
                                        <p>Quality and reliability are what make all the difference when you buy Cryogenic Laboratory products. At Dawn Scientific, we are up-to-date with the utmost care in cryogenic storage and handling systems, so our products are set for safety, efficiency, and optimal performance.</p>
                                        <h2>Our range of Cryogenic products includes:</h2>
                                        <p>• Freezer Racks: Organize and Maximize Storage Space within Laboratory freezers.<br/>
                                        • CryoBox Racks: Secure and Efficient Cryogenic Vials and Containers.<br/>
                                        • Dewar Flasks: Storage and transportation of liquid nitrogen and other cryogenic fluids.<br/>
                                        • Cryogenic Storage Units: Designed for sample long-term preservation and safety.<br/>
                                        • Freezer Cryogenic Vials: Extremely useful in storing and freezing samples safely.<br/>
                                        • Freezer Boxes: Safe and strong to collect, organize, and keep samples of cryogenic substances.<br/>
                                        • Aprons and Gloves: Professional protection against cryogenic mishaps.<br/>
                                        • Explore more.<br/>
                                        Every product is manufactured to exact quality standards, ensuring that your lab cryogenic needs are met with precision and reliability.</p>
                                        <h2>Why Buy Cryogenic Products for Laboratory Use?</h2>
                                        <p>Cryogenic processes have a special need for specialized equipment and tools to perform proper safety, efficiency, and sample integrity. For buying Cryogenic products intended for Laboratory use from Dawn Scientific, you will have much more reason to enjoy:<br/>
                                        • Exceptional Durable Products: Designed for durability against extreme temperatures and abusive conditions.<br/>
                                        • Risk Reduction Handling Solutions for Cryogenic processes<br/>
                                        • Options in Cryogenic products for many cryogenic applications<br/>
                                        • Reliable Results: Instruments and tools that ensure precise and accurate results.</p>
                                        <h2>Our Cryogenic products are necessary for use in the following applications:/h2&gt;</h2>
                                        <p>Biological Sample Preservation. Cells, tissues, and other biological samples are protected for use in further research or therapy.<br/>
                                        1. Cryogenic Research: The performance of low-temperature experiments and processes.<br/>
                                        2. Industrial Applications: Support of cryogenic applications in manufacturing.<br/>
                                        3. Many more.</p>
                                        <h2>Cryogenic Products Shop from Dawn Scientific</h2>
                                        <p>Dawn Scientific offers cryogenic solutions that are reliable, efficient, and tailored specifically to the needs of your lab. We understand that sensitivity and precision are critical whenever working with biological materials or industrial-grade cryogenics. At Dawn Scientific, our Cryogenic product lines provide reliability with a user-friendly experience.<br/>
                                        • Freezer racks and CryoBox racks are great organizational solutions for handling cryogenic samples efficiently.<br/>
                                        • Dewar flasks are the best option for transporting liquid nitrogen or other cryogenic fluids because they provide stability with minimum evaporation.<br/>
                                        • Protective gloves and aprons are great tools that protect personnel from risks associated with exposure during handling of cryogenic materials.<br/>
                                        • Cryogenic vials and storage boxes are perfect for freezing biological samples safely and keeping them organized.<br/>
                                        • Explore more.</p>
                                        <h2>Shop and Buy Cryogenic Products for Laboratory Convenience</h2>
                                        <p>When you shop Cryogenic products for Laboratory use at Dawn Scientific, you get reliable tools and accessories that help you handle cryogenic materials. Our products are designed to facilitate improved laboratory workflows, minimize the risk of errors, and ensure consistent results.</p>
                                        <h2>Why Choose Dawn Scientific for Cryogenic Products?</h2>
                                        <p>• Unmatched Quality: High-quality materials for long-lasting performance and safety.<br/>
                                        • Diverse Product Range: Wide range of cryogenic solutions designed to meet all your laboratory requirements.<br/>
                                        • Competitive Pricing: Affordable to any size laboratory.<br/>
                                        • Easy Online Shopping Experience: Streamlined purchasing and fast, reliable delivery.<br/>
                                        Partnering with Dawn Scientific puts only the best cryogenic tools in your laboratory to support accuracy and reliability. From sample storage to material handling, our Cryogenic products are engineered to enhance your laboratory’s performance.</p>
                                    </div>
                                    <button className="btn-collapse site-title" onClick={() => setReadMore(!readMore)} aria-label="Toggle Read More">Read {readMore ? 'Less' : 'More'}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container app_portfolio_title'>
                    <div className='row'>
                        <h4>Cryogenic Product Portfolio</h4>
                    </div>
                </div>
                <div className='container applications_brands applications_brands_inner'>
                    <div className='row'>												
                        <div className='apl_col'>
                            <Link href="/product-category/consumables-supplies/racks/freezer-rack" title="Accuris" className='apl_fill'>
                                <img loading="lazy" decoding="async" width="422" height="203" src="/assets/images/Rack_icons_05a-300x300.webp" className="attachment-full size-full wd-lazy-fade wd-loaded" alt="" title="Accuris Logo  Dawn Scientific"/>
                            </Link>
                            <h3>Freezer Rack</h3>
                            <Link href="/product-category/consumables-supplies/racks/freezer-rack" className='apl_link'>10 products</Link>
                        </div>
                        <div className='apl_col'>
                            <Link href="/product-category/consumables-supplies/lab-safety/apron" title="Adam Equipment" className='apl_fill'>
                                <img loading="lazy" decoding="async" width="421" height="202" src="/assets/images/Apron-300x300.webp" className="attachment-full size-full wd-lazy-fade wd-loaded" alt="" title="Adam Equipment  Dawn Scientific" />
                            </Link>
                            <h3>Apron</h3>
                            <Link href="/product-category/consumables-supplies/lab-safety/apron" className='apl_link'>71 products</Link>
                        </div>
                        <div className='apl_col'>
                            <Link href="/product-category/consumables-supplies/racks/cryobox-rack" title="Agilent" className='apl_fill'>
                                <img loading="lazy" decoding="async" width="421" height="202" src="/assets/images/Rack_icons_08-300x300.webp" className="attachment-full size-full wd-lazy-fade wd-loaded" alt="" title="Agilent Technology  Dawn Scientific" />
                            </Link>
                            <h3>CryoBox Rack</h3>
                            <Link href="/product-category/consumables-supplies/racks/cryobox-rack" className='apl_link'>10 products</Link>
                        </div>
                        <div className='apl_col'>
                            <Link href="/product-category/consumables-supplies/racks/cryogenic-storage-racks" title="Ahlstrom-Munksjo" className='apl_fill'>
                                <img loading="lazy" decoding="async" width="210" height="100" src="/assets/images/Rack_icons_10a-300x300.webp" className="attachment-full size-full wd-lazy-fade wd-loaded" alt="" title="Ahlstrommunksjo  Dawn Scientific" />
                            </Link>
                            <h3>Cryogenic Storage</h3>
                            <Link href="/product-category/consumables-supplies/racks/cryogenic-storage-racks" className='apl_link'>35 products</Link>
                        </div>
                        <div className='apl_col'>
                            <Link href="/product-category/consumables-supplies/flask-consumables-supplies/dewar-flask" title="Alconox" className='apl_fill'>
                                <img loading="lazy" decoding="async" width="1415" height="515" src="/assets/images/Dewar-Flask-300x300.webp" className="attachment-full size-full wd-lazy-fade wd-loaded" alt="Alconox Brand Logo  Precision Lab Cleaning Detergents Supplier at Dawn Scientific" title="Alconox Logo  Trusted Lab Cleaning Detergents  Dawn Scientific" />
                            </Link>
                            <h3>Dewar Flask</h3>
                            <Link href="/product-category/consumables-supplies/flask-consumables-supplies/dewar-flask" className='apl_link'>36 products</Link>
                        </div>
                        <div className='apl_col'>
                            <Link href="/product-category/consumables-supplies/vials/freeze-cryogenic-vials" title="Aldon" className='apl_fill'>
                                <img loading="lazy" decoding="async" width="421" height="202" src="/assets/images/Freeze-cryogenic-vials-300x300.webp" className="attachment-full size-full wd-lazy-fade wd-loaded" alt="" title="Aldonlogo  Dawn Scientific" />
                            </Link>
                            <h3>Freeze Cryogenic Vials</h3>
                            <Link href="/product-category/consumables-supplies/vials/freeze-cryogenic-vials" className='apl_link'>17 products</Link>
                        </div>
                        
                        <div className='apl_col'>
                            <Link href="/product-category/consumables-supplies/boxes/freezer-box" title="Aldon" className='apl_fill'>
                                <img loading="lazy" decoding="async" width="421" height="202" src="/assets/images/Storagebox_25_05-300x300.webp" className="attachment-full size-full wd-lazy-fade wd-loaded" alt="" title="Aldonlogo  Dawn Scientific" />
                            </Link>
                            <h3>Freezer Box</h3>
                            <Link href="/product-category/consumables-supplies/boxes/freezer-box" className='apl_link'>32 products</Link>
                        </div>
                        <div className='apl_col'>
                            <Link href="/product-category/consumables-supplies/glove" title="Aldon" className='apl_fill'>
                                <img loading="lazy" decoding="async" width="421" height="202" src="/assets/images/DawnIcons25_Gloves-300x300.webp" className="attachment-full size-full wd-lazy-fade wd-loaded" alt="" title="Aldonlogo  Dawn Scientific" />
                            </Link>
                            <h3>Glove</h3>
                            <Link href="/product-category/consumables-supplies/glove" className='apl_link'>3274 products</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

