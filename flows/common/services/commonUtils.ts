import { TReaction } from "./commonTypes";
import { IConversationMember } from "../../conversation/services/conversationTypes";
import moment from "moment";

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

export const calculateCreatedTimeString = (iso8601String: string): string => {
    const calculateFrom = moment(iso8601String);
    const now = moment();

    const years = now.diff(calculateFrom, "years");
    if (years >= 1) return `${years} éve`;

    const months = now.diff(calculateFrom, "months");
    if (months >= 1) return `${months} hónapja`;

    const days = now.diff(calculateFrom, "days");
    if (days >= 1) return `${days} napja`;

    const hours = now.diff(calculateFrom, "hours");
    if (hours >= 1) return `${hours} órája`;

    const minutes = now.diff(calculateFrom, "minutes");
    if (minutes >= 1) return `${minutes} perce`;

    const seconds = now.diff(calculateFrom, "seconds");
    if (seconds >= 1) return `${seconds} másodperce`;

    return "most";
};

export const formatDateToJSONString = (date: Date): string => {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date
        .getDate()
        .toString()
        .padStart(2, "0")}`;
};
