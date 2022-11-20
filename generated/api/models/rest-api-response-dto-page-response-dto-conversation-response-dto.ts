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
import { PageResponseDtoConversationResponseDto } from './page-response-dto-conversation-response-dto';

/**
 * 
 * @export
 * @interface RestApiResponseDtoPageResponseDtoConversationResponseDto
 */
export interface RestApiResponseDtoPageResponseDtoConversationResponseDto {
    /**
     * 
     * @type {number}
     * @memberof RestApiResponseDtoPageResponseDtoConversationResponseDto
     */
    'httpStatusCode': number;
    /**
     * 
     * @type {Array<string>}
     * @memberof RestApiResponseDtoPageResponseDtoConversationResponseDto
     */
    'messages': Array<string>;
    /**
     * 
     * @type {PageResponseDtoConversationResponseDto}
     * @memberof RestApiResponseDtoPageResponseDtoConversationResponseDto
     */
    'data'?: PageResponseDtoConversationResponseDto;
}

