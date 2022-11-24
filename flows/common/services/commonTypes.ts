import { IConversationMember } from "../../conversation/services/conversationTypes";

export interface IConversation {
    id: string;
    members: IConversationMember[];
    type: TConversationType;
}

export type TConversationType = "DIRECT" | "GROUP";

export interface IPost {
    id: string;
    header?: string;
    content: string;
    authorId: string;
    authorName: string;
    addresseeId: string;
    addresseeName: string;
    commentCount: number;
    createdTimeString: string;
    reactionCount: IReactionCount;
    activeReactionOfUser?: TReaction;
    editable: boolean;
    deletable: boolean;
    comments: IComment[];
}

export type TReaction = "LIKE" | "HEART" | "FUNNY" | "ANGRY";

export interface IReactionCount {
    likeCount: number;
    heartCount: number;
    funnyCount: number;
    angryCount: number;
}

export interface CreatePostFormValues {
    header: string;
    content: string;
}

export interface EditPostFormValues {
    header: string;
    content: string;
}

export interface IComment {
    id: string;
    postId: string;
    content: string;
    authorId: string;
    authorName: string;
    createdTimeString: string;
    reactionCount: IReactionCount;
    activeReactionOfUser?: TReaction;
    editable: boolean;
    deletable: boolean;
}

export interface CreateCommentFormValues {
    content: string;
}

export interface EditCommentFormValues {
    content: string;
}

export interface IReactionListItem {
    id: string;
    userId: string;
    userName: string;
    reaction: TReaction;
}

export type TIconPosition = "left" | "right";

export interface ISearchItemUser {
    userId: string;
    userName: string;
}

export enum TokenStorageKey {
    ACCESS_TOKEN = "ACCESS_TOKEN",
    REFRESH_TOKEN = "REFRESH_TOKEN",
    USER_ID = "USER_ID",
    USER_NAME = "USER_NAME",
}
