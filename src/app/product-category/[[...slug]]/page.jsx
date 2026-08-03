"use client";

import { useEffect, useState, useContext, useMemo } from 'react'
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams, useParams, } from "next/navigation";
import { WishListContext } from '@/context/WishListContext';
import { useLoader } from '@/context/LoaderContext';
import { CartContext } from '@/context/cart';
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { AuthContext } from '@/context/AuthContext';

export default function Page() {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const [loadSize, setLoadSize] = useState(false)
    const { toggleWishlist, wishlistLoadingIds, wishList, fetchWishList } = useContext(WishListContext);
    const { getRecentViewed } = useContext(CartContext);
    const { user, logout, isLoggedIn } = useContext(AuthContext);
    const pathname = usePathname();

    const router = useRouter();
    const [range, setRange] = useState([0, 1]); // min, max
    const [sizes, setSizes] = useState([])
    const params = useParams();

    const [category, subCategory, childrenCat, child] = params?.slug;

    //let { category, subCategory, childrenCat, child } = useParams()
    const slug = child || childrenCat || subCategory || category || "";
    const [categories, setCategory] = useState([]);
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [readMore, setReadMore] = useState(false);
    const [filter, setFilter] = useState(false);
    const [catPro, setCatePro] = useState([]);
    const [meta, setMeta] = useState({});
    const [recent, setRecent] = useState([]);
    const [initPrice, setinitPrice] = useState({
        min: 0,
        max: 1
    });
    const [sort, setSort] = useState("");

    const searchParams = useSearchParams();
    const filterBrand = searchParams.get('brand');
    const alphabet = searchParams.get('alphabet');
    const page = searchParams.get("page");
    const [openToggle, setOpenToggle] = useState(null);
    const [catDetails, setCatDetails] = useState({});


    useEffect(() => {
        setSort("");
        setReadMore(false);
    }, [pathname]);

    const appliedFilters = {
        brand: searchParams.get("brand"),
        price_min: searchParams.get("price_min"),
        price_max: searchParams.get("price_max"),
    };
    const clearFilter = (filterKey) => {
        const params = new URLSearchParams(searchParams);
        params.delete(filterKey);
        if (filterKey === "price_min" || filterKey === "price_max") {
            params.delete("price_min");
            params.delete("price_max");
        }
        router.push(`?${params.toString()}`);
    };

    const clearAllFilters = () => {
        router.push("");
    };
    const toggleCat = (id, parent = null, isParent = false, children = []) => {

        setOpenToggle((prev) => {
            if (isParent) {
                if (prev === id) {
                    return null;
                }

                if (children.includes(prev)) {
                    return null;
                }
                return id;
            } else {
                if (prev === id) {
                    return parent || null;
                }

                return id;
            }
        });
    };

    const { startLoading, stopLoading } = useLoader();

    useEffect(() => {
        startLoading();
        const fetchCategory = async () => {
            try {
                const response = await fetch(`${baseUrl}categories`);
                if (!response.ok) {
                    throw new Error("Category Fetch failed")
                }
                const res = await response.json();
                setCategory(res.data);
                stopLoading();
            } catch (err) {
                console.error(err)
            }
        }
        fetchCategory();
    },
        []);

    useEffect(() => {
        const getCatDetails = async () => {
            startLoading();
            try {
                const response = await fetch(`${baseUrl}categories/${slug}`);
                if (!response.ok) {
                    throw new Error("Category Details Fetch Failed !");
                }

                let result = await response.json();
                setCatDetails(result.data);
            } catch (err) {
                console.error(err)
            } finally {
                stopLoading();
            }
        }

        if (slug) {
            getCatDetails();
        }
    }, [slug])


    useEffect(() => {
        if (!categories || categories.length === 0) return;

        const fetchProducts = async () => {
            setFilter(false);
            document.documentElement.style.overflow = "auto";
            startLoading();
            try {
                const params = new URLSearchParams();
                const minPrice = searchParams.get("price_min");
                const maxPrice = searchParams.get("price_max");
                const sort_by = searchParams.get('sort_by');
                const alphabet = searchParams.get('alphabet');
                const sizeParams = searchParams
                    .getAll("size[]")
                    .forEach(size => params.append("size[]", size));
                if (slug) params.set("category", slug);
                if (filterBrand) params.set("brand", filterBrand);
                if (alphabet) params.set("alphabet", alphabet);
                if (minPrice && maxPrice) {
                    params.set("price_min", minPrice);
                    params.set("price_max", maxPrice);
                }
                if(sizeParams){params.set("size", sizeParams)}
                if (sort_by) { params.set("sort_by", sort_by) }
                if (page) { params.set("page", page) }
                if (!slug) { params.set("size", 20) }
                const query = params
                            .toString()
                            .replace(/%5B/g, "[")
                            .replace(/%5D/g, "]");
                const url = `${baseUrl}products?${query}`;
                if(slug){
                    const response = await fetch(url, {
                        method: 'GET',
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem("token")}`,
                            "Content-Type": "application/json",
                        },
                    });
                    if (!response.ok) throw new Error("Failed to fetch product data");
                    const data = await response.json();

                    let minP = Infinity,
                        maxP = -Infinity,
                        brands = [],
                        brandSet = new Set();

                    await fetchWishList();
                    setProducts(data.data);
                    setBrands(data.brands);
                    setMeta(data.meta);
                    setinitPrice({ min: data?.meta?.min_price, max: data?.meta?.max_price });
                    setRange([searchParams?.get("price_min") || data?.meta?.min_price, searchParams?.get("price_max") || data?.meta?.max_price])
                }
    
                const [rec, childrenList] = await Promise.all([
                    getRecentViewed(),
                    findCategoryChildren(categories, slug)
                ]);
                if (rec) {
                    setRecent(rec)
                }
                const parentCats = categories?.map((cat) => {
                    return {id : cat?.id, name : cat?.name, slug : cat?.slug, direct_products_count : cat?.direct_products_count, image_url : cat?.image_url}
                } )
                setCatePro(childrenList || parentCats || []);
            } catch (err) {
                console.error(err);
            } finally {
                stopLoading();
            }
        };

        fetchProducts();
    }, [slug, filterBrand, alphabet, searchParams.toString(), categories.length, page]);


    const [searchText, setSearchText] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        router.push(`/search?s=${searchText}`, { state: { value: searchText } });
    }

    function checkWishlist(id) {
        return wishList.some(item => item.id === id);
    }

    function findCategoryChildren(categories, slug) {
        if (!slug) {
            return categories;
        }

        for (const cat of categories) {
            if (cat.slug === slug) {
                return cat.children_recursive || [];
            }

            // search inside children_recursive 
            if (cat.children_recursive && cat.children_recursive.length > 0) {
                const found = findCategoryChildren(cat.children_recursive, slug);
                if (found) return found;
            }
        }
        return null;
    }

    const updateQuery = (newParams) => {
        const params = new URLSearchParams(searchParams);
        Object.entries(newParams).forEach(([key, value]) => {
            if (value === null || value === undefined || value === "") {
                params.delete(key);
            } else {
                params.set(key, value);
            }
        });
        router.push(`?${params.toString()}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const applyPriceFilter = () => {
        updateQuery({ price_min: range[0], price_max: range[1], page:null });
    };

    const applyBrand = (brand) => {
        updateQuery({ brand });
    };

    const applyAlphabet = (alphabet) => {
        updateQuery({ alphabet });
    };

    const handlePage = (page) => {
        updateQuery({ page });
    };

    const handleSort = (sort_by) => {
        setSort(sort_by);
        updateQuery({ sort_by });
    };

    const handleSizes = (e) => {
        const val = e.target.value
        let updated = [];
        setSizes(prev => {
            if (prev.includes(val)) {
                updated = prev?.filter(p => p != val)
            }
            else {
                updated = [...prev, val]
            }
            return updated;
        }
        );
    }

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        params.delete("size[]");

        if (searchParams.get("s")) params.set("s", searchParams.get("s"));
        if (searchParams.get("price_min")) {
            params.set("price_min", searchParams.get("price_min"));
            params.set("price_max", searchParams.get("price_max"));
        }
        if (searchParams.get("page")) params.set("page", searchParams.get("page"));
        if (searchParams.get("brand")) params.set("brand", searchParams.get("brand"));
        if (sizes?.length > 0) {
            // 👇 array style
            sizes.forEach(size => {
                params.append("size[]", size);
            });
        }
        router.replace(`${pathname}?${params.toString()}`, {
            scroll: false,
        });;
    }, [sizes]);

//const [breadcrumb, setBreadcrumb] = useState([]);

const breadcrumb = useMemo(() => {
    if (!categories?.length) return [];

    // Category level
    const cat = categories.find(c => c.slug === category);
    if (cat) {
        const path = [{ name: cat.name, slug: cat.slug }];

        if (subCategory) {
            const sub = cat.children_recursive?.find(
                sc => sc.slug === subCategory
            );

            if (sub) {
                path.push({
                    name: sub.name,
                    slug: `${cat.slug}/${sub.slug}`,
                });

                if (childrenCat) {
                    const child = sub.children_recursive?.find(
                        cc => cc.slug === childrenCat
                    );

                    if (child) {
                        path.push({
                            name: child.name,
                            slug: `${cat.slug}/${sub.slug}/${child.slug}`,
                        });
                    }
                }
            }
        }

        return path;
    }
    // Search if URL starts from subcategory
    for (const parent of categories) {
        const sub = parent.children_recursive?.find(
            sc => sc.slug === category
        );
        if (sub) {
            return [
                { name: parent.name, slug: parent.slug },
                {
                    name: sub.name,
                    slug: `${parent.slug}/${sub.slug}`,
                },
            ];
        }
    }

    // Search if URL starts from child category
    for (const parent of categories) {
        for (const sub of parent.children_recursive || []) {
            const child = sub.children_recursive?.find(
                cc => cc.slug === category
            );

            if (child) {
                return [
                    { name: parent.name, slug: parent.slug },
                    {
                        name: sub.name,
                        slug: `${parent.slug}/${sub.slug}`,
                    },
                    {
                        name: child.name,
                        slug: `${parent.slug}/${sub.slug}/${child.slug}`,
                    },
                ];
            }
        }
    }
    return [];
}, [categories, category, subCategory, childrenCat]);

return (
        <>
            <section className="page-title mobile_cate">
                <div className="container">
                    <div className="title-wrapper">
                        <div className="title">
                            <button className="sort-icon" onClick={() => {
                                setFilter(true);
                                document.documentElement.style.overflow = "hidden";
                            }
                            } aria-label="Toggle Filter">
                                <span className="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="list" width="18" height="18"><path d="M104 112C90.7 112 80 122.7 80 136L80 184C80 197.3 90.7 208 104 208L152 208C165.3 208 176 197.3 176 184L176 136C176 122.7 165.3 112 152 112L104 112zM256 128C238.3 128 224 142.3 224 160C224 177.7 238.3 192 256 192L544 192C561.7 192 576 177.7 576 160C576 142.3 561.7 128 544 128L256 128zM256 288C238.3 288 224 302.3 224 320C224 337.7 238.3 352 256 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L256 288zM256 448C238.3 448 224 462.3 224 480C224 497.7 238.3 512 256 512L544 512C561.7 512 576 497.7 576 480C576 462.3 561.7 448 544 448L256 448zM80 296L80 344C80 357.3 90.7 368 104 368L152 368C165.3 368 176 357.3 176 344L176 296C176 282.7 165.3 272 152 272L104 272C90.7 272 80 282.7 80 296zM104 432C90.7 432 80 442.7 80 456L80 504C80 517.3 90.7 528 104 528L152 528C165.3 528 176 517.3 176 504L176 456C176 442.7 165.3 432 152 432L104 432z" fill="currentColor" /></svg>
                                </span>
                                More Products
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="16" height="16"><path d="M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z" fill="currentColor" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="archive-products">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <div className={`mobile_filter ${filter ? "active" : ""}`}>
                                <div className='m_filter_title'>
                                    <h2>Search by Links</h2>
                                    <button onClick={() => {
                                        setFilter(false);
                                        document.documentElement.style.overflow = "auto";
                                    }} aria-label="Close">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="18" height="18"><path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" fill="currentColor" /></svg> 
                                    </button>
                                </div>
                                {catPro?.length < 1 &&
                                    <>
                                        <div className="widget">
                                            <h4>Brands</h4>
                                            <ul className="brand-wrapper">
                                                {brands.map((brand) => (
                                                    <li key={brand.id}><button onClick={() => applyBrand(brand.slug)} aria-label="Filter Brand">{brand.name}</button></li>
                                                ))}
                                            </ul>
                                        </div>
                                        {meta?.uniqueSizes?.length > 0 &&
                                            <div className="widget size-filter">
                                                <h4>Size</h4>
                                                <div className={`grid-wrapper ${loadSize ? "active" : ""}`}>
                                                    {meta?.uniqueSizes?.map((size, index) => (
                                                            <div className="form-check" key={size?.slug}>
                                                                <input type="checkbox" value={size?.slug} id={size?.slug} checked={sizes?.includes(size?.slug) ? true : false} onChange={handleSizes} className="form-check-input"  />
                                                                <label htmlFor={size?.slug}>{size?.name}</label>
                                                            </div>
                                                    ))}
                                                </div>
                                                <button className="load-btn" onClick={() => { setLoadSize((prev) => !prev); window.scrollTo({ top: 0, left: 0, behavior: "smooth" }) }}>{loadSize ? "Read less" : "Load More"}</button>
                                            </div>
                                        }
                                    </>
                                }
                                <div className="category-links widget">
                                    <h4>Category</h4>
                                    <ul className="shop-category-list">
                                        {categories.length && categories.map(cat => (
                                            <li className={`${(cat.children_recursive.length > 0) ? 'has-children' : ''} ${((openToggle === cat.id)) ? 'active' : ''}`} key={cat.id}>
                                                <div className="list-text">
                                                    <Link href={`/product-category/${cat.slug}`} className={`${((category === cat.slug)) ? 'open' : ''} ${pathname == `/product-category/${cat?.slug}` && "active"}`} >
                                                        {cat.name}
                                                        {/* <span>{(cat.products_count > 0) ? `(${cat.products_count})` : ''}</span> */}
                                                    </Link>
                                                    {cat.children_recursive.length > 0 ?
                                                        <button className={`drop-toggle ${openToggle === cat.id ? "active" : ""}`} onClick={() => toggleCat(cat.id, null, true, cat.children_recursive.map(c => c.id))} aria-label="Dropdown Toggle">
                                                            {openToggle === cat.id ? 
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="12" height="12"><path d="M297.4 169.4C309.9 156.9 330.2 156.9 342.7 169.4L534.7 361.4C547.2 373.9 547.2 394.2 534.7 406.7C522.2 419.2 501.9 419.2 489.4 406.7L320 237.3L150.6 406.6C138.1 419.1 117.8 419.1 105.3 406.6C92.8 394.1 92.8 373.8 105.3 361.3L297.3 169.3z" fill="currentColor" /></svg> :
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="12" height="12"><path d="M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z" fill="currentColor"></path></svg>
                                                            }
                                                        </button> : ""
                                                    }
                                                </div>
                                                {cat.children_recursive && cat.children_recursive.length > 0 && (
                                                    <ul className="sub-list">
                                                        {cat.children_recursive.map((child) => (
                                                            (child.products_count > 0 &&
                                                                <li className={`${(child.children_recursive.length > 0) ? 'has-children' : ''} ${((openToggle === child.id)) ? 'active' : ''}`} key={child.id}>
                                                                    <div className="list-text">
                                                                        <Link href={`/product-category/${cat.slug}/${child.slug}`} className={`${((subCategory === child.slug)) ? 'open' : ''} ${pathname === `/product-category/${cat?.slug}/${child.slug}` ? "active" : ""}`}>
                                                                            {child.name}
                                                                            <span>{(child.products_count > 0) ? `(${child.products_count})` : ''}</span>
                                                                        </Link>
                                                                        {child.children_recursive.length ?
                                                                            <button className={`drop-toggle ${openToggle === child.id ? "active" : ""}`} onClick={() => toggleCat(child.id, cat.id)}>
                                                                                {openToggle === child.id ? 
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="12" height="12"><path d="M297.4 169.4C309.9 156.9 330.2 156.9 342.7 169.4L534.7 361.4C547.2 373.9 547.2 394.2 534.7 406.7C522.2 419.2 501.9 419.2 489.4 406.7L320 237.3L150.6 406.6C138.1 419.1 117.8 419.1 105.3 406.6C92.8 394.1 92.8 373.8 105.3 361.3L297.3 169.3z" fill="currentColor" /></svg> :
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="12" height="12"><path d="M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z" fill="currentColor"></path></svg>
                                                                                }
                                                                            </button> : ""
                                                                        }
                                                                    </div>
                                                                    {child.children_recursive && child.children_recursive.length > 0 && (
                                                                        <ul className="sub-list">
                                                                            {child.children_recursive.map((value) => (
                                                                                (value.products_count ?
                                                                                    <li key={value.id} className={`${(value.children_recursive.length > 0) ? 'has-children' : ''} ${((openToggle === value.id)) ? 'active' : ''} `}>
                                                                                        <div className="list-text">
                                                                                            <Link href={`/product-category/${cat.slug}/${child.slug}/${value.slug}`} className={`${(childrenCat === value.slug) ? 'open' : ''} ${pathname === `/product-category/${cat.slug}/${child.slug}/${value.slug}` && "active"}`}>
                                                                                                {value.name}
                                                                                                <span>{(value.products_count > 0) ? `(${value.products_count})` : ''}</span>
                                                                                            </Link>
                                                                                            {value.children_recursive.length ?
                                                                                                <button className={`drop-toggle ${openToggle === value.id ? "active" : ""}`} onClick={() => toggleCat(value.id, child.id)}>
                                                                                                    {openToggle === value.id ? 
                                                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="12" height="12"><path d="M297.4 169.4C309.9 156.9 330.2 156.9 342.7 169.4L534.7 361.4C547.2 373.9 547.2 394.2 534.7 406.7C522.2 419.2 501.9 419.2 489.4 406.7L320 237.3L150.6 406.6C138.1 419.1 117.8 419.1 105.3 406.6C92.8 394.1 92.8 373.8 105.3 361.3L297.3 169.3z" fill="currentColor" /></svg> :
                                                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="12" height="12"><path d="M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z" fill="currentColor"></path></svg>
                                                                                                    }
                                                                                                </button> : ""
                                                                                            }
                                                                                        </div>
                                                                                        {value.children_recursive && value.children_recursive.length > 0 && (
                                                                                            <ul className="sub-list">
                                                                                                {value.children_recursive.map((final) => (
                                                                                                    (final.products_count ?
                                                                                                        <Link href={`/product-category/${cat.slug}/${child.slug}/${value.slug}/${final.slug}`} key={final.id} className={`${pathname === `/product-category/${cat.slug}/${child.slug}/${value.slug}/${final.slug}` && "active"}`} >
                                                                                                            {final.name}
                                                                                                            <span>{(final.products_count > 0) ? `(${final.products_count})` : ''}</span>
                                                                                                        </Link> :
                                                                                                        ""
                                                                                                    )
                                                                                                ))}
                                                                                            </ul>
                                                                                        )}

                                                                                    </li> : ""
                                                                                )

                                                                            ))}
                                                                        </ul>
                                                                    )}
                                                                </li>
                                                            )


                                                        ))}
                                                    </ul>
                                                )}

                                            </li>
                                        ))}

                                    </ul>
                                </div>

                                {(catPro.length < 1) ?
                                    <>
                                        <div className="widget">
                                            <h4>Price</h4>
                                            <Slider
                                                range
                                                min={initPrice?.min}
                                                max={initPrice?.max}
                                                allowCross={true} // prevents handles from crossing
                                                value={range}
                                                onChange={(val) => { setRange(val) }}
                                                trackStyle={[{ backgroundColor: "#fab214" }]} // track color
                                                handleRender={(node, props) => {
                                                    return (
                                                        <div
                                                            style={{
                                                                position: "relative",
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position: "absolute",
                                                                    bottom: "12px",
                                                                    left: ((props?.value / initPrice?.max) * 100).toFixed(2) + "%",
                                                                    transform: "translateX(-50%)",
                                                                    background: "#fab214",
                                                                    color: "#fff",
                                                                    padding: "2px 6px",
                                                                    borderRadius: "4px",
                                                                    fontSize: "9px",
                                                                    whiteSpace: "nowrap",
                                                                    pointerEvents: "none",
                                                                }}
                                                            >
                                                                ${props.value}
                                                            </div>
                                                            {node}
                                                        </div>
                                                    )
                                                }}
                                                handleStyle={[
                                                    { borderColor: "#fab214", height: 20, width: 20 }, // left handle
                                                    { borderColor: "#fab214", height: 20, width: 20 }  // right handle
                                                ]}
                                            />
                                            <div className="range-desc">
                                                <h5 className="range-values"> ${initPrice?.min} - ${initPrice?.max}</h5>
                                                <button onClick={() => applyPriceFilter()} className="btn btn-primary" aria-label="Price Filter">Filter</button>
                                            </div>
                                        </div>
                                    </> : ''
                                }

                                {(recent && recent.length > 0) ?
                                    <div className="widget">
                                        <h4>Recently Viewed</h4>
                                        <ul className="brand-wrapper">
                                            {recent.map((rec) => (
                                                <li key={rec?.id}><Link href={`/product/${rec?.slug}`}>{rec?.name}</Link></li>
                                            ))}
                                        </ul>
                                    </div> :
                                    ""
                                }
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="widget">
                                <div className="sorting-wrapper">
                                    <div className="text">
                                        Sort By:
                                        <select name="sort" value={sort} onChange={(e) => handleSort(e.target.value)}>
                                            <option value="">Default Sorting</option>
                                            <option value="price_low_high">Price : Low To High</option>
                                            <option value="price_high_low">Price : High To Low</option>
                                            <option value="a_to_z">Name : A To Z</option>
                                            <option value="z_to_a">Name : Z To A</option>
                                        </select>

                                        {(meta && catPro.length < 1) ?
                                            <span>Showing {(20 * (meta?.current_page - 1)) + 1}-{products?.length + (20 * (meta?.current_page - 1))} of {meta?.total} Results</span> : ''
                                        }
                                    </div>
                                    <div className="applied-filters">
                                        {appliedFilters.brand && (
                                            <span className="filter-tag">
                                                <span className="badge badge-info"><b>Brand</b> : {appliedFilters.brand}</span>
                                                <button onClick={() => clearFilter("brand")} className="remove-item" aria-label="Clear Filter">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="12" height="12"><path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" fill="currentColor" /></svg> 
                                                </button>
                                            </span>
                                        )}

                                        {appliedFilters.price_min && appliedFilters.price_max && (
                                            <span className="filter-tag">
                                                <span className="badge badge-success"><b>Price : </b>${appliedFilters.price_min} - ${appliedFilters.price_max}</span>
                                                <button onClick={() => clearFilter("price_min")} className="remove-item" aria-label="Remove Filter">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="12" height="12"><path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" fill="currentColor" /></svg> 
                                                </button>
                                            </span>
                                        )}

                                        {(appliedFilters.brand || appliedFilters.price_min) && (
                                            <button className="badge badge-danger" onClick={clearAllFilters} aria-label="Remove Filter">
                                                Clear All
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {catDetails?.description &&
                                <div className="widget collapse">
                                    <div className="details-wrapper">

                                        <div className="text">
                                            {catDetails?.description &&
                                                <>
                                                    <div className={`details ${readMore ? 'active' : ''}`}>
                                                        <p dangerouslySetInnerHTML={{ __html: catDetails?.description }}></p>
                                                    </div>
                                                    <button className="btn-collapse site-title" onClick={() => {
                                                        if (readMore) window.scrollTo({ top: 100, left: 0, behavior: "smooth" });
                                                        setReadMore(!readMore)
                                                    }} aria-label="Toggle Read More">
                                                        Read {readMore ? 'Less' : 'More'}
                                                    </button>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            }
                            {catPro.length == 0 && products.length > 0 &&
                                (
                                    <div className="widget">
                                        <div className="alphabet-area">
                                            <button onClick={() => applyAlphabet('A')} className={`${alphabet === 'A' ? "active" : ""}`}>A</button>
                                            <button onClick={() => applyAlphabet('B')} className={`${alphabet === 'B' ? "active" : ""}`}>B</button>
                                            <button onClick={() => applyAlphabet('C')} className={`${alphabet === 'C' ? "active" : ""}`}>C</button>
                                            <button onClick={() => applyAlphabet('D')} className={`${alphabet === 'D' ? "active" : ""}`}>D</button>
                                            <button onClick={() => applyAlphabet('E')} className={`${alphabet === 'E' ? "active" : ""}`}>E</button>
                                            <button onClick={() => applyAlphabet('F')} className={`${alphabet === 'F' ? "active" : ""}`}>F</button>
                                            <button onClick={() => applyAlphabet('G')} className={`${alphabet === 'G' ? "active" : ""}`}>G</button>
                                            <button onClick={() => applyAlphabet('H')} className={`${alphabet === 'H' ? "active" : ""}`}>H</button>
                                            <button onClick={() => applyAlphabet('I')} className={`${alphabet === 'I' ? "active" : ""}`}>I</button>
                                            <button onClick={() => applyAlphabet('J')} className={`${alphabet === 'J' ? "active" : ""}`}>J</button>
                                            <button onClick={() => applyAlphabet('K')} className={`${alphabet === 'K' ? "active" : ""}`}>K</button>
                                            <button onClick={() => applyAlphabet('L')} className={`${alphabet === 'L' ? "active" : ""}`}>L</button>
                                            <button onClick={() => applyAlphabet('M')} className={`${alphabet === 'M' ? "active" : ""}`}>M</button>
                                            <button onClick={() => applyAlphabet('N')} className={`${alphabet === 'N' ? "active" : ""}`}>N</button>
                                            <button onClick={() => applyAlphabet('O')} className={`${alphabet === 'O' ? "active" : ""}`}>O</button>
                                            <button onClick={() => applyAlphabet('P')} className={`${alphabet === 'P' ? "active" : ""}`}>P</button>
                                            <button onClick={() => applyAlphabet('Q')} className={`${alphabet === 'Q' ? "active" : ""}`}>Q</button>
                                            <button onClick={() => applyAlphabet('R')} className={`${alphabet === 'R' ? "active" : ""}`}>R</button>
                                            <button onClick={() => applyAlphabet('S')} className={`${alphabet === 'S' ? "active" : ""}`}>S</button>
                                            <button onClick={() => applyAlphabet('T')} className={`${alphabet === 'T' ? "active" : ""}`}>T</button>
                                            <button onClick={() => applyAlphabet('U')} className={`${alphabet === 'U' ? "active" : ""}`}>U</button>
                                            <button onClick={() => applyAlphabet('V')} className={`${alphabet === 'V' ? "active" : ""}`}>V</button>
                                            <button onClick={() => applyAlphabet('W')} className={`${alphabet === 'W' ? "active" : ""}`}>W</button>
                                            <button onClick={() => applyAlphabet('X')} className={`${alphabet === 'X' ? "active" : ""}`}>X</button>
                                            <button onClick={() => applyAlphabet('Y')} className={`${alphabet === 'Y' ? "active" : ""}`}>Y</button>
                                            <button onClick={() => applyAlphabet('Z')} className={`${alphabet === 'Z' ? "active" : ""}`}>Z</button>
                                        </div>
                                    </div>
                                )
                            }
                            
                            
                            <div className="widget">
                                <h4><Link href="/">Home</Link>
                                    {breadcrumb.map((b, i) => (
                                        <span key={i}>
                                            {" / "}
                                            <Link href={`/product-category/${b.slug}`}>{b.name}</Link>
                                        </span>
                                    ))}
                                </h4>
                                {(catPro && catPro.length > 0 && !filterBrand) ?
                                    (
                                        <div className="row">
                                            {catPro.map(cats => (
                                                (cats?.products_count > 0 &&
                                                    <div className="col-md-25" key={cats?.id}>
                                                        <Link href={`/product-category/${cats.slug}`} aria-label={cats?.name} className="category-item">
                                                            <div className="img-container">
                                                                <img src={cats.image_url ? cats.image_url : "/assets/images/Placeholder_logo.webp"} alt="" loading="lazy" />
                                                                <div className="category-action-wrap">
                                                                    <div className="category-action">
                                                                        <span className="icon">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="18" height="18"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor" /><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor" /></svg>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="content">
                                                                <h2 aria-label={cats?.name}>{cats.name}</h2>
                                                                <p>{cats?.products_count} Products</p>
                                                            </div>
                                                        </Link>
                                                        
                                                    </div>
                                                )
                                            ))}
                                        </div>
                                    ) :
                                    (products && products.length > 0) && (
                                        <>

                                            <div className="product-wrapper">
                                                {products.map(pro => (
                                                    <div className="product-list-content" key={pro?.id}>
                                                        <div className="row">
                                                            <div className="col-md-2">
                                                                <Link href={`/product/${pro?.slug}`} className="product_sku text-center" aria-label={pro?.name}>
                                                                    <span className="badge badge-yellow">{pro?.sku}</span>
                                                                </Link>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <h2 className="product_title">
                                                                    <Link href={`/product/${pro?.slug}`}> {pro?.name}</Link>
                                                                </h2>
                                                                {pro?.brands.length > 0 &&
                                                                    <h2 className="brand_name">
                                                                        <Link href={`/brand/${pro?.brands[0].slug}`}>{pro?.brands[0].name}</Link>
                                                                    </h2>
                                                                }
                                                            </div>
                                                            <div className="col-md-25 text-center">
                                                                <Link href={`/product/${pro?.slug}`}>
                                                                    {(pro?.variations.length > 1) ?
                                                                        <>
                                                                            {(isLoggedIn && pro?.variations[0].price != pro?.variations[pro?.variations.length - 1].price) ?
                                                                                <>
                                                                                    {(pro?.variations[pro?.variations.length - 1].discounted_price > 0 && pro?.variations[pro?.variations.length - 1]?.stock > 0) ?
                                                                                        <>
                                                                                            <del>${pro?.variations.map(v => Number(v["sell_price"])).filter(price => price > 0).reduce((pre, next) => Math.min(pre, next), Infinity)} - ${pro?.variations.map(v => Number(v["price"])).filter(price => price > 0).reduce((pre, next) => Math.max(pre, next), -Infinity)}</del>
                                                                                            <p className="price">${pro?.variations.map(v => Number(v["discounted_price"])).filter(price => price > 0).reduce((pre, next) => Math.min(pre, next), Infinity)} - ${pro?.variations.map(v => Number(v["discounted_price"])).filter(price => price > 0).reduce((pre, next) => Math.max(pre, next), -Infinity)}</p>
                                                                                        </> : <p className="price">Inquiry Now</p>
                                                                                    }

                                                                                </> :
                                                                                <>
                                                                                    <p>
                                                                                        <span className="price">
                                                                                            {(pro?.variations[pro?.variations.length - 1].discounted_price > 0 && pro?.variations[pro?.variations.length - 1]?.stock > 0) ?
                                                                                                `$${pro?.variations.map(v => Number(v["discounted_price"])).filter(price => price > 0).reduce((pre, next) => Math.min(pre, next), Infinity)} - $${pro?.variations.map(v => Number(v["discounted_price"])).filter(price => price > 0).reduce((pre, next) => Math.max(pre, next), -Infinity)}` : 'Inquiry Now'
                                                                                            }
                                                                                        </span>
                                                                                    </p>

                                                                                </>
                                                                            }
                                                                        </> :
                                                                        <>
                                                                            {(isLoggedIn && pro?.price != pro?.discounted_price) ?
                                                                                <>
                                                                                    <del>${pro?.price}</del>
                                                                                    <span className="price"> ${pro?.discounted_price}</span>
                                                                                </> :
                                                                                <span className="price">{pro?.price > 0 ? '$' + pro?.price : 'Inquiry Now'}</span>
                                                                            }
                                                                        </>
                                                                    }
                                                                </Link>
                                                                
                                                            </div>
                                                            <div className="col-md-15">
                                                                <div className="btn-area">
                                                                    <Link href={`/product/${pro?.slug}`} >
                                                                        <span className="icon">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="18" height="18"><path d="M320 144C254.8 144 201.2 173.6 160.1 211.7C121.6 247.5 95 290 81.4 320C95 350 121.6 392.5 160.1 428.3C201.2 466.4 254.8 496 320 496C385.2 496 438.8 466.4 479.9 428.3C518.4 392.5 545 350 558.6 320C545 290 518.4 247.5 479.9 211.7C438.8 173.6 385.2 144 320 144zM127.4 176.6C174.5 132.8 239.2 96 320 96C400.8 96 465.5 132.8 512.6 176.6C559.4 220.1 590.7 272 605.6 307.7C608.9 315.6 608.9 324.4 605.6 332.3C590.7 368 559.4 420 512.6 463.4C465.5 507.1 400.8 544 320 544C239.2 544 174.5 507.2 127.4 463.4C80.6 419.9 49.3 368 34.4 332.3C31.1 324.4 31.1 315.6 34.4 307.7C49.3 272 80.6 220 127.4 176.6zM320 400C364.2 400 400 364.2 400 320C400 290.4 383.9 264.5 360 250.7C358.6 310.4 310.4 358.6 250.7 360C264.5 383.9 290.4 400 320 400zM240.4 311.6C242.9 311.9 245.4 312 248 312C283.3 312 312 283.3 312 248C312 245.4 311.8 242.9 311.6 240.4C274.2 244.3 244.4 274.1 240.5 311.5zM286 196.6C296.8 193.6 308.2 192.1 319.9 192.1C328.7 192.1 337.4 193 345.7 194.7C346 194.8 346.2 194.8 346.5 194.9C404.4 207.1 447.9 258.6 447.9 320.1C447.9 390.8 390.6 448.1 319.9 448.1C258.3 448.1 206.9 404.6 194.7 346.7C192.9 338.1 191.9 329.2 191.9 320.1C191.9 309.1 193.3 298.3 195.9 288.1C196.1 287.4 196.2 286.8 196.4 286.2C208.3 242.8 242.5 208.6 285.9 196.7z" fill="currentColor" /></svg>
                                                                        </span>
                                                                    </Link>
                                                                    <button
                                                                        onClick={() => toggleWishlist(pro?.id)}
                                                                        className={`${checkWishlist(pro?.id) ? "active" : ""}`}
                                                                        disabled={wishlistLoadingIds.includes(pro?.id)}
                                                                        aria-label="Add To Wishlist">
                                                                            <span className="icon">
                                                                                {wishlistLoadingIds.includes(pro?.id) ? (
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="loading" width="18" height="18"><path d="M272 112C272 85.5 293.5 64 320 64C346.5 64 368 85.5 368 112C368 138.5 346.5 160 320 160C293.5 160 272 138.5 272 112zM272 528C272 501.5 293.5 480 320 480C346.5 480 368 501.5 368 528C368 554.5 346.5 576 320 576C293.5 576 272 554.5 272 528zM112 272C138.5 272 160 293.5 160 320C160 346.5 138.5 368 112 368C85.5 368 64 346.5 64 320C64 293.5 85.5 272 112 272zM480 320C480 293.5 501.5 272 528 272C554.5 272 576 293.5 576 320C576 346.5 554.5 368 528 368C501.5 368 480 346.5 480 320zM139 433.1C157.8 414.3 188.1 414.3 206.9 433.1C225.7 451.9 225.7 482.2 206.9 501C188.1 519.8 157.8 519.8 139 501C120.2 482.2 120.2 451.9 139 433.1zM139 139C157.8 120.2 188.1 120.2 206.9 139C225.7 157.8 225.7 188.1 206.9 206.9C188.1 225.7 157.8 225.7 139 206.9C120.2 188.1 120.2 157.8 139 139zM501 433.1C519.8 451.9 519.8 482.2 501 501C482.2 519.8 451.9 519.8 433.1 501C414.3 482.2 414.3 451.9 433.1 433.1C451.9 414.3 482.2 414.3 501 433.1z" fill="currentColor" /></svg>
                                                                                ) : (
                                                                                    checkWishlist(pro?.id) ?
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="18" height="18"><path d="M305 151.1L320 171.8L335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1L576 231.7C576 343.9 436.1 474.2 363.1 529.9C350.7 539.3 335.5 544 320 544C304.5 544 289.2 539.4 276.9 529.9C203.9 474.2 64 343.9 64 231.7L64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1z" fill="currentColor" /></svg> :
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="18" height="18"><path d="M442.9 144C415.6 144 389.9 157.1 373.9 179.2L339.5 226.8C335 233 327.8 236.7 320.1 236.7C312.4 236.7 305.2 233 300.7 226.8L266.3 179.2C250.3 157.1 224.6 144 197.3 144C150.3 144 112.2 182.1 112.2 229.1C112.2 279 144.2 327.5 180.3 371.4C221.4 421.4 271.7 465.4 306.2 491.7C309.4 494.1 314.1 495.9 320.2 495.9C326.3 495.9 331 494.1 334.2 491.7C368.7 465.4 419 421.3 460.1 371.4C496.3 327.5 528.2 279 528.2 229.1C528.2 182.1 490.1 144 443.1 144zM335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1C576 297.7 533.1 358 496.9 401.9C452.8 455.5 399.6 502 363.1 529.8C350.8 539.2 335.6 543.9 320 543.9C304.4 543.9 289.2 539.2 276.9 529.8C240.4 502 187.2 455.5 143.1 402C106.9 358.1 64 297.7 64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1L320 171.8L335 151.1z" fill="currentColor" /></svg>
                                                                                )}
                                                                            </span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    // )

                                                ))}
                                            </div>

                                            <div className="row">
                                                <div className="pagination">
                                                    {/* Previous button */}
                                                    <button
                                                        disabled={meta?.current_page < 2}
                                                        onClick={() => handlePage(meta?.current_page - 1)}
                                                        aria-label="Previous"
                                                    >
                                                        Previous
                                                    </button>

                                                    {(() => {
                                                        const totalPages = Number(meta?.last_page) || 0;
                                                        const currentPage = Number(meta?.current_page) || 1;
                                                        const windowSize = 10;

                                                        // calculate start & end
                                                        let start = Math.max(1, currentPage - Math.floor(windowSize / 2));
                                                        let end = start + windowSize - 1;

                                                        if (end > totalPages) {
                                                            end = totalPages;
                                                            start = Math.max(1, end - windowSize + 1);
                                                        }

                                                        return [...Array(end - start + 1)].map((_, i) => {
                                                            const page = start + i;
                                                            return (
                                                                <button
                                                                    key={page}
                                                                    className={currentPage === page ? "active" : ""}
                                                                    onClick={() => handlePage(page)}
                                                                    aria-label={`Page ${page}`}
                                                                >
                                                                    {page}
                                                                </button>
                                                            );
                                                        });
                                                    })()}

                                                    {/* Next button */}
                                                    <button
                                                        disabled={meta?.current_page >= meta?.last_page}
                                                        onClick={() => handlePage(meta?.current_page + 1)}
                                                        aria-label="Next"
                                                    >
                                                        Next
                                                    </button>
                                                </div>

                                            </div>
                                        </>
                                    )

                                }
                                {(products.length < 1 && catPro.length < 1) ?
                                    <h2 className="empty"> No Products</h2> : ""
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

