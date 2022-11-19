import { IReactionCount, TReaction } from "../../common/services/commonTypes";

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

export interface ChangeConversationRoleAlertDialogSubject {
    userId: string;
    role: TConversationRole;
}

export interface IConversation {
    id: string;
    members: IConversationMember[];
    type: TConversationType;
}

export type TConversationType = "DIRECT" | "GROUP";
