"use client";
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/game-context';
import { pluralize } from '@/lib/utils';;
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Card, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RefreshCcw } from 'lucide-react';
import { PlayerType } from '@/types/ws';
import UserUvatar from '@/components/user-avatar';
import React, { use } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/auth-context';
import { UserType } from '@/types/auth';

const options = [
    { value: 'rock', label: 'Rock', icon: '✊' },
    { value: 'paper', label: 'Paper', icon: '✋' },
    { value: 'scissor', label: 'Scissor', icon: '✌' }
]

export default function GamePlay() {

    const { user, players, selectedChoice, gameFinished, currentTurn, choices, makeChoice, startGame, resetGame } = useGame();

    const isMyTurn = () => currentTurn ? currentTurn == user?.username : true
    const statusPlayers = (status = "connected") => players.filter(player => player.status === status);
    const areTwoPlayers = getTwoPlayers(statusPlayers, players);
    return (
        <Card className='mx-auto w-full max-w-4xl p-6'>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Badge>
                            {players.length} {pluralize(players, "Player")} in Lobby
                        </Badge>
                    </div>
                </div>
            </CardHeader>
            <div className="grid grid-cols-1  md:grid-cols-2 gap-6 min-h-72">
                <div className="rounded-lg border border-border gap-2 p-4 dark:bg-muted flex flex-col justify-between">
                    <div>
                        <p className="text-gray-400">Join a lobby and challenge other players.</p>
                        <div className="space-y-2">
                            {players.length !== 0 && players.map((player) => (
                                <div key={player.id} className="border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground p-2 rounded-xl cursor-pointer">
                                    <PlayerCard player={player} currentTurn={currentTurn} gameFinished={gameFinished} user={user} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='space-y-1 w-full'>
                        <Tooltip delayDuration={100}>
                            <TooltipTrigger asChild>
                                <div>
                                    {!gameFinished &&
                                        <Button className='w-full' disabled={!areTwoPlayers()} onClick={startGame}>
                                            Start Game
                                        </Button>}
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{!areTwoPlayers() ? "You must be 2 players to start game" : "Click to start game"} </p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>
                <div className={`rounded-lg border border-border p-4 dark:bg-muted`}>
                    <div className='flex justify-between w-full mb-4'>
                        <div className='flex space-x-2 items-center'>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Game</h2>
                        </div>
                        <div>
                            {!gameFinished && (
                                <Badge variant={'success'}>
                                    {isMyTurn() ? "Your Turn" : "Opponent's Turn"}
                                </Badge>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-6">
                        <div className="flex items-center gap-4">
                            {options.map((option, index) => (
                                <Tooltip key={index}>
                                    <TooltipTrigger asChild>
                                        <Button disabled={!areTwoPlayers() || !isMyTurn() || gameFinished} variant={'outline'} onClick={() => makeChoice?.(option.value)} className={`h-16 w-16 rounded-full text-4xl ${selectedChoice == option.value && '!bg-black hover:!bg-black'}`}>
                                            {option.icon}
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{option.label}</p>
                                    </TooltipContent>
                                </Tooltip>
                            ))}
                        </div>
                        <div className="text-center w-full">
                            <ul className='space-y-2 w-full'>
                                {choices.length !== 0 && choices.map((choice, index) => (
                                    <div key={index} className="rounded-md border px-4 py-2 text-sm shadow-sm">
                                        {choice.player} chose <span className='font-semibold capitalize'>{choice.choice}</span>
                                    </div>
                                ))}
                                {gameFinished &&
                                    <Button size={'lg'} className='w-full' onClick={resetGame}>
                                        Reset <RefreshCcw className="h-4 w-4 ml-2 animate-spin rotate-180" />
                                    </Button>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )

}

const PlayerCard = ({ user, player, currentTurn, gameFinished }: { player: PlayerType, currentTurn: string | null, user: UserType | null | undefined, gameFinished: boolean | undefined }) => {
    return (
        <div className="flex items-center space-x-2 w-full">
            <UserUvatar user={player} success={player.status == "connected"} />
            <div className='flex flex-col w-full'>
                <p className="text-lg font-medium">{player.username}</p>
                <div className='flex justify-between'>
                    {currentTurn == player.username && player.username !== user?.username && !gameFinished &&
                        <Badge variant={'success'} className='capitalize'>
                            Thinking
                        </Badge>}
                </div>
            </div>
        </div>
    )
}

function getTwoPlayers(statusPlayers: (status?: string) => PlayerType[], players: PlayerType[]) {
    return (status = "connected") => status == 'connected' ? statusPlayers().length === 2 : players.length === 2;
}
