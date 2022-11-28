import {
    IConversationAddUsersToConversationScreenStore,
    IConversationConversationMembersScreenStore,
    IConversationConversationScreenStore,
    IConversationConversationsListScreenStore,
    IConversationNewConversationScreenStore,
} from "./conversationTypes";

export type TConversationStore = {
    conversationsListScreenStore: IConversationConversationsListScreenStore;
    newConversationScreenStore: IConversationNewConversationScreenStore;
    conversationScreenStore: IConversationConversationScreenStore;
    conversationMembersScreenStore: IConversationConversationMembersScreenStore;
    addUsersToConversationScreenStore: IConversationAddUsersToConversationScreenStore;
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
    conversationMembersScreenStore: {
        conversation: undefined,
        conversationLoading: true,
        userRoleAdmin: false,
    },
    addUsersToConversationScreenStore: {
        conversation: undefined,
        conversationLoading: true,
        searchItemUsers: [],
        searchItemUsersLoading: false,
        submitting: false,
    },
};
