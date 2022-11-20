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
import { CommentResponseDto } from './comment-response-dto';

/**
 * 
 * @export
 * @interface PageResponseDtoCommentResponseDto
 */
export interface PageResponseDtoCommentResponseDto {
    /**
     * 
     * @type {number}
     * @memberof PageResponseDtoCommentResponseDto
     */
    'totalPages': number;
    /**
     * 
     * @type {number}
     * @memberof PageResponseDtoCommentResponseDto
     */
    'totalElements': number;
    /**
     * 
     * @type {number}
     * @memberof PageResponseDtoCommentResponseDto
     */
    'size': number;
    /**
     * 
     * @type {number}
     * @memberof PageResponseDtoCommentResponseDto
     */
    'numberOfElements': number;
    /**
     * 
     * @type {Array<CommentResponseDto>}
     * @memberof PageResponseDtoCommentResponseDto
     */
    'elements': Array<CommentResponseDto>;
}
