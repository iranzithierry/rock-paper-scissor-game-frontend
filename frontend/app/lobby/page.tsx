import React, { Suspense } from 'react'
import { Metadata } from 'next'
import LeaderBoardCard from '@/components/lobby/cards/leader-board'
import GamesCard from '@/components/lobby/cards/games'
import SearchCard from '@/components/lobby/cards/search'
import { SearchType } from '@/types/http'
import axios from '@/lib/axios'
import BACKEND_URLS from '@/constants/backend-urls'
import { UserType } from '@/types/auth'
import { GameType } from '@/types/game'
import axiosAuth from '@/lib/hooks/use-axios-auth'
import CardSkeleton from '@/components/lobby/skeletons/lobby'
import { AxiosError } from 'axios'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
    title: "Lobby",
}

export default async function LobbyPage() {
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                <LeaderBoardCard />
                <Suspense fallback={<CardSkeleton />}>
                    <GamesCard getGames={getGames} />
                </Suspense>
                <SearchCard searchUsers={searchUsers} />
            </div>
        </main>
    )
}
const searchUsers = async (query: string) => {
    "use server";
    try {
        const { data }: { data: SearchType } = await axios.get(BACKEND_URLS.SEARCH.replace("{query}", query))
        return data.results as UserType[]
    } catch (err) {
        const error = err as AxiosError
        if (error?.response?.status === 401) {
            return redirect('/refresh?redirect_back=/lobby')
        }
        if(error?.response?.status === 403) {
            return redirect('/logout?redirect_back=/lobby')
        }
    }
}
const getGames = async () => {
    "use server";
    try {
        const { data }: { data: SearchType } = await axiosAuth.get(BACKEND_URLS.GAMES)
        return data.results as GameType[];
    } catch (err) {
        const error = err as AxiosError
        console.log(error.response?.data);
        
        // @ts-ignore
        if (error?.response?.status === 401 && error.response.data?.code == "user_not_found") {
            return redirect('/logout?redirect_back=/lobby')
        }
        else if(error?.response?.status === 401) {
            return redirect('/refresh?redirect_back=/lobby')
        }
    }
}


const getLeaderBoardData = () => {

}
