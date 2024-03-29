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
// May contain unused imports in some cases
// @ts-ignore
import { ReactionCountResponseDto } from './reaction-count-response-dto';

/**
 * 
 * @export
 * @interface PostResponseDto
 */
export interface PostResponseDto {
    /**
     * 
     * @type {string}
     * @memberof PostResponseDto
     */
    'id': string;
    /**
     * 
     * @type {string}
     * @memberof PostResponseDto
     */
    'header'?: string;
    /**
     * 
     * @type {string}
     * @memberof PostResponseDto
     */
    'content': string;
    /**
     * 
     * @type {string}
     * @memberof PostResponseDto
     */
    'authorId': string;
    /**
     * 
     * @type {string}
     * @memberof PostResponseDto
     */
    'authorFirstName': string;
    /**
     * 
     * @type {string}
     * @memberof PostResponseDto
     */
    'authorLastName': string;
    /**
     * 
     * @type {string}
     * @memberof PostResponseDto
     */
    'addresseeId': string;
    /**
     * 
     * @type {string}
     * @memberof PostResponseDto
     */
    'addresseeFirstName': string;
    /**
     * 
     * @type {string}
     * @memberof PostResponseDto
     */
    'addresseeLastName': string;
    /**
     * 
     * @type {string}
     * @memberof PostResponseDto
     */
    'created': string;
    /**
     * 
     * @type {Array<ReactionCountResponseDto>}
     * @memberof PostResponseDto
     */
    'reactionsCount': Array<ReactionCountResponseDto>;
    /**
     * 
     * @type {number}
     * @memberof PostResponseDto
     */
    'commentsCount': number;
    /**
     * 
     * @type {Reaction}
     * @memberof PostResponseDto
     */
    'currentUsersReaction'?: Reaction;
}

