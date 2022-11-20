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
import { ReactionCountResponseDto } from './reaction-count-response-dto';

/**
 * 
 * @export
 * @interface CommentResponseDto
 */
export interface CommentResponseDto {
    /**
     * 
     * @type {string}
     * @memberof CommentResponseDto
     */
    'id': string;
    /**
     * 
     * @type {string}
     * @memberof CommentResponseDto
     */
    'content': string;
    /**
     * 
     * @type {string}
     * @memberof CommentResponseDto
     */
    'postId': string;
    /**
     * 
     * @type {string}
     * @memberof CommentResponseDto
     */
    'authorId': string;
    /**
     * 
     * @type {string}
     * @memberof CommentResponseDto
     */
    'authorFirstName': string;
    /**
     * 
     * @type {string}
     * @memberof CommentResponseDto
     */
    'authorLastName'?: string;
    /**
     * 
     * @type {string}
     * @memberof CommentResponseDto
     */
    'created': string;
    /**
     * 
     * @type {Set<ReactionCountResponseDto>}
     * @memberof CommentResponseDto
     */
    'reactionsCount': Set<ReactionCountResponseDto>;
}

