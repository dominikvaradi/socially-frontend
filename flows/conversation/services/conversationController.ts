import BaseController from "../../common/services/BaseController";
import { defaultConversationStore, TConversationStore } from "./conversationStore";
import conversationStoreService, { ConversationStoreService } from "./conversationStoreService";
import { api as conversationApi } from "./api/conversationApi";
import { transformConversationResponseDto2IConversation } from "../../common/services/api/transformers/transformConversationResponseDto2IConversation";
import tokenStorage from "../../common/tokenStorage";
import { transformUserSearchResponseDto2ISearchItemUser } from "../../common/services/api/transformers/transformUserSearchResponseDto2ISearchItemUser";
import { transformMessageResponseDto2IMessage } from "./api/transformers/transformMessageResponseDto2IMessage";
import { CreateMessageFormValues, IMessage } from "./conversationTypes";
import { FormikHelpers } from "formik";
import { transformCreateMessageFormValues2MessageCreateRequestDto } from "./api/transformers/transformCreateMessageFormValues2MessageCreateRequestDto";
import { TReaction } from "../../common/services/commonTypes";
import { transformMessageReactionResponseDto2IReactionListItem } from "./api/transformers/transformMessageReactionResponseDto2IReactionListItem";

const CONVERSATIONS_FETCH_SIZE = 10;
const USER_FRIENDS_FETCH_SIZE = 10;
const MESSAGES_FETCH_SIZE = 10;
const REACTIONS_FETCH_SIZE = 10;

export class ConversationController extends BaseController<TConversationStore, ConversationStoreService> {
    initConversationsListScreen = async () => {
        this.storeService.resetStore();

        const response = await conversationApi.fetchConversations(0, CONVERSATIONS_FETCH_SIZE);
        if (response?.status !== 200 || response?.statusText !== "OK" || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt a beszélgetések betöltése közben, kérjük próbálja meg később.",
                status: "error",
            });

            this.storeService.setConversationsListScreenConversationsLoading(false);

