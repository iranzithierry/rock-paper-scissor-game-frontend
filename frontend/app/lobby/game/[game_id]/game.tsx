"use client";
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/game-context';
import { getUserAvatar, pluralize } from '@/lib/utils';
import { useAuth } from '@/contexts/auth-context';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Card, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { TimerIcon } from 'lucide-react';
import { Player } from '@/types/ws';
import { useCountdown } from '@/lib/hooks/use-count-down';
import UserUvatar from '@/components/user-avatar';

const options = [
    { value: 'rock', label: 'Rock', icon: '✊' },
    { value: 'paper', label: 'Paper', icon: '✋' },
    { value: 'scissor', label: 'Scissor', icon: '✌' }
]

export default function GamePlay() {
    
    const onFinish = () => { }

    const { user } = useAuth()
    const { players, choices, makeChoice, joinGame } = useGame();
    const { countDown, startCountDown } = useCountdown(5, onFinish);

    const statusPlayers = (status = "online") => players.filter(player => player.status === status);
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
            <div className="grid grid-cols-2 gap-6 min-h-72">
                <div className="rounded-lg border border-border p-4 dark:bg-muted flex flex-col justify-between">
                    <div>
                        <p className="text-gray-400">Join a lobby and challenge other players.</p>
                        <div className="space-y-2">
                            {players.length !== 0 && players.map((player) => (
                                <div key={player.id} className="border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground p-2 rounded-xl cursor-pointer">
                                    <PlayerCard player={player} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='space-y-1 w-full'>
                        {!areTwoPlayers() &&
                            <Button className='w-full' onClick={() => joinGame()}>Join Game</Button>
                        }
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button className='w-full' disabled={!areTwoPlayers()} onClick={() => startCountDown()}>Start Game</Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{!areTwoPlayers() ? "You must be 2 players to start game" : "Click to start game"} </p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>
                <div className={`rounded-lg border border-border p-4 dark:bg-muted`}>
                    <div className='flex justify-between w-full mb-4'>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Game</h2>
                        <div className="flex items-center space-x-1">
                            <TimerIcon className="h-5 w-5" />
                            <p className="text-lg font-medium">{countDown}</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-6">
                        <div className="flex items-center gap-4">
                            {options.map((option, index) => (
                                <Tooltip key={index}>
                                    <TooltipTrigger asChild>
                                        <Button disabled={!areTwoPlayers()} variant={'outline'} onClick={() => makeChoice(option.value)} className='h-16 w-16 rounded-full text-4xl'>
                                            {option.icon}
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{option.label}</p>
                                    </TooltipContent>
                                </Tooltip>
                            ))}
                        </div>
                        <div className="text-center">
                            <ul>
                                {choices.length !== 0 && choices.map((choice, index) => (
                                    <li key={index}>
                                        {choice.player} chose {choice.choice}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )

}

const PlayerCard = ({ player }: { player: Player }) => {
    return (
        <div className="flex items-center space-x-2 w-full">
            <UserUvatar user={player}/>
            <div className='flex flex-col w-full'>
                <p className="text-lg font-medium">{player.username}</p>
                <div className='flex justify-between'>
                    <Badge variant={player.status === 'online' ? 'success' : 'warning'} className='capitalize'>{player.status}</Badge>
                </div>
            </div>
        </div>
    )
}

function getTwoPlayers(statusPlayers: (status?: string) => Player[], players: Player[]) {
    return (status = "online") => status == 'online' ? statusPlayers().length === 2 : players.length === 2;
}
