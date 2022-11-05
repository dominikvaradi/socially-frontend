import { TReaction } from "./commonTypes";

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
