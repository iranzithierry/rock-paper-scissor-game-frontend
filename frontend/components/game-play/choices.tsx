import { RefreshCcw } from "lucide-react";
import { Button } from "../ui/button";

type GameChoicesProps = {
    choices: { player: string; choice: string }[];
    gameFinished: boolean | undefined;
    resetGame?: () => void;
};

const GameChoices: React.FC<GameChoicesProps> = ({ choices, gameFinished, resetGame }) => (
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
);
export default GameChoices;