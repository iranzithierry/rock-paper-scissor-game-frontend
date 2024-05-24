import React from 'react'
import { UserType } from '@/types/auth'
import BoringAvatar from 'boring-avatars'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn, getUserAvatar } from '@/lib/utils'

export default function UserUvatar({ user, loading= 'eager', success = true, size = 'md', extraClass }: { user: UserType | null, success?: boolean, size?: 'sm' | 'md', extraClass?: string, loading?: "lazy" | "eager" }) {
    return (
        <div className={cn('relative', extraClass)} >
            {user?.profile_picture ?
                <Avatar className={`${size ==='sm'&& 'w-6 h-6'}`} >
                    <AvatarImage  loading={loading}  alt={user?.username} src={getUserAvatar(user, size === 'sm' ? 'small_square_crop' : 'medium_square_crop')} />
                    <AvatarFallback className='bg-black/70 text-white'>{user.username.toUpperCase()[0]}</AvatarFallback>
                </Avatar>
                : <BoringAvatar
                    size={size === 'sm' ? 24 : 40}
                    name={user?.username}
                    variant="beam"
                    colors={['#0A0310', '#49007E', '#FF005B', '#FF7D10', '#FFB238']}
                />}
            <span className={`${size ==='sm' ? 'w-2 h-2 bottom-0 right-0':  'w-3 h-3 bottom-0.5 right-0.5'} rounded-full ${success ? 'bg-green-500' : 'bg-gray-500'} border-2 border-white z-50 absolute `}></span>
        </div>
    )
}
