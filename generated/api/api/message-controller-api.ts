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
import { EmptyRestApiResponseDto } from '../models';
// @ts-ignore
import { Reaction } from '../models';
// @ts-ignore
import { ReactionToggleRequestDto } from '../models';
// @ts-ignore
import { RestApiResponseDtoMessageResponseDto } from '../models';
// @ts-ignore
import { RestApiResponseDtoPageResponseDtoMessageReactionResponseDto } from '../models';
/**
 * MessageControllerApi - axios parameter creator
 * @export
 */
export const MessageControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} messageId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteMessage: async (messageId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'messageId' is not null or undefined
            assertParamExists('deleteMessage', 'messageId', messageId)
            const localVarPath = `/messages/{messageId}`
                .replace(`{${"messageId"}}`, encodeURIComponent(String(messageId)));
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
         * @param {string} messageId 
         * @param {Reaction} [reaction] 
         * @param {number} [page] Zero-based page index (0..N)
         * @param {number} [size] The size of the page to be returned
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        findAllReactionsByMessage: async (messageId: string, reaction?: Reaction, page?: number, size?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'messageId' is not null or undefined
            assertParamExists('findAllReactionsByMessage', 'messageId', messageId)
            const localVarPath = `/messages/{messageId}/reactions`
                .replace(`{${"messageId"}}`, encodeURIComponent(String(messageId)));
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

            if (reaction !== undefined) {
                localVarQueryParameter['reaction'] = reaction;
            }

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
         * @param {string} messageId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        findMessageByPublicId: async (messageId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'messageId' is not null or undefined
            assertParamExists('findMessageByPublicId', 'messageId', messageId)
            const localVarPath = `/messages/{messageId}`
                .replace(`{${"messageId"}}`, encodeURIComponent(String(messageId)));
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
         * @param {string} messageId 
         * @param {ReactionToggleRequestDto} reactionToggleRequestDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        toggleReactionOnMessage: async (messageId: string, reactionToggleRequestDto: ReactionToggleRequestDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'messageId' is not null or undefined
            assertParamExists('toggleReactionOnMessage', 'messageId', messageId)
            // verify required parameter 'reactionToggleRequestDto' is not null or undefined
            assertParamExists('toggleReactionOnMessage', 'reactionToggleRequestDto', reactionToggleRequestDto)
            const localVarPath = `/messages/{messageId}/reactions`
                .replace(`{${"messageId"}}`, encodeURIComponent(String(messageId)));
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
            localVarRequestOptions.data = serializeDataIfNeeded(reactionToggleRequestDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * MessageControllerApi - functional programming interface
 * @export
 */
export const MessageControllerApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = MessageControllerApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {string} messageId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteMessage(messageId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<EmptyRestApiResponseDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteMessage(messageId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} messageId 
         * @param {Reaction} [reaction] 
         * @param {number} [page] Zero-based page index (0..N)
         * @param {number} [size] The size of the page to be returned
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async findAllReactionsByMessage(messageId: string, reaction?: Reaction, page?: number, size?: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<RestApiResponseDtoPageResponseDtoMessageReactionResponseDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.findAllReactionsByMessage(messageId, reaction, page, size, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} messageId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async findMessageByPublicId(messageId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<RestApiResponseDtoMessageResponseDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.findMessageByPublicId(messageId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} messageId 
         * @param {ReactionToggleRequestDto} reactionToggleRequestDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async toggleReactionOnMessage(messageId: string, reactionToggleRequestDto: ReactionToggleRequestDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<RestApiResponseDtoMessageResponseDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.toggleReactionOnMessage(messageId, reactionToggleRequestDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * MessageControllerApi - factory interface
 * @export
 */
export const MessageControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = MessageControllerApiFp(configuration)
    return {
        /**
         * 
         * @param {string} messageId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteMessage(messageId: string, options?: any): AxiosPromise<EmptyRestApiResponseDto> {
            return localVarFp.deleteMessage(messageId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} messageId 
         * @param {Reaction} [reaction] 
         * @param {number} [page] Zero-based page index (0..N)
         * @param {number} [size] The size of the page to be returned
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        findAllReactionsByMessage(messageId: string, reaction?: Reaction, page?: number, size?: number, options?: any): AxiosPromise<RestApiResponseDtoPageResponseDtoMessageReactionResponseDto> {
            return localVarFp.findAllReactionsByMessage(messageId, reaction, page, size, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} messageId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        findMessageByPublicId(messageId: string, options?: any): AxiosPromise<RestApiResponseDtoMessageResponseDto> {
            return localVarFp.findMessageByPublicId(messageId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} messageId 
         * @param {ReactionToggleRequestDto} reactionToggleRequestDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        toggleReactionOnMessage(messageId: string, reactionToggleRequestDto: ReactionToggleRequestDto, options?: any): AxiosPromise<RestApiResponseDtoMessageResponseDto> {
            return localVarFp.toggleReactionOnMessage(messageId, reactionToggleRequestDto, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * MessageControllerApi - object-oriented interface
 * @export
 * @class MessageControllerApi
 * @extends {BaseAPI}
 */
export class MessageControllerApi extends BaseAPI {
    /**
     * 
     * @param {string} messageId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MessageControllerApi
     */
    public deleteMessage(messageId: string, options?: AxiosRequestConfig) {
        return MessageControllerApiFp(this.configuration).deleteMessage(messageId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} messageId 
     * @param {Reaction} [reaction] 
     * @param {number} [page] Zero-based page index (0..N)
     * @param {number} [size] The size of the page to be returned
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MessageControllerApi
     */
    public findAllReactionsByMessage(messageId: string, reaction?: Reaction, page?: number, size?: number, options?: AxiosRequestConfig) {
        return MessageControllerApiFp(this.configuration).findAllReactionsByMessage(messageId, reaction, page, size, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} messageId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MessageControllerApi
     */
    public findMessageByPublicId(messageId: string, options?: AxiosRequestConfig) {
        return MessageControllerApiFp(this.configuration).findMessageByPublicId(messageId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} messageId 
     * @param {ReactionToggleRequestDto} reactionToggleRequestDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MessageControllerApi
     */
    public toggleReactionOnMessage(messageId: string, reactionToggleRequestDto: ReactionToggleRequestDto, options?: AxiosRequestConfig) {
        return MessageControllerApiFp(this.configuration).toggleReactionOnMessage(messageId, reactionToggleRequestDto, options).then((request) => request(this.axios, this.basePath));
    }
}
