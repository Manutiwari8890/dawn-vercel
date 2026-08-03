"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function LiquidClient(){
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
                                        <img src="/assets/images/Liquid-handling-768x768.webp" />
                                    </div>
                                </div>
                                <div className="col-md-6 text">
                                    <h1>Liquid handling</h1>
                                    <div className={`details ${readMore ? 'active' : ''}`}>
                                        <h2 className='app_inner_subtitle'>Buy Liquid Handling Products from Dawn Scientific- To improve your Laboratory accuracy and productivity</h2>
                                        <p>In any laboratory, the task of liquid handling is significant for providing reliability in conducting experiments or analysis. The range of products available under the banner of Dawn Scientific serves the specific requirements of any research and industrial laboratories with consistent performance, accuracy, and durability at various levels such as small research labs to highly industrial labs.</p>
                                        <h2>Liquid Handling Product Lines</h2>
                                        <p>We are proud to offer a portfolio of Liquid Handling products to satisfy every laboratory requirement. This portfolio includes:<br/>
                                        • Pipette tips: For accurate liquid measurement and transfer in applications.<br/>
                                        • Micropipettes and pipettors: Ergonomically designed for high accuracy in pipetting.<br/>
                                        • Transfer pipettes: Versatile and disposable for routine liquid transfers.<br/>
                                        • Centrifuge and microcentrifuge tubes: Essential for sample storage, processing, and separation.<br/>
                                        • Reagent reservoirs: Conveniently designed for multichannel pipette applications.<br/>
                                        • Syringe filters: Filter samples in preparation and filtration processes.<br/>
                                        • Test tubes and culture tubes: A useful aid for experiments and samples.<br/>
                                        • Explore more<br/>
                                        Dawn Scientific offers you the finest quality of reliable Liquid Handling products when you purchase from it.</p>
                                        <h2>Liquid Handling Products Applications</h2>
                                        <p>Our Liquid Handling product range caters to all laboratory applications to provide the best performance of these scientific disciplines:<br/>
                                        1. Sample Preparation: Get reliable liquid transfers and prepare samples consistently.<br/>
                                        2. Chemical Analysis: Handle reagents accurately for reliable analytical results.<br/>
                                        3. Molecular biology: Conduct sensitive assays with good-quality consumables and equipment.<br/>
                                        4. Cell Culture: Sterile and reliable items are used to reduce or eliminate the risk of contamination during its handling.<br/>
                                        5. Pharmaceutical Research: Quality assurance of measurements and industrial standards.</p>
                                        <h2>Advantages to Choose Dawn Scientific for Liquid Handling</h2>
                                        <p>Buy Laboratory’s Liquid Handling products from Dawn Scientific and get the advantage of:<br/>
                                        • Premium Quality of Material: The durability and strength of the material offer the life of performance.<br/>
                                        • A wide selection: All kinds of pipettes, syringes, storage vials, and so on.<br/>
                                        • Affordable: Price competition to fit the bill for labs big or small and with different budgets.<br/>
                                        • Convenience: Simple ordering process online, bulk or few quantities, delivered right to your doorstep.</p>
                                        <h2>Shop for Laboratory Efficiency: Liquid Handling Products</h2>
                                        <p>At Dawn Scientific, we’re committed to offering a one-stop solution for all your laboratory needs. Be it for research, diagnostic tests, or industrial projects, our Liquid Handling products are designed to make your lab run smoothly.<br/>
                                        Filter pipette tips and serological pipettes to transfer pipettes and syringe filters-comprehensive inventory covering all your liquid handling requirements. Reliability, precision, and convenience ensure you’ll be working on actually doing science, not worrying over equipment performance.</p>
                                        <h2>Why Shop Liquid Handling Products for Lab Requirements?</h2>
                                        <p>Effective liquid handling is the backbone of a good laboratory workflow. It can make or break your accuracy, no matter if you’re pipetting minute sample volumes or handling bulk solutions. That is why it’s very important to select the best products for your lab.<br/>
                                        Ordering Liquid Handling products for your laboratory is easily available: a great variety of solutions, pipette tips, transfer pipettes, test tubes, and more. All products were created with high standards for precision and the least errors, making them must-haves for daily tasks and the most demanding experiments in laboratories.</p>
                                        <h2>Buy Liquid Handling Products for Laboratory Convenience.</h2>
                                        <p>When you purchase Liquid Handling products from Dawn Scientific for laboratory use, you can be sure that you are investing in quality, precision, and value. We have a vast portfolio that includes consumables and equipment suitable for laboratories in biotechnology, pharmaceuticals, academia, and healthcare.<br/>
                                        Choose Dawn Scientific for more than just lab supplies – choose success and efficiency in your experiments and workflows. Pipette controllers, reagent reservoirs, or transfer pipettes-end Whatever it is, Dawn Scientific’s products will improve the workflow of your lab to facilitate critical scientific advances.</p>
                                    </div>
                                    <button className="btn-collapse site-title" onClick={() => setReadMore(!readMore)} aria-label="Toggle Read More">Read {readMore ? 'Less' : 'More'}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container app_portfolio_title'>
                    <div className='row'>
                        <h4>Liquid handling Product Portfolio</h4>
                    </div>
                </div>
                <div className='container applications_brands applications_brands_inner'>
                    <div className='row'>												
                        <div className='apl_col'>
                            <Link href="/product-category/consumables-supplies/pipette-tips-consumables-supplies/tips" title="Accuris" className='apl_fill'>
                                <img src="/assets/images/PD-Tips-300x300.webp"/>
                            </Link>
                            <h3>PD-Tips</h3>
                            <Link href="/product-category/consumables-supplies/pipette-tips-consumables-supplies/tips" className='apl_link'>21 products</Link>
                        </div>												
                        <div className='apl_col'>
                            <Link href="/product-category/consumables-supplies/pipets/aspirating-plasteur-pipets" title="Accuris" className='apl_fill'>
                                <img src="/assets/images/Aspirating-Plasteur®-Pipets-300x300.webp"/>
                            </Link>
                            <h3>Aspirating &amp; Plasteur Pipets</h3>
                            <Link href="/product-category/consumables-supplies/pipets/aspirating-plasteur-pipets" className='apl_link'>51 products</Link>
                        </div>												
                        <div className='apl_col'>
                            <Link href="/product-category/consumables-supplies/tubes/centrifuge-tubes" title="Accuris" className='apl_fill'>
                                <img src="/assets/images/Centrifuge-tubes-300x300.webp"/>
                            </Link>
                            <h3>Centrifuge Tubes</h3>
                            <Link href="/product-category/consumables-supplies/tubes/centrifuge-tubes" className='apl_link'>383 products</Link>
                        </div>												
                        <div className='apl_col'>
                            <Link href="/product-category/consumables-supplies/tubes/culture-tubes" title="Accuris" className='apl_fill'>
                                <img src="/assets/images/Culture-tubes-300x300.webp"/>
                            </Link>
                            <h3>Culture Tubes</h3>
                            <Link href="/product-category/consumables-supplies/tubes/culture-tubes" className='apl_link'>165 products</Link>
                        </div>												
                        <div className='apl_col'>
                            <Link href="/product-category/consumables-supplies/pipette-tips-consumables-supplies/filter-pipette-tip" title="Accuris" className='apl_fill'>
                                <img src="/assets/images/Filter-Pipette-Tip-300x300.webp"/>
                            </Link>
                            <h3>Filter Pipette Tip</h3>
                            <Link href="/product-category/consumables-supplies/pipette-tips-consumables-supplies/filter-pipette-tip" className='apl_link'>49 products</Link>
                        </div>												
                        <div className='apl_col'>
                            <Link href="/product-category/consumables-supplies/caps-closures/flange-plug" title="Accuris" className='apl_fill'>
                                <img src="/assets/images/Cap_icons_03-300x300.webp"/>
                            </Link>
                            <h3>Flange Plug</h3>
                            <Link href="/product-category/consumables-supplies/caps-closures/flange-plug" className='apl_link'>73 products</Link>
                        </div>												
                        <div className='apl_col'>
                            <Link href="/product-category/consumables-supplies/tubes/microcentrifuge-tube" title="Accuris" className='apl_fill'>
                                <img src="/assets/images/Microcentrifuge-tube-300x300.webp"/>
                            </Link>
                            <h3>Microcentrifuge Tube</h3>
                            <Link href="/product-category/consumables-supplies/tubes/microcentrifuge-tube" className='apl_link'>134 products</Link>
                        </div>												
                        <div className='apl_col'>
                            <Link href="/product-category/consumables-supplies/pipette-tips-consumables-supplies/micropipette" title="Accuris" className='apl_fill'>
                                <img src="/assets/images/Micropipette-300x300.webp"/>
                            </Link>
                            <h3>Micropipette</h3>
                            <Link href="/product-category/consumables-supplies/pipette-tips-consumables-supplies/micropipette" className='apl_link'>14 products</Link>
                        </div>												
                        <div className='apl_col'>
                            <Link href="/product-category/consumables-supplies/pipets/pipet-controller" title="Accuris" className='apl_fill'>
                                <img src="/assets/images/Pipet-Controller-300x300.webp"/>
                            </Link>
                            <h3>Pipet Controller</h3>
                            <Link href="/product-category/consumables-supplies/pipets/pipet-controller" className='apl_link'>66 products</Link>
                        </div>												
                        <div className='apl_col'>
                            <Link href="/product-category/consumables-supplies/filtration/pipette-fillers" title="Accuris" className='apl_fill'>
                                <img src="/assets/images/Pipette-fillers-300x300.webp"/>
                            </Link>
                            <h3>Pipette Fillers</h3>
                            <Link href="/product-category/consumables-supplies/filtration/pipette-fillers" className='apl_link'>24 products</Link>
                        </div>												
                        <div className='apl_col'>
                            <Link href="/product-category/consumables-supplies/pipette-tips-consumables-supplies" title="Accuris" className='apl_fill'>
                                <img src="/assets/images/Pipette-tips-300x300.webp"/>
                            </Link>
                            <h3>Pipette tips</h3>
                            <Link href="/product-category/consumables-supplies/pipette-tips-consumables-supplies" className='apl_link'>697 products</Link>
                        </div>												
                        <div className='apl_col'>
                            <Link href="/product-category/consumables-supplies/pipets/pipettors" title="Accuris" className='apl_fill'>
                                <img src="/assets/images/Pipettors-300x300.webp"/>
                            </Link>
                            <h3>Pipettors</h3>
                            <Link href="/product-category/consumables-supplies/pipets/pipettors" className='apl_link'>118 products</Link>
                        </div>												
                        <div className='apl_col'>
                            <Link href="/product-category/consumables-supplies/reservoir-consumables-supplies/reservoir" title="Accuris" className='apl_fill'>
                                <img src="/assets/images/Reagent-reservoir-300x300.webp"/>
                            </Link>
                            <h3>Reagent Reservoir</h3>
                            <Link href="/product-category/consumables-supplies/reservoir-consumables-supplies/reservoir" className='apl_link'>118 products</Link>
                        </div>												
                        <div className='apl_col'>
                            <Link href="/product-category/consumables-supplies/tubes/sample-tube-tubes" title="Accuris" className='apl_fill'>
                                <img src="/assets/images/Sampletube_01.webp"/>
                            </Link>
                            <h3>Sample Tube</h3>
                            <Link href="/product-category/consumables-supplies/tubes/sample-tube-tubes" className='apl_link'>168 products</Link>
                        </div>												
                        <div className='apl_col'>
                            <Link href="/product-category/consumables-supplies/pipets/serological-pipette" title="Accuris" className='apl_fill'>
                                <img src="/assets/images/2_Serological-Pipette-300x236.webp"/>
                            </Link>
                            <h3>Serological Pipette</h3>
                            <Link href="/product-category/consumables-supplies/pipets/serological-pipette" className='apl_link'>313 products</Link>
                        </div>												
                        <div className='apl_col'>
                            <Link href="/product-category/consumables-supplies/vials/storage-vial" title="Accuris" className='apl_fill'>
                                <img src="/assets/images/DawnIcons25_Vial_A6-300x300.webp"/>
                            </Link>
                            <h3>Storage Vial</h3>
                            <Link href="/product-category/consumables-supplies/vials/storage-vial" className='apl_link'>6 products</Link>
                        </div>												
                        <div className='apl_col'>
                            <Link href="/product-category/consumables-supplies/filtration/syringe-filters" title="Accuris" className='apl_fill'>
                                <img src="/assets/images/Syringe-Filters-300x300 (1).webp"/>
                            </Link>
                            <h3>Syringe Filters</h3>
                            <Link href="/product-category/consumables-supplies/filtration/syringe-filters" className='apl_link'>1184 products</Link>
                        </div>												
                        <div className='apl_col'>
                            <Link href="/product-category/consumables-supplies/tubes/test-tubes-tubes" title="Accuris" className='apl_fill'>
                                <img src="/assets/images/Test-tubes-300x300.webp"/>
                            </Link>
                            <h3>Test Tubes</h3>
                            <Link href="/product-category/consumables-supplies/tubes/test-tubes-tubes" className='apl_link'>215 products</Link>
                        </div>												
                        <div className='apl_col'>
                            <Link href="/product-category/consumables-supplies/pipets/transfer-pipettes-consumables" title="Accuris" className='apl_fill'>
                                <img src="/assets/images/Consumables_8-300x236.webp"/>
                            </Link>
                            <h3>Transfer Pipettes</h3>
                            <Link href="/product-category/consumables-supplies/pipets/transfer-pipettes-consumables" className='apl_link'>285 products</Link>
                        </div>												
                        <div className='apl_col'>
                            <Link href="/product-category/consumables-supplies/tubes/transport-tube" title="Accuris" className='apl_fill'>
                                <img src="/assets/images/Transport-tube-300x300.webp"/>
                            </Link>
                            <h3>Transport Tube</h3>
                            <Link href="/product-category/consumables-supplies/tubes/transport-tube" className='apl_link'>32 products</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
