"use client";

import { AuthProvider } from "@/context/AuthContext";
import { WishListProvider } from "@/context/WishListContext";
import { LoaderProvider } from "@/context/LoaderContext";
import { CartProvider } from "@/context/cart";
import { UIProvider } from "@/context/UiContext";

export default function Providers({ children }) {

    return (
        <WishListProvider>
            <CartProvider>
                <AuthProvider>
                    <UIProvider>
                        <LoaderProvider>
                            {children}
                        </LoaderProvider>
                    </UIProvider>
                </AuthProvider>
            </CartProvider>
        </WishListProvider>
    );
}