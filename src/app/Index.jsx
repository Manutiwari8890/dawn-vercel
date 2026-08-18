"use client";

import { useState, useEffect } from 'react'
import Link from 'next/link';
import Select from 'react-select'
import { useLoader } from "../context/LoaderContext";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { motion, AnimatePresence } from "framer-motion";

export default function Index() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { startLoading, stopLoading } = useLoader();
  const [isLoading, setIsLoading] = useState(false);
  const [fcategories, setFcategory] = useState([]);
  const [fcatSlug, setFcatSlug] = useState("");
  const [fsubCategories, setFsubCategory] = useState([]);
  const [fsubCatSlug, setFsubCatSlug] = useState("");
  const [fproducts, setFproducts] = useState([]);
  const [fslug, setFslug] = useState("");
  const fbuttonLink = fslug ? `/product/${fslug}` : (fsubCatSlug ? `/product-category/${fcatSlug}/${fsubCatSlug}` : (fcatSlug ? `/product-category/${fcatSlug}` : ''));
  const [topBrands, setTopBrands] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [brands, setBrands] = useState([]);
  const [frontProducts, setFrontProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const activeTabData = topBrands[0]?.children_recursive?.find(
    tab => tab.id === activeTab
  );
  const itemsToRender = activeTabData?.children_recursive || topBrands[0]?.children_recursive || [];
  useEffect(() => {
    const fetchAll = async () => {
      startLoading();
      try {
        const [
          catRes,
          brandRes,
          homeRes,
          blogRes
        ] = await Promise.all([
          fetch(`${baseUrl}categories`),
          fetch(`${baseUrl}brands?per_page=150`),
          fetch(`${baseUrl}get-home-category`),
          fetch(`${baseUrl}latest-blogs`)
        ]);

        const categories = await catRes.json();
        const brands = await brandRes.json();
        const homeProducts = await homeRes.json();
        const blogData = await blogRes.json();

        const brandData = [...categories.data]
          .filter(item => item.name.toLowerCase() === "brands")
          .map(b => ({
            ...b,
            children_recursive: [...b.children_recursive].sort((a, b) => {
              const desiredOrderSlugs = [
                "lichrom",
                "chemier",
                "cusp-reagents",
                "tristains",
                "bluster",
                "eks",
                "kappaa",
                "dsi-brand"
              ];
              return desiredOrderSlugs.indexOf(a.slug) - desiredOrderSlugs.indexOf(b.slug);
            })
          }));

        setTopBrands(brandData);
        setFcategory(categories.data);
        setBrands(brands.data);
        setFrontProducts(homeProducts.data);
        setBlogs(blogData.data);

      } catch (err) {
        console.error(err);
      } finally {
        stopLoading();
      }
    };

    fetchAll();
  }, []);

  useEffect(() => {
    if (!fcatSlug) return;
    const fetchSubCategory = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${baseUrl}categories/${fcatSlug}`);
        const data = await response.json();
        setFsubCategory(data.data.children_recursive);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubCategory();
  }, [fcatSlug]);

  useEffect(() => {
    const category = fsubCatSlug || fcatSlug;
    if (!category) return;
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${baseUrl}products?category=${category}`);
        const data = await response.json();
        setFproducts(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [fcatSlug, fsubCatSlug]);


  const categoryOptions = [
    { value: "", label: "All Category" },
    ...(fcategories || []).map(category => ({
      value: category.slug,
      label: category.name,
    }))
  ];
  const subCategoryOptions = [
    { value: "", label: "All Sub Category" },
    ...(fsubCategories || []).map(sub => ({ value: sub.slug, label: sub.name })),
  ];

  const productOptions = [
    { value: "", label: "All Products" },
    ...(fproducts || []).map(prod => ({ value: prod.slug, label: prod.name })),
  ];

  return (
    <>
      <section className="banner">
      <div className="container">
        <div className="hero-banner">
          <div className="row">
            <div className="col-md-5">
              <div className="hero-content">
                <h6>dawn scientific</h6>
                <h1>Your Trusted <span className="yellow">Scientific Partner</span> for Over 40 Years </h1>
                <div className="hero-btn">
                  <Link href="/product-category" className="btn btn-primary" aria-label="Dawn Products" title="Dawn Products">Shop Now
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="20" height="20"><path d="M566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3C348.8 149.8 348.8 170.1 361.3 182.6L466.7 288L96 288C78.3 288 64 302.3 64 320C64 337.7 78.3 352 96 352L466.7 352L361.3 457.4C348.8 469.9 348.8 490.2 361.3 502.7C373.8 515.2 394.1 515.2 406.6 502.7L566.6 342.7z" fill="currentColor" /></svg>
                  </Link>
                  <Link href="/about" className="btn btn-secondary" aria-label="About Dawn Scientific" title="About Dawn Scientific">Learn More
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="20" height="20"><path d="M566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3C348.8 149.8 348.8 170.1 361.3 182.6L466.7 288L96 288C78.3 288 64 302.3 64 320C64 337.7 78.3 352 96 352L466.7 352L361.3 457.4C348.8 469.9 348.8 490.2 361.3 502.7C373.8 515.2 394.1 515.2 406.6 502.7L566.6 342.7z" fill="currentColor" /></svg>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="hero-image">
                <Swiper
                  modules={[Navigation, Autoplay]}
                  spaceBetween={20}
                  slidesPerView={1}
                  navigation={false}
                  autoplay={{ delay: 2500, disableOnInteraction: false }}
                  loop={true}
                  pagination={false}
                  breakpoints={{
                    480: { slidesPerView: 1 },
                    768: { slidesPerView: 1 },
                    1024: { slidesPerView: 1 },
                  }} >
                  <SwiperSlide>
                      <img src="/assets/images/Dawnscientific-Home-Banner.png" alt="Home Banner" loading="eager" fetchPriority="high" />
                  </SwiperSlide>
                  <SwiperSlide>
                      <img src="/assets/images/ChemieR_Slider.png" alt="Chemier Brand" loading="eager" fetchPriority="high" />
                  </SwiperSlide>
                  <SwiperSlide>
                      <img src="/assets/images/dawn_img2.webp" alt="Home Banner" loading="eager" fetchPriority="high" />
                  </SwiperSlide>
                </Swiper>
                <div className="delivery-container">
                  <div className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width="50" height="50" x="0" y="0" viewBox="0 0 512 512" xmlSpace="preserve"><g><path d="m476.158 231.363-13.259-53.035c3.625-.77 6.345-3.986 6.345-7.839v-8.551c0-18.566-15.105-33.67-33.67-33.67h-60.392V110.63c0-9.136-7.432-16.568-16.568-16.568H50.772c-9.136 0-16.568 7.432-16.568 16.568V256a8.017 8.017 0 0 0 16.034 0V110.63c0-.295.239-.534.534-.534h307.841c.295 0 .534.239.534.534v145.372a8.017 8.017 0 0 0 16.034 0v-9.088h94.569l.021.002.022-.001c11.637.008 21.518 7.646 24.912 18.171h-24.928a8.017 8.017 0 0 0-8.017 8.017v17.102c0 13.851 11.268 25.119 25.119 25.119h9.086v35.273h-20.962c-6.886-19.883-25.787-34.205-47.982-34.205s-41.097 14.322-47.982 34.205h-3.86v-60.393a8.017 8.017 0 0 0-16.034 0v60.391H192.817c-6.886-19.883-25.787-34.205-47.982-34.205s-41.097 14.322-47.982 34.205H50.772a.534.534 0 0 1-.534-.534v-17.637h34.739a8.017 8.017 0 0 0 0-16.034H8.017a8.017 8.017 0 0 0 0 16.034h26.188v17.637c0 9.136 7.432 16.568 16.568 16.568h43.304c-.002.178-.014.355-.014.534 0 27.996 22.777 50.772 50.772 50.772s50.772-22.776 50.772-50.772c0-.18-.012-.356-.014-.534h180.67c-.002.178-.014.355-.014.534 0 27.996 22.777 50.772 50.772 50.772 27.995 0 50.772-22.776 50.772-50.772 0-.18-.012-.356-.014-.534h26.203a8.017 8.017 0 0 0 8.017-8.017v-85.511c.001-21.112-15.576-38.653-35.841-41.738zm-100.976-87.062h60.392c9.725 0 17.637 7.912 17.637 17.637v.534h-78.029v-18.171zm0 86.58v-52.376h71.235l13.094 52.376h-84.329zM144.835 401.904c-19.155 0-34.739-15.583-34.739-34.739s15.584-34.739 34.739-34.739c19.155 0 34.739 15.583 34.739 34.739s-15.584 34.739-34.739 34.739zm282.188 0c-19.155 0-34.739-15.583-34.739-34.739s15.584-34.739 34.739-34.739c19.155 0 34.739 15.583 34.739 34.739s-15.584 34.739-34.739 34.739zm68.944-102.614h-9.086c-5.01 0-9.086-4.076-9.086-9.086v-9.086h18.171v18.172z" fill="#fff" opacity="1" data-original="#fff" /><path d="M144.835 350.597c-9.136 0-16.568 7.432-16.568 16.568 0 9.136 7.432 16.568 16.568 16.568 9.136 0 16.568-7.432 16.568-16.568 0-9.136-7.432-16.568-16.568-16.568zM427.023 350.597c-9.136 0-16.568 7.432-16.568 16.568 0 9.136 7.432 16.568 16.568 16.568 9.136 0 16.568-7.432 16.568-16.568 0-9.136-7.432-16.568-16.568-16.568zM332.96 316.393H213.244a8.017 8.017 0 0 0 0 16.034H332.96a8.017 8.017 0 0 0 0-16.034zM127.733 282.188H25.119a8.017 8.017 0 0 0 0 16.034h102.614a8.017 8.017 0 0 0 0-16.034zM278.771 173.37a8.017 8.017 0 0 0-11.337.001l-71.292 71.291-37.087-37.087a8.016 8.016 0 0 0-11.337 0 8.016 8.016 0 0 0 0 11.337l42.756 42.756c1.565 1.566 3.617 2.348 5.668 2.348s4.104-.782 5.668-2.348l76.96-76.96a8.018 8.018 0 0 0 .001-11.338z" fill="#fff" opacity="1" data-original="#fff" /></g></svg>
                  </div>
                  <h3>Premium Quality ACS Grade Chemicals</h3>
                </div>
              </div>
            </div>
          </div>
          {false &&
            <div className={`search-wrapper ${isLoading ? "loading-wrapper" : ""}`}>
              <div className="search-form">
                <form action="">
                  <h3>Search Product</h3>
                  <div className="home_search_product">
                    <Select
                      options={categoryOptions}
                      name="category"
                      value={categoryOptions.find(option => option.value === fcatSlug)}
                      onChange={(selectedOption) => setFcatSlug(selectedOption.value)}
                    />
                    <Select
                      options={subCategoryOptions}
                      name="sub-category"
                      value={subCategoryOptions.find(option => option.value === fsubCatSlug)}
                      onChange={(selectedOption) => setFsubCatSlug(selectedOption.value)}
                    />

                    <Select
                      options={productOptions}
                      name="products"
                      value={productOptions.find(option => option.value === fslug)}
                      onChange={(selectedOption) => setFslug(selectedOption.value)}
                    />
                    <Link href={fbuttonLink} className={`btn btn-primary ${isLoading ? "loading" : ""}`} aria-label="View Products" title="Search Products">{!isLoading ? "View" : ""}</Link>
                  </div>
                </form>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
    {false &&

      <section className="top-category">
        <div className="container">
          <div className="row">
            <div className="title">
              <h2>Top Category</h2>
              <Link href="/product-category" className="title-link" aria-label="Dawn Product Categories" title="Dawn Product Categories">
                View More
                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="20" height="20"><path d="M13.1,19a1,1,0,0,1-.7-1.71L17,12.71a1,1,0,0,0,0-1.42L12.4,6.71a1,1,0,0,1,0-1.42,1,1,0,0,1,1.41,0L18.4,9.88a3,3,0,0,1,0,4.24l-4.59,4.59A1,1,0,0,1,13.1,19Z" fill="currentColor" /><path d="M6.1,19a1,1,0,0,1-.7-1.71L10.69,12,5.4,6.71a1,1,0,0,1,0-1.42,1,1,0,0,1,1.41,0l6,6a1,1,0,0,1,0,1.42l-6,6A1,1,0,0,1,6.1,19Z" fill="currentColor" /></svg>
              </Link>
            </div>
            <div className="category-wrap">
              <div className="category-item">
                <Link href="/suppliers" aria-label="Brands" title="Dawn Scientific Brands">
                  <div className="icon-border">
                    <div className="icon">
                      <svg className="svg_icon" width="32" height="32" fill="red">
                        <use xlinkHref={`/sprite.svg#brand`} />
                      </svg>
                    </div>
                  </div>
                  <div className="content">
                    <h3>Brands</h3>
                    <p>90 +</p>
                  </div>
                </Link>
              </div>
              <div className="category-item">
                <Link href={`/product-category/consumables-supplies`} aria-label="Consumables & Supply" title="Consumables & Supply">
                  <div className="icon-border">
                    <div className="icon">
                      <svg className="svg_icon" width="32" height="32" fill="red">
                        <use xlinkHref={`/sprite.svg#chemical`} />
                      </svg>
                    </div>
                  </div>
                  <div className="content">
                    <h3>Consumables & Supply</h3>
                    <p>50,000+ Products</p>
                  </div>
                </Link>
              </div>
              <div className="category-item">
                <Link href={`/product-category/equipments`} aria-label="Lab Equipment" title="Lab Equipment">
                  <div className="icon-border">
                    <div className="icon">
                      <svg className="svg_icon" width="32" height="32" fill="red">
                        <use xlinkHref={`/sprite.svg#supply`} />
                      </svg>
                    </div>
                  </div>
                  <div className="content">
                    <h3>Lab Equipment</h3>
                    <p>8000+ Products</p>
                  </div>
                </Link>
              </div>
              <div className="category-item">
                <Link href={`/product-category/lab-reagents`} aria-label="Lab Reagents" title="Lab Reagents">
                  <div className="icon-border">
                    <div className="icon">
                      <svg className="svg_icon" width="32" height="32" fill="red">
                        <use xlinkHref={`/sprite.svg#lab`} />
                      </svg>
                    </div>
                  </div>
                  <div className="content">
                    <h3>Lab Reagents</h3>
                    <p>29,000+ Products</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
  }

            <section className="category-section pt-5">
                <div className="container">
                    <div className="title">
                        <h2><Link href="/product-category/lab-reagents" title="Lab Reagents">Buy High Quality Lab Chemicals</Link></h2>
                        <p>Explore high-quality lab chemicals designed to support scientific research, analytical testing, and quality control. Dawn Scientific delivers premium laboratory chemicals with exceptional purity, reliable performance, and consistent quality for laboratories across diverse industries.</p>
                    </div>
                    <div className="row">
                        {frontProducts['home2'] && (
                            <Swiper
                                modules={[Navigation, Autoplay]}
                                spaceBetween={20}
                                slidesPerView={2}
                                navigation
                                autoplay={{ delay: 2500, disableOnInteraction: false }}
                                loop={true}
                                pagination={false}
                                breakpoints={{
                                    480: { slidesPerView: 2 },
                                    768: { slidesPerView: 3 },
                                    1024: { slidesPerView: 5 },
                                }}
                            >
                                {frontProducts['home2']?.map((pro) => (
                                    <SwiperSlide key={pro.id}>
                                        <Link href={`/product-category/${pro.slug}`} aria-label={pro?.name} className="category-item" title={pro?.name}>
                                            <div className="img-container">
                                                <img src={pro.image_url ? pro.image_url : "/assets/images/Placeholder_logo.webp"} alt={pro?.name} loading="lazy" width="150" height="150" />
                                                <div className="category-action-wrap">
                                                    <div className="category-action">
                                                        <span className="icon">
                                                            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="18" height="18"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor" /><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor" /></svg>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="content">
                                                <h2 aria-label={pro?.name}>{pro.name}</h2>
                                                <p>{pro?.p_count} Products</p>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )
                        }
                    </div>
                </div>
            </section>
            <section className="category-section pt-5 infinte-slider">
                <div className="container">
                        <div className="title">
                            <h2><Link href="/product-category/brands" className="title-link" aria-label="Dawn Scientific Suppliers" title="Dawn Scientific Popular brands">Popular Brands</Link></h2>
                            <p>Our portfolio includes trusted laboratory brands offering premium chemicals, reagents, solvents, chromatography products, standard solutions, laboratory supplies and specialty products that meet the needs of research, pharmaceutical, educational, and industrial laboratories.</p>
                        </div>
                    <div className="row">    
                        {false &&
                            <div className="col-md-10">
                                <div className="tabs-head">
                                    <button className={`btn-tabs ${activeTab === "" ? "active" : ""}`} onClick={() => setActiveTab("")} aria-label="All">All</button>
                                    {topBrands[0]?.children_recursive?.map(tab => (
                                        (tab.children_recursive.length > 0 &&
                                            <button className={`btn-tabs ${activeTab === tab.id ? "active" : ""}`} key={tab.id} onClick={() => setActiveTab(tab.id)} aria-label={tab?.name} title={tab?.name}>{tab?.name}</button>
                                        )
                                    ))}
                                </div>
                            </div>
                        }

                        <div className="slider-wrapper">
                            <div className="slider-track">
                                {itemsToRender.length > 0 && <>
                                    { 
                                        itemsToRender?.map(item => (
                                            <Link className="slide" href={`/product-category/brands/${item.slug}`} aria-label={item?.name} key={item?.id} title={item?.name}>
                                                <img src={`${item?.image_url}`} alt={item?.name} loading="lazy" width="125px" height="60px" />
                                            </Link>
                                        )) 
                                    }
                                    {
                                        itemsToRender?.map(item => (
                                            <Link className="slide" href={`/product-category/brands/${item.slug}`} aria-label={item?.name} key={item?.id} title={item?.name}>
                                                <img src={`${item?.image_url}`} alt={item?.name} loading="lazy" width="125px" height="60px" />
                                            </Link>
                                        ))
                                    }
                                    {
                                        itemsToRender?.map(item => (
                                            <Link className="slide" href={`/product-category/brands/${item.slug}`} aria-label={item?.name} key={item?.id} title={item?.name}>
                                                <img src={`${item?.image_url}`} alt={item?.name} loading="lazy" width="125px" height="60px" />
                                            </Link>
                                        ))
                                    }
                                    {
                                        itemsToRender?.map(item => (
                                            <Link className="slide" href={`/product-category/brands/${item.slug}`} aria-label={item?.name} key={item?.id} title={item?.name}>
                                                <img src={`${item?.image_url}`} alt={item?.name} loading="lazy" width="125px" height="60px" />
                                            </Link>
                                        ))
                                    }
                                </>
                                }
                            </div>
                        </div>
                        {/* <AnimatePresence>
                            {itemsToRender?.map((item) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="col-md-25"
                                >
                                    <Link className={`tab-card ${item.parent_id == 940 ? "brands_logo" : ""}`} href={`/product-category/brands/${item.slug}`} aria-label={item?.name} title={item?.name}>
                                        <div className="img-area">
                                            <img src={`${item?.image_url}`} alt={item.name} loading="lazy" width="145" height="96" />
                                        </div>
                                        <div className="desc">
                                            <h2>{item?.name}</h2>
                                            <div className="btn-area">
                                                <span className="btn btn-small" aria-label="Brands">Buy Now</span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence> */}
                    </div>
                </div>
            </section>
            
            <section className="category-section pt-5">
                <div className="container">
                    <div className="title">
                        <h2><Link href="/product-category/consumables-supplies" title="Consumables Supplies">Buy Laboratory Consumables</Link></h2>
                        <p>Shop laboratory consumables from trusted brands at competitive prices. From everyday laboratory workflows to advanced scientific research, our high-quality laboratory consumables provide the reliability, consistency, and performance required for analytical testing, diagnostics, quality control, and industrial laboratory applications.</p>
                    </div>
                    <div className="row">
                        {frontProducts['home1'] && (
                            <Swiper
                                modules={[Navigation, Autoplay]}
                                spaceBetween={20}
                                slidesPerView={2}
                                navigation
                                autoplay={{ delay: 2500, disableOnInteraction: false }}
                                loop={true}
                                pagination={false}
                                breakpoints={{
                                    480: { slidesPerView: 2 },
                                    768: { slidesPerView: 3 },
                                    1024: { slidesPerView: 5 },
                                }}
                            >
                                {frontProducts['home1']?.map((pro) => (
                                    (pro?.p_count &&
                                        <SwiperSlide key={pro.id}>
                                            <Link href={`/product-category/${pro.slug}`} aria-label={pro?.name} className="category-item">                                                
                                            <div className="img-container">
                                                <img src={pro.image_url ? pro.image_url : "/assets/images/Placeholder_logo.webp"} alt={pro?.name} loading="lazy" width="150" height="150" />
                                                <div className="category-action-wrap">
                                                    <div className="category-action">
                                                        <span className="icon">
                                                            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="18" height="18"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor" /><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor" /></svg>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                                <div className="content">
                                                    <h2 aria-label={pro?.name}>{pro.name}</h2>
                                                    <p>{pro?.p_count} Products</p>
                                                </div>
                                            </Link>
                                        </SwiperSlide>
                                    )
                                ))}
                            </Swiper>
                        )
                        }

                    </div>
                </div>
            </section>

            <section className="category-section pt-5">
                <div className="container">
                    <div className="title">
                        <h2><Link href='/product-category/equipments'>Buy Laboratory Equipment</Link></h2>
                        <p>Discover laboratory equipment and scientific instruments online from trusted brands at competitive prices. Browse a wide selection of laboratory equipment designed for research, analytical testing, quality control, pharmaceutical, biotechnology, educational, and industrial laboratory applications.</p>
                    </div>
                    <div className="row">
                        {frontProducts['home3'] && (
                            <Swiper
                                modules={[Navigation, Autoplay]}
                                spaceBetween={20}
                                slidesPerView={2}
                                navigation
                                autoplay={{ delay: 2500, disableOnInteraction: false }}
                                loop={true}
                                pagination={false}
                                breakpoints={{
                                    480: { slidesPerView: 2 },
                                    768: { slidesPerView: 3 },
                                    1024: { slidesPerView: 5 },
                                }}
                            >
                                {frontProducts['home3']?.map((pro) => (
                                    (pro?.p_count &&
                                        <SwiperSlide key={pro.id}>
                                            <Link href={`/product-category/${pro.slug}`} className="category-item" aria-label={pro?.name}>
                                                <div className="img-container">
                                                    <img src={pro.image_url ? pro.image_url : "/assets/images/Placeholder_logo.webp"} alt={pro?.name} loading="lazy" width="150" height="150" />
                                                    <div className="category-action-wrap">
                                                        <div className="category-action">
                                                            <span className="icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="18" height="18"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor" /><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor" /></svg>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="content">
                                                    <h2 aria-label={pro?.name}>{pro.name}</h2>
                                                    <p>{pro?.p_count} Products</p>
                                                </div>
                                            </Link>
                                        </SwiperSlide>
                                    )
                                ))}
                            </Swiper>
                        )
                        }
                    </div>
                </div>
            </section>
            <section className="popular-brands infinte-slider">
                <div className="container">
                    <div className="row">
                        <div className="title">
                            <h2>Shop by suppliers</h2>
                            <Link href="/suppliers" className="title-link" aria-label="Dawn scientific suppliers" title="Dawn scientific suppliers">
                                All Brands 
                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="20" height="20"><path d="M13.1,19a1,1,0,0,1-.7-1.71L17,12.71a1,1,0,0,0,0-1.42L12.4,6.71a1,1,0,0,1,0-1.42,1,1,0,0,1,1.41,0L18.4,9.88a3,3,0,0,1,0,4.24l-4.59,4.59A1,1,0,0,1,13.1,19Z" fill="currentColor" /><path d="M6.1,19a1,1,0,0,1-.7-1.71L10.69,12,5.4,6.71a1,1,0,0,1,0-1.42,1,1,0,0,1,1.41,0l6,6a1,1,0,0,1,0,1.42l-6,6A1,1,0,0,1,6.1,19Z" fill="currentColor" /></svg>
                            </Link>
                        </div>
                        <p>Simplify your laboratory sourcing with a carefully selected portfolio of leading suppliers. Explore an extensive selection of scientific products designed to support accurate analysis, regulatory compliance, and efficient laboratory operations across multiple industries.</p>
                        <div className="slider-wrapper">
                            <div className="slider-track">
                                {brands.length > 0 &&
                                    brands?.map(brand => (
                                        <Link className="slide" href={`/brand/${brand?.slug}`} aria-label={brand?.name} key={brand?.id} title={brand?.name}>
                                            <img src={brand?.image_url} alt={brand?.name} loading="lazy" width="125px" height="60px" />
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="feature-area">
                <div className="container">
                    <div className="feature-wrapper">
                        <div className="row">
                            <div className="col-md-25">
                                <div className="feature-item">
                                    <div className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" width="30" height="30" viewBox="0 0 24 24">
                                            <path d="m24,10c0-2.757-2.243-5-5-5h-2v-1c0-1.654-1.346-3-3-3h-2v2h2c.552,0,1,.449,1,1v13H2v-4H0v6h2.037c-.024.165-.037.331-.037.5,0,1.93,1.57,3.5,3.5,3.5s3.5-1.57,3.5-3.5c0-.169-.013-.335-.037-.5h6.074c-.024.165-.037.331-.037.5,0,1.93,1.57,3.5,3.5,3.5s3.5-1.57,3.5-3.5c0-.169-.013-.335-.037-.5h2.037v-9ZM7,19.5c0,.827-.673,1.5-1.5,1.5s-1.5-.673-1.5-1.5c0-.189.037-.356.091-.5h2.819c.054.144.091.311.091.5Zm12-12.5c1.654,0,3,1.346,3,3v1h-5v-4h2Zm1,12.5c0,.827-.673,1.5-1.5,1.5s-1.5-.673-1.5-1.5c0-.189.037-.356.091-.5h2.819c.054.144.091.311.091.5Zm-3-2.5v-4h5v4h-5ZM10,3H0V1h10v2Zm-2,4H0v-2h8v2Zm-2,4H0v-2h6v2Z" fill="currentColor" />
                                        </svg>
                                    </div>
                                    <div className="content">
                                        <h2>Fast Delivery</h2>
                                        <p>Minimum Days</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-25">
                                <div className="feature-item">
                                    <div className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="30" height="30"><path d="M19.949,5.536,16.465,2.05A6.958,6.958,0,0,0,11.515,0H7A5.006,5.006,0,0,0,2,5V19a5.006,5.006,0,0,0,5,5H17a5.006,5.006,0,0,0,5-5V10.485A6.951,6.951,0,0,0,19.949,5.536ZM18.535,6.95A4.983,4.983,0,0,1,19.316,8H15a1,1,0,0,1-1-1V2.684a5.01,5.01,0,0,1,1.051.78ZM20,19a3,3,0,0,1-3,3H7a3,3,0,0,1-3-3V5A3,3,0,0,1,7,2h4.515c.164,0,.323.032.485.047V7a3,3,0,0,0,3,3h4.953c.015.162.047.32.047.485Z" fill="currentColor" /></svg>
                                    </div>
                                    <div className="content">
                                        <h2>ISO Certified</h2>
                                        <p>Best Quality Products</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-25">
                                <div className="feature-item">
                                    <div className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="30" height="30"><path d="M21,6H5c-.859,0-1.672-.372-2.235-.999,.55-.614,1.349-1.001,2.235-1.001H23c.553,0,1-.448,1-1s-.447-1-1-1H5C2.239,2,0,4.239,0,7v10c0,2.761,2.239,5,5,5H21c1.657,0,3-1.343,3-3V9c0-1.657-1.343-3-3-3Zm1,13c0,.551-.448,1-1,1H5c-1.654,0-3-1.346-3-3V6.998c.854,.639,1.904,1.002,3,1.002H21c.552,0,1,.449,1,1v10Zm-2-5c0,.552-.448,1-1,1s-1-.448-1-1,.448-1,1-1,1,.448,1,1Z" fill="currentColor" /></svg>
                                    </div>
                                    <div className="content">
                                        <h2>Safe Payment</h2>
                                        <p>100% Secure Payment</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-25">
                                <div className="feature-item">
                                    <div className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="30" height="30"><path d="M21,12.424V11A9,9,0,0,0,3,11v1.424A5,5,0,0,0,5,22a2,2,0,0,0,2-2V14a2,2,0,0,0-2-2V11a7,7,0,0,1,14,0v1a2,2,0,0,0-2,2v6H14a1,1,0,0,0,0,2h5a5,5,0,0,0,2-9.576ZM5,20H5a3,3,0,0,1,0-6Zm14,0V14a3,3,0,0,1,0,6Z" fill="currentColor" /></svg>
                                    </div>
                                    <div className="content">
                                        <h2>24/7 Support</h2>
                                        <p>Feel Free To Call Us</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="info">
                <div className="container">
                    <div className="title text-center">
                        <h2><span className="colorful">Industries</span> We Serve</h2>
                        <h3>We supply high-purity chemicals that deliver accurate, reliable, and reproducible results across analytical, pharmaceutical, environmental, R&D lab, and more industries.</h3>
                    </div>
                    <div className="row">
                        <Swiper
                            style={{ paddingTop: "40px", paddingBottom: "40px" }}
                            modules={[Navigation, Autoplay, Pagination]}
                            spaceBetween={20}
                            slidesPerView={1}
                            navigation
                            autoplay={{ delay: 2500, disableOnInteraction: false }}
                            loop={true}
                            pagination={{ clickable: true }}
                            breakpoints={{
                                480: { slidesPerView: 1 },
                                768: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                            }}
                        >
                            <SwiperSlide>
                                <div className="info-card">
                                    <div className="detail">
                                        <div className="img-container">
                                            <div className='img_wrp'>
                                                <img src="/assets/images/Analytical-400x250.webp" width="150" height="150" alt="Analytical Chemistry" loading="lazy" />
                                            </div>
                                            <h3>Analytical Chemistry</h3>
                                        </div>
                                        <div className="desc">
                                            <p>Studies & uses instruments and methods to separate, identify, and quantify matter</p>
                                        </div>
                                    </div>
                                    <Link href="/analytical-lab" className="btn btn-primary" aria-label="Analytical Chemistry" title='Analytical Chemistry'><span aria-hidden="true">Read More</span></Link>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="info-card">
                                    <div className="detail">
                                        <div className="img-container">
                                            <div className='img_wrp'>
                                                <img src="/assets/images/Enviremental-400x250.webp" width="150" height="150" alt="Environmental Chemistry" loading="lazy" />
                                            </div>
                                            <h3>Environmental Chemistry</h3>
                                        </div>
                                        <div className="desc">
                                            <p>Study of all the chemical species present in the soil, water, and air environments</p>
                                        </div>
                                    </div>
                                    <Link href="/environmental-chemistry" className="btn btn-primary" aria-label="Environmental Chemistry" title="Environmental Chemistry"><span aria-hidden="true">Read More</span></Link>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="info-card">
                                    <div className="detail">
                                        <div className="img-container">
                                            <div className='img_wrp'>
                                                <img src="assets/images/Microbiological-lab-400x250.webp" width="150" height="150" alt="Microbiology Lab" loading="lazy" />
                                            </div>
                                            <h3>Microbiology Lab</h3>
                                        </div>
                                        <div className="desc">
                                            <p>Study of identification of microorganisms including bacteria, fungi, yeasts</p>
                                        </div>
                                    </div>
                                    <Link href="/microbiology-lab" className="btn btn-primary" aria-label="Microbiology Lab" title="Microbiology Lab"><span aria-hidden="true">Read More</span></Link>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="info-card">
                                    <div className="detail">
                                        <div className="img-container">
                                            <div className='img_wrp'>
                                                <img src="assets/images/Cannabis-400x250.webp" width="150" height="150" alt="Cannabis oil extraction" loading="lazy" />
                                            </div>
                                            <h3>Cannabis oil extraction</h3>
                                        </div>
                                        <div className="desc">
                                            <p>Use chemicals, such as carbon dioxide or ethanol, to separate CBD from the plant</p>
                                        </div>
                                    </div>
                                    <Link href="/cannabis-oil-extraction" className="btn btn-primary" aria-label="Cannabis oil extraction" title="Cannabis oil extraction"><span aria-hidden="true">Read More</span></Link>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="info-card">
                                    <div className="detail">
                                        <div className="img-container">
                                            <div className='img_wrp'>
                                                <img src="assets/images/Food-400x250.webp" width="150" height="150" alt="Food & Beverage Testing" loading="lazy" />
                                            </div>
                                            <h3>Food & Beverage Testing</h3>
                                        </div>
                                        <div className="desc">
                                            <p>Chemical substances can play an important role in food production & preservation</p>
                                        </div>
                                    </div>
                                    <Link href="/food-beverage-testing" className="btn btn-primary" aria-label="Food & Beverage Testing" title="Food & Beverage Testing"><span aria-hidden="true">Read More</span></Link>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="info-card">
                                    <div className="detail">
                                        <div className="img-container">
                                            <div className='img_wrp'>
                                                <img src="assets/images/Botanical-400x250.webp" width="150" height="150" alt="Botanical" loading="lazy" />
                                            </div>
                                            <h3>Botanical</h3>
                                        </div>
                                        <div className="desc">
                                            <p>Used to make essential oils, botanical preparations, and botanical drugs</p>
                                        </div>
                                    </div>
                                    <Link href="/botanical" className="btn btn-primary" aria-label="Botanical" title="Botanical"><span aria-hidden="true">Read More</span></Link>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="info-card">
                                    <div className="detail">
                                        <div className="img-container">
                                            <div className='img_wrp'>
                                                <img src="assets/images/R-d-lab-400x250.webp" width="150" height="150" alt="R & D laboratory" loading="lazy" />
                                            </div>
                                            <h3>R & D laboratory</h3>
                                        </div>
                                        <div className="desc">
                                            <p>High-purity reagents, solvents, and consumables engineered for precise research and development workflows.</p>
                                        </div>
                                    </div>
                                    <Link href="/rd-laboratory" className="btn btn-primary" aria-label="R & D laboratory" title="R & D laboratory"><span aria-hidden="true">Read More</span></Link>
                                </div>
                            </SwiperSlide>

                            <SwiperSlide>
                                <div className="info-card">
                                    <div className="detail">
                                        <div className="img-container">
                                            <div className='img_wrp'>
                                                <img src="assets/images/Petrolium-400x250.webp" width="150" height="150" alt="Petroleum" loading="lazy" />
                                            </div>
                                            <h3>Petroleum</h3>
                                        </div>
                                        <div className="desc">
                                            <p>Petrochemicals are the chemical products obtained from petroleum by refining</p>
                                        </div>
                                    </div>
                                    <Link href="/petroleum" className="btn btn-primary" aria-label="Petroleum" title="Petroleum"><span aria-hidden="true">Read More</span></Link>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="info-card">
                                    <div className="detail">
                                        <div className="img-container">
                                            <div className='img_wrp'>
                                                <img src="/assets/images/Educational.webp" width="150" height="150" alt="Educational" loading="lazy" />
                                            </div>
                                            <h3>Educational</h3>
                                        </div>
                                        <div className="desc">
                                            <p>Curriculum-ready lab supplies and science kits that simplify hands-on learning for schools and colleges.</p>
                                        </div>
                                    </div>
                                    <Link href="/educational" className="btn btn-primary" aria-label="Educational" title="Educational"><span aria-hidden="true">Read More</span></Link>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="info-card">
                                    <div className="detail">
                                        <div className="img-container">
                                            <div className='img_wrp'>
                                                <img src="/assets/images/Biotechnology.webp" width="150" height="150" alt="Biotechnology" loading="lazy" />
                                            </div>
                                            <h3>Biotechnology</h3>
                                        </div>
                                        <div className="desc">
                                            <p>Advanced biotech reagents and lab essentials designed to support reliable research and innovation.</p>
                                        </div>
                                    </div>
                                    <Link href="/biotechnology" className="btn btn-primary" aria-label="Biotechnology" title="Biotechnology"><span aria-hidden="true">Read More</span></Link>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="info-card">
                                    <div className="detail">
                                        <div className="img-container">
                                            <div className='img_wrp'>
                                                <img src="assets/images/Pharmacy-400x250.webp" width="150" height="150" alt="Pharmaceutical" loading="lazy" />
                                            </div>
                                            <h3>Pharmaceutical</h3>
                                        </div>
                                        <div className="desc">
                                            <p>Pharmaceutical chemists development of modified peptides and proteins</p>
                                        </div>
                                    </div>
                                    <Link href="/pharmaceutical" className="btn btn-primary" aria-label="Pharmaceutical" title="Pharmaceutical"><span aria-hidden="true">Read More</span></Link>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="info-card">
                                    <div className="detail">
                                        <div className="img-container">
                                            <div className='img_wrp'>
                                                <img src="/assets/images/School-college.webp" width="150" height="150" alt="School & Colleges" loading="lazy" />
                                            </div>
                                            <h3>School & Colleges</h3>
                                        </div>
                                        <div className="desc">
                                            <p>Empowering Science Education with Reliable Lab Supplies & Kits for Chemistry, Biology, and Physics.</p>
                                        </div>
                                    </div>
                                    <Link href="/product-category/consumables-supplies/chemistry/" className="btn btn-primary" aria-label="School & Colleges" title="School & Colleges"> <span aria-hidden="true">Read More</span></Link>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </section>
            <section className="knowledge">
                <div className="container">
                    <div className="title">
                        <h2>Knowledge Center</h2>
                    </div>
                    <div className="row">
                        {blogs &&
                            blogs.slice(0, 5)?.map(blog => (
                                <div className="col-md-2" key={blog?.id}>
                                    <div className="article">
                                        <div className="img-container">
                                            <div className="skeletone">
                                                <img src={blog?.image_url} alt={blog?.title} width="186" height="186" loading="lazy" />
                                            </div>
                                        </div>
                                        <div className="title">
                                            <h3>{blog?.title}</h3>
                                        </div>
                                        <div className="btn-area">
                                            <Link href={`/blog/detail/${blog?.slug}`} title={blog?.title} aria-label={`${blog?.title}`} className="btn btn-secondary w-100">
                                                <span aria-hidden="true">Read More</span> 
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="20" height="20"><path d="M566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3C348.8 149.8 348.8 170.1 361.3 182.6L466.7 288L96 288C78.3 288 64 302.3 64 320C64 337.7 78.3 352 96 352L466.7 352L361.3 457.4C348.8 469.9 348.8 490.2 361.3 502.7C373.8 515.2 394.1 515.2 406.6 502.7L566.6 342.7z" fill="currentColor"></path></svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="row justify-content-center mt-2">
                        <Link href="/blog" className="btn btn-primary" aria-label="Blog">View More</Link>
                    </div>
                </div>
            </section>
            <section className="choose-us">
                <div className="container">
                    <div className="row row-gap-20">
                        
                        <div className="col-md-33">
                            <div className="title">
                                <h2>Why Dawn Scientific?</h2>
                                <h4>We Provide Premium Quality Product For You</h4>
                            </div>
                        </div>

                        <div className="col-sm-8">
                            <div className="desc">
                                <p>For over 40 years, Dawn Scientific has been dedicated to delivering high-quality laboratory products and services across various scientific sectors. As a 100% Woman-Owned Company, certified by the Women’s Business Enterprise National Council (WBENC) and ISO 9001:2015, we have built a reputation as one of the most trusted partners in the scientific community.</p>
                            </div>
                        </div>

                        <div className="col-md-33">
                            <div className="card">
                                <div className="icon">
                                    <svg className="svg_icon" width="32" height="32" fill="red">
                                        <use xlinkHref="/sprite.svg#quality" />
                                    </svg>
                                </div>
                                <div className="info">
                                    <h3>Uncompromised Quality</h3>
                                    <p>We deliver laboratory chemicals and consumables that meet the highest industry standards, ensuring precision and reliability in your experiments and processes.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-33">
                            <div className="card">
                                <div className="icon">
                                    <svg className="svg_icon" width="32" height="32" fill="red">
                                        <use xlinkHref="/sprite.svg#cost" />
                                    </svg>
                                </div>
                                <div className="info">
                                    <h3>Cost-Effective Options</h3>
                                    <p>Save time and money with competitive pricing, bulk packaging options, and scalable solutions designed to suit labs of all sizes.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-33">
                            <div className="card">
                                <div className="icon">
                                    <svg className="svg_icon" width="32" height="32" fill="red">
                                        <use xlinkHref="/sprite.svg#paper" />
                                    </svg>
                                </div>
                                <div className="info">
                                    <h3>Sustainability Practices</h3>
                                    <p>We are committed to eco-friendly practices, offering products and packaging that reduce environmental impact.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    </>
  );
}
