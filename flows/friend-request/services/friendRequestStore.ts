import { IFriendRequestsScreenStore } from "./friendRequestTypes";

export type TFriendRequestStore = {
    incomingFriendRequestsScreenStore: IFriendRequestsScreenStore;
    outgoingFriendRequestsScreenStore: IFriendRequestsScreenStore;
};

export const defaultFriendRequestStore: TFriendRequestStore = {
    incomingFriendRequestsScreenStore: {
        friendRequestItems: [],
        friendRequestItemsLoading: true,
        friendRequestItemsTotalElementCount: 0,
    },
    outgoingFriendRequestsScreenStore: {
        friendRequestItems: [],
        friendRequestItemsLoading: true,
        friendRequestItemsTotalElementCount: 0,
    },
};
