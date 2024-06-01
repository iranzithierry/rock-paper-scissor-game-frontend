import { UserType } from "./auth";
import { GameType } from "./game";

export interface BaseResponse {
    message: string;
    success: boolean;
}
export interface SearchType {
    count:    number;
    next:     null;
    previous: null;
    results:  UserType[] | GameType[];
}