import { IPost, IReactionListItem } from "../../common/services/commonTypes";

export interface IUserTimelineScreenStore {
    user?: IUser;
    userLoading: boolean;
    posts: IPost[];
    postsLoading: boolean;
    postsTotalElementCount: number;
    reactionListReactionItems: IReactionListItem[];
    reactionListReactionItemsLoading: boolean;
    reactionListReactionItemsTotalElementCount: number;
}

export interface IUserFriendsScreenStore {
    user?: IUser;
    userLoading: boolean;
    friends: IFriendItem[];
    friendsTotalElementCount: number;
    friendsLoading: boolean;
}

export interface IUserEditScreenStore {
    userEditFormValues: UserEditFormValues;
}

export type TProfileLayoutTab = "timeline" | "friends";

export interface IFriendItem {
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

export interface IUser {
    id: string;
    name: string;
    birthDate: Date;
    birthCountry?: string;
    birthCity?: string;
    currentCountry?: string;
    currentCity?: string;
    userEqualSelf: boolean;
    userAlreadyFriend: boolean;
    friendRequestIncomingOfUser: boolean;
    friendRequestAlreadySentToUser: boolean;
    friendshipId?: string;
}
