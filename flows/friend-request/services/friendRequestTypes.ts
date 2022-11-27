export interface IFriendRequestsScreenStore {
    friendRequestItems: IFriendRequestItem[];
    friendRequestItemsLoading: boolean;
    friendRequestItemsTotalElementCount: number;
}

export type TFriendRequestLayoutTab = "incoming" | "outgoing";

export interface IFriendRequestItem {
    id: string;
    userId: string;
    userName: string;
}
