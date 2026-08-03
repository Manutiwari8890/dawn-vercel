"use client"
import Link from "next/link";
import { useState, useRef } from "react";

export default function AlchoholClient(){

    const [readMore, setReadMore] = useState(false);

    const proSolvent = useRef(null);
    const [show, setShow] = useState(false);
    const scrollToSection = (ref) => {
        setShow(!show);
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <div className='wrapper applications applications_inner'>
                <div className='container'>
                    <div className='row'>
                        <div className="widget collapse">
                            <div className="details-wrapper">
                                <div className="col-md-4 img-area">
                                    <div>
                                        <img src="/assets/images/Alcohols-768x512.webp" alt="Alcohols" />
                                    </div>
                                </div>
                                <div className="col-md-6 text">
                                    <h1>Alcohol’s</h1>
                                    <div className={`details ${readMore ? 'active' : ''}`}>
                                        <h2>Lab Alcohols for Research and Industrial Applications From Dawn Scientific</h2>
                                        <p>Alcohols by Dawn Scientific: We offer alcohols of the highest quality for laboratories and research institutions, as well as for industrial purposes. Alcohols play a role in the chemical processes involved in scientific research and industrial manufacturing as solvents, disinfectants, reagents, and intermediates. The spectrum ranges from ethanol for biological applications, to methanol for analytical purposes, and to specialized alcohols such as benzyl or butyl alcohol. </p>
                                        <p>We source our alcohols from major manufacturers like ChemieR, DSI, and Greenfield. Our alcohols are available in multiple grades-USP, ACS, lab grade, and anhydrous-to ensure that precision and uniformity are achievable whether it’s on the smallest laboratory scale or the scale of industrial procedures. With Dawn Scientific, you get alcohols in a variety of sizes-from 1 liter to bulk orders-so your supply will always be exactly what you need. </p>
                                        <h4>Some Types of Alcohols</h4>
                                        <p>Alcohols are a class of organic compounds, that typically have one or more attached hydroxyl (-OH) groups to a saturated carbon atom. Alcohols fit into three types mainly: primary, secondary, and tertiary. Based on these categories, their properties might vary. The following section describes some of the primary alcohols supplied by Dawn Scientific briefly: </p>
                                        <ol>
                                            <li>Ethanol (C₂H₅OH)</li>
                                        </ol>
                                        <p>Ethanol, commonly known as alcohol, is used extensively both in the laboratory and industry. Ethanol is used both as a solvent and a disinfectant, hence an essential part of many scientific and industrial procedures. Pure ethanol (200 proof) is available from Dawn Scientific. Denatured ethanol is also sold for non-consumable applications. It comes in USP/ACS grades for that kind of demand, offering very high purity in chemical synthesis, microbiological work, and pharmaceutical application. </p>
                                        <p>Ethanol is also used in </p>
                                        <ul>
                                            <li>Cell culture and molecular biology labs </li>
                                            <li>Cleaning and disinfection of surfaces </li>
                                            <li>As a solvent for organic reactions </li>
                                            <li>Extraction of bioactive compounds </li>
                                        </ul>
                                        <ol start="2">
                                            <li>Methanol (CH₃OH)</li>
                                        </ol>
                                        <p>Methanol is the common name for wood alcohol. It is a simple primary alcohol with significant applications in research and industrial processes. Methanol is used as a solvent in organic synthesis and as a feedstock in the production of formaldehyde and other chemicals. The laboratory grade methanol is absolutely pure to be used for example in HPLC, synthesis, and spectroscopy. </p>
                                        <p>The main uses for methanol are: </p>
                                        <ul>
                                            <li>As a solvent for HPLC</li>
                                            <li>Tissue processing in histology</li>
                                            <li>Feedstock for biodiesel</li>
                                            <li>Solvent in chromatography</li>
                                        </ul>
                                        <ol start="3">
                                            <li>Benzyl Alcohol (C₆H₅CH₂OH)</li>
                                        </ol>
                                        <p>Benzyl alcohol is an unsaturated colorless liquid that has been widely used in perfume, cosmetics, and pharmaceutical formulation. This alcohol also finds use as an ingredient that has poor antimicrobial activity; therefore, it is regarded as a good preservative for injectable drugs. Our stocks of benzyl alcohol are available in NF and FCC grades for pharmaceutical and industrial applications. </p>
                                        <p>Uses of benzyl alcohol: </p>
                                        <ul>
                                            <li>For topical and injectable preparations</li>
                                            <li>As a fragrance carrier in perfumes</li>
                                            <li>As a solvent in inks and coatings</li>
                                            <li>As a preservative in pharmaceuticals</li>
                                        </ul>
                                        <ol start="4">
                                            <li>Butyl Alcohol (C₄H₉OH)</li>
                                        </ol>
                                        <p>Butyl alcohol, or butanol, is a solvent in industrial processes. It is used in the manufacturing of plastics and synthetic rubber as well as a component in brake fluids and hydraulic oils. We carry n-butanol and iso-butanol in lab-grade and ACS-grade to suit your needs. </p>
                                        <p>Primary uses of butyl alcohol are: </p>
                                        <blockquote>Manufacturing of plastics and synthetic rubber</blockquote>
                                        <blockquote>Solvent in paints, coatings and varnishes</blockquote>
                                        <blockquote>Component in hydraulic fluids</blockquote>
                                        <p><strong>And many other  </strong></p>
                                        <p><strong>Purification Grades of Alcohols Grades and</strong></p>
                                        <p>At Dawn Scientific, we take the purity and grade of our alcohols seriously as we prepare them for laboratory and industrial uses. We have different grades: </p>
                                        <ol>
                                            <li>USP Grade: For pharmaceutical purposes, this alchohol will be at its highest purity and meet United States Pharmacopeia standards</li>
                                            <li>ACS Grade: It fulfills American Chemical Society standards and could be used in laboratories or labs requiring high purity chemicals</li>
                                            <li>Lab Grade: Suitable for most lab benchtop applications; offers the lowest cost options available for non-critical applications</li>
                                            <li>Anhydrous Alcohols: Low water alcohol for very sensitive chemical reactions.</li>
                                        </ol>
                                        <p>From the highest purity alcohols for your analytical work to the lowest-cost solution for industrial scale synthesis, Dawn Scientific will meet your requirements exactly as you like them. </p>
                                        <p><strong>Customizable Quantities and Packaging</strong></p>
                                        <p>To meet the diverse needs of our customers, Dawn Scientific offers alcohols in a range of container sizes. From 1-gallon jugs to 55-gallon drums, you can select the volume that best fits your application. This flexibility is especially important for industries that require either small-scale precision or large-volume production. </p>
                                        <ol>
                                            <li><strong>Small quantities</strong> for research labs </li>
                                            <li><strong>Bulk orders</strong> for industrial manufacturing </li>
                                            <li><strong>Custom packaging</strong> solutions available upon request </li>
                                        </ol>
                                        <p><strong>Applications of Alcohols Across Industries</strong></p>
                                        <p>Alcohols are very important in many industries, such as:</p>
                                        <ol>
                                            <li><strong>Pharmaceuticals and Biotechnology</strong></li>
                                        </ol>
                                        <p>The main applications of alcohols are the use of ethanol and benzyl alcohol in pharmaceutical formulation. Ethanol serves as a solvent for tinctures and extracts, while benzyl alcohol is commonly incorporated as an ingredient of topical preparations and injectables. </p>
                                        <ol start="2">
                                            <li><strong>Cosmetics and Personal Care</strong></li>
                                        </ol>
                                        <p>Cetyl alcohol and ethanol are heavily used in personal care cosmetics as emulsifiers and solvents. Alcohols, due to their importance in stabilizing formulations, become indispensable in the production of lotions, creams, and shampoos. </p>
                                        <ol start="3">
                                            <li><strong>Chemical Production</strong></li>
                                        </ol>
                                        <p>Ethanol and methanol are primary solvents in chemical synthesis. Methanol is utilized as a solvent in the synthesis of biodiesel and as an intermediate for the synthesis of formaldehyde. </p>
                                        <ol start="4">
                                            <li><strong>Food and Beverages</strong></li>
                                        </ol>
                                        <p>Ethanol is primarily used in the food industry in terms of extracting flavor and alcoholic beverages. In contrast, benzyl alcohol is used as a flavoring agent or a food preservative. </p>
                                        <strong>Sustainability and Reliable Sources</strong>
                                        <p>Dawn Scientific sources alcohols only from leading manufacturers such as Greenfield, DSI, Spectrum and ChemieR. This ensures delivering high-purity alcohols for the present laboratories and industries. For us, it is a priority to work with suppliers who would align with our commitment to environmentally responsible practices so that our alcohols are produced without leaving an unbearable mark on the environment. </p>
                                        <strong>Why Dawn Scientific?</strong>
                                        <p>By choosing Dawn Scientific to fulfill your alcohol requirements, you get the following benefits: </p>
                                        <ol>
                                            <li><strong>A broad selection of high-quality alcohols </strong> from trusted brands</li>
                                            <li><strong>Flexible order sizes</strong>to suit your application, from research to industrial-scale production</li>
                                            <li><strong>Competitive pricing </strong> and custom solutions </li>
                                            <li><strong>Dedicated customer service</strong>to ensure your needs are met</li>
                                        </ol>
                                    </div>
                                    <button className="btn-collapse site-title" onClick={() => setReadMore(!readMore)} aria-label="Toggle Read More">Read {readMore ? 'Less' : 'More'}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container applications_brands applications_brands_inner'>
                    <div className='row'>
                        <div className='apl_col'>
                            <Link href="/product-category/lab-reagents/alcohols/cda-alcohol" title="Accuris" className='apl_fill'>
                                <img loading="lazy" decoding="async" width="422" height="203" src="/assets/images/Alcohol-image-300x300.webp" className="attachment-full size-full wd-lazy-fade wd-loaded" alt="Accuris Dawn Scientific" title="Accuris Dawn Scientific" />
                            </Link>
                            <h3>Completely Denatured Alcohol</h3>
                            <Link href="/product-category/lab-reagents/alcohols/cda-alcohol" className='apl_link'>3 products</Link>
                        </div>
                        <div className='apl_col'>
                            <Link href="/ethyl-alcohol" title="Adam Equipment" className='apl_fill'>
                                <img loading="lazy" decoding="async" width="421" height="202" src="/assets/images/Ethyl-alcohol-image-300x300.webp" className="attachment-full size-full wd-lazy-fade wd-loaded" alt="Adam Equipment" title="Adam Equipment  Dawn Scientific" />
                            </Link>
                            <h3>Ethyl Alcohol</h3>
                            <Link href="/ethyl-alcohol" className='apl_link'>74 products</Link>
                        </div>
                        <div className='apl_col'>
                            <Link href="" onClick={() => scrollToSection(proSolvent)} title="Agilent" className='apl_fill'>
                                <img loading="lazy" decoding="async" width="421" height="202" src="/assets/images/Alcohol-image-300x300 (1).webp" className="attachment-full size-full wd-lazy-fade wd-loaded" alt="Agilent Technology" title="Agilent Technology  Dawn Scientific" />
                            </Link>
                            <h3>Prop Solvents</h3>
                            <Link href="" onClick={() => scrollToSection(proSolvent)} className='apl_link'>8 products</Link>
                        </div>
                        <div className='apl_col'>
                            <Link href="/product-category/lab-reagents/alcohols/reagent-alcohol" title="Ahlstrom-Munksjo" className='apl_fill'>
                                <img loading="lazy" decoding="async" width="210" height="100" src="/assets/images/Reagent-alcohol-300x300.webp" className="attachment-full size-full wd-lazy-fade wd-loaded" alt="Reagent-alcohol" title="Reagent-alcohol Dawn Scientific" />
                            </Link>
                            <h3>Reagent Alcohol</h3>
                            <Link href="/product-category/lab-reagents/alcohols/reagent-alcohol" className='apl_link'>15 products</Link>
                        </div>
                        <div className='apl_col'>
                            <Link href="/product-category/lab-reagents/alcohols/sis-alcohol" title="Alconox" className='apl_fill'>
                                <img loading="lazy" decoding="async" width="1415" height="515" src="/assets/images/Alcohol-image-300x300 (2).webp" className="attachment-full size-full wd-lazy-fade wd-loaded" alt="Alconox Supplier at Dawn Scientific" title="Alconox  Trusted Lab Cleaning Detergents  Dawn Scientific" />
                            </Link>
                            <h3>Special Industrial Solvents</h3>
                            <Link href="/product-category/lab-reagents/alcohols/sis-alcohol" className='apl_link'>14 products</Link>
                        </div>
                        <div className='apl_col'>
                            <Link href="/product-category/lab-reagents/alcohols/sda-alcohol" title="Aldon" className='apl_fill'>
                                <img loading="lazy" decoding="async" width="421" height="202" src="/assets/images/Alcohol-image-300x300 (3).webp" className="attachment-full size-full wd-lazy-fade wd-loaded" alt="Aldon" title="Aldon Dawn Scientific" />
                            </Link>
                            <h3>Specially Denatured Alcohol</h3>
                            <Link href="/product-category/lab-reagents/alcohols/sda-alcohol" className='apl_link'>50 products</Link>
                        </div>
                    </div>
                    <div className="inner-page-products">
                        <div className="product-wrapper" ref={proSolvent}>
                            {
                                show && (
                                    <>
                                        <div className="title list-title">
                                            <h2>Prop Solvents</h2>
                                        </div>
                                        <div className="product-list-content">
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <h2 className="product_sku">
                                                        <span className="badge badge-yellow">125013200CSGF-GF</span>
                                                    </h2>
                                                </div>
                                                <div className="col-md-4">
                                                    <h2 className="product_title">
                                                        <Link href={`/product/prop-solv-1-3-200-proof-fluorinated-poly-bottle-4x1-gallon/`}>Prop Solv 1-3, 200 Proof, Fluorinated Poly Bottle, 4x1 gallon</Link>
                                                    </h2>
                                                    <h2 className="brand_name">
                                                        <Link href={`/brand/greenfield`}>Greenfield</Link>
                                                    </h2>
                                                </div>
                                                <div className="col-md-25">
                                                    <div className="text-center">
                                                        <span className="price">Enquiry Now</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-15">
                                                    <div className="btn-area">
                                                        <Link href={`/product/prop-solv-1-3-200-proof-fluorinated-poly-bottle-4x1-gallon/`} >
                                                            <span className="icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="18" height="18"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor" /><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor" /></svg>
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-list-content">
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <h2 className="product_sku">
                                                        <span className="badge badge-yellow">125PS2190PL05-GF</span>
                                                    </h2>
                                                </div>
                                                <div className="col-md-4">
                                                    <h2 className="product_title">
                                                        <Link href={`/product/prop-solv-2-190-proof-poly-w-rieke-spout-5-gallon`}>Prop Solv 2, 190 Proof, Poly w/ Rieke Spout, 5 gallon</Link>
                                                    </h2>
                                                    <h2 className="brand_name">
                                                        <Link href={`/brand/greenfield`}>Greenfield</Link>
                                                    </h2>
                                                </div>
                                                <div className="col-md-25">
                                                    <div className="text-center">
                                                        <span className="price">Enquiry Now</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-15">
                                                    <div className="btn-area">
                                                        <Link href={`/product/prop-solv-2-190-proof-poly-w-rieke-spout-5-gallon`} >
                                                            <span className="icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="18" height="18"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor" /><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor" /></svg>
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-list-content">
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <h2 className="product_sku">
                                                        <span className="badge badge-yellow">125PS2200PL05-GF</span>
                                                    </h2>
                                                </div>
                                                <div className="col-md-4">
                                                    <h2 className="product_title">
                                                        <Link href={`/product/prop-solv-2-200-proof-poly-w-rieke-spout-5-gallon`}>Prop Solv 2, 200 Proof, Poly w/ Rieke Spout, 5 gallon</Link>
                                                    </h2>
                                                    <h2 className="brand_name">
                                                        <Link href={`/brand/greenfield`}>Greenfield</Link>
                                                    </h2>
                                                </div>
                                                <div className="col-md-25">
                                                    <div className="text-center">
                                                        <span className="price">Enquiry Now</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-15">
                                                    <div className="btn-area">
                                                        <Link href={`/product/prop-solv-2-200-proof-poly-w-rieke-spout-5-gallon`} >
                                                            <span className="icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="18" height="18"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor" /><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor" /></svg>
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-list-content">
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <h2 className="product_sku">
                                                        <span className="badge badge-yellow">124003190PL05-GF</span>
                                                    </h2>
                                                </div>
                                                <div className="col-md-4">
                                                    <h2 className="product_title">
                                                        <Link href={`/product/prop-solv-3-190-proof-poly-w-rieke-spout-5-gallon/`}>Prop Solv 3, 190 Proof, Poly w/ Rieke Spout, 5 gallon</Link>
                                                    </h2>
                                                    <h2 className="brand_name">
                                                        <Link href={`/brand/greenfield`}>Greenfield</Link>
                                                    </h2>
                                                </div>
                                                <div className="col-md-25">
                                                    <div className="text-center">
                                                        <span className="price">Enquiry Now</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-15">
                                                    <div className="btn-area">
                                                        <Link href={`/product/prop-solv-3-190-proof-poly-w-rieke-spout-5-gallon/`} >
                                                            <span className="icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="18" height="18"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor" /><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor" /></svg>
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-list-content">
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <h2 className="product_sku">
                                                        <span className="badge badge-yellow">124PS3200CSGF-GF</span>
                                                    </h2>
                                                </div>
                                                <div className="col-md-4">
                                                    <h2 className="product_title">
                                                        <Link href={`/product/prop-solv-3-200-proof-fluorinated-poly-bottle-4x1-gallon/`}>Prop Solv 3, 200 Proof, Fluorinated Poly Bottle, 4x1 gallon</Link>
                                                    </h2>
                                                    <h2 className="brand_name">
                                                        <Link href={`/brand/greenfield`}>Greenfield</Link>
                                                    </h2>
                                                </div>
                                                <div className="col-md-25">
                                                    <div className="text-center">
                                                        <span className="price">Enquiry Now</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-15">
                                                    <div className="btn-area">
                                                        <Link href={`/product/prop-solv-3-200-proof-fluorinated-poly-bottle-4x1-gallon/`} >
                                                            <span className="icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="18" height="18"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor" /><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor" /></svg>
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-list-content">
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <h2 className="product_sku">
                                                        <span className="badge badge-yellow">124PS3200PL05M-GF</span>
                                                    </h2>
                                                </div>
                                                <div className="col-md-4">
                                                    <h2 className="product_title">
                                                        <Link href={`/product/prop-solv-3-200-proof-metal-w-rieke-spout-5-gallon/`}>Prop Solv 3, 200 Proof, Metal w/ Rieke Spout, 5 gallon</Link>
                                                    </h2>
                                                    <h2 className="brand_name">
                                                        <Link href={`/brand/greenfield`}>Greenfield</Link>
                                                    </h2>
                                                </div>
                                                <div className="col-md-25">
                                                    <div className="text-center">
                                                        <span className="price">Enquiry Now</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-15">
                                                    <div className="btn-area">
                                                        <Link href={`/product/prop-solv-3-200-proof-metal-w-rieke-spout-5-gallon/`} >
                                                            <span className="icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="18" height="18"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor" /><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor" /></svg>
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-list-content">
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <h2 className="product_sku">
                                                        <span className="badge badge-yellow">124PS3200PL05-GF</span>
                                                    </h2>
                                                </div>
                                                <div className="col-md-4">
                                                    <h2 className="product_title">
                                                        <Link href={`/product/prop-solv-3-200-proof-poly-w-rieke-spout-5-gallon/`}>Prop Solv 3, 200 Proof, Poly w/ Rieke Spout, 5 gallon</Link>
                                                    </h2>
                                                    <h2 className="brand_name">
                                                        <Link href={`/brand/greenfield`}>Greenfield</Link>
                                                    </h2>
                                                </div>
                                                <div className="col-md-25">
                                                    <div className="text-center">
                                                        <span className="price">Enquiry Now</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-15">
                                                    <div className="btn-area">
                                                        <Link href={`/product/prop-solv-3-200-proof-poly-w-rieke-spout-5-gallon/`} >
                                                            <span className="icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="18" height="18"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor" /><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor" /></svg>
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-list-content">
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <h2 className="product_sku">
                                                        <span className="badge badge-yellow">125PSIII2200PL05-GF</span>
                                                    </h2>
                                                </div>
                                                <div className="col-md-4">
                                                    <h2 className="product_title">
                                                        <Link href={`/product/prop-solv-iii-2-200-proof-poly-w-rieke-spout-5-gallon/`}>Prop Solv III-2, 200 Proof, Poly w/ Rieke Spout, 5 gallon</Link>
                                                    </h2>
                                                    <h2 className="brand_name">
                                                        <Link href={`/brand/greenfield`}>Greenfield</Link>
                                                    </h2>
                                                </div>
                                                <div className="col-md-25">
                                                    <div className="text-center">
                                                        <span className="price">Enquiry Now</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-15">
                                                    <div className="btn-area">
                                                        <Link href={`/product/prop-solv-iii-2-200-proof-poly-w-rieke-spout-5-gallon/`} >
                                                            <span className="icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="18" height="18"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor" /><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor" /></svg>
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            }

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}