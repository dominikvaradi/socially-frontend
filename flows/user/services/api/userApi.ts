import { AxiosPromise } from "axios";
import {
    CommentCreateRequestDto,
    CommentUpdateRequestDto,
    EmptyRestApiResponseDto,
    PostCreateRequestDto,
    PostUpdateRequestDto,
    Reaction,
    RestApiResponseDtoCommentResponseDto,
    RestApiResponseDtoFriendRequestIncomingResponseDto,
    RestApiResponseDtoFriendRequestOutgoingResponseDto,
    RestApiResponseDtoPageResponseDtoCommentReactionResponseDto,
    RestApiResponseDtoPageResponseDtoCommentResponseDto,
    RestApiResponseDtoPageResponseDtoPostReactionResponseDto,
    RestApiResponseDtoPageResponseDtoPostResponseDto,
    RestApiResponseDtoPageResponseDtoUserSearchResponseDto,
    RestApiResponseDtoPostResponseDto,
    RestApiResponseDtoUserProfileResponseDto,
    UserUpdateRequestDto,
} from "../../../../generated/api";
import { commentApi, friendshipApi, postApi, userApi } from "../../../common/apiHandler";

export const api = {
    fetchUser: (userId: string): AxiosPromise<RestApiResponseDtoUserProfileResponseDto> =>
        userApi().findUserByPublicId(userId),

    fetchPostsForUser: (
        userId: string,
        page: number,
        size: number
    ): AxiosPromise<RestApiResponseDtoPageResponseDtoPostResponseDto> =>
        userApi().findAllPostsOfUser(userId, page, size),

    createPost: (
        userId: string,
        postCreateRequestDto: PostCreateRequestDto
    ): AxiosPromise<RestApiResponseDtoPostResponseDto> => userApi().createPostOnUser(userId, postCreateRequestDto),

    toggleReactionOnPost: (postId: string, reaction: Reaction): AxiosPromise<RestApiResponseDtoPostResponseDto> =>
        postApi().toggleReactionOnPost(postId, { reaction }),

    editPost: (
        postId: string,
        postUpdateRequestDto: PostUpdateRequestDto
    ): AxiosPromise<RestApiResponseDtoPostResponseDto> => postApi().updatePost(postId, postUpdateRequestDto),

    deletePost: (postId: string): AxiosPromise<EmptyRestApiResponseDto> => postApi().deletePost(postId),

    fetchCommentsForPost: (
        postId: string,
        page: number,
        size: number
    ): AxiosPromise<RestApiResponseDtoPageResponseDtoCommentResponseDto> =>
        postApi().findAllCommentsByPost(postId, page, size),

    createComment: (
        postId: string,
        commentCreateRequestDto: CommentCreateRequestDto
    ): AxiosPromise<RestApiResponseDtoCommentResponseDto> =>
        postApi().createCommentOnPost(postId, commentCreateRequestDto),

    toggleReactionOnComment: (
        commentId: string,
        reaction: Reaction
    ): AxiosPromise<RestApiResponseDtoCommentResponseDto> =>
        commentApi().toggleReactionOnComment(commentId, { reaction }),

    editComment: (
        commentId: string,
        commentUpdateRequestDto: CommentUpdateRequestDto
    ): AxiosPromise<RestApiResponseDtoCommentResponseDto> =>
        commentApi().updateComment(commentId, commentUpdateRequestDto),

    deleteComment: (commentId: string): AxiosPromise<EmptyRestApiResponseDto> => commentApi().deleteComment(commentId),

    fetchPostReactions: (
        postId: string,
        page: number,
        size: number,
        reaction?: Reaction
    ): AxiosPromise<RestApiResponseDtoPageResponseDtoPostReactionResponseDto> =>
        postApi().findAllReactionsByPost(postId, reaction, page, size),

    fetchCommentReactions: (
        commentId: string,
        page: number,
        size: number,
        reaction?: Reaction
    ): AxiosPromise<RestApiResponseDtoPageResponseDtoCommentReactionResponseDto> =>
        commentApi().findAllReactionsByComment(commentId, reaction, page, size),

    revokeOutgoingFriendRequest: (
        friendshipId: string
    ): AxiosPromise<RestApiResponseDtoFriendRequestOutgoingResponseDto> =>
        friendshipApi().revokeOutgoingFriendRequest(friendshipId),

    sendFriendRequest: (addresseeUserId: string): AxiosPromise<RestApiResponseDtoFriendRequestOutgoingResponseDto> =>
        friendshipApi().createNewFriendRequest({ addresseeUserId: addresseeUserId }),

    acceptIncomingFriendRequest: (
        friendshipId: string
    ): AxiosPromise<RestApiResponseDtoFriendRequestIncomingResponseDto> =>
        friendshipApi().acceptIncomingFriendRequest(friendshipId),

    declineIncomingFriendRequest: (
        friendshipId: string
    ): AxiosPromise<RestApiResponseDtoFriendRequestIncomingResponseDto> =>
        friendshipApi().declineIncomingFriendRequest(friendshipId),

    deleteFriend: (friendshipId: string): AxiosPromise<EmptyRestApiResponseDto> =>
        friendshipApi().deleteFriendship(friendshipId),

    fetchFriendsOfUser: (
        userId: string,
        page: number,
        size: number
    ): AxiosPromise<RestApiResponseDtoPageResponseDtoUserSearchResponseDto> =>
        userApi().findAllFriendsOfUser(userId, page, size),

    editUser: (userId: string, userUpdateRequestDto: UserUpdateRequestDto) =>
        userApi().updateUser(userId, userUpdateRequestDto),
};
