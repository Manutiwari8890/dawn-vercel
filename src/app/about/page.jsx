import Link from "next/link"

export const metadata = {
  title: "About Us | Dawn Scientific delivers high quality laboratory products",
  description:
    "Discover Dawn Scientific's commitment to quality laboratory chemicals, reagents, solvents, and scientific products for research, testing, and analysis.",

  keywords: ["scientific laboratory supplier in USA", "Scientific Products Distributor USA", "Laboratory Chemicals Supplier New Jersey", "Laboratory Solutions Provider", "Ready to use solutions", "HPLC Solvents", "GC solvents", "Trusted Laboratory Chemicals and Supplies Company in USA", "Laboratory Chemicals and Consumables Supplier for Research Labs", "ISO Certified Laboratory Supplier in New Jersey", "WBENC certified scientific supplier in USA", "Where can research laboratories buy scientific supplies in USA", "Who Is a Trusted Laboratory Supplier in New Jersey", "Stains and indicators for microbiology and histology", "high purity inorganic and organic reagents"],

  alternates: {
    canonical: "https://dawnscientific.com/about",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "About Us | Dawn Scientific delivers high quality laboratory products",
    description:
      "Discover Dawn Scientific's commitment to quality laboratory chemicals, reagents, solvents, and scientific products for research, testing, and analysis.",
    url: "https://dawnscientific.com/about",
    siteName: "Dawn Scientific",
    type: "website",
    locale: "en_IN",

    images: [
      {
        url: "https://dawnscientific.com/assets/images/Dawn-scientific.webp",
        width: 1200,
        height: 630,
        alt: "Dawn Scientific",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "About Us | Dawn Scientific delivers high quality laboratory products",
    description:
      "Discover Dawn Scientific's commitment to quality laboratory chemicals, reagents, solvents, and scientific products for research, testing, and analysis.",
    images: [
      "https://dawnscientific.com/assets/images/Dawn-scientific.webp",
    ],
  },
};

export default function Page() {
    return (
        <>
            <div className='wrapper'>
                <div className='container'>
                    <div className='inner_banner'>
                        <h1>Dawn Scientific</h1>
                        <p>Your Trusted Scientific Partner for Over 40 Years</p>
                    </div>
                    <div className='about_company'>
                        <div className='about_company_left'>
                            <p>For over 40 years, Dawn Scientific has been serving the scientific community as a trusted manufacturer and distributor of laboratory equipment, chemicals, glassware, and scientific instruments. It was established in 1978 and incorporated in 1982 in New Jersey. Since then, Dawn Scientific has become renowned in the laboratory supply industry for innovation, customer satisfaction, and scientific excellence.</p>
                            <p>With an ever-growing product portfolio and a global distribution network, we serve customers in the pharmaceutical, bio-pharma, chemical, cosmetic, and dietary supplement fields. Our mission is to provide laboratory solutions that are dependable, cost-effective, and unmatched when it comes to customer support, consultation, quality, and compliance.</p>
                            <img src='assets/images/LOGO-003-200x100.webp' alt="WBENC Certificate" />
                        </div>
                        <div className='about_company_right'>
                            <figure>
                                <img src='assets/images/chemical-images.webp' alt="Dawn Scientific" />
                            </figure>
                        </div>
                    </div>
                </div>
                <div className='container_full'>
                    <div className='about_journey back_yellow'>
                        <div className='container'>
                            <h2>Our Journey: From Humble Beginnings to Industry Leader</h2>
                            <ul>
                                <li>Founded by a passion-driven chemistry professor, Dawn Scientific began as a small distributor of custom lab glassware, chemical reagents, and other laboratory services. Over the years, our reputation has made it easy to build relationships with universities, commercial laboratories, and schools.</li>
                                <li>In <b>1995</b>, we became part of the Independent Laboratory Distributors Association (ILDA), and in 2023, we joined the Laboratory Products Association (LPA), which further solidifies our position in the industry.</li>
                                <li>In <b>2018</b>, Dawn Scientific was acquired by a passionate member of the scientific community who preserved the essence of the firm while widening its scope and focus. In <b>2020</b>, we proudly became a Women-Owned Small Business certified by WBENC, the Small Business Administration, as well as the State of New Jersey. In <b>2021, we received the ISO 9001:2015 certification</b> that further strengthens our commitment to quality systems and operational excellence.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className='container'>
                    <div className='about_detail'>
                        <h2>What We Offer – A Warranty Under One Shop for Scientific Supplies</h2>
                        <p>Dawn Scientific’s catalog is suited for the requirements of all professionals and students which including scientists, researchers, and laboratory experts. Manufacturing analytical instruments, lab consumables, specialty chemicals, and providing tailor-made solutions, you can source it all from us.</p>
                    </div>
                </div>
                <div className='container'>
                    <div className='about_product_range back_gray'>
                        <h2>Our product ranges comprise</h2>
                        <div className='about_product_range_list'>
                            <div className='about_product_range_box'>
                                <svg className="svg_icon" width="45" height="45">
                                    <use xlinkHref="/sprite.svg#product-range1" />
                                </svg>
                                <h3>Chemicals and Reagents</h3>
                                <p>Dawn Scientific remains one of the best sources of laboratory-grade solvents, analytical reagents, biological stains, and standardized solutions at all levels, which are tailored for pharmaceutical, chemical, and academic laboratories.</p>
                            </div>
                            <div className='about_product_range_box'>
                                <svg className="svg_icon" width="45" height="45">
                                    <use xlinkHref="/sprite.svg#product-range2" />
                                </svg>
                                <h3>Consumables & Supplies</h3>
                                <p>We provide a comprehensive list of lab consumables for you, including syringe filters, pipette tips, cuvettes, weighted dishes, lab notebooks, and centrifuge tubes.</p>
                            </div>
                            <div className='about_product_range_box'>
                                <svg className="svg_icon" width="45" height="45">
                                    <use xlinkHref="/sprite.svg#product-range3" />
                                </svg>
                                <h3>Glassware & Plasticware</h3>
                                <p>According to standard lithographic precision, our assortment ranges from vials, bottles, test tubes, and beakers to volumetric flasks and pipettes, which can be customized in diverse forms and sizes</p>
                            </div>
                            <div className='about_product_range_box'>
                                <svg className="svg_icon" width="45" height="45">
                                    <use xlinkHref="/sprite.svg#product-range4" />
                                </svg>
                                <h3>Filtration Systems & Lab Models</h3>
                                <p>We provide filtration consumables needed for purifying and separating, and educational lab models designed for biological, chemical, physics, and geology students</p>
                            </div>
                            <div className='about_product_range_box'>
                                <svg className="svg_icon" width="45" height="45">
                                    <use xlinkHref="/sprite.svg#product-range5" />
                                </svg>
                                <h3>Laboratory Equipment & Apparatus</h3>
                                <p>We supply equipment for research, education, as well as bolstering quality control environments, which includes centrifuges, incubators, stirrers, analytical balances, hot plates, and refractometers</p>
                            </div>
                        </div>
                    </div>
                    <div className='about_brands suppliers_brands'>
                        <h2>Exclusive Brands We Offer</h2>
                        <div className='about_brands_list'>
                            <div className='about_brands_box'>
                                <h3>ChemieR</h3>
                                <p>Organic and inorganic high-purity reagents and spectroscopy-grade solvents.</p>
                            </div>
                            <div className='about_brands_box'>
                                <h3>TriStains</h3>
                                <p>Biological stains and pH indicators used in microbiology, histology, and titrations.</p>
                            </div>
                            <div className='about_brands_box'>
                                <h3>cUSP</h3>
                                <p>Standard solutions of international pharmacopeia standards (USP, BP, EP, …) are provided Ready-to-Use.</p>
                            </div>
                            <div className='about_brands_box'>
                                <h3>LiChrom</h3>
                                <p>HPLC solvents, ion-pair reagents, and buffer salts are provided for Chromatography systems’ advanced uses.</p>
                            </div>
                            <div className='about_brands_box'>
                                <h3>Bluster</h3>
                                <p>Solvents for gas chromatography are used in pesticide and residue analysis.</p>
                            </div>
                            <div className='about_brands_box'>
                                <h3>KappAA</h3>
                                <p>Reagents and resins for peptide synthesis and amino acids are specialty products.</p>
                            </div>
                            <div className='about_brands_box'>
                                <h3>EKS</h3>
                                <p>Electronic reagents for semiconductors and technology, solar energy, and other industries are used in solar grade.</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className='sp_col'>
                                <Link href="/brand/bluster" title="Bluster" className='sp_fill'>
                                    <img loading="lazy" decoding="async" width="419" height="200" src="/assets/images/Bluster_uLogo.png" className="attachment-full size-full wd-lazy-fade wd-loaded" alt="Blusterulogo  Dawn Scientific" title="Blusterulogo  Dawn Scientific" />
                                </Link >
                            </div>
                            <div className="sp_col">
                                <Link  title="ChemieR" className="sp_fill" href="/brand/chemier" data-discover="true">
                                    <img loading="lazy" decoding="async" width="419" height="200" className="attachment-full size-full wd-lazy-fade wd-loaded" alt="Chemierlogo1  Dawn Scientific" title="Chemierlogo1  Dawn Scientific" src="/assets/images/ChemieR_Logo1.webp" />
                                </Link >
                            </div>
                            <div className="sp_col">
                                <Link  title="cUSP" className="sp_fill" href="/brand/cusp" data-discover="true">
                                    <img loading="lazy" decoding="async" width="2274" height="1026" className="attachment-full size-full wd-lazy-fade wd-loaded" alt="Cusp  Dawn Scientific" title="Cusp  Dawn Scientific" src="/assets/images/Cusp.webp" />
                                </Link >
                            </div>
                            <div className="sp_col">
                                <Link  title="EKS" className="sp_fill" href="/brand/eks" data-discover="true">
                                    <img loading="lazy" decoding="async" width="419" height="200" className="attachment-full size-full wd-lazy-fade wd-loaded" alt="Eksulogo  Dawn Scientific" title="Eksulogo  Dawn Scientific" src="/assets/images/EKS_uLogo.webp" />
                                </Link >
                            </div>
                            <div className="sp_col">
                                <Link  title="Kappaa" className="sp_fill" href="/brand/kappaa" data-discover="true">
                                    <img decoding="async" className="wd-lazy-fade wd-loaded" alt="Kappaa" title="Kappaa" src="/assets/images/KaPPaa_uLogo.webp" />
                                </Link >
                            </div>
                            <div className="sp_col">
                                <Link  title="LiChrom" className="sp_fill" href="/brand/lichrom" data-discover="true">
                                    <img decoding="async" className="wd-lazy-fade wd-loaded" alt="LiChrom" title="LiChrom" src="/assets/images/LiChrom_uLogo.webp" />
                                </Link >
                            </div>
                            <div className="sp_col">
                                <Link  title="Tristains" className="sp_fill" href="/brand/tristains" data-discover="true">
                                    <img decoding="async" className="wd-lazy-fade wd-loaded" alt="Tristains" title="Tristains" src="/assets/images/TriStains_Logo1.webp" />
                                </Link >
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container_full'>
                    <div className='about_industry back_yellow'>
                        <div className='container'>
                            <h2>Authorized Distributor for Industry-Leading Brands</h2>
                            <p>We take pride in being an authorized distributor for some of the world’s top laboratory brands, which include Thermo Fisher Scientific, MilliporeSigma, Honeywell, Greenfield Global, GFS Chemicals, TCI, RICCA, LabChem, and so on.</p>
                            <p>We also work with suppliers like OHAUS, Corning, Cytiva, DWK Life Sciences, Heathrow Scientific, SP Bel-Art, and others to offer our customers dependable products at attractive pricing.</p>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <div className='about_why_choose'>
                        <h2>Why Choose Dawn Scientific?</h2>
                        <div className='about_why_choose_list'>
                            <div className='about_why_choose_box'>
                                <h3>Experience you can trust</h3>
                                <p>Over four decades of trust and performance in laboratory supplies.</p>
                                <a href='#'>Read More</a>
                            </div>
                            <div className='about_why_choose_box'>
                                <h3>Dependable Delivery</h3>
                                <p>Supported documentation and fast, dependable delivery.</p>
                                <a href='#'>Read More</a>
                            </div>
                            <div className='about_why_choose_box'>
                                <h3>Wide Product Portfolio</h3>
                                <p>Everything from lab chemicals to equipment — all in one place.</p>
                                <a href='#'>Read More</a>
                            </div>
                            <div className='about_why_choose_box'>
                                <h3>Certified Woman-Owned Business</h3>
                                <p>Supporting diversity and inclusion in science and industry with pride.</p>
                                <a href='#'>Read More</a>
                            </div>
                            <div className='about_why_choose_box'>
                                <h3>Quality Processes</h3>
                                <p>Supporting ISO 9001:2015 certified processes; ensuring each step delivers value.</p>
                                <a href='#'>Read More</a>
                            </div>
                            <div className='about_why_choose_box'>
                                <h3>Customer-Centric Service</h3>
                                <p>Tailored assistance and advice on detailed consultations for custom needs.</p>
                                <a href='#'>Read More</a>
                            </div>
                        </div>
                    </div>
                    <div className='about_detail'>
                        <h2>Our Commitment to Science, Safety, and Sustainability</h2>
                        <p>We are more than just a laboratory supplier, and you will soon find out why. With a custom approach to every client, we help researchers with the utmost accuracy, safety, and compliance.</p>
                        <p>Dawn Scientific is versatile in what it offers– custom packaging solutions, product documentation, sprinting help, and much more. All of this comes with utmost regard towards ecological benchmarks.</p>
                        <p>Our Dawn Scientific pledge continues to fuel our progress, as distinct from peer players, we are truly passionate about serving our mission with scientific precision. Join our growing community and nurture your research efforts with us.</p>
                    </div>


                    <div className="accreditation-section">

                        <h2 className="acc-heading">Accreditation</h2>

                        <div className="acc-container">

                            {/* ISO */}
                            <a href="/view-iso-certificate" className="acc-card">
                                <img src="/assets/images/iso.webp" alt="ISO Certification" />
                                <span>ISO Certified</span>
                            </a>

                            {/* WBENC */}
                            <a href="/view-wbence-certificate" className="acc-card">
                                <img src="/assets/images/wbenc.png" alt="WBENC Certification" />
                                <span>Women Owned (WBENC)</span>
                            </a>

                            {/* SBA */}
                            <a href="/about" className="acc-card">
                                <img src="/assets/images/sba.png" alt="SBA Certification" />
                                <span>SBA Certified</span>
                            </a>

                        </div>

                        <style>{`
        .accreditation-section {
          padding: 50px 0;
        }

        .acc-heading {
          margin-bottom: 30px;
        }

        .acc-container {
          display: flex;
          gap: 40px;
          flex-wrap: wrap;
        }

        .acc-card {
          background: #fff;
          border: 1px solid #eee;
          border-radius: 12px;
          padding: 30px 20px;
          width: 240px;
          height: 190px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          color: #000;
          transition: all 0.3s ease;
        }

        .acc-card:hover {
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          transform: translateY(-5px);
        }

        .acc-card img {
          width: 100%;
          height: 110px;
          object-fit: contain;
        }

        .acc-card span {
          margin-top: 12px;
          font-weight: 600;
          font-size: 15px;
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .acc-container {
            justify-content: center;
          }

          .acc-card {
            width: 160px;
            height: 140px;
            padding: 15px;
          }

          .acc-card img {
            height: 70px;
          }

          .acc-card span {
            font-size: 13px;
          }
        }
      `}</style>

                    </div>


                    <div className="membership-section">

                        <h2 className="mem-heading">Memberships</h2>

                        <div className="mem-container">

                            {/* ILDA */}
                            <a href="/ilda" className="mem-card">
                                <img src="/assets/images/ilda.png" alt="ILDA Membership" />
                                <span>ILDA</span>
                            </a>

                            {/* LPA */}
                            <a href="/lpa" className="mem-card">
                                <img src="/assets/images/lpa.jpg" alt="LPA Membership" />
                                <span>LPA</span>
                            </a>

                        </div>

                        {/* ✅ CSS */}
                        <style>{`
        .membership-section {
          padding: 50px 0;
        }

        .mem-heading {
          margin-bottom: 30px;
        }

        .mem-container {
          display: flex;
          gap: 40px;
          flex-wrap: wrap;
          align-items: stretch;
        }

        /* 🔥 Card Style (Same as Accreditation) */
        .mem-card {
          background: #fff;
          border: 1px solid #eee;
          border-radius: 12px;
          padding: 30px 20px;
          width: 240px;
          height: 190px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          color: #000;
          transition: all 0.3s ease;
        }

        .mem-card:hover {
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          transform: translateY(-5px);
        }

        .mem-card img {
          width: 100%;
          height: 110px;
          object-fit: contain;
        }

        .mem-card span {
          margin-top: 12px;
          font-weight: 600;
          font-size: 15px;
          white-space: nowrap;
          text-align: center;
        }

        /* 📱 Mobile */
        @media (max-width: 768px) {
          .mem-container {
            justify-content: center;
            gap: 20px;
          }

          .mem-card {
            width: 160px;
            height: 140px;
            padding: 15px;
          }

          .mem-card img {
            height: 70px;
          }

          .mem-card span {
            font-size: 13px;
          }
        }
      `}</style>

                    </div>
                </div>
            </div>
        </>
    )
}