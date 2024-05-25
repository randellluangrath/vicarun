import './globals.css';
import {cn} from "@/lib/utils";
import {ReactNode} from "react";
import {GeistMono} from 'geist/font/mono';
import Header from "@/components/layout/header";

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({children}: RootLayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head><title></title></head>
        <body
            className={cn(
                "min-h-screen bg-background font-sans antialiasing",
                GeistMono.variable
            )}
        >
        <Header/>
        {children}
        </body>
        </html>
    );
}
