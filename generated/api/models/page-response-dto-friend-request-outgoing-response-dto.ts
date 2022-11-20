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
import { FriendRequestOutgoingResponseDto } from './friend-request-outgoing-response-dto';

/**
 * 
 * @export
 * @interface PageResponseDtoFriendRequestOutgoingResponseDto
 */
export interface PageResponseDtoFriendRequestOutgoingResponseDto {
    /**
     * 
     * @type {number}
     * @memberof PageResponseDtoFriendRequestOutgoingResponseDto
     */
    'totalPages': number;
    /**
     * 
     * @type {number}
     * @memberof PageResponseDtoFriendRequestOutgoingResponseDto
     */
    'totalElements': number;
    /**
     * 
     * @type {number}
     * @memberof PageResponseDtoFriendRequestOutgoingResponseDto
     */
    'size': number;
    /**
     * 
     * @type {number}
     * @memberof PageResponseDtoFriendRequestOutgoingResponseDto
     */
    'numberOfElements': number;
    /**
     * 
     * @type {Array<FriendRequestOutgoingResponseDto>}
     * @memberof PageResponseDtoFriendRequestOutgoingResponseDto
     */
    'elements': Array<FriendRequestOutgoingResponseDto>;
}

