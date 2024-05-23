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
    const { data }: { data: SearchType } = await axios.get(BACKEND_URLS.SEARCH.replace("{query}", query))
    return data.results as UserType[]
}
const getGames = async () => {
    "use server";
    const { data }: { data: SearchType } = await axiosAuth.get(BACKEND_URLS.GAMES)
    return data.results as GameType[] ;
}


const getLeaderBoardData = () => {

}