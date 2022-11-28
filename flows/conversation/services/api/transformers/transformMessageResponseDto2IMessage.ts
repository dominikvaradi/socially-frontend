import { MessageResponseDto } from "../../../../../generated/api";
import { IMessage } from "../../conversationTypes";
import { transformReactionCountResponseDtoArray2IReactionCount } from "../../../../common/services/api/transformers/transformReactionCountResponseDtoArray2IReactionCount";
import { calculateCreatedTimeString } from "../../../../common/services/commonUtils";

export const transformMessageResponseDto2IMessage = (messageResponseDto: MessageResponseDto): IMessage => {
    return {
        id: messageResponseDto.id,
        userId: messageResponseDto.userId,
        userName: `${messageResponseDto.userLastName} ${messageResponseDto.userFirstName}`,
        content: messageResponseDto.content,
        writtenBySelf: messageResponseDto.createdByCurrentUser,
        reactionCount: transformReactionCountResponseDtoArray2IReactionCount(messageResponseDto.reactionsCount),
        createdTimeString: calculateCreatedTimeString(messageResponseDto.created),
        activeReactionOfUser: messageResponseDto.currentUsersReaction,
    };
};
