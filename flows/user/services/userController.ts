import BaseController from "../../common/services/BaseController";
import { defaultUserStore, TUserStore } from "./userStore";
import userStoreService, { UserStoreService } from "./userStoreService";
import {
    CreateCommentFormValues,
    CreatePostFormValues,
    EditCommentFormValues,
    EditPostFormValues,
    IComment,
    IPost,
    TReaction,
} from "../../common/services/commonTypes";
import { transformCreatePostFormValues2PostCreateRequestDto } from "../../common/services/api/transformers/transformCreatePostFormValues2PostCreateRequestDto";
import { transformPostResponseDto2IPost } from "../../common/services/api/transformers/transformPostResponseDto2IPost";
import { FormikHelpers } from "formik";
import { api as userApi } from "./api/userApi";
import { transformPostReactionResponseDto2IReactionListItem } from "../../common/services/api/transformers/transformPostReactionResponseDto2IReactionListItem";
import { transformEditPostFormValues2PostUpdateRequestDto } from "../../common/services/api/transformers/transformEditPostFormValues2PostUpdateRequestDto";
import { transformCommentResponseDto2IComment } from "../../common/services/api/transformers/transformCommentResponseDto2IComment";
import { transformCreateCommentFormValues2CommentCreateRequestDto } from "../../common/services/api/transformers/transformCreateCommentFormValues2CommentCreateRequestDto";
import { transformEditCommentFormValues2CommentUpdateRequestDto } from "../../common/services/api/transformers/transformEditCommentFormValues2CommentUpdateRequestDto";
import { transformCommentReactionResponseDto2IReactionListItem } from "../../common/services/api/transformers/transformCommentReactionResponseDto2IReactionListItem";
import { transformUserProfileResponseDto2IUser } from "./api/transformers/transformUserProfileResponseDto2IUser";
import { IUser, UserEditFormValues } from "./userTypes";
import { transformUserSearchResponseDto2IFriendItem } from "./api/transformers/transformUserSearchResponseDto2IFriendItem";
import tokenStorage from "../../common/tokenStorage";
import { transformUserProfileResponseDto2UserEditFormValues } from "./api/transformers/transformUserProfileResponseDto2UserEditFormValues";
import { transformUserEditFormValues2UserUpdateRequestDto } from "./api/transformers/transformUserEditFormValues2UserUpdateRequestDto";

const POSTS_FETCH_SIZE = 10;
const COMMENTS_FETCH_SIZE = 5;
const REACTIONS_FETCH_SIZE = 10;
const FRIENDS_FETCH_SIZE = 12;

export class UserController extends BaseController<TUserStore, UserStoreService> {
    /* TODO lecserélni screen endpointra */
    initTimelineScreen = async (userId: string) => {
        this.storeService.resetStore();

        const userProfileResponse = await userApi.fetchUser(userId);
        if (
            userProfileResponse?.status !== 200 ||
            userProfileResponse?.statusText !== "OK" ||
            !userProfileResponse?.data?.data
        ) {
            this.showToast({
                title: "Váratlan hiba történt a felhasználó adatlapjának betöltése közben, kérjük próbálja meg később.",
                status: "error",
            });

            this.storeService.setTimelineScreenUserLoading(false);

            return;
        }

        const transformed = transformUserProfileResponseDto2IUser(userProfileResponse.data.data);
        this.storeService.setTimelineScreenUserAndLoading(false, transformed);

        if (!transformed.userEqualSelf && !transformed.userAlreadyFriend) {
            return;
        }

        const userTimelinePostsResponse = await userApi.fetchPostsForUser(userId, 0, POSTS_FETCH_SIZE);
        if (
            userTimelinePostsResponse?.status !== 200 ||
            userTimelinePostsResponse?.statusText !== "OK" ||
            !userTimelinePostsResponse?.data?.data
        ) {
            this.showToast({
                title: "Váratlan hiba történt a posztok betöltése közben, kérjük próbálja meg később.",
                status: "error",
            });

            this.storeService.setTimelineScreenPostsLoading(false);

            return;
        }

        this.storeService.setTimelineScreenPostsAndLoadingFalse(
            userTimelinePostsResponse.data.data.elements.map(transformPostResponseDto2IPost),
            userTimelinePostsResponse.data.data.totalElements
        );
    };

