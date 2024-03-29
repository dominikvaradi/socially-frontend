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


// May contain unused imports in some cases
// @ts-ignore
import { FriendRequestIncomingResponseDto } from './friend-request-incoming-response-dto';

/**
 * 
 * @export
 * @interface PageResponseDtoFriendRequestIncomingResponseDto
 */
export interface PageResponseDtoFriendRequestIncomingResponseDto {
    /**
     * 
     * @type {number}
     * @memberof PageResponseDtoFriendRequestIncomingResponseDto
     */
    'totalPages': number;
    /**
     * 
     * @type {number}
     * @memberof PageResponseDtoFriendRequestIncomingResponseDto
     */
    'totalElements': number;
    /**
     * 
     * @type {number}
     * @memberof PageResponseDtoFriendRequestIncomingResponseDto
     */
    'size': number;
    /**
     * 
     * @type {number}
     * @memberof PageResponseDtoFriendRequestIncomingResponseDto
     */
    'numberOfElements': number;
    /**
     * 
     * @type {Array<FriendRequestIncomingResponseDto>}
     * @memberof PageResponseDtoFriendRequestIncomingResponseDto
     */
    'elements': Array<FriendRequestIncomingResponseDto>;
}

