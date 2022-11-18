import { TReaction } from "./commonTypes";
import { IConversationMember } from "../../conversation/services/conversationTypes";

export const getUnicodeStringByReaction = (reaction: TReaction): string => {
    switch (reaction) {
        case "LIKE":
            return String.fromCodePoint(0x1f44d);
        case "HEART":
            return String.fromCodePoint(0x2764);
        case "FUNNY":
            return String.fromCodePoint(0x1f602);
        case "ANGRY":
            return String.fromCodePoint(0x1f621);
    }
};
export const getConversationTitle = (members: IConversationMember[], maxChars?: number): string => {
    const titleFull = members.map((member) => member.userName).join(", ");

    return maxChars && titleFull.length > maxChars ? titleFull.substring(0, maxChars).concat("...") : titleFull;
};
