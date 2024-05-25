import { UserType } from "@/types/auth";
import { Badge } from "../ui/badge";
import { PlayerType } from "@/types/ws";
import UserAvatar from '@/components/user-avatar';

type PlayerCardProps = {
    user: UserType | null | undefined;
    player: PlayerType;
    currentTurn: string | null;
    gameFinished: boolean | undefined;
};

const PlayerCard: React.FC<PlayerCardProps> = ({ user, player, currentTurn, gameFinished }) => (
    <div className="flex items-center space-x-2 w-full">
        <UserAvatar user={player} success={player.status === "connected"} />
        <div className='flex flex-col w-full'>
            <p className="text-lg font-medium">{player.username}</p>
            <div className='flex justify-between'>
                {currentTurn === player.username && player.username !== user?.username && !gameFinished && (
                    <Badge variant={'success'} className='capitalize'>Thinking</Badge>
                )}
            </div>
        </div>
    </div>
);
export default PlayerCard