import { ProfilePicture, UserType } from "./auth";

export interface ChoiceType {
    player:    string;
    choice:    string;
    timestamp: Date;
}

export interface PlayerType extends UserType {
    status:          string;
}
