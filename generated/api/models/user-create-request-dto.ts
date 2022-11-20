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
 * @interface UserCreateRequestDto
 */
export interface UserCreateRequestDto {
    /**
     * 
     * @type {string}
     * @memberof UserCreateRequestDto
     */
    'email': string;
    /**
     * 
     * @type {string}
     * @memberof UserCreateRequestDto
     */
    'password': string;
    /**
     * 
     * @type {string}
     * @memberof UserCreateRequestDto
     */
    'firstName': string;
    /**
     * 
     * @type {string}
     * @memberof UserCreateRequestDto
     */
    'lastName': string;
    /**
     * 
     * @type {string}
     * @memberof UserCreateRequestDto
     */
    'birthDate': string;
    /**
     * 
     * @type {string}
     * @memberof UserCreateRequestDto
     */
    'birthCountry'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserCreateRequestDto
     */
    'birthCity'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserCreateRequestDto
     */
    'currentCountry'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserCreateRequestDto
     */
    'currentCity'?: string;
}

