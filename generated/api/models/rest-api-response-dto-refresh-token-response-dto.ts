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
import { RefreshTokenResponseDto } from './refresh-token-response-dto';

/**
 * 
 * @export
 * @interface RestApiResponseDtoRefreshTokenResponseDto
 */
export interface RestApiResponseDtoRefreshTokenResponseDto {
    /**
     * 
     * @type {number}
     * @memberof RestApiResponseDtoRefreshTokenResponseDto
     */
    'httpStatusCode': number;
    /**
     * 
     * @type {Array<string>}
     * @memberof RestApiResponseDtoRefreshTokenResponseDto
     */
    'messages': Array<string>;
    /**
     * 
     * @type {RefreshTokenResponseDto}
     * @memberof RestApiResponseDtoRefreshTokenResponseDto
     */
    'data'?: RefreshTokenResponseDto;
}

