import {
    IConversationConversationScreenStore,
    IConversationConversationsListScreenStore,
    IConversationNewConversationScreenStore,
} from "./conversationTypes";

export type TConversationStore = {
    conversationsListScreenStore: IConversationConversationsListScreenStore;
    newConversationScreenStore: IConversationNewConversationScreenStore;
    conversationScreenStore: IConversationConversationScreenStore;
};

export const defaultConversationStore: TConversationStore = {
    conversationsListScreenStore: {
        conversations: [],
        conversationsLoading: true,
        conversationsTotalElementCount: 0,
    },
    newConversationScreenStore: {
        searchItemUsers: [],
        searchItemUsersLoading: false,
        submitting: false,
    },
    conversationScreenStore: {
        conversation: undefined,
        conversationLoading: true,
        messages: [],
        messagesLoading: true,
        messagesTotalElementCount: 0,
        reactionListReactionItems: [],
        reactionListReactionItemsLoading: true,
        reactionListReactionItemsTotalElementCount: 0,
    },
};
