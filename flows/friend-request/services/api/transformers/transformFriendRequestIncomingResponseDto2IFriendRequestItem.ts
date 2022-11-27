import { IFriendRequestItem } from "../../friendRequestTypes";
import { FriendRequestIncomingResponseDto } from "../../../../../generated/api";

export const transformFriendRequestIncomingResponseDto2IFriendRequestItem = (
    friendRequestIncomingResponseDto: FriendRequestIncomingResponseDto
): IFriendRequestItem => {
    return {
        id: friendRequestIncomingResponseDto.id,
        userId: friendRequestIncomingResponseDto.requesterUserId,
        userName: `${friendRequestIncomingResponseDto.requesterUserLastName} ${friendRequestIncomingResponseDto.requesterUserFirstName}`,
    };
};
