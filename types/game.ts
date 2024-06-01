import { PlayerType } from "./ws";

export interface GameType {
    id:        string;
    mode:      'Public' | 'Private';
    status:    'Open'   | 'Full';
    timestamp: Date;
    players:   PlayerType[];
}
