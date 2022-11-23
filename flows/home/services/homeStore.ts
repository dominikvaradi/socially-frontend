import { IHomeFeedScreenStore } from "./homeTypes";

export type THomeStore = {
    feedScreenStore: IHomeFeedScreenStore;
};

export const defaultHomeStore: THomeStore = {
    feedScreenStore: {
        posts: [],
        postsLoading: false,
        postsTotalElementCount: 0,
        reactionListReactionItems: [],
        reactionListLoading: false,
        reactionListLoadMoreItemsButtonVisible: false,
    },
};
