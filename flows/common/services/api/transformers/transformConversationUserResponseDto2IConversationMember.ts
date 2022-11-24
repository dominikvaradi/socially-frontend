import { ConversationUserResponseDto } from "../../../../../generated/api";
import { IConversationMember } from "../../../../conversation/services/conversationTypes";

export const transformConversationUserResponseDto2IConversationMember = (
    conversationUserResponseDto: ConversationUserResponseDto
): IConversationMember => {
    return {
        userId: conversationUserResponseDto.userId,
        userName: `${conversationUserResponseDto.userLastName} ${conversationUserResponseDto.userFirstName}`,
        role: conversationUserResponseDto.userConversationRole,
    };
};
