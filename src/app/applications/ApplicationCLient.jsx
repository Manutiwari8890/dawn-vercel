"use client"
import { useState } from 'react';
import Link from 'next/link';

export default function ApplicationClient() {
    const [readMore, setReadMore] = useState(false);

    return (
        <>
            <div className='wrapper applications'>
                <div className='container'>
                    <div className='inner_banner'>
                        <h1>Applications</h1>
                    </div>
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className="widget collapse">
                            <div className="details-wrapper">
                                <div className="col-md-4 img-area">
                                    <img src="/assets/images/Application-img-768x512.webp" alt="Application" />
                                </div>
                                <div className="col-md-6 text">
                                    <h2>Products for various Application requirements for your laboratory needs at Dawn Scientific.</h2>
                                    <div className={`details ${readMore ? 'active' : ''}`}>
                                        <p>Dawn Scientific recognizes the fact that every move you take in your scientific work has to be precise and reliable. Thus, we offer a full scope of products for various application to serve all needs of specialized workflows in your scientific activities. Whether in chromatography, microbiology, sample preparation, or safety, we assure the most suitable quality and performance by industry standards.</p>
                                        <h3>Chromatography: Precision in Separation</h3>
                                        <p>Applications of Chromatography For chromatographic needs, high-purity products are important to ensure accurate results. At Dawn Scientific, we provide Needs-specific solutions for gas chromatography, liquid chromatography, and HPLC systems. Special solvents, strong columns, and more ensure that you get precise separations and the chance to reproduce results. Browse our catalog today and purchase application-specific products for unsurpassed performance.</p>
                                        <h3>Easy Sample Preparation</h3>
                                        <p>State-of-the-art sample preparation equipment for high-performance workflows. Some of the equipment includes weighing boats, filter paper, and many more working on the principle of high-throughput low error. High-speed samples demand robust preparation to let an unbiased analytical process take place. Our sample preparation products guarantee accuracy with precision.</p>
                                        <h3>Multi-Channel Pipettor and Liquid Handling Solutions</h3>
                                        <p>Efficient liquid handling is the basis of modern laboratories. Whether pipetting across multi-well plates or handling sensitive reagents, our multi-channel pipettors are engineered for precision and user comfort. Increase your productivity with liquid handling products that work seamlessly into your workflows. Browse our range to buy application-wise products tailored for liquid handling tasks.</p>
                                        <h3>Microbiological Applications</h3>
                                        <p>Microbiological research and quality control are based on strict standards and high-quality consumables. Dawn Scientific supplies culture tubes, Pasteur pipettes, and many more for microbiological applications in various fields. Our products are application-wise, and they find trust in the reliability and observance of the regulatory requirements.</p>
                                        <h3>Cryogenic solutions for sensitive storage:</h3>
                                        <p>Cryogenic applications require special equipment and consumables for the storage of biological samples, cells, and reagents at safe temperatures. Dawn Scientific provides cryogenic products ensuring integrity in samples at ultra-low temperatures. Buy application-specific products for critical storage environments to guarantee safety and performance for your cryogenic needs.</p>
                                        <h3>Safety: Laboratory Well-being Prioritization</h3>
                                        <p>No compromise is made on safety in any lab. Dawn Scientific provides a range of products that fall from personal equipment to spill management kits, ensuring the safe execution of work in laboratories. Choose Dawn Scientific for application-wise products that fit the lab’s safety protocols.</p>
                                        <h3>Why Choose Dawn Scientific?</h3>
                                        <p>Quality, innovation, and customer satisfaction. Those make us stand out. Scientific applications have numerous requirements that can be addressed with our wide range of application-specific products. Excellence is empowering. Research, technicians, and industries arm us with such. Check out Dawn Scientific’s wide range of products and order needs-specific products for your laboratory today to raise the bar of its capability.</p>
                                        <p>Discover the perfect solutions for your applications by browsing our product categories. From chromatography to microbiological and safety needs, we’re here to support every step of your scientific journey. View products now and experience the Dawn Scientific difference!</p>

                                    </div>
                                    <button className="btn-collapse site-title" onClick={() => setReadMore(!readMore)} aria-label="Toggle Read More">Read {readMore ? 'Less' : 'More'}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container applications_brands'>
                    <div className='row'>
                        <div className='apl_col'>
                            <Link href="/application-chromatography-supplies" title="Accuris" className='apl_fill'>
                                <img loading="lazy" decoding="async" width="422" height="203" src="/assets/images/Capsule-Filters-1-150x150.webp" className="attachment-full size-full wd-lazy-fade wd-loaded" alt="Accuris" title="Accuris  Dawn Scientific" />
                            </Link>
                            <h3>Chromatography</h3>
                            <Link href="/application-chromatography-supplies" className='apl_link'>View Products</Link>
                        </div>
                        <div className='apl_col'>
                            <Link href="/application-sample-preparation" title="Adam Equipment" className='apl_fill'>
                                <img loading="lazy" decoding="async" width="421" height="202" src="/assets/images/Plates_icon_03-150x150.webp" className="attachment-full size-full wd-lazy-fade wd-loaded" alt="Adam Equipment" title="Adam Equipment Dawn Scientific" />
                            </Link>
                            <h3>Sample Preparation</h3>
                            <Link href="/application-sample-preparation" className='apl_link'>View Products</Link>
                        </div>
                        <div className='apl_col'>
                            <Link href="/application-liquid-handling" title="Agilent" className='apl_fill'>
                                <img loading="lazy" decoding="async" width="421" height="202" src="/assets/images/Multi-Channel-Pipettor-150x150.webp" className="attachment-full size-full wd-lazy-fade wd-loaded" alt="Agilent Technology" title="Agilent Technology  Dawn Scientific" />
                            </Link>
                            <h3>Liquid handling</h3>
                            <Link href="/application-liquid-handling" className='apl_link'>View Products</Link>
                        </div>
                        <div className='apl_col'>
                            <Link href="/application-microbiological" title="Ahlstrom-Munksjo" className='apl_fill'>
                                <img loading="lazy" decoding="async" width="210" height="100" src="/assets/images/Petri-dishes-100x100.webp" className="attachment-full size-full wd-lazy-fade wd-loaded" alt="Ahlstrommunk" title="Ahlstrommun  Dawn Scientific" />
                            </Link>
                            <h3>Microbiological</h3>
                            <Link href="/application-microbiological" className='apl_link'>View Products</Link>
                        </div>
                        <div className='apl_col'>
                            <Link href="/application-cryogenic" title="Alconox" className='apl_fill'>
                                <img loading="lazy" decoding="async" width="1415" height="515" src="/assets/images/Rack_icons_10a-150x150-1-100x100.webp" className="attachment-full size-full wd-lazy-fade wd-loaded" alt="Alconox Brand  Precision Lab Cleaning Detergents Supplier at Dawn Scientific" title="Alconox Logo  Trusted Lab Cleaning Detergents  Dawn Scientific" />
                            </Link>
                            <h3>Cryogenic</h3>
                            <Link href="/application-cryogenic" className='apl_link'>View Products</Link>
                        </div>
                        <div className='apl_col'>
                            <Link href="/brand/aldon/" title="Aldon" className='apl_fill'>
                                <img loading="lazy" decoding="async" width="421" height="202" src="/assets/images/Lab-coat-100x100.webp" className="attachment-full size-full wd-lazy-fade wd-loaded" alt="Aldon" title="Aldon Dawn Scientific" />
                            </Link>
                            <h3>Safety</h3>
                            <Link href="/application-safety" className='apl_link'>View Products</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
