import { AxiosPromise } from "axios";
import {
    EmptyRestApiResponseDto,
    PostCreateRequestDto,
    PostUpdateRequestDto,
    Reaction,
    RestApiResponseDtoPageResponseDtoPostResponseDto,
    RestApiResponseDtoPostResponseDto,
} from "../../../../generated/api";
import { postApi, userApi } from "../../../common/apiHandler";

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
};
