export interface ILastConversation {
    id: string;
    userName: string;
}

export interface IPost {
    id: string;
    header?: string;
    content: string;
    authorId: string;
    authorName: string;
    commentCount: number;
    createdTimeString: string;
    reactionCount: IReactionCount;
    activeReactionOfUser?: TReaction;
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

export interface IComment {
    id: string;
    content: string;
    authorId: string;
    authorName: string;
    createdTimeString: string;
    reactionCount: IReactionCount;
    activeReactionOfUser?: TReaction;
}

export interface CreateCommentFormValues {
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
