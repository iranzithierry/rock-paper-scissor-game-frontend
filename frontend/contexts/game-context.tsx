"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";
import useWebSocket from "react-use-websocket";
import { useAuth } from "./auth-context";
import { toast } from "sonner";
import { ChoiceType, PlayerType } from "@/types/ws";
import { BACKEND_HOST } from "@/constants/backend-urls";
import { UserType } from "@/types/auth";

export interface GameProps {
  players: PlayerType[];
  choices: ChoiceType[];
  currentTurn: string | null;
  makeChoice?: (choice: string) => void;
  startGame?: () => void;
  resetGame?: () => void;
  user?: UserType | null;
  selectedChoice?: string | null;
  gameFinished?: boolean;
}

export const GameContext = createContext<GameProps>({ players: [], choices: [], currentTurn: "" });

export const GameContextProvider: React.FC<{ children: ReactNode; gameId: string }> = ({ children, gameId }) => {
  const { user, accessToken } = useAuth();

  const [players, setPlayers] = useState<PlayerType[]>([]);
  const [choices, setChoices] = useState<ChoiceType[]>([]);
  const [selectedChoice, setSelectedChoice] = React.useState("");
  const [gameFinished, setGameFinished] = React.useState(false);
  const [currentTurn, setCurrentTurn] = useState<string | null>(null);

  const { sendJsonMessage } = useWebSocket(
    `ws://${BACKEND_HOST.split("//")[1]}/game/${gameId}/`,
    {
      queryParams: {
        token: accessToken ?? "",
      },
      onMessage: (e: MessageEvent) => {
        const data = JSON.parse(e.data);
        switch (data.type) {
          case "update_players":
            setPlayers(data.players);
            break;
          case "display_choices":
            setChoices(data.choices);
            setGameFinished(true)
            break;
          case "game_notification":
            toast(data.message);
            break;
          case "reset":
            setChoices([])
            setCurrentTurn(null)
            setSelectedChoice("");
            setGameFinished(false)
            break
          case "turn_change":
            setCurrentTurn(data.next_turn);
            break;
        }
      },
    }
  );

  const makeChoice = (choice: string) => {
    if (user) sendJsonMessage({ type: "choose", choice: choice });
    setSelectedChoice(choice);
  };
  const startGame = () => {
    if (user) sendJsonMessage({ type: "start" });
  }
  const resetGame = () => {
    if (user) sendJsonMessage({ type: "reset" });
  }

  return (
    <GameContext.Provider
      value={{ players, selectedChoice, gameFinished, user, choices, currentTurn, makeChoice, startGame, resetGame }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
