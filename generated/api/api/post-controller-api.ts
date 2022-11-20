/* tslint:disable */
/* eslint-disable */
/**
 * Socially - Backend API
 * Socially is a full-stack web application for people, who want to socialize with other people.
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: varadidominik2000@gmail.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import globalAxios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { CommentCreateRequestDto } from '../models';
// @ts-ignore
import { EmptyRestApiResponseDto } from '../models';
// @ts-ignore
import { PostUpdateRequestDto } from '../models';
// @ts-ignore
import { Reaction } from '../models';
// @ts-ignore
import { ReactionCreateRequestDto } from '../models';
// @ts-ignore
import { RestApiResponseDtoCommentResponseDto } from '../models';
// @ts-ignore
import { RestApiResponseDtoPageResponseDtoCommentResponseDto } from '../models';
// @ts-ignore
import { RestApiResponseDtoPageResponseDtoPostReactionResponseDto } from '../models';
// @ts-ignore
import { RestApiResponseDtoPageResponseDtoPostResponseDto } from '../models';
// @ts-ignore
import { RestApiResponseDtoPostReactionResponseDto } from '../models';
// @ts-ignore
import { RestApiResponseDtoPostResponseDto } from '../models';
/**
 * PostControllerApi - axios parameter creator
 * @export
 */
