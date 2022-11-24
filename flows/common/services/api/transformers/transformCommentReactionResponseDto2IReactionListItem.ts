import { IReactionListItem } from "../../commonTypes";
import { CommentReactionResponseDto } from "../../../../../generated/api";

export const transformCommentReactionResponseDto2IReactionListItem = (
    commentReactionResponseDto: CommentReactionResponseDto
): IReactionListItem => {
    return {
        id: commentReactionResponseDto.id,
        userId: commentReactionResponseDto.userId,
        userName: `${commentReactionResponseDto.userLastName} ${commentReactionResponseDto.userFirstName}`,
        reaction: commentReactionResponseDto.reaction,
    };
};