            return;
        }

        this.storeService.setConversationsListScreenConversationsAndLoadingFalse(
            response.data.data.elements.map(transformConversationResponseDto2IConversation),
            response.data.data.totalElements
        );
    };

    loadMoreConversations = async () => {
        this.storeService.setConversationsListScreenConversationsLoading(true);
        if (
            this.store.conversationsListScreenStore.conversations.length >=
            this.store.conversationsListScreenStore.conversationsTotalElementCount
        ) {
            return;
        }

        const response = await conversationApi.fetchConversations(
            Math.floor(this.store.conversationsListScreenStore.conversations.length / CONVERSATIONS_FETCH_SIZE),
            CONVERSATIONS_FETCH_SIZE
        );
        if (response?.status !== 200 || response?.statusText !== "OK" || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt a beszélgetések betöltése közben, kérjük próbálja meg később.",
                status: "error",
            });

            this.storeService.setConversationsListScreenConversationsLoading(false);

            return;
        }

        const newConversations = [
            ...this.store.conversationsListScreenStore.conversations,
            ...response.data.data.elements
                .filter(
                    (conversationResponseDto) =>
                        !this.store.conversationsListScreenStore.conversations.find(
                            (c) => c.id === conversationResponseDto.id
                        )
                )
                .map(transformConversationResponseDto2IConversation),
        ];

        this.storeService.setConversationsListScreenConversationsAndLoadingFalse(
            newConversations,
            response.data.data.totalElements
        );
    };

    initNewConversationScreen = () => {
        this.storeService.resetStore();
    };

    searchFriendsOfCurrentUser = async (searchTerm: string) => {
        this.storeService.setNewConversationScreenSearchItemUsersAndLoading([], true);

        const loggedInUserId = tokenStorage.getUserId();
        if (!loggedInUserId) return;

        const response = await conversationApi.fetchFriendsOfUser(
            loggedInUserId,
            searchTerm,
            0,
            USER_FRIENDS_FETCH_SIZE
        );
        if (response?.status !== 200 || response?.statusText !== "OK" || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt a barátok keresése közben, kérjük próbálja meg később.",
                status: "error",
            });

            this.storeService.setNewConversationScreenSearchItemUsersLoading(false);

            return;
        }

        this.storeService.setNewConversationScreenSearchItemUsersAndLoading(
            response.data.data.elements.map(transformUserSearchResponseDto2ISearchItemUser),
            false
        );
    };

    createConversation = async (memberUserIds: string[]) => {
        this.storeService.setNewConversationScreenSubmitting(true);

        const response = await conversationApi.createConversation(memberUserIds);
        if (response?.status !== 200 || response?.statusText !== "OK" || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt a beszélgetés létrehozása közben, kérjük próbálja meg később.",
                status: "error",
            });

            this.storeService.setNewConversationScreenSubmitting(false);

            return;
        }

        this.router?.push(`/conversation/${response.data.data.id}`);

        this.storeService.setNewConversationScreenSubmitting(false);
    };

    /* TODO screen endpoint */
    initConversationScreen = async (conversationId: string) => {
        this.storeService.resetStore();

        const conversationResponse = await conversationApi.fetchConversation(conversationId);
        if (
            conversationResponse?.status !== 200 ||
            conversationResponse?.statusText !== "OK" ||
            !conversationResponse?.data?.data
        ) {
            this.showToast({
                title: "Váratlan hiba történt a beszélgetés betöltése közben, kérjük próbálja meg később.",
                status: "error",
            });

            this.storeService.setConversationScreenConversationLoading(false);

            return;
        }

        this.storeService.setConversationScreenConversationAndLoadingFalse(
            transformConversationResponseDto2IConversation(conversationResponse.data.data)
        );

        this.storeService.setConversationScreenMessagesLoading(true);

        const messagesResponse = await conversationApi.fetchMessagesForConversation(
            conversationId,
            0,
            MESSAGES_FETCH_SIZE
        );
        if (
            messagesResponse?.status !== 200 ||
            messagesResponse?.statusText !== "OK" ||
            !messagesResponse?.data?.data
        ) {
            this.showToast({
                title: "Váratlan hiba történt az üzenetek betöltése közben, kérjük próbálja meg később.",
                status: "error",
            });

            this.storeService.setConversationScreenMessagesLoading(false);

            return;
        }

        this.storeService.setConversationScreenMessagesAndLoadingFalse(
            messagesResponse.data.data.elements.map(transformMessageResponseDto2IMessage),
            messagesResponse.data.data.totalElements
        );
    };

    loadMoreMessages = async () => {
        const conversationId = this.store.conversationScreenStore.conversation?.id;
        if (!conversationId) return;

        this.storeService.setConversationScreenMessagesLoading(true);

        const response = await conversationApi.fetchMessagesForConversation(
            conversationId,
            Math.floor(this.store.conversationScreenStore.messages.length / MESSAGES_FETCH_SIZE),
            MESSAGES_FETCH_SIZE
        );
        if (response?.status !== 200 || response?.statusText !== "OK" || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt az üzenetek betöltése közben, kérjük próbálja meg később.",
                status: "error",
            });

            this.storeService.setConversationScreenMessagesLoading(false);

            return;
        }

        const newMessages = [
            ...this.store.conversationScreenStore.messages,
            ...response.data.data.elements
                .filter(
                    (messageResponseDto) =>
                        !this.store.conversationScreenStore.messages.find((m) => m.id === messageResponseDto.id)
                )
                .map(transformMessageResponseDto2IMessage),
        ];

        this.storeService.setConversationScreenMessagesAndLoadingFalse(newMessages, response.data.data.totalElements);
    };

    createMessage = async (
        values: CreateMessageFormValues,
        actions: FormikHelpers<CreateMessageFormValues>
    ): Promise<boolean> => {
        const conversationId = this.store.conversationScreenStore.conversation?.id;
        if (!conversationId) return false;

        const response = await conversationApi.createMessageInConversation(
            conversationId,
            transformCreateMessageFormValues2MessageCreateRequestDto(values)
        );
        if (response?.status !== 200 || response?.statusText !== "OK" || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt az üzenet létrehozása közben, kérjük próbálja meg később.",
                status: "error",
            });

            actions.setSubmitting(false);

            return false;
        }

        const newMessages = [
            transformMessageResponseDto2IMessage(response.data.data),
            ...this.store.conversationScreenStore.messages,
        ];

        this.storeService.setConversationScreenMessages(
            newMessages,
            this.store.conversationScreenStore.messagesTotalElementCount + 1
        );

        actions.resetForm();

        return true;
    };

    deleteMessage = async (message: IMessage) => {
        const response = await conversationApi.deleteMessage(message.id);
        if (response?.status !== 200 || response?.statusText !== "OK") {
            this.showToast({
                title: "Váratlan hiba történt az üzenet törlése közben, kérjük próbálja meg később.",
                status: "error",
            });

            return;
        }

        const newMessages = [...this.store.conversationScreenStore.messages];
        const messageIndex = newMessages.findIndex((m) => m.id === message.id);
        if (messageIndex !== -1) {
            newMessages.splice(messageIndex, 1);
        }

        this.storeService.setConversationScreenMessages(
            newMessages,
            this.store.conversationScreenStore.messagesTotalElementCount - 1
        );
    };

    toggleReactionOnMessage = async (message: IMessage, reaction: TReaction) => {
        const response = await conversationApi.toggleReactionOnMessage(message.id, reaction);
        if (response?.status !== 200 || response?.statusText !== "OK" || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt a reakció módosítása közben, kérjük próbálja meg később.",
                status: "error",
            });

            return;
        }

        const newMessages = [...this.store.conversationScreenStore.messages];

        const messageIndex = newMessages.findIndex((m) => m.id === message.id);
        if (messageIndex === -1) return;

        newMessages[messageIndex] = transformMessageResponseDto2IMessage(response.data.data);

        this.storeService.setConversationScreenMessages(
            newMessages,
            this.store.conversationScreenStore.messagesTotalElementCount
        );
    };

    loadReactionsForMessage = async (message: IMessage, reaction?: TReaction): Promise<boolean> => {
        this.storeService.setConversationScreenReactionListReactionItemsAndLoading([], 0, true);

        const response = await conversationApi.fetchMessageReactions(message.id, 0, REACTIONS_FETCH_SIZE, reaction);
        if (response?.status !== 200 || response?.statusText !== "OK" || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt a reakciók betöltése közben, kérjük próbálja meg később.",
                status: "error",
            });

            this.storeService.setConversationScreenReactionListReactionItemsLoading(false);

            return false;
        }

        this.storeService.setConversationScreenReactionListReactionItemsAndLoading(
            response.data.data.elements.map(transformMessageReactionResponseDto2IReactionListItem),
            response.data.data.totalElements,
            false
        );

        return true;
    };

    loadMoreReactionsForMessage = async (message: IMessage, reaction?: TReaction) => {
        this.storeService.setConversationScreenReactionListReactionItemsLoading(true);

        const response = await conversationApi.fetchMessageReactions(
            message.id,
            Math.floor(this.store.conversationScreenStore.reactionListReactionItems.length / REACTIONS_FETCH_SIZE),
            REACTIONS_FETCH_SIZE,
            reaction
        );
        if (response?.status !== 200 || response?.statusText !== "OK" || !response?.data?.data) {
            this.showToast({
                title: "Váratlan hiba történt a reakciók betöltése közben, kérjük próbálja meg később.",
                status: "error",
            });

            this.storeService.setConversationScreenReactionListReactionItemsLoading(false);

            return;
        }

        const newReactionItems = [
            ...this.store.conversationScreenStore.reactionListReactionItems,
            ...response.data.data.elements
                .filter(
                    (messageReactionResponseDto) =>
                        !this.store.conversationScreenStore.reactionListReactionItems.find(
                            (item) => item.id === messageReactionResponseDto.id
                        )
                )
                .map(transformMessageReactionResponseDto2IReactionListItem),
        ];

        this.storeService.setConversationScreenReactionListReactionItemsAndLoading(
            newReactionItems,
            response.data.data.totalElements,
            false
        );
    };

    navigateToConversationPage = (conversationId: string) => {
        this.router?.push(`/conversation/${conversationId}`);
    };

    navigateToNewConversationPage = () => {
        this.router?.push("/new-conversation");
    };

    navigateToConversationsListPage = () => {
        this.router?.push("/conversation");
    };

    navigateToUserTimelinePage = (userId: string) => {
        this.router?.push(`/user/${userId}`);
    };

    navigateToConversationMembersPage = (conversationId: string) => {
        this.router?.push(`/conversation/${conversationId}/members`);
    };
}

export default new ConversationController(defaultConversationStore, conversationStoreService);
