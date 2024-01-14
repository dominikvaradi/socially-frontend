import BaseController from "../../common/services/BaseController";
import { defaultHomeStore, THomeStore } from "./homeStore";
import homeStoreService, { HomeStoreService } from "./homeStoreService";
import { transformPostResponseDto2IPost } from "../../common/services/api/transformers/transformPostResponseDto2IPost";
import {
    CreateCommentFormValues,
    CreatePostFormValues,
    EditCommentFormValues,
    EditPostFormValues,
    IComment,
    IPost,
    TReaction,
} from "../../common/services/commonTypes";
import { FormikHelpers } from "formik";
import { homeApi } from "./api/homeApi";
import { transformCreatePostFormValues2PostCreateRequestDto } from "../../common/services/api/transformers/transformCreatePostFormValues2PostCreateRequestDto";
import tokenStorage from "../../common/tokenStorage";
import { transformEditPostFormValues2PostUpdateRequestDto } from "../../common/services/api/transformers/transformEditPostFormValues2PostUpdateRequestDto";
import { transformCommentResponseDto2IComment } from "../../common/services/api/transformers/transformCommentResponseDto2IComment";
import { transformCreateCommentFormValues2CommentCreateRequestDto } from "../../common/services/api/transformers/transformCreateCommentFormValues2CommentCreateRequestDto";
import { transformEditCommentFormValues2CommentUpdateRequestDto } from "../../common/services/api/transformers/transformEditCommentFormValues2CommentUpdateRequestDto";
import { transformPostReactionResponseDto2IReactionListItem } from "../../common/services/api/transformers/transformPostReactionResponseDto2IReactionListItem";
import { transformCommentReactionResponseDto2IReactionListItem } from "../../common/services/api/transformers/transformCommentReactionResponseDto2IReactionListItem";

const POSTS_FETCH_SIZE = 10;
const COMMENTS_FETCH_SIZE = 5;
const REACTIONS_FETCH_SIZE = 10;

export class HomeController extends BaseController<THomeStore, HomeStoreService> {
    initFeedScreen = async () => {
        this.storeService.resetStore();

        const response = await homeApi.fetchPosts(0, POSTS_FETCH_SIZE);
        if (response?.status !== 200 || !response?.data?.data) {
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
            Math.floor(this.store.feedScreenStore.posts.length / POSTS_FETCH_SIZE),
            POSTS_FETCH_SIZE
        );
        if (response?.status !== 200 || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt az posztok betöltése közben, kérjük próbálja meg később.",
                status: "error",
            });

            this.storeService.setFeedScreenStorePostsLoading(false);

