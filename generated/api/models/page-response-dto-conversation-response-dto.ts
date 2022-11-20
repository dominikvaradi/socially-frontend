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
import { ConversationResponseDto } from './conversation-response-dto';

/**
 * 
 * @export
 * @interface PageResponseDtoConversationResponseDto
 */
export interface PageResponseDtoConversationResponseDto {
    /**
     * 
     * @type {number}
     * @memberof PageResponseDtoConversationResponseDto
     */
    'totalPages': number;
    /**
     * 
     * @type {number}
     * @memberof PageResponseDtoConversationResponseDto
     */
    'totalElements': number;
    /**
     * 
     * @type {number}
     * @memberof PageResponseDtoConversationResponseDto
     */
    'size': number;
    /**
     * 
     * @type {number}
     * @memberof PageResponseDtoConversationResponseDto
     */
    'numberOfElements': number;
    /**
     * 
     * @type {Array<ConversationResponseDto>}
     * @memberof PageResponseDtoConversationResponseDto
     */
    'elements': Array<ConversationResponseDto>;
}
