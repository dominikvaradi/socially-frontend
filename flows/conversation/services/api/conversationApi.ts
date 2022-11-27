import { AxiosPromise } from "axios";
import { conversationApi, messageApi, userApi } from "../../../common/apiHandler";
import {
    EmptyRestApiResponseDto,
    MessageCreateRequestDto,
    RestApiResponseDtoConversationResponseDto,
    RestApiResponseDtoMessageResponseDto,
    RestApiResponseDtoPageResponseDtoConversationResponseDto,
    RestApiResponseDtoPageResponseDtoMessageResponseDto,
    RestApiResponseDtoPageResponseDtoUserSearchResponseDto,
} from "../../../../generated/api";
import { TReaction } from "../../../common/services/commonTypes";

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
};
