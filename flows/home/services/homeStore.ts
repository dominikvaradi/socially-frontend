import { IHomeFeedScreenStore } from "./homeTypes";

export type THomeStore = {
    feedScreenStore: IHomeFeedScreenStore;
};

export const defaultHomeStore: THomeStore = {
    feedScreenStore: {
        posts: [],
        postsLoading: true,
        postsTotalElementCount: 0,
        reactionListReactionItems: [],
        reactionListReactionItemsLoading: true,
        reactionListReactionItemsTotalElementCount: 0,
    },
};
