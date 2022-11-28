import { CreateMessageFormValues } from "../../conversationTypes";
import { MessageCreateRequestDto } from "../../../../../generated/api";

export const transformCreateMessageFormValues2MessageCreateRequestDto = (
    createMessageFormValues: CreateMessageFormValues
): MessageCreateRequestDto => {
    return {
        content: createMessageFormValues.content,
    };
};
