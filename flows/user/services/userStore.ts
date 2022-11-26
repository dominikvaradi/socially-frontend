import { IUserEditScreenStore, IUserFriendsScreenStore, IUserTimelineScreenStore } from "./userTypes";

export type TUserStore = {
    timelineScreenStore: IUserTimelineScreenStore;
    friendsScreenStore: IUserFriendsScreenStore;
    editScreenStore: IUserEditScreenStore;
};

export const defaultUserStore: TUserStore = {
    timelineScreenStore: {
        user: undefined,
        userLoading: true,
        posts: [],
        postsLoading: true,
        postsTotalElementCount: 0,
        reactionListReactionItems: [],
        reactionListReactionItemsLoading: true,
        reactionListReactionItemsTotalElementCount: 0,
    },
    friendsScreenStore: {
        user: undefined,
        userLoading: true,
        friends: [],
        friendsTotalElementCount: 0,
        friendsLoading: true,
    },
    editScreenStore: {
        userEditFormValues: {
            firstName: "",
            lastName: "",
            birthDate: new Date(),
            birthCountry: "",
            birthCity: "",
            currentCountry: "",
            currentCity: "",
        },
    },
};
