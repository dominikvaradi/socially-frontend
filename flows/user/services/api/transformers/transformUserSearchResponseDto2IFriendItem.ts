import { UserSearchResponseDto } from "../../../../../generated/api";
import { IFriendItem } from "../../userTypes";

export const transformUserSearchResponseDto2IFriendItem = (
    userSearchResponseDto: UserSearchResponseDto
): IFriendItem => {
    return {
        userId: userSearchResponseDto.id,
        userName: `${userSearchResponseDto.lastName} ${userSearchResponseDto.firstName}`,
    };
};
