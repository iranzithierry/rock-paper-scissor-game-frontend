import React from 'react'
import { UserType } from '@/types/auth'
import BoringAvatar from 'boring-avatars'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getUserAvatar } from '@/lib/utils'

export default function UserUvatar({ user }: { user: UserType | null }) {
    return (
        <>
            {user?.profile_picture ?
                <Avatar>
                    <AvatarImage alt={user?.username} src={getUserAvatar(user, 'small_square_crop')} />
                    <AvatarFallback className='bg-black/70 text-white'>{user.username.toUpperCase()[0]}</AvatarFallback>
                </Avatar>
                : <BoringAvatar
                    size={50}
                    name={user?.username}
                    variant="beam"
                    colors={['#0A0310', '#49007E', '#FF005B', '#FF7D10', '#FFB238']}
                />}
        </>
    )
}
