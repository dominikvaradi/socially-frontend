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
import { CommentReactionResponseDto } from './comment-reaction-response-dto';

/**
 * 
 * @export
 * @interface PageResponseDtoCommentReactionResponseDto
 */
export interface PageResponseDtoCommentReactionResponseDto {
    /**
     * 
     * @type {number}
     * @memberof PageResponseDtoCommentReactionResponseDto
     */
    'totalPages': number;
    /**
     * 
     * @type {number}
     * @memberof PageResponseDtoCommentReactionResponseDto
     */
    'totalElements': number;
    /**
     * 
     * @type {number}
     * @memberof PageResponseDtoCommentReactionResponseDto
     */
    'size': number;
    /**
     * 
     * @type {number}
     * @memberof PageResponseDtoCommentReactionResponseDto
     */
    'numberOfElements': number;
    /**
     * 
     * @type {Array<CommentReactionResponseDto>}
     * @memberof PageResponseDtoCommentReactionResponseDto
     */
    'elements': Array<CommentReactionResponseDto>;
}

