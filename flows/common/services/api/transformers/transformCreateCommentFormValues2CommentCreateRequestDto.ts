import { CommentCreateRequestDto } from "../../../../../generated/api";
import { CreateCommentFormValues } from "../../commonTypes";

export const transformCreateCommentFormValues2CommentCreateRequestDto = (
    createCommentFormValues: CreateCommentFormValues
): CommentCreateRequestDto => {
    return {
        content: createCommentFormValues.content,
    };
};
