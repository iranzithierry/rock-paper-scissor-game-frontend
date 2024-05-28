"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavItem() {
    const currentPathName = usePathname()
    const menus = [
        {
            title: 'lobby',
            pathName: '/lobby',
        },
    ];

    return ( menus.map((menu, index) => (
            <Link
                key={index}
                href={menu.pathName}
                className={`text-muted-foreground capitalize text-xl transition-colors hover:text-foreground ${menu.pathName == currentPathName && 'font-semibold !text-black  !dark:text-white'}`}
            >
                {menu.title}
            </Link>
        )));
}
