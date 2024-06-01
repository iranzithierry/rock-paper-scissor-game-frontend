"use client";
import React from "react";
import { Menu, Plus, } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import NavItem from "./nav"
import UserMenu from './user-menu';
import Logo from "../logo";
import NotificationMenu from "./notification-menu";
import { SessionType } from "@/types/auth";
import { LinkButton } from "../ui/link-button";
import { useAuth } from "@/contexts/auth-context";

export default function Header() {
    const { user } = useAuth(); 
    return (
        <header className="sticky top-0 right-0 flex h-16 items-center gap-4 border-b bg-background px-1 sm:px-4 md:px-6 w-full z-40">
            <nav className="flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-end md:gap-5 lg:gap-6">
                <Logo />
                {/* <NavItem /> */}
            </nav>
            {/* <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="shrink-0 md:hidden" >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Logo />
                        <NavItem />
                    </nav>
                </SheetContent>
            </Sheet> */}
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <div className="ml-auto sm:flex-initial items-center flex space-x-2">
                    {/* <LinkButton linkTo="/dashboard/projects/new">
                        New
                        <Plus className="h-5 w-5" />
                    </LinkButton> */}
                    <NotificationMenu/>
                </div>
                <UserMenu user={user}/>
            </div>
        </header>
    )
}
