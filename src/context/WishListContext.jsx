"use client";

import { createContext, useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const WishListContext = createContext();

export const WishListProvider = ({ children }) => {
    const [wishlistLoadingIds, setWishlistLoadingIds] = useState([]);
    const [token, setToken] = useState(null)
    const router = useRouter();

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    useEffect(() => {
        setToken(localStorage.getItem("token"));
    })

    const [refreshWishList, setRefreshWishList] = useState(false);

    const [wishList, setWishList] = useState([]);

    const toggleWishlist = async (id) => {
        if(!token){
            router.push("/login");
            return;
        }
        const isAlreadyInWishlist = wishList.some(item => item.id === id);
        if (!isAlreadyInWishlist && wishList.length >= 10) {
        toast.info("You can only add a maximum of 10 products to your wishlist.", {
        position: "bottom-right",
        autoClose: 1000,
        });
        return;
        }
        setWishlistLoadingIds((prev) => [...prev, id]);
        
        try {
            const response = await fetch(`${baseUrl}wishlist/toggle/${id}`, {
                    method:"POST",
                    headers:{"Authorization" : `Bearer ${token}`,  "Content-Type": "application/json"},
                });
            const data = await response.json();

            if (response.status === 200 ) {
                setRefreshWishList(prev => !prev)
                fetchWishList();
                if(data.data.status === "removed"){
                    toast.error(data.message, {
                    position: "top-center",
                    autoClose: 1000,
                    });
                }else{
                    toast.success(data.message, {
                    position: "top-center",
                    autoClose: 1000,
                    });
                }
                
                return "";
            } else {
                return data.message || "Toggle WishList failed.";
            }
        } catch (error) {
            console.log(error);
            return "An error occurred during Toggle WishList.";
        } finally{
            setWishlistLoadingIds((prev) => prev.filter(pid => pid !== id));
        }
    };


        const fetchWishList = async () => {
            if (!token) return;
            try {
                const response = await fetch(`${baseUrl}wishlist`, {
                    method: "GET",
                    headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" }
                });
                if (!response.ok) throw new Error("Failed to fetch product WishList");
                const data = await response.json();
                setWishList(data.data);
            } catch (err) {
                console.log(err);
            }
        };
    
    
    const getWishList = () => wishList;
    return  (
        <WishListContext.Provider value={{ toggleWishlist, getWishList, wishlistLoadingIds, fetchWishList, wishList}}>
          {children}
        </WishListContext.Provider>
    )
    
}