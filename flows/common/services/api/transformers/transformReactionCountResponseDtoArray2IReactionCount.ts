import { ReactionCountResponseDto } from "../../../../../generated/api";
import { IReactionCount } from "../../commonTypes";

export const transformReactionCountResponseDtoArray2IReactionCount = (
    reactionCountResponseDtoArray: ReactionCountResponseDto[]
): IReactionCount => {
    return {
        likeCount:
            reactionCountResponseDtoArray.find(
                (reactionCountResponseDto) => reactionCountResponseDto.reaction === "LIKE"
            )?.count ?? 0,
        heartCount:
            reactionCountResponseDtoArray.find(
                (reactionCountResponseDto) => reactionCountResponseDto.reaction === "HEART"
            )?.count ?? 0,
        funnyCount:
            reactionCountResponseDtoArray.find(
                (reactionCountResponseDto) => reactionCountResponseDto.reaction === "FUNNY"
            )?.count ?? 0,
        angryCount:
            reactionCountResponseDtoArray.find(
                (reactionCountResponseDto) => reactionCountResponseDto.reaction === "ANGRY"
            )?.count ?? 0,
    };
};
