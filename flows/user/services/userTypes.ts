export type TProfileLayoutTab = "timeline" | "friends";

export interface IFriendItem {
    id: string;
    userId: string;
    userName: string;
}

export interface UserEditFormValues {
    firstName: string;
    lastName: string;
    birthDate: Date;
    birthCountry: string;
    birthCity: string;
    currentCountry: string;
    currentCity: string;
}
