import BaseStoreService from "../../common/services/BaseStoreService";
import { defaultFriendRequestStore, TFriendRequestStore } from "./friendRequestStore";
import { IFriendRequestItem } from "./friendRequestTypes";

export class FriendRequestStoreService extends BaseStoreService<TFriendRequestStore> {
    resetStore = () => {
        this.setStore((draftStore) => {
            draftStore = defaultFriendRequestStore;
        });
    };

    setIncomingFriendRequestsScreenFriendRequestItemsLoading = (friendRequestItemsLoading: boolean) => {
        this.setStore((draftStore) => {
            draftStore.incomingFriendRequestsScreenStore.friendRequestItemsLoading = friendRequestItemsLoading;
        });
    };

    setIncomingFriendRequestsScreenFriendRequestItems = (
        friendRequestItems: IFriendRequestItem[],
        totalElementCount: number
    ) => {
        this.setStore((draftStore) => {
            draftStore.incomingFriendRequestsScreenStore.friendRequestItems = friendRequestItems;
            draftStore.incomingFriendRequestsScreenStore.friendRequestItemsTotalElementCount = totalElementCount;
        });
    };

    setIncomingFriendRequestsScreenFriendRequestItemsAndLoadingFalse = (
        friendRequestItems: IFriendRequestItem[],
        totalElementCount: number
    ) => {
        this.setStore((draftStore) => {
            draftStore.incomingFriendRequestsScreenStore.friendRequestItems = friendRequestItems;
            draftStore.incomingFriendRequestsScreenStore.friendRequestItemsTotalElementCount = totalElementCount;
            draftStore.incomingFriendRequestsScreenStore.friendRequestItemsLoading = false;
        });
    };

    setOutgoingFriendRequestsScreenFriendRequestItemsLoading = (friendRequestItemsLoading: boolean) => {
        this.setStore((draftStore) => {
            draftStore.outgoingFriendRequestsScreenStore.friendRequestItemsLoading = friendRequestItemsLoading;
        });
    };

    setOutgoingFriendRequestsScreenFriendRequestItems = (
        friendRequestItems: IFriendRequestItem[],
        totalElementCount: number
    ) => {
        this.setStore((draftStore) => {
            draftStore.outgoingFriendRequestsScreenStore.friendRequestItems = friendRequestItems;
            draftStore.outgoingFriendRequestsScreenStore.friendRequestItemsTotalElementCount = totalElementCount;
        });
    };

    setOutgoingFriendRequestsScreenFriendRequestItemsAndLoadingFalse = (
        friendRequestItems: IFriendRequestItem[],
        totalElementCount: number
    ) => {
        this.setStore((draftStore) => {
            draftStore.outgoingFriendRequestsScreenStore.friendRequestItems = friendRequestItems;
            draftStore.outgoingFriendRequestsScreenStore.friendRequestItemsTotalElementCount = totalElementCount;
            draftStore.outgoingFriendRequestsScreenStore.friendRequestItemsLoading = false;
        });
    };
}

export default new FriendRequestStoreService(defaultFriendRequestStore, () => {
    /* Empty on purpose */
});
