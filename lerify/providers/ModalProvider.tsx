"use client"

import AuthModal from "@/components/Modals/AuthModal";
import UploadModal from "@/components/Modals/UploadModal";
import { useEffect, useState } from "react";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }
        return (
            <>
                <AuthModal/>
                <UploadModal/>
            </>
        )
}
export default ModalProvider;