import { MessageReactionResponseDto } from "../../../../../generated/api";
import { IReactionListItem } from "../../../../common/services/commonTypes";

export const transformMessageReactionResponseDto2IReactionListItem = (
    messageReactionResponseDto: MessageReactionResponseDto
): IReactionListItem => {
    return {
        id: messageReactionResponseDto.id,
        userId: messageReactionResponseDto.userId,
        userName: `${messageReactionResponseDto.userLastName} ${messageReactionResponseDto.userFirstName}`,
        reaction: messageReactionResponseDto.reaction,
    };
};
