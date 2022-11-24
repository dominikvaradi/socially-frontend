import { AxiosPromise } from "axios";
import {
    CommentCreateRequestDto,
    CommentUpdateRequestDto,
    EmptyRestApiResponseDto,
    PostCreateRequestDto,
    PostUpdateRequestDto,
    Reaction,
    RestApiResponseDtoCommentResponseDto,
    RestApiResponseDtoPageResponseDtoCommentResponseDto,
    RestApiResponseDtoPageResponseDtoPostResponseDto,
    RestApiResponseDtoPostResponseDto,
} from "../../../../generated/api";
import { commentApi, postApi, userApi } from "../../../common/apiHandler";

export const homeApi = {
    fetchPosts: (page: number, size: number): AxiosPromise<RestApiResponseDtoPageResponseDtoPostResponseDto> =>
        postApi().findAllPostsOnCurrentUsersFeed(page, size),

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

    fetchPostReactions: (postId: string, page: number, size: number, reaction?: Reaction) =>
        postApi().findAllReactionsByPost(postId, reaction, page, size),

    fetchCommentReactions: (commentId: string, page: number, size: number, reaction?: Reaction) =>
        commentApi().findAllReactionsByComment(commentId, reaction, page, size),
};
