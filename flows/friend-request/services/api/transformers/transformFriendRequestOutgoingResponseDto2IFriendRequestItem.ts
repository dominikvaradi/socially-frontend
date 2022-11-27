import { IFriendRequestItem } from "../../friendRequestTypes";
import { FriendRequestOutgoingResponseDto } from "../../../../../generated/api";

export const transformFriendRequestOutgoingResponseDto2IFriendRequestItem = (
    friendRequestOutgoingResponseDto: FriendRequestOutgoingResponseDto
): IFriendRequestItem => {
    return {
        id: friendRequestOutgoingResponseDto.id,
        userId: friendRequestOutgoingResponseDto.addresseeUserId,
        userName: `${friendRequestOutgoingResponseDto.addresseeUserLastName} ${friendRequestOutgoingResponseDto.addresseeUserFirstName}`,
    };
};