            return;
        }

        const newPosts = [
            ...this.store.feedScreenStore.posts,
            ...response.data.data.elements
                .filter((postResponseDto) => !this.store.feedScreenStore.posts.find((p) => p.id === postResponseDto.id))
                .map(transformPostResponseDto2IPost),
        ];

        this.storeService.setFeedScreenStorePostsAndLoadingFalse(newPosts, response.data.data.totalElements);
    };

    navigateToUserTimelinePage = (userId: string) => {
        this.router?.push(`/user/${userId}`);
    };

    toggleReactionOnPost = async (post: IPost, reaction: TReaction) => {
        const response = await homeApi.toggleReactionOnPost(post.id, reaction);
        if (response?.status !== 200 || !response?.data?.data) {
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
        if (response?.status !== 200 || !response?.data?.data) {
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

    editPost = async (post: IPost, values: EditPostFormValues, actions: FormikHelpers<EditPostFormValues>) => {
        const response = await homeApi.editPost(post.id, transformEditPostFormValues2PostUpdateRequestDto(values));
        if (response?.status !== 200 || !response?.data?.data) {
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
            title: "Poszt sikeresen szerkesztve.",
            status: "success",
        });
    };

    deletePost = async (post: IPost) => {
        const response = await homeApi.deletePost(post.id);
        if (response?.status !== 200) {
            this.showToast({
                title: "Váratlan hiba történt a poszt törlése közben, kérjük próbálja meg később.",
                status: "error",
            });

            return;
        }

        const postsClone = [...this.store.feedScreenStore.posts];
        const postIndex = postsClone.findIndex((p) => p.id === post.id);
        if (postIndex !== -1) {
            postsClone.splice(postIndex, 1);
        }

        this.storeService.setFeedScreenStorePosts(postsClone, this.store.feedScreenStore.postsTotalElementCount - 1);

        this.showToast({
            title: "Poszt sikeresen törölve.",
            status: "success",
        });
    };

    loadCommentsForPost = async (post: IPost) => {
        this.updatePostCommentsInStore(post.id, []);

        const response = await homeApi.fetchCommentsForPost(post.id, 0, COMMENTS_FETCH_SIZE);
        if (response?.status !== 200 || !response?.data.data) {
            this.showToast({
                title: "Váratlan hiba történt a kommentek betöltése közben, kérjük próbálja meg később.",
                status: "error",
            });

            return;
        }

        this.updatePostCommentsInStore(
            post.id,
            response.data.data.elements.map((commentResponseDto) =>
                transformCommentResponseDto2IComment(post.addresseeId, commentResponseDto)
            ),
            response.data.data.totalElements
        );
    };

    loadMoreCommentsForPost = async (post: IPost) => {
        if (post.comments.length >= post.commentCount) {
            return;
        }

        const response = await homeApi.fetchCommentsForPost(
            post.id,
            Math.floor(post.comments.length / COMMENTS_FETCH_SIZE),
            COMMENTS_FETCH_SIZE
        );
        if (response?.status !== 200 || !response?.data.data) {
            this.showToast({
                title: "Váratlan hiba történt a kommentek betöltése közben, kérjük próbálja meg később.",
                status: "error",
            });

            return;
        }

        const newComments = [
            ...post.comments,
            ...response.data.data.elements
                .filter((commentResponseDto) => !post.comments.find((c) => c.id === commentResponseDto.id))
                .map((commentResponseDto) =>
                    transformCommentResponseDto2IComment(post.addresseeId, commentResponseDto)
                ),
        ];

        this.updatePostCommentsInStore(post.id, newComments, response.data.data.totalElements);
    };

    createCommentForPost = async (
        post: IPost,
        values: CreateCommentFormValues,
        actions: FormikHelpers<CreateCommentFormValues>
    ) => {
        const response = await homeApi.createComment(
            post.id,
            transformCreateCommentFormValues2CommentCreateRequestDto(values)
        );
        if (response?.status !== 200 || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt a komment létrehozása közben, kérjük próbálja meg később.",
                status: "error",
            });

            actions.setSubmitting(false);

            return;
        }

        const newComments = [
            transformCommentResponseDto2IComment(post.addresseeId, response.data.data),
            ...post.comments,
        ];

        this.updatePostCommentsInStore(post.id, newComments, post.commentCount + 1);

        actions.resetForm();
    };

    toggleReactionOnComment = async (post: IPost, comment: IComment, reaction: TReaction) => {
        const response = await homeApi.toggleReactionOnComment(comment.id, reaction);
        if (response?.status !== 200 || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt a reakció módosítása közben, kérjük próbálja meg később.",
                status: "error",
            });

            return;
        }

        const commentsClone = [...post.comments];
        const commentIndex = commentsClone.findIndex((c) => c.id === comment.id);
        if (commentIndex !== -1) {
            commentsClone[commentIndex] = transformCommentResponseDto2IComment(post.addresseeId, response.data.data);
        }

        this.updatePostCommentsInStore(post.id, commentsClone);
    };

    editComment = async (
        post: IPost,
        comment: IComment,
        values: EditCommentFormValues,
        actions: FormikHelpers<EditCommentFormValues>
    ) => {
        const response = await homeApi.editComment(
            comment.id,
            transformEditCommentFormValues2CommentUpdateRequestDto(values)
        );
        if (response?.status !== 200 || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt a komment szerkesztése közben, kérjük próbálja meg később.",
                status: "error",
            });

            actions.setSubmitting(false);

            return;
        }

        const commentsClone = [...post.comments];
        const commentIndex = commentsClone.findIndex((c) => c.id === comment.id);
        if (commentIndex !== -1) {
            commentsClone[commentIndex] = transformCommentResponseDto2IComment(post.addresseeId, response.data.data);
        }

        this.updatePostCommentsInStore(post.id, commentsClone);

        actions.resetForm();

        this.showToast({
            title: "Komment sikeresen szerkesztve.",
            status: "success",
        });
    };

    deleteComment = async (comment: IComment) => {
        const post = this.store.feedScreenStore.posts.find((p) => p.id === comment.postId);
        if (!post) return;

        const response = await homeApi.deleteComment(comment.id);
        if (response?.status !== 200) {
            this.showToast({
                title: "Váratlan hiba történt a komment törlése közben, kérjük próbálja meg később.",
                status: "error",
            });

            return;
        }

        const commentsClone = [...post.comments];
        const commentIndex = commentsClone.findIndex((c) => c.id === comment.id);
        if (commentIndex !== -1) {
            commentsClone.splice(commentIndex, 1);
        }

        this.updatePostCommentsInStore(post.id, commentsClone, post.commentCount - 1);

        this.showToast({
            title: "Komment sikeresen törölve.",
            status: "success",
        });
    };

    loadReactionsForPost = async (post: IPost, reaction?: TReaction): Promise<boolean> => {
        this.storeService.setFeedScreenReactionListReactionItemsAndLoading([], 0, true);

        const response = await homeApi.fetchPostReactions(post.id, 0, REACTIONS_FETCH_SIZE, reaction);
        if (response?.status !== 200 || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt a reakciók betöltése közben, kérjük próbálja meg később.",
                status: "error",
            });

            this.storeService.setFeedScreenReactionListReactionItemsLoading(false);

            return false;
        }

        this.storeService.setFeedScreenReactionListReactionItemsAndLoading(
            response.data.data.elements.map(transformPostReactionResponseDto2IReactionListItem),
            response.data.data.totalElements,
            false
        );

        return true;
    };

    loadMoreReactionsForPost = async (post: IPost, reaction?: TReaction): Promise<boolean> => {
        this.storeService.setFeedScreenReactionListReactionItemsLoading(true);

        const response = await homeApi.fetchPostReactions(
            post.id,
            Math.floor(this.store.feedScreenStore.reactionListReactionItems.length / REACTIONS_FETCH_SIZE),
            REACTIONS_FETCH_SIZE,
            reaction
        );
        if (response?.status !== 200 || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt a reakciók betöltése közben, kérjük próbálja meg később.",
                status: "error",
            });

            this.storeService.setFeedScreenReactionListReactionItemsLoading(false);

            return false;
        }

        const newReactionItems = [
            ...this.store.feedScreenStore.reactionListReactionItems,
            ...response.data.data.elements
                .filter(
                    (postReactionResponseDto) =>
                        !this.store.feedScreenStore.reactionListReactionItems.find(
                            (item) => item.id === postReactionResponseDto.id
                        )
                )
                .map(transformPostReactionResponseDto2IReactionListItem),
        ];

        this.storeService.setFeedScreenReactionListReactionItemsAndLoading(
            newReactionItems,
            response.data.data.totalElements,
            false
        );

        return true;
    };

    loadReactionsForComment = async (comment: IComment, reaction?: TReaction): Promise<boolean> => {
        this.storeService.setFeedScreenReactionListReactionItemsAndLoading([], 0, true);

        const response = await homeApi.fetchCommentReactions(comment.id, 0, REACTIONS_FETCH_SIZE, reaction);
        if (response?.status !== 200 || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt a reakciók betöltése közben, kérjük próbálja meg később.",
                status: "error",
            });

            return false;
        }

        this.storeService.setFeedScreenReactionListReactionItemsAndLoading(
            response.data.data.elements.map(transformCommentReactionResponseDto2IReactionListItem),
            response.data.data.totalElements,
            false
        );

        return true;
    };

    loadMoreReactionsForComment = async (comment: IComment, reaction?: TReaction): Promise<boolean> => {
        this.storeService.setFeedScreenReactionListReactionItemsLoading(true);

        const response = await homeApi.fetchCommentReactions(
            comment.id,
            Math.floor(this.store.feedScreenStore.reactionListReactionItems.length / REACTIONS_FETCH_SIZE),
            REACTIONS_FETCH_SIZE,
            reaction
        );
        if (response?.status !== 200 || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt a reakciók betöltése közben, kérjük próbálja meg később.",
                status: "error",
            });

            return false;
        }

        const newReactionItems = [
            ...this.store.feedScreenStore.reactionListReactionItems,
            ...response.data.data.elements
                .filter(
                    (commentReactionResponseDto) =>
                        !this.store.feedScreenStore.reactionListReactionItems.find(
                            (item) => item.id === commentReactionResponseDto.id
                        )
                )
                .map(transformCommentReactionResponseDto2IReactionListItem),
        ];

        this.storeService.setFeedScreenReactionListReactionItemsAndLoading(
            newReactionItems,
            response.data.data.totalElements,
            false
        );

        return true;
    };

    private updatePostInStore = (updatedPost: IPost) => {
        const postsClone = [...this.store.feedScreenStore.posts];

        const postIndex = postsClone.findIndex((post) => post.id === updatedPost.id);
        if (postIndex !== -1) {
            postsClone[postIndex] = updatedPost;
        }

        this.storeService.setFeedScreenStorePosts(postsClone, this.store.feedScreenStore.postsTotalElementCount);
    };

    private updatePostCommentsInStore = (postId: string, comments: IComment[], commentCount?: number) => {
        const postsClone = [...this.store.feedScreenStore.posts];

        const postIndex = postsClone.findIndex((post) => post.id === postId);
        if (postIndex !== -1) {
            postsClone[postIndex] = {
                ...postsClone[postIndex],
                comments: comments,
                commentCount: commentCount ?? postsClone[postIndex].commentCount,
            };
        }

        this.storeService.setFeedScreenStorePosts(postsClone, this.store.feedScreenStore.postsTotalElementCount);
    };
}

export default new HomeController(defaultHomeStore, homeStoreService);
