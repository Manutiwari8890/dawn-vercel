"use client";
import {useEffect, useState, useRef, useContext} from 'react';
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { CartContext } from '../context/cart'
import { AuthContext } from '../context/AuthContext';
import { useLoader } from "../context/LoaderContext";
import { useUI } from '@/context/UiContext';

function Header(){
    const pathname = usePathname();
    const router = useRouter();
    const { toggleCart, isCartOpen, isOverlay } = useUI();


    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const { getTotalItem, fetchCartFromApi } = useContext(CartContext)
    const { logout, isLoggedIn } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [menus, setMenus] = useState([]);
    const [accountMenu, setAccountMenu] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);
    const [activeMenuId, setActiveMenuId] = useState(null);
    const { startLoading, stopLoading } = useLoader();
    const [category, setCategory] = useState([]);
    const [brands, setBrands] = useState([]);
    const [products, setProducts] = useState([]);
    const [focused, setFocused] = useState(false);

    const searchWrapperRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target)) {
                setFocused(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const menuRef = useRef(null);
    const navRef = useRef(null);
    const seacrhRef = useRef(null);

    useEffect(() => {
    function handleClickOutside(event) {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setActiveMenuId(null); // close menu if clicked outside
        }
        }
        if (activeMenuId) {
            document.addEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [activeMenuId]);

    useEffect(() => {
        setAccountMenu(false);
        setIsOpen(false); 
        setSearchOpen(false); 
        setFocused(false)
    }, [pathname])

    const toggleMenu = (id) => {
        if (navRef.current) {
        navRef.current.scrollTo({
            top: 0,
            behavior: "smooth", // smooth scrolling
        });
        }
        setActiveMenuId(activeMenuId === id ? null : id);
    };
    
    const handleSideToggle = () => {
        fetchCartFromApi(); 
        toggleCart();
    }

    useEffect(() => {
        startLoading();
        fetch(`${baseUrl}get-front-category`)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then(({ data }) => {
                const formattedMenus = data?.header?.map((menu) => {
                    const mergedChildren = menu.children_recursive_front.flatMap((f) => {
                        if (f.children_recursive?.length) {
                            return [f, ...f.children_recursive];
                        }
                        return [f];
                    });

                    return {
                        ...menu,
                        children_recursive_front: mergedChildren,
                    };
                });

                setMenus(formattedMenus);
                stopLoading();
            })
            .catch((err) => {
                console.error("Error fetching menu data:", err);
                stopLoading();
            });

    }, []);

    useEffect(() => {
    const header = document.querySelector('.main-head');
    const scrollTop = document.querySelector('#scroll-top');
    const isHome = pathname === "/";
    document.body.classList.toggle("inner-page", !isHome);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;
      setAccountMenu(false);
      setActiveMenuId("");
      if (scrollPosition > scrollThreshold) {
        header?.classList.add('fixed-top');
        scrollTop?.classList.add('active');
      } else {
        header?.classList.remove('fixed-top');
        scrollTop?.classList.remove('active');
      }
    };
    const handleScrollTopClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        };

        window.addEventListener('scroll', handleScroll);
        scrollTop?.addEventListener('click', handleScrollTopClick);

        return () => {
        window.removeEventListener('scroll', handleScroll);
        scrollTop?.removeEventListener('click', handleScrollTopClick);
        };
    }, [pathname]);

    function handleSearch(e) {
        e.preventDefault();
        router.push(`/search?s=${searchText}`, { state: { value: searchText } });
        setSearchText("");
    }

    useEffect(() => {
        if (!searchText) {
            setCategory([]);
            setProducts([]);
            setBrands([]);
            return;
        }

        const delay = setTimeout(() => {
            handleSuggestions();
        }, 500); // 👈 debounce time (ms)

        return () => clearTimeout(delay);
        }, [searchText]);



    const handleSuggestions = async () => {
        if(searchText){
            setLoading(true);
            try {
                const response = await fetch(`${baseUrl}suggestions?search=${searchText}`, {
                    method: "GET",
                });
                if (!response.ok) {
                    throw new Error("Suggestions Failse")
                }

                const result = await response.json();
                setCategory(result.data.categories);
                setProducts(result.data.products);
                setBrands(result.data.brands);
                setLoading(false);
            } catch (err) {
                console.log(err)
            }
        }else{
            setCategory([])
            setProducts([])
            setBrands([])
        }
    }


    return (
        <>
            <header ref={menuRef}>
                <div className="top-head">
                    <div className="container_fluid">
                        <div className="d-flex justify-content-space-between">
                            <h6 className="contact-detail">
                                <a href="mailto:sales@dawnscientific.com">
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24"  width="14" height="14"><path d="M19,1H5A5.006,5.006,0,0,0,0,6V18a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V6A5.006,5.006,0,0,0,19,1ZM5,3H19a3,3,0,0,1,2.78,1.887l-7.658,7.659a3.007,3.007,0,0,1-4.244,0L2.22,4.887A3,3,0,0,1,5,3ZM19,21H5a3,3,0,0,1-3-3V7.5L8.464,13.96a5.007,5.007,0,0,0,7.072,0L22,7.5V18A3,3,0,0,1,19,21Z" fill="currentColor" /></svg>
                                    sales@dawnscientific.com
                                </a>
                                <a href="tel:1-800-DAWN-SCI">
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24"  width="14" height="14"><path d="M21,12.424V11A9,9,0,0,0,3,11v1.424A5,5,0,0,0,5,22a2,2,0,0,0,2-2V14a2,2,0,0,0-2-2V11a7,7,0,0,1,14,0v1a2,2,0,0,0-2,2v6H14a1,1,0,0,0,0,2h5a5,5,0,0,0,2-9.576ZM5,20H5a3,3,0,0,1,0-6Zm14,0V14a3,3,0,0,1,0,6Z" fill="currentColor" /></svg>
                                    1-800-DAWN-SCI  
                                </a>
                                <a href="tel:732-902-6300">
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="14" height="14"><path d="M23,11a1,1,0,0,1-1-1,8.008,8.008,0,0,0-8-8,1,1,0,0,1,0-2A10.011,10.011,0,0,1,24,10,1,1,0,0,1,23,11Zm-3-1a6,6,0,0,0-6-6,1,1,0,1,0,0,2,4,4,0,0,1,4,4,1,1,0,0,0,2,0Zm2.183,12.164.91-1.049a3.1,3.1,0,0,0,0-4.377c-.031-.031-2.437-1.882-2.437-1.882a3.1,3.1,0,0,0-4.281.006l-1.906,1.606A12.784,12.784,0,0,1,7.537,9.524l1.6-1.9a3.1,3.1,0,0,0,.007-4.282S7.291.939,7.26.908A3.082,3.082,0,0,0,2.934.862l-1.15,1C-5.01,9.744,9.62,24.261,17.762,24A6.155,6.155,0,0,0,22.183,22.164Z" fill="currentColor" /></svg>
                                    <b>(24x7)</b> Call 732-902-6300  </a>
                            </h6>
                            <marquee behavior="smooth" direction="left">
                                Attention: If you are experiencing any checkout issues, please call 732-902-6300 | We are currently updating the price listed on our website.
                            </marquee>
                            <nav>
                                <ul>
                                    <li className="nav-item">
                                        <Link href="/suppliers" aria-label="Our Suppliers">Suppliers</Link>
                                    </li>
                                    <li className={`nav-item has-children ${activeMenuId === 'industrie' ? "open" : ""}`} onClick={() => {toggleMenu('industrie')}}>
                                        <Link href="/industrie">Industries</Link>
                                        <ul className="sub-menu">
                                            <div className="d-flex">
                                                <ul>
                                                    <li className="nav-item">
                                                        <Link href='/analytical-lab' aria-label="Analytical Chemistry">Analytical Chemistry</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link href='/biotechnology' aria-label="Biotechnology">Biotechnology</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link href='/botanical' aria-label="Botanical">Botanical</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link href='/cannabis-oil-extraction' aria-label="Cannabis Oil Extraction">Cannabis Oil Extraction</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link href="/educational" aria-label="Educational">Educational</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link href='/environmental-chemistry' aria-label="Environmental Chemistry">Environmental Chemistry</Link>
                                                    </li>
                                                </ul>
                                                <ul>
                                                    <li className="nav-item">
                                                        <Link href='/food-beverage-testing' aria-label="Food and Beverage">Food and Beverage</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link href='/microbiology-lab' aria-label="Microbiology Lab">Microbiology Lab</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link href='/petroleum' aria-label="Petroleum">Petroleum</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link href='/pharmaceutical' aria-label="Pharmaceutical">Pharmaceutical</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link href='/rd-laboratory' aria-label="R&D laboratory">R&D laboratory</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link href='/product-category/consumables-supplies/chemistry/' aria-label="School & Colleges">School & Colleges</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/alcohols" aria-label="Alcohols">Alcohols</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/about" aria-label="About Dawn Scientific">About Us</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/get-quote" aria-label="Get Quote">Get Quote</Link>
                                    </li>
                                    
                                    <li className={`nav-item has-children ${activeMenuId === 'support' ? "open" : ""}`} onClick={() => {toggleMenu('support')}}>
                                        <Link href="" rel="noopener noreferrer">Support</Link>
                                        <ul className="sub-menu">
                                            <li className="nav-item">
                                                <Link href="/literature" aria-label="Literature">Literature</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link href="/faqs" aria-label="FAQ">FAQ's</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link href="/join-us" aria-label="Join Us">Join Us</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link href="/career" aria-label="Career">Career</Link>
                                            </li>
                                        </ul>
                                    </li>
                                    
                                    <li className="nav-item">
                                        <Link href="/contact" aria-label="Contact">Contact</Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>

                <div className="main-head">
                    <div className="container_fluid">
                        <div className="d-flex justify-content-space-between">
                            <div className="logo">
                                <Link href="/" aria-label="Dawn Scientific">
                                    <img src="/assets/images/Website-logo-1.webp" alt="Dawn Scientific" width="200" height="60" />
                                </Link>
                            </div>
                            <nav className={`navbar-menu ${isOpen ? 'active' : ''}`} ref={navRef}>
                                <div className="offcanvas-header">
                                    <Link href="/" className="logo" aria-label="Dawn Scientific">
                                        <img src="/assets/images/Website-logo-1.webp" alt="Dawn Scientific"  loading="lazy" width="200" height="60" />
                                    </Link>
                                    <button className="close-navbar" onClick={() => {
                                        document.documentElement.style.overflow = "auto";                             
                                        setIsOpen(false)
                                    }} aria-label="Close Menu">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"  width="20" height="20"><path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" fill="currentColor" /></svg> 
                                    </button>
                                    <button className={`back-btn btn ${(activeMenuId || accountMenu) ? "active" : ""}`} aria-label="Close all" onClick={() => {
                                            toggleMenu("")
                                            setAccountMenu(false);
                                        }
                                    }>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"  width="16" height="16"><path d="M169.4 297.4C156.9 309.9 156.9 330.2 169.4 342.7L361.4 534.7C373.9 547.2 394.2 547.2 406.7 534.7C419.2 522.2 419.2 501.9 406.7 489.4L237.3 320L406.6 150.6C419.1 138.1 419.1 117.8 406.6 105.3C394.1 92.8 373.8 92.8 361.3 105.3L169.3 297.3z" fill="currentColor" /></svg>
                                        Back
                                    </button>
                                </div>
                                <ul>
                                   {menus && menus.map(menu => (
                                    <li
                                        key={menu?.id}
                                        className={`nav-item ${menu?.children_recursive_front && menu?.children_recursive_front.length ? 'has-children' : ''} ${activeMenuId === menu.id ? "active" : ""}`}
                                    >
                                        <Link href={`/product-category/${menu?.slug}`} aria-label={menu?.name}>
                                                {menu.name}
                                        </Link>
                                        {menu?.children_recursive_front && menu?.children_recursive_front.length > 0 &&
                                            <button className={`drop-toggle ${activeMenuId === menu?.id ? "active" : ""}`} aria-label="toggle menu" onClick={() => toggleMenu(menu.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"  width="16" height="16"><path d="M471.1 297.4C483.6 309.9 483.6 330.2 471.1 342.7L279.1 534.7C266.6 547.2 246.3 547.2 233.8 534.7C221.3 522.2 221.3 501.9 233.8 489.4L403.2 320L233.9 150.6C221.4 138.1 221.4 117.8 233.9 105.3C246.4 92.8 266.7 92.8 279.2 105.3L471.2 297.3z" fill="currentColor" /></svg>
                                            </button>
                                        }
                                        {menu?.children_recursive_front && menu?.children_recursive_front.length > 0 && (
                                        <ul className={`sub-menu ${activeMenuId === menu.id ? 'open' : ''}`}>
                                            <div className="d-flex">
                                                {Array.from({ length: 5 }).map((_, i) => {
                                                const chunkSize = Math.ceil(menu?.children_recursive_front.length / 5);
                                                const start = i * chunkSize;
                                                const end = start + chunkSize;
                                                const chunk = menu?.children_recursive_front.slice(start, end);
                                                    
                                                return (
                                                    <ul key={i}>
                                                    {chunk.map(child => (
                                                            <li key={child?.id} className="nav-item">
                                                                <Link href={`/product-category/${menu?.slug}/${child?.slug}`} aria-label={child?.name}>{child?.name}</Link>
                                                            </li>                                                        
                                                    ))}
                                                    </ul>
                                                );
                                                })}
                                            </div>
                                        </ul>
                                        )}
                                    </li>
                                    ))}
                                    <li className="responsive-hidden">
                                        <ul className="flex-wrap">
                                            <li className={`nav-item has-children ${activeMenuId === 'industrie' ? "active" : ""}`}>
                                                <Link href="/industrie">Industries</Link>
                                                <button className={`drop-toggle ${activeMenuId === "industrie" ? "active" : ""}`} aria-label="toggle menu" onClick={() => toggleMenu("industrie")}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"  width="16" height="16"><path d="M471.1 297.4C483.6 309.9 483.6 330.2 471.1 342.7L279.1 534.7C266.6 547.2 246.3 547.2 233.8 534.7C221.3 522.2 221.3 501.9 233.8 489.4L403.2 320L233.9 150.6C221.4 138.1 221.4 117.8 233.9 105.3C246.4 92.8 266.7 92.8 279.2 105.3L471.2 297.3z" fill="currentColor" /></svg>
                                                </button>
                                                <ul className="sub-menu">
                                                    <div className="d-flex">
                                                        <ul>
                                                            <li className="nav-item">
                                                                <Link href='/analytical-lab' aria-label="Analytical Chemistry">Analytical Chemistry</Link>
                                                            </li>
                                                            <li className="nav-item">
                                                                <Link href='/biotechnology' aria-label="Biotechnology">Biotechnology</Link>
                                                            </li>
                                                            <li className="nav-item">
                                                                <Link href='/botanical' aria-label="Botanical">Botanical</Link>
                                                            </li>
                                                            <li className="nav-item">
                                                                <Link href='/cannabis-oil-extraction' aria-label="Cannabis Oil Extraction">Cannabis Oil Extraction</Link>
                                                            </li>
                                                            <li className="nav-item">
                                                                <Link href="/educational" aria-label="Educational">Educational</Link>
                                                            </li>
                                                            <li className="nav-item">
                                                                <Link href='/environmental-chemistry' aria-label="Environmental Chemistry">Environmental Chemistry</Link>
                                                            </li>
                                                        </ul>
                                                        <ul>
                                                            <li className="nav-item">
                                                                <Link href='/food-beverage-testing' aria-label="Food and Beverage">Food and Beverage</Link>
                                                            </li>
                                                            <li className="nav-item">
                                                                <Link href='/microbiology-lab' aria-label="Microbiology Lab">Microbiology Lab</Link>
                                                            </li>
                                                            <li className="nav-item">
                                                                <Link href='/petroleum' aria-label="Petroleum">Petroleum</Link>
                                                            </li>
                                                            <li className="nav-item">
                                                                <Link href='/pharmaceutical' aria-label="Pharmaceutical">Pharmaceutical</Link>
                                                            </li>
                                                            <li className="nav-item">
                                                                <Link href='/rd-laboratory' aria-label="R&D laboratory">R&D laboratory</Link>
                                                            </li>
                                                            <li className="nav-item">
                                                                <Link href='/product-category/consumables-supplies/chemistry/' aria-label="School & Colleges">School & Colleges</Link>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </ul>
                                            </li>
                                            <li className="nav-item">
                                                <Link href="/alcohols" aria-label="Alcohols">Alcohols</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link href="/about" aria-label="About Dawn Scientific">About Us</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link href="/get-quote" aria-label="Get Quote">Get Quote</Link>
                                            </li>
                                            <li className={`nav-item has-children ${activeMenuId === 'support' ? "active" : ""}`}>
                                                <Link href="/support" rel="noopener noreferrer">Support</Link>
                                                <button className={`drop-toggle ${activeMenuId === "support" ? "active" : ""}`} aria-label="toggle menu" onClick={() => toggleMenu("support")}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="16" height="16"><path d="M471.1 297.4C483.6 309.9 483.6 330.2 471.1 342.7L279.1 534.7C266.6 547.2 246.3 547.2 233.8 534.7C221.3 522.2 221.3 501.9 233.8 489.4L403.2 320L233.9 150.6C221.4 138.1 221.4 117.8 233.9 105.3C246.4 92.8 266.7 92.8 279.2 105.3L471.2 297.3z" fill="currentColor" /></svg>
                                                </button>
                                                <ul className="sub-menu">
                                                    <li className="nav-item">
                                                        <Link href="/literature" aria-label="Literature">Literature</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link href="/faqs" aria-label="FAQ">FAQ's</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link href="/join-us" aria-label="Join Us">Join Us</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link href="/career" aria-label="Career">Career</Link>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="nav-item">
                                                <Link href="/contact" aria-label="Contact">Contact</Link>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                <div className={`long-search ${searchOpen ? "active" : ""}`} ref={searchWrapperRef}>
                                    <form onSubmit={(e) => handleSearch(e)}>
                                        <div className="d-flex w-full">
                                            <div className="form-group">
                                                <input type="text" name="search" placeholder="Type Name, Catalog or CAS Number" value={searchText} onChange={(e) => setSearchText(e.target.value)} onFocus={() => setFocused(true)} />
                                                <button className="close-all" aria-label="Close all" type="button"
                                                    onClick={() => {
                                                        setSearchText("");
                                                        setFocused(false);
                                                        setSearchOpen(false);
                                                    }}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="16" height="16"><path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" fill="currentColor" /></svg> 
                                                </button>
                                            </div>
                                            <button className="btn btn-primary" aria-label="Search">
                                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 513.749 513.749" xmlSpace="preserve" width="14" height="14">
                                                    <g>
                                                        <path d="M504.352,459.061l-99.435-99.477c74.402-99.427,54.115-240.344-45.312-314.746S119.261-9.277,44.859,90.15   S-9.256,330.494,90.171,404.896c79.868,59.766,189.565,59.766,269.434,0l99.477,99.477c12.501,12.501,32.769,12.501,45.269,0   c12.501-12.501,12.501-32.769,0-45.269L504.352,459.061z M225.717,385.696c-88.366,0-160-71.634-160-160s71.634-160,160-160   s160,71.634,160,160C385.623,314.022,314.044,385.602,225.717,385.696z" fill="currentColor" />
                                                    </g>
                                                </svg>
                                            </button>
                                        </div>
                                    </form>
                                    {focused && (
                                        <div className={`search-result-wrapper ${loading ? "search-loading" : null}`}>
                                            <div className={`search-result ${searchText ? "active" : ""}`}>
                                                <div className="row">
                                                    <div className="col-md-10">
                                                        <h4>Find Products by name, product code, or CAS number.</h4>
                                                        <div className="product-wrapper">
                                                            {products.map(pro => (
                                                                <div className="product-list-content" key={pro?.id}>
                                                                    <div className="row">
                                                                        <div className="col-md-5">
                                                                            <h2 className="product_title">
                                                                                <Link href={`/product/${pro?.slug}`}> {pro?.name}</Link>
                                                                            </h2>
                                                                        </div>
                                                                        <div className="col-md-5">
                                                                            <h2 className="product_sku">
                                                                                <span className="badge badge-yellow">{pro?.sku}</span>
                                                                            </h2>
                                                                        </div>
                                                                        <div className="col-md-5">
                                                                            <span className="price">{(pro?.total_vars) ? (pro?.display_range.split("-").map(Number).some(n => n > 0) ? `$${pro?.min_var_price}-$${pro?.max_var_price}` : "Inquiry Now") : `${Number(pro?.sell_price) === 0 ? "Inquiry Now" : `$${pro?.discounted_price}`}`  }</span>
                                                                        </div>
                                                                        <div className="col-md-5">
                                                                            <div className="btn-area">
                                                                                <Link href={`/product/${pro?.slug}`} >
                                                                                    <span className="icon">
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="18" height="18"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor" /><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor" /></svg>
                                                                                    </span>
                                                                                </Link>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        {products?.length>0 &&
                                                            <div className="categories">
                                                                <ul className="flex-wrap">
                                                                    <li>
                                                                        <h4>Categories :</h4>
                                                                    </li>
                                                                    {category?.map((cate) => (
                                                                        <li key={cate?.id}>
                                                                            <Link href={`/product-category/${cate?.slug}`}>{cate?.name}</Link>
                                                                        </li>    
                                                                    ))}
                                                                </ul>
                                                                <ul className="flex-wrap">
                                                                    <li>
                                                                        <h4>Brands :</h4>
                                                                    </li>
                                                                    {brands?.map((brand) => (
                                                                        <li key={brand?.id}>
                                                                            <Link href={`/brand/${brand?.slug}`}>{brand?.name}</Link>
                                                                        </li>    
                                                                    ))}
                                                                </ul>
                                                                <Link href="/product-category" className="btn btn-text m-auto">See More</Link>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <a href="https://technicaldoc.com/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary small">FIND SDS & COA</a>        
                                    {isLoggedIn ?
                                        <div className={`nav-right-link has-children my_account ${accountMenu ? 'open' : ''}`}>
                                            <div className="clickBtn" onClick={() => {
                                                if (navRef.current) {
                                                navRef.current.scrollTo({
                                                    top: 0,
                                                    behavior: "smooth", 
                                                })
                                                }
                                                setAccountMenu(!accountMenu)
                                            }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="18" height="18"><path d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z" fill="currentColor" /></svg>
                                                 My Account 
                                                 {accountMenu ? 
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="arrow" width="14" height="14"><path d="M297.4 169.4C309.9 156.9 330.2 156.9 342.7 169.4L534.7 361.4C547.2 373.9 547.2 394.2 534.7 406.7C522.2 419.2 501.9 419.2 489.4 406.7L320 237.3L150.6 406.6C138.1 419.1 117.8 419.1 105.3 406.6C92.8 394.1 92.8 373.8 105.3 361.3L297.3 169.3z" fill="currentColor" /></svg> :
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="arrow" width="14" height="14"><path d="M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z" fill="currentColor" /></svg>
                                                 }
                                            </div>
                                            <ul className={accountMenu ? "active" : ""} onClick={(e) => e.preventDefault()}>
                                                <li>
                                                    <Link  href="/user/account" data-discover="true" aria-label="User Account">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="15" height="15"><path d="M64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320zM384 416C384 389.1 367.5 366.1 344 356.7L344 184C344 170.7 333.3 160 320 160C306.7 160 296 170.7 296 184L296 356.7C272.5 366.2 256 389.2 256 416C256 451.3 284.7 480 320 480C355.3 480 384 451.3 384 416zM208 240C225.7 240 240 225.7 240 208C240 190.3 225.7 176 208 176C190.3 176 176 190.3 176 208C176 225.7 190.3 240 208 240zM192 320C192 302.3 177.7 288 160 288C142.3 288 128 302.3 128 320C128 337.7 142.3 352 160 352C177.7 352 192 337.7 192 320zM480 352C497.7 352 512 337.7 512 320C512 302.3 497.7 288 480 288C462.3 288 448 302.3 448 320C448 337.7 462.3 352 480 352zM464 208C464 190.3 449.7 176 432 176C414.3 176 400 190.3 400 208C400 225.7 414.3 240 432 240C449.7 240 464 225.7 464 208z" fill="currentColor" /></svg>  
                                                        Dashboard
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link  href="/user/orders" data-discover="true" aria-label="User Orders">
                                                        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" className="mr-2" dataname="Layer 1" viewBox="0 0 24 24" width="15" height="15"><path d="M9,22c0,1.105-.895,2-2,2s-2-.895-2-2,.895-2,2-2,2,.895,2,2Zm8-2c-1.105,0-2,.895-2,2s.895,2,2,2,2-.895,2-2-.895-2-2-2ZM5.419,13l-.941-8h5.591c.087-.699,.262-1.369,.518-2H4.242l-.041-.351c-.178-1.511-1.459-2.649-2.979-2.649H0V2H1.222c.507,0,.934,.38,.993,.884l1.584,13.467c.178,1.511,1.459,2.649,2.979,2.649h13.222v-2H6.778c-.507,0-.934-.38-.993-.884l-.131-1.116H21.835l.363-2H5.419ZM24,6c0,3.309-2.691,6-6,6s-6-2.691-6-6S14.691,0,18,0s6,2.691,6,6Zm-2,0c0-2.206-1.794-4-4-4s-4,1.794-4,4,1.794,4,4,4,4-1.794,4-4Zm-3-3h-2v3.414l2.293,2.293,1.414-1.414-1.707-1.707V3Z" fill="currentColor"></path></svg>                            
                                                        My Order List
                                                    </Link>
                                                </li>
                                                {/*<li>
                                                    <Link href="/user/company">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="15" height="15"><path d="M192 112C183.2 112 176 119.2 176 128L176 512C176 520.8 183.2 528 192 528L272 528L272 448C272 430.3 286.3 416 304 416L336 416C353.7 416 368 430.3 368 448L368 528L448 528C456.8 528 464 520.8 464 512L464 128C464 119.2 456.8 112 448 112L192 112zM128 128C128 92.7 156.7 64 192 64L448 64C483.3 64 512 92.7 512 128L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM224 176C224 167.2 231.2 160 240 160L272 160C280.8 160 288 167.2 288 176L288 208C288 216.8 280.8 224 272 224L240 224C231.2 224 224 216.8 224 208L224 176zM368 160L400 160C408.8 160 416 167.2 416 176L416 208C416 216.8 408.8 224 400 224L368 224C359.2 224 352 216.8 352 208L352 176C352 167.2 359.2 160 368 160zM224 304C224 295.2 231.2 288 240 288L272 288C280.8 288 288 295.2 288 304L288 336C288 344.8 280.8 352 272 352L240 352C231.2 352 224 344.8 224 336L224 304zM368 288L400 288C408.8 288 416 295.2 416 304L416 336C416 344.8 408.8 352 400 352L368 352C359.2 352 352 344.8 352 336L352 304C352 295.2 359.2 288 368 288z" fill="currentColor" /></svg>
                                                        Corporate Account
                                                    </Link>
                                                </li>*/}
                                                <li>
                                                    <Link  href="/user/profile" data-discover="true" aria-label="User Profile">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="15" height="15"><path d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z" fill="currentColor" /></svg>
                                                        Profile
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link  href="/user/addresses" data-discover="true" aria-label="User Address">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="15" height="15"><path d="M352 348.4C416.1 333.9 464 276.5 464 208C464 128.5 399.5 64 320 64C240.5 64 176 128.5 176 208C176 276.5 223.9 333.9 288 348.4L288 544C288 561.7 302.3 576 320 576C337.7 576 352 561.7 352 544L352 348.4zM328 160C297.1 160 272 185.1 272 216C272 229.3 261.3 240 248 240C234.7 240 224 229.3 224 216C224 158.6 270.6 112 328 112C341.3 112 352 122.7 352 136C352 149.3 341.3 160 328 160z" fill="currentColor" /></svg> 
                                                        Addresses
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link  href="/user/wishlist" data-discover="true" aria-label="User Wishlist">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="15" height="15"><path d="M442.9 144C415.6 144 389.9 157.1 373.9 179.2L339.5 226.8C335 233 327.8 236.7 320.1 236.7C312.4 236.7 305.2 233 300.7 226.8L266.3 179.2C250.3 157.1 224.6 144 197.3 144C150.3 144 112.2 182.1 112.2 229.1C112.2 279 144.2 327.5 180.3 371.4C221.4 421.4 271.7 465.4 306.2 491.7C309.4 494.1 314.1 495.9 320.2 495.9C326.3 495.9 331 494.1 334.2 491.7C368.7 465.4 419 421.3 460.1 371.4C496.3 327.5 528.2 279 528.2 229.1C528.2 182.1 490.1 144 443.1 144zM335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1C576 297.7 533.1 358 496.9 401.9C452.8 455.5 399.6 502 363.1 529.8C350.8 539.2 335.6 543.9 320 543.9C304.4 543.9 289.2 539.2 276.9 529.8C240.4 502 187.2 455.5 143.1 402C106.9 358.1 64 297.7 64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1L320 171.8L335 151.1z" fill="currentColor" /></svg>
                                                        Wishlist
                                                    </Link>
                                                </li>
                                                <li>
                                                    <button onClick={() => {
                                                        logout(); 
                                                        setAccountMenu(!accountMenu); 
                                                    }} aria-label="User Logout">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="15" height="15"><path d="M224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L160 96C107 96 64 139 64 192L64 448C64 501 107 544 160 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480C142.3 480 128 465.7 128 448L128 192C128 174.3 142.3 160 160 160L224 160zM566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L438.6 169.3C426.1 156.8 405.8 156.8 393.3 169.3C380.8 181.8 380.8 202.1 393.3 214.6L466.7 288L256 288C238.3 288 224 302.3 224 320C224 337.7 238.3 352 256 352L466.7 352L393.3 425.4C380.8 437.9 380.8 458.2 393.3 470.7C405.8 483.2 426.1 483.2 438.6 470.7L566.6 342.7z" fill="currentColor" /></svg> 
                                                        Logout
                                                    </button>
                                                </li>
                                            </ul>
                                        </div> :
                                        <div className="d-flex gap-15">
                                            <Link href="/login" className="btn btn-primary login_btn w-100" aria-label="Login/Sign Up">Login/Sign up</Link>
                                        </div>
                                    }
                            </nav>
                            <div className="support-links d-flex gap-20 align-center w-auto">
                                
                                {/* <button className="nav-right-link search-button" onClick={onToggleSearch} aria-label="Open search"><i className="fa fa-search"></i></button>         */}
                                <button className="nav-right-link search-button" onClick={() => {
                                    setSearchOpen(!searchOpen)
                                }}
                                aria-label="Open search">
                                    {searchOpen ? 
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="16" height="16"><path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" fill="currentColor" /></svg>  :
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 513.749 513.749" xmlSpace="preserve" width="16" height="16"><g><path d="M504.352,459.061l-99.435-99.477c74.402-99.427,54.115-240.344-45.312-314.746S119.261-9.277,44.859,90.15   S-9.256,330.494,90.171,404.896c79.868,59.766,189.565,59.766,269.434,0l99.477,99.477c12.501,12.501,32.769,12.501,45.269,0   c12.501-12.501,12.501-32.769,0-45.269L504.352,459.061z M225.717,385.696c-88.366,0-160-71.634-160-160s71.634-160,160-160   s160,71.634,160,160C385.623,314.022,314.044,385.602,225.717,385.696z" fill="currentColor"></path></g></svg> 
                                    }
                                </button> 
                                <button className="nav-right-link cart-link  d-flex align-center" onClick={() => handleSideToggle()} aria-label="Open Cart">
                                    <svg className="svg_icon" width="32" height="32" fill="red">
                                        <use xlinkHref="/sprite.svg#cart" />
                                    </svg>
                                    <span className="count">{getTotalItem()}</span>  
                                </button>
                                <button className="navbar-toggler" onClick={() => {
                                    document.documentElement.style.overflow = "hidden"; 
                                    setIsOpen(true)
                                }} aria-label="Open Sidebar">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </button>
                            </div>
                        </div>
                    </div>    
                </div>       
            </header>
            {(isOpen || isOverlay) &&
                <div className={`body-overlay active`}
                    onClick={() => {
                        if (isCartOpen) toggleCart();
                        document.documentElement.style.overflow = "auto";
                        setIsOpen(false);
                    }}>
                </div>
            }
        </>
    )
}

export default Header;