// "use client";
import React from 'react'
import { CardTitle, CardDescription, CardHeader, CardContent, Card, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { GameType } from '@/types/game'
import { LinkButton } from '@/components/ui/link-button'
import { useAuth } from '@/contexts/auth-context';
import { getSession } from '@/lib/sessions'
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
                                <TableCell>{game.mode}</TableCell>
                                <TableCell>{game.status == 'Full' ? '2/2' : '1/2'}</TableCell>
                                <TableCell>
                                    <Badge variant={game.status == 'Full' ? 'destructive' : 'success'}>{game.status}</Badge>
                                </TableCell>
                                <TableCell>
                                    {/* @ts-ignore */}
                                    {game.status == 'Open' || game.players.some(player => player.player == user?.username) ?
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
                <Button className="ml-auto" size="sm">
                    Create Game
                </Button>
            </CardFooter>
        </Card>
    )
}