export const PostControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} postId 
         * @param {CommentCreateRequestDto} commentCreateRequestDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createCommentOnPost: async (postId: string, commentCreateRequestDto: CommentCreateRequestDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'postId' is not null or undefined
            assertParamExists('createCommentOnPost', 'postId', postId)
            // verify required parameter 'commentCreateRequestDto' is not null or undefined
            assertParamExists('createCommentOnPost', 'commentCreateRequestDto', commentCreateRequestDto)
            const localVarPath = `/api/posts/{postId}/comments`
                .replace(`{${"postId"}}`, encodeURIComponent(String(postId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication BearerToken required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(commentCreateRequestDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} postId 
         * @param {ReactionCreateRequestDto} reactionCreateRequestDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createReactionOnPost: async (postId: string, reactionCreateRequestDto: ReactionCreateRequestDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'postId' is not null or undefined
            assertParamExists('createReactionOnPost', 'postId', postId)
            // verify required parameter 'reactionCreateRequestDto' is not null or undefined
            assertParamExists('createReactionOnPost', 'reactionCreateRequestDto', reactionCreateRequestDto)
            const localVarPath = `/api/posts/{postId}/reactions`
                .replace(`{${"postId"}}`, encodeURIComponent(String(postId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication BearerToken required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(reactionCreateRequestDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} postId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deletePost: async (postId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'postId' is not null or undefined
            assertParamExists('deletePost', 'postId', postId)
            const localVarPath = `/api/posts/{postId}`
                .replace(`{${"postId"}}`, encodeURIComponent(String(postId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication BearerToken required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} postId 
         * @param {Reaction} reaction 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteReactionFromPost: async (postId: string, reaction: Reaction, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'postId' is not null or undefined
            assertParamExists('deleteReactionFromPost', 'postId', postId)
            // verify required parameter 'reaction' is not null or undefined
            assertParamExists('deleteReactionFromPost', 'reaction', reaction)
            const localVarPath = `/api/posts/{postId}/reactions/{reaction}`
                .replace(`{${"postId"}}`, encodeURIComponent(String(postId)))
                .replace(`{${"reaction"}}`, encodeURIComponent(String(reaction)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication BearerToken required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} postId 
         * @param {number} [page] Zero-based page index (0..N)
         * @param {number} [size] The size of the page to be returned
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        findAllCommentsByPost: async (postId: string, page?: number, size?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'postId' is not null or undefined
            assertParamExists('findAllCommentsByPost', 'postId', postId)
            const localVarPath = `/api/posts/{postId}/comments`
                .replace(`{${"postId"}}`, encodeURIComponent(String(postId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication BearerToken required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
            }

            if (size !== undefined) {
                localVarQueryParameter['size'] = size;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {number} [page] Zero-based page index (0..N)
         * @param {number} [size] The size of the page to be returned
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        findAllPostsOnCurrentUsersFeed: async (page?: number, size?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/posts`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication BearerToken required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
            }

            if (size !== undefined) {
                localVarQueryParameter['size'] = size;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} postId 
         * @param {number} [page] Zero-based page index (0..N)
         * @param {number} [size] The size of the page to be returned
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        findAllReactionsByPost: async (postId: string, page?: number, size?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'postId' is not null or undefined
            assertParamExists('findAllReactionsByPost', 'postId', postId)
            const localVarPath = `/api/posts/{postId}/reactions`
                .replace(`{${"postId"}}`, encodeURIComponent(String(postId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication BearerToken required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
            }

            if (size !== undefined) {
                localVarQueryParameter['size'] = size;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} postId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        findPostByPublicId: async (postId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'postId' is not null or undefined
            assertParamExists('findPostByPublicId', 'postId', postId)
            const localVarPath = `/api/posts/{postId}`
                .replace(`{${"postId"}}`, encodeURIComponent(String(postId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication BearerToken required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} postId 
         * @param {PostUpdateRequestDto} postUpdateRequestDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updatePost: async (postId: string, postUpdateRequestDto: PostUpdateRequestDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'postId' is not null or undefined
            assertParamExists('updatePost', 'postId', postId)
            // verify required parameter 'postUpdateRequestDto' is not null or undefined
            assertParamExists('updatePost', 'postUpdateRequestDto', postUpdateRequestDto)
            const localVarPath = `/api/posts/{postId}`
                .replace(`{${"postId"}}`, encodeURIComponent(String(postId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication BearerToken required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(postUpdateRequestDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * PostControllerApi - functional programming interface
 * @export
 */
export const PostControllerApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = PostControllerApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {string} postId 
         * @param {CommentCreateRequestDto} commentCreateRequestDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createCommentOnPost(postId: string, commentCreateRequestDto: CommentCreateRequestDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<RestApiResponseDtoCommentResponseDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createCommentOnPost(postId, commentCreateRequestDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} postId 
         * @param {ReactionCreateRequestDto} reactionCreateRequestDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createReactionOnPost(postId: string, reactionCreateRequestDto: ReactionCreateRequestDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<RestApiResponseDtoPostReactionResponseDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createReactionOnPost(postId, reactionCreateRequestDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} postId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deletePost(postId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<EmptyRestApiResponseDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deletePost(postId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} postId 
         * @param {Reaction} reaction 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteReactionFromPost(postId: string, reaction: Reaction, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<EmptyRestApiResponseDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteReactionFromPost(postId, reaction, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} postId 
         * @param {number} [page] Zero-based page index (0..N)
         * @param {number} [size] The size of the page to be returned
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async findAllCommentsByPost(postId: string, page?: number, size?: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<RestApiResponseDtoPageResponseDtoCommentResponseDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.findAllCommentsByPost(postId, page, size, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {number} [page] Zero-based page index (0..N)
         * @param {number} [size] The size of the page to be returned
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async findAllPostsOnCurrentUsersFeed(page?: number, size?: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<RestApiResponseDtoPageResponseDtoPostResponseDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.findAllPostsOnCurrentUsersFeed(page, size, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} postId 
         * @param {number} [page] Zero-based page index (0..N)
         * @param {number} [size] The size of the page to be returned
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async findAllReactionsByPost(postId: string, page?: number, size?: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<RestApiResponseDtoPageResponseDtoPostReactionResponseDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.findAllReactionsByPost(postId, page, size, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} postId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async findPostByPublicId(postId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<RestApiResponseDtoPostResponseDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.findPostByPublicId(postId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} postId 
         * @param {PostUpdateRequestDto} postUpdateRequestDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updatePost(postId: string, postUpdateRequestDto: PostUpdateRequestDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<RestApiResponseDtoPostResponseDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updatePost(postId, postUpdateRequestDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * PostControllerApi - factory interface
 * @export
 */
export const PostControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = PostControllerApiFp(configuration)
    return {
        /**
         * 
         * @param {string} postId 
         * @param {CommentCreateRequestDto} commentCreateRequestDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createCommentOnPost(postId: string, commentCreateRequestDto: CommentCreateRequestDto, options?: any): AxiosPromise<RestApiResponseDtoCommentResponseDto> {
            return localVarFp.createCommentOnPost(postId, commentCreateRequestDto, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} postId 
         * @param {ReactionCreateRequestDto} reactionCreateRequestDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createReactionOnPost(postId: string, reactionCreateRequestDto: ReactionCreateRequestDto, options?: any): AxiosPromise<RestApiResponseDtoPostReactionResponseDto> {
            return localVarFp.createReactionOnPost(postId, reactionCreateRequestDto, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} postId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deletePost(postId: string, options?: any): AxiosPromise<EmptyRestApiResponseDto> {
            return localVarFp.deletePost(postId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} postId 
         * @param {Reaction} reaction 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteReactionFromPost(postId: string, reaction: Reaction, options?: any): AxiosPromise<EmptyRestApiResponseDto> {
            return localVarFp.deleteReactionFromPost(postId, reaction, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} postId 
         * @param {number} [page] Zero-based page index (0..N)
         * @param {number} [size] The size of the page to be returned
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        findAllCommentsByPost(postId: string, page?: number, size?: number, options?: any): AxiosPromise<RestApiResponseDtoPageResponseDtoCommentResponseDto> {
            return localVarFp.findAllCommentsByPost(postId, page, size, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} [page] Zero-based page index (0..N)
         * @param {number} [size] The size of the page to be returned
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        findAllPostsOnCurrentUsersFeed(page?: number, size?: number, options?: any): AxiosPromise<RestApiResponseDtoPageResponseDtoPostResponseDto> {
            return localVarFp.findAllPostsOnCurrentUsersFeed(page, size, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} postId 
         * @param {number} [page] Zero-based page index (0..N)
         * @param {number} [size] The size of the page to be returned
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        findAllReactionsByPost(postId: string, page?: number, size?: number, options?: any): AxiosPromise<RestApiResponseDtoPageResponseDtoPostReactionResponseDto> {
            return localVarFp.findAllReactionsByPost(postId, page, size, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} postId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        findPostByPublicId(postId: string, options?: any): AxiosPromise<RestApiResponseDtoPostResponseDto> {
            return localVarFp.findPostByPublicId(postId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} postId 
         * @param {PostUpdateRequestDto} postUpdateRequestDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updatePost(postId: string, postUpdateRequestDto: PostUpdateRequestDto, options?: any): AxiosPromise<RestApiResponseDtoPostResponseDto> {
            return localVarFp.updatePost(postId, postUpdateRequestDto, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * PostControllerApi - object-oriented interface
 * @export
 * @class PostControllerApi
 * @extends {BaseAPI}
 */
export class PostControllerApi extends BaseAPI {
    /**
     * 
     * @param {string} postId 
     * @param {CommentCreateRequestDto} commentCreateRequestDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PostControllerApi
     */
    public createCommentOnPost(postId: string, commentCreateRequestDto: CommentCreateRequestDto, options?: AxiosRequestConfig) {
        return PostControllerApiFp(this.configuration).createCommentOnPost(postId, commentCreateRequestDto, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} postId 
     * @param {ReactionCreateRequestDto} reactionCreateRequestDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PostControllerApi
     */
    public createReactionOnPost(postId: string, reactionCreateRequestDto: ReactionCreateRequestDto, options?: AxiosRequestConfig) {
        return PostControllerApiFp(this.configuration).createReactionOnPost(postId, reactionCreateRequestDto, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} postId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PostControllerApi
     */
    public deletePost(postId: string, options?: AxiosRequestConfig) {
        return PostControllerApiFp(this.configuration).deletePost(postId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} postId 
     * @param {Reaction} reaction 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PostControllerApi
     */
    public deleteReactionFromPost(postId: string, reaction: Reaction, options?: AxiosRequestConfig) {
        return PostControllerApiFp(this.configuration).deleteReactionFromPost(postId, reaction, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} postId 
     * @param {number} [page] Zero-based page index (0..N)
     * @param {number} [size] The size of the page to be returned
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PostControllerApi
     */
    public findAllCommentsByPost(postId: string, page?: number, size?: number, options?: AxiosRequestConfig) {
        return PostControllerApiFp(this.configuration).findAllCommentsByPost(postId, page, size, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {number} [page] Zero-based page index (0..N)
     * @param {number} [size] The size of the page to be returned
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PostControllerApi
     */
    public findAllPostsOnCurrentUsersFeed(page?: number, size?: number, options?: AxiosRequestConfig) {
        return PostControllerApiFp(this.configuration).findAllPostsOnCurrentUsersFeed(page, size, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} postId 
     * @param {number} [page] Zero-based page index (0..N)
     * @param {number} [size] The size of the page to be returned
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PostControllerApi
     */
    public findAllReactionsByPost(postId: string, page?: number, size?: number, options?: AxiosRequestConfig) {
        return PostControllerApiFp(this.configuration).findAllReactionsByPost(postId, page, size, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} postId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PostControllerApi
     */
    public findPostByPublicId(postId: string, options?: AxiosRequestConfig) {
        return PostControllerApiFp(this.configuration).findPostByPublicId(postId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} postId 
     * @param {PostUpdateRequestDto} postUpdateRequestDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PostControllerApi
     */
    public updatePost(postId: string, postUpdateRequestDto: PostUpdateRequestDto, options?: AxiosRequestConfig) {
        return PostControllerApiFp(this.configuration).updatePost(postId, postUpdateRequestDto, options).then((request) => request(this.axios, this.basePath));
    }
}
