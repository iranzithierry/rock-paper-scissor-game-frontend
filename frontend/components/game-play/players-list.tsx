import { UserType } from "@/types/auth";
import { PlayerType } from "@/types/ws";
import PlayerCard from "./player-card";
import StartGameButton from "./start-button";

type PlayersListProps = {
    players: PlayerType[];
    currentTurn: string | null;
    gameFinished: boolean | undefined;
    user: UserType | null | undefined;
    areTwoPlayers: (status?: string) => boolean;
    startGame?: () => void;
};

const PlayersList: React.FC<PlayersListProps> = ({ players, areTwoPlayers, startGame, currentTurn, gameFinished, user }) => (
    <div className="rounded-lg border border-border gap-2 p-4 dark:bg-muted flex flex-col justify-between">
        <div>
            <p className="text-gray-400">Join a lobby and challenge other players.</p>
            <div className="space-y-2">
                {players.length !== 0 && players.map(player => (
                    <div key={player.id} className="border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground p-2 rounded-xl cursor-pointer">
                        <PlayerCard player={player} currentTurn={currentTurn} gameFinished={gameFinished} user={user} />
                    </div>
                ))}
            </div>
        </div>
        <StartGameButton gameFinished={gameFinished} areTwoPlayers={areTwoPlayers} startGame={startGame} />
    </div>
);
export default PlayersList;