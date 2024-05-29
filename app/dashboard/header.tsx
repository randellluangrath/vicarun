'use client';

import React from 'react';
import Image from 'next/image';

const Header = () => {
    return (
        <header className="w-full shadow-md py-2 px-6 flex items-center fixed top-0 bg-white z-50">
            <h1 className="text-2xl font-bold">vicarun</h1>
            <Image src="/logo.png" alt="Vicarun Logo" width={50} height={50} />
        </header>
    );
};

export default Header;
