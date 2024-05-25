"use client";
import React, { createContext, ReactNode, useContext, useState, useCallback } from "react";
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

const initialGameState: GameProps = {
  players: [],
  choices: [],
  currentTurn: null,
  user: null,
  selectedChoice: null,
  gameFinished: false,
};

export const GameContext = createContext<GameProps>(initialGameState);

export const GameContextProvider: React.FC<{ children: ReactNode; gameId: string }> = ({ children, gameId }) => {
  const { user, accessToken } = useAuth();

  const [players, setPlayers] = useState<PlayerType[]>([]);
  const [choices, setChoices] = useState<ChoiceType[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [gameFinished, setGameFinished] = useState<boolean>(false);
  const [currentTurn, setCurrentTurn] = useState<string | null>(null);

  const handleWebSocketMessage = useCallback((e: MessageEvent) => {
    const data = JSON.parse(e.data);
    switch (data.type) {
      case "update_players":
        setPlayers(data.players);
        break;
      case "display_choices":
        setChoices(data.choices);
        setGameFinished(true);
        break;
      case "game_notification":
        toast(data.message);
        break;
      case "reset":
        resetGameState();
        break;
      case "turn_change":
        setCurrentTurn(data.next_turn);
        break;
      default:
        break;
    }
  }, []);

  const { sendJsonMessage } = useWebSocket(
    // `ws://${BACKEND_HOST.split("//")[1]}/ws/game/${gameId}/`,
    `https://skizzy.ebuzzie.com:8000/ws/game/${gameId}/`,
    {
      queryParams: { token: accessToken ?? "" },
      onMessage: handleWebSocketMessage,
    }
  );

  const makeChoice = (choice: string) => {
    if (user) sendJsonMessage({ type: "choose", choice });
    setSelectedChoice(choice);
  };

  const startGame = () => {
    if (user) sendJsonMessage({ type: "start" });
  };

  const resetGame = () => {
    if (user) sendJsonMessage({ type: "reset" });
  };

  const resetGameState = () => {
    setChoices([]);
    setCurrentTurn(null);
    setSelectedChoice(null);
    setGameFinished(false);
  };

  return (
    <GameContext.Provider
      value={{ players, selectedChoice, gameFinished, user, choices, currentTurn, makeChoice, startGame, resetGame }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
