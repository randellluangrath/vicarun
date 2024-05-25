'use client';

import React from 'react';

interface FooterProps {
    children?: React.ReactNode;
}

const Footer = ({children}: FooterProps) => {
    return (
        <footer className="w-full flex justify-center py-6 bg-white border-t shadow-lg fixed bottom-0">
            {children}
        </footer>
    );
};

export default Footer;
