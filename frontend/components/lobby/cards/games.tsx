// "use client";
import React from 'react'
import { CardTitle, CardDescription, CardHeader, CardContent, Card, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { GameType } from '@/types/game'
import { LinkButton } from '@/components/ui/link-button'
import { getSession } from '@/lib/sessions'
import UserUvatar from '@/components/user-avatar'
import { LockIcon, LockKeyholeOpen } from 'lucide-react'
import { PlayerType } from '@/types/ws'

export default async function GamesCard({ getGames }: { getGames: () => Promise<GameType[] | undefined> }) {
    const sessions = await getSession()
    const user = sessions?.user
    const games = await getGames()
    return (
        <Card className='w-full overflow-x-auto'>
            <CardHeader className='p-2 sm:p-6'>
                <CardTitle>Lobby</CardTitle>
                <CardDescription>Join a game or create a new one.</CardDescription>
            </CardHeader>
            <CardContent className='p-2 sm:p-6'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Mode</TableHead>
                            <TableHead>Players</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {games && games.map((game, _) => (
                            <TableRow key={game.id}>
                                <TableCell>
                                    {game.status == 'Full' ? <LockIcon className='h-4 w-4' /> : <LockKeyholeOpen className='h-4 w-4' />}
                                </TableCell>
                                <TableCell>
                                    <div className='flex [&>:not(:last-of-type)]:-mr-1'>
                                        {game.players.map((player: PlayerType, index: number) => (
                                            <UserUvatar  loading='lazy' key={index} user={player} size='sm' extraClass='[&>*]:aspect-square' />
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell>
                                {game.status == 'Open' || game.players.some(player => player.username == user?.username)?
                                    <Badge variant={'default'}>Open</Badge>
                                    :
                                    <Badge variant={'destructive'}>Full</Badge>
                                }
                                </TableCell>
                                <TableCell>
                                    {/* @ts-ignore */}
                                    {game.status == 'Open' || game.players.some(player => player.username == user?.username) ?
                                        <LinkButton linkTo={`/lobby/game/${game.id}`} size="sm">Join</LinkButton>
                                        :
                                        <Button size="sm" disabled>Join</Button>
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <LinkButton className="ml-auto" linkTo="/lobby/create" size="sm">Create Game</LinkButton>
            </CardFooter>
        </Card>
    )
}