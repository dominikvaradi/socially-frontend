import {
    IConversation,
    IReactionCount,
    IReactionListItem,
    ISearchItemUser,
    TReaction,
} from "../../common/services/commonTypes";

export interface IConversationConversationsListScreenStore {
    conversations: IConversation[];
    conversationsLoading: boolean;
    conversationsTotalElementCount: number;
}

export interface IConversationNewConversationScreenStore {
    searchItemUsers: ISearchItemUser[];
    searchItemUsersLoading: boolean;
    submitting: boolean;
}

export interface IConversationConversationScreenStore {
    conversation?: IConversation;
    conversationLoading: boolean;
    messages: IMessage[];
    messagesLoading: boolean;
    messagesTotalElementCount: number;
    reactionListReactionItems: IReactionListItem[];
    reactionListReactionItemsLoading: boolean;
    reactionListReactionItemsTotalElementCount: number;
}

export interface IConversationConversationMembersScreenStore {
    conversation?: IConversation;
    conversationLoading: boolean;
    userRoleAdmin: boolean;
}

export interface IConversationAddUsersToConversationScreenStore {
    conversation?: IConversation;
    conversationLoading: boolean;
    searchItemUsers: ISearchItemUser[];
    searchItemUsersLoading: boolean;
    submitting: boolean;
}

export interface IConversationMember {
    userId: string;
    userName: string;
    role: TConversationRole;
}

export type TConversationRole = "NORMAL" | "ADMIN";

export interface IMessage {
    id: string;
    userId: string;
    userName: string;
    content: string;
    writtenBySelf: boolean;
    reactionCount: IReactionCount;
    createdTimeString: string;
    activeReactionOfUser?: TReaction;
}

export interface CreateMessageFormValues {
    content: string;
}
