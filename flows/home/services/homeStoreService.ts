import BaseStoreService from "../../common/services/BaseStoreService";
import { defaultHomeStore, THomeStore } from "./homeStore";
import { IPost } from "../../common/services/commonTypes";

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
}

export default new HomeStoreService(defaultHomeStore, () => {
    /* Empty on purpose */
});
