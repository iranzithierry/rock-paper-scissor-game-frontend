import React from 'react'
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { TrophyIcon } from 'lucide-react'
export default function LeaderBoardCard() {
    return (
       <Card className='w-full overflow-x-auto'>
            <CardHeader className='p-2 sm:p-6'>
                <CardTitle className='flex justify-between items-center'>
                    Leaderboard
                    <Button size="sm" variant="outline">
                        <TrophyIcon className="h-2.5 w-2.5 mr-1" />
                        TOP 10
                    </Button>
                </CardTitle>
                <CardDescription>Top players by score.</CardDescription>
            </CardHeader>
            <CardContent className='p-2 sm:p-6'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Rank</TableHead>
                            <TableHead>Score</TableHead>
                            <TableHead>Avatar</TableHead>
                            <TableHead>Player</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell>12345</TableCell>
                            <TableCell>
                                <Avatar>
                                    <AvatarImage alt="@iranzithierry" src="/placeholder-avatar.jpg" />
                                    <AvatarFallback>JP</AvatarFallback>
                                </Avatar>
                            </TableCell>
                            <TableCell>
                                <p className="font-medium text-nowrap">IRANZI Thierry</p>
                            </TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