    loadMorePosts = async () => {
        const user = this.store.timelineScreenStore.user;
        if (
            !user ||
            this.store.timelineScreenStore.posts.length >= this.store.timelineScreenStore.postsTotalElementCount
        )
            return;

        this.storeService.setTimelineScreenPostsLoading(true);

        const response = await userApi.fetchPostsForUser(
            user.id,
            Math.floor(this.store.timelineScreenStore.posts.length / POSTS_FETCH_SIZE),
            POSTS_FETCH_SIZE
        );
        if (response?.status !== 200 || response?.statusText !== "OK" || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt a posztok betöltése közben, kérjük próbálja meg később.",
                status: "error",
            });

            this.storeService.setTimelineScreenPostsLoading(false);

            return;
        }

        const newPosts = [
            ...this.store.timelineScreenStore.posts,
            ...response.data.data.elements
                .filter(
                    (postResponseDto) => !this.store.timelineScreenStore.posts.find((p) => p.id === postResponseDto.id)
                )
                .map(transformPostResponseDto2IPost),
        ];

        this.storeService.setTimelineScreenPostsAndLoadingFalse(newPosts, response.data.data.totalElements);
    };

    navigateToUserTimelinePage = (userId: string) => {
        this.router?.push(`/user/${userId}`);
    };

    navigateToUserFriendsPage = (userId: string) => {
        this.router?.push(`/user/${userId}/friends`);
    };

    toggleReactionOnPost = async (post: IPost, reaction: TReaction) => {
        const response = await userApi.toggleReactionOnPost(post.id, reaction);
        if (response?.status !== 200 || response?.statusText !== "OK" || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt a reakció módosítása közben, kérjük próbálja meg később.",
                status: "error",
            });

            return;
        }

        this.updatePostInStore(transformPostResponseDto2IPost(response.data.data));
    };

    createPost = async (values: CreatePostFormValues, actions: FormikHelpers<CreatePostFormValues>) => {
        const user = this.store.timelineScreenStore.user;
        if (!user) return;

        const response = await userApi.createPost(user.id, transformCreatePostFormValues2PostCreateRequestDto(values));
        if (response?.status !== 200 || response?.statusText !== "OK" || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt a poszt létrehozása közben, kérjük próbálja meg később.",
                status: "error",
            });

            actions.setSubmitting(false);

            return;
        }

        const postsClone = [...this.store.timelineScreenStore.posts];
        postsClone.unshift(transformPostResponseDto2IPost(response.data.data));

        this.storeService.setTimelineScreenPosts(postsClone, this.store.timelineScreenStore.postsTotalElementCount + 1);

        actions.resetForm();
    };

    editPost = async (post: IPost, values: EditPostFormValues, actions: FormikHelpers<EditPostFormValues>) => {
        const response = await userApi.editPost(post.id, transformEditPostFormValues2PostUpdateRequestDto(values));
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
            title: "Poszt sikeresen szerkesztve.",
            status: "success",
        });
    };

    deletePost = async (post: IPost) => {
        const response = await userApi.deletePost(post.id);
        if (response?.status !== 200 || response?.statusText !== "OK") {
            this.showToast({
                title: "Váratlan hiba történt a poszt törlése közben, kérjük próbálja meg később.",
                status: "error",
            });

            return;
        }

        const postsClone = [...this.store.timelineScreenStore.posts];
        const postIndex = postsClone.findIndex((p) => p.id === post.id);
        if (postIndex !== -1) {
            postsClone.splice(postIndex, 1);
        }

        this.storeService.setTimelineScreenPosts(postsClone, this.store.timelineScreenStore.postsTotalElementCount - 1);

        this.showToast({
            title: "Poszt sikeresen törölve.",
            status: "success",
        });
    };

    loadCommentsForPost = async (post: IPost) => {
        this.updatePostCommentsInStore(post.id, []);

        const response = await userApi.fetchCommentsForPost(post.id, 0, COMMENTS_FETCH_SIZE);
        if (response?.status !== 200 || response?.statusText !== "OK" || !response?.data.data) {
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

        const response = await userApi.fetchCommentsForPost(
            post.id,
            Math.floor(post.comments.length / COMMENTS_FETCH_SIZE),
            COMMENTS_FETCH_SIZE
        );
        if (response?.status !== 200 || response?.statusText !== "OK" || !response?.data.data) {
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
        const response = await userApi.createComment(
            post.id,
            transformCreateCommentFormValues2CommentCreateRequestDto(values)
        );
        if (response?.status !== 200 || response?.statusText !== "OK" || !response?.data?.data) {
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
        const response = await userApi.toggleReactionOnComment(comment.id, reaction);
        if (response?.status !== 200 || response?.statusText !== "OK" || !response?.data?.data) {
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
        const response = await userApi.editComment(
            comment.id,
            transformEditCommentFormValues2CommentUpdateRequestDto(values)
        );
        if (response?.status !== 200 || response?.statusText !== "OK" || !response?.data?.data) {
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
        const post = this.store.timelineScreenStore.posts.find((p) => p.id === comment.postId);
        if (!post) return;

        const response = await userApi.deleteComment(comment.id);
        if (response?.status !== 200 || response?.statusText !== "OK") {
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
        this.storeService.setTimelineScreenReactionListReactionItemsAndLoading([], 0, true);

        const response = await userApi.fetchPostReactions(post.id, 0, REACTIONS_FETCH_SIZE, reaction);
        if (response?.status !== 200 || response?.statusText !== "OK" || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt a reakciók betöltése közben, kérjük próbálja meg később.",
                status: "error",
            });

            return false;
        }

        this.storeService.setTimelineScreenReactionListReactionItemsAndLoading(
            response.data.data.elements.map(transformPostReactionResponseDto2IReactionListItem),
            response.data.data.totalElements,
            false
        );

        return true;
    };

    loadMoreReactionsForPost = async (post: IPost, reaction?: TReaction): Promise<boolean> => {
        this.storeService.setTimelineScreenReactionListReactionItemsLoading(true);

        const response = await userApi.fetchPostReactions(
            post.id,
            Math.floor(this.store.timelineScreenStore.reactionListReactionItems.length / REACTIONS_FETCH_SIZE),
            REACTIONS_FETCH_SIZE,
            reaction
        );
        if (response?.status !== 200 || response?.statusText !== "OK" || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt a reakciók betöltése közben, kérjük próbálja meg később.",
                status: "error",
            });

            return false;
        }

        const newReactionItems = [
            ...this.store.timelineScreenStore.reactionListReactionItems,
            ...response.data.data.elements
                .filter(
                    (postReactionResponseDto) =>
                        !this.store.timelineScreenStore.reactionListReactionItems.find(
                            (item) => item.id === postReactionResponseDto.id
                        )
                )
                .map(transformPostReactionResponseDto2IReactionListItem),
        ];

        this.storeService.setTimelineScreenReactionListReactionItemsAndLoading(
            newReactionItems,
            response.data.data.totalElements,
            false
        );

        return true;
    };

    loadReactionsForComment = async (comment: IComment, reaction?: TReaction): Promise<boolean> => {
        this.storeService.setTimelineScreenReactionListReactionItemsAndLoading([], 0, true);

        const response = await userApi.fetchCommentReactions(comment.id, 0, REACTIONS_FETCH_SIZE, reaction);
        if (response?.status !== 200 || response?.statusText !== "OK" || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt a reakciók betöltése közben, kérjük próbálja meg később.",
                status: "error",
            });

            return false;
        }

        this.storeService.setTimelineScreenReactionListReactionItemsAndLoading(
            response.data.data.elements.map(transformCommentReactionResponseDto2IReactionListItem),
            response.data.data.totalElements,
            false
        );

        return true;
    };

    loadMoreReactionsForComment = async (comment: IComment, reaction?: TReaction): Promise<boolean> => {
        this.storeService.setTimelineScreenReactionListReactionItemsLoading(true);

        const response = await userApi.fetchCommentReactions(
            comment.id,
            Math.floor(this.store.timelineScreenStore.reactionListReactionItems.length / REACTIONS_FETCH_SIZE),
            REACTIONS_FETCH_SIZE,
            reaction
        );
        if (response?.status !== 200 || response?.statusText !== "OK" || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt a reakciók betöltése közben, kérjük próbálja meg később.",
                status: "error",
            });

            return false;
        }

        const newReactionItems = [
            ...this.store.timelineScreenStore.reactionListReactionItems,
            ...response.data.data.elements
                .filter(
                    (commentReactionResponseDto) =>
                        !this.store.timelineScreenStore.reactionListReactionItems.find(
                            (item) => item.id === commentReactionResponseDto.id
                        )
                )
                .map(transformCommentReactionResponseDto2IReactionListItem),
        ];

        this.storeService.setTimelineScreenReactionListReactionItemsAndLoading(
            newReactionItems,
            response.data.data.totalElements,
            false
        );

        return true;
    };

    revokeTimelineScreenOutgoingFriendRequest = async () => {
        const friendshipId = this.store.timelineScreenStore.user?.friendshipId;
        if (!friendshipId) return;

        const response = await userApi.revokeOutgoingFriendRequest(friendshipId);
        if (response?.status !== 200 || response?.statusText !== "OK" || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt a barát-kérelem visszavonása közben, kérjük próbálja meg később.",
                status: "error",
            });

            return;
        }

        const user = this.store.timelineScreenStore.user;
        if (!user) return;

        const userClone = {
            ...user,
            friendRequestAlreadySentToUser: false,
        } as IUser;

        this.storeService.setTimelineScreenUser(userClone);
    };

    sendTimelineScreenFriendRequest = async () => {
        const userId = this.store.timelineScreenStore.user?.id;
        if (!userId) return;

        const response = await userApi.sendFriendRequest(userId);
        if (response?.status !== 200 || response?.statusText !== "OK" || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt a barát-kérelem küldése közben, kérjük próbálja meg később.",
                status: "error",
            });

            return;
        }

        const user = this.store.timelineScreenStore.user;
        if (!user) return;

        const userClone = {
            ...user,
            friendRequestAlreadySentToUser: true,
        } as IUser;

        this.storeService.setTimelineScreenUser(userClone);
    };

    acceptTimelineScreenIncomingFriendRequest = async () => {
        const friendshipId = this.store.timelineScreenStore.user?.friendshipId;
        if (!friendshipId) return;

        const response = await userApi.acceptIncomingFriendRequest(friendshipId);
        if (response?.status !== 200 || response?.statusText !== "OK" || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt a barát-kérelem elfogadása közben, kérjük próbálja meg később.",
                status: "error",
            });

            return;
        }

        const user = this.store.timelineScreenStore.user;
        if (!user) return;

        const userClone = {
            ...user,
            friendRequestIncomingOfUser: false,
            userAlreadyFriend: true,
        } as IUser;

        this.storeService.setTimelineScreenUser(userClone);

        this.storeService.setTimelineScreenPostsLoading(true);

        const userTimelinePostsResponse = await userApi.fetchPostsForUser(user.id, 0, POSTS_FETCH_SIZE);
        if (
            userTimelinePostsResponse?.status !== 200 ||
            userTimelinePostsResponse?.statusText !== "OK" ||
            !userTimelinePostsResponse?.data?.data
        ) {
            this.showToast({
                title: "Váratlan hiba történt a posztok betöltése közben, kérjük próbálja meg később.",
                status: "error",
            });

            this.storeService.setTimelineScreenPostsLoading(false);

            return;
        }

        this.storeService.setTimelineScreenPostsAndLoadingFalse(
            userTimelinePostsResponse.data.data.elements.map(transformPostResponseDto2IPost),
            userTimelinePostsResponse.data.data.totalElements
        );
    };

    declineTimelineScreenIncomingFriendRequest = async () => {
        const friendshipId = this.store.timelineScreenStore.user?.friendshipId;
        if (!friendshipId) return;

        const response = await userApi.declineIncomingFriendRequest(friendshipId);
        if (response?.status !== 200 || response?.statusText !== "OK" || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt a barát-kérelem elutasítása közben, kérjük próbálja meg később.",
                status: "error",
            });

            return;
        }

        const user = this.store.timelineScreenStore.user;
        if (!user) return;

        const userClone = {
            ...user,
            friendRequestIncomingOfUser: false,
            userAlreadyFriend: false,
        } as IUser;

        this.storeService.setTimelineScreenUser(userClone);
    };

    deleteTimelineScreenFriend = async () => {
        const friendshipId = this.store.timelineScreenStore.user?.friendshipId;
        if (!friendshipId) return;

        const response = await userApi.deleteFriend(friendshipId);
        if (response?.status !== 200 || response?.statusText !== "OK") {
            this.showToast({
                title: "Váratlan hiba történt a barát törlése közben, kérjük próbálja meg később.",
                status: "error",
            });

            return;
        }

        const user = this.store.timelineScreenStore.user;
        if (!user) return;

        const userClone = {
            ...user,
            friendshipId: undefined,
            userAlreadyFriend: false,
        } as IUser;

        this.storeService.setTimelineScreenUser(userClone);
    };

    /* TODO lecserélni screen endpointra */
    initFriendsScreen = async (userId: string) => {
        this.storeService.resetStore();

        const userProfileResponse = await userApi.fetchUser(userId);
        if (
            userProfileResponse?.status !== 200 ||
            userProfileResponse?.statusText !== "OK" ||
            !userProfileResponse?.data?.data
        ) {
            this.showToast({
                title: "Váratlan hiba történt a felhasználó adatlapjának betöltése közben, kérjük próbálja meg később.",
                status: "error",
            });

            this.storeService.setFriendsScreenUserLoading(false);

            return;
        }

        const transformed = transformUserProfileResponseDto2IUser(userProfileResponse.data.data);
        this.storeService.setFriendsScreenUserAndLoading(false, transformed);

        if (!transformed.userEqualSelf && !transformed.userAlreadyFriend) {
            return;
        }

        const userFriendsResponse = await userApi.fetchFriendsOfUser(userId, 0, FRIENDS_FETCH_SIZE);
        if (
            userFriendsResponse?.status !== 200 ||
            userFriendsResponse?.statusText !== "OK" ||
            !userFriendsResponse?.data?.data
        ) {
            this.showToast({
                title: "Váratlan hiba történt a felhasználó barátai betöltése közben, kérjük próbálja meg később.",
                status: "error",
            });

            this.storeService.setFriendsScreenFriendsLoading(false);

            return;
        }

        this.storeService.setFriendsScreenFriendsAndLoadingFalse(
            userFriendsResponse.data.data.elements.map(transformUserSearchResponseDto2IFriendItem),
            userFriendsResponse.data.data.totalElements
        );
    };

    loadMoreFriends = async () => {
        const user = this.store.friendsScreenStore.user;
        if (
            !user ||
            this.store.friendsScreenStore.friends.length >= this.store.friendsScreenStore.friendsTotalElementCount
        )
            return;

        this.storeService.setFriendsScreenFriendsLoading(true);

        const response = await userApi.fetchFriendsOfUser(
            user.id,
            Math.floor(this.store.friendsScreenStore.friends.length / FRIENDS_FETCH_SIZE),
            FRIENDS_FETCH_SIZE
        );
        if (response?.status !== 200 || response?.statusText !== "OK" || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt a felhasználó barátai betöltése közben, kérjük próbálja meg később.",
                status: "error",
            });

            this.storeService.setFriendsScreenFriendsLoading(false);

            return;
        }

        const newFriends = [
            ...this.store.friendsScreenStore.friends,
            ...response.data.data.elements
                .filter(
                    (userSearchResponseDto) =>
                        !this.store.friendsScreenStore.friends.find((f) => f.userId === userSearchResponseDto.id)
                )
                .map(transformUserSearchResponseDto2IFriendItem),
        ];

        this.storeService.setFriendsScreenFriendsAndLoadingFalse(newFriends, response.data.data.totalElements);
    };

    revokeFriendsScreenOutgoingFriendRequest = async () => {
        const friendshipId = this.store.friendsScreenStore.user?.friendshipId;
        if (!friendshipId) return;

        const response = await userApi.revokeOutgoingFriendRequest(friendshipId);
        if (response?.status !== 200 || response?.statusText !== "OK" || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt a barát-kérelem visszavonása közben, kérjük próbálja meg később.",
                status: "error",
            });

            return;
        }

        const user = this.store.friendsScreenStore.user;
        if (!user) return;

        const userClone = {
            ...user,
            friendRequestAlreadySentToUser: false,
        } as IUser;

        this.storeService.setFriendsScreenUser(userClone);
    };

    sendFriendsScreenFriendRequest = async () => {
        const userId = this.store.friendsScreenStore.user?.id;
        if (!userId) return;

        const response = await userApi.sendFriendRequest(userId);
        if (response?.status !== 200 || response?.statusText !== "OK" || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt a barát-kérelem küldése közben, kérjük próbálja meg később.",
                status: "error",
            });

            return;
        }

        const user = this.store.friendsScreenStore.user;
        if (!user) return;

        const userClone = {
            ...user,
            friendRequestAlreadySentToUser: true,
        } as IUser;

        this.storeService.setFriendsScreenUser(userClone);
    };

    acceptFriendsScreenIncomingFriendRequest = async () => {
        const friendshipId = this.store.friendsScreenStore.user?.friendshipId;
        if (!friendshipId) return;

        const response = await userApi.acceptIncomingFriendRequest(friendshipId);
        if (response?.status !== 200 || response?.statusText !== "OK" || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt a barát-kérelem elfogadása közben, kérjük próbálja meg később.",
                status: "error",
            });

            return;
        }

        const user = this.store.friendsScreenStore.user;
        if (!user) return;

        const userClone = {
            ...user,
            friendRequestIncomingOfUser: false,
            userAlreadyFriend: true,
        } as IUser;

        this.storeService.setFriendsScreenUser(userClone);

        this.storeService.setFriendsScreenFriendsLoading(true);

        const userFriendsResponse = await userApi.fetchFriendsOfUser(user.id, 0, FRIENDS_FETCH_SIZE);
        if (
            userFriendsResponse?.status !== 200 ||
            userFriendsResponse?.statusText !== "OK" ||
            !userFriendsResponse?.data?.data
        ) {
            this.showToast({
                title: "Váratlan hiba történt a felhasználó barátai betöltése közben, kérjük próbálja meg később.",
                status: "error",
            });

            this.storeService.setFriendsScreenFriendsLoading(false);

            return;
        }

        this.storeService.setFriendsScreenFriendsAndLoadingFalse(
            userFriendsResponse.data.data.elements.map(transformUserSearchResponseDto2IFriendItem),
            userFriendsResponse.data.data.totalElements
        );
    };

    declineFriendsScreenIncomingFriendRequest = async () => {
        const friendshipId = this.store.friendsScreenStore.user?.friendshipId;
        if (!friendshipId) return;

        const response = await userApi.declineIncomingFriendRequest(friendshipId);
        if (response?.status !== 200 || response?.statusText !== "OK" || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt a barát-kérelem elutasítása közben, kérjük próbálja meg később.",
                status: "error",
            });

            return;
        }

        const user = this.store.friendsScreenStore.user;
        if (!user) return;

        const userClone = {
            ...user,
            friendRequestIncomingOfUser: false,
            userAlreadyFriend: false,
        } as IUser;

        this.storeService.setFriendsScreenUser(userClone);
    };

    deleteFriendsScreenFriend = async () => {
        const friendshipId = this.store.friendsScreenStore.user?.friendshipId;
        if (!friendshipId) return;

        const response = await userApi.deleteFriend(friendshipId);
        if (response?.status !== 200 || response?.statusText !== "OK") {
            this.showToast({
                title: "Váratlan hiba történt a barát törlése közben, kérjük próbálja meg később.",
                status: "error",
            });

            return;
        }

        const user = this.store.friendsScreenStore.user;
        if (!user) return;

        const userClone = {
            ...user,
            friendshipId: undefined,
            userAlreadyFriend: false,
        } as IUser;

        this.storeService.setFriendsScreenUser(userClone);
    };

    /* TODO lecserélni screen endpointra */
    initEditScreen = async () => {
        const loggedInUserId = tokenStorage.getUserId();
        if (!loggedInUserId) return;

        this.storeService.resetStore();

        const response = await userApi.fetchUser(loggedInUserId);
        if (response?.status !== 200 || response?.statusText !== "OK" || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt a felhasználó betöltése közben, kérjük próbálja meg később.",
                status: "error",
            });

            return;
        }

        this.storeService.setEditScreenUserEditFormValues(
            transformUserProfileResponseDto2UserEditFormValues(response.data.data)
        );
    };

    editUser = async (values: UserEditFormValues, actions: FormikHelpers<UserEditFormValues>): Promise<boolean> => {
        const loggedInUserId = tokenStorage.getUserId();
        if (!loggedInUserId) return false;

        const response = await userApi.editUser(
            loggedInUserId,
            transformUserEditFormValues2UserUpdateRequestDto(values)
        );
        if (response?.status !== 200 || response?.statusText !== "OK" || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt a felhasználó szerkesztése közben, kérjük próbálja meg később.",
                status: "error",
            });

            actions.setSubmitting(false);

            return false;
        }

        this.storeService.setEditScreenUserEditFormValues(
            transformUserProfileResponseDto2UserEditFormValues(response.data.data)
        );

        return true;
    };

    private updatePostInStore = (updatedPost: IPost) => {
        const postsClone = [...this.store.timelineScreenStore.posts];

        const postIndex = postsClone.findIndex((post) => post.id === updatedPost.id);
        if (postIndex !== -1) {
            postsClone[postIndex] = updatedPost;
        }

        this.storeService.setTimelineScreenPosts(postsClone, this.store.timelineScreenStore.postsTotalElementCount);
    };

    private updatePostCommentsInStore = (postId: string, comments: IComment[], commentCount?: number) => {
        const postsClone = [...this.store.timelineScreenStore.posts];

        const postIndex = postsClone.findIndex((post) => post.id === postId);
        if (postIndex !== -1) {
            postsClone[postIndex] = {
                ...postsClone[postIndex],
                comments: comments,
                commentCount: commentCount ?? postsClone[postIndex].commentCount,
            };
        }

        this.storeService.setTimelineScreenPosts(postsClone, this.store.timelineScreenStore.postsTotalElementCount);
    };
}

export default new UserController(defaultUserStore, userStoreService);
