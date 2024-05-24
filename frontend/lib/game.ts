import BACKEND_URLS from "@/constants/backend-urls"
import { GameType } from "@/types/game"

export const createGame = async ({ token }: { token: string | undefined }) => {
    return fetch(BACKEND_URLS.GAMES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.json() as Promise<GameType>).then(game => game.id)
}