import { CommentUpdateRequestDto } from "../../../../../generated/api";
import { EditCommentFormValues } from "../../commonTypes";

export const transformEditCommentFormValues2CommentUpdateRequestDto = (
    editCommentFormValues: EditCommentFormValues
): CommentUpdateRequestDto => {
    return {
        content: editCommentFormValues.content,
    };
};
