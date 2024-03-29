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
import { Reaction } from './reaction';

/**
 * 
 * @export
 * @interface CommentReactionResponseDto
 */
export interface CommentReactionResponseDto {
    /**
     * 
     * @type {string}
     * @memberof CommentReactionResponseDto
     */
    'id': string;
    /**
     * 
     * @type {string}
     * @memberof CommentReactionResponseDto
     */
    'commentId': string;
    /**
     * 
     * @type {string}
     * @memberof CommentReactionResponseDto
     */
    'userId': string;
    /**
     * 
     * @type {string}
     * @memberof CommentReactionResponseDto
     */
    'userFirstName': string;
    /**
     * 
     * @type {string}
     * @memberof CommentReactionResponseDto
     */
    'userLastName': string;
    /**
     * 
     * @type {Reaction}
     * @memberof CommentReactionResponseDto
     */
    'reaction': Reaction;
}

