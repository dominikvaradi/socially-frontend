import { IComment } from "../../commonTypes";
import { CommentResponseDto } from "../../../../../generated/api";
import { calculateCreatedTimeString } from "../../commonUtils";
import { transformReactionCountResponseDtoArray2IReactionCount } from "./transformReactionCountResponseDtoArray2IReactionCount";
import tokenStorage from "../../../tokenStorage";

export const transformCommentResponseDto2IComment = (
    postAddresseeId: string,
    commentResponseDto: CommentResponseDto
): IComment => {
    return {
        id: commentResponseDto.id,
        postId: commentResponseDto.postId,
        content: commentResponseDto.content,
        authorId: commentResponseDto.authorId,
        authorName: `${commentResponseDto.authorLastName} ${commentResponseDto.authorFirstName}`,
        createdTimeString: calculateCreatedTimeString(commentResponseDto.created),
        reactionCount: transformReactionCountResponseDtoArray2IReactionCount(commentResponseDto.reactionsCount),
        activeReactionOfUser: commentResponseDto.currentUsersReaction,
        editable: commentResponseDto.authorId === tokenStorage.getUserId(),
        deletable:
            commentResponseDto.authorId === tokenStorage.getUserId() || postAddresseeId === tokenStorage.getUserId(),
    };
};
