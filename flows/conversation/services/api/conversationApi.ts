import { AxiosPromise } from "axios";
import { conversationApi, messageApi, userApi } from "../../../common/apiHandler";
import {
    EmptyRestApiResponseDto,
    MessageCreateRequestDto,
    RestApiResponseDtoConversationResponseDto,
    RestApiResponseDtoConversationUserResponseDto,
    RestApiResponseDtoMessageResponseDto,
    RestApiResponseDtoPageResponseDtoConversationResponseDto,
    RestApiResponseDtoPageResponseDtoMessageResponseDto,
    RestApiResponseDtoPageResponseDtoUserSearchResponseDto,
    RestApiResponseDtoSetConversationUserResponseDto,
} from "../../../../generated/api";
import { TReaction } from "../../../common/services/commonTypes";
import { TConversationRole } from "../conversationTypes";

export const api = {
    fetchConversations: (
        page: number,
        size: number
    ): AxiosPromise<RestApiResponseDtoPageResponseDtoConversationResponseDto> =>
        conversationApi().findAllConversationsByCurrentUser(page, size),

    fetchFriendsOfUser: (
        userId: string,
        searchTerm: string,
        page: number,
        size: number
    ): AxiosPromise<RestApiResponseDtoPageResponseDtoUserSearchResponseDto> =>
        userApi().findAllFriendsOfUser(userId, searchTerm, page, size),

    createConversation: (memberUserIds: string[]): AxiosPromise<RestApiResponseDtoConversationResponseDto> =>
        conversationApi().createConversation({ memberUserIds: memberUserIds }),

    fetchConversation: (conversationId: string): AxiosPromise<RestApiResponseDtoConversationResponseDto> =>
        conversationApi().findConversationByPublicId(conversationId),

    fetchMessagesForConversation: (
        conversationId: string,
        page: number,
        size: number
    ): AxiosPromise<RestApiResponseDtoPageResponseDtoMessageResponseDto> =>
        conversationApi().findMessagesByConversation(conversationId, page, size),

    createMessageInConversation: (
        conversationId: string,
        messageCreateRequestDto: MessageCreateRequestDto
    ): AxiosPromise<RestApiResponseDtoMessageResponseDto> =>
        conversationApi().createMessageInConversation(conversationId, messageCreateRequestDto),

    deleteMessage: (messageId: string): AxiosPromise<EmptyRestApiResponseDto> => messageApi().deleteMessage(messageId),

    toggleReactionOnMessage: (
        messageId: string,
        reaction: TReaction
    ): AxiosPromise<RestApiResponseDtoMessageResponseDto> =>
        messageApi().toggleReactionOnMessage(messageId, { reaction: reaction }),

    fetchMessageReactions: (messageId: string, page: number, size: number, reaction?: TReaction) =>
        messageApi().findAllReactionsByMessage(messageId, reaction, page, size),

    changeRoleOfUserInConversation: (
        conversationId: string,
        userId: string,
        role: TConversationRole
    ): AxiosPromise<RestApiResponseDtoConversationUserResponseDto> =>
        conversationApi().updateUsersRoleInConversation(conversationId, userId, { role: role }),

    removeUserOfConversation: (conversationId: string, userId: string): AxiosPromise<EmptyRestApiResponseDto> =>
        conversationApi().removeUserFromConversation(conversationId, userId),

    addUsersToConversation: (
        conversationId: string,
        memberUserIds: string[]
    ): AxiosPromise<RestApiResponseDtoSetConversationUserResponseDto> =>
        conversationApi().addUsersToConversation(conversationId, { memberUserIds: memberUserIds }),
};
