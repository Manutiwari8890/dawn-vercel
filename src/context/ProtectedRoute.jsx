"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.replace("/login");
        }
    }, [user, router]);

    if (!user) {
        return null; // or a loading spinner
    }

    return children;
};

export default ProtectedRoute;