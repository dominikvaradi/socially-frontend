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



/**
 * 
 * @export
 * @enum {string}
 */

export const Reaction = {
    LIKE: 'LIKE',
    HEART: 'HEART',
    FUNNY: 'FUNNY',
    ANGRY: 'ANGRY'
} as const;

export type Reaction = typeof Reaction[keyof typeof Reaction];



