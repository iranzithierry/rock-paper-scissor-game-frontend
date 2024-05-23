"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";
import useWebSocket from "react-use-websocket";
import { useAuth } from "./auth-context";
import { toast } from "sonner";
import { Choice, Player } from "@/types/ws";

const DefaultProps = { players: [], choices: [], makeChoice: () => { }, joinGame: () => { }, };

export interface GameProps {
  players: Player[];
  choices: Choice[];
  makeChoice: (choice: string) => void;
  joinGame: () => void;
}

export const GameContext = createContext<GameProps>(DefaultProps);

export const GameContextProvider: React.FC<{ children: ReactNode; gameId: string }> = ({ children, gameId }) => {
  const { user, accessToken } = useAuth();

  const [players, setPlayers] = useState<Player[]>([]);
  const [choices, setChoices] = useState<Choice[]>([]);

  const { sendJsonMessage } = useWebSocket(
    `ws://127.0.0.1:8000/game/${gameId}/`,
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
        console.log(data);
        
        switch (data.type) {
          case "update_uplayers":
            setPlayers(data.players);
            break;
          case 'preview_choices':
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
    if (user) sendJsonMessage({ type: "make_choice", choice: choice });
  };

  const joinGame = () => {
    if (user) sendJsonMessage({ type: "join_game" });
  };

  return (
    <GameContext.Provider
      value={{ players, choices, makeChoice, joinGame }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
