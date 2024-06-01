"use client";

import React from 'react'
import { AlertTriangle, BellDot, User } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function NotificationMenu() {
    return (
        <Popover>
            <PopoverTrigger className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2'>
                <BellDot className="h-5 w-5" />
                <span className="sr-only">Toggle notifications</span>
            </PopoverTrigger>
            <PopoverContent className="w-full max-w-[20rem]" align="end">
                <Tabs defaultValue="account">
                    <TabsList>
                        <TabsTrigger value="inbox">Inbox</TabsTrigger>
                        <TabsTrigger value="viewed">Viewed</TabsTrigger>
                    </TabsList>
                    <TabsContent value="inbox">
                        <div className="flex items-start space-x-4 rounded-md bg-background cursor-pointer hover:bg-accent p-1 text-accent-foreground transition-all">
                            <Avatar>
                                <AvatarImage alt="@jaredpalmer" src="" />
                                <AvatarFallback color='red'>T</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="font-medium">Friend Request</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    Troy sent you friend request
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="viewed"></TabsContent>
                </Tabs>
            </PopoverContent>
        </Popover>
    )
}
