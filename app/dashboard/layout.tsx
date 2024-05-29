import Header from "@/app/dashboard/header";
import React from "react";

export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <>
            <Header/>
            {children}
        </>
    );
}