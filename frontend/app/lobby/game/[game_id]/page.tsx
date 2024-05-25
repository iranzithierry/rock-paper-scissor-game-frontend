import React from 'react'
import { GameContextProvider } from '@/contexts/game-context';
import { notFound } from 'next/navigation';
import GamePlay from './game';
import { GameType } from '@/types/game';
import axiosAuth from '@/lib/hooks/use-axios-auth';
import BACKEND_URLS from '@/constants/backend-urls';

interface GamePageProps { params: { game_id: string } }

async function getGameFromParams({ params }: GamePageProps) {
    try {
        const { data } = await axiosAuth.get<GameType>(BACKEND_URLS.GAMES + params.game_id);
        return data;
    } catch (error) {
        return null
    }
}

export default async function Game({ params }: GamePageProps) {
    const game = await getGameFromParams({ params })
    if (!game) {
        notFound()
    }

    return (
        <GameContextProvider gameId={params.game_id}>
            <main className='p-2'>
                <GamePlay />
            </main>
        </GameContextProvider>
    );
}

export const revalidate = 5;
