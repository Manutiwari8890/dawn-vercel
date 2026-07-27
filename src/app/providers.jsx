"use client";

import { AuthProvider } from "@/context/AuthContext";
import { WishListProvider } from "@/context/WishListContext";
import { LoaderProvider } from "@/context/LoaderContext";
import { CartProvider } from "@/context/cart";


export default function Providers({ children }) {
      console.log("Providers rendered");

    return (
        <WishListProvider>
            <CartProvider>
                <AuthProvider>
                    <LoaderProvider>
                    {children}
                    </LoaderProvider>
                </AuthProvider>
            </CartProvider>
        </WishListProvider>
    );
}