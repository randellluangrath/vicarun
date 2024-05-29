import './globals.css';
import {ReactNode} from "react";
import {GeistMono} from 'geist/font/mono';
import {cn} from "@/lib/utils/utils";

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
        {children}
        </body>
        </html>
    );
}
