"use client";
import { debounce } from 'lodash';
import Avatar from 'boring-avatars';
import { UserType } from '@/types/auth';
import { Input } from "@/components/ui/input"
import { Bolt, StarIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from "@/components/ui/button"
import { Skeleton } from '@/components/ui/skeleton';
import React, { useCallback, useState } from 'react'
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"

export default function SearchCard({ searchUsers }: { searchUsers: (query: string) => Promise<UserType[]> }) {
    const [users, setUsers] = useState<UserType[]>([])
    const [searching, setSearching] = useState<boolean>(false);
    const [notFound, setNotFound] = useState<boolean>(false);

    const handleSearch = async (query: string) => {
        setSearching(true);
        if (query.length > 1) {
            const usersAsData = await searchUsers(query)
            if (usersAsData.length !== 0) {
                setUsers(usersAsData)
            } else {
                setUsers([])
                setNotFound(true)
            }
        }
        setSearching(false);
    };
    const handleChange = (value: string) => {
        handleTextDebounce(value);
    };
    const handleTextDebounce = useCallback(debounce(handleSearch, 600), []);

    return (
        <Card className="flex flex-col">
            <CardHeader className='p-2 sm:p-6'>
                <CardTitle>Search</CardTitle>
                <CardDescription>Find and invite other players.</CardDescription>
                <Input
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder="Search..."
                    type="search"
                />
            </CardHeader>
            <CardContent className="flex-1 overflow-auto space-y-3">
                {users && !searching && users.map((user, _) => (
                    <div key={user.id} className="flex items-center gap-2">
                        <Avatar
                            size={40}
                            name={user.username}
                            variant="beam"
                            colors={['#0A0310', '#49007E', '#FF005B', '#FF7D10', '#FFB238']}
                        />
                        <div className="flex-1">
                            <div className="font-medium text-sm">@{user.username}</div>
                            <Badge className='items-center space-x-2' variant={'outline'}>
                                <div className='flex items-center space-x-0.5'>
                                    <StarIcon className='h-3 w-3 -mt-0.5' />
                                    <div className='text-xs'>93</div>
                                </div>
                                <div className='flex items-center space-x-0.5'>
                                    <Bolt className='h-3 w-3 -mt-0.5' />
                                    <div className='text-xs'>93</div>
                                </div>
                            </Badge>
                        </div>
                        <Button size="sm">Invite</Button>
                    </div>
                ))}
                {searching &&
                    Array.from({ length: 4 }).map((_, index) => (
                        <div className="flex items-center space-x-4" key={index}>
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2 flex-1">
                                <Skeleton className="h-4 w-full" />
                                <div className='w-full justify-between flex'>
                                    <Skeleton className="h-4 w-[30%]" />
                                </div>
                            </div>
                        </div>
                    ))}
                {!searching && notFound && 
                    <div className="p-6 text-center">
                        <h5 className="text-xl tracking-wider font-semibold">No Users Found.</h5>
                    </div>
                }
            </CardContent>
        </Card>
    )
}
