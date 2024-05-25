import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import GameChoices from "./choices";

type GameControlsProps = {
    options: { value: string; label: string; icon: string }[];
    isMyTurn: () => boolean;
    gameFinished: boolean | undefined;
    areTwoPlayers: () => boolean;
    selectedChoice: string | null | undefined;
    makeChoice?: (choice: string) => void;
    startGame?: () => void;
    resetGame?: () => void;
    choices: { player: string; choice: string }[];
};

const GameControls: React.FC<GameControlsProps> = ({
    options, isMyTurn, gameFinished, areTwoPlayers, selectedChoice, makeChoice, startGame, resetGame, choices
}) => (
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
                            <Button
                                disabled={!areTwoPlayers() || !isMyTurn() || gameFinished}
                                variant={'outline'}
                                onClick={() => makeChoice?.(option.value)}
                                className={`h-16 w-16 rounded-full text-4xl ${selectedChoice === option.value && '!bg-black hover:!bg-black'}`}>
                                {option.icon}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{option.label}</p>
                        </TooltipContent>
                    </Tooltip>
                ))}
            </div>
            <GameChoices choices={choices} gameFinished={gameFinished} resetGame={resetGame} />
        </div>
    </div>
);
export default GameControls;