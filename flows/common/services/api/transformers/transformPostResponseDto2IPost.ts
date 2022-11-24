import { IPost } from "../../commonTypes";
import { PostResponseDto } from "../../../../../generated/api";
import { transformReactionCountResponseDtoArray2IReactionCount } from "./transformReactionCountResponseDtoArray2IReactionCount";
import { calculateCreatedTimeString } from "../../commonUtils";
import tokenStorage from "../../../tokenStorage";

export const transformPostResponseDto2IPost = (postResponseDto: PostResponseDto): IPost => {
    return {
        id: postResponseDto.id,
        header: postResponseDto.header,
        content: postResponseDto.content,
        authorId: postResponseDto.authorId,
        authorName: `${postResponseDto.authorLastName} ${postResponseDto.authorFirstName}`,
        addresseeId: postResponseDto.addresseeId,
        addresseeName: `${postResponseDto.addresseeLastName} ${postResponseDto.addresseeFirstName}`,
        commentCount: postResponseDto.commentsCount,
        createdTimeString: calculateCreatedTimeString(postResponseDto.created),
        reactionCount: transformReactionCountResponseDtoArray2IReactionCount(postResponseDto.reactionsCount),
        activeReactionOfUser: postResponseDto.currentUsersReaction,
        editable: postResponseDto.authorId === tokenStorage.getUserId(),
        deletable:
            postResponseDto.authorId === tokenStorage.getUserId() ||
            postResponseDto.addresseeId === tokenStorage.getUserId(),
        comments: [],
    };
};
