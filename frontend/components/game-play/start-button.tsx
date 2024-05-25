
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type StartGameButtonProps = {
    gameFinished: boolean | undefined;
    areTwoPlayers: () => boolean;
    startGame?: () => void;
};

const StartGameButton: React.FC<StartGameButtonProps> = ({ gameFinished, areTwoPlayers, startGame }) => (
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
                <p>{!areTwoPlayers() ? "You must be 2 players to start game" : "Click to start game"}</p>
            </TooltipContent>
        </Tooltip>
    </div>
);

export default StartGameButton