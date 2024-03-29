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
import { PageResponseDtoFriendRequestOutgoingResponseDto } from './page-response-dto-friend-request-outgoing-response-dto';

/**
 * 
 * @export
 * @interface RestApiResponseDtoPageResponseDtoFriendRequestOutgoingResponseDto
 */
export interface RestApiResponseDtoPageResponseDtoFriendRequestOutgoingResponseDto {
    /**
     * 
     * @type {number}
     * @memberof RestApiResponseDtoPageResponseDtoFriendRequestOutgoingResponseDto
     */
    'httpStatusCode': number;
    /**
     * 
     * @type {Array<string>}
     * @memberof RestApiResponseDtoPageResponseDtoFriendRequestOutgoingResponseDto
     */
    'messages': Array<string>;
    /**
     * 
     * @type {PageResponseDtoFriendRequestOutgoingResponseDto}
     * @memberof RestApiResponseDtoPageResponseDtoFriendRequestOutgoingResponseDto
     */
    'data'?: PageResponseDtoFriendRequestOutgoingResponseDto;
}

