"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";
import useWebSocket from "react-use-websocket";
import { useAuth } from "./auth-context";
import { toast } from "sonner";
import { Choice, Player } from "@/types/ws";

const DefaultProps = { players: [], choices: [], makeChoice: () => { }, startGame: () => { }, resetGame: () => { }, countDown: 10};

export interface GameProps {
  players: Player[];
  choices: Choice[];
  makeChoice: (choice: string) => void;
  startGame: () => void;
  resetGame: () => void;
  countDown: number;
}

export const GameContext = createContext<GameProps>(DefaultProps);

export const GameContextProvider: React.FC<{ children: ReactNode; gameId: string }> = ({ children, gameId }) => {
  const { user, accessToken } = useAuth();

  const [players, setPlayers] = useState<Player[]>([]);
  const [choices, setChoices] = useState<Choice[]>([]);
  const [countDown, startCountDown] = useState<number>(10);

  const HOST = "192.168.1.164:8000"
  const { sendJsonMessage } = useWebSocket(
    `ws://${HOST}/game/${gameId}/`,
    {
      queryParams: {
        token: accessToken ?? "",
      },
      onOpen: () => {
        console.log("Connected to Game!");
      },
      onClose: () => {
        console.log("Disconnected from Game!");
      },
      reconnectInterval: 2000,
      reconnectAttempts: 3,
      retryOnError: true,

      onMessage: (e: MessageEvent) => {
        const data = JSON.parse(e.data);
        console.log("Received something", data);
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
          case "countdown":
            startCountDown(data.remaining_time)
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
      value={{ players, choices, makeChoice, startGame, resetGame, countDown }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
