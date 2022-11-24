import BaseStoreService from "../../common/services/BaseStoreService";
import { defaultHomeStore, THomeStore } from "./homeStore";
import { IPost, IReactionListItem } from "../../common/services/commonTypes";

export class HomeStoreService extends BaseStoreService<THomeStore> {
    resetStore = () => {
        this.setStore(() => {
            return defaultHomeStore;
        });
    };

    setFeedScreenStorePostsLoading = (postsLoading: boolean) => {
        this.setStore((draftStore) => {
            draftStore.feedScreenStore.postsLoading = postsLoading;
        });
    };

    setFeedScreenStorePosts = (posts: IPost[], totalElementCount: number) => {
        this.setStore((draftStore) => {
            draftStore.feedScreenStore.posts = posts;
            draftStore.feedScreenStore.postsTotalElementCount = totalElementCount;
        });
    };

    setFeedScreenStorePostsAndLoadingFalse = (posts: IPost[], totalElementCount: number) => {
        this.setStore((draftStore) => {
            draftStore.feedScreenStore.posts = posts;
            draftStore.feedScreenStore.postsTotalElementCount = totalElementCount;
            draftStore.feedScreenStore.postsLoading = false;
        });
    };

    setFeedScreenReactionListReactionItemsLoading = (reactionItemsLoading: boolean) => {
        this.setStore((draftStore) => {
            draftStore.feedScreenStore.reactionListReactionItemsLoading = reactionItemsLoading;
        });
    };

    setFeedScreenReactionListReactionItems = (reactionItems: IReactionListItem[], totalElementCount: number) => {
        this.setStore((draftStore) => {
            draftStore.feedScreenStore.reactionListReactionItems = reactionItems;
            draftStore.feedScreenStore.reactionListReactionItemsTotalElementCount = totalElementCount;
        });
    };

    setFeedScreenReactionListReactionItemsAndLoading = (
        reactionItems: IReactionListItem[],
        totalElementCount: number,
        reactionItemsLoading: boolean
    ) => {
        this.setStore((draftStore) => {
            draftStore.feedScreenStore.reactionListReactionItems = reactionItems;
            draftStore.feedScreenStore.reactionListReactionItemsTotalElementCount = totalElementCount;
            draftStore.feedScreenStore.reactionListReactionItemsLoading = reactionItemsLoading;
        });
    };
}

export default new HomeStoreService(defaultHomeStore, () => {
    /* Empty on purpose */
});
