import { AxiosPromise } from "axios";
import {
    RestApiResponseDtoPageResponseDtoConversationResponseDto,
    RestApiResponseDtoPageResponseDtoUserSearchResponseDto,
} from "../../../../generated/api";
import { conversationApi, userApi } from "../../apiHandler";

export const commonApi = {
    fetchLast10ConversationsOfUser: (): AxiosPromise<RestApiResponseDtoPageResponseDtoConversationResponseDto> =>
        conversationApi().findAllConversationsByCurrentUser(0, 10),

    fetchHeaderBarSearchPopoverSearchItems: (
        searchTerm: string,
        page: number,
        size: number
    ): AxiosPromise<RestApiResponseDtoPageResponseDtoUserSearchResponseDto> =>
        userApi().findAllUsersByName(searchTerm, page, size),
};
