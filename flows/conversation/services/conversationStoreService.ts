import BaseStoreService from "../../common/services/BaseStoreService";
import { defaultConversationStore, TConversationStore } from "./conversationStore";
import { IConversation, IReactionListItem, ISearchItemUser } from "../../common/services/commonTypes";
import { IMessage } from "./conversationTypes";

export class ConversationStoreService extends BaseStoreService<TConversationStore> {
    resetStore = () => {
        this.setStore((draftStore) => {
            draftStore = defaultConversationStore;
        });
    };

    setConversationsListScreenConversationsLoading = (conversationsLoading: boolean) => {
        this.setStore((draftStore) => {
            draftStore.conversationsListScreenStore.conversationsLoading = conversationsLoading;
        });
    };

    setConversationsListScreenConversations = (conversations: IConversation[], totalElementCount: number) => {
        this.setStore((draftStore) => {
            draftStore.conversationsListScreenStore.conversations = conversations;
            draftStore.conversationsListScreenStore.conversationsTotalElementCount = totalElementCount;
        });
    };

    setConversationsListScreenConversationsAndLoadingFalse = (
        conversations: IConversation[],
        totalElementCount: number
    ) => {
        this.setStore((draftStore) => {
            draftStore.conversationsListScreenStore.conversations = conversations;
            draftStore.conversationsListScreenStore.conversationsTotalElementCount = totalElementCount;
            draftStore.conversationsListScreenStore.conversationsLoading = false;
        });
    };

    setNewConversationScreenSearchItemUsersAndLoading = (
        searchItemUsers: ISearchItemUser[],
        searchItemUsersLoading: boolean
    ) => {
        this.setStore((draftStore) => {
            draftStore.newConversationScreenStore.searchItemUsers = searchItemUsers;
            draftStore.newConversationScreenStore.searchItemUsersLoading = searchItemUsersLoading;
        });
    };

    setNewConversationScreenSearchItemUsersLoading = (searchItemUsersLoading: boolean) => {
        this.setStore((draftStore) => {
            draftStore.newConversationScreenStore.searchItemUsersLoading = searchItemUsersLoading;
        });
    };

    setNewConversationScreenSubmitting = (submitting: boolean) => {
        this.setStore((draftStore) => {
            draftStore.newConversationScreenStore.submitting = submitting;
        });
    };

    setConversationScreenConversationLoading = (conversationLoading: boolean) => {
        this.setStore((draftStore) => {
            draftStore.conversationScreenStore.conversationLoading = conversationLoading;
        });
    };

    setConversationScreenConversationAndLoadingFalse = (conversation?: IConversation) => {
        this.setStore((draftStore) => {
            draftStore.conversationScreenStore.conversation = conversation;
            draftStore.conversationScreenStore.conversationLoading = false;
        });
    };

    setConversationScreenMessagesLoading = (messagesLoading: boolean) => {
        this.setStore((draftStore) => {
            draftStore.conversationScreenStore.messagesLoading = messagesLoading;
        });
    };

    setConversationScreenMessages = (messages: IMessage[], totalElementCount: number) => {
        this.setStore((draftStore) => {
            draftStore.conversationScreenStore.messages = messages;
            draftStore.conversationScreenStore.messagesTotalElementCount = totalElementCount;
        });
    };

    setConversationScreenMessagesAndLoadingFalse = (messages: IMessage[], totalElementCount: number) => {
        this.setStore((draftStore) => {
            draftStore.conversationScreenStore.messages = messages;
            draftStore.conversationScreenStore.messagesTotalElementCount = totalElementCount;
            draftStore.conversationScreenStore.messagesLoading = false;
        });
    };

    setConversationScreenReactionListReactionItemsLoading = (reactionItemsLoading: boolean) => {
        this.setStore((draftStore) => {
            draftStore.conversationScreenStore.reactionListReactionItemsLoading = reactionItemsLoading;
        });
    };

    setConversationScreenReactionListReactionItemsAndLoading = (
        reactionItems: IReactionListItem[],
        totalElementCount: number,
        reactionItemsLoading: boolean
    ) => {
        this.setStore((draftStore) => {
            draftStore.conversationScreenStore.reactionListReactionItems = reactionItems;
            draftStore.conversationScreenStore.reactionListReactionItemsTotalElementCount = totalElementCount;
            draftStore.conversationScreenStore.reactionListReactionItemsLoading = reactionItemsLoading;
        });
    };

    setConversationMembersScreenConversationLoading = (conversationLoading: boolean) => {
        this.setStore((draftStore) => {
            draftStore.conversationMembersScreenStore.conversationLoading = conversationLoading;
        });
    };

    setConversationMembersScreenConversationAndUserRoleAdminAndLoadingFalse = (
        userRoleAdmin: boolean,
        conversation?: IConversation
    ) => {
        this.setStore((draftStore) => {
            draftStore.conversationMembersScreenStore.conversation = conversation;
            draftStore.conversationMembersScreenStore.conversationLoading = false;
            draftStore.conversationMembersScreenStore.userRoleAdmin = userRoleAdmin;
        });
    };

    setConversationMembersScreenConversationAndUserRoleAdmin = (
        userRoleAdmin: boolean,
        conversation?: IConversation
    ) => {
        this.setStore((draftStore) => {
            draftStore.conversationMembersScreenStore.conversation = conversation;
            draftStore.conversationMembersScreenStore.userRoleAdmin = userRoleAdmin;
        });
    };

    setConversationMembersScreenConversation = (conversation?: IConversation) => {
        this.setStore((draftStore) => {
            draftStore.conversationMembersScreenStore.conversation = conversation;
        });
    };

    setAddUsersToConversationScreenConversationLoading = (conversationLoading: boolean) => {
        this.setStore((draftStore) => {
            draftStore.addUsersToConversationScreenStore.conversationLoading = conversationLoading;
        });
    };

    setAddUsersToConversationScreenConversationAndLoadingFalse = (conversation?: IConversation) => {
        this.setStore((draftStore) => {
            draftStore.addUsersToConversationScreenStore.conversation = conversation;
            draftStore.addUsersToConversationScreenStore.conversationLoading = false;
        });
    };

    setAddUsersToConversationScreenSearchItemUsersAndLoading = (
        searchItemUsers: ISearchItemUser[],
        searchItemUsersLoading: boolean
    ) => {
        this.setStore((draftStore) => {
            draftStore.addUsersToConversationScreenStore.searchItemUsers = searchItemUsers;
            draftStore.addUsersToConversationScreenStore.searchItemUsersLoading = searchItemUsersLoading;
        });
    };

    setAddUsersToConversationScreenSearchItemUsersLoading = (searchItemUsersLoading: boolean) => {
        this.setStore((draftStore) => {
            draftStore.addUsersToConversationScreenStore.searchItemUsersLoading = searchItemUsersLoading;
        });
    };

    setAddUsersToConversationScreenSubmitting = (submitting: boolean) => {
        this.setStore((draftStore) => {
            draftStore.addUsersToConversationScreenStore.submitting = submitting;
        });
    };
}

export default new ConversationStoreService(defaultConversationStore, () => {
    /* Empty on purpose */
});
