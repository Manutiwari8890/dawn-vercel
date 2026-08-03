"use client"
import Link from 'next/link';
import { useState, useRef } from 'react';

export default function MicroBioClient() {
    const [readMore, setReadMore] = useState(false);

    const tristains = useRef(null);

    const scrollToSection = (ref) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <div className='wrapper applications applications_inner'>
                <div className='container'>
                    <div className='row'>
                        <div className="widget collapse">
                            <div className="details-wrapper">
                                <div className="col-md-4 ">
                                    <div className="img-area">
                                        <img src="/assets/images/Microbiological-768x768.webp" />
                                    </div>
                                </div>
                                <div className="col-md-6 text">
                                    <h1>Microbiological</h1>
                                    <div className={`details ${readMore ? 'active' : ''}`}>
                                        <h2 className='app_inner_subtitle'>Buy Microbiological Products from Dawn Scientific- Precise consumables for Laboratory Perfection</h2>
                                        <p>Microbiology is at the center of many scientific and industrial applications: from diagnostics to the development of pharmaceuticals. At Dawn Scientific, we cater to a wide range of laboratory requirements with our Microbiological products. Be it culturing microorganisms, conducting experiments, or making samples, our products bring about optimal performance and efficiency.</p>
                                        <h2>Shop Microbiological Products for Laboratory Success</h2>
                                        <p>When you buy Microbiological products for Laboratory requirements, then quality and functionality are the primary criteria. At Dawn Scientific, our products are designed to provide consistent results and keep up with the rigorous standards of microbiological research and applications. From aspirating pipets to Petri dishes, our product portfolio supports a wide range of laboratory tasks.</p>
                                        <h2>Our range of Microbiological products features:</h2>
                                        <p>• Aspirating &amp; Pasteur Pipets: Ideal for transferring small volumes of liquids with accuracy.<br />
                                            • Culture Tubes: Used for culturing and storing microorganisms in a controlled environment.<br />
                                            • Loops: The tools are used for aseptic streaking and picking of microbial colonies.<br />
                                            • Petri Dishes: A most widely used laboratory tool for cultivating bacteria, fungi, and others.<br />
                                            • Spreaders: Ideal for spreading the inoculum evenly on agar plates.<br />
                                            • Gloves: Good quality gloves to assure sterility and protection of your hands during microbiological work.<br />
                                            Each product is manufactured following high-quality standards to provide the confidence your laboratory needs for its results to be accurate and reproducible.</p>
                                        <h2>Why Buy Microbiological Products for Laboratory Use?</h2>
                                        <p>A microbiology laboratory needs high-technology equipment and consumables to carry out the most sensitive experiments and analyses. By purchasing Microbiological products for Laboratory use at Dawn Scientific, you get:<br />
                                            • High-quality products manufactured with long-lasting material for robust use.<br />
                                            • Sterilization instruments and consumables for workflows.<br />
                                            • A wide variety of products to suit each kind of microbiological application.<br />
                                            • Convenient Shopping that access to dependable solutions that make your laboratory efficient.</p>
                                        <h2>Our Microbiological products meet a wide range of applications, such as</h2>
                                        <p>• Clinical Diagnostics: Tools for identification and analysis of pathogens.<br />
                                            • Pharmaceutical Research: Sterile conditions for drug development.<br />
                                            • Food Safety Testing: Supporting microbial analysis in food samples.<br />
                                            • Environmental Microbiology: Detection and study of microorganisms in diverse environments.</p>
                                        <h2>Microbiological Products: Shop From Dawn Scientific</h2>
                                        <p>At Dawn Scientific, we are your premier supplier of microbiological consumables and equipment. Whether you’re in an academic, or industrial laboratory, our products will be tailored to your requirements.<br />
                                            • Aspirating pipets and Pasteur pipets make handling small volumes of liquids easy and precise.<br />
                                            • Petri dishes and culture tubes host microorganisms in a near-perfect environment.<br />
                                            • Sterile loops and spreaders ensure proper streaking and inoculation without contamination.<br />
                                            • Gloves of high-quality materials provide sterility while also protecting your samples and personnel.<br />
                                            • Explore more.</p>
                                        <h2>Shop and Buy Microbiological Products for Laboratory Efficiency</h2>
                                        <p>You invest in reliable tools for workflows when you shop Microbiological products for Laboratory applications at Dawn Scientific. Our products are handpicked to support the careful requirements of microbiological processes, and you can obtain consistent, high-quality results.</p>
                                        <h2>Why Dawn Scientific for Microbiological Products?</h2>
                                        <p>• Unrivaled Quality: Meets the requirements of the most advanced microbiological laboratories.<br />
                                            • Extensive Range: From basic consumables to highly advanced tools, we have it all.<br />
                                            • Competitive Pricing: Laboratory solutions for any size of laboratories.<br />
                                            • Easy Accessibility: Simplified procurement process with fast delivery on all orders.<br />
                                            By choosing Dawn Scientific, you ensure that your laboratory is equipped with the best tools and consumables. From culturing microorganisms to performing critical diagnostics, our Microbiological products are built to support your scientific goals.</p>

                                    </div>
                                    <button className="btn-collapse site-title" onClick={() => setReadMore(!readMore)} aria-label="Toggle Read More">Read {readMore ? 'Less' : 'More'}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container app_portfolio_title'>
                    <div className='row'>
                        <h4>Microbiological Product Portfolio</h4>
                    </div>
                </div>
                <div className='container applications_brands applications_brands_inner'>
                    <div className='row'>
                        <div className='apl_col'>
                            <Link href="/product-category/consumables-supplies/pipets/aspirating-plasteur-pipets" title="Accuris" className='apl_fill'>
                                <img src="/assets/images/Aspirating-Plasteur®-Pipets-300x300 (1).webp" />
                            </Link>
                            <h3>Aspirating &amp; Plasteur Pipets</h3>
                            <Link href="/product-category/consumables-supplies/pipets/aspirating-plasteur-pipets" className='apl_link'>51 products</Link>
                        </div>
                        <div className='apl_col'>
                            <Link href="/product-category/consumables-supplies/tubes/culture-tubes" title="Adam Equipment" className='apl_fill'>
                                <img src="/assets/images/Culture-tubes-300x300.webp" />
                            </Link>
                            <h3>Culture Tubes</h3>
                            <Link href="/product-category/consumables-supplies/tubes/culture-tubes" className='apl_link'>165 products</Link>
                        </div>
                        <div className='apl_col'>
                            <Link href="/product-category/consumables-supplies/glove" title="Agilent" className='apl_fill'>
                                <img src="/assets/images/DawnIcons25_Gloves-300x300.webp" />
                            </Link>
                            <h3>Glove</h3>
                            <Link href="/product-category/consumables-supplies/glove" className='apl_link'>3274 products</Link>
                        </div>
                        <div className='apl_col'>
                            <Link href="/product-category/consumables-supplies/spatula-loop/loops" title="Ahlstrom-Munksjo" className='apl_fill'>
                                <img src="/assets/images/Plasticware16-300x236.webp" />
                            </Link>
                            <h3>Loops</h3>
                            <Link href="/product-category/consumables-supplies/spatula-loop/loops" className='apl_link'>69 products</Link>
                        </div>
                        <div className='apl_col'>
                            <Link href="/product-category/consumables-supplies/weighing-dishes/petri-dishes" title="Alconox" className='apl_fill'>
                                <img src="/assets/images/Plasticware18_1-300x236.webp" />
                            </Link>
                            <h3>Petri Dishes</h3>
                            <Link href="/product-category/consumables-supplies/weighing-dishes/petri-dishes" className='apl_link'>150 products</Link>
                        </div>
                        <div className='apl_col'>
                            <Link href="/product-category/consumables-supplies/spatula-loop/spreader" title="Aldon" className='apl_fill'>
                                <img src="/assets/images/Spreader-300x300.webp" />
                            </Link>
                            <h3>Spreader</h3>
                            <Link href="/product-category/consumables-supplies/spatula-loop/spreader" className='apl_link'>11 products</Link>
                        </div>


                        <div className='apl_col'>
                            <Link href="/product-category/lab-reagents/serum" title="Aldon" className='apl_fill'>
                                <img src="/assets/images/Serum-img-300x300.webp" />
                            </Link>
                            <h3>Serum</h3>
                            <Link href="/product-category/lab-reagents/serum" className='apl_link'>57 products</Link>
                        </div>
                        <div className='apl_col'>
                            <Link href="/product-category/lab-reagents/standard-media" title="Aldon" className='apl_fill'>
                                <img src="/assets/images/Standard-media-img-300x300.webp" />
                            </Link>
                            <h3>Standard Media</h3>
                            <Link href="/product-category/lab-reagents/standard-media" className='apl_link'>187 products</Link>
                        </div>
                        <div className='apl_col'>
                            <Link href="" onClick={() => scrollToSection(tristains)} title="Aldon" className='apl_fill'>
                                <img src="/assets/images/Tristains-solvents-150x150.webp" />
                            </Link>
                            <h3>Tristains Solvents</h3>
                            <Link href="" onClick={() => scrollToSection(tristains)} className='apl_link'>12 products</Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="inner-page-products">
                            <div className="product-wrapper" ref={tristains}>
                                <div className="title list-title">
                                    <h2>Tristains Solvents</h2>
                                </div>
                                <div className="product-list-content">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <h2 className="product_sku">
                                                <span className="badge badge-yellow">TSV11513</span>
                                            </h2>
                                        </div>
                                        <div className="col-md-4">
                                            <h2 className="product_title">
                                                <Link href={`/product/ethanol-190-proof-for-histology/`}>Ethanol 190 proof for Histology</Link>
                                            </h2>
                                            <h2 className="brand_name">
                                                <Link href={`/brand/tristains`}>TriStains</Link>
                                            </h2>
                                        </div>
                                        <div className="col-md-25">
                                            <div className="text-center">
                                                <span className="price">$33.52 - $311.52</span>
                                            </div>
                                        </div>
                                        <div className="col-md-15">
                                            <div className="btn-area">
                                                <Link href={`/product/ethanol-190-proof-for-histology/`} ><span className="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="18" height="18"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor" /><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor" /></svg>
                                                </span></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-list-content">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <h2 className="product_sku">
                                                <span className="badge badge-yellow">TSV11514</span>
                                            </h2>
                                        </div>
                                        <div className="col-md-4">
                                            <h2 className="product_title">
                                                <Link href={`/product/ethanol-200-proof-for-histology/`}>Ethanol 200 proof for Histology</Link>
                                            </h2>
                                            <h2 className="brand_name">
                                                <Link href={`/brand/tristains`}>TriStains</Link>
                                            </h2>
                                        </div>
                                        <div className="col-md-25">
                                            <div className="text-center">
                                                <span className="price">$38.52 - $349.52</span>
                                            </div>
                                        </div>
                                        <div className="col-md-15">
                                            <div className="btn-area">
                                                <Link href={`/product/ethanol-200-proof-for-histology/`} ><span className="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="18" height="18"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor" /><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor" /></svg>
                                                </span></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-list-content">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <h2 className="product_sku">
                                                <span className="badge badge-yellow">TSV11518</span>
                                            </h2>
                                        </div>
                                        <div className="col-md-4">
                                            <h2 className="product_title">
                                                <Link href={`/product/ethyl-alcohol-200-pf-for-histology/`}>Ethyl alcohol 200 PF for Histology</Link>
                                            </h2>
                                            <h2 className="brand_name">
                                                <Link href={`/brand/tristains`}>TriStains</Link>
                                            </h2>
                                        </div>
                                        <div className="col-md-25">
                                            <div className="text-center">
                                                <span className="price">$43.52 - $425.52</span>
                                            </div>
                                        </div>
                                        <div className="col-md-15">
                                            <div className="btn-area">
                                                <Link href={`/product/ethyl-alcohol-200-pf-for-histology/`} ><span className="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="18" height="18"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor" /><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor" /></svg>
                                                </span></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-list-content">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <h2 className="product_sku">
                                                <span className="badge badge-yellow">TSV11517</span>
                                            </h2>
                                        </div>
                                        <div className="col-md-4">
                                            <h2 className="product_title">
                                                <Link href={`/product/ethyl-alcohol-70-for-histology/`}>Ethyl alcohol 70% for Histology</Link>
                                            </h2>
                                            <h2 className="brand_name">
                                                <Link href={`/brand/tristains`}>TriStains</Link>
                                            </h2>
                                        </div>
                                        <div className="col-md-25">
                                            <div className="text-center">
                                                <span className="price">$33.52 - $311.52</span>
                                            </div>
                                        </div>
                                        <div className="col-md-15">
                                            <div className="btn-area">
                                                <Link href={`/product/ethyl-alcohol-70-for-histology/`} ><span className="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="18" height="18"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor" /><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor" /></svg>
                                                </span></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-list-content">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <h2 className="product_sku">
                                                <span className="badge badge-yellow">TSV11515</span>
                                            </h2>
                                        </div>
                                        <div className="col-md-4">
                                            <h2 className="product_title">
                                                <Link href={`/product/isopropyl-alcohol-70-for-histology/`}>Isopropyl Alcohol 70% for Histology</Link>
                                            </h2>
                                            <h2 className="brand_name">
                                                <Link href={`/brand/tristains`}>TriStains</Link>
                                            </h2>
                                        </div>
                                        <div className="col-md-25">
                                            <div className="text-center">
                                                <span className="price">$27.52 - $247.52</span>
                                            </div>
                                        </div>
                                        <div className="col-md-15">
                                            <div className="btn-area">
                                                <Link href={`/product/isopropyl-alcohol-70-for-histology/`} ><span className="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="18" height="18"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor" /><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor" /></svg>
                                                </span></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-list-content">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <h2 className="product_sku">
                                                <span className="badge badge-yellow">TSV11504</span>
                                            </h2>
                                        </div>
                                        <div className="col-md-4">
                                            <h2 className="product_title">
                                                <Link href={`/product/isopropyl-alcohol-6/`}>Isopropyl Alcohol Histology grade</Link>
                                            </h2>
                                            <h2 className="brand_name">
                                                <Link href={`/brand/tristains`}>TriStains</Link>
                                            </h2>
                                        </div>
                                        <div className="col-md-25">
                                            <div className="text-center">
                                                <span className="price">$27.52 - $247.52</span>
                                            </div>
                                        </div>
                                        <div className="col-md-15">
                                            <div className="btn-area">
                                                <Link href={`/product/isopropyl-alcohol-6/`} ><span className="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="18" height="18"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor" /><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor" /></svg>
                                                </span></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-list-content">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <h2 className="product_sku">
                                                <span className="badge badge-yellow">TSV11507</span>
                                            </h2>
                                        </div>
                                        <div className="col-md-4">
                                            <h2 className="product_title">
                                                <Link href={`/product/reagent-alcohol-100-200-proof/`}>Reagent Alcohol 100% (200 Proof) for Histology</Link>
                                            </h2>
                                            <h2 className="brand_name">
                                                <Link href={`/brand/tristains`}>TriStains</Link>
                                            </h2>
                                        </div>
                                        <div className="col-md-25">
                                            <div className="text-center">
                                                <span className="price">$27.52 - $151.52</span>
                                            </div>
                                        </div>
                                        <div className="col-md-15">
                                            <div className="btn-area">
                                                <Link href={`/product/reagent-alcohol-100-200-proof/`} ><span className="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="18" height="18"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor" /><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor" /></svg>
                                                </span></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-list-content">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <h2 className="product_sku">
                                                <span className="badge badge-yellow">TSV11508</span>
                                            </h2>
                                        </div>
                                        <div className="col-md-4">
                                            <h2 className="product_title">
                                                <Link href={`/product/reagent-alcohol-50-100-proof/`}>Reagent Alcohol 50% (100 Proof) for Histology</Link>
                                            </h2>
                                            <h2 className="brand_name">
                                                <Link href={`/brand/tristains`}>TriStains</Link>
                                            </h2>
                                        </div>
                                        <div className="col-md-25">
                                            <div className="text-center">
                                                <span className="price">$27.52 - $129.52</span>
                                            </div>
                                        </div>
                                        <div className="col-md-15">
                                            <div className="btn-area">
                                                <Link href={`/product/reagent-alcohol-50-100-proof/`} ><span className="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="18" height="18"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor" /><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor" /></svg>
                                                </span></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-list-content">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <h2 className="product_sku">
                                                <span className="badge badge-yellow">TSV11509</span>
                                            </h2>
                                        </div>
                                        <div className="col-md-4">
                                            <h2 className="product_title">
                                                <Link href={`/product/reagent-alcohol-70-140-proof/`}>Reagent Alcohol 70% (140 Proof) for Histology</Link>
                                            </h2>
                                            <h2 className="brand_name">
                                                <Link href={`/brand/tristains`}>TriStains</Link>
                                            </h2>
                                        </div>
                                        <div className="col-md-25">
                                            <div className="text-center">
                                                <span className="price">$27.52 - $134.52</span>
                                            </div>
                                        </div>
                                        <div className="col-md-15">
                                            <div className="btn-area">
                                                <Link href={`/product/reagent-alcohol-70-140-proof/`} ><span className="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="18" height="18"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor" /><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor" /></svg>
                                                </span></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-list-content">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <h2 className="product_sku">
                                                <span className="badge badge-yellow">TSV11510</span>
                                            </h2>
                                        </div>
                                        <div className="col-md-4">
                                            <h2 className="product_title">
                                                <Link href={`/product/reagent-alcohol-80-160-proof/`}>Reagent Alcohol 80% (160 Proof) for Histology</Link>
                                            </h2>
                                            <h2 className="brand_name">
                                                <Link href={`/brand/tristains`}>TriStains</Link>
                                            </h2>
                                        </div>
                                        <div className="col-md-25">
                                            <div className="text-center">
                                                <span className="price">$27.52 - $140.52</span>
                                            </div>
                                        </div>
                                        <div className="col-md-15">
                                            <div className="btn-area">
                                                <Link href={`/product/reagent-alcohol-80-160-proof/`} ><span className="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="18" height="18"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor" /><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor" /></svg>
                                                </span></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-list-content">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <h2 className="product_sku">
                                                <span className="badge badge-yellow">TSV11511</span>
                                            </h2>
                                        </div>
                                        <div className="col-md-4">
                                            <h2 className="product_title">
                                                <Link href={`/product/reagent-alcohol-95-190-proof/`}>Reagent Alcohol 95% (190 Proof) for Histology</Link>
                                            </h2>
                                            <h2 className="brand_name">
                                                <Link href={`/brand/tristains`}>TriStains</Link>
                                            </h2>
                                        </div>
                                        <div className="col-md-25">
                                            <div className="text-center">
                                                <span className="price">$27.52 - $140.52</span>
                                            </div>
                                        </div>
                                        <div className="col-md-15">
                                            <div className="btn-area">
                                                <Link href={`/product/reagent-alcohol-95-190-proof/`} ><span className="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="18" height="18"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor" /><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor" /></svg>
                                                </span></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-list-content">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <h2 className="product_sku">
                                                <span className="badge badge-yellow">TSV11512</span>
                                            </h2>
                                        </div>
                                        <div className="col-md-4">
                                            <h2 className="product_title">
                                                <Link href={`/product/xylene/`}>Xylene Histology Grade</Link>
                                            </h2>
                                            <h2 className="brand_name">
                                                <Link href={`/brand/tristains`}>TriStains</Link>
                                            </h2>
                                        </div>
                                        <div className="col-md-25">
                                            <div className="text-center">
                                                <span className="price">$27.52 - $161.52</span>
                                            </div>
                                        </div>
                                        <div className="col-md-15">
                                            <div className="btn-area">
                                                <Link href={`/product/xylene/`} ><span className="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="18" height="18"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor" /><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor" /></svg>
                                                </span></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
