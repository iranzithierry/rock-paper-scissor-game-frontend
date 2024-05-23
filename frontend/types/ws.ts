import { ProfilePicture, UserType } from "./auth";

export interface Choice {
    player:    string;
    choice:    string;
    timestamp: Date;
}

export interface Player extends UserType {
    status:          string;
}
