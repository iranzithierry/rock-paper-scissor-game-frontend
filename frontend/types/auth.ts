export interface UserType {
    id:              string;
    username:        string;
    email:           string;
    profile_picture: ProfilePicture | null;
    tokens:          TokensType;
}

export interface ProfilePicture {
    original:           string;
    thumbnail:          string;
    medium_square_crop: string;
    small_square_crop:  string;
}

export interface TokensType {
    refresh: string;
    access:  string;
}

export interface SessionType {
    user:    UserType;
}

