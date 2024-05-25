"use client";
import React from 'react'
import Link from 'next/link'
import useScroll from '@/lib/hooks/use-scroll';
import Logo from '../logo';
import { LinkButton } from '../ui/link-button';
import { useAuth } from '@/contexts/auth-context';
import UserMenu from '../lobby/user-menu';

export default function Header() {
    const scrolled = useScroll(50);
    const { user } = useAuth()
    return (
        <header className={`fixed top-0  w-full px-4 lg:px-6 h-14 flex items-center ${scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
            } z-30 transition-all`}>
            <Logo />
            <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
                {/* <div>
                    <Link className="font-medium hover:underline underline-offset-4" href="#">
                        About
                    </Link>
                </div> */}
                <div>
                    {!user ?
                        <LinkButton linkTo='/login'>Sign In</LinkButton>
                        : <UserMenu user={user} />
                    }
                </div>
            </nav>
        </header>
    )
}
