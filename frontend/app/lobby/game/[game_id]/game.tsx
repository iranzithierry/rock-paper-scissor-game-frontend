"use client";
import React from 'react';
import { useGame } from '@/contexts/game-context';
import { pluralize } from '@/lib/utils';
import { Card, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlayerType } from '@/types/ws';
import GameControls from '@/components/game-play/controls';
import PlayersList from '@/components/game-play/players-list';

const options = [
    { value: 'rock', label: 'Rock', icon: '✊' },
    { value: 'paper', label: 'Paper', icon: '✋' },
    { value: 'scissor', label: 'Scissor', icon: '✌' }
];

export default function GamePlay() {
    const { user, players, selectedChoice, gameFinished, currentTurn, choices, makeChoice, startGame, resetGame } = useGame();

    const isMyTurn = (): boolean => currentTurn ? currentTurn === user?.username : true;
    const statusPlayers = (status = "connected"): PlayerType[] => players.filter(player => player.status === status);
    const areTwoPlayers = getTwoPlayers(statusPlayers, players);

    return (
        <Card className='mx-auto w-full max-w-4xl p-6'>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Badge>{players.length} {pluralize(players, "Player")} in Lobby</Badge>
                    </div>
                </div>
            </CardHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-72">
                <PlayersList areTwoPlayers={areTwoPlayers} startGame={startGame} players={players} currentTurn={currentTurn} gameFinished={gameFinished} user={user} />
                <GameControls
                    options={options}
                    isMyTurn={isMyTurn}
                    gameFinished={gameFinished}
                    areTwoPlayers={areTwoPlayers}
                    selectedChoice={selectedChoice}
                    makeChoice={makeChoice}
                    startGame={startGame}
                    resetGame={resetGame}
                    choices={choices}
                />
            </div>
        </Card>
    );
}
function getTwoPlayers(statusPlayers: (status?: string) => PlayerType[], players: PlayerType[]) {
    return (status = "connected") => status === 'connected' ? statusPlayers().length === 2 : players.length === 2;
}
