import BaseStoreService from "../../common/services/BaseStoreService";
import { defaultUserStore, TUserStore } from "./userStore";
import { IPost, IReactionListItem } from "../../common/services/commonTypes";
import { IFriendItem, IUser, UserEditFormValues } from "./userTypes";

export class UserStoreService extends BaseStoreService<TUserStore> {
    resetStore = () => {
        this.setStore(() => {
            return defaultUserStore;
        });
    };

    setTimelineScreenPostsLoading = (postsLoading: boolean) => {
        this.setStore((draftStore) => {
            draftStore.timelineScreenStore.postsLoading = postsLoading;
        });
    };

    setTimelineScreenPosts = (posts: IPost[], totalElementCount: number) => {
        this.setStore((draftStore) => {
            draftStore.timelineScreenStore.posts = posts;
            draftStore.timelineScreenStore.postsTotalElementCount = totalElementCount;
        });
    };

    setTimelineScreenPostsAndLoadingFalse = (posts: IPost[], totalElementCount: number) => {
        this.setStore((draftStore) => {
            draftStore.timelineScreenStore.posts = posts;
            draftStore.timelineScreenStore.postsTotalElementCount = totalElementCount;
            draftStore.timelineScreenStore.postsLoading = false;
        });
    };

    setTimelineScreenReactionListReactionItemsLoading = (reactionItemsLoading: boolean) => {
        this.setStore((draftStore) => {
            draftStore.timelineScreenStore.reactionListReactionItemsLoading = reactionItemsLoading;
        });
    };

    setTimelineScreenReactionListReactionItemsAndLoading = (
        reactionItems: IReactionListItem[],
        totalElementCount: number,
        reactionItemsLoading: boolean
    ) => {
        this.setStore((draftStore) => {
            draftStore.timelineScreenStore.reactionListReactionItems = reactionItems;
            draftStore.timelineScreenStore.reactionListReactionItemsTotalElementCount = totalElementCount;
            draftStore.timelineScreenStore.reactionListReactionItemsLoading = reactionItemsLoading;
        });
    };

    setTimelineScreenUserLoading = (userLoading: boolean) => {
        this.setStore((draftStore) => {
            draftStore.timelineScreenStore.userLoading = userLoading;
        });
    };

    setTimelineScreenUser = (user?: IUser) => {
        this.setStore((draftStore) => {
            draftStore.timelineScreenStore.user = user;
        });
    };

    setTimelineScreenUserAndLoading = (userLoading: boolean, user?: IUser) => {
        this.setStore((draftStore) => {
            draftStore.timelineScreenStore.user = user;
            draftStore.timelineScreenStore.userLoading = userLoading;
        });
    };

    setFriendsScreenUserLoading = (userLoading: boolean) => {
        this.setStore((draftStore) => {
            draftStore.friendsScreenStore.userLoading = userLoading;
        });
    };

    setFriendsScreenUser = (user?: IUser) => {
        this.setStore((draftStore) => {
            draftStore.friendsScreenStore.user = user;
        });
    };

    setFriendsScreenUserAndLoading = (userLoading: boolean, user?: IUser) => {
        this.setStore((draftStore) => {
            draftStore.friendsScreenStore.user = user;
            draftStore.friendsScreenStore.userLoading = userLoading;
        });
    };

    setFriendsScreenFriendsLoading = (friendsLoading: boolean) => {
        this.setStore((draftStore) => {
            draftStore.friendsScreenStore.friendsLoading = friendsLoading;
        });
    };

    setFriendsScreenFriends = (friends: IFriendItem[], totalElementCount: number) => {
        this.setStore((draftStore) => {
            draftStore.friendsScreenStore.friends = friends;
            draftStore.friendsScreenStore.friendsTotalElementCount = totalElementCount;
        });
    };

    setFriendsScreenFriendsAndLoadingFalse = (friends: IFriendItem[], totalElementCount: number) => {
        this.setStore((draftStore) => {
            draftStore.friendsScreenStore.friends = friends;
            draftStore.friendsScreenStore.friendsTotalElementCount = totalElementCount;
            draftStore.friendsScreenStore.friendsLoading = false;
        });
    };

    setEditScreenUserEditFormValues = (userEditFormValues: UserEditFormValues) => {
        this.setStore((draftStore) => {
            draftStore.editScreenStore.userEditFormValues = userEditFormValues;
        });
    };
}

export default new UserStoreService(defaultUserStore, () => {
    /* Empty on purpose */
});
