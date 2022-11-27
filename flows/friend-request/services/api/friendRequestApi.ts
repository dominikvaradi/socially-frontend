import { AxiosPromise } from "axios";
import { friendshipApi } from "../../../common/apiHandler";
import {
    RestApiResponseDtoFriendRequestIncomingResponseDto,
    RestApiResponseDtoFriendRequestOutgoingResponseDto,
    RestApiResponseDtoPageResponseDtoFriendRequestIncomingResponseDto,
    RestApiResponseDtoPageResponseDtoFriendRequestOutgoingResponseDto,
} from "../../../../generated/api";

export const friendRequestApi = {
    fetchIncomingFriendRequests: (
        page: number,
        size: number
    ): AxiosPromise<RestApiResponseDtoPageResponseDtoFriendRequestIncomingResponseDto> =>
        friendshipApi().findAllIncomingFriendRequestsForCurrentUser(page, size),

    fetchOutgoingFriendRequests: (
        page: number,
        size: number
    ): AxiosPromise<RestApiResponseDtoPageResponseDtoFriendRequestOutgoingResponseDto> =>
        friendshipApi().findAllOutgoingFriendRequestsForCurrentUser(page, size),

    acceptIncomingFriendRequest: (
        friendshipId: string
    ): AxiosPromise<RestApiResponseDtoFriendRequestIncomingResponseDto> =>
        friendshipApi().acceptIncomingFriendRequest(friendshipId),

    declineIncomingFriendRequest: (
        friendshipId: string
    ): AxiosPromise<RestApiResponseDtoFriendRequestIncomingResponseDto> =>
        friendshipApi().declineIncomingFriendRequest(friendshipId),

    revokeOutgoingFriendRequest: (
        friendshipId: string
    ): AxiosPromise<RestApiResponseDtoFriendRequestOutgoingResponseDto> =>
        friendshipApi().revokeOutgoingFriendRequest(friendshipId),
};
