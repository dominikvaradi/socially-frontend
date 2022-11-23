import { ConversationResponseDto } from "../../../../../generated/api";
import { IConversation } from "../../commonTypes";
import { transformConversationUserResponseDto2IConversationMember } from "./transformConversationUserResponseDto2IConversationMember";

export const transformConversationResponseDto2IConversation = (
    conversationResponseDto: ConversationResponseDto
): IConversation => {
    return {
        id: conversationResponseDto.id,
        members: conversationResponseDto.members.map(transformConversationUserResponseDto2IConversationMember),
        type: conversationResponseDto.type,
    };
};
