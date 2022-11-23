import { UserSearchResponseDto } from "../../../../../generated/api";
import { ISearchItemUser } from "../../commonTypes";

export const transformUserSearchResponseDto2ISearchItemUser = (
    userSearchResponseDto: UserSearchResponseDto
): ISearchItemUser => {
    return {
        userId: userSearchResponseDto.id,
        userName: `${userSearchResponseDto.lastName} ${userSearchResponseDto.firstName}`,
    };
};
