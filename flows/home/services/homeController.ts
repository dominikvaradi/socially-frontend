import BaseController from "../../common/services/BaseController";
import { defaultHomeStore, THomeStore } from "./homeStore";
import homeStoreService, { HomeStoreService } from "./homeStoreService";
import { transformPostResponseDto2IPost } from "../../common/services/api/transformers/transformPostResponseDto2IPost";
import { CreatePostFormValues, EditPostFormValues, IPost, TReaction } from "../../common/services/commonTypes";
import { FormikHelpers } from "formik";
import { homeApi } from "./api/homeApi";
import { transformCreatePostFormValues2PostCreateRequestDto } from "../../common/services/api/transformers/transformCreatePostFormValues2PostCreateRequestDto";
import tokenStorage from "../../common/tokenStorage";
import { transformEditPostFormValues2PostUpdateRequestDto } from "../../common/services/api/transformers/transformEditPostFormValues2PostUpdateRequestDto";

const POSTS_FETCH_SIZE = 10;

export class HomeController extends BaseController<THomeStore, HomeStoreService> {
    initFeedScreen = async () => {
        this.storeService.resetStore();
        this.storeService.setFeedScreenStorePostsLoading(true);

        const response = await homeApi.fetchPosts(0, POSTS_FETCH_SIZE);
        if (response?.status !== 200 || response?.statusText !== "OK" || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt az posztok betöltése közben, kérjük próbálja meg később.",
                status: "error",
            });

            this.storeService.setFeedScreenStorePostsLoading(false);

            return;
        }

        this.storeService.setFeedScreenStorePostsAndLoadingFalse(
            response.data.data.elements.map(transformPostResponseDto2IPost),
            response.data.data.totalElements
        );
    };

    loadMorePosts = async () => {
        this.storeService.setFeedScreenStorePostsLoading(true);
        if (this.store.feedScreenStore.posts.length >= this.store.feedScreenStore.postsTotalElementCount) {
            return;
        }

        const response = await homeApi.fetchPosts(
            Math.ceil(this.store.feedScreenStore.posts.length / POSTS_FETCH_SIZE),
            POSTS_FETCH_SIZE
        );
        if (response?.status !== 200 || response?.statusText !== "OK" || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt az posztok betöltése közben, kérjük próbálja meg később.",
                status: "error",
            });

            this.storeService.setFeedScreenStorePostsLoading(false);

            return;
        }

        const newPosts = [
            ...this.store.feedScreenStore.posts,
            ...response.data.data.elements.map(transformPostResponseDto2IPost),
        ];

        this.storeService.setFeedScreenStorePostsAndLoadingFalse(newPosts, response.data.data.totalElements);
    };

    navigateToUserTimelinePage = (userId: string) => {
        this.router?.push(`/user/${userId}`);
    };

    toggleReactionOnPost = async (postId: string, reaction: TReaction) => {
        const response = await homeApi.toggleReactionOnPost(postId, reaction);
        if (!response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt a reakció módosítása közben, kérjük próbálja meg később.",
                status: "error",
            });

            return;
        }

        this.updatePostInStore(transformPostResponseDto2IPost(response.data.data));
    };

    createPost = async (values: CreatePostFormValues, actions: FormikHelpers<CreatePostFormValues>) => {
        const loggedInUserId = tokenStorage.getUserId();
        if (!loggedInUserId) return;

        const response = await homeApi.createPost(
            loggedInUserId,
            transformCreatePostFormValues2PostCreateRequestDto(values)
        );
        if (response?.status !== 200 || response?.statusText !== "OK" || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt a poszt létrehozása közben, kérjük próbálja meg később.",
                status: "error",
            });

            actions.setSubmitting(false);

            return;
        }

        const postsClone = [...this.store.feedScreenStore.posts];
        postsClone.unshift(transformPostResponseDto2IPost(response.data.data));

        this.storeService.setFeedScreenStorePosts(postsClone, this.store.feedScreenStore.postsTotalElementCount + 1);

        actions.resetForm();
    };

    editPost = async (postId: string, values: EditPostFormValues, actions: FormikHelpers<EditPostFormValues>) => {
        const response = await homeApi.editPost(postId, transformEditPostFormValues2PostUpdateRequestDto(values));
        if (response?.status !== 200 || response?.statusText !== "OK" || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt a poszt szerkesztése közben, kérjük próbálja meg később.",
                status: "error",
            });

            actions.setSubmitting(false);

            return;
        }

        this.updatePostInStore(transformPostResponseDto2IPost(response.data.data));

        actions.resetForm();

        this.showToast({
            title: "Sikeresen szerkesztetted a posztot.",
            status: "success",
        });
    };

    deletePost = async (postId: string) => {
        const response = await homeApi.deletePost(postId);
        if (response?.status !== 200 || response?.statusText !== "OK") {
            this.showToast({
                title: "Váratlan hiba történt a poszt törlése közben, kérjük próbálja meg később.",
                status: "error",
            });

            return;
        }

        const postsClone = [...this.store.feedScreenStore.posts];
        const postIndex = postsClone.findIndex((post) => post.id === postId);
        if (postIndex !== -1) {
            postsClone.splice(postIndex, 1);
        }

        this.storeService.setFeedScreenStorePosts(postsClone, this.store.feedScreenStore.postsTotalElementCount - 1);

        this.showToast({
            title: "Sikeresen törölted a posztot.",
            status: "success",
        });
    };

    private updatePostInStore = (updatedPost: IPost) => {
        const postsClone = [...this.store.feedScreenStore.posts];

        const postIndex = postsClone.findIndex((post) => post.id === updatedPost.id);
        if (postIndex !== -1) {
            postsClone[postIndex] = updatedPost;
        }

        this.storeService.setFeedScreenStorePosts(postsClone, this.store.feedScreenStore.postsTotalElementCount);
    };
}

export default new HomeController(defaultHomeStore, homeStoreService);
