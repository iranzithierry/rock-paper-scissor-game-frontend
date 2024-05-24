"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";
import useWebSocket from "react-use-websocket";
import { useAuth } from "./auth-context";
import { toast } from "sonner";
import { ChoiceType, PlayerType } from "@/types/ws";

export interface GameProps {
  players: PlayerType[];
  choices: ChoiceType[];
  makeChoice?: (choice: string) => void;
  startGame?: () => void;
  resetGame?: () => void;
}

export const GameContext = createContext<GameProps>({ players: [], choices: [] });

export const GameContextProvider: React.FC<{ children: ReactNode; gameId: string }> = ({ children, gameId }) => {
  const { user, accessToken } = useAuth();

  const [players, setPlayers] = useState<PlayerType[]>([]);
  const [choices, setChoices] = useState<ChoiceType[]>([]);

  const HOST = "192.168.1.164:8000"
  const { sendJsonMessage } = useWebSocket(
    `ws://${HOST}/game/${gameId}/`,
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
          case 'display_choices':
            setChoices(data.choices);
            break;
          case "game_notification":
            toast(data.message);
            break;
        }
      },
    }
  );

  const makeChoice = (choice: string) => {
    if (user) sendJsonMessage({ type: "choose", choice: choice });
  };
  const startGame = () => {
    if (user) sendJsonMessage({ type: "start" });
  }
  const resetGame = () => {
    if (user) sendJsonMessage({ type: "reset" });
  }

  return (
    <GameContext.Provider
      value={{ players, choices, makeChoice, startGame, resetGame }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
