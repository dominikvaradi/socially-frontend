import { IReactionListItem } from "../../commonTypes";
import { PostReactionResponseDto } from "../../../../../generated/api";

export const transformPostReactionResponseDto2IReactionListItem = (
    postReactionResponseDto: PostReactionResponseDto
): IReactionListItem => {
    return {
        id: postReactionResponseDto.id,
        userId: postReactionResponseDto.userId,
        userName: `${postReactionResponseDto.userLastName} ${postReactionResponseDto.userFirstName}`,
        reaction: postReactionResponseDto.reaction,
    };
};
